type Config = Record<string, (val: string | null) => string | number | unknown>;

export function simpleParams<T extends Config, K extends keyof T>(config: T) {
	return {
		parse(params: URLSearchParams | Record<string, string>) {
			if (params instanceof URLSearchParams) {
				return Object.entries(config).reduce((acc, [key, parseFunction]) => {
					acc[key as keyof T] = parseFunction(params.get(key)) as ReturnType<
						T[K]
					>;
					return acc;
				}, {} as { [K in keyof T]: ReturnType<T[K]> });
			} else {
				return Object.entries(config).reduce((acc, [key, parseFunction]) => {
					acc[key as keyof T] = parseFunction(params[key]) as ReturnType<T[K]>;
					return acc;
				}, {} as { [K in keyof T]: ReturnType<T[K]> });
			}
		},
	};
}
