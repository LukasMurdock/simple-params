type ParseOptions<T> = {
	/** The default value to use. */
	fallback: T;
	min?: T;
	max?: T;
};

export function parseNumber(
	string: any,
	{ fallback, min, max }: ParseOptions<number>
) {
	if (string === null) return fallback;
	const parse = Number(string);
	return isNaN(parse)
		? fallback
		: min && parse < min
		? min
		: max && parse > max
		? max
		: parse;
}

export function parseDate(
	string: any,
	{ fallback, min, max }: ParseOptions<Date>
) {
	const yyyymmddLength = 10;
	if (string === null || string.length < yyyymmddLength) return fallback;
	const date = new Date(string);
	return date.toString() === 'Invalid Date'
		? fallback
		: min && date < min
		? min
		: max && date > max
		? max
		: date;
}
