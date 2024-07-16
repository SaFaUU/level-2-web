import { beforeEach, describe, expect, it } from "vitest";
import { User } from "./hooks";

const testEmail = "testEmail@gmail.com";
let user;
beforeEach(() => {
    user = new User(testEmail);
})


describe("User", () => {
    it("should have an email property", () => {

        expect(user).toHaveProperty("email", testEmail);
    })


    it("should update email", () => {
        const newEmail = "newEmail@gmail.com";

        user.updateEmail(newEmail);
        expect(user.email).toBe(newEmail);
    })
})

it("should clean email", () => {
    const newEmail = "newEmail@gmail.com";

    user.updateEmail(newEmail);
    user.cleanEmail();

    expect(user.email).toBe("");
})