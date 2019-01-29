const ResourceFactory = require('./ResourceFactory');

module.exports = class FunctionApp {    
    constructor(clientId, clientSecret, tenantId, subscriptionId){
        this.subscriptionId = subscriptionId;
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async create(jsonData){
        console.log(jsonData);
        await this.login();
        await ResourceFactory.createStorageAccount(resourceGroupName, this.subscriptionId, this.credentials);
        await ResourceFactory.createHostingPlan(resourceGroupName, this.subscriptionId, this.credentials);
        await ResourceFactory.createWebApp(resourceGroupName, appName, this.subscriptionId, this.credentials);
    }

    async login(){
        this.credentials = await msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
    }
}