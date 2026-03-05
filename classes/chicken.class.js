/**
 * Represents a normal chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  height = 110;
  width = 110;
  x = 200;
  energy = 1;
  deadSoundPlayed = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 5,
    right: 5,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a chicken at a random x position and starts animations.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 300 + Math.random() * 4500;
    this.y = 490 - this.height;
    this.animate();
  }
  /**
   * Instantly kills the chicken by setting energy to 0.
   */
  hit() {
    this.energy = 0;
  }

  /**
   * Starts movement and animation intervals for the chicken.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        if (!this.deadSoundPlayed) {
          playsound.play("dead_chicken");
          this.deadSoundPlayed = true;
        }
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
