const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/; //Regex for only letters and digits
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 25;
const PASSWORD_REGEX = /^\S+$/; //Regex that doesn't contain whitespaces

const registerUserValidationConfig = {
    username: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'username is required',
        },
        {
            validateFunction: (value) => value?.length > USERNAME_MIN_LENGTH,
            errorMessage: `username length must be greater than ${USERNAME_MIN_LENGTH}`,
        },
        {
            validateFunction: (value) => value?.length < USERNAME_MAX_LENGTH,
            errorMessage: `username length must be less than ${USERNAME_MAX_LENGTH}`,
        },
        {
            validateFunction: (value) => USERNAME_REGEX.test(value),
            errorMessage: `username must contain only latin letters and digits`,
        },
    ],
    password: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'password is required',
        },
        {
            validateFunction: (value) => value?.length > PASSWORD_MIN_LENGTH,
            errorMessage: `password length must be greater than ${PASSWORD_MIN_LENGTH}`,
        },
        {
            validateFunction: (value) => value?.length < PASSWORD_MAX_LENGTH,
            errorMessage: `password length must be less than ${PASSWORD_MAX_LENGTH}`,
        },
        {
            validateFunction: (value) => PASSWORD_REGEX.test(value),
            errorMessage: `password must not contain whitespaces`,
        },
    ]

}
/**
 * @description Checks user's data(username, password) according to rules defined in 'registerUserValidationConfig'
 *   If all rule validations are passed returns 'true',
 *   otherwise 'false' with corresponding error message from rules config
 * @param user
 * @returns {Promise<{isValid: boolean}|{isValid: boolean, message: string}>}
 */
const validateUserRegister = async (user) => {
    for (const [key, validationRules] of Object.entries(registerUserValidationConfig)) {
        const value = user[key];
        for (const rule of validationRules) {
            const isValid = await rule.validateFunction(value);
            if (!isValid) {
                return {isValid: false, message: `Error on user property ${key}: ${rule.errorMessage}`}
            }
        }
    }
    return {isValid: true};
}
module.exports = {validateUserRegister};