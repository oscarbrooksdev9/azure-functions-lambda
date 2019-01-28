const ApiApp = require('./ApiApp');
const FunctionApp = require('./FunctionApp');

module.exports = class CommandMapping {    
    constructor(){
        this.classList = new Map();
        this.classList.set('ApiApp', ApiApp);
        this.classList.set('FunctionApp', FunctionApp);
    }

    async process(className, commandName){
        this.instantiate(className);
        return this.execute(commandName);
    }



    async instantiate(className){
        if(this.classList.has(className)){
        this.instance = new (this.classList.get(className))();
        }
        else{
            var error = new Error(`Classname ${className} is not found.`);
            throw error;
        }
    }

    async execute(command){
        console.log(command);
        return await this.instance[command]();
    }
}
