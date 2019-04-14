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

class OSRSScraper {
    constructor(){
        this.url = "https://oldschool.runescape.com/";
    }

    GetNewsLink(){
        return new Promise((resolve, reject) => {
            rp(this.url).then((html) => {
                let articles = $("article.news-article", html);

                for (let i = 0; i < articles.length; i++){
                    if ($("span.news-article__sub", html)[i].children[0].data === "Game Updates "){
                        this.link = $("h3.news-article__title > a", html)[i].attribs.href;
                        break;
                    }
                }
                resolve();
            }).catch((error) => { return reject(error); });
        });
    }

    GetNewsTitle(){
        return new Promise((resolve, reject) => {
            rp(this.link).then((html) => {
                this.title = $("#osrsArticleHolder > div.left > h2", html)[0].children[0].data;
                resolve();
            }).catch((error) => { return reject(error); })
        });
    }
    GetNewsBody(){
        return new Promise((resolve, reject) => {
            let output = [];
            rp(this.link).then((html) => {

                let articleHolderChildren = $(".osrsArticleContentText", html)[0].children;

                articleHolderChildren.forEach((child) => {
                    if (child.name === "center"){
                        child.children.forEach((child) => {
                            if (child.name === "font"){
                                child.children.forEach((child) => {
                                    if (child.type === "text"){
                                        if (child.data !== "\n"){
                                            let headline = child.data;
                                            if (headline.indexOf(",") === 0){
                                                headline = headline.substr(1);
                                            }
                                            output.push("**" + headline + "**\n");
                                        }
                                    }
                                });
                            }
                        });
                    }
                });

                this.body = output + "\n";
                resolve();
            }).catch((error) => { return reject(error); })
        });
    }
}

module.exports = {
    CSGOScraper: CSGOScraper,
    OSRSScraper: OSRSScraper
};