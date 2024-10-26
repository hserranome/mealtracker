import { type CaloriesSchedule, caloriesSchedule$ } from "./caloriesSchedule";

describe("caloriesSchedule$", () => {
	beforeEach(() => {
		caloriesSchedule$.schedule.set({} as CaloriesSchedule);
	});

	it("should set schedule and get calories for a specific date", () => {
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
});
