type ParseOptions<TFallback, TMain> = {
    /** The default value to use. */
    fallback: TFallback;
    min?: TMain;
    max?: TMain;
};
export declare function parseNumber<TFallback>(string: any, { fallback, min, max }: ParseOptions<TFallback, number>): number | TFallback;
export declare function parseDate<TFallback>(string: any, { fallback, min, max }: ParseOptions<TFallback, Date>): TFallback | Date;
export {};
