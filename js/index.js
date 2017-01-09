// JavaScript Document
/* main script for the whole app parent global variables & handles navigation elements */

//Parent global variables
var botArray = [[0,"Welcome", "#F9C728","test-bot-icon.jpg", "#F9C728"], [4,"Anna", "#F7E114","anna-bot-icon.png", "#fbee84"], [2,"Chris", "#F49F16","chris-bot-icon.png", "#f9cd85"], [6,"Henk", "#F28B9E","henk-bot-icon.png", "#f8c2cc"], [7,"Oddy", "#9121E8","oddy-bot-icon.png", "#c68bf3"]];
var input =0;

//api variables
const accessToken = "00724994abce4d768d4d1f599ab76f68";
const baseUrl = "https://api.api.ai/v1/";
const sessionID = Math.random() * 1000000;
const FSappKey = "20cb4a80933673ef8f926fbb70799fb7";
const FSappID = "5c0918a2";

// bot properties variables
var botName, botColor, botIcon,botBColor; 

//container variables
var chatbotContainer = "#chatbot", mainMenuContainer  = "#main-menu", familyContainer ="#family", welcomeContainer = "#welcome", tpContainer = "#tp_One", PUContainer = "#pop-up";
//var hammer = new Hammer(); 

$(document).ready(function(){
	$(mainMenuContainer).hide();
	$(chatbotContainer).hide(); 
	$(familyContainer).hide();
	$(tpContainer).hide(); 
	$(PUContainer).hide();
	$(welcomeContainer).show();
	botNameGenerator(input); 
	
		
});

function botNameGenerator(input) {
	 
	 console.log(input);
	for ( i = 0; i<botArray.length; i++){
	
	if (input == botArray[i][0]){
		botName = botArray[i][1];
		botColor = botArray[i][2];
		botBColor = botArray[i][4]; 
		botIcon = botArray[i][3];
	}else {console.log("This prototype only supports the baggage belts at Arrival hal 1 at the moment. Please fill in a baggage belt in Arrival 1");}
	}
	console.log(botName);
	botIcon  = "src/bot-icon-resources/"+botIcon; 
	console.log(botIcon); 
	$("#nav-bar").append("<br><h2>" + botName + "</h2>");
	$("#bot-icon").attr("src", botIcon); $("#bot-icon-link").attr("background", botColor); 
	$(".bot-bubble").attr("background", botBColor);

}

 
		$("#menu-btn").on('click', function(){
			   $(mainMenuContainer).show();			  
			   $(welcomeContainer).hide();
		   });
		   
		$("#main-menu-btn-chat").on('click', function(){
     		$(mainMenuContainer).hide();
	 		$(welcomeContainer).hide();
	        
			$(chatbotContainer).show(); 
			});
			
		$("#main-menu-btn-chat-tp_One").on('click', function(){
     		$(mainMenuContainer).hide();
	 		$(welcomeContainer).hide(); 
	        
			$(chatbotContainer).hide(); 
			$("#post-form").hide();
			$(tpContainer).show();
			});
			
			$("#menu-main-btn-hidden").on('click', function(){
				$(mainMenuContainer).hide();
			});
			
	 
       $(document).on('click', '.options-btn', function(e) {
					if (e){
							e.preventDefault();
                    		var temp = $(e.target).val();
							console.log(temp);
					if (temp= "yes"){
						
				     		$(mainMenuContainer).hide();
	 						$(welcomeContainer).hide();
	        				$("#bot-icon").hide();
							$(chatbotContainer).show(); 
						
						
					}else { 
												
					 }
					}
					
					
                });





