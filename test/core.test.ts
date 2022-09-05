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

test('Parser Functions', () => {
	expect(params.size).toBe('I will always be this value');
	expect(params.string).toBe('false');
	expect(params.boolean).toBe(false);
	expect(params.page_size).toBe(1);
});
