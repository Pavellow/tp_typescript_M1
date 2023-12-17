import Entite from "./Entite.js";
class Asteroid extends Entite {
    _damage;
    _speed;
    posX;
    posY;
    _directionX;
    _directionY;
    _size;
    constructor(pvParam, pvMax, damageParam, speedParam, posX, posY, dirX, dirY) {
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
    genererandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getSize() {
        return this._size;
    }
    setSize(size) {
        this._size = size;
    }
    move() {
        this.posX += this._directionX * this._speed;
        this.posY += this._directionY * this._speed;
    }
    getPoxX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getDirectionX() {
        return this._directionX;
    }
    setDirectionX(angle) {
        this._directionX = this.calculerDirectionX(angle);
    }
    getDirectionY() {
        return this._directionY;
    }
    setDirectionY(angle) {
        this._directionY = this.calculerDirectionY(angle);
    }
    calculerDirectionX(angle) {
        return Math.cos(angle);
    }
    calculerDirectionY(angle) {
        return Math.sin(angle);
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
    gagnerPoints() {
        if (this.getPv() <= 0) {
            return this.getSize();
        }
        return 0;
    }
    collision(joueur) {
        if (this.posX + this._size >= joueur.getPosX() &&
            this.posX <= joueur.getPosX() + joueur.getSize() &&
            this.posY + this._size >= joueur.getPosY() &&
            this.posY <= joueur.getPosY() + joueur.getSize()) {
            joueur.setPv(joueur.getPv() - this._damage);
            console.log("collision avec asteroide " +
                this._damage +
                " degats" +
                joueur.getPv() +
                " pv restant");
            this.setPv(0);
        }
    }
    impact(projectile) {
        if (this.posX + this._size >= projectile.getPosX() &&
            this.posX <= projectile.getPosX() + projectile.getSize() &&
            this.posY + this._size >= projectile.getPosY() &&
            this.posY <= projectile.getPosY() + projectile.getSize()) {
            this.setPv(this.getPv() - projectile.getDamage());
            console.log("collision avec asteroide " +
                projectile.getDamage() +
                " degats" +
                this.getPv() +
                " pv restant");
            projectile.setPv(0);
        }
    }
    mourir(asteroides) {
        asteroides.filter((asteroid) => asteroid !== this);
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.posX, this.posY);
        ctx.restore();
    }
}
export default Asteroid;
