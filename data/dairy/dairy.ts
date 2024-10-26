import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { sumRecords } from "~/utils/sumRecords";
import type { DairyEntry, MealItem } from "./types";
import { calculateMealNutriments } from "./helpers";

export const dairy$ = observable({
	entries: {} as Record<string, DairyEntry>, // key is always an ISO date string YYYY-MM-DD

	deleteAllEntries: () => dairy$.entries.set({}),
	getEntry: (date?: string) => dairy$.entries.get()[date ?? ""] ?? {},

	getDateMeal: (date: string, mealName: string) =>
		dairy$.entries[date].meals[mealName.toLowerCase()].get(),

	getMealItem: (
		date: string,
		mealName: string,
		mealItemId?: string,
	): MealItem | undefined => {
		return mealItemId
			? dairy$.entries[date].meals[mealName.toLowerCase()].items[
					mealItemId
				].get()
			: undefined;
	},

	setMealItem: (
		date: string,
		mealName: string,
		item: MealItem,
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

	generateEntryNutriments: (date: string) => {
		const entry = dairy$.getEntry(date);
		const entry$ = dairy$.entries[date];

		const entryNutriments = Object.entries(entry.meals).reduce(
			(accEntryNutriments, [mealNameId, meal]) => {
				const meal$ = entry$.meals[mealNameId];
				const mealNutriments = calculateMealNutriments(meal, meal$);
				meal$.nutriments.set(mealNutriments);
				return sumRecords(accEntryNutriments, mealNutriments);
			},
			{
				energy_kcal: 0,
				fat: 0,
				carbohydrates: 0,
				proteins: 0,
			},
		);

		entry$.nutriments.set(entryNutriments);
	},
});

syncObservable(dairy$, {
	persist: {
		name: "dairy",
		plugin: ObservablePersistMMKV,
	},
});
