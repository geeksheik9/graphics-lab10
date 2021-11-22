
// some globals
var gl;


var delay = 100;
var direction = true;
var iBuffer;
var vBuffer;
var colorBuffer;
var program;
var theta = [0,135,0];
var yAxis = 1;

modelViewMatrix = mat4();

var vertices =[
	// face 1
	vec4(-0.5, 0.5, -0.5, 1.0), //z1.0
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0), 
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0), 

	// face 2
	vec4(0.5, 0.5, 0.5, 1.0), //x1.0
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),

	// face 3
	vec4(0.5, -0.5, 0.5, 1.0), //y-1.0
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0),

	// face 4
	vec4(0.5, 0.5, -0.5, 1.0), //y1.0
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),

	// face 5
	vec4(-0.5, -0.5, -0.5, 1.0), //z-1.0
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),

	// face 6
	vec4(-0.5, 0.5, -0.5, 1.0), // x-1.0
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	]

var normals = [
	// face 1
	vec3(0.0, 0.0, 1.0),
	vec3(0.0, 0.0, 1.0),
	vec3(0.0, 0.0, 1.0),
	vec3(0.0, 0.0, 1.0),
	vec3(0.0, 0.0, 1.0),
	vec3(0.0, 0.0, 1.0),

	// face 2
	vec3(1.0, 0.0, 0.0),
	vec3(1.0, 0.0, 0.0),
	vec3(1.0, 0.0, 0.0),
	vec3(1.0, 0.0, 0.0),
	vec3(1.0, 0.0, 0.0),
	vec3(1.0, 0.0, 0.0),

	// face 3
	vec3(0.0, -1.0, 0.0),
	vec3(0.0, -1.0, 0.0),
	vec3(0.0, -1.0, 0.0),
	vec3(0.0, -1.0, 0.0),
	vec3(0.0, -1.0, 0.0),
	vec3(0.0, -1.0, 0.0),

	// face 4
	vec3(0.0, 1.0, 0.0),
	vec3(0.0, 1.0, 0.0),
	vec3(0.0, 1.0, 0.0),
	vec3(0.0, 1.0, 0.0),
	vec3(0.0, 1.0, 0.0),
	vec3(0.0, 1.0, 0.0),

	// face 5
	vec3(0.0, 0.0, -1.0),
	vec3(0.0, 0.0, -1.0),
	vec3(0.0, 0.0, -1.0),
	vec3(0.0, 0.0, -1.0),
	vec3(0.0, 0.0, -1.0),
	vec3(0.0, 0.0, -1.0),

	// face 6
	vec3(-1.0, 0.0, 0.0),
	vec3(-1.0, 0.0, 0.0),
	vec3(-1.0, 0.0, 0.0),
	vec3(-1.0, 0.0, 0.0),
	vec3(-1.0, 0.0, 0.0),
	vec3(-1.0, 0.0, 0.0)
	];

	var red = vec4(1.0,0.0,0.0,1.0);
	var green = vec4(0.0,1.0,0.0,1.0);
	var blue = vec4(0.0,0.0,1.0,1.0);
	var magenta = vec4(1.0,0.0,1.0,1.0);
	var yellow = vec4(1.0,1.0,0.0,1.0);
	var cyan = vec4(0.0,1.0,1.0,1.0);
	var gray = vec4(0.9,0.9,0.9,1.0)

	var vertexColors = [];

var eye = vec3(0,0.5,0.5); //0, 0.5, 0.5	//0,0,1
var at = vec3(0,0,0); //0,0,0			//0,0,-1
var up = vec3(0,0.5,0); //0,0.5,0	//0,1,0

//var color = vec4(1.0, 0.4, 7.0, 1.0);
var ambient = vec3(1.0,1.0,1.0);
var specular = vec3(1.0,1.0,1.0); 
var light = vec3(1.0, 1.0, -1.0);
var specIntensity = 0.5;
var shininess = 0.5;

