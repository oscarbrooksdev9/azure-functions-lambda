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
  try {

    var data = event.data;
    
    if(event.action == "delete"){
        logger.info('attempting to delete an API Gateway' + event.resourceGroupName);
        azureApi.deleteApi(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.clientId, data.clientSecret);
    }
    else if(event.action == "create"){
        logger.info('the value of data is: ' + event.action);
        logger.info('swagger data is: ' + data.swagger);
 
        result = await azureApi.createOrUpdate(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.swagger, data.basepath, data.clientId, data.clientSecret).promise();

    }

    return responseObj(result, event);

  } catch (e) {
    //Sample Error response for internal server error
    return JSON.stringify(errorHandler.throwInternalServerError("Sample error message"));

    //Sample Error response for Not Found Error
    //cb(JSON.stringify(errorHandler.throwNotFoundError("Sample message")));

    //Sample Error response for Input Validation Error
    //cb(JSON.stringify(errorHandler.throwInputValidationError("Sample message")));
  }
return result;

};
