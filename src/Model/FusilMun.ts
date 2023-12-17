import Projectile from "./Projectile.js";
import Fusil from "./Fusil.js";
import Canvas from "./Canvas.js";
import Player from "./Player.js";
import Asteroid from "./Asteroide.js";

class FusilMun extends Projectile {
  private _arme: Fusil;
  private posX: number;
  private posY: number;
  private _player: Player;
  private _size: number;

  constructor(
    pvParam: number,
    pvMax: number,
    damageParam: number,
    speedParam: number,
    arme: Fusil,
    player: Player,
    size: number
  ) {
    super(pvParam, pvMax, damageParam, speedParam);
    this._arme = arme;
    this._player = player;
    this.posX = player.posX; // Position initiale du projectile
    this.posY = player.posY;
    this._size = size;
  }

  setSize(size: number): void {
    this._size = size;
  }
  setDamage(damage: number): void {
    this._damage = damage;
  }

  getSize(): number {
    return this._size;
  }

  getDamage(): number {
    return this._damage;
  }

  public getPv(): number {
    return this._pv;
  }

  public setPv(pv: number): void {
    this._pv = pv;
  }

  public getPvMax(): number {
    return this._pvMax;
  }

  public setPvMax(pvMax: number): void {
    this._pvMax = pvMax;
  }

  public setDirectionX(angle: number): void {
    this._directionX = this.calculerDirectionX(angle);
  }

  public setDirectionY(angle: number): void {
    this._directionY = this.calculerDirectionY(angle);
  }

  public getDirectionX(): number {
    return this._directionX;
  }

  public getDirectionY(): number {
    return this._directionY;
  }

  private calculerDirectionX(angle: number): number {
    return Math.sin(angle);
  }

  private calculerDirectionY(angle: number): number {
    return Math.sin(angle);
  }

  public getState(): IState {
    return this._state;
  }

  public setState(state: IState): void {
    this._state = state;
  }

  public getSpeed(): number {
    return this._speed;
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public setDirection(angle: number): void {
    this._directionX = Math.cos(angle);
    this._directionY = Math.sin(angle);
  }

  public setPosX(posX: number): void {
    this.posX = posX;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public move(): void {
    this.posX += this._directionX * this._speed;
    this.posY += this._directionY * this._speed;
    // Ajouter éventuellement une logique pour gérer les limites du canvas ou les collisions
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    // Translate le contexte à la position du projectile
    ctx.translate(this.posX, this.posY);

    ctx.beginPath();

    // Dessine le projectile centré sur sa position actuelle
    ctx.arc(0, 0, this.getSize(), 0, Math.PI * 2, true); // Dessin du projectile à la position translatée
    ctx.fill();

    ctx.restore();
  }

  public static createFusilMun(
    player: Player,
    arme: Fusil,
    angle: number,
    speed: number,
    size: number
  ): FusilMun {
    let projectile = new FusilMun(1, 1, arme.degats, speed, arme, player, size);
    projectile.setDirectionX(angle);
    projectile.setDirectionY(angle);
    projectile.setPosX(player.posX);
    projectile.setPosY(player.posY);
    projectile.setDirection(angle);

    return projectile;
  }
}

export default FusilMun;
