// JavaScript Document
//Script tot access API  to send questions & retrieve responses 


/* Note all changes here:  			



*/


var accessToken = "00724994abce4d768d4d1f599ab76f68";
var baseUrl = "https://api.api.ai/v1/";

var sessionID = Math.random() * 1000000;

var user;
var text;
var parentOption = "to do"; 

var dummy = "example.html";
var weatherURL = "http://www.buienradar.nl/weer/amsterdam_airport_schiphol/nl/6296680/5daagse"; 
var newsURL = "http://nos.nl/";
var trafficURL = "http://trafficnet.nl/#";

// ideal version use JSON file with url to guide user to point of interest
var toDO = new Array("More information", "keep chatting"),

moreInfo = new Array("News", "Traffic", "Weather");

var confirmArray = new Array("Yes, please!", "No, thank you!");

$(document).ready(function() {

    text = "intro";
    send(text);
    clickListener();
    
	/*// Verwijder deze regels
	$("#input").prop('disabled', true);  
	$("#send").prop('disabled', true);*/

});

//function to pan to the wha
function panToBottom () {
					$("#chat").scrollTop($("#content").height());
					
				};

function listeners(){
            $("#send").keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();

                    var question = $("#input").val();
                    user = "user";
                   
                    setResponse(question, user);
					panToBottom();
					$("#input").val('');
					 
                }
            });
            $("#input").keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    send();
                   
				    var question = $("#input").val();
                    user = "user";
                    
					setResponse(question, user);
					
					panToBottom(); 
                   
				    text = $("#input").val();
                    send(text);
					
                   $("#input").val('');


                }
            });
            $("#send").click(function(event) {

                if (event.which == 13) {
                    event.preventDefault();
                    send();
                    var question = $("#input").val();
                    user = "user";
                  
                    setResponse(question, user);
					panToBottom(); 
                    text = $("#input").val();
                    send(text);
					
					$("#input").val(''); 
					
                   

                }

                $("#chat").on('click', '#option-button', function(e) {
                    if (e) {
                        var temp = $(e.target).attr("value");
                        send(temp);
                    }
                });


            });
          };


            function setInput(text) {
                $("#input").val(text);

                send();
            }

            function send(text) {

                $.ajax({
                    type: "POST",
                    url: baseUrl + "query?v=20161208",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    },
                    data: JSON.stringify({
                        query: text,
                        lang: "en",
                        sessionId: sessionID
                    }),
                    success: function(data) {
						
                        var response = data.result.fulfillment.speech;
                        user = "bot";
						console.log(user + " response : "+ response);
                        setResponse(response, user);
                    },
                    error: function() {
                        console.log("Internet connection/server error");
                    }
                });
                //setResponse("");
            };

            function setResponse(val, user) {
				console.log(user);
				
				if (val != ''){
						switch (user){
					
									case "user": 
									$("#chat").append("<span><div class='"+ user+ " bubble'><p class='" + user + "'>" + val + "</p></div></span>"); 
									break;
										
									case "bot": 
									$("#chat").append("<span><div class='"+ user+ " bubble'><p class='" + user + "'>" + val + "</p></div></span>");
								 	break;
					
									default: console.log("unknown user"); 
								}
						}
				
				
				panToBottom(); 
				
                responseFilter(val);
				
				

            };

         function responseFilter(response) {
               
			   switch(response){

                    case "Hello I am Anna. Anna-Belt, would you like for me to keep you notified on your baggage?": 
					renderButtons(confirmArray); break;
					
                    case "Splendid! Your bag is currently being unloaded from the plane. I will keep you informed when it is on the belt.": 			                    send(parentOption); break; 
					case "You are welcome!": send(parentOption); break; 
					case "Would you like to do something in the mean time?":  					
					renderButtons(toDO); break;
					case "What kind of information are you searching for?":	renderButtons(moreInfo); break;
					case "Here's a link to the news here.": renderFrame(dummy); break; 
					case "Here you can see the actual traffic information.": renderFrame(dummy); break;
					case "Here's the weather information in your area.": renderFrame(dummy); break; 
					default: listeners();  
					}
             

            };

           function renderFrame(links){
               $("#chat").append("<iframe id='content-frame' src='" + links+ "' height='400px' ></iframe>"); 
			   
			   send(parentOption); 
			   
		   }

            function renderButtons(list) {
				
                for (i = 0; i < list.length; i++) {
                    var value = '' + list[i];
					$("#option-button").removeAttr(value); 
					
                    $("#chat").append("<input type='button' id='user' value='"+ value +"'/>").addClass("option-button");

                }
				$("#chat").append("<br><br>");
				panToBottom();

            };

			// click event listener for the dynamic buttons
            function clickListener() {
                $(document).on("click", '.option-button', function(e) {
					if (e){
						
                    var temp = $(e.target).val();
					
                    //sends value from button to the api
					send(temp);
					
					panToBottom();
                    console.log(temp);}
                });
				
			

			
            };
