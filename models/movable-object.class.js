/**
 * Base class for all movable game objects with physics and collision.
 * @extends DrawableObject
 */
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
  

  /**
   * Applies gravity to the object using a recurring interval.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!(this instanceof ThrowableObject) && this.y > 210) {
        this.y = 210;
        this.speedY = 0;
      }
      if (this instanceof ThrowableObject && this.y > 380) {
        this.y = 380;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

 /**
  * Checks if the object is above ground level.
  * @returns {boolean} True if the object is above ground.
  */
 isAboveGround() {
    if (this instanceof ThrowableObject) {
        return this.y < 380; 
    } else {
        return this.y < 210;
    }
}

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if the objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + this.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy by 10 and records the hit time.
   */
  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;

    } else {
      this.lastHit = new Date().getTime();
      
    }
  }

  /**
   * Increases the coin counter by 10 and plays the coin sound.
   */
  receivedCoin() {
    this.coinNumber += 10;
    playsound.play('coin');
    if (this.coinNumber > 100) this.coinNumber = 100;
}
  /**
   * Increases the bottle counter by 20 and plays the bottle sound.
   */
  receivedBottle() {
    this.bottlenumber += 20;
        playsound.play('bottle');

    if (this.bottlenumber > 100) this.bottlenumber = 100;
}

  /**
   * Decreases the bottle counter by 10 after throwing.
   */
  hitBottle(){
    this.bottlenumber -= 10;
    if (this.bottlenumber == 0) this.bottlenumber = 0;
}

  /**
   * Checks if the object was recently hurt.
   * @returns {boolean} True if the object was hit within the last 0.5 seconds.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5; 
  }

  /**
   * Checks if the object's energy has reached zero.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }
}
