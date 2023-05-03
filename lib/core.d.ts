/// <reference types="node" />
type ParamsConfig<Parsed> = Record<string, (val: Parsed) => string | number | unknown>;
type Config = ParamsConfig<ReturnType<URLSearchParams['get']>>;
type ArrayConfig = ParamsConfig<ReturnType<URLSearchParams['getAll']>>;
export declare function simpleParams<T1 extends Config, T2 extends ArrayConfig | undefined>(getConfig: T1, getAllConfig?: T2): {
    parse(params: URLSearchParams): T2 extends undefined ? { [K in keyof T1]: ReturnType<T1[K]>; } : { [K in keyof T1]: ReturnType<T1[K]>; } & { [K_1 in keyof T2]: ReturnType<T2[K_1]>; };
};
export {};
