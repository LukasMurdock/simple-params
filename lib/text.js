"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConsecutiveSpaces = exports.regexConsectutiveSpaces = void 0;
exports.regexConsectutiveSpaces = /\s+/;
function removeConsecutiveSpaces(string) {
    return string.split(exports.regexConsectutiveSpaces).join(' ');
}
exports.removeConsecutiveSpaces = removeConsecutiveSpaces;
