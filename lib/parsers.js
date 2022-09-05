"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
function parseNumber(string, { fallback, min, max }) {
    if (string === null)
        return fallback;
    const parse = Number(string);
    return isNaN(parse)
        ? fallback
        : min && parse < min
            ? min
            : max && parse > max
                ? max
                : parse;
}
exports.parseNumber = parseNumber;
