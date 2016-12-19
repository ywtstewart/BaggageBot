// JavaScript Document
/* This js file handles the first touchpoint operations*/

'sendRequest.js';

var passengerType = new Array("Arriving", "Departing");

var scannedfile, flightno, origin, airline,firstname, lastname, passenger_type, data; 
var inputForm = "#tpOne_form"; 
var decoder;
//var sendRequest = new SendRequest(); 

$(document).ready(function(e) {
    
	console.log("tp one loaded"); 
	
	for (i=0; i<passengerType.length; i++){
		console.log( passengerType[i]); 
		renderButton(passengerType[i]); 
		console.log("btn: " + i + " rendered");
	}
	
	clickEventListener();
	
	
	
	//scan ticket  for scanner
    // input type = file  images
	
	
    $("#scan-btn").on("change", function (e){
		scannedfile = document.getElementById("scan-btn").files[0];
	    console.log(scannedfile);
		var reader = new FileReader();
		
		reader.readAsDataURL(scannedfile);

     /* reader.onload = (function(scannedfile) {
        return function(e) {
			//console.log(e.target.result); 
          qrcode.decode(e.target.result);
        };
      })(f[i]); 

      // Read in the image file as a data URL.
      reader.readAsDataURL(f[i]);	
	   // window.location.assign('http://localhost/BaggageBot/img/temp/'+scannedfile.name);*/
	});
	
	
	// var reader = new FileReader();
	 
	 //console.log(reader); 
	 
	 //var result = qrcode.decode(reader); 
  	//decode
	//var decoder = new decoder(); 
   
	// next step fill in fl# origin airline bla bla bla
	
	//send to database/json file
 	
	
});

 function renderButton(val){
	 //console.log(val);
	  
	 $("#type-form-container").append("<input type='button' id='passenger-type-Btn' class='"+ val+ "' value='" +val+"' />"); 
	 
 }
 
function clickEventListener() { 

   $(document).on('click', '#passenger-type-btn', function(e){
		   if (e){
	   				var temp = $(e.target).val() ;
	     			console.log(temp); 
					passenger_type= temp; 
			
	   				}
   });
}
function hidden(elements){
	$(elements).hide(); 
}
function shown(elements){
	
	$(elements).show();
}
