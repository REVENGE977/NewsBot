const Validator = require('./validator').Validator;
const DatabaseCL = require('./database').Database;
const SchedulerCL = require('./scheduler').Scheduler;
const Functions = require('./misc/functions');

const Database = new DatabaseCL();
const Scheduler = new SchedulerCL();

const GetCommandDescription = require('./misc/functions').GetCommandDescription;

const SupportedGames = [
    "csgo",
    "osrs",
    "dota2"
];


const Commands = {
    help: {
        requireAdmin: false,
        name: "help",
        command: "!nb help",
        description: "Show useful information about a command or show list of commands.",
        syntax: "!nb help ?<command>",
        example: "!nb help getupdate",
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
                response += "To learn more about a command, type \"!nb help <command>\".\n";
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
        command:"!nb addgame",
        description: "Adds current channel to update article schedule for the given game.",
        syntax: "!nb addgame <game>",
        example: "!nb addgame csgo",
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
        command: "!nb removegame",
        description: "Removes current channel from update article schedule for the given game.",
        syntax: "!nb removegame <game>",
        example: "!nb removegame csgo",
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
        command: "!nb news",
        description: "Sends the latest news article for the given game to current channel.",
        syntax: "!nb news <game>",
        example: "!nb news csgo",
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
        command: "!nb schedulestart",
        description: "Starts update schedule.",
        syntax: "!nb schedulestart",
        example: "!nb schedulestart",
        argvalues: [

        ],
        run: async function(message, args){
            return Scheduler.StartSchedule();
        }
    },
    schedulestop: {
        requireAdmin: true,
        name: "schedulestop",
        command: "!nb schedulestop",
        description: "Stops update schedule.",
        syntax: "!nb schedulestop",
        example: "!nb schedulestop",
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