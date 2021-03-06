console.info("Mangaging MQ and HTTP Headers with One GatewayScript");

// Load the header-metadata API
var hm = require('header-metadata');

//Represents the original collection of headers received off the wire. 
//For a request rule, the originals are the headers received in the request from the client. 
//For a response rule, these headers are the ones that are received in the response from the remote, target host. 
//Original headers are read only.
console.info("Original Headers: %j", hm.original.headers);

//Represents the current state of the headers as they are being passed from action to action along a processing rule. 
//The processing rule might be either a request rule or a response rule. Current headers are read/write.
console.info("Current headers: %j", hm.current.headers);

//Managing both MQ and HTTP type incoming request headers with one GatewayScript
var json_mqmd = hm.original.get({type: 'mq'}, 'MQMD');

//If json_mqmd is NULL, it means the incoming request to MPGW is HTTP 
if(json_mqmd){
    console.info("Manage incoming MQ Headers");
    
}else{
    console.info("Manage incoming HTTP Headers");
    
}
