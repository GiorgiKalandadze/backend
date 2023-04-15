const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.json({
        resultCode: 0,
        resultStatus: 'SUCCESS',
        message: 'Welcome',
    });
});

app.listen(3000, () => {
    console.log(`Listening to 3000`);
});