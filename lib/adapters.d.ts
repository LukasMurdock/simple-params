/// <reference types="node" />
/**
 * Convert NextApiRequestQuery to URLSearchParams
 */
export declare function nextAdapter(params: {
    [x: string]: string | string[] | undefined;
}): import("url").URLSearchParams;
