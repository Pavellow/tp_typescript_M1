import Entite from "./Entite.js";
import FusilMun from "./FusilMun.js";
import Fusil from "./Fusil.js";
class Player extends Entite {
    _damage;
    _speed;
    _life;
    _angle;
    _rotationSpeed;
    _size;
    _arme = new Fusil("Fusil", 10, "projectile", 100, 1000, this);
    _mun = [];
    posX;
    posY;
    width;
    height;
    arme;
    kbman;
    constructor(pvParam, pvMax, damageParam, speedParam, lifeParam, widthParam, heightParam, angle, rotationSpeed, size, kbman) {
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
    getMun() {
        return this._mun;
    }
    reloadMun(nbrMun) {
        for (let i = 0; i < nbrMun; i++) {
            this._mun.push(new FusilMun(1, 1, this._damage, 10, this._arme, this, 3));
        }
    }
    getSize() {
        return this._size;
    }
    setSize(size) {
        this._size = size;
    }
    getAngle() {
        return this._angle;
    }
    setAngle(angle) {
        this._angle = angle;
    }
    getPv() {
        return this._pv;
    }
    setPv(pv) {
        this._pv = pv;
    }
    getPvMax() {
        return this._pvMax;
    }
    setPvMax(pvMax) {
        this._pvMax = pvMax;
    }
    getState() {
        return this._state;
    }
    setState(state) {
        this._state = state;
    }
    getDamage() {
        return this._damage;
    }
    setDamage(damage) {
        this._damage = damage;
    }
    getSpeed() {
        return this._speed;
    }
    setSpeed(speed) {
        this._speed = speed;
    }
    getLife() {
        return this._life;
    }
    setLife(life) {
        this._life = life;
    }
    setPosX(x) {
        this.posX = x;
    }
    setPosY(y) {
        this.posY = y;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    setArme(arme) {
        this.arme = arme;
    }
    center(ctx) {
        this.setPosX(ctx.getWidth() / 2);
        this.setPosY(ctx.getHeight() / 2);
    }
    getProjectiles() {
        return this.getMun();
    }
    move() {
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
    rotate() {
        const keyStatus = this.kbman.getSpecificKeyStatus();
        if (keyStatus["ArrowLeft"]) {
            this._angle -= this._rotationSpeed;
        }
        if (keyStatus["ArrowRight"]) {
            this._angle += this._rotationSpeed;
        }
    }
    tirer(ctx) {
        const keyStatus = this.kbman.getSpecificKeyStatus();
        if (keyStatus[" "]) {
            this.arme.tirer(ctx, this.getAngle());
        }
    }
    checkDeath() {
        if (this.getPv() <= 0) {
            return true;
        }
        return false;
    }
}
export default Player;
