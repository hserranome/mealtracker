export const getDateName = (date: Date) => {
	const dateString = date.toDateString();

	// Check if the date is today
	if (dateString === new Date().toDateString()) {
		return "Today";
	}

	// Check if the date is yesterday
	if (
		dateString ===
		new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
	) {
		return "Yesterday";
	}

	// Check if the date is tomorrow
	if (
		dateString ===
		new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
	) {
		return "Tomorrow";
	}
	return dateString;
};
