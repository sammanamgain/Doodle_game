import "./style.css";
import { Platform, Center } from "./class/platform";
import { Player } from "./class/Player";
import { randomNumber } from "./utils/utils";
import { detectCollision } from "./utils/colliiondetection";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const canvasWidth = 360;
  const canvasHeight = 540;
  const platformHeight = 18;
  const platformWidth = 60;
  let gameover = false;
  let score = 0;
  const jumpspeed = -12;
  const gravity = 0.4;
  let gameState = "start";

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let background_image = new Image();
  background_image.src = "./doodlejumpbg.png";
  function drawBackground() {
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
  }
  function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

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

  function drawGameOver() {
    let highscore = localStorage.getItem("doodle_score");
    let ishighscore = false;
    highscore = highscore ? parseInt(highscore) : 0;
    if (score > highscore) {
      localStorage.setItem("doodle_score", score.toString());
      ishighscore = true;
      highscore = score;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    ctx.fillStyle = "red";
    ctx.font = "48px sans-serif";
    ctx.fillText("Game Over", canvasWidth / 2 - 120, canvasHeight / 2);

    ctx.font = "24px sans-serif";
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

  let platforms: Platform[] = [];

  function drawPlatforms() {
    platforms = [];
    for (let i = 0; i < 6; i++) {
      let randomX = Math.floor(Math.random() * (canvasWidth - platformWidth));
      let randomY = canvasHeight - 75 * i - 150;

      if (i > 0) {
        let minY = platforms[i - 1].position.y - 100;
        randomY = Math.max(randomY, minY);
      }

      let platform = new Platform(
        new Center(randomX, randomY),
        platformWidth,
        platformHeight,
        ctx,
        "./platform.png"
      );
      platforms.push(platform);
    }
  }

  function newPlatform() {
    let randomX = Math.floor(Math.random() * (canvasWidth - platformWidth));
    let highestPlatform = Math.min(...platforms.map((p) => p.position.y));
    let newY = highestPlatform - Math.random() * 50 - 50;

    let platform = new Platform(
      new Center(randomX, newY),
      platformWidth,
      platformHeight,
      ctx,
      "./platform.png"
    );
    platforms.push(platform);
  }

  function resetGame() {
    gameover = false;
    score = 0;
    doodle.reset(new Center(canvasWidth / 2 - 23, (canvasHeight * 7) / 8 - 46));
    drawPlatforms();
    platforms.push(
      new Platform(
        new Center(canvasWidth / 2 - platformWidth / 2, canvasHeight - 50),
        platformWidth,
        platformHeight,
        ctx,
        "./platform.png"
      )
    );
    gameState = "playing";
  }

  let doodle = new Player(
    new Center(canvasWidth / 2 - 23, (canvasHeight * 7) / 8 - 46),
    46,
    46,
    "./doodler-right.png",
    "./doodler-left.png",
    ctx,
    gravity,
    jumpspeed
  );

  drawPlatforms();
  platforms.push(
    new Platform(
      new Center(canvasWidth / 2 - platformWidth / 2, canvasHeight - 50),
      platformWidth,
      platformHeight,
      ctx,
      "./platform.png"
    )
  );

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (gameState === "start") {
      drawStartScreen();
    } else if (gameState === "playing") {
      if (gameover) {
        drawGameOver();
      } else {
        doodle.update();

        if (doodle.vy < 0 && doodle.position.y < canvasHeight / 2) {
          let platformSpeed = -doodle.vy;
          platforms.forEach((p) => {
            p.position.y += platformSpeed;
          });
          doodle.position.y += platformSpeed;
        }

        for (let i = platforms.length - 1; i >= 0; i--) {
          let p = platforms[i];
          p.draw();

          if (detectCollision(p, doodle) && doodle.vy >= 0) {
            doodle.jump();
          }

          if (p.position.y > canvasHeight) {
            platforms.splice(i, 1);
            newPlatform();
            score++;
          }
        }

        doodle.draw();

        if (doodle.position.y > canvasHeight) {
          gameover = true;
        }
      }

      ctx.fillStyle = "blue";
      ctx.font = "16px sans-serif";
      ctx.fillText(`Score: ${score}`, 5, 20);
    }

    requestAnimationFrame(update);
  }
  update();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && gameState === "start") {
      resetGame();
    } else if (e.key === " " && gameState === "playing" && gameover) {
      resetGame();
    }
  });
};
