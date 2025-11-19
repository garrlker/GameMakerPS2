import canvasRenderer from "./index.js";

var canvas = canvasRenderer.createCanvas(640, 448);
canvas.backColor = "#abcdefff";

var ctx = canvas.getContext("2d");

var radius = 250;
os.setInterval(() => {
  ctx.beginPath();
  ctx.fillStyle = "#ffffffff";
  ctx.moveTo(100 + radius, 250 + radius);
  ctx.arc(100 + radius, 250 + radius, radius, 0, Math.PI * 2, true); // last argument should have no effect
  ctx.closePath();
  // ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#000000ff";
  ctx.moveTo(400 + radius, 250 + radius);
  ctx.arc(400 + radius, 250 + radius, radius, 0, Math.PI * 2, false); // last argument should have no effect
  ctx.closePath();
  // ctx.fill();
  ctx.stroke();
}, 0);