import { food$ } from ".";

describe("library$", () => {
	beforeEach(() => {
		food$.foods.set({});
	});

	it("should set and get food, and then delete it", () => {
		const food = {
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
		};

		food$.setFood("123", food);
		expect(food$.getFood("123")).toEqual(food);
		food$.deleteFood("123");
		expect(food$.getFood("123")).toBeUndefined();
	});
});
