const Scrapers = require('./scrapers');

async function GetCSGOUpdate(){
    const scraper = new Scrapers.CSGOScraper();

    await scraper.GetNewsLink();

    if (!scraper.link){ throw new Error("Error while getting news article link."); }

    await Promise.all([
        scraper.GetNewsTitle(),
        scraper.GetNewsBody()
    ]);

    if (!scraper.title) {
        throw new Error("Error while getting news article title.");
    }
    if (!scraper.bodies) {
        throw new Error("Error while getting news article body.");
    }

    return [scraper.link, scraper.title, scraper.bodies];
}

async function GetOSRSUpdate(){
    const scraper = new Scrapers.OSRSScraper();

    await scraper.GetNewsLink();

    if (!scraper.link) { throw new Error("Error while getting news article link."); }

    await Promise.all([
       scraper.GetNewsTitle(),
       scraper.GetNewsBody()
    ]);

    if (!scraper.title) {
        throw new Error("Error while getting news article title.");
    }
    if (!scraper.bodies) {
        throw new Error("Error while getting news article body.");
    }

    return [scraper.link, scraper.title, scraper.bodies];
}

module.exports = {
    GetCSGOUpdate: GetCSGOUpdate,
    GetOSRSUpdate: GetOSRSUpdate
};