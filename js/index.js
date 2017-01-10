// JavaScript Document
/* main script for the whole app parent global variables & handles navigation elements */

//Parent global variables
var botArray = [[0,"Welcome", "#FFFFFF","test-bot-icon.jpg", "#F9C728"], [4,"Anna", "#F7E114","anna-bot-icon.png", "#fbee84"], [2,"Chris", "#F49F16","chris-bot-icon.png", "#f9cd85"], [6,"Henk", "#F28B9E","henk-bot-icon.png", "#f8c2cc"], [7,"Oddy", "#9121E8","oddy-bot-icon.png", "#c68bf3"]];
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
var instance = 0;

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
	 
	
	if(input !=0 ){ 
	   $("#bot-icon").css('display', 'block');
	}
	for ( i = 0; i<botArray.length; i++){
	
	if (input == botArray[i][0]){
		botName = botArray[i][1];
		botColor = botArray[i][2];
		botBColor = botArray[i][4]; 
		botIcon = botArray[i][3];
	}else {
		console.log("This prototype only supports the baggage belts at Arrival hal 1 at the moment. Please fill in a baggage belt in Arrival 1");}
	}
	
	botIcon  = "src/bot-icon-resources/"+botIcon; 
	
	
	
	$("#bot-icon").attr("src", botIcon); $(".bot-icon-link").css("background", botColor); 
	$(".bot-bubble").attr("background", botBColor);
	if(instance ==0){
	
	$("#nav-bar").append("<h2>" + botName + "</h2>");
	} else {
	$("#nav-bar h2").empty().hide();
	$("#nav-bar").append("<h2>" + botName + "</h2>");}
    instance++;
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
     		showTP();
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


$("#scan-btn").on('change', function(){
	
	$(tpContainer).hide();
	$(PUContainer).show();
	$("#chat").empty();
	
	input = 6;
	botNameGenerator(input); 
    
	$("#basic-info").append(fullname);
	$("#flight-info").append(flightnumber);
	 $("#post-form").css('display', 'block !important');
	 $("#scan-form").css('display', 'none');
	//image first
	
	
});
function hidePost () { 
$("#post-form").hide();
}
function showPost(){
$("#post-form").show();	
}

function showTP() {

				$('#main-menu').hide();
	 		$(welcomeContainer).hide(); 
	        
			
			$(chatbotContainer).show(); 
			
			$(tpContainer).show();	
			}

