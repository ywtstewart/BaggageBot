// JavaScript Document


$("#scan-btn").on('change', function(){
	$(tpContainer).hide();
	$(PUContainer).show();
	$("#chat").empty();
	
	input = 6;
	botNameGenerator(input);
	$("#basic-info").append(fullname);
	$("#flight-info").append(flightnumber);
	 $("#post-form").css('display', 'block !important');
	 $("#scan-form").css('display', 'none');
	//image first
	
	
});