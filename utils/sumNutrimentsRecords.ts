import type { Nutriments } from "~/data";

export const sumNutrimentsRecords = (
	record1: Nutriments,
	record2: Nutriments,
): Nutriments => {
	const result: Nutriments = { ...record1 };

	for (const [key, value] of Object.entries(record2)) {
		if (key in result) {
			result[key as keyof Nutriments] += value as number;
		} else {
			result[key as keyof Nutriments] = value as number;
		}
	}

	return result;
};
