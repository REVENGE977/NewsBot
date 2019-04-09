class UnknownCommandError {
    constructor(command){
        this.Command = command;
        this.Error = "Unknown command: " + this.Command;
    }
    get error(){
        return this.Error;
    }
}
class InvalidArguementsError {
    constructor(){
        this.Error = "Command contains invalid arguements.";
    }
    get error(){
        return this.Error;
    }
}
class UnauthorizedError {
    constructor(){
        this.Error = "You aren't authorized to do that!";
    }
    get error(){
        return this.Error;
    }
}

module.exports.UnknownCommandError = UnknownCommandError;
module.exports.InvalidArguementsError = InvalidArguementsError;
module.exports.UnauthorizedError = UnauthorizedError;