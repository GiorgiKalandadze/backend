const crypto = require('crypto');

/**
 * Generates a random integer within the specified range.
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} - A random integer within the specified range.
 */
function generateRandomNumber(min, max) {
    const buffer = crypto.randomBytes(4); // generate a random 32-bit integer
    const randomValue = buffer.readUInt32BE(0); // read an unsigned 32-bit integer from the buffer
    const range = max - min + 1;
    return min + (randomValue % range);
}


/**
 * Generates a random string with the specified length, using a default character set.
 *
 * @param {number} length - The length of the random string.
 * @returns {string} - A random string with the specified length.
 */
function generateRandomString(length) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=';
    let result = '';
    for(let i = 0; i < length; i++){
        const randomIndex = generateRandomNumber(0, charSet.length - 1);
        result += charSet[randomIndex];
    }
    return result;
}
module.exports = {generateRandomNumber, generateRandomString};

console.log(generateRandomString(15));