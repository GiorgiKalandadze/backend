const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tkt.ge/theatre';

const imdbURL = 'https://www.imdb.com/chart/top/';

function getTop250() {
    axios.get(imdbURL).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const moviesList = [];

        const givePrice = $('tbody.lister-list').find('span#price').text();
        $('tbody.lister-list tr').each((i, element) => {
            const name = $(element).find('td.titleColumn a').text();
            const date = $(element).find('td.titleColumn span').text();
            moviesList.push({name, date});
        });
        console.log(moviesList);
        console.log(moviesList.length);

    }).catch(error => {
        console.log(error);
    });
}

getTop250();

// axios.get(url).then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const events = [];
//
//     $('div[data-testid="event-item"]').each((i, element) => {
//         const name = $(element).find('h4[data-testid="title"]').text();
//         const location = $(element).find('p[data-testid="location"]').text();
//         const date = $(element).find('p:last-child').text();
//
//         events.push({name, location, date});
//     });
//
//     console.log(events);
//     console.log(events.length);
// }).catch(error => {
//     console.log(error);
// });