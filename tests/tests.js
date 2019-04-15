const chai = require('chai');
const describe = require("mocha");

const Commands = require('../program/commands').Commands;

const GetCommandDescription = require('../program/misc/functions').GetCommandDescription;

describe(GetCommandDescription, () => {
    it('should get command description', () => {
        let command = "!nb help";
        command = Commands[command];

        const ExpectedResult =
            "To learn more about a command, type \"!nb help <command>\".\n" +
            "Here are all of my commands:\n" +
            "\n" +
            "!nb help\n" +
            "!nb addgame\n" +
            "!nb removegame\n" +
            "!nb news\n" +
            "!nb schedulestart\n" +
            "!nb schedulestop";

        const GotResult = GetCommandDescription(command);

        expect(ExpectedResult).to.be.equal(GotResult);

    });
});