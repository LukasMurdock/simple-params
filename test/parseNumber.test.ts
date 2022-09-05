import { expect, test } from 'vitest';
import { simpleParams, parseNumber } from '../lib/index';

const searchParams = new URLSearchParams(
	'min=0&max=200&nan=notanumber&parse=5'
);

const api = simpleParams({
	null: (val) => parseNumber(val, { fallback: 1 }),
	nan: (val) => parseNumber(val, { fallback: 2 }),
	min: (val) => parseNumber(val, { fallback: 10, min: 1, max: 100 }),
	max: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
	parse: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
});

const params = api.parse(searchParams);

test('Parse Number: Null Fallback', () => {
	expect(params.null).toBe(1);
});

test('Parse Number: NaN Fallback', () => {
	expect(params.nan).toBe(2);
});

test('Parse Number', () => {
	expect(params.min).toBe(1);
});

test('Parse Number: Less than Min', () => {
	expect(params.min).toBe(1);
});

test('Parse Number: Greater than Max', () => {
	expect(params.max).toBe(100);
});
