const Discord = require('discord.js');
const client = new Discord.Client();

const Commands = require('./commands').Commands;

const SchedulerCL = require('./scheduler').Scheduler;

const Private = require('./private');
const BotPass = Private.BotPass;
const AdminID = Private.AdminID;

client.login(BotPass);

client.on("ready", () => {

    console.log("Bot connected!");

    const Scheduler = new SchedulerCL();
    Scheduler.StartSchedule();

    client.on("message", (message) => {

        let handler = new CommandHandler(message);
        handler.HandleMessage();

    });
});

class CommandHandler {
    constructor(message){
        this.message = message;
    }

    HandleMessage(){

        /* Split command by space */
        let args = this.message.toString().split(" "), command = args[0];

        /* Remove prefix from args */
        args.splice(0,1);

        /* Ignore non-commands */
        if (!command.startsWith("!nb")){ return; }

        command = args[0];

        /* Remove command from args */
        args.splice(0,1);

        /* From a Command -object */
        if (command in Commands){
            command = Commands[command];
        } else {
            return this.message.reply("Unknown command: " + command + "\nIf you need help, type \"!nb help\"")
        }

        /* Check for admin requirement */
        if (command.requireAdmin){
            if (this.message.author.id !== AdminID){
                return this.message.reply("Admin privileges are required to run \"" + command.name + "\".");
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

            if (invalidCommand[0]){ return this.message.reply("Invalid command argument: " + invalidCommand[1]); }
        }

        /* Run command defined in commands.js */
        command.run(this.message, args)
            .then((result) => {
                /* If function is "sendupdate" ... */
                if (result.name === "sendupdate"){
                    result.channels.forEach((channel) => {
                        let embed = result.embed;

                        client.channels.get(channel).send(result.messageTitle);
                        result.bodies.forEach((body) => {
                            client.channels.get(channel).send(body);
                        });

                        if (embed){
                            client.channels.get(channel).send("", { embed });
                        }
                    })
                } else {
                    return this.message.reply(result);
                }
            })
            .catch((error) => {
                console.error(error);
                return this.message.reply(error.message);
            });
    }
}