import Canvas from "./Model/Canvas.js";
import Player from "./Model/Player.js";
import KeyboardManager from "./Model/KeyboardManager.js";
import Fusil from "./Model/Fusil.js";
const keyboard = new KeyboardManager();
const joueur = new Player(100, 100, 10, 1.5, 3, 10, 10, 0, 0.05, 20, keyboard);
joueur.setArme(new Fusil("Fusil", 5, "projectile", 100, 5, joueur));
const canvas = new Canvas(1920, 1080, joueur, [], 1000 / 60, 10);
joueur.center(canvas);
let delai = 500;
setInterval(() => {
    canvas.generateAsteroides();
}, delai);
function gameLoop() {
    // Met à jour les éléments du jeu
    joueur.move();
    joueur.rotate();
    joueur.tirer(canvas);
    if (joueur.checkDeath()) {
        console.log("mort");
        canvas.clear();
        canvas.getCtx().fillText("Vous êtes mort", 10, 120);
        canvas.draw();
        return;
    }
    canvas.clear();
    canvas.draw();
    joueur.getProjectiles().forEach((projectile) => {
        projectile.move();
        projectile.draw(canvas.getCtx());
    });
    canvas.getAsteroides().forEach((asteroide) => {
        asteroide.collision(joueur);
        asteroide.gagnerPoints();
        asteroide.move();
        asteroide.draw(canvas.getCtx());
    });
    Canvas.checkImpactAsteroid(canvas, joueur.getProjectiles(), canvas.getAsteroides());
    Canvas.ameliorationJoueur(canvas, canvas.getScore(), joueur, joueur.getMun());
    requestAnimationFrame(gameLoop);
}
// Démarre la boucle de jeu
requestAnimationFrame(gameLoop);
