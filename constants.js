const BotCommands = {
    "help":{
        "command":"!help",
        "description":
            "Show useful information about a command " +
            "or show list of commands.",
        "syntax":"!help ?<subject>",
        "example":"!help win"
    },
    "getupdate":{
        "command":"!getupdate",
        "description":
            "Sends the latest CS:GO update article to the " +
            "channel where this command gets called.",
        "syntax":"!getupdate",
        "example":"!getupdate"
    },
    "schedulestart":{
        "command":"!schedulestart",
        "description":
            "Starts CS:GO update schedule. Only available to admin.",
        "syntax":"!schedulestart",
        "example":"!schedulestart"
    },
    "schedulestop":{
        "command":"!schedulestop",
        "description":
            "Stops CS:GO update schedule. Only available to admin.",
        "syntax":"!schedulestop",
        "example":"!schedulestop"
    }
};

module.exports.BotCommands = BotCommands;