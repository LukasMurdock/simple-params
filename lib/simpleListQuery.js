"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrderBy = exports.parseListQuery = void 0;
const core_1 = require("./core");
const parsers_1 = require("./parsers");
const text_1 = require("./text");
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
function parseListQuery(searchParams, config) {
    const api = (0, core_1.simpleQueryParams)({
        order_by: (val) => parseOrderBy(val, config),
        skip: (val) => (0, parsers_1.parseNumber)(val, { fallback: 0, min: 0, max: 100 }),
        page_token: (val) => (0, parsers_1.parseNumber)(val, { fallback: 0, min: 0, max: 2 }),
        page_size: (val) => (0, parsers_1.parseNumber)(val, {
            fallback: config.defaults.pageSize,
            min: 0,
            max: config.maxPageSize,
        }),
        // fields: (val) => parseFieldMasks<T>(val, config),
    });
    return api.parse(searchParams);
}
exports.parseListQuery = parseListQuery;
// TODO: allow field traversal with wildcard '*'
function parseOrderBy(query, config) {
    if (query === null)
        // TODO: figure out how to type this?
        // @ts-ignore-next-line
        return config.defaults.orderBy.reduce(
        // @ts-ignore-next-line
        (acc, curr) => {
            // @ts-ignore-next-line
            acc.push({ [curr.field]: curr.direction });
            return acc;
        }, []);
    const fields = (0, text_1.removeConsecutiveSpaces)(query).split(',');
    return fields.reduce((prev, fieldData) => {
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
            .reduceRight((res, key) => {
            return { [key]: res };
        }, fieldArray[1] ?? 'asc');
        return [...prev, parsedField];
    }, []);
}
exports.parseOrderBy = parseOrderBy;
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
