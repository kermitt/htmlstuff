function populateWorld(hyperpoints) {

    for (var i in hyperpoints) {
    	console.log( i + " !!!   " + hyperpoints[i].X); 
    }

    drawIt(); 

}

function drawIt() { 
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0,0,150,75);

console.log( " finishe drawing it ") ;  

}