import { it, expect } from 'vitest'
import { add } from './math'

it("Should return correct sum if an array of number is proivded", () => {
    // arrange
    const numbers = [1, 2, 3];
    const expectedResult = numbers.reduce((a, b) => a + b, 0);

    // actions
    const result = add(numbers)

    // assertion
    expect(result).toBe(expectedResult)
})

it("should provide NaN if at least one argument is not a number", () => {
    // arrange
    const numbers = [1, "a", 3];
    const expectedResult = numbers.reduce((a, b) => a + b, 0);

    // actions
    const result = add(numbers)

    // assertion
    expect(result).toBeNaN()
})

it("should provide correct sum if an array numeric string is provided", () => {
    // arrange
    const numbers = ["1", "2", "3"];
    const expectedResult = numbers.reduce((a, b) => +a + +b, 0);

    // actions
    const result = add(numbers)

    // assertion
    expect(result).toBe(expectedResult)
})

it('should throw an error if no arguments is passed', () => {
    const resultFn = () => add();
    expect(resultFn).toThrow();

    // try {
    //     const result = add()
    // } catch (error) {
    //     expect(error).toBeDefined()
    // }
})

it('should throw an error if multiple arguments is passed', () => {
    const resultFn = () => {
        add(1, 2, 3);
    };
    expect(resultFn).toThrow(/is not iterable/i);
})
