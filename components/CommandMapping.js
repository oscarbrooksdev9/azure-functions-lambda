const ApiApp = require('./ApiApp');
const FunctionApp = require('./FunctionApp');

module.exports = class CommandMapping {    
    constructor(){
        this.classList = new Map();
        this.classList.set('ApiApp', ApiApp);
        this.classList.set('FunctionApp', FunctionApp);
    }

    async process(data){
        this.instantiate(data);
        return this.execute(data);
    }

    async instantiate(data){
        if(this.classList.has(data.className)){
        this.instance = new (this.classList.get(data.className))(data);
        }
        else{
            var error = new Error(`Classname ${data.className} is not found.`);
            throw error;
        }
    }

    async execute(data){
        console.log(data.command);
        return await this.instance[data.command](data);
    }
}
