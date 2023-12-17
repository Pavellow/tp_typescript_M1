import IEntite from "./Entite.js";

abstract class Projectile extends IEntite {
  protected _directionX: number;
  protected _directionY: number;
  protected _speed: number;
  protected _damage: number;

  constructor(
    pvParam: number,
    pvMax: number,
    damageParam: number,
    speedParam: number
  ) {
    super(pvParam, pvMax);
    this._directionX = 0;
    this._directionY = 0;
    this._speed = speedParam;
    this._damage = damageParam;
  }

  abstract getPv(): number;
  abstract setPv(pv: number): void;
  abstract getPvMax(): number;
  abstract setPvMax(pvMax: number): void;
  abstract getState(): IState;
  abstract setState(state: IState): void;
  abstract move(): void;
  abstract draw(arg0: CanvasRenderingContext2D): void;
  abstract getPosX(): number;
  abstract getPosY(): number;
  abstract getDamage(): number;
  abstract getSize(): number;
  abstract getSpeed(): number;
  abstract getDirectionX(): number;
  abstract getDirectionY(): number;
  abstract setDirectionX(angle: number): void;
  abstract setDirectionY(angle: number): void;
  abstract setSpeed(speed: number): void;
  abstract setSize(size: number): void;
  abstract setDamage(damage: number): void;
}

export default Projectile;
