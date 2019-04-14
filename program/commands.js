const Validator = require('./validator').Validator;
const DatabaseCL = require('./database').Database;
const SchedulerCL = require('./scheduler').Scheduler;
const Functions = require('./misc/functions');

const Database = new DatabaseCL();
const Scheduler = new SchedulerCL();

const GetCommandDescription = require('./misc/functions').GetCommandDescription;

const SupportedGames = [
    "csgo",
    "osrs"
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
        run: async function (message, args) {
            let response;

            if (Validator.validateArguments(args)) {
                let command = Commands[args[0]];

                if (!command) {
                    throw new Error("Invalid arguments in command.");
                }

                response = GetCommandDescription(command);
            } else {
                response =  "";
                response += "To learn more about a command, type \"!help <command>\".\n";
                response += "Here are all of my commands:\n\n";

                for (let key in Commands){
                    response += Commands[key].command + "\n";
                }
            }
            return response;
        }
    },
    addgame: {
        requireAdmin: false,
        name: "addgame",
        command:"!addgame",
        description: "Adds current channel to update article schedule for the given game.",
        syntax: "!addgame <game>",
        example: "!addgame csgo",
        argvalues: SupportedGames,
        run: async function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                throw new Error("Invalid arguments in command.");
            }
            if (!await Database.AddGame(args[0], message.channel.id)){
                throw new Error("Something went wrong while adding game.");
            }

            return "Game successfully added!";
        }
    },
    removegame: {
        requireAdmin: false,
        name: "removegame",
        command: "!removegame",
        description: "Removes current channel from update article schedule for the given game.",
        syntax: "!removegame <game>",
        example: "!removegame csgo",
        argvalues: SupportedGames,
        run: async function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                throw new Error("Invalid arguments in command.");
            }
            if(!await Database.RemoveGame(args[0], message.channel.id)){
                throw new Error("Something went wrong while removing game.");
            }

            return "Game successfully removed.";
        }
    },
    news: {
        requireAdmin: false,
        name: "news",
        command: "!news",
        description: "Sends the latest news article for the given game to current channel.",
        syntax: "!news <game>",
        example: "!news csgo",
        argvalues: SupportedGames,
        run: async function(message, args){
            if (!Validator.validateArguments([args[0]])){
                throw new Error("Invalid arguments in command.");
            }
            message.reply("Getting news article, please wait...").then((msg) => msg.delete(3500));
            return await Functions.SendNewsArticle(args[0],[message.channel.id]);
        }
    },
    schedulestart: {
        requireAdmin: true,
        name: "schedulestart",
        command: "!schedulestart",
        description: "Starts update schedule. Only available to admin.",
        syntax: "!schedulestart",
        example: "!schedulestart",
        argvalues: [

        ],
        run: async function(message, args){
            return Scheduler.StartSchedule();
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
        run: async function(message, args){
            return Scheduler.StopSchedule();
        }
    }
};


module.exports = {
    Commands: Commands
};