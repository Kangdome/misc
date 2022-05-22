//console.log('consolelog');
// ♪♫ In the cubicles representing for my Java homies ♪♫ ☺ < https://youtu.be/b-Cr0EWwaTk> ☻
// //
// //*****************************************************************INITIAL FORMATTING AND CANVAS SETUP*************************
let canvas = document.querySelector('canvas'); // look for HTML element canvas.
//
// // set the size of the canvas.
// canvas.width = 800;
// canvas.height = 600;

let c = canvas.getContext('2d');
// context 2d. efficiency.
canvas.width=800,canvas.height=600;

let ballRad = 10, x = canvas.width /2, y = canvas.height -30, // Pycham suggets let > var.
    dx = (Math.random()-.5) * 8, dy = (Math.random()-.5) *8, paddleH = 10, paddleW = 100, paddleX = (canvas.width - paddleW) /2,
    rightKey = false, leftKey = false, aKey = false, dKey = false, brickRows = 5, brickCols = 7,
    brickW = 75, brickH = 25, brickPadding = 30, brickPaddingTop = 30,
    brickPaddingLeft =45;
// ball radius, x , y, dx- ramdom starting direction, dy- starting dy direction (can sometimes rarely cause insta loss),
// paddle height, paddle width, paddle x, rightkey, leftkey, brick rows, brick columns, brick width, brick height,
// brick padding, brick padding top, padding left

let bricks = []; //brick array. https://youtu.be/bIS8twlzuMw?t=25
                 // ♪♫ Just hita lick fo fiddy mo bricks ♪♫

for (d = 0; d < brickCols; d++){ //push bricks columns, rows, and padding
    for (r = 0; r < brickRows; r++){
        bricks.push({
            x : (d * (brickW + brickPadding))+brickPaddingLeft,
            y : (r * (brickH + brickPadding))+ brickPaddingTop,
            status : 1
        });
    }
}

function drawBall() { // draw and color the ball  https://youtu.be/_W-fIn2QZgg?t=17
    c.beginPath();
    c.arc(x, y, ballRad, 0, Math.PI *2);
    c.fillStyle ="orange";
    c.fill();
    c.closePath();
}

function drawPaddle() { // draw and color the paddle
    c.beginPath();
    c.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
    c.fillStyle = "green";
    c.fill();
    c.closePath();

}
function brickColor() { //color the brick based on parameters. My rainbow is elusive but I can make the bricks change based on where the ball it and cause seizures.
    if (x < 500){
        return "blue";
    }
    else return "red";



}

function drawBricks() { // draw and color the bricks
    bricks.forEach(function (brick) {
       if (!brick.status) return;

        c.beginPath();
        c.rect(brick.x, brick.y, brickW,brickH, c.fillStyle=brickColor());
       // c.fillStyle=brickColor();
        c.fill();
        c.closePath();


        }); //console.log(bricks);
}
function collisionDetection() { //detect collisions.
    bricks.forEach(function (bump) {
        if (!bump.status) return;

        let inBrickCol = x > bump.x && x < bump.x + brickW,
            inBrickRow = y > bump.y && y < bump.y + brickH;

        if (inBrickCol && inBrickRow){
            dy = -dy;
            bump.status = 0;
        }
    });
}

function animate() { //constant animate function.
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    drawBricks();
    drawPaddle();
    drawBall();
    collisionDetection();

    if (sideWall())// everything the ball can hit and how to react when it does so.
        dx = -dx;

    if (topWall() || hitPaddle())
        dy = -dy;
    if (gameEnd()) // reloads when game over . Played with never ending error msg but pref'd a reset. Win time entirly has to do with initial rand dx,dy to determine number of hits to victory.
       document.location.reload();
    var RIGHT_ARROW = 39, LEFT_ARROW = 37;


    function hitPaddle() {
        return hitBottom() && ballAbovePaddle();// check to see if the ball is hitting the paddle or lose condition.
    }

    function ballAbovePaddle() {
        return x > paddleX && x < paddleX + paddleW;
    }

    function hitBottom() {
        return y + dy > canvas.height - ballRad;
    }
    function gameEnd() {
        return hitBottom() && !ballAbovePaddle();
    }
    function sideWall() {
        return x + dx > canvas.width - ballRad || x + dx < ballRad;
    }
    function topWall() {
        return y + dy < ballRad;
    }
    function rPressed(e) {
        return e.keyCode === RIGHT_ARROW; // === > == // getting keys controls for paddle.

    }
    function lPressed(e) {
        return e.keyCode === LEFT_ARROW; // left arrow


    }function aPressed(e) {
        return e.keyCode === 65; // A


    }
    function kDown(e) {
        rightKey = rPressed(e);
        leftKey  = lPressed(e);
    }

    function kUp(e) {
        rightKey = rPressed(e) ? false : rightKey;
        leftKey = lPressed(e) ? false : leftKey;
    }

    document.addEventListener("keyup", kUp, false);
    document.addEventListener("keydown", kDown, false);


    let maxX = canvas.width - paddleW, minX = 0, paddleDelta = rightKey ? 7 : leftKey ? -7 :0; // keep paddle within the game

    paddleX = paddleX + paddleDelta;
    paddleX = Math.min(paddleX, maxX);
    paddleX = Math.max(paddleX, minX);

    x += dx;
    y += dy;
}

