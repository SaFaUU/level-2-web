export function add(numbers) {

    if (!Array.isArray(numbers)) {
        throw new TypeError('Argument is not iterable');
    }

    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += +numbers[i];
    }
    return sum;
}


const returnStrLength = (str) => str.length;