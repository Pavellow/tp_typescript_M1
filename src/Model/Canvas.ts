import Player from "./Player.js";
import Asteroid from "./Asteroide.js";
import Asteroide from "./Asteroide.js";
import Projectile from "./Projectile.js";
import IArme from "./IArme.js";

class Canvas {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _joueur: Player;
  private _asteroides: Asteroid[];
  private _interval: number;
  private _score: number;

  protected _width: number;
  protected _height: number;

  constructor(
    widthParam: number,
    heightParam: number,
    joueurParam: Player,
    asteroidesParam: Asteroid[],
    intervalParam: number,
    scoreParam: number
  ) {
    this._width = widthParam;
    this._height = heightParam;
    this._canvas = document.querySelector("#jeu") as HTMLCanvasElement;
    this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    this._joueur = joueurParam;
    this._asteroides = asteroidesParam;
    this._interval = intervalParam;
    this._score = scoreParam;
    this._ctx.fillStyle = "#FFF";
  }

  public generateAsteroides(): void {
    let coordX = this.genererandom(0, 1920);
    let coordY = 0;
    if (coordX == 0) {
      coordY = this.genererandom(0, 1080);
    }
    if (coordY == 0) {
      coordX = this.genererandom(0, 1920);
    }
    let aste = new Asteroid(
      10,
      150,
      10,
      1,
      coordX,
      coordY,
      this.genererandom(0, 6),
      this.genererandom(0, 6)
    );
    this._asteroides.push(aste);
  }

  private genererandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getContext() {
    return this._ctx;
  }

  public getWidth(): number {
    return this._width;
  }

  public setWidth(width: number): void {
    this._width = width;
  }

  public getHeight(): number {
    return this._height;
  }

  public setHeight(height: number): void {
    this._height = height;
  }

  public getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public setCanvas(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
  }

  public getCtx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  public setCtx(ctx: CanvasRenderingContext2D): void {
    this._ctx = ctx;
  }

  public getJoueur(): Player {
    return this._joueur;
  }

  public setJoueur(joueur: Player): void {
    this._joueur = joueur;
  }

  public getAsteroides(): Asteroid[] {
    return this._asteroides;
  }

  public setAsteroides(asteroides: Asteroid[]): void {
    this._asteroides = asteroides;
  }

  public getInterval(): number {
    return this._interval;
  }

  public setInterval(interval: number): void {
    this._interval = interval;
  }

