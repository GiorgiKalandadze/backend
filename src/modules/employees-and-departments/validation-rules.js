const DBManager = require('../../database/db-manager');
const config = require('../../config');

/**
 * Employee validation rules. Each property has its own list of rules. Each rule contains validate function
 * and corresponding error message.
 * Validate function checks the condition that given data must satisfy
 * For instance: requirement, correct type, length and etc
 */
const employeeDataValidatorConfig = {
    firstName: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'firstName property is required',
        },
        {
            validateFunction: (value) => typeof value === 'string',
            errorMessage: 'firstName must be of type string',
        },
        {
            validateFunction: (value) => value.length > 0,
            errorMessage: 'firstName must be non-empty',
        },
        {
            validateFunction: (value) => value.length < 50,
            errorMessage: 'firstName length must be less than 50',
        },
    ],
    secondName: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'secondName property is required',
        },
        {
            validateFunction: (value) => typeof value === 'string',
            errorMessage: 'secondName must be of type string',
        },
        {
            validateFunction: (value) => value.length > 0,
            errorMessage: 'secondName must be non-empty',
        },
        {
            validateFunction: (value) => value.length < 50,
            errorMessage: 'secondName length must be less than 50',
        },
    ],
    department: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'department property is required',
        },
        {
            validateFunction: (value) => typeof value === 'string',
            errorMessage: 'department must be of type string',
        },
        {
            validateFunction: (value) => value.length > 0,
            errorMessage: 'department must be non-empty',
        },
        {
            validateFunction: async (value) => {
                let allDepartments = await DBManager.getManyDocuments(config.DB_NAME, config.DEPARTMENTS_COLLECTION, {});
                return allDepartments.find((element) => element.department === value);
            },
            errorMessage: `Department doesn't exists`,
        },
    ],
};

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

module.exports = {employeeDataValidatorConfig, validateEmployee};