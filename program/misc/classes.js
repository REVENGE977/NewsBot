const Commands = require('../commands').Commands;

class Command {
    constructor(command){
        if (!command) { throw new Error("Invalid command: " + command); }

        /* Remove exclamation mark */
        if (command.indexOf("!") === 0) { command = command.substr(1); }

        command = Commands[command];

        this.name = command.name;
        this.command = command.command;
        this.description = command.description;
        this.syntax = command.syntax;
        this.example = command.example;
        this.endText = "";

        if (command["argvalues"]){
            this.argvalues = command.argvalues;
        }
        this.run = command.run();
    }
}
class CommandDescription {
    constructor(command){
        this.command = command;
        this.description = this.GetCommandDescription();
    }

    GetCommandDescription(){
        let output = "\n";
        output += "Name:                 " + this.command.name + "\n";
        output += "Command:         " + this.command.command + "\n";
        output += "Description:       " + this.command.description + "\n\n";
        output += "Syntax:                " + this.command.syntax + "\n";
        output += "Example:             " + this.command.example + "\n";

        if (this.command.argvalues){
            output += "\nAllowed argument values: " + this.command.argvalues + "\n";
        }

        output += "\n" + this.command.endText;
        return output;
    }
}

module.exports = {
    Command: Command,
    CommandDescription: CommandDescription
};