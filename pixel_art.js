////////////////Apple Pixel Art////////////////
var multiplier = scale / 10.0;
function outline(x1, y1, ctx) {
	ctx.fillStyle = 'black';
	var outline = [[3, 5], [4, 5], [5, 5], [6, 5], [6, 4], [7, 3], 
			[8, 2], [9, 1], [10, 0], [11, 0], [12, 0], [13, 1],
			[14, 2], [14, 3], [13, 4], [12, 4], [11, 4], [10, 4],
			[9, 3], [8, 4], [8, 5], [9, 5], [10, 5], [11, 5],
			[12, 6], [13, 7], [14, 8], [14, 9], [14, 10], [14, 11],
			[14, 12], [14, 13], [14, 14], [13, 15], [12, 16], [11, 17],
			[10, 17], [9, 17], [8, 17], [7, 16], [6, 17], [5, 17],
			[4, 17], [3, 17], [2, 16], [1, 15], [0, 14], [0, 13],
			[0, 12], [0, 11], [0, 10], [0, 9], [0, 8], [1, 7],
			[2, 6]];
	fillPixels(outline, x1, y1, ctx);
}
function body(x1, y1, fill, ctx) {
	ctx.fillStyle = fill;
	ctx.fillRect(x1 + 2 * multiplier, y1 + 6 * multiplier, 
	11 * multiplier, 11 * multiplier);
	ctx.fillRect(x1 + multiplier, y1 + 8 * multiplier, multiplier, 7 * multiplier);
}
function leaf(x1, y1, ctx) {
	ctx.fillStyle = 'green';
	ctx.fillRect(x1 + 10 * multiplier, y1 + multiplier, 3 * multiplier, multiplier);
	ctx.fillRect(x1 + 9 * multiplier, y1 + 2 * multiplier, 5 * multiplier, multiplier);
	ctx.fillRect(x1 + 10 * multiplier, y1 + 3 * multiplier, 4 * multiplier, multiplier);
}
function shade(x1, y1, ctx) {
	ctx.fillStyle = 'brown';
	var brown = [[8, 3], [7, 4], [7, 5], [7, 6], [10, 6], [11, 6],
			[12, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12],
			[13, 13], [13, 14], [12, 15], [11, 16], [10, 16], [9, 16],
			[8, 16], [8, 15], [7, 15], [6, 16], [5, 16], [4, 16], 
			[3, 16]];
	fillPixels(brown, x1, y1, ctx);
}
function shine(x1, y1, ctx) {
	ctx.fillStyle = 'white';
	var white = [[5, 8], [4, 8], [4, 9], [3, 9], [3, 10], [3, 11]];
	fillPixels(white, x1, y1, ctx);
}
function draw_apple(x1, y1, fill, ctx) {
	x1 -= 5;
	y1 -= 10;
	body(x1, y1, fill, ctx);
	leaf(x1, y1, ctx);
	shade(x1, y1, ctx);
	shine(x1, y1, ctx);
	outline(x1, y1, ctx);
}
////////////////Snake Pixel Art////////////////
var radius = scale / 2;
var up = false, down = false, left = false, right = false;
function head(x, y) {
	ctx.beginPath();
	ctx.fillStyle = 'green';
	
	ctx.arc(x + radius, y + radius, Math.sqrt(2) * radius, radians(0), 
	radians(360), true)
	
	ctx.fill();
}

function eyes(x, y) {
	var a = x + radius / 4, b = x + 3 * radius / 2, 
	c = y + radius / 4, d = y + 3 * radius / 2;
	ctx.fillStyle = 'black';
	
	if (up || left) ctx.fillRect(a, c, radius / 3, radius / 3);
	else ctx.fillRect(b, d, radius / 3, radius / 3);
	if (left || down) ctx.fillRect(a, d, radius / 3, radius / 3);
	else ctx.fillRect(b, c, radius / 3, radius / 3);
}

function tail(x, y, tailDir) {
	ctx.beginPath();
	ctx.fillStyle = 'green';
	
	if (tailDir == 0) ctx.arc(x + radius, y + scale, radius, radians(180), 
	radians(0), true);
	else if (tailDir == 1)  ctx.arc(x + radius, y, radius, radians(0), 
	radians(180), true);
	else if (tailDir == 2)  ctx.arc(x + scale, y + radius, radius, 
	radians(90), radians(270), true);
	else ctx.arc(x, y + radius, radius, radians(270), radians(90), true);
	
	ctx.fill();
}

