const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./src/config.js');
const DBManager = require('./src/database/db-manager');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const {
    getEmployee,
    getEmployeesList,
    addEmployee,
    updateEmployee,
} = require('./src/modules/employees-and-departments/api-employee-handler');
const bcrypt = require('bcrypt');
const {registerUser, handleLogin} = require('./src/modules/auth/auth-handler');
const jwt = require('jsonwebtoken');
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

app.post('/api/updateEmployee', async (request, response) => {
    await updateEmployee(request, response);
});


app.get('/api/getUser', async (request, response) => {
    const {user} = request.query;
    const resultUser = await DBManager.getDocument(config.DB_NAME, config.USERS_COLLECTION, {user:user});
    return response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: '',
        data: {resultUser},
    });
});


app.post('/api/register', async (request, response) => {
    await registerUser(request, response);
});

app.post('/api/login', async (request, response) => {
   await handleLogin(request, response);
});
//
// const authMiddleware = (req, res, next) => {
//     try {
//         // Get token from request headers
//         const token = req.headers.authorization.split(' ')[1];
//
//         // Verify token and decode user data
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.decoded = decoded;
//
//         // Continue to next middleware or route handler
//         next();
//     } catch (error) {
//         // Handle errors
//         console.error('Error during authorization:', error);
//         res.status(401).json({ error: 'Unauthorized' });
//     }
//     next();
// };
//
// // Example usage of authMiddleware: protect a route
// app.get('/protected', authMiddleware, (req, res) => {
//     // Access decoded user data from req.userId
//     res.status(200).json({ message: 'Protected route', userId: req.decoded });
// });



