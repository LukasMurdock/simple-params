import { expect, test } from 'vitest';
import { simpleParams, parseDate } from '../lib/index';
import { addDays } from './dateUtils';

const currentDate = new Date();

const searchParams = new URLSearchParams({
	null: '',
	notADate: '2022-10-af',
	min: '',
	max: '',
	parseISO: addDays(currentDate, 7).toISOString(),
	parse: addDays(currentDate, 7).toISOString().split('T')[0],
});

const api = simpleParams({
	notThere: (val) => parseDate(val, { fallback: currentDate }),
	null: (val) => parseDate(val, { fallback: currentDate }),
	notADate: (val) => parseDate(val, { fallback: currentDate }),
	parse: (val) => parseDate(val, { fallback: currentDate }),
});

const params = api.parse(searchParams);

test('Parse Date: Not There Fallback', () => {
	expect(params.notThere).toBe(currentDate);
});

test('Parse Date: Null Fallback', () => {
	expect(params.null).toBe(currentDate);
});

test('Parse Date: Not A Date Fallback', () => {
	expect(params.notADate).toBe(currentDate);
});

// test('Parse Date', () => {
// 	expect(params.min).toBe(1);
// });

// test('Parse Date: Less than Min', () => {
// 	expect(params.min).toBe(1);
// });

// test('Parse Date: Greater than Max', () => {
// 	expect(params.max).toBe(100);
// });
