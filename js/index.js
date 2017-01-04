// JavaScript Document
var botArray = [[4,"Anna"], [2,"Chris"], [6,"Henk"], [7,"Oddy"]];
//var input =prompt("Enter belt number");
var input = 4; 
var botName;

$(document).ready(function(){
	$("#main-menu").hide(); 
	$("#tp_One").show();
	botNameGenerator(input); 
});

function botNameGenerator(input) {
	 
	for ( i = 0; i<botArray.length; i++){
	
	if (input == botArray[i][0]){
		botName = botArray[i][1];
	}else {botName = "Anna";}
	}
	console.log(botName);
	$("#nav-bar").append("<br><h2>" + botName + "</h2>");
	
}

 
$("#menu-btn").on('click', function(){
			   $("#main-menu").show();
			   $("#chatbot").hide();
			   $("#tp_One").hide();
		   });
		   
		   $("#main-menu-btn-chat").on('click', function(){
     		$("#main-menu").hide();
	 		$("#tp_One").hide();
	        
			$("#chatbot").show();
});

$("#navigation").ready(function(e) {
     
});







