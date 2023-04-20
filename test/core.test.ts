import { assert, expect, test } from 'vitest';
import { simpleParams, parseNumber } from '../lib/index';

const url = new URL('https://lukasmurdock.com/');

const api = simpleParams({
	size: (val) => 'I will always be this value',
	string: (val) => (val ? 'true' : 'false'),
	boolean: (val) => (val ? true : false),
	page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
});

const params = api.parse(url.searchParams);

test('URLSearchParams Parser Functions', () => {
	expect(params.size).toBe('I will always be this value');
	expect(params.string).toBe('false');
	expect(params.boolean).toBe(false);
	expect(params.page_size).toBe(1);
});

const paramsObject = {
	size: 'I will always be this value',
	string: 'true',
	boolean: 'true',
	page_size: '10',
};

const params2 = api.parse(paramsObject);

test('Object Parser Functions', () => {
	expect(params2.size).toBe('I will always be this value');
	expect(params2.string).toBe('true');
	expect(params2.boolean).toBe(true);
	expect(params2.page_size).toBe(10);
});
