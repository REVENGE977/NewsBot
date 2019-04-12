const rp = require('request-promise');
const $ = require('cheerio');

class CSGOScraper {
    constructor(){
        this.url = "https://blog.counter-strike.net/index.php/category/updates/";
    }

    GetNewsLink(){
        return new Promise((resolve, reject) => {
            rp(this.url).then((html) => {
                this.link = $("h2 > a", html)[0].attribs.href;
                resolve();
            }).catch((error) => { return reject(error); });
        });
    }

    GetNewsTitle(){
        return new Promise((resolve, reject) => {
            rp(this.link).then((html) => {
                this.title = $("h2 > a", html)[0].children[0].data;
                resolve();
            }).catch((error) => { return reject(error); })
        });
    }
    GetNewsBody(){
        return new Promise((resolve, reject) => {
            let output = [];
            rp(this.link).then((html) => {

                let childCount = $("div.inner_post p", html).length;
                for (let i = 1; i < childCount; i++){
                    let childCount = $("div.inner_post p", html)[i].children.length;
                    for (let y = 0; y < childCount; y++){
                        let _data = ($("div.inner_post p", html)[i].children[y].data);
                        if (_data && _data !== ""){
                            output.push(_data.replace(/\n/g, "") + "\n");
                        }
                    }
                }

                let body = "";
                output.forEach((line) => {
                    body += line;
                    if (!line.endsWith("\n")){ body += "\n"; }
                });
                body += "\n";

                this.body = body;
                resolve();
            }).catch((error) => { return reject(error); })
        });
    }
}

module.exports = {
    CSGOScraper: CSGOScraper
};