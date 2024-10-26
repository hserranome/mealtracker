import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { z } from "zod";
import { ItemBaseSchema, NutrimentsSchema, type Nutriments } from "../types";
import { FoodSchema } from "../food";
import { calculateNutriments } from "~/utils/calculateNutriments";
import { sumRecords } from "~/utils/sumRecords";

const FoodItemSchema = z.object({
	...ItemBaseSchema.shape,
	item: FoodSchema,
});

// Recipe
export const RecipeSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().optional(),
	serving_size: z.number().positive(), // 100g, 2 servings, etc.
	serving_unit: z.string(), // this can be "servings", "g", "ml", or a custom unit
	items: z.record(FoodItemSchema), // ingredients
	nutriments: NutrimentsSchema, // total nutriments of the recipe
});
export type Recipe = z.infer<typeof RecipeSchema>;

export const recipes$ = observable({
	recipes: {} as Record<string, Recipe>,
	setRecipe: (recipe: Recipe) =>
		recipes$.recipes.assign({ [recipe.id]: recipe }),
	getRecipe: (recipeId: string) => recipes$.recipes.get()[recipeId],
	deleteRecipe: (recipeId: string) => recipes$.recipes[recipeId].delete(),

	calculateRecipeNutriments: (recipeId: string) => {
		const recipe = recipes$.getRecipe(recipeId);
		if (!recipe) return;

		const totalNutriments = Object.values(recipe.items).reduce((acc, item) => {
			const foodNutriments = calculateNutriments(
				item.item.base_nutriments,
				item.serving.size * item.quantity,
			);
			return sumRecords(acc, foodNutriments);
		}, {} as Nutriments);

		// Calculate nutriments per serving
		const perServingNutriments = Object.entries(totalNutriments).reduce(
			(acc, [key, value]) => {
				acc[key as keyof Nutriments] = value / recipe.serving_size;
				return acc;
			},
			{} as Nutriments,
		);

		recipes$.recipes[recipeId].nutriments.set(perServingNutriments);
	},
});

syncObservable(recipes$, {
	persist: {
		name: "recipes",
		plugin: ObservablePersistMMKV,
	},
});
