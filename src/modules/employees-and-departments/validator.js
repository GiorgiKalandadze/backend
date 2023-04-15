const {employeeDataValidatorConfig} = require('./validation-rules');
/**
 * Validates employee object and its property according to validation rules
 * Returns true if data is valid and corresponding to rules
 * Return false with corresponding error message if some property doesn't correspond requirements
 * @param {Object} employee
 * @returns {Promise<{isValid: boolean}|{isValid: boolean, message: string}>}
 */
const validateEmployee = async (employee) => {
    for (const [key, validationRules] of Object.entries(employeeDataValidatorConfig)) {
        const value = employee[key];
        for (const rule of validationRules) {
            const isValid = await rule.validateFunction(value);
            if (!isValid) {
                return {isValid: false, message: `Error on employee property ${key}: ${rule.errorMessage}`}
            }
        }
    }
    return {isValid: true};
}

module.exports = {validateEmployee};