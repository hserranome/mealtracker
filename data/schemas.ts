import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { z } from "zod";

import { calculateNutriments } from "~/utils/calculateProportionalNutrientValue";
import { sumNutrimentsRecords } from "~/utils/sumNutrimentsRecords";

// Common types
export type Days =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";
export const defaultMealNames = ["breakfast", "lunch", "dinner"];

// Nutriments schema (used in multiple places)
const NutrimentsSchema = z.object({
	energy_kcal: z.number(),
	fat: z.number(),
	saturated_fat: z.number().optional(),
	carbohydrates: z.number(),
	sugars: z.number().optional(),
	proteins: z.number(),
	fiber: z.number().optional(),
	salt: z.number().optional(),
	sodium: z.number().optional(),
});
export type Nutriments = z.infer<typeof NutrimentsSchema>;

// Calories Schedule
export type CaloriesSchedule = Record<Days, number>;

export const caloriesSchedule$ = observable({
	schedule: {} as CaloriesSchedule,
	setSchedule: (newSchedule: CaloriesSchedule) =>
		caloriesSchedule$.schedule.set(newSchedule),
	getDateCalories: (date: Date) => {
		const day = date
			.toLocaleDateString("en-US", { weekday: "long" })
			.toLowerCase() as Days;
		return caloriesSchedule$.schedule.get()[day];
	},
});

syncObservable(caloriesSchedule$, {
	persist: {
		name: "caloriesSchedule",
		plugin: ObservablePersistMMKV,
	},
});

// Food Library
const FoodSchema = z.object({
	id: z.string(), // can be barcode or generated uuid
	name: z.string(),
	brands: z.string().optional(),
	code: z.string(),
	image_url: z.string().url(),
	deleted: z.boolean(),
	base_nutriments: NutrimentsSchema,
	base_serving_size: z.number(),
	base_serving_unit: z.string(),
	extra_serving_sizes: z.array(
		z.object({
			id: z.string(), // Unique identifier for each extra serving size
			name: z.string(), // Display name for the serving size (e.g., "cup", "slice")
			quantity: z.number(), // Amount in base units (e.g., 240 grams for 1 cup)
		}),
	),
});
export type Food = z.infer<typeof FoodSchema>;

export const library$ = observable({
	foods: {} as Record<string, Food>,
	setFood: (foodId: string, newFood: Food) =>
		library$.foods.assign({ [foodId]: newFood }),
	getFood: (foodId?: string) => library$.foods.get()[foodId ?? ""],
	deleteFood: (foodId: string) => library$.foods[foodId].delete(),
});

syncObservable(library$, {
	persist: {
		name: "library",
		plugin: ObservablePersistMMKV,
	},
});

// Dairy
const QuickAddSchema = z.object({
	description: z.string().optional(),
	nutriments: NutrimentsSchema.pick({
		energy_kcal: true,
		fat: true,
		carbohydrates: true,
		proteins: true,
	}),
});
export type QuickAdd = z.infer<typeof QuickAddSchema>;

const MealItemSchema = z.union([
	z.object({
		type: z.literal("food"),
		item: FoodSchema,
		nutriments: NutrimentsSchema.optional(),
		quantity: z.number().positive(),
		serving: z.object({
			id: z.string().optional(),
			unit: z.string(),
			size: z.number(),
		}),
	}),
	z.object({
		type: z.literal("quick_add"),
		item: QuickAddSchema,
		nutriments: NutrimentsSchema,
	}),
]);
export type MealItem = z.infer<typeof MealItemSchema>;

const MealSchema = z.object({
	id: z.string().uuid(),
	date: z.string().date(), // YYYY-MM-DD
	name: z.string(),
	order: z.number().int().positive().optional(),
	nutriments: NutrimentsSchema,
	items: z.record(MealItemSchema),
});
export type Meal = z.infer<typeof MealSchema>;

const DairyEntrySchema = z.object({
	weight: z.number(),
	nutriments: NutrimentsSchema,
	meals: z.record(MealSchema),
});
export type DairyEntry = z.infer<typeof DairyEntrySchema>;

export const dairy$ = observable({
	entries: {} as Record<string, DairyEntry>, // key is always an ISO date string YYYY-MM-DD

	deleteAllEntries: () => dairy$.entries.set({}),
	getEntry: (date?: string) => dairy$.entries.get()[date ?? ""] ?? {},

	getDateMeal: (date: string, mealName: string) =>
		dairy$.entries[date].meals[mealName.toLowerCase()].get(),

	generateEntryNutriments: (date: string) => {
		const entry = dairy$.getEntry(date);
		const entry$ = dairy$.entries[date];

		const entryNutriments = Object.entries(entry.meals).reduce(
			(accEntryNutriments, [mealNameId, meal]) => {
				const meal$ = entry$.meals[mealNameId];
				const mealNutriments = calculateMealNutriments(meal, meal$);
				meal$.nutriments.set(mealNutriments);
				return sumNutrimentsRecords(accEntryNutriments, mealNutriments);
			},
			{} as Nutriments,
		);

		entry$.nutriments.set(entryNutriments);
	},

	getMealItem: (
		date: string,
		mealName: string,
		mealItemId?: string,
	): MealItem | undefined =>
		mealItemId
			? dairy$.entries[date].meals[mealName.toLowerCase()].items[
					mealItemId
				].get()
			: undefined,

	setMealItem: (
		date: string,
		mealName: string,
		item: DairyEntry["meals"][number]["items"][number],
		itemId?: string,
	) => {
		const id = itemId ?? `${date}-${mealName}-${Date.now()}`;
		dairy$.entries[date].meals[mealName.toLowerCase()].items.assign({
			[id]: item,
		});
		dairy$.generateEntryNutriments(date);
		return id;
	},

	deleteMealItem: (date: string, mealName: string, mealItemId: string) => {
		dairy$.entries[date].meals[mealName.toLowerCase()].items[
			mealItemId
		].delete();
		dairy$.generateEntryNutriments(date);
	},
});

// Helper function to calculate meal nutriments
function calculateMealNutriments(
	meal: Meal,
	meal$: (typeof dairy$.entries)[string]["meals"][string],
): Nutriments {
	return Object.entries(meal.items).reduce(
		(accMealNutriments, [itemId, mealItem]) => {
			if (mealItem.type === "quick_add") {
				return sumNutrimentsRecords(accMealNutriments, mealItem.nutriments);
			}
			if (mealItem.type === "food") {
				const { item, quantity, serving } = mealItem;
				const foodNutriments = calculateNutriments(
					item.base_nutriments,
					serving.size * quantity,
				);
				meal$.items[itemId].nutriments.set(foodNutriments);
				return sumNutrimentsRecords(accMealNutriments, foodNutriments);
			}
			// TODO: recipe
			return accMealNutriments;
		},
		{} as Nutriments,
	);
}

syncObservable(dairy$, {
	persist: {
		name: "dairy",
		plugin: ObservablePersistMMKV,
	},
});
