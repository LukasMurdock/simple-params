type ParseNumberOptions = {
	/** The default value to use. */
	fallback: number;
	min?: number;
	max?: number;
};

export function parseNumber(
	string: any,
	{ fallback, min, max }: ParseNumberOptions
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
	{
		fallback,
		min,
		max,
	}: {
		/** The default value to use. */
		fallback: Date;
		min?: Date;
		max?: Date;
	}
) {
	const date = new Date(string);
	return date.toString() === 'Invalid Date'
		? fallback
		: min && date < min
		? min
		: max && date > max
		? max
		: date;
}
