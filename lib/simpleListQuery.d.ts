/// <reference types="node" />
import { KeyVal, NestedKeys } from './types';
export declare type SimpleListQuery<T> = {
    items: T[];
    pageSize: number;
    pageToken: string | number | Date | null;
    nextPageToken: string | number | Date | null;
};
export declare type SimpleListQueryRequest = {
    filter?: string;
    /**
     * Fields to include in request.
     * Changing default field mask is a breaking change.
     */
    order_by?: string;
    /** APIs should hide soft-deleted resources by default */
    show_deleted?: boolean;
    page_size?: number;
    /** Token, and not 'page', to signify underlying implementation details may change. */
    page_token?: string;
    /** Refers to the number of individual resources to skip, not the number of pages. */
    skip: number;
};
export declare type SimpleListQueryResponse<T> = {
    items: T[];
    page_size?: number;
    /** Page data is an implementation detail specific to the data. */
    page_token: string | null;
    next_page_token: string | null;
    previous_token: string | null;
    /** For constructing previous and next page URLs on the server */
    previous_href: string | null;
    next_href: string | null;
};
declare type OrderByDefaultConfig<T extends KeyVal> = {
    field: NestedKeys<T>[];
    direction: 'desc' | 'asc';
}[];
declare type PageTokenParsing = {
    base64: {
        pageToken: string | null;
        nextPageToken: null;
    };
    increment: {
        pageToken: number;
        nextPageToken: number | null;
    };
    custom: {
        pageToken: null;
        nextPageToken: null;
    };
};
export declare type SimpleListQueryConfig<T extends KeyVal> = {
    orderBy: NestedKeys<T>;
    maxPageSize: number;
    /**
     * Options:
     * - base64
     * - increment
     * - custom
     *
     * @variation base64
     * @description Returns pageToken as base64 decoded page_token
     * @default return { pageToken: null | string, nextPageToken: null }
     *
     * @variation increment
     * @description Returns incremented page_token
     * @default return {pageToken: 0, nextPageToken: 1}
     *
     * @variation custom
     * @description Always returns null
     * @default return { pageToken: null, nextPageToken: null }
     */
    pageTokenParsing: keyof PageTokenParsing;
    defaults: {
        fieldMasks?: NestedKeys<T>;
        orderBy: OrderByDefaultConfig<T>;
        pageSize: number;
    };
};
/**
 *
 * Parses URLSearchParams with defaults defined in ApiDesignConfig.
 *
 * Fields:
 * - order_by: string
 * - show_deleted: boolean
 * - page_size: number
 * - page_token: string
 * - skip: number
 * - (not supported, yet?) field_mask: string
 * - (not supported, yet?) filter: string
 */
export declare function parseListQuery<T extends KeyVal>(searchParams: URLSearchParams, config: SimpleListQueryConfig<T>): {
    order_by: any;
    skip: number;
    page_token: number;
    page_size: number;
};
export declare function parseOrderBy<T extends KeyVal>(query: string | null, config: SimpleListQueryConfig<T>): any;
export {};
