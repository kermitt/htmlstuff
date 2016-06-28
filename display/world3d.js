// standard global variables
var X_dimension = "x"; // the true riv!! 
var Y_dimension = "velocity";
var Z_dimension = "quarter";

var container, scene, camera, renderer, controls, mouseVector;

// custom global variables
var cube;
var projector, mouse = {
        x: 0,
        y: 0
    },
    INTERSECTED;
var sprite1;
var canvas1, context1, texture1;


init();
animate();

// FUNCTIONS

function addX() {
    camera.position.x += 1;
    camera.position.y += 0;
    camera.position.z += 0;
    console.log("XX : " + camera.position.x);
}


function addY() {
    camera.position.x += 0;
    camera.position.y += 1;
    camera.position.z += 0;
    console.log("YY : " + camera.position.y);

}


function addZ() {
    camera.position.x += 0;
    camera.position.y += 0;
    camera.position.z += 1;

    console.log("ZZ : " + camera.position.z);

}

function init() {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 0, 1000);
    camera.lookAt(scene.position);
    //  // RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    // renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setSize(containerWidth, containerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;

    // EVENTS
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Axes
    axes = buildAxes();
    scene.add(axes);

    // Picking stuff
    projector = new THREE.Projector();
    mouseVector = new THREE.Vector3();

    // User interaction
//    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    function onMouseMove(e) {

        mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
        mouseVector.y = 1 - 2 * (e.clientY / containerHeight);
        mouseVector.z = 0;
        var raycaster = projector.pickingRay(mouseVector.clone(), camera),
            intersects = raycaster.intersectObjects(cubes.children);

        cubes.children.forEach(function(cube) {
            cube.material.color.setRGB(cube.R, cube.G, cube.B);
        });

        for (var i = 0; i < intersects.length; i++) {
            var intersection = intersects[i],
                obj = intersection.object;
       //     console.log( "!!!  I am " + obj.id ); 
            obj.material.color.setRGB(0, 1.0 - i / intersects.length,  0);
            chooseMe( obj.id ); 
        }
    }

    function chooseMe( id ) {

        var out = "<table style='margin-left:100px' border='1'>";
        for ( var key in hyperpoints[id]) {
            out += "<tr><td>" + key + "</td><td>" + hyperpoints[id][key] + "</td></tr>";
        }
        out += "</table>";
        document.getElementById("choosen").innerHTML = out; 
        //choosen(id)

    }

    function onWindowResize(e) {
        paintWindow();
    }

    function paintWindow() {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;
        renderer.setSize(containerWidth, containerHeight);
        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();
    }

    cubes = new THREE.Object3D();

    //  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0), 0xFF0000, false)); // +X
    var howfar = 120;
    var spriteX = makeArtifacts.makeTextSprite("Drug Class");
    spriteX.position.set(howfar, 0, 0);
    scene.add(spriteX);

    var spriteY = makeArtifacts.makeTextSprite("Drug Group");
    spriteY.position.set(0, howfar, 0);
    scene.add(spriteY);

    var spriteZ = makeArtifacts.makeTextSprite("tbd-time");
    spriteZ.position.set(0, 0, howfar);
    scene.add(spriteZ);

    paintWindow();
} // END init();

// http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
function buildAxes() {
    var axes = new THREE.Object3D();

    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-100, 0, 0), 0x800000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -100, 0), 0x008000, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0,  ( 400 ) ), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -100), 0x000080, true)); // -Z

    return axes;

}

var useGender = false;
var useCcs = true;
function populateWorld(hyperpoints) {

    cubes = new THREE.Object3D();
    scene.add(cubes);
    range = 100;
    var count = 0;


    for (var i in hyperpoints) {


        var mat = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.5
        });

        var big = hyperpoints[i].velocity;
        var geom = new THREE.CubeGeometry(big, big, big);
        var cube = new THREE.Mesh(geom, mat);

        if ( useGender ) {
            if ( hyperpoints[i].male > hyperpoints[i].female  ) {
                cube.R = 0;
                cube.G = 0;
                cube.B = 1;
            } else {
                cube.R = 1;
                cube.G = 0;
                cube.B = 0;
            }
        } else if ( useCcs ) {

            if ( hyperpoints[i].ccs_22 > hyperpoints[i].ccs_24 &&   hyperpoints[i].ccs_22 > hyperpoints[i].ccs_29  ) {
                cube.R = 0;
                cube.G = 0;
                cube.B = 1;
            } else if (hyperpoints[i].ccs_24 > hyperpoints[i].ccs_22 &&   hyperpoints[i].ccs_22 > hyperpoints[i].ccs_29  ) {
             
                cube.R = 1;
                cube.G = 0;
                cube.B = 0;
            } else if (hyperpoints[i].ccs_29 > hyperpoints[i].ccs_22 &&   hyperpoints[i].ccs_22 > hyperpoints[i].ccs_24  ) {
             
                cube.R = 1;
                cube.G = 1;
                cube.B = 0;
            } else {
                cube.R = 0;
                cube.G = 0;
                cube.B = 0;
            }
        }


        mat.color.setRGB(cube.R, cube.G, cube.B);

        cube.position.set(hyperpoints[i].X, hyperpoints[i].seenLocation, hyperpoints[i].whenLocation);
    //console.log("when: " + hyperpoints[i].when + "  whenLoc: " + hyperpoints[i].whenLocation );

//        console.log(i + "\t" + hyperpoints[i].X + "  " + hyperpoints[i].Y + "  " + hyperpoints[i].Z + " velocity " + hyperpoints[i].velocity);

//        cube.rotation.x = range * (0.5 - Math.random());
//        cube.rotation.y = range * (0.5 - Math.random());
//        cube.rotation.z = range * (0.5 - Math.random());
        cube.id = i;
        cubes.add(cube);

    }
}
function buildAxis(src, dst, colorHex, dashed) {
    var geom = new THREE.Geometry();
    var sort_of_line;

    if (dashed) {
        sort_of_line = new THREE.LineDashedMaterial({
            linewidth: 1,
            color: colorHex,
            dashSize: 5,
            gapSize: 5
        });
    } else {
        sort_of_line = new THREE.LineBasicMaterial({
            linewidth: 100,
            color: colorHex
        });
    }
    geom.vertices.push(src.clone());
    geom.vertices.push(dst.clone());
    var axis = new THREE.Line(geom, sort_of_line);
    return axis;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
    //updateDashboard();
}

function update() {
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}