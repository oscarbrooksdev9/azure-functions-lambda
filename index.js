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


module.exports.handler = (event, context, cb) => {

  //Initializations
  const config = configModule.getConfig(event, context);
  const errorHandler = errorHandlerModule();
  logger.init(event, context);

  try {

    
    var data = event.data;
    if(event.action == "delete"){
        logger.info('attempting to delete an API Gateway' + event.resourceGroupName);
        azureApi.deleteApi(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.clientId, data.clientSecret);
    }
    else if(event.action == "create"){
        logger.info('the value of data is: ' + event.action);
        azureApi.createOrUpdate(data.resourceGroupName, data.serviceName, data.apiId, data.tenantId, data.subscriptionId, data.swaggerString, data.basepath, data.clientId, data.clientSecret)
    }
    
    //Following is a code snippet to fetch values from config file:
    const myVal = config.configKey;

    //Following code snippet describes how to log messages within your code:
    /*
    logger.error('Runtime errors or unexpected conditions.');
    logger.warn('Runtime situations that are undesirable or unexpected, but not necessarily "wrong".');
    logger.info('Interesting runtime events (Eg. connection established, data fetched etc.)');
    logger.verbose('Generally speaking, most lines logged by your application should be written as verbose.');
    logger.debug('Detailed information on the flow through the system.');
    */

    const sampleResponse = {
      "foo": "this is a test of package json",
      "bar": "bar-value",
      "configKeys": myVal
    };

    return cb(null, responseObj(sampleResponse, event));

  } catch (e) {
    //Sample Error response for internal server error
    return cb(JSON.stringify(errorHandler.throwInternalServerError("Sample error message")));

    //Sample Error response for Not Found Error
    //cb(JSON.stringify(errorHandler.throwNotFoundError("Sample message")));

    //Sample Error response for Input Validation Error
    //cb(JSON.stringify(errorHandler.throwInputValidationError("Sample message")));
  }


};
