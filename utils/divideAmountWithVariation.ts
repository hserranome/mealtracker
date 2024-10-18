// Given a number, divide into total parts, being able to specify a minimum amount per part. Can specify larger parts count, which then have applied a percentage increase.
export const divideAmountWithPartsVariation = (
	total: number,
	percentageIncrease: number,
	minAmount: number,
	totalParts = 7,
	largerPartsCount = 2,
) => {
	// Validate inputs
	if (total <= 0 || percentageIncrease <= 0 || minAmount <= 0) {
		throw new Error(
			"Total, percentage increase, and minimum amount must be positive numbers.",
		);
	}

	// Define the percentage as a decimal
	const increaseFactor = 1 + percentageIncrease / 100;

	// Solve for the base amount
	const smallerPartsCount = totalParts - largerPartsCount;

	// Using the formula: total = (smallerPartsCount * x) + (largerPartsCount * x * increaseFactor)
	// Rearranging to find x: x = total / (smallerPartsCount + largerPartsCount * increaseFactor)
	const baseAmount =
		total / (smallerPartsCount + largerPartsCount * increaseFactor);

	if (baseAmount < minAmount) {
		// TODO: return minimum amount instead of throw
		throw new Error(
			`The calculated base amount (${baseAmount}) is less than the minimum amount (${minAmount}).`,
		);
	}

	// Calculate larger part values
	const largerAmount = baseAmount * increaseFactor;

	// Create the result array
	const result = Array(smallerPartsCount)
		.fill(baseAmount)
		.concat(Array(largerPartsCount).fill(largerAmount));

	// Verify the total is correct
	const calculatedTotal = result.reduce((sum, part) => sum + part, 0);
	if (Math.abs(calculatedTotal - total) > 0.01) {
		// TODO: Do we care if there is a difference? Looks like this should be a test instead of a condition
		throw new Error(
			`Calculated total (${calculatedTotal}) does not match the input total (${total}).`,
		);
	}

	return result;
};
