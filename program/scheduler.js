const cron = require('node-cron');
const Discord = require('discord.js');
const GetNewestCSGOUpdate = require("./scraper").GetNewestCSGOUpdate;
const DatabaseCL = require("./database").Database;
const Index = require('./index');

const Database = new DatabaseCL();

const CRONSchedule = CreateCRONSchedule("0 0 */2 * * *");

function CreateCRONSchedule(Timer){
    if (!cron.validate(Timer)){  return console.log("Invalid cron timer."); }
    return cron.schedule(
        Timer, () => {
            console.log("News getter scheduled...");
            /* Send CSGO update */
            SendUpdate("csgo",[],"bot");
            /* Send FOR HONOR update */
        }, { scheduled: false, timezone: "Europe/Helsinki" });
}

/* Starts a given Cron Schedule */
function StartSchedule(){
    let output = {};
    console.log("Starting cron schedule...");
    if (CRONSchedule){
        CRONSchedule.start();
        output.message = "Cron schedule started successfully!";
    }  else { output.error = "Failed to start cron schedule." }
    return output;
}
/* Stops a given Cron schedule */
function StopSchedule(){
    let output = {};
    console.log("Stopping cron schedule...");
    if (CRONSchedule){
        CRONSchedule.stop();
        output.message = "Cron schedule stopped successfully.";
    } else { output.error = "Failed to stop cron schedule." }
    return output;
}

async function SendUpdate(game, channels = [], sender = "user", ){

    console.log("Sending news articles...");

    let scraperOutput, link, title, body, image, messageTitle;

    if (sender === "bot"){
        switch(game){
            case 'csgo':

                messageTitle = "__**Latest CS:GO update:**__\n";
                image = "counter_strike_wallpaper.png";

                if (sender === "bot"){
                    messageTitle = "__**New CS:GO update released!**__\n";
                    if (await Database.CSGONewsArticleExists(title)){ return console.log("Old article."); }
                }

                channels = await Database.GetCSGOChannels();
                scraperOutput = await GetNewestCSGOUpdate();

                link = scraperOutput[0]; title = scraperOutput[1]; body = scraperOutput[2];


                body = body.replace(/(\[[A-Za-z0-9]+])/g, (original) => {
                    return "\n**" + original + "**";
                });
                body = body.replace(/([A-Za-z0-9]+[:])/g, (original) => {
                    return "\n**" + original + "**";
                });

                break;
            default:
                return console.log("Invalid game: " + game);
        }
    }

    if (!scraperOutput || !channels){ return; }

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
        Index.SendMessage(
            channel,
            messageTitle + body, { embed }
        );
    });

    if (sender === "bot"){
        if (!await Database.AddNewsArticle(title)){ console.log("Error while adding news article to DB!"); }
    }
}

module.exports.SendUpdate = SendUpdate;
module.exports.StartSchedule = StartSchedule;
module.exports.StopSchedule = StopSchedule;