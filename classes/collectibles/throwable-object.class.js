/**
 * Represents a throwable salsa bottle.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  offset = {
    top: 20,
    left: 35,
    right: 35,
    bottom: 10,
  };
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"


  ];

  bottleHit_sound = new Audio('audio/throwable/bottleBreak.mp3');

  /**
   * Creates a throwable object at the given position and starts throw physics.
   * @param {number} x - The x starting position.
   * @param {number} y - The y starting position.
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.isSplashed = false;
    this.throw();
    this.animate();
  }

  /**
   * Initiates the throw with gravity and forward movement.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (!this.isSplashed) {
        this.x += 10;
        if (this.y >= 420) {
          this.splash();
        }
      }
    }, 25);
  }
  /**
   * Animates the bottle rotation or splash depending on state.
   */
  animate() {
    setInterval(() => {
      if (this.isSplashed) {
        if (!this.hasPlayedSplashSound) {
          playsound.play('bottle_hit');
          this.hasPlayedSplashSound = true;
        }
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 20);
  }

  /**
   * Sets the bottle to splashed state, stopping its movement.
   */
  splash() {
    this.isSplashed = true;
    this.speedY = 0;
    this.hasPlayedSplashSound = false;
  }
}