  public clear(): void {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  private drawPlayer(player: Player): void {
    this._ctx.save();
    this._ctx.translate(player.posX, player.posY);
    this._ctx.rotate(player.getAngle());

    this._ctx.beginPath();
    this._ctx.moveTo(player.getSize(), 0);
    this._ctx.lineTo(-player.getSize(), -player.getSize() / 2);
    this._ctx.lineTo(-player.getSize(), player.getSize() / 2);
    this._ctx.closePath();

    this._ctx.strokeStyle = "white";
    this._ctx.stroke();

    this._ctx.restore();
  }

  private drawAsteroide(asteroide: Asteroide): void {
    // ?????????????????????????????????????????????????????????
    // COmetes de Halley
    /* this._ctx.save();
    this._ctx.translate(asteroide.getPoxX(), asteroide.getPosY());
    this._ctx.rotate(this.genererandom(0, 6) / 10);

    this._ctx.beginPath();
    this._ctx.moveTo(-asteroide.getDirectionX(), 0);
    this._ctx.lineTo(-asteroide.getDirectionX(), -asteroide.getPosY() / 2);
    this._ctx.lineTo(-asteroide.getPoxX(), asteroide.getPosY() / 2);
    this._ctx.closePath();

    this._ctx.strokeStyle = "white";
    this._ctx.fill();

    this._ctx.restore(); */
    const ctx = this._ctx;
    ctx.save();
    ctx.translate(asteroide.getPoxX(), asteroide.getPosY());

    ctx.beginPath();
    ctx.moveTo(this.genererandom(0, 1920), this.genererandom(0, 1080));
    ctx.fillRect(10, 10, asteroide.getSize(), asteroide.getSize());
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.fill();
    ctx.restore();
  }
  // Enlever commentaire si on veut un max de difficulté ou de bbeauté
  private drawProjectile(projectile: Projectile): void {
    const ctx = this._ctx; // Récupère le contexte de dessin du canvas

    ctx.save(); // Sauvegarde l'état actuel du contexte
    ctx.translate(projectile.getPosX(), projectile.getPosY()); // Déplace le contexte à la position du projectile

    // Dessine le projectile, par exemple, comme un cercle
    ctx.beginPath();
    const radius = 5; // Taille du projectile, ajuste selon tes besoins
    ctx.arc(
      this._joueur.getPosX(),
      this._joueur.getPosY(),
      radius,
      0,
      Math.PI * 2,
      true
    ); // Dessin du projectile centré sur sa position actuelle
    ctx.fillStyle = "yellow"; // Choisis une couleur pour le projectile
    ctx.fill();

    ctx.restore(); // Restaure l'état précédent du contexte
  }

  private drawScore(): void {
    this._ctx.font = "36px Arial";
    this._ctx.fillStyle = "#FFF";
    this._ctx.fillText("Score: " + this._score, 10, 30);
  }

  private drawPV(): void {
    this._ctx.fillText("PV: " + this._joueur.getPv(), 10, 80);
  }

  public getScore(): number {
    return this._score;
  }

  public setScore(score: number): void {
    this._score = score;
  }

  static asteroidMort(
    asteroids: Asteroid[],
    asteroidMort: Asteroid
  ): Asteroid[] {
    return asteroids.filter((asteroid) => asteroid !== asteroidMort);
  }

  static checkImpactAsteroid(
    canvas: Canvas,
    projectiles: Projectile[],
    asteroids: Asteroid[]
  ): void {
    projectiles.forEach((projectile) => {
      asteroids.forEach((asteroid) => {
        const distance = Math.sqrt(
          Math.pow(projectile.getPosX() - asteroid.getPoxX(), 2) +
            Math.pow(projectile.getPosY() - asteroid.getPosY(), 2)
        );

        // Le seuil de collision peut être la somme des rayons du projectile et de l'astéroïde
        if (distance < projectile.getSize() / 2 + asteroid.getSize() / 2) {
          asteroid.setPv(asteroid.getPv() - projectile.getDamage());
          canvas.setScore(canvas.getScore() + asteroid.gagnerPoints());
          console.log("collision avec asteroide " + asteroid.getPv() + " pv");
          if (asteroid.getPv() <= 0) {
            console.log("mort");
            canvas.setAsteroides(Canvas.asteroidMort(asteroids, asteroid));
          }

          // Tu peux aussi gérer le cas où le projectile est détruit ou affecté
          // projectile.mourir() par exemple
        }
      });
    });
  }

  static ameliorationJoueur(
    canvas: Canvas,
    score: number,
    joueur: Player,
    munition: Projectile[]
  ): void {
    if (score >= 500) {
      joueur.setPvMax(joueur.getPvMax() + 10);
      joueur.setPv(joueur.getPvMax());
      joueur.setDamage(joueur.getDamage() + 1);
      joueur.setSpeed(joueur.getSpeed() + 0.1);
      joueur.arme.setCadence(joueur.arme.getCadence() + 0.2);
      canvas.setScore(canvas.getScore() - 100);
      munition.map((mun) => mun.setSpeed(mun.getSpeed() + 0.5));
      score = 0;
    }
  }

  public draw(): void {
    this.drawPlayer(this._joueur);
    this._asteroides.forEach((asteroide) => this.drawAsteroide(asteroide));

    // Enlever le commentaire au cas oùon veut un max de difficulté
    /*     this._joueur
      .getProjectiles()
      .forEach((projectile) => this.drawProjectile(projectile)); */

    // Dessine le score, etc.
    this.drawScore();
    this.drawPV();
  }
}

export default Canvas;
