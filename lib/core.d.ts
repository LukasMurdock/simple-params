/// <reference types="node" />
declare type Config = Record<string, (val: string | null) => string | number | unknown>;
declare type ArrayConfig = Record<string, (val: string[]) => string | number | unknown>;
export declare function simpleParams<GetConfig extends Config, GetAllConfig extends ArrayConfig, GetConfigKey extends keyof GetConfig, GetAllConfigKey extends keyof GetAllConfig>(getConfig: GetConfig, getAllConfig?: GetAllConfig): {
    parse(params: URLSearchParams): { [K in GetConfigKey]: ReturnType<GetConfig[K]>; } & { [K_1 in GetAllConfigKey]: ReturnType<GetAllConfig[K_1]>; };
};
export {};
