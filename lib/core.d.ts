/// <reference types="node" />
declare type ParamsConfig<Parsed> = Record<string, (val: Parsed) => string | number | unknown>;
declare type Config = ParamsConfig<ReturnType<URLSearchParams['get']>>;
declare type ArrayConfig = ParamsConfig<ReturnType<URLSearchParams['getAll']>>;
export declare function simpleParams<T1 extends Config, T2 extends ArrayConfig | undefined, R1 extends ReturnType<typeof get<T1, string>>, FR extends T2 extends undefined ? R1 : R1 & ReturnType<typeof getAll<T2 & {}, string>>>(getConfig: T1, getAllConfig?: T2): {
    parse(params: URLSearchParams): FR;
};
declare function get<T extends Config, K extends keyof Config>(config: T, params: URLSearchParams): { [K_1 in keyof T]: ReturnType<T[K_1]>; };
declare function getAll<T extends ArrayConfig, K extends keyof ArrayConfig>(config: T, params: URLSearchParams): { [K_1 in keyof T]: ReturnType<T[K_1]>; };
export {};
