var halfWorldDiameter = 600;
var t1 = undefined;
var hyperpoints = [];
var bigX = bigY = bigZ = bigVelocity = bigWhen = bigSeen = -9999;
var littleX = littleY = littleZ = 9999;

function loadPSV() { 
    t1 = new Date(); 
    $.ajax({
        type: "GET",
        url: "b.psv",
        //url: "22_24_29_clusters_3000days.psv",
        dataType: "text",
        success: function(data) {processData(data);},
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }    
     });
}

function showBounds_tdd() {
    console.log("Smallest X=" + littleX + "   y=" + littleY + "   z=" + littleZ ); 
    console.log("Largest x=" + bigX + "   y=" + bigY + "   z=" + bigZ ); 
    console.log("Elements=" + hyperpoints.length);
    for ( var index in hyperpoints ) { 
        console.log( index +  " X " + hyperpoints[index].X + " v " + hyperpoints[index].velocity ); 
    }
}

function buildEntries_step1(data) {
    var entries = data.split("\n");
    //when|seen|X|Y|Z|velocity|days_supply_count|patient_paid_amount|ingredient_cost_paid_amount|male|female|sex_other|ccs_22|ccs_24|ccs_29|ccs_other
    var skip_header = 1;
    var index = 0;
    for ( var i = skip_header ; i < entries.length; i++ ) { 
        var obj = {}; 
        var pieces = entries[i].split("|");
        if ( pieces.length == 16 ) { 
            obj["when"] = parseFloat(pieces[0]); 
            obj["seen"] = parseFloat(pieces[1]);
            obj["X"] = parseFloat(pieces[2]);
            obj["Y"] = parseFloat(pieces[3]);
            obj["Z"] = parseFloat(pieces[4]); 
            obj["velocity"] = parseFloat(pieces[5]);
            obj["days_supply_count"] = parseFloat(pieces[6]);
            obj["patient_paid_amount"] = parseFloat(pieces[7]);
            obj["ingredient_cost_paid_amount"] = parseFloat(pieces[8]);
            obj["male"] = parseFloat(pieces[9]);
            obj["female"] = parseFloat(pieces[10]);
            obj["sex_other"] = parseFloat(pieces[11]);
            obj["ccs_22"] = parseFloat(pieces[13]);
            obj["ccs_24"] = parseFloat(pieces[14]);
            obj["ccs_29"] = parseFloat(pieces[15]);
            obj["ccs_other"] = parseFloat(pieces[16]);
            hyperpoints[index] = obj;
            index++; 
        } else {
        }
    }        
}

function setSmallest_step2() {
    for ( var i = 0 ; i < hyperpoints.length; i++ ) { 
        littleX = Math.min(parseFloat(hyperpoints[i]["X"]),littleX); 
        littleY = Math.min(parseFloat(hyperpoints[i]["Y"]),littleY);
        littleZ = Math.min(parseFloat(hyperpoints[i]["Z"]),littleZ); 
    }    
}

function translateUpFromNegative_step3() {
   for ( var i = 0 ; i < hyperpoints.length; i++ ) { 
        if ( littleX < 0 ) {
            hyperpoints[i].X += parseFloat(Math.abs(littleX));

        }
        if ( littleY < 0 ) {
            hyperpoints[i].Y += parseFloat(Math.abs(littleY));
        }
        if ( littleZ < 0 ) {
            hyperpoints[i].Z += parseFloat(Math.abs(littleZ));
        }
    }    
}

function setLargest_step4() {
   for ( var i = 0 ; i < hyperpoints.length; i++ ) { 
        bigX = Math.max(hyperpoints[i].X, bigX); 
        bigY = Math.max(hyperpoints[i].Y, bigY);
        bigZ = Math.max(hyperpoints[i].Z, bigZ);
        bigVelocity = Math.max(hyperpoints[i].velocity,bigVelocity);
        bigWhen = Math.max(hyperpoints[i].when,bigWhen);
        bigSeen = Math.max(hyperpoints[i].seen,bigSeen);
    }
}

function setRatioedXYZ_step5() { 
    var quarterWorldDiameter = halfWorldDiameter / 2;

   for ( var i = 0 ; i < hyperpoints.length; i++ ) {
   
        // set XYZ ratios relative to '1' 
        hyperpoints[i].X = .75 * hyperpoints[i].X / bigX;
        hyperpoints[i].Y = .75 * hyperpoints[i].Y / bigY;
        hyperpoints[i].Z = .75 * hyperpoints[i].Z / bigZ;

        // place into the hypercube
        hyperpoints[i].X *= halfWorldDiameter;
        hyperpoints[i].Y *= halfWorldDiameter;
        hyperpoints[i].Z *= halfWorldDiameter;

        // translate back the to center
        hyperpoints[i].X -= quarterWorldDiameter;
        hyperpoints[i].Y -= quarterWorldDiameter;
        hyperpoints[i].Z -= quarterWorldDiameter;

        // set ratio for velocity
        hyperpoints[i].velocity = 1 * hyperpoints[i].velocity / bigVelocity;
        hyperpoints[i].velocity *= 40;

        // set the least possible
        hyperpoints[i].velocity += 2;

        hyperpoints[i].whenLocation = 1 * hyperpoints[i].when / bigWhen;
        hyperpoints[i].whenLocation *= halfWorldDiameter;
        hyperpoints[i].whenLocation -= quarterWorldDiameter;


        hyperpoints[i].seenLocation = 1 * hyperpoints[i].seen / bigSeen;
        hyperpoints[i].seenLocation *= halfWorldDiameter;
        hyperpoints[i].seenLocation -= quarterWorldDiameter;
    }
}


function processData(data  ) {
    //when|seen|X|Y|Z|velocity|days_supply_count|patient_paid_amount|ingredient_cost_paid_amount|male|female|sex_other|ccs_22|ccs_24|ccs_29|ccs_other
    //0|3364|-0.20059361738031103|0.17095511444020262|0.36974918076063584|2.0|34.0|17.0|328721.0|478|8947|0|1446|7747|232|0
    buildEntries_step1(data); 
    setSmallest_step2();
    translateUpFromNegative_step3();
    setLargest_step4();
    setRatioedXYZ_step5(); 

    // just for TDD purposes
    //showBounds_tdd(); 

    // return true when this is all finishsed

    populateWorld( hyperpoints) ; 
}