import { calculateNutriments } from "~/utils/calculateNutriments";
import type { Meal } from "./types";
import type { Nutriments } from "../types";
import { sumRecords } from "~/utils/sumRecords";

export function calculateMealNutriments(
	meal: Meal,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	meal$: any, // TODO: Fix this. See coment below
): Nutriments {
	return Object.entries(meal.items).reduce(
		(accMealNutriments, [itemId, mealItem]) => {
			if (mealItem.type === "quick_add") {
				return sumRecords(accMealNutriments, mealItem.nutriments as Nutriments);
			}
			if (mealItem.type === "food") {
				const { item, quantity, serving } = mealItem;
				const foodNutriments = calculateNutriments(
					item.base_nutriments,
					serving.size * quantity,
				);
				// TODO: Don't do this, it's a side effect
				// instead, do everything by layers.
				// Check edited food, then meal nutrients, then entry
				// But only when needed. Not all items. Just the one edited
				meal$.items[itemId].nutriments.set(foodNutriments);
				return sumRecords(accMealNutriments, foodNutriments);
			}
			return accMealNutriments;
		},
		{} as Nutriments,
	);
}
