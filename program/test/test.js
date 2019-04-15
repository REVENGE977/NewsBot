const mocha = require("mocha");
const describe = mocha.describe;
const assert = require('assert');

const Commands = require('../commands').Commands;

const GetCommandDescription = require('../misc/functions').GetCommandDescription;

describe("GetCommandDescription", () => {

    it('should show description for "!nb help"', () => {
        let command = "help";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 help\n" +
            "Command:         !nb help\n" +
            "Description:       Show useful information about a command or show list of commands.\n" +
            "\n" +
            "Syntax:                !nb help ?<command>\n" +
            "Example:             !nb help getupdate\n" +
            "\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });

    it('should show description for "!nb addgame"', () => {
        let command = "addgame";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 addgame\n" +
            "Command:         !nb addgame\n" +
            "Description:       Adds current channel to update article schedule for the given game.\n" +
            "\n" +
            "Syntax:                !nb addgame <game>\n" +
            "Example:             !nb addgame csgo\n" +
            "\n" +
            "Allowed argument values: csgo,osrs" +
            "\n\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });

    it('should show description for "!nb removegame"', () => {
        let command = "removegame";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 removegame\n" +
            "Command:         !nb removegame\n" +
            "Description:       Removes current channel from update article schedule for the given game.\n" +
            "\n" +
            "Syntax:                !nb removegame <game>\n" +
            "Example:             !nb removegame csgo\n" +
            "\n" +
            "Allowed argument values: csgo,osrs" +
            "\n\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });

    it('should show description for "!nb news"', () => {
        let command = "news";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 news\n" +
            "Command:         !nb news\n" +
            "Description:       Sends the latest news article for the given game to current channel.\n" +
            "\n" +
            "Syntax:                !nb news <game>\n" +
            "Example:             !nb news csgo\n" +
            "\n" +
            "Allowed argument values: csgo,osrs" +
            "\n\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });

    it('should show description for "!nb schedulestart"', () => {
        let command = "schedulestart";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 schedulestart\n" +
            "Command:         !nb schedulestart\n" +
            "Description:       Starts update schedule.\n" +
            "\n" +
            "Syntax:                !nb schedulestart\n" +
            "Example:             !nb schedulestart\n" +
            "\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });

    it('should show description for "!nb schedulestop"', () => {
        let command = "schedulestop";
        command = Commands[command];

        const ExpectedResult =
            "\n" +
            "Name:                 schedulestop\n" +
            "Command:         !nb schedulestop\n" +
            "Description:       Stops update schedule.\n" +
            "\n" +
            "Syntax:                !nb schedulestop\n" +
            "Example:             !nb schedulestop\n" +
            "\n" +
            "If a command parameter includes a question mark (?), that parameter is optional.";

        const GotResult = GetCommandDescription(command);

        assert.strictEqual(GotResult, ExpectedResult);
    });
});