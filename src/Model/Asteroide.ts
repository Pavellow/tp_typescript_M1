import Canvas from "./Canvas.js";
import Entite from "./Entite.js";
import Player from "./Player.js";
import Projectile from "./Projectile.js";

class Asteroid extends Entite {
  private _damage!: number;
  private _speed!: number;
  private posX: number;
  private posY: number;
  private _directionX: number;
  private _directionY: number;
  private _size!: number;

  public constructor(
    pvParam: number,
    pvMax: number,
    damageParam: number,
    speedParam: number,
    posX: number,
    posY: number,
    dirX: number,
    dirY: number
  ) {
    super(pvParam, pvMax);
    this._damage = damageParam;
    this._speed = speedParam;
    this.posX = posX;
    this.posY = posY;
    this._directionX = dirX;
    this._directionY = dirY;
    this._size = this.genererandom(10, 80);
    console.log("Asteroid created");
  }

  private genererandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getSize() {
    return this._size;
  }

  setSize(size: number): void {
    this._size = size;
  }

  public move(): void {
    this.posX += this._directionX * this._speed;
    this.posY += this._directionY * this._speed;
  }

  getPoxX(): number {
    return this.posX;
  }

  getPosY(): number {
    return this.posY;
  }

  public getDirectionX(): number {
    return this._directionX;
  }

  public setDirectionX(angle: number): void {
    this._directionX = this.calculerDirectionX(angle);
  }

  public getDirectionY(): number {
    return this._directionY;
  }

  public setDirectionY(angle: number): void {
    this._directionY = this.calculerDirectionY(angle);
  }

  private calculerDirectionX(angle: number): number {
    return Math.cos(angle);
  }

  private calculerDirectionY(angle: number): number {
    return Math.sin(angle);
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

  public getState(): IState {
    return this._state;
  }

  public setState(state: IState): void {
    this._state = state;
  }

  public getDamage(): number {
    return this._damage;
  }

  public setDamage(damage: number): void {
    this._damage = damage;
  }

  public getSpeed(): number {
    return this._speed;
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public gagnerPoints(): number {
    if (this.getPv() <= 0) {
      return this.getSize();
    }
    return 0;
  }

  public collision(joueur: Player): void {
    if (
      this.posX + this._size >= joueur.getPosX() &&
      this.posX <= joueur.getPosX() + joueur.getSize() &&
      this.posY + this._size >= joueur.getPosY() &&
      this.posY <= joueur.getPosY() + joueur.getSize()
    ) {
      joueur.setPv(joueur.getPv() - this._damage);
      console.log(
        "collision avec asteroide " +
          this._damage +
          " degats" +
          joueur.getPv() +
          " pv restant"
      );
      this.setPv(0);
    }
  }

  public impact(projectile: Projectile): void {
    if (
      this.posX + this._size >= projectile.getPosX() &&
      this.posX <= projectile.getPosX() + projectile.getSize() &&
      this.posY + this._size >= projectile.getPosY() &&
      this.posY <= projectile.getPosY() + projectile.getSize()
    ) {
      this.setPv(this.getPv() - projectile.getDamage());
      console.log(
        "collision avec asteroide " +
          projectile.getDamage() +
          " degats" +
          this.getPv() +
          " pv restant"
      );
      projectile.setPv(0);
    }
  }

  public mourir(asteroides: Asteroid[]) {
    asteroides.filter((asteroid) => asteroid !== this);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.restore();
  }
}

export default Asteroid;
