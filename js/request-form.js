// JavaScript Document 
function submitForm(id){
 $(("#"+id)).submit(function(e)
 {
	e.preventDefault();
  var params= $(this).serializeArray();
  var action= $(this).attr("action");
   $.ajax({
   url : action,
   type: "POST",
   data : params,
   mimeType: "text/html; charset=utf-8",
   success:function(data, textStatus, jqXHR)  {
	   document.getElementById(id).reset();
	   if(id=="contactform"){
	   	$(".right-side-bar").toggleClass("show-hide");
		$(".btn-request-a-demo").toggleClass("org");
	   }
     //alert("We will contact you shortly");
	 window.location.href="/thank.html";
   },error: function(jqXHR, textStatus, errorThrown)  {
     console.log("error");
   }
  }); 
  
  return false;
 });  
} 
$(document).ready(function(){
 
 submitForm("contactform"); 
 submitForm("contactform2");
 submitForm("contactform3");
 
}); 
