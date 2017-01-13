// JavaScript Document
// Javascript file to handle all family div interactions and content
var today;
var page = "#family", content = "#family-content", activity = "#family-activity", contentList = "#family-content-list", dotsCont = "#dots-container";
var twitterToken = "";


var sliderIndex = 0, slides, dots, iconPath,array, beltCount; 
var sampleText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget."; 
var activityContainer= "#activity-container"; 
var data; 


$("#bot-icon").on('click',function () {
        
		familyPage();
	  /*$.getJSON('/manifest.json', function (data){
		 this.data= data;  
		  console.log(data);
	  });*/

});
$("#main-menu-btn-family").on('click',function () {
        familyPage();
		
	  /*$.getJSON('/manifest.json', function (data){
		 this.data= data;  
		  console.log(data);
	  });*/

});
$(page).ready(function(){
		array = botArray;
		array.splice(0,1);
	});

function familyPage (){
		  showFamily();
			     
		today = new Date();
		beltCount= array.length;
	
	  for (i= 0; i < array.length; i++) {
		      var name = array[i][1], path =array[i][3],id = name.toLowerCase();
			  
		      var contenthtml = "<li > <div class='adventure-slider'><div class='adventure-slider-title'><h1>"+ name+ "</h1></div> <div class='adventure-slider-img'><img src='src/bot-icon-resources/"+path+ "' /></div> <div class='adventure-slider-label'><label id=''adventure-btn-"+id+"' class='adventure-label' for='adventure-"+id+"'><div > <p >"+ name+"'s Adventures</p></div></label></div> <input type='button' id='adventure-"+id+"'  style='display:none;' onclick='show"+name+"Adventures()' /> <div> </li>";
			   var n = i+1;
			   var dotHtml  = "<span class='dots' onClick='currentSlider("+(n)+ ")'></span>";
			   
			  $(contentList).append(contenthtml);
			  $(dotsCont).append(dotHtml);
	
	     
	  
	  } 
	  
	  
	  
	  //checks if botName matches value[1] in array to set the sliderIndex on the right member
	 for ( i = 0; i<array.length; i++){
	    
	if (botName == array[i][1]){
		
		sliderIndex = i;
		
		 showSlider(sliderIndex);
	}
	  }
	  
	
}


function showSlider(n){
	    
	   
	   
	  
	  var slides = document.getElementsByClassName('adventure-slider'); 
	  dots = document.getElementsByClassName('dots'); 
	  console.log(beltCount); 
	 if( n>=(beltCount)) {
		  sliderIndex = 0;
		  } 
	  if(n < 0) { 
	      sliderIndex =3;
	  }
	 
	  
	  for ( i=0; i<slides.length;i++){
		  slides[i].style.display ='none';
	  }
	  for (i=0; i<dots.length; i++){
		    // do something with dots
			dots[i].className = dots[i].className.replace("active", "");
		  }
		 
		
		if (sliderIndex < slides.length){
		 slides[sliderIndex].style.display = 'block'; 
  		dots[sliderIndex].className= 'dots active';
		
		
		
	   	 }
		

	}



function nextSlider(i){
	  
	 var temp = sliderIndex+=i;
	 
	 showSlider(temp); 
	 
	} 


function currentSlider(i){
	 
     showSlider(sliderIndex=i); 
}

//activity functions 
function addActivities () {
	
	
	
	for (i=0; i<20; i++){
		var month = today.getMonth(); month+=1;
		date = today.getDate()+ "." +month + " "+ today.getFullYear();
		$(activityContainer).append("<div><p class='activity-timestamp'>"+ date+ "</p><p class='activity'>"+sampleText+"</p></div>"); 		
	}
	
}
function addBotIcon() {
	$("#family-nav-bar").append("<a id='family-nav-bar-bot-icon'  href=#family ><div class='bot-icon-link'><img class='bot-icon-centered' width='35px' height='50px' /></div></a>"); 
	
}
function setContent(title){
	$(activityContainer).empty();
	$("#activity-nav div h1").empty();
	setTitle(title);
	addActivities(); 
	
}
function setTitle(title) {
	iconPath = "src/bot-icon-resources/"+array[sliderIndex][3];
	 $('#activity-nav div h1').append(title); 
	 $('#bot-icon-activity').show();
	 $('#bot-icon-activity').attr('src', iconPath); 
	 
	
}

function showAnnaAdventures(){
	
    showActivity();
    
	setContent("Anna's Adventures");
};
function showHenkAdventures(){

	showActivity();
   
	setContent("Henk's Adventures");
}
function showChrisAdventures(){

	showActivity();
    
	setContent("Chris's Adventures");
}
function showOddyAdventures(){

	showActivity();
	setContent("Oddy's Adventures");
}

$('#back-btn').on('click', function(){
	showFamily();
});

function showActivity() {
	$(content).hide(); 
	$(activity).show();
	$("#bot-link-activity").show();
	
	
}
function showFamily(){
	$(content).show(); 
	$(activity).hide();
	$("#bot-link-activity").hide();
}



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
