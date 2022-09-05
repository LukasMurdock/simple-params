declare type ParseNumberOptions = {
    /** The default value to use. */
    fallback: number;
    min?: number;
    max?: number;
};
export declare function parseNumber(string: any, { fallback, min, max }: ParseNumberOptions): number;
export {};
