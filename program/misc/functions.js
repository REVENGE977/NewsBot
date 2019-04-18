const Discord = require("discord.js");
const DatabaseCL = require('../database').Database;
const ScraperHandler = require('../scraperhandler');

function GetCommandDescription(command){
    let output = "\n";
    output += "Name:                 " + command.name + "\n";
    output += "Command:         " + command.command + "\n";
    output += "Description:       " + command.description + "\n\n";
    output += "Syntax:                " + command.syntax + "\n";
    output += "Example:             " + command.example + "\n";

    if (!(command.argvalues === undefined || command.argvalues.length === 0)){
        output += "\nAllowed argument values: " + command.argvalues + "\n";
    }

    output += "\nIf a command parameter includes a question mark (?), that parameter is optional.";
    return output;
}

async function SendNewsArticle(game, channels = [], sender = "user", ){

    const Database = new DatabaseCL();

    console.log("Sending news article...");

    let scraperOutput, link, title, body, image, messageTitle;

    if (sender === "bot"){
        channels = await Database.GetChannels(game);
    }

    switch(game){
        case 'csgo':
            image = "counter_strike_wallpaper.png";

            scraperOutput = await ScraperHandler.GetCSGOUpdate();

            link = scraperOutput[0]; title = scraperOutput[1]; body = scraperOutput[2];

            messageTitle = "__**Latest CS:GO news:**__\n";

            if (sender === "bot"){
                messageTitle = "__**New CS:GO update released!**__\n";
                if (await Database.NewsArticleExists(game,title)){ return console.log("Old article."); }
            }


            body = body.replace(/(\[[A-Za-z0-9]+])/g, (original) => {
                return "\n**" + original + "**";
            });
            body = body.replace(/([A-Za-z0-9]+[:])/g, (original) => {
                return "\n**" + original + "**";
            });

            break;
        case 'osrs':
            image = "oldschool.png";

            scraperOutput = await ScraperHandler.GetOSRSUpdate();

            link = scraperOutput[0]; title = scraperOutput[1]; body = scraperOutput[2];

            messageTitle = "__**Latest OSRS news:**__\n\n";

            if (sender === "bot"){
                messageTitle = "__**New OSRS update release!**__\n\n";
                if (await Database.NewsArticleExists(game,title)){ return console.log("Old article"); }
            }

            messageTitle += "__**Update topics**__: \n";

            break;
        default:
            throw new Error("Invalid game: " + game);
    }

    if (!scraperOutput || !channels){
        throw new Error("Invalid arguments in command.");
    }

    body = body.replace(undefined, "");

    const embed = new Discord.RichEmbed()
        .setTitle("__**" + title + "**__")
        .setURL(link)
        .setColor(524419);

    if (image) {
        embed.attachFiles(["./images/" + image])
            .setImage("attachment://" + image);
    }

    if (sender === "bot"){
        if (!await Database.AddNewsArticle(game,title)){
            return console.log("Error while adding news article to DB!");
        }
    }

    return {
        name: "sendupdate",
        channels: channels,
        messageTitle: messageTitle,
        body: body,
        embed: embed
    }
}

module.exports = {
    GetCommandDescription: GetCommandDescription,
    SendNewsArticle: SendNewsArticle
};