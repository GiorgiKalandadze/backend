const DBManager = require('../../database/db-manager');
const config = require('../../config');
const {validateEmployee} = require('./validation-rules');

const getEmployeesList = async (request, response) => {
    let {skip = 0, take = 10} = request.query;
    skip = Number(skip);
    take = Number(take);
    if (!(skip >= 0 && take >= 1 && Number.isInteger(Number(skip)) && Number.isInteger(Number(take)))) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error with query parameters skip or take',
            data: null,
        });
    }

    let employeesList;
    try {
        employeesList = await DBManager.getManyDocuments(config.DB_NAME, config.EMPLOYEE_COLLECTION, {}, skip, take);
    } catch (err) {
        console.error('Error while retrieving employees', err);
        return response.status(500).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error while reading file',
            data: null,
        });
    }
    return response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: '',
        data: {
            employees: employeesList,
        },
    });
};

const getEmployee = async (request, response) => {
    let {id} = request.params;
    id = Number(id);
    if (!(id && Number.isInteger(id))) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error on query param id. Id must be number',
            data: null,
        });
    }
    let employee;
    try {
        employee = await DBManager.getDocument(config.DB_NAME, config.EMPLOYEE_COLLECTION, {id: id});
    } catch (err) {
        console.error('Error while retrieving employees', err);
        return response.status(500).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error while retrieving employees',
            data: null,
        });
    }
    return response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: '',
        data: {employee},
    });
};


/**
 * Validates employee data and if it is valid inserts into collection
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
const addEmployee = async (request, response) => {
    const {employee} = request.body;
    const {isValid, message} = await validateEmployee(employee);
    if(!isValid) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: message,
            data: null,
        });
    }
    const numberOfEmployees = await DBManager.getCountOfDocuments(config.DB_NAME, config.EMPLOYEE_COLLECTION);
    const newEmployee = {id: numberOfEmployees, ...employee};
    try {
        await DBManager.insertDocument(config.DB_NAME, config.EMPLOYEE_COLLECTION, newEmployee);
    } catch (error) {
        console.error('Error while adding employee: ', error);
        return response.status(500).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error while adding employee',
            data: null,
        });
    }
    return response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: 'Employee added successfully',
        data: {},
    });


};

/**
 * Updated employee data
 * @param request
 * @param response
 * @returns {Promise<*>}
 */
const updateEmployee = async (request, response) => {
    const {employee} = request.body;
    const {isValid, message} = await validateEmployee(employee);
    if(!isValid) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: message,
            data: null,
        });
    }
    try {
        await DBManager.updateDocument(config.DB_NAME, config.EMPLOYEE_COLLECTION, {id: employee.id}, employee);
    } catch (error) {
        console.error('Error while updating employee: ', error);
        return response.status(500).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: 'Error while updating employee',
            data: null,
        });
    }
    return response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: 'Employee updated successfully',
        data: {},
    });


};

module.exports = {getEmployeesList, getEmployee, addEmployee, updateEmployee};

