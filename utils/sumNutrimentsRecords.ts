import type { Nutriments } from "~/data";

export const sumNutrimentsRecords = (
	record1: Nutriments,
	record2: Nutriments,
): Nutriments => {
	const result: Nutriments = { ...record1 };

	for (const [key, value] of Object.entries(record2)) {
		// Check if the value is a number
		if (typeof value === "number") {
			if (key in result) {
				// Ensure the existing value is also a number before adding
				if (typeof result[key as keyof Nutriments] === "number") {
					result[key as keyof Nutriments] += value;
				} else {
					result[key as keyof Nutriments] = value;
				}
			} else {
				result[key as keyof Nutriments] = value;
			}
		}
		// If the value is not a number, we skip it
	}

	return result;
};
