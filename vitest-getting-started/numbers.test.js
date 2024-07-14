import { expect, it } from "vitest";
import { cleanNumbers } from "./numbers";

it("should return array of numbers if an array of string number is provided", () => {
    const stringNumbers = ["1", "2", "3"];

    const result = cleanNumbers(stringNumbers);

    expect(result).toEqual([1, 2, 3]);
})

it("should return empty array if an empty array is provided", () => {
    const stringNumbers = [];

    const result = cleanNumbers(stringNumbers);

    expect(result).toEqual([]);
})

it("should throw an error if at least an empty string is provided", () => {
    const stringNumbers = ["", "2", "3"];

    const resultFN = () => {
        cleanNumbers(stringNumbers);
    }

    expect(resultFN).toThrow();
})