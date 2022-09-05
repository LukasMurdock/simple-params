export const regexConsectutiveSpaces = /\s+/;

export function removeConsecutiveSpaces(string: string) {
	return string.split(regexConsectutiveSpaces).join(' ');
}
