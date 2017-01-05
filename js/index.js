// JavaScript Document
var botArray = [[4,"Anna", "#ffeb11","test-bot-icon-anna.jpg"], [2,"Chris", "#65f442","test-bot-icon-chris.jpg"], [6,"Henk", "#11ffe7","test-bot-icon-henk.jpg"], [7,"Oddy", "#F000FF","test-bot-icon-oddy.jpg"]];
var input =prompt("Enter belt number");

var botName, botColor, botIcon; 

var chatbotContainer = "#chatbot", mainMenuContainer  = "#main-menu", familyContainer ="#family", welcomeContainer = "#tp_One";
//var hammer = new Hammer(); 

$(document).ready(function(){
	$(mainMenuContainer).hide();
	$(chatbotContainer).hide(); 
	$(familyContainer).hide(); 
	$(welcomeContainer).show();
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
	botIcon  = "src/bot-icon-resources/"+botIcon; 
	console.log(botIcon); 
	$("#nav-bar").append("<br><h2>" + botName + "</h2>");
	$("#bot-icon").attr("src", botIcon); 
	$(".bot-bubble").attr("background", botColor);

}

 
$("#menu-btn").on('click', function(){
			   $(mainMenuContainer).show();
			   $(chatbotContainer).hide(); 
			   $(welcomeContainer).hide();
		   });
		   
		   $("#main-menu-btn-chat").on('click', function(){
     		$(mainMenuContainer).hide();
	 		$(welcomeContainer).hide();
	        
			$(chatbotContainer).show(); 
			});
			
		








