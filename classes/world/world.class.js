/**
 * Main game world containing all game objects, collision logic and rendering.
 */
class World {
  character = new Character();
  statusBar = new StatusBar();
  endboss = new Endboss();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  bottle = new Bottle();
  coin = new Coins();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  throwableObjects = [];
  endbossActivated = false;
  keyboard;
  canvas;
  ctx;
  camera_x = 0;

  /**
   * Creates the game world.
   * @param {HTMLCanvasElement} canvas - The HTML canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkThrowObject();
    this.checkThrowCollisions();
    this.run();
  }

  /**
   * Sets the world reference on the character and endboss objects.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
        enemy.world = this;
      }
    });
  }

  /**
   * Starts the main game loop checking collisions and throwable objects.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkThrowObject();
      this.checkThrowCollisions();
      this.removeSplashedBottles();
    }, 50);
  }
  /**
   * Checks collisions between the character and all enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        let hitFromAbove =
          this.character.isAboveGround() && this.character.speedY < 0; if (hitFromAbove && !(enemy instanceof Endboss)) {
            enemy.energy = 0; this.character.speedY = 15; setTimeout(() => {
              let i = this.level.enemies.indexOf(enemy);
              if (i > -1) this.level.enemies.splice(i, 1);
            }, 200);
          } else {
          if (!this.character.isHurt()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        }
      }
    });
  }

  /**
   * Checks if the character collides with coins and collects them.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.receivedCoin();
        this.coinStatusBar.setPercentage(this.character.coinNumber);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the character collides with bottles and collects them.
   */
  checkBottleCollisions() {
    this.level.bottle.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.receivedBottle();
        this.bottleStatusBar.setPercentage(this.character.bottleNumber);
        this.level.bottle.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the player presses the throw key and creates a throwable object.
   */
  checkThrowObject() {
    if (this.keyboard.D && this.character.bottleNumber > 0 && !this.canThrow) {
      let salsa = new ThrowableObject(this.character.x + 40, this.character.y + 100,);
      this.canThrow = true;
      this.throwableObjects.push(salsa);
      this.character.hitBottle();
      this.bottleStatusBar.setPercentage(this.character.bottleNumber);
      setTimeout(() => {
        this.canThrow = false;
      }, 500);
    }
  }

  /**
   * Checks collisions between thrown bottles and enemies.
   */
  checkThrowCollisions() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isSplashed) return;
      this.level.enemies.forEach((enemy) => {
        if (
          bottle.isColliding(enemy) && !enemy.isDead() && !bottle.isSplashed) {
          bottle.splash();
          if (enemy instanceof Endboss) {
            enemy.hit();
            this.endbossStatusBar.setPercentage(enemy.energy);
          } else {
            enemy.energy = 0;
          }
          if (enemy.energy <= 0 && !(enemy instanceof Endboss)) {
            setTimeout(() => {
              let i = this.level.enemies.indexOf(enemy);
              if (i > -1) this.level.enemies.splice(i, 1);
            }, 200);
          }
        }
      });
    });
  }

  /**
   * Removes splashed bottles from the throwable objects array after a delay.
   */
  removeSplashedBottles() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isSplashed && !bottle.removalScheduled) {
        bottle.removalScheduled = true;
        setTimeout(() => {
          let i = this.throwableObjects.indexOf(bottle);
          if (i > -1) this.throwableObjects.splice(i, 1);
        }, 150);
      }
    });
  }

  /**
   * Main draw loop rendering all game objects to the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(Math.floor(this.camera_x), 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-Math.floor(this.camera_x), 0);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.ctx.translate(Math.floor(this.camera_x), 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottle);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-Math.floor(this.camera_x), 0);
    if (this.character.x > 4500) {
      this.endbossActivated = true;
    }
    if (this.endbossActivated) {
      this.addToMap(this.endbossStatusBar);
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the canvas.
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas, handling mirroring if needed.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the canvas context horizontally for a mirrored object.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context after drawing a mirrored object.
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Ends the game and displays the game over screen.
   */
  showGameOver() {
    this.stopAllIntervals();
    document.getElementById("menu").classList.add("d-none");
    gameOverRestart.classList.remove("d-none");
    playsound.pause("backgroundmusic");
    playsound.play("dead2");
    playsound.play("gameover");
    renderGameOverScreen();
  }

  /**
   * Ends the game and displays the you win screen.
   */
  showYouWin() {
    this.stopAllIntervals();
    document.getElementById("menu").classList.add("d-none");
    playsound.pause("backgroundmusic");
    playsound.play("win");
    renderYouWinScreen();
  }

  /**
   * Clears all active intervals to stop the game loop.
   */
  stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
