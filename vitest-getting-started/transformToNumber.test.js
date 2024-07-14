import { expect, it } from "vitest";
import { transformToNumber } from "./transformToNumber";

it("should transform string to number", () => {
    const stringNumber = "10";

    const result = transformToNumber(stringNumber);

    expect(result).toBeTypeOf("number");
    expect(result).not.toBeTypeOf("string");
    expect(isNaN(result)).toBe(false);
})

