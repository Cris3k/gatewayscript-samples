console.info("Reading  a non-JSON Request");

// Load the header-metadata API
var hm = require('header-metadata');

session.input.readAsBuffer(function (error, bufferObject) {
    // Asynchronous callback when request payload is received
    // If an error occurs, the error object will be populated.
    // A Buffer object holds binary data.
    if (error){
        console.error("readAsBuffer() failure: %s", error);
    }
    else {
        console.info("readAsBuffer() success: %s", bufferObject);
        
        //Set incoming buffer to JSON.
        var body = {};
        body.nonjson = bufferObject.toString();
        
        session.output.write(body);
        
        //Set Response HTTP Header
        hm.response.set('content-type','application/json');
    }
});
