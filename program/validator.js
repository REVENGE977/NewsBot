class Validator {
    static validateArguments(args){

        if (args === undefined || args.length === 0){ return false; }

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