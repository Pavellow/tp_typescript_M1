import Projectile from "./Projectile.js";
class FusilMun extends Projectile {
    _arme;
    posX;
    posY;
    _player;
    _size;
    constructor(pvParam, pvMax, damageParam, speedParam, arme, player, size) {
        super(pvParam, pvMax, damageParam, speedParam);
        this._arme = arme;
        this._player = player;
        this.posX = player.posX; // Position initiale du projectile
        this.posY = player.posY;
        this._size = size;
    }
    setSize(size) {
        this._size = size;
    }
    setDamage(damage) {
        this._damage = damage;
    }
    getSize() {
        return this._size;
    }
    getDamage() {
        return this._damage;
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
    setDirectionX(angle) {
        this._directionX = this.calculerDirectionX(angle);
    }
    setDirectionY(angle) {
        this._directionY = this.calculerDirectionY(angle);
    }
    getDirectionX() {
        return this._directionX;
    }
    getDirectionY() {
        return this._directionY;
    }
    calculerDirectionX(angle) {
        return Math.sin(angle);
    }
    calculerDirectionY(angle) {
        return Math.sin(angle);
    }
    getState() {
        return this._state;
    }
    setState(state) {
        this._state = state;
    }
    getSpeed() {
        return this._speed;
    }
    setSpeed(speed) {
        this._speed = speed;
    }
    setDirection(angle) {
        this._directionX = Math.cos(angle);
        this._directionY = Math.sin(angle);
    }
    setPosX(posX) {
        this.posX = posX;
    }
    setPosY(posY) {
        this.posY = posY;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    move() {
        this.posX += this._directionX * this._speed;
        this.posY += this._directionY * this._speed;
        // Ajouter éventuellement une logique pour gérer les limites du canvas ou les collisions
    }
    draw(ctx) {
        ctx.save();
        // Translate le contexte à la position du projectile
        ctx.translate(this.posX, this.posY);
        ctx.beginPath();
        // Dessine le projectile centré sur sa position actuelle
        ctx.arc(0, 0, this.getSize(), 0, Math.PI * 2, true); // Dessin du projectile à la position translatée
        ctx.fill();
        ctx.restore();
    }
    static createFusilMun(player, arme, angle, speed, size) {
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
