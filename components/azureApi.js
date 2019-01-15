const msRestAzure = require('ms-rest-azure');
const ApiManagementClient = require("azure-arm-apimanagement");

module.exports = {
    deleteApi,
    createOrUpdate,
}

async function deleteApi(resourceGroupName, serviceName, apiId, tenantId, subscriptionId, clientId, clientSecret) {
   var credentials = await msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
   const client = new ApiManagementClient(credentials, subscriptionId);
   var result = await client.api.deleteMethodWithHttpOperationResponse(resourceGroupName, serviceName, apiId, "*", null);
   return result; 
}

async function createOrUpdate(resourceGroupName, serviceName, apiId, tenantId, subscriptionId, swaggerString, basepath, clientId, clientSecret) {
    var parameters = {
          "contentFormat": "swagger-json",
          "contentValue": JSON.stringify(swaggerString),
          "path": basepath
        };
     
   var credentials = await msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
   const client = new ApiManagementClient(credentials, subscriptionId);
   var result = await client.api.createOrUpdateWithHttpOperationResponse(resourceGroupName, serviceName, apiId, parameters, null);
//   var result = await client.api.createOrUpdate(resourceGroupName, serviceName, apiId, parameters, function(err, result) {
        //   if (err) return err;
        //   return result;
        // });
   return result;
   
}