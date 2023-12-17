import FusilMun from "./FusilMun.js";
class Fusil {
    nom;
    degats;
    type;
    portee;
    cadence;
    player;
    lastShotTime;
    constructor(nom, degats, type, portee, cadence, player) {
        this.nom = nom;
        this.degats = degats;
        this.type = type;
        this.portee = portee;
        this.cadence = cadence;
        this.player = player;
        this.lastShotTime = 0;
    }
    setCadence(cadence) {
        this.cadence = cadence;
    }
    incrementCadence(increment) {
        this.cadence += increment;
    }
    getCadence() {
        return this.cadence;
    }
    tirer(ctx, angle) {
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
