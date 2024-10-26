import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { z } from "zod";
import { NutrimentsSchema } from "../types";

// Food Library
export const FoodSchema = z.object({
	id: z.string(), // can be barcode or generated uuid
	name: z.string(),
	brands: z.string().optional(),
	code: z.string().optional(),
	image_url: z.string().url().optional(),
	deleted: z.boolean().optional(),
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

export const food$ = observable({
	foods: {} as Record<string, Food>,
	setFood: (foodId: string, newFood: Food) =>
		food$.foods.assign({ [foodId]: newFood }),
	getFood: (foodId?: string) => food$.foods.get()[foodId ?? ""],
	deleteFood: (foodId: string) => food$.foods[foodId].delete(),
});

syncObservable(food$, {
	persist: {
		name: "library",
		plugin: ObservablePersistMMKV,
	},
});
