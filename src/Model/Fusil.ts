import Canvas from "./Canvas.js";
import FusilMun from "./FusilMun.js";
import IArme from "./IArme.js";
import Player from "./Player.js";

class Fusil implements IArme {
  nom: string;
  degats: number;
  type: string;
  portee: number;
  cadence: number;
  player: Player;
  private lastShotTime: number;

  constructor(
    nom: string,
    degats: number,
    type: string,
    portee: number,
    cadence: number,
    player: Player
  ) {
    this.nom = nom;
    this.degats = degats;
    this.type = type;
    this.portee = portee;
    this.cadence = cadence;
    this.player = player;
    this.lastShotTime = 0;
  }

  setCadence(cadence: number): void {
    this.cadence = cadence;
  }

  incrementCadence(increment: number): void {
    this.cadence += increment;
  }

  getCadence(): number {
    return this.cadence;
  }

  tirer(ctx: Canvas, angle: number): void {
    const now = Date.now();
    if (now - this.lastShotTime < 1000 / this.cadence) {
      return; // Respecte la cadence de tir
    }
    this.lastShotTime = now;

    let projectile = FusilMun.createFusilMun(this.player, this, angle, 10, 3);
    this.player.getMun().push(projectile);
    projectile.move();

    console.log(angle);
  }
}

export default Fusil;
