import canvasRenderer from "./index.js";
const font = new Font("default");
// get dimensions of window and resize the canvas to fit
var width = 640,
    height = 448,
    canvas = canvasRenderer.createCanvas(width, height),
    mousex = width/2, mousey = height/2;
canvas.width = width;
canvas.height = height;

// get 2d graphics context and set global alpha
var G=canvas.getContext("2d");
G.globalAlpha=0.25;
G.immediate = true; // Enabled immediate drawing for performance

// setup aliases
var Rnd = Math.random,
    Sin = Math.sin,
    Floor = Math.floor;

// constants and storage for objects that represent star positions
var warpZ = 12,
    units = 500,
    stars = [],
    cycle = 0,
    Z = 0.025 + (1/25 * 2);

// function to reset a star object
function resetstar(a)
{
   a.x = (Rnd() * width - (width * 0.5)) * warpZ;
   a.y = (Rnd() * height - (height * 0.5)) * warpZ;
   a.z = warpZ;
   a.px = 0;
   a.py = 0;
}

// initial star setup
for (var i=0, n; i<units; i++)
{
   n = {};
   resetstar(n);
   stars.push(n);
}

Screen.setFrameCounter(true);
Screen.setVSync(false);
// star rendering anim function

G.strokeStyle = "#FFF";
var rf = function()
{
  Screen.clear();
    
  // mouse position to head towards
  var cx = (mousex - width / 2) + (width / 2),
      cy = (mousey - height / 2) + (height / 2);
  
  // update all stars
  var sat = Floor(Z * 500);       // Z range 0.01 -> 0.5
  if (sat > 100) sat = 100;

  // G.beginPath(); // Not needed in immediate mode

  for (var i=0; i<units; i++)
  {
    var n = stars[i],            // the star
        xx = n.x / n.z,          // star position
        yy = n.y / n.z,
        e = (1.0 / n.z + 1) * 2;   // size i.e. z
    
    if (n.px !== 0)
    {
        // hsl colour from a sine wave
        // G.strokeStyle = "hsl(" + ((cycle * i) % 360) + "," + sat + "%,80%)";
        // G.strokeStyle = `hsl(${(cycle * i) % 360}, ${sat}%, 80%)`;
        // G.strokeStyle = hsl2rgb((cycle * i) % 360, sat, 0.8);
        // G.strokeStyle = "#fff";
        // G.lineWidth = e;
        G.moveTo(xx + cx, yy + cy);
        G.lineTo(n.px + cx, n.py + cy);
        // Draw.line(xx + cx, yy + cy, n.px + cx, n.py + cy, white, true);
    }
    
    // update star position values with new settings
    n.px = xx;
    n.py = yy;
    n.z -= Z;
    
    // reset when star is out of the view field
    if (n.z < Z || n.px > width || n.py > height)
    {
        // reset star
        resetstar(n);
    }
  }
  G.stroke();

  
  // colour cycle sinewave rotation
  cycle += 0.01;
  font.print(10, 10, Screen.getFPS(360) + " FPS");
  Screen.flip();
};
console.log("Starting starfield");
os.setInterval(() => {
  rf()
}, 0);
