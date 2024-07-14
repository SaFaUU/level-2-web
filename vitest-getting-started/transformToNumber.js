export function transformToNumber(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Argument is not a string');
    }

    return Number(str);
}