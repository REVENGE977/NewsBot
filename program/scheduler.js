const cron = require('node-cron');
const Discord = require('discord.js');
const ScraperHandler = require("./scraperhandler");
const DatabaseCL = require("./database").Database;

class Scheduler {
    constructor(Timer = "0 */30 * * * *"){
        if (!cron.validate(Timer)){  return console.log("Invalid cron timer."); }

        this.Database = new DatabaseCL();
        this.CRONSchedule = cron.schedule(Timer, () => {
            console.log("News getter scheduled...");
            this.SendUpdate("csgo",[],"bot");
            }, { scheduled: false, timezone: "Europe/Helsinki" });
    }

    /* Starts Cron Schedule */
    StartSchedule(){
        console.log("Starting cron schedule...");
        this.CRONSchedule.start();
        return "Cron schedule started successfully!";
    }
    /* Stops Cron schedule */
    StopSchedule(){
        console.log("Stopping cron schedule...");
        this.CRONSchedule.stop();
        return "Cron schedule stopped successfully.";
    }

    async SendUpdate(game, channels = [], sender = "user", ){

        console.log("Sending news article...");

        let scraperOutput, link, title, body, image, messageTitle;

        if (sender === "bot"){
            channels = await this.Database.GetChannels(game);
        }

        switch(game){
            case 'csgo':
                image = "counter_strike_wallpaper.png";

                scraperOutput = await ScraperHandler.GetCSGOUpdate();

                link = scraperOutput[0]; title = scraperOutput[1]; body = scraperOutput[2];

                messageTitle = "__**Latest CS:GO update:**__\n";

                if (sender === "bot"){
                    messageTitle = "__**New CS:GO update released!**__\n";
                    if (await this.Database.NewsArticleExists(game,title)){ return console.log("Old article."); }
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

                messageTitle = "__**Latest OSRS update**__\n\n";

                if (sender === "bot"){
                    messageTitle = "__**New OSRS update release!**__\n\n";
                    if (await this.Database.NewsArticleExists(game,title)){ return console.log("Old article"); }
                }

                messageTitle += "__**Update topics**__: \n\n";

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
            if (!await this.Database.AddNewsArticle(game,title)){
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
}

module.exports = {
    Scheduler: Scheduler
};