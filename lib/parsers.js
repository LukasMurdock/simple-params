"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.parseNumber = void 0;
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
function parseDate(string, { fallback, min, max }) {
    const yyyymmddLength = 10;
    if (!string || string.length < yyyymmddLength)
        return fallback;
    const date = new Date(string);
    return isNaN(date.getTime())
        ? fallback
        : min && date < min
            ? min
            : max && date > max
                ? max
                : date;
}
exports.parseDate = parseDate;
