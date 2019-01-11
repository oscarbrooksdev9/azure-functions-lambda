const msRestAzure = require('ms-rest-azure');
const ApiManagementClient = require("azure-arm-apimanagement");

module.exports = {
    deleteApi,
    createOrUpdate,
}

function deleteApi(resourceGroupName, serviceName, apiId, tenantId, subscriptionId, clientId, clientSecret) {
    msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, function(err, credentials) {
        if (err) return console.log(err);
        const client = new ApiManagementClient(credentials, subscriptionId);
        
        client.api.deleteMethod(resourceGroupName, serviceName, apiId, "*", function(err, result) {
          if (err) return console.log(err);
          return console.log(result);
        });
      });
}

async function createOrUpdate(resourceGroupName, serviceName, apiId, tenantId, subscriptionId, swaggerString, basepath, clientId, clientSecret) {
    var parameters = {
          "contentFormat": "swagger-json",
          "contentValue": swaggerString,
          "path": basepath
        };
        
    return parameters;
    //  console.log(parameters);
    // msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, function(err, credentials) {
    //     if (err) return console.log(err);
    //     const client = new ApiManagementClient(credentials, subscriptionId);
        
    //     client.api.createOrUpdate(resourceGroupName, serviceName, apiId, parameters, function(err, result) {
    //       if (err) return err;
    //       return result;
    //     });
    //   });
    }