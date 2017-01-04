// JavaScript Document
var botArray = [[4,"Anna", "#ffeb11","test-bot-icon.jpg"], [2,"Chris", "#65f442","test-bot-icon.jpg"], [6,"Henk", "#11ffe7","test-bot-icon.jpg"], [7,"Oddy", "#F000FF","test-bot-icon.jpg"]];
var input =prompt("Enter belt number");
//var input = 4; 
var botName, botColor, botIcon; 
$(document).ready(function(){
	$("#main-menu").hide(); 
	$("#tp_One").show();
	botNameGenerator(input); 
});

function botNameGenerator(input) {
	 
	 console.log(input);
	for ( i = 0; i<botArray.length; i++){
	
	if (input == botArray[i][0]){
		botName = botArray[i][1];
		botColor = botArray[i][2]; 
		botIcon = botArray[i][3];
	}else {console.log("This prototype only supports the baggage belts at Arrival hal 1 at the moment. Please fill in a baggage belt in Arrival 1");}
	}
	console.log(botName);
	botIcon  = "src/"+botIcon; 
	console.log(botIcon); 
	$("#nav-bar").append("<br><h2>" + botName + "</h2>");
	$("#bot-icon").attr("src", botIcon); 
	$(".bot-bubble").attr("background", botColor);

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








