// JavaScript Document
 <!-- Script tot access API  to send questions & retrieve responses -->
 <!-- Script tot access API  to send questions & retrieve responses -->
    	
		var accessToken = "e2fa5b6f7adf4b55aeb33a228d8691ca";
		var baseUrl = "https://api.api.ai/v1/";
		
		var sessionID = Math.random()*1000000;
		
		var user;
		
		
		$(document).load(function() {
			
			
			$("#wrapper").load(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					send();
					
					
				}
			});
			
			
		});
		
		function setInput(text) {
			text = "intro";
		
			send();
		}
		
		function send() {
			var text = "intro";
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
					setResponse("Internal Server Error");
				}
			});
			setResponse("");
		}
		function setResponse(val, user) {
			
			$("#chat").append("<p id='"+user+"'>"+ val+ "</p>" );
			
			
		}