const Validator = require('./validator').Validator;
const DatabaseCL = require('./database').Database;

const GetCommandDescription = require('./misc/functions').GetCommandDescription;

const Commands = {
    help: {
        requireAdmin: false,
        name: "help",
        command: "!help",
        description: "Show useful information about a command or show list of commands.",
        syntax: "!help ?<command>",
        example: "!help getupdate",
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
            "csgo"
        ],
        run: function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                return message.reply("Invalid arguments in command.");
            }
            const Database = new DatabaseCL();
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
        name: "removegame",
        command: "!removegame",
        description: "Removes current channel from update article schedule for the given game.",
        syntax: "!removegame <game>",
        example: "!removegame csgo",
        argvalues: [
            "csgo"
        ],
        run: function(message, args){
            if (!Validator.validateArguments([args[0], message.channel.id])){
                return message.reply("Invalid arguments in command.");
            }
            const Database = new DatabaseCL();
            Database.RemoveGame(args[0], message.channel.id)
                .then(() => { return message.reply("Game successfully removed."); })
                .catch((error) => {
                    console.error(error);
                    return message.reply("Something went wrong while removing game.");
                });
        }
    },
    getupdate: {
        name: "getupdate",
        command: "!getupdate",
        description: "Sends the latest update article for the given game to current channel.",
        syntax: "!getupdate <game>",
        example: "!getupdate csgo",
        argvalues: [
            "csgo"
        ],
        run: function(message, args){

        }
    },
};


module.exports = {
    Commands: Commands
};