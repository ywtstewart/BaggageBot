// JavaScript Document
// Javascript file to handle all family div interactions and content
var page = "#family", content = "#family-content", footer = "#family-footer", contentList = ".family-content-list";
var twitterToken = "";

$(page).on('focus' , function () {
	      
	  for (i= 0; i < botArray.length; i++) {
		  if(i!=0){
			  $(contentList).append("<li> <h1>"+ botArray[i][1]+ "</h1> <img src='src/bot-icon-resources/"+botArray[i][3]+ "'/></li>");
		  }
		  
	  }
	
});









/*$(document).ready(function () {
	
   
	$.ajax({
		type:"GET",
		url: "https://api.twitter.com/1.1/search/tweets.json?q=%23" + botName + "+%23baggagebot",
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
                        "Authorization": "Bearer " + twitterToken
                    },
                    data: JSON.stringify({
                        query: text,
                        lang: "en",
                        sessionId: sessionID
                    }),
                    success: function(data) {
						
                       //do something with data
                    },
                    error: function() {
                        console.log("trouble connecting to twitter API");
                    }
	});
	
	
});*/
