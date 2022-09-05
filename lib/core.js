"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleQueryParams = void 0;
function simpleQueryParams(config) {
    return {
        parse(params) {
            return Object.entries(config).reduce((acc, [key, parseFunction]) => {
                acc[key] = parseFunction(params.get(key));
                return acc;
            }, {});
        },
    };
}
exports.simpleQueryParams = simpleQueryParams;