window.onload = function init() {

	// get the canvas handle from the document's DOM
    var canvas = document.getElementById( "gl-canvas" );
	height = canvas.height
	width = canvas.width
	// initialize webgl
    gl = WebGLUtils.setupWebGL(canvas);

	// check for errors
    if ( !gl ) { 
		alert("WebGL isn't available"); 
	}

    // set up a viewing surface to display your image
    gl.viewport(0, 0, canvas.width, canvas.height);

	// clear the display with a background color 
	// specified as R,G,B triplet in 0-1.0 range
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    //  Load shaders -- all work done in init_shaders.js
    program = initShaders(gl, "vertex-shader", "fragment-shader");

	// make this the current shader program
    gl.useProgram(program);

	// Get a handle to theta  - this is a uniform variable defined 
	// by the user in the vertex shader, the second parameter should match
	// exactly the name of the shader variable
    thetaLoc = gl.getUniformLocation(program, "theta");

	colorLoc = gl.getUniformLocation(program, "vertColor");
	mvmLoc = gl.getUniformLocation(program, 'mvm');
	perspectiveLoc = gl.getUniformLocation(program, 'perspective');

	diffColorLoc = gl.getUniformLocation(program, 'vDiffColor');
	specColorLoc = gl.getUniformLocation(program, 'vSpecColor');

	shininessLoc = gl.getUniformLocation(program, 'vShininess');

	lightPos = gl.getUniformLocation(program, 'vLightPos');
	
	vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	normalLoc = gl.getUniformLocation(program, 'vNormal');
	gl.vertexAttribPointer(normalLoc, 3, gl.Float, false, 0,0);
	gl.enableVertexAttribArray(normalLoc);

	addColors(false);

	colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW)
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0 , 0);
	gl.enableVertexAttribArray(vColor)

	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

    render();
};

function addColors(bool){
	for(let i = 0; i < 6; i++){
		var color = gray;
		if(bool){
			if(i === 0 ){
				color = red;
			}
			if(i === 1){
				color = green;
			}
			if(i === 2){
				color = blue;
			}
			if(i === 3){
				color = magenta;
			}
			if(i === 4){
				color = yellow;
			}
			if(i === 5){
				color = cyan;
			}
		}	
		for(let j = 0; j < 6; j++){
			vertexColors.push(color)
		}
	}
}

function render() {
	// this is render loop

	// clear the display with the background color
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	lightX = document.getElementById('lightX').value;
	lightY = document.getElementById('lightY').value;
	lightZ = document.getElementById('lightZ').value;

	gl.uniform3fv(lightPos, vec3(lightX/100,lightY/100,2*lightZ/100));
	
	diffRed = document.getElementById('diffRed').value;
	diffGreen = document.getElementById('diffGreen').value;
	diffBlue = document.getElementById('diffBlue').value;

	theta[yAxis] += 2;

	gl.uniform3fv(diffColorLoc, vec3(diffRed/100, diffGreen/100, diffBlue/100));

	specRed = document.getElementById('specRed').value;
	specGreen = document.getElementById('specGreen').value;
	specBlue = document.getElementById('specBlue').value;

	gl.uniform3fv(specColorLoc, vec3(specRed/100, specGreen/100, specBlue/100));

	shininess = document.getElementById('shininess').value;

	gl.uniform1f(shininessLoc, shininess/100);
	
	gl.uniformMatrix4fv(mvmLoc, false, flatten(lookAt(eye, at, up)));
	gl.uniformMatrix4fv(perspectiveLoc, false, flatten(createPerspective(-1,1,-1,1,1,-1)));

	gl.uniform3fv(thetaLoc, theta);
	gl.drawArrays(gl.TRIANGLES, 0, 36);

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}


function lookAt(eye, at, up){
	n = normalize(subtract(at , eye));
    u = cross(n , normalize(up));
    v = cross(u , n);
    cam = mat4(
		vec4(u[0], u[1], u[2], 0),
        vec4(v[0], v[1], v[2], 0),
        vec4(n[0], n[1], n[2], 0),
        vec4(0 , 0 , 0 , 1)
		);

    return mult(cam, translate3d(-eye[0], -eye[1], -eye[2]));
}

function translate3d (tx, ty, tz) {
	return mat4( 	
		vec4(1, 0, 0, tx),
		vec4(0, 1, 0, ty),
		vec4(0, 0, 1, tz),
		vec4(0, 0, 0, 1)
	);
}

function createPerspective(left, right, bottom, top, near, far) {
	frustumMatrix = mat4(vec4(1, 0, 0, (left+right)/2),
                         vec4(0, 1, 0, (bottom + top)/2),
                         vec4(0, 0, 1, 0),
                         vec4(0, 0, 0, 1)
                         );
    perspectiveMatrix = mat4(vec4(near, 0, 0, 0),
                             vec4(0, near, 0, 0),
                             vec4(0, 0, 1, 0),
                             vec4(0, 0, -1, 0)
                             );
    scaleMatrix = mat4(vec4(2/(right-left), 0, 0, 0),
                       vec4(0, 2/(top-bottom), 0, 0),
                       vec4(0, 0, 1, 0),
                       vec4(0, 0, 0, 1)
                       );
    mappingDepth = mat4(vec4(1, 0, 0, 0),
                        vec4(0, 1, 0, 0),
                        vec4(0, 0, -(far + near)/(far-near), (2*far*near)/(near-far)),
                        vec4(0, 0, -1, 0 )
                        );

    return mult(scaleMatrix, mult(perspectiveMatrix, mult(mappingDepth, frustumMatrix)));
}