import { Platform } from "./platform";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export class Center {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Platform {
  constructor(position, width, height, ctx, src: string) {
    this.position = position;
    this.width = width;
    this.height = height;

    this.ctx = ctx;
    this.image = new Image();
    this.image.src = src;
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

  move() {
    this.position.x += 1;
  }

  update(canvasHeight) {
    if (this.position.y > canvasHeight) {
      this.position.x = Math.floor((Math.random() * canvas.width * 3) / 4);
      this.position.y = -this.height;
    }
  }
}
