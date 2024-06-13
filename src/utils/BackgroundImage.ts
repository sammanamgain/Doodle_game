const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let background_image = new Image();
background_image.src = "./doodlejumpbg.png";
let opening_background_image = new Image();
opening_background_image.src = "./atlas3.webp";
export function drawBackground() {
  ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
}
export function drawOpeningBackground() {
  ctx.drawImage(
    opening_background_image,
    641,
    240,
    640,
    960,
    0,
    0,
    640,
    1024
  );
}
export function drawClosingBackground() {
  ctx.drawImage(
    opening_background_image,
    641,
    190,
    640,
    960,
    0,
    0,
    640,
    1024
  );
}
