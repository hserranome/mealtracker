import { dairy$ } from ".";
import type { MealItem } from "./types";

describe("dairy$", () => {
	const testDate = "2023-05-01";

	const foodItem: MealItem = {
		type: "food" as const,
		item: {
			id: "123",
			name: "Apple",
			code: "1234567890",
			image_url: "https://example.com/apple.jpg",
			deleted: false,
			base_nutriments: {
				energy_kcal: 52,
				fat: 0.2,
				carbohydrates: 14,
				proteins: 0.3,
			},
			base_serving_size: 100,
			base_serving_unit: "g",
			extra_serving_sizes: [],
		},
		quantity: 1,
		serving: {
			unit: "g",
			size: 100,
		},
	};

	const quickAddItem: MealItem = {
		type: "quick_add",
		description: "Quick snack",
		nutriments: {
			energy_kcal: 100,
			fat: 5,
			carbohydrates: 10,
			proteins: 5,
		},
	};

	beforeEach(() => {
		dairy$.entries.set({});
	});

	describe("Meal item operations", () => {
		it.each([
			["food", foodItem, "breakfast"],
			["quick add", quickAddItem, "snack"],
		])(
			"should set and get %s meal item, and then delete it",
			(_, mealItem, mealName) => {
				const itemId = dairy$.setMealItem(testDate, mealName, mealItem);
				const retrievedItem = dairy$.getMealItem(testDate, mealName, itemId);
				expect(retrievedItem).toEqual(mealItem);
				dairy$.deleteMealItem(testDate, mealName, itemId);
				const deletedItem = dairy$.getMealItem(testDate, mealName, itemId);
				expect(deletedItem).toBeUndefined();
			},
		);
	});

	describe("Entry nutriments generation", () => {
		it("should generate entry nutriments for multiple meal items", () => {
			dairy$.setMealItem(testDate, "breakfast", foodItem);
			dairy$.setMealItem(testDate, "lunch", quickAddItem);

			dairy$.generateEntryNutriments(testDate);

			const entry = dairy$.getEntry(testDate);
			expect(entry.nutriments).toEqual({
				energy_kcal: 152,
				fat: 5.2,
				carbohydrates: 24,
				proteins: 5.3,
			});
		});
	});
});
