import { Center } from "./Platform";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

export class Player {
  position: Center;
  width: number;
  height: number;
  Rightimgsrc: string;
  leftimgsrc: string;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  vx: number;
  vy: number;
  gravity: number;
  jumpspeed: number;

  constructor(
    position: Center,
    width: number,
    height: number,
    Rightimgsrc: string,
    leftimgsrc: string,
    ctx: CanvasRenderingContext2D,
    gravity: number,
    jumpspeed: number
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.Rightimgsrc = Rightimgsrc;
    this.leftimgsrc = leftimgsrc;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = this.Rightimgsrc;
    this.vx = 0;
    this.vy = 0;
    this.gravity = gravity;
    this.jumpspeed = jumpspeed;
    this.addEvent();
  }

  update() {
    this.position.x += this.vx;
    this.vy += this.gravity;
    this.position.y += this.vy;

    // Wrap around horizontally
    if (this.position.x > canvas.width) {
      this.position.x = 0;
    } else if (this.position.x + this.width < 0) {
      this.position.x = canvas.width - 10;
    }
    if (this.vy > 15) {
      this.vy = 15;
    }
  }

  addEvent() {
    document.addEventListener("keydown", (e) => {
      if (e.code == "ArrowRight" || e.key == "d") {
        this.moveX(4, this.Rightimgsrc);
      } else if (e.code == "ArrowLeft" || e.key == "a") {
        this.moveX(-4, this.leftimgsrc);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.code == "ArrowRight" ||
        e.code == "ArrowLeft" ||
        e.key == "d" ||
        e.key == "a"
      ) {
        this.vx = 0;
      }
    });
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  reset(position: Center) {
    this.position = position;
    this.vx = 0;
    this.vy = 0;
    this.image.src = this.Rightimgsrc;
  }

  moveX(vx: number, img: string) {
    this.vx = vx;
    this.image.src = img;
  }

  jump() {
    this.vy = this.jumpspeed;
  }
}
