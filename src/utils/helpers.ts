export function isNumeric(num: string) {
    return /^[0-9]*$/.test(num);
}

export function isWhitespace(str: string) {
    return /\s/.test(str);
}