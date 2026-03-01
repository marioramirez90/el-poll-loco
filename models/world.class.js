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
    this.checkThrowObject()
    this.checkThrowCollisions()
    this.run();
  }
  

  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }
  run(){
    
  }

  run() {
    setInterval(() => {
    this.checkCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkThrowObject()
    this.checkThrowCollisions()
      
    }, 50);
  }
 checkCollisions(){
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
      })};

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

  checkThrowObject(){
    if(this.keyboard.D && this.character.bottlenumber > 0 && !this.canThrow){
      let salsa = new ThrowableObject(this.character.x +100 ,this.character.y +100);
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
  this.throwableObjects.forEach((bottle, bottleIndex) => {
    this.level.enemies.forEach((enemy, enemyIndex) => {

      if (bottle.isColliding(enemy) && !enemy.isDead()) {

        enemy.hit();
     if (!this.endboss.isHurt() ) {
              this.endboss.hit();
              this.endbossStatusBar.setPercentage(this.endboss.energy);
            }

          setTimeout(() => {
             this.throwableObjects.splice(bottleIndex, 1);
            }, 50);
        if (enemy.energy <= 0) {
            setTimeout(() => {
              this.level.enemies.splice(enemyIndex, 1);
            }, 200);
        }
      }

    });
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
    this.addToMap(this.endbossStatusBar);
    this.ctx.translate(-Math.floor(this.camera_x), 0);
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
  mo.drawframe(this.ctx);

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
