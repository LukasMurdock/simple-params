export function addDays(date: Date, add: number) {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + add);
	return newDate;
}

export function daysAgo(date: Date, daysAgo: number) {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() - daysAgo);
	return newDate;
}

export function aWeekAgo(date: Date) {
	return daysAgo(date, 7);
}

export function aMonthAgo(date: Date) {
	return daysAgo(date, 30);
}

export function zeroDateTime(date: Date) {
	const newDate = new Date(date.toUTCString());
	newDate.setHours(0, 0, 0, 0);
	return newDate;
}
