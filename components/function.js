const axios = require('axios');
var msRestAzure = require('ms-rest-azure');
var webSiteManagementClient = require('azure-arm-website');
var Stream = require('stream');
/**
 * 
 * 
*/
module.exports = {
    upload
}
   
async function upload(resourceGroup, subscriptionId, tenantId, b64string ) {

    var clientId = process.env.AZURE_CLIENT_ID;
    var clientSecret = process.env.AZURE_CLIENT_SECRET;

    var buffer = Buffer.from(b64string, 'base64');
    var stream = new Stream.PassThrough();
    stream.end(buffer);

    
    var credentials = await  msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
    const client = await new webSiteManagementClient(credentials, subscriptionId, null, null);
    var pubcreds = await client.webApps.listPublishingCredentials(resourceGroup,"jazzoscar-test-oscar-lambda-j-30-prod", null);
       
        console.log("Trying to upload a file");
        var config = {
            headers: {
                Accept: '*/*'
              },
              auth: {
                username: pubcreds.publishingUserName,
                password: pubcreds.publishingPassword
              },
              encoding: null,
              body: stream
        };
           
       return await axios.put(
            `https://jazzoscar-test-oscar-lambda-j-30-prod.scm.azurewebsites.net/api/zipdeploy`,
            stream,
            config
        ).then((response) => {
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.data);
        }).catch((error) => {
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.data);
            console.log(error.response.data.error);
        });
    }
