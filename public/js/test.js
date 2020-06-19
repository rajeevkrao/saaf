
var tmSld=1;
$('#list-tab a').on('click', function (e) {
  e.preventDefault()
  if(($(this).attr("id"))==tmSld)
  	return;
  $(`img#${tmSld}`).css("display","none");
  tmSld=$(this).attr("id")
  $(`img#${tmSld}`).css("display","block");
})
			function submition(){
				/*var flag=0;
				$(".dropDown").each(function(){
        			// Test if the div element is empty
        			if($(this).val() !== "0") {
            			flag=1;
            			document.querySelector(".contact_form").reportValidity();
        			}
	    		});*/
				alert('Thank you for your submission');
				/*console.log(flag)
				return false;*/
			}

			function onChngSel(self){
			/*    if($(self).children("option:selected").val()=="other")
			    	$(`#${$(self).attr("id")}Other`).css("display","block")
			    else
			    	$(`#${$(self).attr("id")}Other`).css("display","none")
			*/
			}