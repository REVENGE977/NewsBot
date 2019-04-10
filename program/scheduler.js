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
            /* Send CS:GO update */
            SendCSGOUpdate([],"bot");
            /* Send FOR HONOR update */
            console.log("News getter scheduled...");
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

async function SendCSGOUpdate(channels = [], sender = "user", ){

    console.log("Sending CS news...");

    if (sender === "bot"){
        channels = await Database.GetChannels();
    }

    let output = await GetNewestCSGOUpdate();

    if (!output){ return; }

    let link = output[0], title = output[1], body = output[2];

    /* Check if article exists already */
    if (sender === "bot"){
        if (await Database.NewsArticleExists(title)){
            return console.log("News article already exists.");
        }
    }

    body = body.replace(undefined, "");

    body = body.replace(/(\[[A-Za-z0-9]+])/g, (original) => {
        return "\n**" + original + "**";
    });
    body = body.replace(/([A-Za-z0-9]+[:])/g, (original) => {
        return "\n**" + original + "**";
    });

    const embed = new Discord.RichEmbed()
        .setTitle("__**" + title + "**__")
        .setURL(link)
        .setColor(524419)
        .attachFiles(["./images/counter_strike_wallpaper.png"])
        .setImage("attachment://counter_strike_wallpaper.png");

    let messageTitle = "__**Latest CS:GO update:**__\n";
    if (sender === "bot"){ messageTitle = "__**New CS:GO update released!**__\n"; }

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

module.exports.CreateCSNewsSchedule = CreateCRONSchedule;
module.exports.SendUpdate = SendCSGOUpdate;
module.exports.StartSchedule = StartSchedule;
module.exports.StopSchedule = StopSchedule;