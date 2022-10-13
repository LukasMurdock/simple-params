declare type ParseOptions<T> = {
    /** The default value to use. */
    fallback: T;
    min?: T;
    max?: T;
};
export declare function parseNumber(string: any, { fallback, min, max }: ParseOptions<number>): number;
export declare function parseDate(string: any, { fallback, min, max }: ParseOptions<Date>): Date;
export {};
