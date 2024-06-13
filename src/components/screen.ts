import {
  drawBackground,
  drawOpeningBackground,
  drawClosingBackground,
} from "../utils/BackgroundImage.ts";

const canvasWidth = 360;
const canvasHeight = 540;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export function drawGameOver(score:number) {
  let highscore = localStorage.getItem("doodle_score");
  let ishighscore = false;
  highscore = highscore ? parseInt(highscore) : 0;
  if (score > highscore) {
    localStorage.setItem("doodle_score", score.toString());
    ishighscore = true;
    highscore = score;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawClosingBackground();

  ctx.fillStyle = "red";
  ctx.font = "48px sans-serif";
  ctx.fillText("Game Over", canvasWidth / 2 - 120, canvasHeight / 2);

  ctx.font = "24px sans-serif";
  ctx.fillStyle = "green";
  ctx.fillText(
    "Press Space to Restart",
    canvasWidth / 2 - 110,
    canvasHeight / 2 + 50
  );

  ctx.fillStyle = "gold";
  ctx.font = "32px sans-serif";
  ctx.fillText(
    "High Score: " + highscore,
    canvasWidth / 2 - 100,
    canvasHeight / 2 - 100
  );

  if (ishighscore) {
    console.log("got high score");
    ctx.fillStyle = "red";
    ctx.fillText(
      "New High Score!",
      canvasWidth / 2 - 100,
      canvasHeight / 2 - 50
    );
  }
}

export function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawOpeningBackground();

  ctx.fillStyle = "red";
  ctx.font = "48px 'Comic Neue', sans-serif";
  ctx.fillText("doodle jump", canvasWidth / 2 - 120, 100);

  ctx.fillStyle = "black";
  ctx.font = "36px 'Comic Neue', sans-serif";
  ctx.fillText("play", canvasWidth / 2 - 30, 250);
  ctx.fillStyle = "green";
  ctx.font = "36px 'Comic Neue', sans-serif";
  ctx.fillText("press Enter to start", canvasWidth / 2 - 140, 350);

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.roundRect(canvasWidth / 2 - 60, 210, 120, 50, 10);
  ctx.stroke();
}
