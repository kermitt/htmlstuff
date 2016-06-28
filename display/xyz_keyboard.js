var use_console_out = false;

function addX() {
    camera.position.x += 1;
    camera.position.y += 0;
    camera.position.z += 0;
    if ( use_console_out ) {
    	console.log("XX : " + camera.position.x);
	}
}

function addY() {
    camera.position.x += 0;
    camera.position.y += 1;
    camera.position.z += 0;
    if ( use_console_out ) {
 	   console.log("YY : " + camera.position.y);
 	}
}

function addZ() {
    camera.position.x += 0;
    camera.position.y += 0;
    camera.position.z += 1;
    if ( use_console_out ) {
    	console.log("ZZ : " + camera.position.z);
	}
}
