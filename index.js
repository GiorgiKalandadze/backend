const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./src/config.js');
const DBManager = require('./src/database/db-manager');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const {getEmployee, getEmployeesList, addEmployee} = require('./src/modules/employees-and-departments/api-employee-handler');
app.listen(config.port, () => {
    console.log(`Listening to ${config.port}`);
});

async function main() {
    try {
        await client.connect();
        console.log('Successfully connected to Mongo');
        DBManager.setClient(client);
    } catch (e) {
        console.error('Error connecting to MongoDB client: ', e);
    }
}
main().catch();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: 'Welcome',
    });
});



/**
 * Retrieves a list of employees with optional pagination.
 *
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
app.get('/api/getEmployees', async (request, response) => {
    await getEmployeesList(request, response);

});

/**
 * Retrieves an employee according to id
 *
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
app.get('/api/getEmployee/:id', async (request, response) => {
    await getEmployee(request, response);
});

app.post('/api/addEmployee', async (request, response) => {
    await addEmployee(request, response);
});




