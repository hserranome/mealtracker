import { z } from "zod";

export type Days =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";
export const defaultMealNames = ["breakfast", "lunch", "dinner"];

export const NutrimentsSchema = z.object({
	energy_kcal: z.number(),
	fat: z.number(),
	saturated_fat: z.number().optional(),
	carbohydrates: z.number(),
	sugars: z.number().optional(),
	proteins: z.number(),
	fiber: z.number().optional(),
	salt: z.number().optional(),
	sodium: z.number().optional(),
});
export type Nutriments = z.infer<typeof NutrimentsSchema>;

export const ItemBaseSchema = z.object({
	nutriments: NutrimentsSchema.optional(),
	quantity: z.number().positive(),
	serving: z.object({
		id: z.string().optional(),
		unit: z.string(),
		size: z.number(),
	}),
});

export enum ActivityLevel {
	Sedentary = 0,
	Light = 1,
	Moderate = 2,
	Active = 3,
	Heavy = 4,
}

export enum Goal {
	Lose = 0,
	Maintain = 1,
	Gain = 2,
}

export enum Sex {
	Male = 0,
	Female = 1,
}
