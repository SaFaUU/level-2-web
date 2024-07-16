import { expect, it, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import CryptoJS from "crypto-js";
import { encryptMessage, encryptMessagePromise } from "./async";

beforeAll(() => {
    console.log("Before all tests");
});

afterAll(() => {
    console.log("After all tests");
});

beforeEach(() => {
    console.log("Before each test");
});

afterEach(() => {
    console.log("After each test");
});

it("should encrypt message", async () => {
    const message = "Hello, World!";
    const key = "my-secret-key";
    const encryptedMessage = await new Promise((resolve, reject) => {
        encryptMessage(message, key, (encryptedMessage) => {
            if (encryptedMessage) {
                resolve(encryptedMessage);
            } else {
                reject(new Error("Failed to encrypt message"));
            }
        });
    })
    expect(encryptedMessage).toBeDefined();
})

it("should encrypt message with promise", async () => {
    const message = "Hello, World!";
    const key = "my-secret-key";
    const encryptedMessage = await encryptMessagePromise(message, key);
    expect(encryptedMessage).toBeDefined();
})

it("should encrypt this message correctly", async () => {
    const message = "Hello, World!";
    const key = "my-secret-key";
    const encryptedMessage = await encryptMessagePromise(message, key);
    expect(encryptedMessage).toBeDefined();

    const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    expect(decryptedMessage).toEqual(message);
})

