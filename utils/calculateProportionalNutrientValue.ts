import type { Nutriments } from "~/data";

// TODO: This is base 100 only?
export const calculateNutrientValue = (
	baseNutrientValue: number | undefined,
	quantity: number,
) =>
	baseNutrientValue
		? Math.ceil((Number(baseNutrientValue) * quantity) / 100)
		: 0;

export const calculateNutriments = (
	nutriments: Nutriments,
	quantity: number,
): Nutriments => {
	return Object.keys(nutriments).reduce((acc, key) => {
		const nutrientKey = key as keyof Nutriments;
		acc[nutrientKey] = calculateNutrientValue(
			nutriments[nutrientKey],
			quantity,
		);
		return acc;
	}, {} as Nutriments);
};
