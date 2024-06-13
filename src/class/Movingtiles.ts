import { Platform } from "./platform";


export class MovingTiles extends Platform {
  constructor(
    position: Center,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    src: string,
    vx: number
  ) {
    super(position, width, height, ctx, src);
    this.vx = 1;
  }

  move() {
    this.position.x += this.vx;

    if (this.position.x > canvas.width) {
      this.position.x = 0 - this.width; 
    } else if (this.position.x + this.width < 0) {
      this.position.x = canvas.width; 
    }
  }

  update(canvasHeight: number) {

    this.move();


    super.update(canvasHeight);
  }
}
