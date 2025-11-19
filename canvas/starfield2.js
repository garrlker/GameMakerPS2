import canvasRenderer from "./index.js";
var canvas = canvasRenderer.createCanvas(640, 448);
var c = canvas.getContext("2d");

var numStars = 100;
var radius = 1;
var focalLength = canvas.width;

var centerX, centerY;

var stars = [], star;
var i;

initializeStars();

function executeFrame(){
  moveStars();
  Screen.clear();
  drawStars();
  Screen.flip();
}

function initializeStars(){
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  stars.length = 0;
  for(i = 0; i < numStars; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width
    };
    stars.push(star);
  }
}

function moveStars(){
  for(i = 0; i < numStars; i++){
    star = stars[i];
    star.z--;
    
    if(star.z <= 0){
      star.z = canvas.width;
    }
  }
}

const white = Color.new(255, 255, 255, 255);
function drawStars(){
  var pixelX, pixelY, pixelRadius;
    
  c.fillStyle = "black";
  c.fillRect(0,0, canvas.width, canvas.height);
  c.fillStyle = "white";
  for(i = 0; i < numStars; i++){
    star = stars[i];
    
    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = radius * (focalLength / star.z);
    
    // c.beginPath();
    // c.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
    // c.fill();

    Draw.circle(pixelX, pixelY, pixelRadius, white, true);
  }
}

// Draw the first frame to start animation
os.setInterval(executeFrame, 0);