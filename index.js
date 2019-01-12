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
  logger.init(event, context);
  var result;
  var data = event.data;
  try {
    if(event.action == "delete"){
        azureApi.deleteApi(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.clientId, data.clientSecret);
    }
    else if(event.action == "create"){
        result = await azureApi.createOrUpdate(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.swagger, data.basepath, data.clientId, data.clientSecret).promise();
    }
    // return result;
  } catch (e) {
    //Sample Error response for internal server error
    return JSON.stringify(errorHandler.throwInternalServerError("Sample error message"));
  }
return result;
}

