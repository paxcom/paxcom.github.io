// JavaScript Document 
function submitRequestForDemo(){
$("#contactform").submit(function(e){
 	var params= $(this).serializeArray();
    var action= $(this).attr("action");
     $.ajax({
        url : action,
        type: "POST",
        data : params,
        mimeType: "text/html; charset=utf-8",
        success:function(data, textStatus, jqXHR)  {
            alert("We will contact you shortly");
        },error: function(jqXHR, textStatus, errorThrown)  {
             console.log("error");
        }
    });
	 e.preventDefault(); //STOP default action
}); }