"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleParams = void 0;
function simpleParams(getConfig, getAllConfig) {
    return {
        parse(params) {
            const getParams = Object.entries(getConfig).reduce((acc, [key, parseFunction]) => {
                acc[key] = parseFunction(params.get(key));
                return acc;
            }, {});
            const getAllParams = getAllConfig
                ? Object.entries(getAllConfig).reduce((acc, [key, parseFunction]) => {
                    acc[key] = parseFunction(params.getAll(key));
                    return acc;
                }, {})
                : {};
            return {
                ...getParams,
                ...getAllParams,
            };
        },
    };
}
exports.simpleParams = simpleParams;
