"use strict";

var Display = {
    init(m, canvasId, width, height, glassCanvasId) {
        console.log("inti!" + m + " id " + canvasId + " w " + width  + " h " +  height + " glassCanvasId " + glassCanvasId ) ; 
        this.matrix = m;
        this.mouseIsDown = false;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');

        this.w = width;
        this.h = height;
        this.draw();

        this.glass_canvas = document.getElementById(glassCanvasId);
        this.glass_context = this.glass_canvas.getContext('2d');
        this.glass_context.strokeStyle = "rgba(255,126,0,0.4)";
        this.glass_context.lineWidth = 6;

        this.activeLayer = -1;
        this.activeCohort = -1;

        // for metro picking
        this.SELECT_MODE = "SELECT_MODE";
        this.INSPECT_MODE = "INSPECT_MODE";
        this.MODE = this.SELECT_MODE;
    },

    showControlPoint( x, y ) {
        this.context.strokeStyle = "rgba(0,0,0,0.4)";
        this.context.fillStyle = "rgba(0,0,0,0.3)";
        this.context.fillRect(x,y,10,10);
        this.context.stroke();
    }, 

  
    draw() {
        var color = "rgba(167,219,215,0.9)";
        this.context.fillStyle = color;

        console.log(" DDDD " ) ; 

        this.glasspane.moveTo(50,50);
        this.glasspane.lineTo( 100, 50 ); 
        this.glasspane.lineTo(100, 100 );
        this.glasspane.lineTo(50, 100 );
                this.glasspane.lineTo(50, 50 );
        

///          this.drawCohort(x1, y1, x2, y2, x3,y3,x4,y4, 41, 41);

                    this.glasspane.beginPath();
    },

    moving(pos) {
    },

    setActiveCohort( i, j, pos ) {
    },

    mouseUp(pos) {
        //        console.log("mouseUp! " + pos.x);
    },

    mouseDown(pos) {
        },

    clicks(pos) {
        //        console.log("clicks! " + pos.x);
    },

    dragging(pos) {
        //        console.log("!!! dragging! " + pos.x);
    },
}