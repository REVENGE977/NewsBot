const Discord = require('discord.js');
const client = new Discord.Client();

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

        /* From a Command -object */
        if (command in Commands){
            command = Commands[command];
        } else {
            return message.reply("Unknown command: " + command + "\nIf you need help, type \"!help\"")
        }

        /* Check for admin requirement */
        if (command.requireAdmin){
            if (message.author.id !== AdminID){
                return message.reply("Admin privileges are required to run \"" + command.name + "\".");
            }
        }

        /* Validate arguments */
        if (!(command.argvalues === undefined || command.argvalues.length === 0)){
            let invalidCommand = [false, undefined];
            args.forEach((arg) => {
                if (command.argvalues.indexOf(arg) === -1){
                    invalidCommand = [true, arg];
                }
            });

            if (invalidCommand[0]){ return message.reply("Invalid command argument: " + invalidCommand[1]); }
        }

        /* Run command defined in commands.js */
        command.run(message, args)
            .then((result) => {
                /* If function is "sendupdate" ... */
                if (result.name === "sendupdate"){
                    result.channels.forEach((channel) => {
                        let embed = result.embed;
                        try {
                            if (embed){ client.channels.get(channel).send(result.messageTitle + result.body, { embed }); }
                            else { client.channels.get(channel).send(result.messageTitle + result.body); }
                        } catch (error){
                            return console.error(error);
                        }
                    })
                } else {
                    return message.reply(result);
                }
            })
            .catch((error) => {
                console.error(error);
                return message.reply(error.message);
            });
    });
});