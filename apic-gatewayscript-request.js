/*
 * @author: Rohit Goyal
 * 
 * The GatewayScript below has been tried and test with API Connect. To run this GatewayScript, you need DataPower Gateway.
 * 
 * The script captures commonly used code snippets to read or change incoming API request.
 */

/*
 * readInputAsJSON would try to read the incoming Request as json
 * 
 * It can take care of all HTTP methods and when Payload is empty 
 * 
 * for methods like GET, it won't return any error. 
 * 
 */
apim.readInputAsJSON(function (error,buffer) {
    if(error){
        //If incoming payload is non-JSON
        //throw an error
       throw error;
    }else{
    	//Read API Request
    	//----------------
    	
    	//Read Request Headers
    	var requestHeaders = apim.getvariable('request.headers');
        
        //Read Request Body
        var incomingPayload = apim.getvariable('request.body');
        
        //------------------------
        //Change or Update Headers
        //------------------------
        apim.setvariable('message.headers.customHeader', 'sampleValue');
        
        //------------------------------------------------------
        //Read Incoming App Details using APIc Context Variables
        //------------------------------------------------------
        var appMetaData = {};
        appMetaData.appName = apim.getvariable('client.app.name');
        appMetaData.devOrgName = apim.getvariable('client.org.name');
        
        //------------------------
        //Change incoming Payload
        //------------------------
        var temp = {};
        
        //buffer would be undefined when API request has Payload
        temp.oldPayload = buffer;
        temp.appMetaData = appMetaData;
        apim.setvariable('message.body', temp);
        
        //Setup the Content-Type for the next step
        apim.output('application/json')
        
        //-----------------------------------------
        //Pass incoming Query Parameters to Backend
        //------------------------------------------
        //Assuming targetURL is set in Properties, read the targetURL
        var targetURL = apim.getvariable('api.properties.targetURL');
        
        //Read incoming Query String
        var queryString = apim.getvariable('request.querystring');
        
        //Set new targetURL with querystring (under invoke this would be referred as $(newTargetURL)
        targetURL = targetURL + '?' + queryString;
        console.error(targetURL);
        apim.setvariable('newTargetURL',targetURL);
    }
});