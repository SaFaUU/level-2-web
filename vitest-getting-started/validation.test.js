import { expect, it } from "vitest";
import { validateArrayNotEmpty, validateEmail } from "./validation";

it("should validate a correct email address", () => {
    const email = "kUk7z@example.com";

    const resultFn = () => {
        validateEmail(email)
    };

    expect(resultFn).not.toThrow()
})

it("should throw an error if an incorrect email address is provided", () => {
    const email = "test.com";

    const resultFn = () => {
        validateEmail(email)
    };

    expect(resultFn).toThrow()
})

it("should throw an error if an empty email address is provided", () => {
    const email = "";

    const resultFn = () => {
        validateEmail(email)
    };

    expect(resultFn).toThrow()
})

it("should validate a non-empty array", () => {
    const array = [1, 2, 3];

    const resultFn = () => {
        validateArrayNotEmpty(array)
    };

    expect(resultFn).not.toThrow()
})

