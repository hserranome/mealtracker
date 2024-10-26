export const sumRecords = <T extends Record<string, number>>(
	record1: T,
	record2: T,
): T => {
	const result = { ...record1 } as T;

	for (const [key, value] of Object.entries(record2)) {
		if (typeof value === "number") {
			if (key in result) {
				const existingValue = result[key as keyof T];
				if (typeof existingValue === "number") {
					result[key as keyof T] = (existingValue + value) as T[keyof T];
				} else {
					result[key as keyof T] = value as T[keyof T];
				}
			} else {
				result[key as keyof T] = value as T[keyof T];
			}
		}
	}

	return result;
};
