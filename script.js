const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeComic(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const comicImage = $('#comic img').attr('src');
        const comicTitle = $('#comic img').attr('alt');
        const prevLink = $('a[rel="prev"]').attr('href');

        return { title: comicTitle, image: comicImage, prevLink };
    } catch (error) {
        console.error('Error scraping comic:', error);
    }
}

async function scrapePreviousComics(startUrl, count) {
    const comicsData = [];
    let currentUrl = startUrl;

    for (let i = 0; i < count; i++) {
        const comic = await scrapeComic(currentUrl);
        if (comic) {
            comicsData.push({ title: comic.title, image: comic.image });
            currentUrl = comic.prevLink;
        } else {
            break;
        }
    }

    console.log(comicsData);
}

const startUrl = 'https://www.buttersafe.com/'; // URL of the latest comic page
scrapePreviousComics(startUrl, 10);
