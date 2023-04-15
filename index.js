const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./src/config.js');
const DBManager = require('./src/database/db-manager');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

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

