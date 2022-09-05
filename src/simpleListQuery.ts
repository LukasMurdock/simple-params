import { simpleQueryParams } from './core';
import { parseNumber } from './parsers';
import { KeyVal, NestedKeys } from './types';
import { removeConsecutiveSpaces } from './text';

export type SimpleListQuery<T> = {
	items: T[];
	pageSize: number;
	pageToken: string | number | Date | null;
	nextPageToken: string | number | Date | null;
};

export type SimpleListQueryRequest = {
	filter?: string;
	/**
	 * Fields to include in request.
	 * Changing default field mask is a breaking change.
	 */
	// field_mask?: string;
	order_by?: string;
	/** APIs should hide soft-deleted resources by default */
	show_deleted?: boolean;
	page_size?: number;
	/** Token, and not 'page', to signify underlying implementation details may change. */
	page_token?: string;
	/** Refers to the number of individual resources to skip, not the number of pages. */
	skip: number;
};

export type SimpleListQueryResponse<T> = {
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

type OrderByDefaultConfig<T extends KeyVal> = {
	field: NestedKeys<T>[];
	direction: 'desc' | 'asc';
}[];

type PageTokenParsing = {
	base64: {
		pageToken: string | null;
		nextPageToken: null;
	};
	increment: { pageToken: number; nextPageToken: number | null };
	custom: { pageToken: null; nextPageToken: null };
};

export type SimpleListQueryConfig<T extends KeyVal> = {
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
export function parseListQuery<T extends KeyVal>(
	searchParams: URLSearchParams,
	config: SimpleListQueryConfig<T>
) {
	const api = simpleQueryParams({
		order_by: (val) => parseOrderBy<T>(val, config),
		skip: (val) => parseNumber(val, { fallback: 0, min: 0, max: 100 }),
		page_token: (val) => parseNumber(val, { fallback: 0, min: 0, max: 2 }),
		page_size: (val) =>
			parseNumber(val, {
				fallback: config.defaults.pageSize,
				min: 0,
				max: config.maxPageSize,
			}),
		// fields: (val) => parseFieldMasks<T>(val, config),
	});

	return api.parseURLSearchParams(searchParams);
}

// TODO: allow field traversal with wildcard '*'
export function parseOrderBy<T extends KeyVal>(
	query: string | null,
	config: SimpleListQueryConfig<T>
) {
	if (query === null)
		// TODO: figure out how to type this?
		// @ts-ignore-next-line
		return config.defaults.orderBy.reduce(
			// @ts-ignore-next-line
			(acc, curr) => {
				// @ts-ignore-next-line
				acc.push({ [curr.field]: curr.direction });
				return acc;
			},
			[]
		);
	const fields = removeConsecutiveSpaces(query).split(',');
	return fields.reduce((prev: any, fieldData: string) => {
		const fieldArray = fieldData.trim().split(' ');
		const searchedField = fieldArray[0];
		// Ignoring typescript because
		// “Type instantiation is excessively deep and possibly infinite.”
		// @ts-ignore-next-line
		if (!config.orderBy.includes(searchedField)) {
			return prev;
		}
		const parsedField = searchedField
			.split('.')
			.reduceRight((res: any, key: any) => {
				return { [key]: res };
			}, fieldArray[1] ?? 'asc');
		return [...prev, parsedField];
	}, []);
}

// /**
//  *
//  * https://developers.google.com/slides/api/guides/field-masks
//  *
//  * @param string
//  * @param config
//  * @returns
//  */
// function parseFieldMasks<T extends KeyVal>(
// 	string: string | null,
// 	config: SimpleListQueryConfig<T>
// ) {
// 	if (config.defaults.fieldMasks === undefined) return null;
// 	if (string === null) return config.defaults.fieldMasks;
// 	return string;
// }
