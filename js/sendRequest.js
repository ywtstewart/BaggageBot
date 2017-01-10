//Script to access API  to send questions & retrieve responses 
/* 
accesstoken, sessionID's,beltnumber, bot properties are defined in index.js
This Script handles the family member bot chat.
*/


//new global variables 
var user,text, 
parentOption = "to do",startTimestamp, endTimeStamp;

//div ids
var postBtn = "#post-btn", 
chat = "#chat", 
inputField="#message-input"; 
var breaks = "<br>";

//same frame content urls
var dummy = "example.html";

//sample array to generate buttons
var toDO = new Array("More information", "keep chatting");

var now = new Date(), hours, minutes, daytime, daytimeGreeting; 

$(document).on('click', '.options-btn', function(e) {
					if (e){
							e.preventDefault();
                    		var temp = $(e.target).val();
							console.log(temp);
					if (temp= "yes"){
						
				     		$(mainMenuContainer).hide();
	 						$(welcomeContainer).hide();
	        
							$(chatbotContainer).show(); 
							
							setTimeStamp(startTimestamp);
							text = "intro welcome"; 
							send(text); 
							//hide post form
							
							
							
					}else { 
												
					 }
					}
					
					
                });
function setTimeStamp(t) {
					
					minutes = now.getMinutes(); 
					hours = now.getHours();
					if (minutes <10){ minutes = "0"+ minutes;}
					
					if (hours >12) { 
					daytime = "PM";
					} 
					else{ 
					daytime = "AM";}
						hours = hours %12 ||12;
					date = now.getDate() +"-"+ now.getMonth() +"-"+ now.getFullYear();
					t = date + " "+ hours + ":" + minutes + daytime;
					
					setDaytimeGreeting(hours,daytime);
	
				}
				
function setDaytimeGreeting (hours, daytime){
					
					if ( daytime=="AM" && hours < 6 || hours ==12 ){
											daytimeGreeting = "Goodevening";
									}
					else if (daytime =="PM" && hours >=6  && hours != 12){
											daytimeGreeting = "Goodevening";
									} 
					else if ( daytime== "AM" && hours>=6 && hours !=12 ){
											daytimeGreeting = "Goodmorning";
									}
					else if (daytime == "PM" && hours<=5  ){
							   				daytimeGreeting = "Goodafternoon";
									} 
					else if (daytime == "PM" && hours == 12){
											daytimeGreeting = "Goodafternoon";
									}
	}


$("#next-div" ).on('click', function(){
	
	$(PUContainer).hide();
	//show post form
 	$("#main-menu").hide();
	$("#tp_One").hide();
	
 	$("#chatbot").show();
	
	
    text = "intro";
    send(text);
    
   clickListener();
   listeners();
	

});

//function to pan to the wha
function panToBottom () {
					$(chat).scrollTop($("#chat").height());
	};

