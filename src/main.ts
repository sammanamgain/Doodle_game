import { Enemy } from "./class/Enemy";
// import statements

import "./style.css";
import { Platform, Center } from "./class/platform";
import { Player } from "./class/Player";
import { randomNumber } from "./utils/utils";
import { detectCollision } from "./utils/colliiondetection";
import { BrokenTiles } from "./class/Brokentiles";

let starttime = new Date();
import { Enemy } from "./class/Enemy";
import {
  drawBackground,
  drawOpeningBackground,
  drawClosingBackground,
} from "./utils/BackgroundImage";
import { drawStartScreen, drawGameOver } from "./components/screen";

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

  let platforms: Platform[] = [];

  function drawPlatforms() {
    platforms = [];
    for (let i = 0; i < 6; i++) {
      let randomX = Math.floor(Math.random() * (canvasWidth - platformWidth));
      let randomY = canvasHeight - 75 * i - 150;

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

  // code to generate broken tiles
  let Brokenplatforms = [];

  function drawBrokenPlatforms() {
    Brokenplatforms = [];
    for (let i = 0; i < 2; i++) {
      let randomX = Math.floor(Math.random() * (canvasWidth - platformWidth));
      let randomY = canvasHeight - 200 * i - 280;

      if (i > 0) {
        let minY = Brokenplatforms[i - 1].position.y - 100;
        randomY = Math.max(randomY, minY);
      }

      let platform = new BrokenTiles(
        new Center(randomX, randomY),
        platformWidth,
        platformHeight,
        ctx,
        "./platform-broken.png"
      );
      Brokenplatforms.push(platform);
    }
  }

  // drawBrokenPlatforms();

  // to generate platform at the top of screen when player moves up
  function newPlatform() {
    let randomX = Math.floor(Math.random() * (canvasWidth - platformWidth));
    let highestPlatform = Math.min(...platforms.map((p) => p.position.y));
    // to ensure new platform generatese at at elast 50 distance from nearest platform
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
  let enemy: Enemy;

  // to reset score ,state
  function resetGame() {
    starttime = Date.now();
    gameover = false;
    score = 0;
    doodle.reset(new Center(canvasWidth / 2 - 23, (canvasHeight * 7) / 8 - 46));
    drawPlatforms();
    // draw the base platform so player can stand there
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
    enemy = new Enemy(new Center(100, 100), 100, 100, "./virus.png", ctx);
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

  function update() {
    let endtime = Date.now();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    if (gameState === "start") {
      drawStartScreen();
    } else if (gameState === "playing") {
      if (gameover) {
        drawGameOver(score);
      } else {
        doodle.update();

        if (detectCollision(doodle, enemy)) {
          console.log("game over");
          gameover = true;
        }
        if (endtime - starttime > 5000) {
          enemy.update();

          enemy.draw();
          if (enemy.position.y > canvasWidth) {
            enemy.position.y -= 2 * canvasHeight;
          }
        }

        // to fly platform atfer player moves in upper half screen
        if (doodle.vy < 0 && doodle.position.y < canvasHeight / 2) {
          let platformSpeed = -doodle.vy;
          platforms.forEach((p) => {
            p.position.y += platformSpeed;
          });
          Brokenplatforms.forEach((p) => {
            p.position.y += platformSpeed;
          });
          doodle.position.y += platformSpeed;
        }

        for (let i = platforms.length - 1; i >= 0; i--) {
          let platform = platforms[i];
          platform.draw();

          // detecting is not sufficient , need to check if vertical velocity is greater or not, if it is falling , only we will bounce character
          if (detectCollision(platform, doodle) && doodle.vy >= 0) {
            let audio = new Audio("./pop-94319.mp3");
            audio
              .play()
              .catch((error) => console.log("Error playing audio:", error));
            doodle.jump();
          }

          // remove platform after they go beyone the canvas

          if (platform.position.y > canvasHeight) {
            platforms.splice(i, 1);
            newPlatform();
            score++;
          }
        }

        // for (let i = Brokenplatforms.length - 1; i >= 0; i--) {
        //   let broken = Brokenplatforms[i];
        //   if (detectCollision(broken, doodle)) {
        //     console.log("collision with broken platform");
        //     let tiles = ["./broken.1.png", "./broken2.png"];
        //     let i = 0;
        //     function animate() {
        //       broken.img.src = tiles[i];
        //       broken.vy = 5; // Set the vertical velocity of the broken tile
        //       i = (i + 1) % tiles.length; // Cycle through the tiles array
        //       broken.position.y += broken.vy; // Update the position of the broken tile
        //       doodle.vy = 5; // Set the vertical velocity of the player
        //       doodle.update(); // Update the player's position
        //       broken.draw();
        //       if (broken.position.y > canvasHeight) {
        //         // If the broken tile goes off the canvas, remove it from the array
        //         Brokenplatforms.splice(i, 1);
        //         clearInterval(animationInterval); // Stop the animation
        //       }
        //     }
        //     setTimeout(() => {
        //       animate();
        //     }, 1000);

        //     doodle.vy = 5;

        //     doodle.update();

        //     console.log(doodle.vy);
        //   }
        //   broken.update(canvasHeight);
        //   broken.draw();
        // }

        doodle.draw();
        if (doodle.vy < 0 && doodle.position.y < canvasHeight / 2) {
          let platformSpeed = -doodle.vy;
          Brokenplatforms.forEach((platform) => {
            platform.position.y += platformSpeed;
          });
          doodle.position.y += platformSpeed;
        }

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
