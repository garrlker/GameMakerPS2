import canvasRenderer from "./index.js";

var canvas = canvasRenderer.createCanvas(640, 448);
canvas.backColor = "#00000000";

var ctx = canvas.getContext("2d");

// ctx.clearRect(30, 30, 20, 20);
console.log("Starting to render");

// var fb = canvas.getFramebuffer();

console.log("Done rendering");
// ctx.transform(1, 0.2, 0.8, 1, 0, 0);
ctx.fillStyle = "#fff";
// ctx.translate(320, 224)
os.setInterval(() => {
  Screen.clear();
  ctx.beginPath();
  ctx.moveTo(30, 90);
  ctx.lineTo(110, 20);
  ctx.lineTo(240, 130);
  ctx.lineTo(60, 130);
  ctx.lineTo(190, 20);
  ctx.lineTo(270, 90);
  ctx.closePath();
  
  // Fill path
  ctx.fillStyle = "green";
  ctx.fill();
  Screen.flip();
}, 0);

// var testpng = fs.createWriteStream("test.png");
// testpng.write(canvas.toPng({ "Software": "CanvasRenderer" }));
// testpng.close();



console.log("Everything executed and we didn't crash!")

