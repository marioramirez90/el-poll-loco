class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDiretion = false;
  speedY = 0.15;
  acceleration = 4;
  energy = 100;
  lastHit = 0;
  coinNumber = 0;
  bottlenumber = 0;
  cloudStartX = 0;
  

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

 isAboveGround() {
    if (this instanceof ThrowableObject) {
        return this.y < 350; 
    } else {
        return this.y < 210;
    }
}

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + this.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;

    } else {
      this.lastHit = new Date().getTime();
      
    }
  }

  receivedCoin() {
    this.coinNumber += 10;
    playsound.play('coin');
    if (this.coinNumber > 100) this.coinNumber = 100;
}
  receivedBottle() {
    this.bottlenumber += 20;
        playsound.play('bottle');

    if (this.bottlenumber > 100) this.bottlenumber = 100;
}

  hitBottle(){
    this.bottlenumber -= 10;
    if (this.bottlenumber == 0) this.bottlenumber = 0;
}

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5; 
  }

  isDead() {
    return this.energy == 0;
  }
}
