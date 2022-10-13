declare type ParseNumberOptions = {
    /** The default value to use. */
    fallback: number;
    min?: number;
    max?: number;
};
export declare function parseNumber(string: any, { fallback, min, max }: ParseNumberOptions): number;
export declare function parseDate(string: any, { fallback, min, max, }: {
    /** The default value to use. */
    fallback: Date;
    min?: Date;
    max?: Date;
}): Date;
export {};
