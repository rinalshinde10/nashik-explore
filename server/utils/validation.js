export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};


export const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 6;
};


export const isValidRating = (rating) => {
    return Number.isInteger(Number(rating)) &&
        Number(rating) >= 1 &&
        Number(rating) <= 5;
};