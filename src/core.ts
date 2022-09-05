type Config = Record<string, (val: string | null) => string | number | unknown>;

export function simpleQueryParams<T extends Config, K extends keyof T>(
	config: T
) {
	return {
		parse(params: URLSearchParams) {
			return Object.entries(config).reduce((acc, [key, parseFunction]) => {
				acc[key as keyof T] = parseFunction(params.get(key)) as ReturnType<
					T[K]
				>;
				return acc;
			}, {} as { [K in keyof T]: ReturnType<T[K]> });
		},
	};
}
