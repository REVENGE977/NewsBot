const Discord = require('discord.js');

const Private = require('./private');
const BotPass = Private.BotPass;

const cron = require('node-cron');
const Functions = require('./misc/functions');

class Scheduler {
    constructor(Timer = "0 */15 * * * *"){
        if (!cron.validate(Timer)){  return console.log("Invalid cron timer."); }

        this.CRONSchedule = cron.schedule(Timer, async () => {
            console.log("News getter scheduled...");
            const CSGOResult = await Functions.SendNewsArticle("csgo",[],"bot");
            const OSRSResult = await Functions.SendNewsArticle("osrs",[],"bot");

            const client = new Discord.Client();

            client.login(BotPass);
            client.on('ready', () =>  {
                if (CSGOResult){
                    CSGOResult.channels.forEach((channel) => {
                        let embed = CSGOResult.embed;
                        console.log(channel);
                        try {
                            if (!client.channels.get(channel)){
                                return console.log("Unavailable channel: " + channel);
                            }
                            if (embed){
                                client.channels.get(channel).send(CSGOResult.messageTitle + CSGOResult.body, { embed });
                            } else {
                                client.channels.get(channel).send(CSGOResult.messageTitle + CSGOResult.body);
                            }
                        } catch (error){
                            return console.error(error);
                        }
                    });
                }
                if (OSRSResult){
                    OSRSResult.channels.forEach((channel) => {
                        let embed = OSRSResult.embed;
                        try {
                            if (!client.channels.get(channel)){
                                return console.log("Unavailable channel: " + channel);
                            }
                            if (embed){
                                client.channels.get(channel).send(OSRSResult.messageTitle + OSRSResult.body, { embed });
                            } else {
                                client.channels.get(channel).send(OSRSResult.messageTitle + OSRSResult.body);
                            }
                        } catch (error){
                            return console.error(error);
                        }
                    });
                }
            });

            client.destroy();
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
}

module.exports = {
    Scheduler: Scheduler
};