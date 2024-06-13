import { Center } from "./Platform";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

export class Enemy {
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

    ctx: CanvasRenderingContext2D
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.Rightimgsrc = Rightimgsrc;

    this.ctx = ctx;
    this.image = new Image();
    this.image.src = this.Rightimgsrc;
    this.vx = 0;
    this.vy = 0;
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

  update() {
    this.position.y += 0.5;
  }
}
