const DBManager = require('../../database/db-manager');
const config = require('../../config');

/**
 * Employee validation rules. Each property has its own list of rules. Each rule contains validate function
 * and corresponding error message.
 * Validate function checks the condition that given data must satisfy
 * For instance: requirement, correct type, length and etc
 */
const employeeDataValidatorConfig = {
    id: [
        {
            validateFunction: (value) => value !== undefined,
            errorMessage: 'id property is required',
        },
        {
            validateFunction: (value) => typeof value === 'number',
            errorMessage: 'id must be of type number',
        },
        {
            validateFunction: (value) => value.length > 0,
            errorMessage: 'id must be positive number',
        },
    ],
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
                const allDepartments = await DBManager.getManyDocuments(config.dbName, config.departmentsCollection, {});
                return allDepartments.includes(value);
            },
            errorMessage: `Department doesn't exists`,
        },
    ],
};

module.exports = {employeeDataValidatorConfig};