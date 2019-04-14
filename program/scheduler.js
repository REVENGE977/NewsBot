const cron = require('node-cron');
const DatabaseCL = require("./database").Database;
const functions = require('./misc/functions');

class Scheduler {
    constructor(Timer = "0 */30 * * * *"){
        if (!cron.validate(Timer)){  return console.log("Invalid cron timer."); }

        this.Database = new DatabaseCL();
        this.CRONSchedule = cron.schedule(Timer, () => {
            console.log("News getter scheduled...");
            functions.SendNewsArticle("csgo",[],"bot");
            functions.SendNewsArticle("csgo",[],"bot");
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