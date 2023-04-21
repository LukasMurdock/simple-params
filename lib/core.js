"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleParams = void 0;
function simpleParams(getConfig, getAllConfig) {
    return {
        parse(params) {
            return {
                ...Object.fromEntries(Object.entries(getConfig).map(([key, parseFunction]) => [
                    key,
                    parseFunction(params.get(key)),
                ])),
                ...(getAllConfig &&
                    Object.fromEntries(Object.entries(getAllConfig).map(([key, parseFunction]) => [
                        key,
                        parseFunction(params.getAll(key)),
                    ]))),
            };
        },
    };
}
exports.simpleParams = simpleParams;
