//ReactJS to send question and responses directly to the conversation container
//var react = require('react');
//var reactDOM = require('react-dom');

var apiai = require('apiai');
 
var app = apiai('e2fa5b6f7adf4b55aeb33a228d8691ca');
 
//for random session id
var session = Math.random()*100000000000; 
//var question = document.getElementById("input").value; 
var question = '';
var defaultQuestion = 'lost baggage';
var botResponse; 

if (question) {
     sendRequest(question); 
}else {
sendRequest(defaultQuestion); }

var request; 

function sendRequest (question) {
	console.log('request sent');

	request = app.textRequest(question, { 
	sessionId: session
});

request.on('response', function(response) {
	//Responded message from bot is within speech 
	botresponse = response.result.fulfillment.speech;
	
	console.log(botresponse);
	//setResponse(botResponse, document.getElementById('conv_list')); 
	
});
 
request.on('error', function(error) {
    console.log(error);
});
 
request.end();

/*function setResponse(message, container){
	return ( '<li>'+ message + '</li>'); 
 
}*/

}

