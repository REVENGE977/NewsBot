const Discord = require('discord.js');
const client = new Discord.Client();

const DatabaseCL = require('./database').Database;
const Scheduler = require("./scheduler");
const Validator = require('./validator').Validator;
const InvalidArguementsError = require("./errors").InvalidArguementsError;
const UnknownCommandError = require("./errors").UnknownCommandError;
const UnauthorizedError = require("./errors").UnauthorizedError;
const constants = require("./constants");

const Private = require('./private');
const BotPass = Private.BotPass;
const AdminID = Private.AdminID;

const Database = new DatabaseCL();

client.login(BotPass);

client.on("ready", () => {

    console.log("Bot connected!");

    client.on("message", (message) => {

        /* Split command by space */
        let args = message.toString().split(" ");

        let command, commandResponse;

        switch (command = args[0]){
            case '!help':
                commandResponse = GetBotCommands(args);
                message.reply(commandResponse.message ? commandResponse.message : commandResponse.error);
                break;
            case '!addchannel':
                Database.AddChannel(args[1], message.channel.id)
                    .then(response => { message.reply(response); })
                    .catch(error => { message.reply(error); });
                break;
            case '!removechannel':
                Database.RemoveChannel(args[1], message.channel.id)
                    .then(response => { message.reply(response); })
                    .catch(error => { message.reply(error); });
                break;
            case '!getupdate':
                if (!Validator.validateArguments([args[1]])){
                    return message.reply("Invalid arguments in command.");
                }
                message.reply("Getting update article, please wait...");
                Scheduler.SendUpdate(args[1],[message.channel.id])
                    .catch((error) => {
                        console.log(error);
                        message.reply("Something went wrong while getting update.");
                    });
                break;
            case '!schedulestart':
                if (message.author.id === AdminID){
                    commandResponse = Scheduler.StartSchedule();
                    message.reply(commandResponse.message ? commandResponse.message : commandResponse.error);
                } else { message.reply(new UnauthorizedError().error); }
                break;
            case '!schedulestop':
                if (message.author.id === AdminID){
                    commandResponse = Scheduler.StopSchedule();
                    message.reply(commandResponse.message ? commandResponse.message : commandResponse.error);
                } else { message.reply(new UnauthorizedError().error); }
                break;
            default:
                /* Invalid command entered */
                if (command.startsWith("!")){
                    message.reply(new UnknownCommandError(command).error + "\nIf you need help, type \"!help\"");
                }
                break;
        }
    });
});

function SendMessage(channel, message, embed = false){
    if (embed){ client.channels.get(channel).send(message, embed); }
    else { client.channels.get(channel).send(message); }
}

function GetBotCommands(args) {
    let output = {}, messageBody = "";
    let helpAboutCommand = args[1];

    /* If second parameter is not given */
    if (!helpAboutCommand) {
        messageBody = "To learn more about a command, type \"!help <command>\".\n";
        messageBody += "Here are all of my commands:\n\n";
        for (let key in constants.BotCommands) {
            messageBody += constants.BotCommands[key]["command"] + "\n";
        }
    } else { /* Second parameter given */
        let command;

        /* Remove exclamation mark */
        if (helpAboutCommand.indexOf("!") === 0) {
            command = helpAboutCommand.substr(1)
        } else {
            command = helpAboutCommand;
        }

        /* If command exists.. */
        if (constants.BotCommands[command]) {
            messageBody = "\nCommand:      " + constants.BotCommands[command]["command"] + "\n";
            messageBody += "Description:    " + constants.BotCommands[command]["description"] + "\n\n";
            messageBody += "Syntax:             " + constants.BotCommands[command]["syntax"] + "\n";
            messageBody += "Example:          " + constants.BotCommands[command]["example"] + "\n";
            messageBody += "Possible argument values:\n" + constants.BotCommands[command]["argvalues"] + "\n\n";
            messageBody += "If a command parameter includes a question mark (?), that parameter is optional.";
        } else {
            return new InvalidArguementsError();
        }
    }

    output.message = messageBody;
    return output;
}

module.exports.SendMessage = SendMessage;