import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import type { Days } from "../types";

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
