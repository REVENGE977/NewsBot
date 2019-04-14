function GetCommandDescription(command){
    let output = "\n";
    output += "Name:                 " + command.name + "\n";
    output += "Command:         " + command.command + "\n";
    output += "Description:       " + command.description + "\n\n";
    output += "Syntax:                " + command.syntax + "\n";
    output += "Example:             " + command.example + "\n";

    if (!(command.argvalues === undefined || command.argvalues.length === 0)){
        output += "\nAllowed argument values: " + command.argvalues + "\n";
    }

    output += "\nIf a command parameter includes a question mark (?), that parameter is optional.";
    return output;
}

module.exports = {
    GetCommandDescription: GetCommandDescription
};