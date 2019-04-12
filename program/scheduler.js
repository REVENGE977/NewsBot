const cron = require('node-cron');
const Discord = require('discord.js');
const GetNewestCSGOUpdate = require("./scraperhandler").GetCSGOUpdate;
const DatabaseCL = require("./database").Database;
const Index = require('./index');

const Database = new DatabaseCL();

const CRONSchedule = CreateCRONSchedule("0 0 */2 * * *");

function CreateCRONSchedule(Timer){
    if (!cron.validate(Timer)){  return console.log("Invalid cron timer."); }
    return cron.schedule(
        Timer, () => {
            console.log("News getter scheduled...");
            SendUpdate("csgo",[],"bot");
        }, { scheduled: false, timezone: "Europe/Helsinki" });
}

/* Starts Cron Schedule */
function StartSchedule(){
    console.log("Starting cron schedule...");
    if (CRONSchedule){
        CRONSchedule.start();
        return "Cron schedule started successfully!";
    }  else { throw new Error("Failed to start CRON schedule."); }
}
/* Stops Cron schedule */
function StopSchedule(){
    console.log("Stopping cron schedule...");
    if (CRONSchedule){
        CRONSchedule.stop();
        return "Cron schedule stopped successfully.";
    } else { throw new Error("Failed to stop CRON schedule."); }
}

async function SendUpdate(game, channels = [], sender = "user", ){

    console.log("Sending news article...");

    let scraperOutput, link, title, body, image, messageTitle;

    if (sender === "bot"){
        channels = await Database.GetChannels(game);
    }

    switch(game){
        case 'csgo':

            image = "counter_strike_wallpaper.png";

            scraperOutput = await GetNewestCSGOUpdate();

            link = scraperOutput[0]; title = scraperOutput[1]; body = scraperOutput[2];

            messageTitle = "__**Latest CS:GO update:**__\n";

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

    channels.forEach((channel) => {
        try {
            Index.SendMessage(
                channel,
                messageTitle + body, { embed }
            );
        } catch (error) {
            console.error(error);
        }
    });

    if (sender === "bot"){
        if (!await Database.AddNewsArticle(game,title)){
            return console.log("Error while adding news article to DB!");
        }
    }
}

module.exports.SendUpdate = SendUpdate;
module.exports.StartSchedule = StartSchedule;
module.exports.StopSchedule = StopSchedule;
