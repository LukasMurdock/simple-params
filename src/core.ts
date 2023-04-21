type Config = Record<string, (val: string | null) => string | number | unknown>;
type ArrayConfig = Record<string, (val: string[]) => string | number | unknown>;

export function simpleParams<
	GetConfig extends Config,
	GetAllConfig extends ArrayConfig,
	GetConfigKey extends keyof GetConfig,
	GetAllConfigKey extends keyof GetAllConfig
>(getConfig: GetConfig, getAllConfig?: GetAllConfig) {
	return {
		parse(params: URLSearchParams) {
			const getParams = Object.entries(getConfig).reduce(
				(acc, [key, parseFunction]) => {
					acc[key as GetConfigKey] = parseFunction(
						params.get(key)
					) as ReturnType<GetConfig[GetConfigKey]>;
					return acc;
				},
				{} as { [K in GetConfigKey]: ReturnType<GetConfig[K]> }
			);

			const getAllParams = getAllConfig
				? Object.entries(getAllConfig).reduce((acc, [key, parseFunction]) => {
						acc[key as GetAllConfigKey] = parseFunction(
							params.getAll(key)
						) as ReturnType<GetAllConfig[GetAllConfigKey]>;
						return acc;
				  }, {} as { [K in GetAllConfigKey]: ReturnType<GetAllConfig[K]> })
				: ({} as { [K in GetAllConfigKey]: ReturnType<GetAllConfig[K]> });

			return {
				...getParams,
				...getAllParams,
			};
		},
	};
}
