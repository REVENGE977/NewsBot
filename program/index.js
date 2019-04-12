const Discord = require('discord.js');
const client = new Discord.Client();

const Command = require('./misc/classes').Command;

const Commands = require('./commands').Commands;


const Private = require('./private');
const BotPass = Private.BotPass;
const AdminID = Private.AdminID;

client.login(BotPass);

client.on("ready", () => {

    console.log("Bot connected!");

    client.on("message", (message) => {

        /* Split command by space */
        let args = message.toString().split(" "), command = args[0];

        /* Remove 'command' from args */
        args.splice(0,1);

        /* Ignore non-commands */
        if (!command.startsWith("!")){ return; }

        /* Remove exclamation mark */
        command = command.substr(1);

        try {
            command = Commands[command];
        } catch (error) {
            console.error(error);
            return message.reply("Unknown command: " + command + "\nIf you need help, type \"!help\"")
        }

        if (command.requireAdmin){
            if (message.author.id !== AdminID){
                return message.reply("Admin privileges are required to run \"" + command.name + "\".");
            }
        }

        command.run(message, args);

        /*
        switch (command.command){
            case '!help':
                try {
                    if (!Validator.validateArguments([args[1]])){
                        commandResponse = GetBotCommands();
                    } else {
                        commandResponse = GetBotCommand(args[1]);
                    }
                    message.reply(commandResponse);
                } catch (error) {
                    console.error(error);
                    message.reply("Something went wrong while getting commands.");
                }
                break;
            case '!addchannel':
                if (!Validator.validateArguments([args[1], message.channel.id])){
                    return message.reply("Invalid arguments in command.");
                }
                Database.AddChannel(args[1], message.channel.id)
                    .then((result) => {
                        if (result) { message.reply("Channel successfully added!"); }
                        else { message.reply("Channel has already been added.");  }
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply("Something went wrong while adding channel.");
                    });
                break;
            case '!removechannel':
                if (!Validator.validateArguments([args[1], message.channel.id])){
                    return message.reply("Invalid arguments in command.");
                }
                Database.RemoveChannel(args[1], message.channel.id)
                    .then(() => { message.reply("Channel successfully removed."); })
                    .catch((error) => {
                        console.error(error);
                        message.reply("Something went wrong while removing channel.");
                    });
                break;
            case '!getupdate':
                if (!Validator.validateArguments([args[1]])){
                    return message.reply("Invalid arguments in command.");
                }
                message.reply("Getting update article, please wait...")
                    .then((msg) => msg.delete(3500));
                Scheduler.SendUpdate(args[1],[message.channel.id])
                    .catch((error) => {
                        console.error(error);
                        message.reply("Something went wrong while getting update.");
                    });
                break;
            case '!schedulestart':
                if (message.author.id === AdminID){
                    try {
                        commandResponse = Scheduler.StartSchedule();
                        message.reply(commandResponse);
                    } catch (error) {
                        console.error(error);
                        message.reply("Something went wrong while starting CRON schedule.");
                    }
                } else { message.reply("You're not authorized to use this command."); }
                break;
            case '!schedulestop':
                if (message.author.id === AdminID){
                    try {
                        commandResponse = Scheduler.StopSchedule();
                        message.reply(commandResponse);
                    } catch (error) {
                        console.error(error);
                        message.reply("Something went wrong while stopping CRON schedule.");
                    }
                } else { message.reply("You're not authorized to use this command."); }
                break;
            default:
                /* Invalid command entered *//*
                if (command.command.startsWith("!")){
                    message.reply("Unknown command: " + command + "\nIf you need help, type \"!help\"");
                }
                break;
        }*/
    });
});

function SendMessage(channel, message, embed = false){
    if (embed){ client.channels.get(channel).send(message, embed); }
    else { client.channels.get(channel).send(message); }
}

module.exports = {
    SendMessage: SendMessage
};