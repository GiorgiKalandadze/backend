const cron = require('node-cron');
const axios = require('axios');

const urgentQueries = [];
const queries = ['loans', 'guarantees', 'transfers', 'payments',
    'notice'];

cron.schedule('*/5 * * * * *', () => {
    console.log('Running a task every minute');
    requestAPI();
    setTimeout(() => {
        axios.get('https://dummyjson.com/products/1').then(response => {
            const{ stock} = response.data;
            if(stock > 10) {
                urgentQueries.push('notice');
            }
        });
    }, 15000);
});


function requestAPI() {
    for(const query of queries) {
        if(urgentQueries.includes(query)) {
            console.log('Fetch from specific instance N2 - ', query);
        } else {
            console.log('Fetch from default endpoint - ', query);
        }
    }
}