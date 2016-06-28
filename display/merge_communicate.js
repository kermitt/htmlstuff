var communicate = {
    ajaxRequest: function() {
        var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]
        if (window.ActiveXObject) {
            for (var i = 0; i < activexmodes.length; i++) {
                try {
                    return new ActiveXObject(activexmodes[i])
                } catch (e) {
                	// ignore 
                }
            }
        } else if (window.XMLHttpRequest) {
        	return new XMLHttpRequest();
        } else {
            return false;
        }
    },
    
    doPost: function( command, feature, select_widget ) {
    	
    	var id = this.getSelectedValue( select_widget );  	
        var post = new this.ajaxRequest();
        post.onreadystatechange = function() {
            if (post.readyState == 4) {
                if (post.status == 200) {
                    innerHTML = post.responseText
                    alert( post.responseText ); 
                } else {
                    alert("FaiLB0t! " + command + " : " + value + " http: " + post.status );
                }
            }
        }
        var parameters="command="+command+"&feature="+feature+"&id="+id;
        post.open("POST", "/1000/CmdAndForward", true); // true = async
        post.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        post.send(parameters)        
    },
    
    getSelectedValue : function( select_widget ) {
    	var i = select_widget.selectedIndex;
    	var value = select_widget.options[i].value;
    	var text = select_widget.options[i].text;
    	console.log("Fetching: "+ text );
    	return value;
    }  
};






/*
var communicate = {
ajaxRequest: function() {
    var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]
    if (window.ActiveXObject) {
        for (var i = 0; i < activexmodes.length; i++) {
            try {
                return new ActiveXObject(activexmodes[i])
            } catch (e) {
            	// ignore 
            }
        }
    } else if (window.XMLHttpRequest) {
    	return new XMLHttpRequest()
    } else {
        return false
    }
},

doPost: function( command, value ) {
    var mypostrequest = new this.ajaxRequest();
    mypostrequest.onreadystatechange = function() {
        if (mypostrequest.readyState == 4) {
            if (mypostrequest.status == 200 || window.location.href.indexOf("http") == -1) {
//                document.getElementById("result").innerHTML = mypostrequest.responseText
                alert( mypostrequest.responseText ); 
            } else {
                alert("An error has occured making the request")
            }
        }
    }
//    var command=encodeURIComponent(document.getElementById("name").value)
//       var agevalue=encodeURIComponent(document.getElementById("age").value)
    var parameters="command="+command+"&value="+value;
    mypostrequest.open("POST", "/1000/CmdAndForward", true);
    mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    mypostrequest.send(parameters)
    
}    
};
*/