"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextAdapter = void 0;
/**
 * Convert NextApiRequestQuery to URLSearchParams
 */
function nextAdapter(params) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => urlParams.append(key, v));
        }
        else {
            urlParams.append(key, value || '');
        }
    });
    return urlParams;
}
exports.nextAdapter = nextAdapter;
