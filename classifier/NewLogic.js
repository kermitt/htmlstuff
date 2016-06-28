
var w = 1600; // This number refers to pixels
var NORTH_SOUTH_VIEWPORT = 1000;// This number refers to pixels
var MINIMUM_COHORT_SIZE = 6; // This number refers to pixels 
var COHORT_W;//This number refers to pixels
var GAP = 4; // This number refers to the minimum gap inbetween groups in the HoL in the display
var PLANCK = 0;// This number refers to pixels ( it will endup being something like 0.002783478372 pixel )

var MOST_PIXELS = 0;// the count of  the number of people in the 'busiest' timeslice cohort
var HoL = {};// Simple HoL: 'H' are the timeslices and the 'L' is the ary of cohorts in that timeslice

function populateWorld(hyperpoints) {
    // Make the cxt, set its ctx.strokeStyle etc etc...   ...No 'logic' per se, just HTML5 setup
    setupContext(); 

    // Convert the List it a HoL w/ the keys of the H being 'when'    
    for (var i in hyperpoints) {
        var obj = hyperpoints[i];
    	if ( ! HoL.hasOwnProperty(hyperpoints[i].when)) {
            HoL[obj.when] = [];
    	}
        HoL[obj.when].push(obj);
    }

    // The cohorts in the HoL will take NorthSouth room - will be to use ratios 
    // to help determine things for that - here? find the most_pixeled cohort... 
    // Ratios will be driven off of that number
    for ( var when in HoL ) {
        var ary = HoL[when];

        MOST_PIXELS = Math.max(MOST_PIXELS, getUsedPixelsPerGivenCohort(ary)); 
    }

    COHORT_W = 1600 / ( bigWhen + 1 ); 
    PLANCK = NORTH_SOUTH_VIEWPORT / MOST_PIXELS;

    unroll();
}

function unroll() {     
    var i = 0 ; 
    for ( var when in HoL ) { 
                var ary = HoL[when]; 
        var pixels = getUsedPixelsPerGivenCohort( ary ); 

        var taken = pixels * PLANCK; 
        var remains = NORTH_SOUTH_VIEWPORT - taken; 


        var breaks = ary.length + 1; 

        var jump = remains / breaks; 




        console.log( "breaks: " + breaks + "    jump " +  jump + "    " + i + " ary length " + ary.length + "  pixels: " + pixels + "  PLANCK: " + PLANCK  + " taken " + taken + " remains " + remains + " total : " + ( taken + remains)) ; 
        i++; 

        var down = 0;

        for ( var index in ary ) {

            down += jump;

            
            var x1 = when * COHORT_W; 
            var x2 = x1 + COHORT_W;

            var y1 = down;
            down += ary[index].seen * PLANCK;
            var y2 = down;


            paint(x1,y1,x2,y2);

        }

    }

    console.log("MOST_PIXELS * PLANCK: " + ( MOST_PIXELS * PLANCK ) ) ; 

}


function getUsedPixelsPerGivenCohort(ary) {
    // 1: 'used' is mostly the 'seen' people count.
    // 2: 'used' will sometimes include MINIMUM_COHORT_SIZE
    // 3: 'used' will always have the mostly insignificant amount of the 'cohort group count' : 
    var allClaimedPixelSpace = 0;
    // Adjust to count all the people
    for ( var index in ary ) {
        var tmp = ary[index].seen;
        if ( tmp < MINIMUM_COHORT_SIZE ) {
            tmp = MINIMUM_COHORT_SIZE;
        }
        allClaimedPixelSpace += tmp;
    }

    // Adjust to count all the groups
    allClaimedPixelSpace += ( GAP * ary.length); 

    return allClaimedPixelSpace;
}

//when|seen|X|Y|Z|velocity|days_supply_count|patient_paid_amount|ingredient_cost_paid_amount|male|female|sex_other|ccs_22|ccs_24|ccs_29|ccs_other

function write( msg, x, y ) {
    ctx.fillText( msg ,x,y);
}
function paint(x1, y1, x2, y2 ) { 
    ctx.beginPath();
    ctx.moveTo( x1,y1 );
    ctx.lineTo( x2,y1);
    ctx.lineTo( x2,y2);
    ctx.lineTo( x1,y2);
    ctx.closePath();  
    ctx.stroke();
    ctx.fill();

//    ctx.beginPath();
//    ctx.fillStyle = "#0f0f0f";
//    ctx.fillRect(x1 + 100,y1 + 200,10,y2);
 //   ctx.stroke();
}

var ctx; 
function setupContext() { 
    var c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = '#8ED6FF';
    ctx.strokeStyle = "rgba(255,126,0,0.9)";
    ctx.lineWidth = 1;
}