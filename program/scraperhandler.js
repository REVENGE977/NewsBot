const Scrapers = require('./scrapers');

async function GetNewestCSGOUpdate(){
    const scraper = new Scrapers.CSGOScraper();

    await scraper.GetNewsLink();

    if (!scraper.link){ throw new Error("Error while getting news article link."); }

    await Promise.all([
        scraper.GetNewsTitle(),
        scraper.GetNewsBody()
    ]);

    if (!scraper.title || !scraper.body){
        throw new Error("Error while getting news article title or body.");
    }

    return [scraper.link, scraper.title, scraper.body];
}

module.exports = {
    GetNewestCSGOUpdate: GetNewestCSGOUpdate
};