const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeComics() {
    try {
        const response = await axios.get('https://www.buttersafe.com/');

        const $ = cheerio.load(response.data);

        const comicsData = [];

        // Extract the comic image from the element with id 'comic'
        const comicImage = $('#comic img').attr('src');
        const comicTitle = $('#comic img').attr('alt');

        if (comicImage && comicTitle) {
            comicsData.push({ title: comicTitle, image: comicImage });
        }

        console.log(comicsData);

    } catch (error) {
        console.error('Error fetching comics:', error);
    }
}

scrapeComics();