function listeners(){
			 $(chat).off('click'); 
	  		
            $(postBtn).keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();

                    var question = $(inputField).val();
                    user = "user";
                    
                    setResponse(question, user);
					panToBottom();
					send(question);
					$(inputField).val('');
					 
                }
            });
			
			 $("#chatbot").on('click', "#post-btn", function(e) {
					 
					 if (e){
                               
                    var question = $(inputField).val();
                    user = "user";
                  
                    setResponse(question, user);
					panToBottom(); 
                    console.log("postbtn");
                    send(question);
					
					$(inputField).val(''); 
				
                } 
			

           
            }); 
           $(inputField).keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                  
                   
				    var question = $(inputField).val();
                    user = "user";
                    
					setResponse(question, user);
					
					panToBottom(); 
                   
				   
                    send(question);
					
                   $(inputField).val('');


                }
            
            });
          };


            function setInput(text) {
                $(inputField).val(text);

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
						//console.log(user + " response : "+ response);
                        setResponse(response, user);
                    },
                    error: function() {
                        console.log("Internet connection or server error");
                    }
                });
                //setResponse("");
            };

            function setResponse(val, user) {
				
				
				if (val != ''){
						switch (user){
					
							case "user": 
							    
								$(chat).append("<span><div class='"+ user+ " bubble "+ user+ "-bubble'><p class='" + user + "'>" + val + "</p></div></span>"); 
								addTimeStamp(user); 
								panToBottom(); 
								break;
										
							case "bot": 
							    responseFilter(val);
								val = val.replace("botName", botName); val = val.replace("botName", botName);
								
								
								
								val = val.replace("daytimegreeting ", daytimeGreeting); 
																							
								writingDots(val, user);
								panToBottom(); 
																
								break;
					
								default: console.log("unknown user"); 
								}
						}
				
				
				
				
               
			 };
			
		/*setTimeout( function sendPersonal(){
								send("personalised info"); 
								$(tpContainer).show();
								
								 }, 3000); */

         function responseFilter(response) {
               
			  
			   switch(response){
					
                    case "To get personalised information, please upload your plane ticket.": 
									setTimeout( function sendPersonal(){
								
												showTP();
								
								 			}, 3000); 
									break;
					
                    case "I see that your bag is currently being unloaded from the plane. It will take some time to arrive. I will send you a reminder if it is about to arrive.": 
									send(parentOption);  
									break; 
									
					case "daytimegreeting , Welcome to the Belt family. On of our family members will help you get in touch with your baggage.": 
									send("personalised info");  
									break; 
									
					case "Would you like to do something in the mean time?":  					
									renderButtons(toDO); 
									hideInput();
									break;
									
					case "What kind of information are you searching for?":	 
									renderButtons(moreInfo); 
									hideInput();
									break;
									
					case "Here's a link to the news here.": 
									renderFrame(dummy); 
									break;
									 
					case "Here you can see the actual traffic information.": 
									renderFrame(dummy);
									break;
									
					case "Here's the weather information in your area.": 
									renderFrame(dummy); 
									break; 
									
					default: 		listeners();    
					}
             

            };

           function renderFrame(links){
               $(chat).append("<iframe id='content-frame' src='" + links+ "' height='400px' ></iframe>"); 
			   
			   send(parentOption); 
			   
		   }

            function renderButtons(list) {
				hideInput();
				 
                for (i = 0; i < list.length; i++) {
                    var value = '' + list[i];
					$("#option-button").removeAttr(value); 
					
                    $(chat).append("<input type='button' id='user' value='"+ value +"'/><br>").addClass("option-button");
					

                }
				$(chat).append("<br><br>");
				panToBottom();
				
            };

			// click event listener for the dynamic buttons
            function clickListener() {
                $(document).on('click', '.option-button', function(e) {
					if (e){
						e.preventDefault();
                    var temp = $(e.target).val();
					
					if (temp != "keep chatting"){
						send(temp);
					
						
						
					}else { 
						send(temp);
						showInput();
					 }
					 panToBottom();
                   }
					
					
                });
				
		
			
            };
			
			
			 $(document).on('click', '#option-button', function(e) {
                    
                        var temp = $(e.target).attr("value");
                        send(temp);
						
                    
                });
				
				function hideInput(){
				$("#message-input").prop('hidden', true);  
				$("#post-btn").prop('hidden', true);
	
				};
			function showInput() {
				
				$("#message-input").prop('hidden', false);  
				$("#post-btn").prop('hidden', false);
				}; 

            function writingDots(val, user){
				
				$(chat).append("<svg id='typing-dots' class='typing-dots ' width=50% height='30'><circle  cx='10px' cy='20px'r='5px' style='fill:#A2A2A2;'/><circle  cx='40px'cy='20px' r='5px' style='fill:#A2A2A2;' /> <circle  cx='70px' cy='20px'r='5px' style='fill:#A2A2A2;'/></svg>"); 				
                $(".typing-dots").delay(1000).hide(1000); 
              
				var html = breaks+"<span><div class='"+ user+ " bubble "+ user+ "-bubble' style='background:" +botBColor+ "; color:" +botBColor+ "; '><p class='" + user + "'>" + val + "</p></div></span>";
                
				setTimeout(function botResponse(){
                 
				$(chat).append(html);addTimeStamp(user);},2010);		
				
			};
			
			function addTimeStamp(user){
				
                var now = new Date();
				minutes = now.getMinutes(); hours = now.getHours(); 
               if (minutes <10){ minutes = "0"+ minutes;}
					
					if (hours >12) { daytime = "PM";} else{ daytime = "AM";}
						hours = hours %12 ||12;
						
			    setDaytimeGreeting(hours,daytime);
				
				currentTimestamp = hours+ ":"+minutes+daytime; 
				
				$(chat).append("<div class='"+ user + "-timestamp timestamp'><p>" + currentTimestamp + "</p></div></span>");
			}
			
		   
		   			
