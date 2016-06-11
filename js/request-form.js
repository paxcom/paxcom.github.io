// JavaScript Document 
/*function submitForm(id){
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
 
}); */



window.getQueryStringAsJSONString = function (frmObject) {
    var params = "";
    var querySelect = null;
    
    if (frmObject.elements) {
        querySelect = frmObject.elements;
    } else if(frmObject.getElements()){
        querySelect = frmObject.getElements();
    } else {
		    querySelect = jQuery(frmObject).serializeArray();
	}
    for (var i = 0; i < querySelect.length; i++) {
        inputObj = querySelect[i];
        name = inputObj.name;
        value = inputObj.value;
        if (name != "" && name != "selectedNav") {
            params = params + "\""+name+"\":\""+value+"\"";
			if(i<(querySelect.length-1)){
				params = params + ",";
			}
           
        }
    }
    return "{"+params+"}";
}
function submitForm(id){
 $(("#"+id)).submit(function(e)
 {
	e.preventDefault();
  var params= $(this).serializeArray();
  var action= $(this).attr("action");
  var _name = $(this).attr("name");
   $.ajax({
   url : action,
   type: "POST",
   data: "data="+getQueryStringAsJSONString(document.forms[_name]),
   contentType: "application/json",
   success:function(data, textStatus, jqXHR)  {	   
	 window.location.href="/thank.html";
   },error: function(jqXHR, textStatus, errorThrown)  {
     console.log("error");
   }
  }); 
  
  return false;
 });  
} 
