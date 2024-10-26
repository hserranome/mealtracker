import { z } from "zod";
import { ItemBaseSchema, NutrimentsSchema } from "../types";
import { FoodSchema } from "../food";
import { RecipeSchema } from "../recipes";

export const QuickAddSchema = z.object({
	description: z.string().optional(),
	nutriments: z.object({
		energy_kcal: NutrimentsSchema.shape.energy_kcal,
		fat: NutrimentsSchema.shape.fat.optional(),
		carbohydrates: NutrimentsSchema.shape.carbohydrates.optional(),
		proteins: NutrimentsSchema.shape.proteins.optional(),
	}),
});
export type QuickAdd = z.infer<typeof QuickAddSchema>;

export const MealItemSchema = z.union([
	z.object({
		...ItemBaseSchema.shape,
		type: z.literal("food"),
		item: FoodSchema,
	}),
	z.object({
		type: z.literal("quick_add"),
		...QuickAddSchema.shape,
	}),
	z.object({
		...ItemBaseSchema.shape,
		type: z.literal("recipe"),
		item: RecipeSchema,
	}),
]);
export type MealItem = z.infer<typeof MealItemSchema>;

export const MealSchema = z.object({
	id: z.string().uuid(),
	date: z.string().date(), // YYYY-MM-DD
	name: z.string(),
	order: z.number().int().positive().optional(),
	nutriments: NutrimentsSchema,
	items: z.record(MealItemSchema),
});
export type Meal = z.infer<typeof MealSchema>;

export const DairyEntrySchema = z.object({
	weight: z.number(),
	nutriments: NutrimentsSchema,
	meals: z.record(MealSchema),
});
export type DairyEntry = z.infer<typeof DairyEntrySchema>;
