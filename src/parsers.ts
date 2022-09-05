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