setInterval(animate, 10); // animate and set speed.



// // *************************************************************** PLAYING WITH SQUARES/SLOW WAY  ***************************************
// // Refrence Ep 1. in CC.
//
//
// // c.fillStyle = "red"; // can = any css color.
// // c.fillRect(100, 100, 100, 100); // make rectangle (x, y, width, height).
// // c.fillStyle = "orange";
// // c.fillRect(220, 225, 100, 100);
// // c.fillStyle = "yellow";
// // c.fillRect(350, 100, 100, 100);
// // c.fillStyle = "green";
// // c.fillRect(100, 400, 100, 100);
//
// //***************************************************************** MAKING LINES  *******************************************************
// // Refrence Ep 2. in CC.
//
// // c.beginPath(); // indicator saying we want to stat a bath and do NOT connect to any preceding paths.
// // c.moveTo(50, 300); //start point (x, y)
// // c.lineTo(300, 100) // End point (x, y)
// // c.lineTo(400, 300);
// // c.strokeStyle = "blue"; // can = any css color. hex/rgba etc.
// // c.stroke(); // needed method to illustrate the line
//
// //**************************************************************** MAKING CIRCLES /ARC'S    *****************************************************
// // REF Ep. 2. in CC.
//
// // c.beginPath();
// // c.arc(100, 300, 30, 0, Math.PI *2, false); // (x: Int, y: Int, r: Int, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool) **NOTE ANGLE IN RADIAN!!**
// // c.strokeStyle = "purple";
// // c.stroke();
//
//
// //*************************************************************** CREATING MANY ITEMS AT ONCE **************************************************
// //Ref Ep. 2 in CC.
//
//
//
// // for (var i = 0; i < 10; i++){
// //
// //     var x = Math.random() * canvas.width;  // Set incrementing X values. **** THESE MAY BE NICE FOR MAKING PREDEFINED BRICK LOCATION?
// //     var y = Math.random() * canvas.height; // Set incrementing Y values.
// //
// //     c.beginPath();
// //     c.arc(x, y, 30, 0, Math.PI *2, false);
// //     c.strokeStyle = "purple";
// //     c.stroke();
// // }
//
// // ************************************************************** ANIMATING MY BALLS *******************************************************
// //Ref Ep. 3 in CC.
//
// // var x = Math.random() * innerWidth; // start location on X axis
// // var dx = (Math.random() -0.5) * 8 ; // initial "speed" in pixels on X axis
// // var y = Math.random() * innerHeight; // Start location on Y axis
// // var dy = (Math.random() -.05) * 8; // initial "speed" in pixels on Y axis.
// // var radius = 30;
// //
// //
// //
// //
// // function animate() {     // function that servers to animate. Basically creating a loop until I tell it to stop.
// //     requestAnimationFrame(animate); //request animation frame
// //
// //     c.clearRect(0,0, innerWidth, innerHeight); // Clears the canvas (x, y, width, height)
// //     c.beginPath();
// //     c.arc(x, y, radius, 0, Math.PI *2, false);
// //     c.strokeStyle = "purple";
// //     c.stroke();
// //
// //     if (x + radius> canvas.width || x-radius < 0) { // KEEPS ball bouncing within the canvas on X axis.
// //         dx = -dx; // if you get a wall go the opposite direction.
// //     }
// //
// //     x += dx;
// //     y += dy;
// //
// //     if (y + radius > canvas.height || y - radius < 0){ // KEEPS ball bouncing within the canvas on Y axis.
// //         dy = -dy; // if you get to a wall go the opposite direction.
// //     }
// //
// // }
// //
// // animate(); // calls animate.
//
// //******************************************************************************** GENERATING OBJECTS EFFICENTLY***************************
// //REF EP 3 IN CC 15:00
// //*****************************************************************************************************************************************
//
//
// function Circle(x, y, dx, dy, radius ){
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//
//     this.draw = function () {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
//         c.strokeStyle = "purple";
//         c.stroke();
//     }
//     this.update = function () {
//
//         this.x += this.dx;
//         this.y += this.dy;
//         this.draw();
//
//         if (this.x + this.radius> canvas.width || this.x-this.radius < 0) { // KEEPS ball bouncing within the canvas on X axis.
//             this.dx = -this.dx; // if you get a wall go the opposite direction.
//         }
//
//
//
//         if (this.y + this.radius > canvas.height || this.y - this.radius < 0){ // KEEPS ball bouncing within the canvas on Y axis.
//             this.dy = -this.dy; // if you get to a wall go the opposite direction.
//         }
//
//     }
// }
//
//
//
//
// var circleArray = [];
//
// for(var i = 0; i < 2; i++){
//     var radius = 30;
//     var x = Math.random() * (innerWidth - radius * 2) + radius; // start location on X axis - radius * 2 + radius bit ensures it doesn't get caught in corners. Irrelevnt I think to project but important skill.
//     var dx = (Math.random() -0.5) * 8 ; // initial "speed" in pixels on X axis
//     var y = Math.random() * (innerHeight - radius *2) + radius; // Start location on Y axis
//     var dy = (Math.random() -.05) * 8; // initial "speed" in pixels on Y axis.
//
//     circleArray.push(new Circle(x, y, dx, dy, radius));
//
// }
// console.log(circleArray);
//
// //var circle = new Circle(200,200, 8, 8, 30);
//
// function animate() {     // function that servers to animate. Basically creating a loop until I tell it to stop.
//     requestAnimationFrame(animate); //request animation frame
//
//     c.clearRect(0,0, innerWidth, innerHeight); // Clears the canvas (x, y, width, height)
//
//     for (var i = 0; i < circleArray.length; i++){
//         circleArray[i].update();
//     }
//
//     circle.update();
// }
// animate(); // calls animate.
//
//
// // **************************************************************************************** Bricks!  **********************************
//
// //
// // var bx = 0;// initial x coord
// // var dbx = 80; // spacing
// // var by = 0; // initial y coord
// // var dby = 50; // spacing
// // var bw = 75; // brick width
// // var bh = 25; //brick height
// //
// // function bricks() {
// //     requestAnimationFrame(bricks);
// //
// //
// //     for (i = 0; i < 10; i++) {
// //         c.fillRect(bx, by, bw, bh);
// //         bx += dbx;
// //         by + y = dbx;
// //     }
// // }
// // bricks();
//
//
//
//
// //
// // function bricks();{
// //     c.beginPath();
// //     c.fillRect(bx, by, bw, bh); // (brick x axis, brick y axis, brick width, brick height.
// //     c.stroke();
// //
// //
// // }
// // bricks();
//
// //******************************************************************************************* PADDEL! *****************************************
//
// //
// // var pHeight = 10; //paddle height.
// // var pWidth = 75; // paddle width.
// // var paddleX = (canvas.width-pWidth)/2;
// //
// //
// // function drawPaddle() {
// //     c.beginPath();
// //     c.rect(paddleX, canvas.height - pHeight, pWidth, pHeight);
// //     c.fillStyle = "#0095DD";
// //     c.fill();
// //     c.closePath();
// //
// //     if(rightPressed) {
// //         paddleX += 7;
// //     }
// //     else if(leftPressed) {
// //         paddleX -= 7;
// //     }
// //
// //     if(rightPressed && paddleX < canvas.width-paddleWidth) {
// //         paddleX += 7;
// //     }
// //     else if(leftPressed && paddleX > 0) {
// //         paddleX -= 7;
// //     }
// //
// // }
// //
// //




