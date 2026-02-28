class World {
  character = new Character();
  statusBar = new StatusBar();
  coinStatusBar = new CoinStatusBar();
  bottleStatusBar = new BottleStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  bottle = new Bottle();
  coin = new Coins();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;

  keyboard;
  canvas;
  ctx;
  camera_x = -100;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }
  

  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

  checkCollisions() {
    setInterval(() => {
    this.checkCoinCollisions();
    this.checkBottleCollisions();
      this.level.enemies.forEach((enemy, index) => {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
          let hitFromAbove =
            this.character.isAboveGround() && this.character.speedY < 0;

          if (hitFromAbove) {
            enemy.energy = 0;
            this.character.speedY = 15;

            setTimeout(() => {
              this.level.enemies.splice(index, 1);
            }, 200);
          } else {
            if (!this.character.isHurt() ) {
              this.character.hit();
              this.statusBar.setPercentage(this.character.energy);
            }
          }
        }
      });
    }, 50);
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



  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottle);

    this.addToMap(this.endbossStatusBar);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
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

    if (mo.drawFrame) {
      mo.drawFrame(this.ctx);
    }

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
}
