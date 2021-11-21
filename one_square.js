
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

var rotating = false;

modelViewMatrix = mat4();

var vertices =[
	// face 1
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0), 
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0), 

	// face 2
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),

	// face 3
	vec4(0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(0.5, -0.5, 0.5, 1.0),

	// face 4
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, 0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),

	// face 5
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, 0.5, -0.5, 1.0),
	vec4(0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),

	// face 6
	vec4(-0.5, 0.5, -0.5, 1.0),
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

	var vertexColors = [
		// face 1
		red,red,red,red,red,red,

		// face 2
		green,green,green,green,green,green,

		// face 3
		blue,blue,blue,blue,blue,blue,

		// face 4
		magenta,magenta,magenta,magenta,magenta,magenta,

		// face 5
		yellow,yellow,yellow,yellow,yellow,yellow,

		// face 6
		cyan,cyan,cyan,cyan,cyan,cyan
		
		];

var eye = vec3(0,0.5,0.5); //0, 0.5, 0.5	//0,0,1
var at = vec3(0,0,0); //0,0,0			//0,0,-1
var up = vec3(0,0.5,0); //0,0.5,0			//0,1,0

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
	perspectiveLoc = gl.getUniformLocation(program, 'perspective')

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

function render() {
	// this is render loop

	// clear the display with the background color
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//theta[yAxis] += 2;
	
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