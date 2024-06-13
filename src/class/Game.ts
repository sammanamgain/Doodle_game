import { Player } from "./Player";
import { Platform, Center } from "./platform";
export class Game {
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx as CanvasRenderingContext2D;
    this.image = new Image();
    this.platforms = [];
  }
  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.width = this.width;
    this.ctx.height = this.height;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawplayer() {
    this.player = new Player(
      new Center(0, window.innerHeight - 200),
      100,
      100,
      "/doodler-right.png",
      this.ctx
    );
    this.player.draw();
  }

  drawPlatform() {
    let platform = new Platform(
      new Center(50, 50),
      50,
      50,
      this.ctx,
      "./android.png"
    );
    Platform.draw()
    
  }

  addbackgroundimage(src: string) {
    this.image.src = src;
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    };
  }
}
//360 540
