import {
	caloriesSchedule$,
	library$,
	dairy$,
	type CaloriesSchedule,
} from "./schemas";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

// Mock the MMKV plugin
jest.mock("@legendapp/state/persist-plugins/mmkv", () => {
	const mockPersistPlugin = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		getTable: jest.fn(),
		setTable: jest.fn(),
		deleteItem: jest.fn(),
		clear: jest.fn(),
		getMetadata: jest.fn(),
		setMetadata: jest.fn(),
		set: jest.fn().mockResolvedValue(undefined),
		get: jest.fn(),
		delete: jest.fn(),
	};

	return {
		ObservablePersistMMKV: jest.fn(() => mockPersistPlugin),
	};
});

describe("schemas observables", () => {
	beforeEach(() => {
		// Reset observables before each test
		caloriesSchedule$.schedule.set({} as CaloriesSchedule);
		library$.foods.set({});
		dairy$.entries.set({});

		// Reset the mock implementation
		(ObservablePersistMMKV as jest.Mock).mockClear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("caloriesSchedule$", () => {
		it("should set and get schedule", () => {
			const schedule = {
				monday: 2000,
				tuesday: 2100,
				wednesday: 2200,
				thursday: 2300,
				friday: 2400,
				saturday: 2500,
				sunday: 2600,
			};

			caloriesSchedule$.setSchedule(schedule);
			expect(caloriesSchedule$.schedule.get()).toEqual(schedule);
		});

		it("should get calories for a specific date", () => {
			const schedule = {
				monday: 2000,
				tuesday: 2100,
				wednesday: 2200,
				thursday: 2300,
				friday: 2400,
				saturday: 2500,
				sunday: 2600,
			};

			caloriesSchedule$.setSchedule(schedule);

			const mondayDate = new Date("2023-05-01"); // A Monday
			expect(caloriesSchedule$.getDateCalories(mondayDate)).toBe(2000);

			const fridayDate = new Date("2023-05-05"); // A Friday
			expect(caloriesSchedule$.getDateCalories(fridayDate)).toBe(2400);
		});

		// Add more tests for caloriesSchedule$ if needed
	});

	describe("library$", () => {
		it("should set and get food", () => {
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

			library$.setFood("123", food);
			expect(library$.getFood("123")).toEqual(food);
		});

		it("should delete food", () => {
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

			library$.setFood("123", food);
			library$.deleteFood("123");
			expect(library$.getFood("123")).toBeUndefined();
		});

		// Add more tests for library$ if needed
	});

	describe("dairy$", () => {
		it("should set and get meal item", () => {
			const date = "2023-05-01";
			const mealName = "breakfast";
			const mealItem = {
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

			const itemId = dairy$.setMealItem(date, mealName, mealItem);
			const retrievedItem = dairy$.getMealItem(date, mealName, itemId);
			expect(retrievedItem).toEqual(mealItem);
		});

		it("should delete meal item", () => {
			const date = "2023-05-01";
			const mealName = "breakfast";
			const mealItem = {
				type: "quick_add" as const,
				item: {
					description: "Quick snack",
					nutriments: {
						energy_kcal: 100,
						fat: 5,
						carbohydrates: 10,
						proteins: 5,
					},
				},
				nutriments: {
					energy_kcal: 100,
					fat: 5,
					carbohydrates: 10,
					proteins: 5,
				},
			};

			dairy$.setMealItem(date, mealName, mealItem);
			const itemId = `${date}-${mealName}-${Date.now()}`;
			dairy$.deleteMealItem(date, mealName, itemId);
			const retrievedItem = dairy$.getMealItem(date, mealName, itemId);
			expect(retrievedItem).toBeUndefined();
		});

		it("should generate entry nutriments", () => {
			const date = "2023-05-01";
			const breakfast = {
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

			const lunch = {
				type: "quick_add" as const,
				item: {
					description: "Quick lunch",
					nutriments: {
						energy_kcal: 500,
						fat: 20,
						carbohydrates: 60,
						proteins: 25,
					},
				},
				nutriments: {
					energy_kcal: 500,
					fat: 20,
					carbohydrates: 60,
					proteins: 25,
				},
			};

			dairy$.setMealItem(date, "breakfast", breakfast);
			dairy$.setMealItem(date, "lunch", lunch);

			dairy$.generateEntryNutriments(date);

			const entry = dairy$.getEntry(date);
			// Values are rounded up
			expect(entry.nutriments).toEqual({
				energy_kcal: 552,
				fat: 21,
				carbohydrates: 74,
				proteins: 26,
			});
		});

		// Add more tests for dairy$ if needed
	});
});
