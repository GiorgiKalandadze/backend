const bcrypt = require('bcrypt');
const DBManager = require('../../database/db-manager');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const {validateUserRegister} = require('./validation-rules');


const registerUser = async (request, response) => {
    const {user} = request.body;
    const {isValid, message} = await validateUserRegister(user);
    if (!isValid) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: message,
        });
    }
    const {username, password} = user;

    // Check if user already exists
    const existingUser = await DBManager.getDocument(config.DB_NAME, config.USERS_COLLECTION, {username});
    if (existingUser) {
        return response.status(400).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: `User with username - ${username} already exists`,
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {username, password: hashedPassword};
    try {
        await DBManager.insertDocument(config.DB_NAME, config.USERS_COLLECTION, newUser);
    } catch (error) {
        return response.status(500).json({
            resultCode: -1,
            resultStatus: 'ERROR',
            message: `Error registering user - ${error}`,
        });
    }
    return response.status(500).json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: `User registered successfully`,
    });
};

// const handleLogin = async (request, response) => {
//     const {user, password} = request.body;
//     // validate
//     if (!user || !password) {
//         return response.status(400).json({
//             resultCode: -1,
//             resultStatus: 'ERROR',
//             message: 'Email and password are required',
//         });
//     }
//
//     // Check if email exists in the database
//     const exists = await DBManager.getDocument(config.DB_NAME, config.USERS_COLLECTION, {user: user});
//     if (!exists) {
//         return response.status(401).json({
//             resultCode: -1,
//             resultStatus: 'ERROR',
//             message: 'User doesn\'t exists',
//         });
//     }
//
//     const passwordMatch = bcrypt.compare(password, exists.password);
//     if(!passwordMatch) {
//         return response.status(401).json({
//             resultCode: -1,
//             resultStatus: 'ERROR',
//             message: 'Wrong Password',
//         });
//     }
//
//     // Generate JWT token
//     const token = jwt.sign({ userName: user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//     return response.json({
//         resultCode: 0,
//         resultStatus: 'SUCCESS',
//         message: '',
//         data: {token},
//     });
// };



module.exports = {registerUser, handleLogin};