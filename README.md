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

Simply provide the `simpleParams` function with query parameter keys and validator functions.
