import { expect, it } from "vitest";
import { stringLength } from "./stringLength";

it('should return correct length for non-empty string', () => {
    const stringNumber = "10";

    const result = stringLength(stringNumber);

    expect(result).toBe(2);
})

it('should return NaN for empty string', () => {
    const stringNumber = "";

    const result = stringLength(stringNumber);

    expect(result).toBe(0);
})

it("throws error for nnon-string input", () => {
    expect(() => stringLength(null)).toThrow();
    expect(() => stringLength(undefined)).toThrow();
    expect(stringLength(123)).toBeUndefined();
})