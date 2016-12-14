// JavaScript Document
<!-- Script tot access API  to send questions & retrieve responses -->

var accessToken = "e2fa5b6f7adf4b55aeb33a228d8691ca";
var baseUrl = "https://api.api.ai/v1/";

var sessionID = Math.random() * 1000000;

var user;
var text;

// ideal version use JSON file with url to guide user to point of interest
var toDO = new Array("more information", "play  a game", "keep chatting"),

moreInfo = new Array("news", "Netherlands", "Weather");

var confirmArray = new Array("Yes, please!", "No, thank you!");

$(document).ready(function() {

    text = "intro";
    send(text);
    clickListener();
    //renderButtons(toDo);

});

function listeners(){
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
						console.log(data);
                        var response = "Anna bot : " + data.result.fulfillment.speech;
                        user = "bot";
						
                        setResponse(response, user);
                    },
                    error: function() {
                        setResponse("Internet connection/server error");
                    }
                });
                //setResponse("");
            };

            function setResponse(val, user) {

                $("#chat").append("<p id='" + user + "'>" + val + "</p>");
				
				console.log(val);
                responseFilter(val);
				
				

            };

         function responseFilter(response) {
               
			   switch(response){

                    case "Anna bot : Hi! I'm Anna belt, your personalised bot assistant! would you like for me to keep you notified on your baggage?": 
					renderButtons(confirmArray); break;
					
                    case "Anna bot : Splendid! Your bag is currently being unloaded from the plane. I will keep you informed when it is on the belt.": 			                    setResponse("Anna bot : Would you like to do something in the mean time?", "bot"); break; 
					case "Anna bot : You are welcome!": setResponse("Anna bot : Would you like to do something in the mean time?", "bot"); break; 
					case "Anna bot : Would you like to do something in the mean time?":  					
					renderButtons(toDO); break;
					case "Anna bot : What kind of information are you searching for?":	renderButtons(moreInfo); break;
					
					default: listeners();  
					}
             

            };

            /*	function getRecommendations(){
                $(this).children("div:#chat").append();
                    }
              function getInfo(){
                $(this).children("div:#chat").append();

              }*/

            function renderButtons(list) {

                for (i = 0; i < list.length; i++) {
                    var value = '' + list[i];
					$("#option-button").removeAttr(value); 
                    $("#chat").append("<input type='button' class='option-button' value='"+ value +"'  style='width: " + list.length + "/100*with' />");

                }



            };


            function clickListener() {
                $(document).on("click", '.option-button', function(e) {
					if (e){
                    var temp = $(e.target).val();
					
                    send(temp);
                    console.log(temp);}
                });

            };
