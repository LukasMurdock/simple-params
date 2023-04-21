type ParamsConfig<Parsed> = Record<
	string,
	(val: Parsed) => string | number | unknown
>;

type Config = ParamsConfig<ReturnType<URLSearchParams['get']>>;
type ArrayConfig = ParamsConfig<ReturnType<URLSearchParams['getAll']>>;

export function simpleParams<
	T1 extends Config,
	T2 extends ArrayConfig | undefined
>(getConfig: T1, getAllConfig?: T2) {
	type R1 = { [K in keyof T1]: ReturnType<T1[K]> };
	type FR = T2 extends undefined
		? R1
		: // @ts-ignore
		  R1 & { [K in keyof T2]: ReturnType<T2[K]> };
	return {
		parse(params: URLSearchParams): FR {
			return {
				...Object.fromEntries(
					Object.entries(getConfig).map(([key, parseFunction]) => [
						key,
						parseFunction(params.get(key)),
					])
				),
				...(getAllConfig &&
					Object.fromEntries(
						Object.entries(getAllConfig).map(([key, parseFunction]) => [
							key,
							parseFunction(params.getAll(key)),
						])
					)),
			} as FR;
		},
	};
}
