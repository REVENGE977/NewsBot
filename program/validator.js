class Validator {
    static validateArguments(args){
        for (let i = 0; i < args.length; i++){
            if (args[i] === "" || args[i] === undefined){
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    Validator: Validator
};