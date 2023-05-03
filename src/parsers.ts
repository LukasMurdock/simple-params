type ParseOptions<TFallback, TMain> = {
	/** The default value to use. */
	fallback: TFallback;
	min?: TMain;
	max?: TMain;
};

export function parseNumber<TFallback>(
	string: any,
	{ fallback, min, max }: ParseOptions<TFallback, number>
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

export function parseDate<TFallback>(
	string: any,
	{ fallback, min, max }: ParseOptions<TFallback, Date>
) {
	const yyyymmddLength = 10;
	if (!string || string.length < yyyymmddLength) return fallback;
	const date = new Date(string);
	return isNaN(date.getTime())
		? fallback
		: min && date < min
		? min
		: max && date > max
		? max
		: date;
}
