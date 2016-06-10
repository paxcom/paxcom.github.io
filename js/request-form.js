// JavaScript Document 
submitForm = function(form_id) {
 $(("#"+form_id)).submit(function(e)
 {
  var params= $(this).serializeArray();
  var action= $(this).attr("action");
   $.ajax({
   url : action,
   type: "POST",
   data : params,
   mimeType: "text/html; charset=utf-8",
   success:function(data, textStatus, jqXHR)  {
    //data: return data from server on success fully complete the rquest
   },error: function(jqXHR, textStatus, errorThrown)  {
     console.log("error");
   }
  });
  e.preventDefault(); //STOP default action
 });
}

$document.ready(function(){
 
 submitForm("contactform");
 submitForm("contactform2");
 submitForm("contactform3");
 
});