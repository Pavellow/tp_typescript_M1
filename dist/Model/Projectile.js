import IEntite from "./Entite.js";
class Projectile extends IEntite {
    _directionX;
    _directionY;
    _speed;
    _damage;
    constructor(pvParam, pvMax, damageParam, speedParam) {
        super(pvParam, pvMax);
        this._directionX = 0;
        this._directionY = 0;
        this._speed = speedParam;
        this._damage = damageParam;
    }
}
export default Projectile;
