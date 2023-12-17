import Canvas from "./Canvas.js";
import Player from "./Player.js";
import Projectile from "./Projectile.js";

interface IArme {
  setCadence(arg0: number): unknown;
  nom: string;
  degats: number;
  type: string;
  portee: number;
  cadence: number;
  player: Player;

  tirer(ctx: Canvas, angle: number): void;
  getCadence(): number;
}

export default IArme;
