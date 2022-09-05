# Simple Params

[URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) -> [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) -> API Config -> Simple Query Object -> Adapt to Prisma Client Query, Firestore Query, etc.

```typescript
const api = simpleQueryParams({
	size: (val) => parseNumber(val, { fallback: 10, min: 1, max: 2 }),
	pageCursor: (val) => parseNumber(val, { fallback: 0, min: 0, max: 2 }),
	string: (val) => (val ? 'false' : 'true'),
});

const params = api.parse(urlSearchParams);
```
