# Simple Params

Simple, tiny, and typed parameter parser.

Built to configure a parser for `URLSearchParams` and adapt to Prisma Client Query, Firestore Query, etc., with ease.

[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) → [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) → API Config → Simple Query Object

## Download

```
npm install simple-params
```

## Usage

```typescript
import { parseNumber, simpleParams } from 'simple-params';

const api = simpleParams({
	size: (val) => 'I will always be this value',
	string: (val) => (val ? 'true' : 'false'),
	boolean: (val) => (val ? true : false),
	page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
});

const params = api.parse(urlSearchParams);
```

Simply provide the `simpleParams` function with parameter keys and validator functions.

## Get All

If you want to use [`getAll()`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/getAll) to receive all the values associated with a given search parameter as an array, you can pass a second parameter to simpleParams.

```typescript
import { parseNumber, simpleParams } from 'simple-params';

const api = simpleParams(
	{
		page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
	},
	{
		color: (val) => (val.length ? val : ['red']),
	}
);

const params = api.parse(urlSearchParams);
```

## Parsers

### parseNumber

```typescript
import { parseNumber, simpleParams } from 'simple-params';

const api = simpleParams({
	page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
});
```

### parseDate

```typescript
import { parseDate, simpleParams } from 'simple-params';

const api = simpleParams({
	startDate: (val) => parseDate(val, { fallback: new Date() }),
});
```

## Adapters

### Next.js API Routes

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { nextAdapter, parseNumber, simpleParams } from 'simple-params';

const api = simpleParams({
	page_size: (val) => parseNumber(val, { fallback: 1, min: 1, max: 100 }),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const params = api.parse(nextAdapter(req.query));
}
```
