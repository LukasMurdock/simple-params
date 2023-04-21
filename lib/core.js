"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleParams = void 0;
// Naming scheme:
// T1: Type 1
// T2: Type 2
// R1: Return 1
// FR: Final Return
function simpleParams(getConfig, getAllConfig) {
    return {
        parse(params) {
            if (!getAllConfig) {
                return get(getConfig, params);
            }
            else {
                return {
                    ...get(getConfig, params),
                    ...getAll(getAllConfig, params),
                };
            }
        },
    };
}
exports.simpleParams = simpleParams;
function get(config, params) {
    return Object.entries(config).reduce((acc, [key, parseFunction]) => {
        acc[key] = parseFunction(params.get(key));
        return acc;
    }, {});
}
function getAll(config, params) {
    return Object.entries(config).reduce((acc, [key, parseFunction]) => {
        acc[key] = parseFunction(params.getAll(key));
        return acc;
    }, {});
}
