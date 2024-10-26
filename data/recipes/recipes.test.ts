import { type Recipe, recipes$ } from ".";

describe("recipes$", () => {
	beforeEach(() => {
		recipes$.recipes.set({});
	});

	it("should set and get recipe, then delete it", () => {
		const recipe = {
			id: "123",
			name: "Test Recipe",
			serving_size: 2,
			serving_unit: "servings",
			items: {},
			nutriments: {
				energy_kcal: 200,
				fat: 10,
				carbohydrates: 20,
				proteins: 5,
			},
		};

		recipes$.setRecipe(recipe);
		expect(recipes$.getRecipe("123")).toEqual(recipe);
		recipes$.deleteRecipe("123");
		expect(recipes$.getRecipe("123")).toBeUndefined();
	});

	it("should calculate recipe nutriments", () => {
		const recipe: Recipe = {
			id: "123",
			name: "Test Recipe",
			serving_size: 2,
			serving_unit: "servings",
			items: {
				item1: {
					item: {
						id: "456",
						name: "Bread",
						base_nutriments: {
							energy_kcal: 100,
							fat: 5,
							carbohydrates: 10,
							proteins: 5,
						},
						base_serving_size: 100,
						base_serving_unit: "g",
						extra_serving_sizes: [],
					},
					quantity: 1,
					serving: { size: 100, unit: "g" },
				},
				item2: {
					item: {
						id: "789",
						name: "Jam",
						base_nutriments: {
							energy_kcal: 150,
							fat: 7,
							carbohydrates: 15,
							proteins: 8,
						},
						base_serving_size: 100,
						base_serving_unit: "g",
						extra_serving_sizes: [
							// Not relevant here, just for showing as option in the dropdown
							{ id: "123", name: "tablespoon", quantity: 50 },
						],
					},
					quantity: 2,
					serving: { size: 50, unit: "tablespoon" },
				},
			},
			nutriments: {
				energy_kcal: 0,
				fat: 0,
				carbohydrates: 0,
				proteins: 0,
			},
		};

		recipes$.setRecipe(recipe);
		recipes$.calculateRecipeNutriments("123");

		const updatedRecipe = recipes$.getRecipe("123");
		expect(updatedRecipe.nutriments).toEqual({
			energy_kcal: 125,
			fat: 6,
			carbohydrates: 12.5,
			proteins: 6.5,
		});
	});
});