function draw_snake(x1, y1, x2, y2, headDir, tailDir) {
	up = (headDir == 0);
	down = (headDir == 1);
	left = (headDir == 2);
	right = (headDir == 3);
	
	head(x1, y1);
	eyes(x1, y1);
	ctx.fillStyle = 'green';
	tail(x2, y2, tailDir);
}
////////////////Score Board////////////////
function score_board(length) { 
	var score = document.getElementById('score');
	score.innerHTML = 'Score: ' + length;
}
////////////////Loss Screen////////////////
function lose() {
	window.location.href = './lose.html';
}
function loss_screen() {
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = 'red';
	ctx.font = '50px Arial';
	ctx.fillText('You Lose', 300, 325);
	
	button(ctx, 'black', 'white', 'Retry?');
	
	start(canvas);
}
function button(ctx, background, color, text) {
	ctx.fillStyle = color;
	ctx.fillRect(320, 400, 175, 50);
	
	ctx.fillStyle = background;
	ctx.fillRect(305, 385, 30, 30);
	ctx.fillRect(480, 435, 30, 30);
	ctx.fillRect(480, 385, 30, 30);
	ctx.fillRect(305, 435, 30, 30);
	
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(335, 415, 15, 0, radians(360), true);
	ctx.arc(480, 435, 15, 0, radians(360), true);
	ctx.arc(480, 415, 15, 0, radians(360), true);
	ctx.arc(335, 435, 15, 0, radians(360), true);
	ctx.fill();
	
	ctx.font = '40px Arial';
	ctx.fillStyle = background;
	ctx.fillText(text, 350, 435);
}
////////////////Start Screen////////////////
function start_screen() {
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = 'black';
	ctx.font = '50px Arial';
	ctx.fillText('Snake Game', 275, 325);
	
	button(ctx, 'powderblue', 'black', 'Start?');
	
	draw_pixel_snake(ctx, 275, 25, 10);
	draw_apple(100, 100, 'red', ctx);
	draw_apple(600, 100, 'yellow', ctx);
	start(canvas);
}
function start(canvas) {
	canvas.addEventListener('click', (e) => {
		const mousePos = {
			x: e.clientX - canvas.offsetLeft,
			y: e.clientY - canvas.offsetTop
		};
		if (mousePos.x > 320 && mousePos.x < 495 && mousePos.y > 400 
		&& mousePos.y < 450)
		window.location.href = './start.html';
	});
}
function draw_pixel_snake(ctx, x, y, size) {
	red_layer(ctx, x, y, size);
	green_layer(ctx, x, y, size);
	stomach_layer(ctx, x, y, size);
	outline_layer(ctx, x, y, size);
	eyes_layer(ctx, x, y, size);
}
function green_layer(ctx, x, y, size) {
	ctx.fillStyle = 'green';
	ctx.fillRect(x + 6 * size, y + 10 * size, 15 * size, 2 * size);
	ctx.fillRect(x + 18 * size, y + 2 * size, 3 * size, 9 * size);
	ctx.fillRect(x + 17 * size, y + size, size, size);
	ctx.fillRect(x + 17 * size, y + 9 * size, size, size);
	ctx.fillRect(x + 11 * size, y + 11 * size, 8 * size, 12 * size);
	ctx.fillRect(x + 19 * size, y + 12 * size, size, size);
	ctx.fillRect(x + 19 * size, y + 18 * size, 9 * size, 4 * size);
	ctx.fillRect(x + 19 * size, y + 16 * size, 4 * size, 2 * size);
	ctx.fillRect(x + 21 * size, y + 22 * size, 5 * size, 2 * size);
	ctx.fillRect(x + 11 * size, y + 23 * size, 6 * size, size);
}
function stomach_layer(ctx, x, y, size) {
	multiplier = size;
	ctx.fillStyle = 'yellow';
	ctx.fillRect(x + 12 * size, y + 15 * size, 2 * size, size);
	ctx.fillRect(x + 11 * size, y + 17 * size, 4 * size, size);
	ctx.fillRect(x + 11 * size, y + 19 * size, 3 * size, size);
	ctx.fillRect(x + 11 * size, y + 21 * size, 2 * size, size);
	var layer = [[21, 22], [22, 23]];
	fillPixelsContext(ctx, layer, x, y);
	
	ctx.fillStyle = '#95B90B';
	ctx.fillRect(x + 11 * size, y + 16 * size, 4 * size, size);
	ctx.fillRect(x + 11 * size, y + 18 * size, 3 * size, size);
	ctx.fillRect(x + 11 * size, y + 20 * size, 3 * size, size);
	ctx.fillRect(x + 11 * size, y + 22 * size, 3 * size, 2 * size);
	ctx.fillRect(x + 9 * size, y + 4 * size, 4 * size, 7 * size);
	ctx.fillRect(x + 11 * size, y + size, 3 * size, 3 * size);
	layer = [[14, 21], [15, 20], [14, 23]];
	fillPixelsContext(ctx, layer, x, y);
}
function red_layer(ctx, x, y, size) {
	ctx.fillStyle = 'red';
	ctx.fillRect(x + 2 * size, y + 19 * size, 2 * size, size);
	ctx.fillRect(x + 3 * size, y + 18 * size, 2 * size, size);
	ctx.fillRect(x + 0 * size, y + 17 * size, 6 * size, size);
	ctx.fillRect(x + 2 * size, y + 16 * size, 6 * size, size);
	ctx.fillRect(x + 4 * size, y + 15 * size, 5 * size, size);
	ctx.fillRect(x + 6 * size, y + 14 * size, 4 * size, size);
	ctx.fillRect(x + 7 * size, y + 13 * size, 4 * size, size);
}
function outline_layer(ctx, x, y, size) {
	ctx.fillStyle = 'black';
	multiplier = size;
	var outline = [[10,12], [9,12], [8,12], [7,12], [6,11], [5,10],
		[5,9], [5,8], [5,7], [5,6], [5,5], [5,4], 
		[6,3], [7,2], [8,1], [9,1], [10,0], [11,0], 
		[12,0], [13,0], [14,0], [15,0], [16,0], [17,0], 
		[18,1], [19,1], [20,2], [20,3], [20,4], [21,5], 
		[21,6], [21,7], [21,8], [21,9], [21,10], [20,11], 
		[20,12], [19,13], [18,14], [18,15], [18,16], [17,16], 
		[17,17], [17,18], [19,15], [20,15], [21,15], [22,16], 
		[23,17], [24,18], [24,19], [25,18], [26,18], [27,18], 
		[28,19], [28,20], [27,21], [26,22], [25,23], [24,23], 
		[23,24], [22,24], [21,24], [21,23], [20,22], [19,21], 
		[20,20], [18,22], [17,23], [16,24], [15,24], [14,24], 
		[13,24], [12,24], [11,23], [10,22], [10,21], [10,20], 
		[10,19], [10,18], [10,17], [10,16], [11,15], [11,14], 
		[12,14], [11,13], [11,12], [12,12], [13,12], [14,12], 
		[15,12], [16,12], [17,11]];
	fillPixelsContext(ctx, outline, x, y);
}
function eyes_layer(ctx, x, y, size) {
	ctx.fillStyle = 'black';
	multiplier = size;
	var right = [[6,9], [7,9], [8,9], [9,8], [8,7], [8,6],
		[8,5], [9,7], [9,6], [9,5], [9,4], [10,6], 
		[10,5], [10,4], [10,3], [11,2], [11,1]];
	var left = [[16,1], [17,2], [18,3], [18,4], [18,5], [18,6],
		[18,7], [17,8], [16,9], [15,10], [14,10], [13,10], 
		[12,9], [13,8], [14,7], [14,6], [14,5], [13,7],
		[13,6], [13,5], [12,8], [12,7], [12,6], [12,5],
		[12,4], [13,4], [13,3], [13,2], [14,1]];
	fillPixelsContext(ctx, right, x, y);
	fillPixelsContext(ctx, left, x, y);
}
////////////////Other Functions////////////////
//draw pixels from array of points
function fillPixels(layer, x1, y1, ctx) {
	for (i = 0; i < layer.length; i++) {
		var a = x1 + layer[i][0] * multiplier;
		var b = y1 + layer[i][1] * multiplier;
		ctx.fillRect(a, b, multiplier, multiplier);
	}
}
function fillPixelsContext(ctx, layer, x1, y1) {
	for (i = 0; i < layer.length; i++) {
		var a = x1 + layer[i][0] * multiplier;
		var b = y1 + layer[i][1] * multiplier;
		ctx.fillRect(a, b, multiplier, multiplier);
	}
}
//Takes Degrees and Returns Radians
function radians(deg) {
	return deg * Math.PI / 180;
}
