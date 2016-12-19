// JavaScript Document
$(document).ready(function(){
	
	$("#wrapper").hide(); 
	nextDiv();

	
});

function nextDiv(){
	
	$(document).on("click", "#next-div", function (e){
		if (e){
			
			$("#tp_One").hide(); 
			$("#wrapper").show();
		}
		
	});
}