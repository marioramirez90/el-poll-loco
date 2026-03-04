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

  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
        enemy.world = this;
      }
    });
  }

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
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        let hitFromAbove =
          this.character.isAboveGround() && this.character.speedY < 0;

        if (hitFromAbove && !(enemy instanceof Endboss)) {
          enemy.energy = 0;
          this.character.speedY = 15;

          setTimeout(() => {
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

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.receivedCoin();
        this.coinStatusBar.setPercentage(this.character.coinNumber);
        this.level.coins.splice(index, 1);
      }
    });
  }
  checkBottleCollisions() {
    this.level.bottle.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.receivedBottle();
        this.bottleStatusBar.setPercentage(this.character.bottlenumber);
        this.level.bottle.splice(index, 1);
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.D && this.character.bottlenumber > 0 && !this.canThrow) {
      let salsa = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 100,
      );
      this.canThrow = true;

      this.throwableObjects.push(salsa);
      this.character.hitBottle();
      this.bottleStatusBar.setPercentage(this.character.bottlenumber);
      setTimeout(() => {
        this.canThrow = false;
      }, 500);
    }
  }

  checkThrowCollisions() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isSplashed) return;
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.isSplashed) {
          bottle.splash();
          if (enemy instanceof Endboss) {
            enemy.hit();
            this.endbossStatusBar.setPercentage((enemy.energy / 170) * 100);
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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDiretion) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDiretion) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  showGameOver() {
    this.stopAllIntervals();
    playsound.pause("backgroundmusic");
    playsound.play("dead2");
    playsound.play("gameover");

    renderGameOverScreen();
  }

  showYouWin() {
    this.stopAllIntervals();
    playsound.pause("backgroundmusic");
    playsound.play("dead2");
    playsound.play("gameover");

    renderYouWinScreen();
  }

  stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
