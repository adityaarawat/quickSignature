const colorPick = document.querySelector("#colorPicker");
const background = document.querySelector("#bkgrnd");
const fontSize = document.querySelector("#fnt");
const canvas = document.querySelector("#canvasID");
const clearButton = document.querySelector(".b1");
const saveDownload = document.querySelector(".b2");
const retrieve = document.querySelector(".b3");
let isDrawing = false;
const ctx = canvas.getContext("2d");
colorPick.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});
canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
background.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 2, 800, 500);
});
fontSize.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveDownload.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});
retrieve.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
