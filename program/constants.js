const BotCommands = {
    "help":{
        "command":"!help",
        "description":
            "Show useful information about a command " +
            "or show list of commands.",
        "syntax":"!help ?<subject>",
        "example":"!help getupdate"
    },
    "addchannel":{
        "command":"!addchannel",
        "description":
            "Adds current channel to subscription list of regular update articles for the given game.",
        "syntax":"!addchannel <game>",
        "example":"!addchannel csgo",
        "argvalues":"csgo"
    },
    "removechannel":{
        "command":"!removechannel",
        "description":
            "Removes current channel from subscription list of regular update articles for the given game.",
        "syntax":"!removechannel <game>",
        "example":"!removechannel csgo",
        "argvalues":"csgo"
    },
    "getupdate":{
        "command":"!getupdate",
        "description":
            "Sends the latest update article for the given game to the " +
            "channel where this command gets called.",
        "syntax":"!getupdate <game>",
        "example":"!getupdate csgo"
    },
    "schedulestart":{
        "command":"!schedulestart",
        "description":
            "Starts update schedule. Only available to admin.",
        "syntax":"!schedulestart",
        "example":"!schedulestart"
    },
    "schedulestop":{
        "command":"!schedulestop",
        "description":
            "Stops update schedule. Only available to admin.",
        "syntax":"!schedulestop",
        "example":"!schedulestop"
    }
};

module.exports.BotCommands = BotCommands;