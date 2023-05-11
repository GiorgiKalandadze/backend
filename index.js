const express = require('express');
const app = express();
const router = require('./src/routes');
const bodyParser = require('body-parser');

const config = require('./src/config.js');

const DBManager = require('./src/database/db-manager');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    swaggerDefinition: {
        info: {
            title: 'Employee API',
            version: '1.0.0',
            description: 'API for managing employees',
        },
    },
    apis: ['./src/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.listen(config.port, () => {
    console.log(`Listening to ${config.port}`);
});

/**
 * Connects to mongo and keeps client in DBManager class
 * @returns {Promise<void>}
 */
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Successfully connected to Mongo');
        DBManager.setClient(client);
    } catch (e) {
        console.error('Error connecting to MongoDB client: ', e);
    }
}

connectToMongo().catch(()=>{});


app.get('/', async (request, response) => {
    response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: 'Welcome',
    });
});



