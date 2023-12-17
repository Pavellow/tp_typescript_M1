import Canvas from "./Canvas.js";
import Entite from "./Entite.js";
import KeyboardManager from "./KeyboardManager.js";
import IArme from "./IArme.js";
import Projectile from "./Projectile.js";
import FusilMun from "./FusilMun.js";
import Fusil from "./Fusil.js";

class Player extends Entite {
  private _damage!: number;
  private _speed!: number;
  private _life!: number;
  private _angle!: number;
  private _rotationSpeed!: number;
  private _size!: number;
  private _arme: Fusil = new Fusil("Fusil", 10, "projectile", 100, 1000, this);
  private _mun: Projectile[] = [];

  public posX: number;
  public posY: number;
  public width: number;
  public height: number;
  public arme!: IArme;
  public kbman: KeyboardManager;

  public constructor(
    pvParam: number,
    pvMax: number,
    damageParam: number,
    speedParam: number,
    lifeParam: number,
    widthParam: number,
    heightParam: number,
    angle: number,
    rotationSpeed: number,
    size: number,
    kbman: KeyboardManager
  ) {
    super(pvParam, pvMax);
    this._damage = damageParam;
    this._speed = speedParam;
    this._life = lifeParam;
    this.posX = 10;
    this.posY = 10;
    this.width = widthParam;
    this.height = heightParam;
    this._angle = angle;
    this._rotationSpeed = rotationSpeed;
    this.kbman = kbman;
    this._size = size;
    /* this.reloadMun(1000); */
    console.log("Player created, position : " + this.posX + " " + this.posY);
  }

  public getMun(): Projectile[] {
    return this._mun;
  }

  private reloadMun(nbrMun: number): void {
    for (let i = 0; i < nbrMun; i++) {
      this._mun.push(new FusilMun(1, 1, this._damage, 10, this._arme, this, 3));
    }
  }

  public getSize(): number {
    return this._size;
  }

  public setSize(size: number): void {
    this._size = size;
  }

  public getAngle(): number {
    return this._angle;
  }

  public setAngle(angle: number): void {
    this._angle = angle;
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

  public getLife(): number {
    return this._life;
  }

  public setLife(life: number): void {
    this._life = life;
  }

  public setPosX(x: number): void {
    this.posX = x;
  }

  public setPosY(y: number): void {
    this.posY = y;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public setArme(arme: IArme): void {
    this.arme = arme;
  }

  public center(ctx: Canvas): void {
    this.setPosX(ctx.getWidth() / 2);
    this.setPosY(ctx.getHeight() / 2);
  }

  getProjectiles() {
    return this.getMun();
  }

  public move(): void {
    const keyStatus = this.kbman.getSpecificKeyStatus();

    if (keyStatus["d"]) {
      this.posX += this.getSpeed();
    }
    if (keyStatus["q"]) {
      this.posX -= this.getSpeed();
    }
    if (keyStatus["z"]) {
      this.posY -= this.getSpeed();
    }
    if (keyStatus["s"]) {
      this.posY += this.getSpeed();
    }
  }

  public rotate(): void {
    const keyStatus = this.kbman.getSpecificKeyStatus();

    if (keyStatus["ArrowLeft"]) {
      this._angle -= this._rotationSpeed;
    }
    if (keyStatus["ArrowRight"]) {
      this._angle += this._rotationSpeed;
    }
  }

  public tirer(ctx: Canvas): void {
    const keyStatus = this.kbman.getSpecificKeyStatus();

    if (keyStatus[" "]) {
      this.arme.tirer(ctx, this.getAngle());
    }
  }

  public checkDeath(): boolean {
    if (this.getPv() <= 0) {
      return true;
    }
    return false;
  }
}

export default Player;
