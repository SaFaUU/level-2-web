import { transformToNumber } from "./transformToNumber";

function validateStringNotEmpty(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Argument is not a string');
    }

    if (str.length === 0) {
        throw new Error('Argument is an empty string');
    }
}

function validateNumber(number) {
    if (isNaN(number)) {
        throw new TypeError('Argument is not a number');
    }
}


export function cleanNumbers(inputNumbers) {
    const numbers = [];

    for (const numberInput of inputNumbers) {
        validateStringNotEmpty(numberInput);

        const number = transformToNumber(numberInput);

        validateNumber(number);

        numbers.push(number);
    }
    return numbers;
}