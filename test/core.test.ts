import { expect, test } from 'vitest';
import { simpleParams, parseNumber, nextAdapter } from '../lib/index';

const url = new URL('https://lukasmurdock.com/');

const api = simpleParams(
	{
		size: (val) => 'I will always be this value',
		string: (val) => (val ? 'true' : 'false'),
		boolean: (val) => (val ? true : false),
		page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
	},
	{
		emptyArray: (val) => val,
		array: (val) => (val.length ? val : ['one']),
	}
);

const params = api.parse(url.searchParams);

test('URLSearchParams Parser Functions', () => {
	expect(params.size).toBe('I will always be this value');
	expect(params.string).toBe('false');
	expect(params.boolean).toBe(false);
	expect(params.page_size).toBe(1);
	expect(params.emptyArray).toEqual([]);
	expect(params.array).toEqual(['one']);
});

const urlSearchParams = new URLSearchParams({
	size: 'I am not the final value',
	string: 'true',
	boolean: 'true',
	page_size: '10',
});

urlSearchParams.append('emptyArray', '');
urlSearchParams.append('array', 'one');
urlSearchParams.append('array', 'two');
urlSearchParams.append('array', 'three');

const params2 = api.parse(urlSearchParams);

test('URLSearchParams Parser Functions', () => {
	expect(params2.size).toBe('I will always be this value');
	expect(params2.string).toBe('true');
	expect(params2.boolean).toBe(true);
	expect(params2.page_size).toBe(10);
	expect(params2.emptyArray).toEqual(['']);
	expect(params2.array).toEqual(['one', 'two', 'three']);
});

type NextApiRequestQuery = {
	[x: string]: string | string[] | undefined;
};

const paramsObject = {
	size: 'I will always be this value',
	string: 'true',
	boolean: 'true',
	page_size: '10',
	emptyArray: [],
	array: ['one', 'two', 'three'],
} as NextApiRequestQuery;

const params3 = api.parse(nextAdapter(paramsObject));

test('Object Parser Functions', () => {
	expect(params3.size).toBe('I will always be this value');
	expect(params3.string).toBe('true');
	expect(params3.boolean).toBe(true);
	expect(params3.page_size).toBe(10);
	expect(params3.emptyArray).toEqual([]);
	expect(params3.array).toEqual(['one', 'two', 'three']);
});
