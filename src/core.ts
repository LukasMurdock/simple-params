type ParamsConfig<Parsed> = Record<
	string,
	(val: Parsed) => string | number | unknown
>;

type Config = ParamsConfig<ReturnType<URLSearchParams['get']>>;
type ArrayConfig = ParamsConfig<ReturnType<URLSearchParams['getAll']>>;

// Naming scheme:
// T1: Type 1
// T2: Type 2
// R1: Return 1
// FR: Final Return

export function simpleParams<
	T1 extends Config,
	T2 extends ArrayConfig | undefined,
	R1 extends ReturnType<typeof get<T1, string>>,
	FR extends T2 extends undefined
		? R1
		: R1 & ReturnType<typeof getAll<T2 & {}, string>>
>(getConfig: T1, getAllConfig?: T2) {
	return {
		parse(params: URLSearchParams): FR {
			if (!getAllConfig) {
				return get(getConfig, params) as FR;
			} else {
				return {
					...get(getConfig, params),
					...getAll(getAllConfig, params),
				} as FR;
			}
		},
	};
}

function get<T extends Config, K extends keyof Config>(
	config: T,
	params: URLSearchParams
) {
	return Object.entries(config).reduce((acc, [key, parseFunction]) => {
		acc[key as keyof T] = parseFunction(params.get(key)) as ReturnType<T[K]>;
		return acc;
	}, {} as { [K in keyof T]: ReturnType<T[K]> });
}

function getAll<T extends ArrayConfig, K extends keyof ArrayConfig>(
	config: T,
	params: URLSearchParams
) {
	return Object.entries(config).reduce((acc, [key, parseFunction]) => {
		acc[key as keyof T] = parseFunction(params.getAll(key)) as ReturnType<T[K]>;
		return acc;
	}, {} as { [K in keyof T]: ReturnType<T[K]> });
}
