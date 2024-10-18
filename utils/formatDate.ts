export const formatDate = (date: Date) => {
	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];
	return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};
