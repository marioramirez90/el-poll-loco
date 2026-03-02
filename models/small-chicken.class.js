class Smallchicken extends MovableObject {
  height = 70;
  width = 70;
  x = 200;
  speed = 0.5;
  
  deadSoundPlayed = false;

  static SmallchickenIndex = 0;
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

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * Smallchicken.SmallchickenIndex * 1000;
    Smallchicken.SmallchickenIndex++;
    this.y = 490 - this.height;
    this.animate();
  }
 

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        if (!this.deadSoundPlayed) {
          this.deadsmallchicken_sound.play();
          this.deadSoundPlayed = true;
        }
        this.playaAnimation(this.IMAGES_DEAD);
      } else {
        this.playaAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
