"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleParams = void 0;
function simpleParams(config) {
    return {
        parse(params) {
            return Object.entries(config).reduce((acc, [key, parseFunction]) => {
                acc[key] = parseFunction(params.get(key));
                return acc;
            }, {});
        },
    };
}
exports.simpleParams = simpleParams;
