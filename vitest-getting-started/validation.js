export function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
    }
}

export function validateArrayNotEmpty(array) {
    if (array.length === 0 || !Array.isArray(array)) {
        throw new Error('Array is empty');
    }
}