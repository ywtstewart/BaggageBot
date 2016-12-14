 <!-- Script tot access API  to send questions & retrieve responses -->
    	
		var accessToken = "e2fa5b6f7adf4b55aeb33a228d8691ca";
		var baseUrl = "https://api.api.ai/v1/";
		
		var sessionID = Math.random()*1000000;
		
		var user;
		var text;
		
		// ideal version use JSON file with url to guide user to point of interest
		var toDO = new Array("more information", "play  a game", "keep chatting"); 
		
		var moreInfo= new Array("Baggage information", "Netherlands information", "Weather information");
		
		$(document).ready(function() {
			 text = "intro"; 
			 send(text); 
			 
		
			$("#send").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					
					var question = "User : " + $("#input").val();
					user = "user";
					//var question_ = $("<p></p>").text(temp); 
					setResponse(question, user);
				
				}
			});
			$("#input").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					send();
					var question = "User : " + $("#input").val();
					user = "user";
					//var question_ = $("<p></p>").text(temp); 
					setResponse(question, user);
					text = $("#input").val(); 
					send(text); 
					
					text = $("#input").val(''); 
					
					
				}
			});
			$("#send").click(function(event) {
				
				if (event.which == 13) {
					event.preventDefault();
					send();
					var question = "User : " + $("#input").val();
					user = "user";
					//var question_ = $("<p></p>").text(temp); 
					setResponse(question, user);
					
					text = $("#input").val(); 
					send(text); 
					
					text = $("#input").val(''); 
					
				}
				
				$("#chat").on('click', "#option-button", function (e) {
				if (e){
					var temp = $(this).val(); alert(temp);
			   		send(temp); 
					}
			});
			
		   
		});
		
		
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
				data: JSON.stringify({ query: text, lang: "en", sessionId: sessionID }),
				success: function(data) {
				   	
					var response = "Anna bot : " + data.result.fulfillment.speech;
					user = "bot"; 
					
					setResponse(response, user);
				},
				error: function() {
				 setResponse("Internet connection/server error");
				}
			});
			//setResponse("");
		}
		function setResponse(val, user) {
			
			$("#chat").append("<p id='"+user+"'>"+ val+ "</p>" );
			responseFilter(val); 
		   
		}
		
		function responseFilter(response) {
			  
			if (response = "Hi I'm Anna belt! How may I help you today?"){
				
			  getToDOList();
			  
			  } else if (response = "What kind of information are you searching for?"){
				  getInfoList(); 
				  
		   }else { }
			
		}
		
	/*	function getRecommendations(){
			$(this).children("div:#chat").append();
					} 
		function getInfo(){
			$(this).children("div:#chat").append();
			
		}*/
		
		function getToDOList(){
			 
			for (i = 0; i < toDO.length; i++){
				var value  = toDO[i];
			$("#chat").append("<input type='button' id='option-button' type='button' value= ' "+value+ "' style='width: " + toDO.length+"/100*with' />");
				    
			}
			
			
		
		};
		function getInfoList(){
			 
			for (i = 0; i < moreInfo.length; i++){
				var value  = moreInfo[i];
			$("#chat").append("<input type='button' id='option-button' type='button' value= ' "+value+ "' onClick='"+ send(value)+ "' />");
				    
			}
			
			
		
		};
		
		
		});