/// <reference types="node" />
declare type Config = Record<string, (val: string | null) => string | number | unknown>;
export declare function simpleParams<T extends Config, K extends keyof T>(config: T): {
    parse(params: URLSearchParams): { [K_1 in keyof T]: ReturnType<T[K_1]>; };
};
export {};
