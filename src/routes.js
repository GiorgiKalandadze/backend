const express = require('express');
const router = express.Router();
const {
    getEmployeesList,
    getEmployee,
    addEmployee,
    updateEmployee
} = require('./modules/employees-and-departments/api-employee-handler');
const {registerUser, handleLogin} = require('./modules/auth/auth-handler');

/**
 * @description Retrieves a list of employees with optional pagination.
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 *
 * @swagger
 * /api/getEmployees:
 *   get:
 *     summary: Get a list of employees
 *     description: Returns a list of employees
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: skip
 *         in: query
 *         type: integer
 *         description: Number of employees to skip
 *         required: false
 *       - name: take
 *         in: query
 *         type: integer
 *         description: Number of employees to take
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully retrieved list of employees
 *         schema:
 *           type: array
 *       400:
 *         description: Problem with skip or take parameter
 *       500:
 *         description: Internal server error
 */
router.get('/getEmployees', async (request, response) => {
    await getEmployeesList(request, response);

});

/**
 * Retrieves an employee according to id
 *
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.

/**
 * @swagger
 * /api/getEmployee/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Returns an employee with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved employee
 *
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/getEmployee/:id', async (request, response) => {
    await getEmployee(request, response);
});


/**
 * Adds an employee into database
 *
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
router.post('/addEmployee', async (request, response) => {
    await addEmployee(request, response);
});

/**
 * Updates employee's data
 *
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
router.post('/updateEmployee', async (request, response) => {
    await updateEmployee(request, response);
});


/**
 * Registers new User
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
router.post('/register', async (request, response) => {
    await registerUser(request, response);
});

/**
 * Handles login
 * @param {object} request - The HTTP request object.
 * @param {object} response - The HTTP response object.
 * @returns {object} - The HTTP response object.
 */
router.post('/login', async (request, response) => {
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
// router.get('/protected', authMiddleware, (req, res) => {
//     // Access decoded user data from req.userId
//     res.status(200).json({ message: 'Protected route', userId: req.decoded });
// });


router.post('/users', (req, res) => {
    // handle user creation request
});

module.exports = router;
