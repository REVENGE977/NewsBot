const rp = require('request-promise');
const $ = require('cheerio');
const url = "https://blog.counter-strike.net/index.php/category/updates/";

async function GetNewestCSGOUpdate(){
    try {

        let link = await GetLatestNewsLink();
        let title = await GetNewsTitle(link);
        let body = await GetNewsBody(link);

        return [link,title,body];
    } catch (error){ console.log(error); }
}

function GetLatestNewsLink(){
    return new Promise((resolve, reject) => {
        rp(url).then((html) => {
            resolve($("h2 > a", html)[0].attribs.href);
        }).catch((error) => { reject(error); });
    });
}

function GetNewsTitle(link){
    return new Promise((resolve, reject) => {
        rp(link).then((html) => {
            resolve($("h2 > a", html)[0].children[0].data);
        }).catch((error) => { reject(error); })
    });
}
function GetNewsBody(link){
    return new Promise((resolve, reject) => {
        let output = [];
        rp(link).then((html) => {

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

            let body = undefined;
            output.forEach((line) => {
                body += line;
                if (!line.endsWith("\n")){ body += "\n"; }
            });
            body += "\n";

            resolve(body);
        }).catch((error) => { reject(error); })
    });
}

module.exports.GetNewestCSGOUpdate = GetNewestCSGOUpdate;