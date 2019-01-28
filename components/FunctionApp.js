const ResourceFactory = require('./ResourceFactory');

module.exports = class FunctionApp {    
    constructor(clientId, clientSecret, tenantId, subscriptionId){
        this.subscriptionId = subscriptionId;
        this.credentials = await  msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
    }

    async create(jsonData){
        console.log(jsonData);
        await ResourceFactory.createStorageAccount(resourceGroupName, this.subscriptionId, this.credentials);
        await ResourceFactory.createHostingPlan(resourceGroupName, this.subscriptionId, this.credentials);
        await ResourceFactory.createWebApp(resourceGroupName, appName, this.subscriptionId, this.credentials);
    }
}