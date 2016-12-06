var apiai = require('apiai');
 
var app = apiai('d6e491b6f1754e9085b1704b0357fc06');
 

var request = app.textRequest('lost baggage', {
    sessionId: '12345'
});
 
request.on('response', function(response) {
    console.log(response);
});
 
request.on('error', function(error) {
    console.log(error);
});
 
request.end();