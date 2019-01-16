/**
	Nodejs Lambda Template Project
	@Author:
	@version: 1.0
**/

const configModule = require("./components/config.js");
const logger = require("./components/logger.js");
const responseObj = require("./components/response.js");
const errorHandlerModule = require("./components/error-handler.js");

const azureApi = require("./components/azureApi.js");

module.exports.handler = async (event, context) => {

  //Initializations
  const config = configModule.getConfig(event, context);
  const errorHandler = errorHandlerModule();
//   logger.init(event, context);
  var result;
  var data = event.data;
  
  try {
    if(event.action == "delete"){
        result = await azureApi.deleteApi(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.clientId, data.clientSecret);
    }
    else if(event.action == "create"){
        result = await azureApi.createOrUpdate(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.swagger, data.basepath, data.clientId, data.clientSecret);
    }
    // return result;
  } 
  catch (error) {
      throw(error);
    // return JSON.stringify(error.message);
    result = { 
         'status':400, 
         'error':{
             'error_message' : 'your message',
             'details' : JSON.stringify(error)
          }
     }
  }
  return result;
}

