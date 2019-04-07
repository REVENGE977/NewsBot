const Discord = require('discord.js');
const client = new Discord.Client();

const DatabaseCL = require('./database').Database;
const Scheduler = require("./scheduler");
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

    module.exports.client = client;
    console.log("Bot connected!");

    client.on("message", (message) => {

        /* Split command by space */
        let args = message.toString().split(" ");

        let command, response;

        switch (command = args[0]){
            case '!help':
                response = GetBotCommands(args);
                message.reply(response.message ? response.message : response.error);
                break;
            case '!addchannel':
                Database.AddChannel(message.channel.id).then(response => message.reply(response));
                break;
            case '!removechannel':
                Database.RemoveChannel(message.channel.id).then(response => message.reply(response));
                break;
            case '!getupdate':
                Scheduler.SendUpdate([message.channel.id]);
                break;
            case '!schedulestart':
                if (message.author.id === AdminID){
                    response = Scheduler.StartSchedule();
                    message.reply(response.message ? response.message : response.error);
                } else { message.reply(new UnauthorizedError().error); }
                break;
            case '!schedulestop':
                if (message.author.id === AdminID){
                    response = Scheduler.StopSchedule();
                    message.reply(response.message ? response.message : response.error);
                } else { message.reply(new UnauthorizedError().error); }
                break;
            default:
                /* Invalid command entered */
                if (command.startsWith("!")){
                    message.reply(new UnknownCommandError(command).error);
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
            messageBody += "Syntax:             " + constants.BotCommands[command]["syntax"] + "\n";
            messageBody += "Example:          " + constants.BotCommands[command]["example"] + "\n\n";
            messageBody += "If a command parameter includes a question mark (?), that parameter is optional.";
        } else {
            return new InvalidArguementsError();
        }
    }

    output.message = messageBody;
    return output;
}

module.exports.SendMessage = SendMessage;