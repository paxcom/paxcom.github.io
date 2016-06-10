// JavaScript Document
function submitRequestForDemo(){
	
	var data = new FormData();
	data.append('_subject', 'REQUEST A DEMO');
	data.append('mobile_number', '9899709711');
	data.append('_replyto', 'sagararora19992@gmail.com');
	data.append('description', 'Testing');
	data.append('name', 'Testing');
	$.ajax({
		type:'POST',
		url:'http://kinator.paxcom.net/paxcom/demo',
		data:data,	
		processData: false,
  		contentType: false,	
		success: function(msg){
			if(msg=='success'){
				window.location.href='/thank.html';
			}
		}
	});
}