// JavaScript Document


$("#scan-btn").on('change', function(){
	$(tpContainer).hide();
	$(PUContainer).show();
	$("#chat").empty();
	$("#basic-info").append(fullname);
	$("#flight-info").append(flightnumber);
	//image first
	
	
});