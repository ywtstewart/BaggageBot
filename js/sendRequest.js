//Script to access API  to send questions & retrieve responses 
/* Note all changes here:  			



*/

// API http variables
const accessToken = "00724994abce4d768d4d1f599ab76f68";
const baseUrl = "https://api.api.ai/v1/";

const sessionID = Math.random() * 1000000;

//global variables
//extra variables 
var user,text, 
parentOption = "to do",startTimestamp, endTimeStamp;
var pauseTimer = true;

//div ids
var postBtn = "#post-btn", 
chat = "#chat", 
inputField="#message-input"; 
var breaks = "<br>";

//same frame content urls
var dummy = "example.html";

//sample array to generate buttons
var toDO = new Array("More information", "keep chatting");


$("#next-div" ).on('click', function(){
	
 	$("#main-menu").hide();
	$("#tp_One").hide();
 	$("#chatbot").show();
	
	console.log(botColor);
	//$("#nav-bar").append("<h3 style='text-align: center;'> Chatbot</h3>"); 
    text = "intro";
    send(text);
    
   clickListener();
   listeners();
	

});

//function to pan to the wha
function panToBottom () {
					$(chat).scrollTop($("#content").height());
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
				console.log(val);
				
				if (val != ''){
						switch (user){
					
							case "user": 
							    
								$(chat).append("<span><div class='"+ user+ " bubble "+ user+ "-bubble'><p class='" + user + "'>" + val + "</p></div></span>"); 
								addTimeStamp(user); 
								break;
										
							case "bot": 
									 
								writingDots(val, user);
								
																
								break;
					
								default: console.log("unknown user"); 
								}
						}
				
				
				panToBottom(); 
				
               
			 };
			
		

         function responseFilter(response) {
               
			   switch(response){

                    case "Hello I am Anna. Anna-Belt. I will keep you updated about your baggage progress.": 
					renderButtons(confirmArray); hideInput();break;
					
                    case "I see that your bag is currently being unloaded from the plane. It will take some time to arrive. I will send you a reminder if it is about to arrive.": send(parentOption);  break; 
					case "You are welcome!": send(parentOption);  break; 
					case "Would you like to do something in the mean time?":  					
					renderButtons(toDO); hideInput();break;
					case "What kind of information are you searching for?":	 renderButtons(moreInfo); hideInput();break;
					case "Here's a link to the news here.": renderFrame(dummy); break; 
					case "Here you can see the actual traffic information.": renderFrame(dummy); break;
					case "Here's the weather information in your area.": renderFrame(dummy); break; 
					default: listeners();    
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
					console.log(temp); 
					if (temp != "keep chatting"){
						send(temp);
					
						
						
					}else { 
						send(temp);
						showInput();
					 }
					 panToBottom();
                    console.log(temp);}
					
					
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
				
				$(chat).append("<svg id='typing-dots' class='typing-dots' width=50% height='30'><circle  cx='10px' cy='20px'r='10px' style='fill:#A2A2A2;'/><circle  cx='40px'cy='20px' r='10px' style='fill:#A2A2A2;' /> <circle  cx='70px' cy='20px'r='10px' style='fill:#A2A2A2;'/></svg>"); 				
                $(".typing-dots").delay(1000).hide(1000); 
              
				var html = breaks+"<span><div class='"+ user+ " bubble "+ user+ "-bubble' style='background:" +botColor+ "; color:" +botColor+ "; '><p class='" + user + "'>" + val + "</p></div></span>";
                
				setTimeout(function botResponse(){
                 
				$(chat).append(html);addTimeStamp(user);},2010);		
				
			};
			
			function addTimeStamp(user){
				
                var now = new Date();
               
				currentTimestamp = now.getHours()+ ":"+now.getMinutes(); 
				
				 
				console.log(currentTimestamp);
				
				$(chat).append("<div class='"+ user + "-timestamp timestamp'><p>" + currentTimestamp + "</p></div></span>"+breaks);
			}
			
		   
		   			
