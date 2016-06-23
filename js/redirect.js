// JavaScript Document
/*$(function() {
$("input[name$='value']").click(function() {
    var value = $(this).val();
    if (value == 'google') {
        window.location.assign("http://www.google.com");
    }
    else if (value == 'yahoo') {
        window.location.assign("http://www.yahoo.com");
    }
    else if (value == 'bing') {
        window.location.assign("http://www.bing.com");
    }
});});*/

$(document).ready(function(){
	$(function() {
		var oldLocation = window.location.href;
		console.log(oldLocation);
			
		if(oldLocation.indexOf('support')){
		  window.location.assign("http://support.paxcom.net/");
		} 
	});
	
});