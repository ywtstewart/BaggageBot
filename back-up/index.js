//ReactJS to send question and responses directly to the conversation container
//var react = require('react');
//var reactDOM = require('react-dom');

var apiai = require('apiai');
 
var app = apiai('d6e491b6f1754e9085b1704b0357fc06');
 
//for random session id
var session = Math.random()*100000000000; 



var defaultQuestion = 'lost baggage';
var botResponse; 
var question;
var request;
 
function getQuestionState () {	
	console.log('got q state');

	var temp_  = document.getElementById('input');  
	if (temp_) {
		question = temp_; } else { question = defaultQuestion; }
		console.log("question is : " + question); 
		return (question);
}

function sendRequest () {
	console.log('request sent');

	if (question) {
     sendRequest(question); 
}else {
sendRequest(defaultQuestion); }

	request = app.textRequest(question, { 
	sessionId: session
});

request.on('response', function(response) {
	//Responded message from bot is within speech 
	botresponse = response.result.fulfillment.speech;
	
	console.log(botresponse);
	setResponse(botResponse, document.getElementById('conv_list')); 
	
});
 
request.on('error', function(error) {
    console.log(error);
});
 
request.end();

function setResponse(message, container){
	return ( '<li id="botResponse">'+ message + '</li>'); 
 
}


}