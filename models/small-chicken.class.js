/**
 * Represents a small chicken enemy.
 * @extends MovableObject
 */
class Smallchicken extends MovableObject {
  height = 70;
  width = 70;
  speed = 0.5;
  
  deadSoundPlayed = false;

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a small chicken at a random x position and starts animations.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 5000;
    this.y = 490 - this.height;
    this.animate();
    this.speed = 0.5;
  }
 
/**
   * Instantly kills the small chicken by setting energy to 0.
   */
hit() {
    this.energy = 0;
  }
  /**
   * Starts movement and animation intervals for the small chicken.
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
          playsound.play('dead_small_chicken');
          this.deadSoundPlayed = true;
        }
        this.playaAnimation(this.IMAGES_DEAD);
      } else {
        this.playaAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
