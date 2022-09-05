export declare type KeyVal = Record<string, unknown>;
export declare type GetObjectKeyVals<T extends KeyVal> = {
    [K in keyof T]: T[K];
};
export declare type NeverRight<L extends KeyVal, R extends KeyVal> = GetObjectKeyVals<L> & {
    [K in keyof R]?: never;
};
export declare type Either<L extends KeyVal, R extends KeyVal> = NeverRight<L, R> | NeverRight<R, L>;
export declare type NestedKeys<Type extends KeyVal> = {
    [Key in keyof Type]: Type[Key] extends KeyVal ? // @ts-ignore
    `${Key}` | `${Key}.${NestedKeys<Type[Key]>}` : Key;
}[keyof Type & string];
