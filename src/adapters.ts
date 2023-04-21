/**
 * Convert NextApiRequestQuery to URLSearchParams
 */
export function nextAdapter(params: {
	[x: string]: string | string[] | undefined;
}) {
	const urlParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((v) => urlParams.append(key, v));
		} else {
			urlParams.append(key, value || '');
		}
	});
	return urlParams;
}
