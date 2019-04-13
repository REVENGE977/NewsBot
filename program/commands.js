const Validator = require('./validator').Validator;
const DatabaseCL = require('./database').Database;
const SchedulerCL = require('./scheduler').Scheduler;

const Database = new DatabaseCL();
const Scheduler = new SchedulerCL();

const GetCommandDescription = require('./misc/functions').GetCommandDescription;

const SupportedGames = [
    "csgo"
];


const Commands = {
    help: {
        requireAdmin: false,
        name: "help",
        command: "!help",
        description: "Show useful information about a command or show list of commands.",
        syntax: "!help ?<command>",
        example: "!help getupdate",
        argvalues: [

        ],
        run: function (message, args) {
            let response;

            if (Validator.validateArguments(args)) {
                let command = Commands[args[0]];

                if (command) {
                    response = GetCommandDescription(command);
                } else {
                    throw new Error("Invalid arguments in command.");
                }

            } else {
                response =  "";
                response += "To learn more about a command, type \"!help <command>\".\n";
                response += "Here are all of my commands:\n\n";

                for (let key in Commands){
                    response += Commands[key].command;
                }
            }
            return message.reply(response);
        }
    },
    addgame: {
        requireAdmin: false,
        name: "addgame",
        command:"!addgame",
        description: "Adds current channel to update article schedule for the given game.",
        syntax: "!addgame <game>",
        example: "!addgame csgo",
        argvalues: [
            SupportedGames
        ],
        run: function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                return message.reply("Invalid arguments in command.");
            }
            Database.AddGame(args[0], message.channel.id)
                .then((result) => {
                    if (result) { return message.reply("Game successfully added!"); }
                    else { return message.reply("Game has already been added.");  }
                })
                .catch(error => {
                    console.error(error);
                    return message.reply("Something went wrong while adding game.");
                });
        }
    },
    removegame: {
        requireAdmin: false,
        name: "removegame",
        command: "!removegame",
        description: "Removes current channel from update article schedule for the given game.",
        syntax: "!removegame <game>",
        example: "!removegame csgo",
        argvalues: [
            SupportedGames
        ],
        run: function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                return message.reply("Invalid arguments in command.");
            }
            Database.RemoveGame(args[0], message.channel.id)
                .then(() => { return message.reply("Game successfully removed."); })
                .catch((error) => {
                    console.error(error);
                    return message.reply("Something went wrong while removing game.");
                });
        }
    },
    getupdate: {
        requireAdmin: false,
        name: "getupdate",
        command: "!getupdate",
        description: "Sends the latest update article for the given game to current channel.",
        syntax: "!getupdate <game>",
        example: "!getupdate csgo",
        argvalues: [
            SupportedGames
        ],
        run: function(message, args){
            if (!Validator.validateArguments([args[0]])){
                return message.reply("Invalid arguments in command.");
            }
            message.reply("Getting update article, please wait...")
                .then((msg) => msg.delete(3500));
            Scheduler.SendUpdate(args[0],[message.channel.id])
                .catch((error) => {
                    console.error(error);
                    message.reply("Something went wrong while getting update.");
                });
        }
    },
    schedulestart: {
        requireAdmin: true,
        name: "schedulestart",
        command:" !schedulestart",
        description: "Starts update schedule. Only available to admin.",
        syntax: "!schedulestart",
        example: "!schedulestart",
        argvalues: [

        ],
        run: function(message, args){
            try {
                let response = Scheduler.StartSchedule();
                message.reply(response);
            } catch (error) {
                console.error(error);
                message.reply("Something went wrong while starting CRON schedule.");
            }
        }
    },
    schedulestop: {
        requireAdmin: true,
        name: "schedulestop",
        command: "!schedulestop",
        description: "Stops update schedule. Only available to admin.",
        syntax: "!schedulestop",
        example: "!schedulestop",
        argvalues: [

        ],
        run: function(message, args){
            try {
                let response = Scheduler.StopSchedule();
                message.reply(response);
            } catch (error) {
                console.error(error);
                message.reply("Something went wrong while stopping CRON schedule.");
            }
        }
    }
};


module.exports = {
    Commands: Commands
};