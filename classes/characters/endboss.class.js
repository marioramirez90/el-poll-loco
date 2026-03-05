/**
 * Represents the end boss enemy chicken.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  height = 450;
  width = 390;
  energy = 100;
  speed = 25;
  distance = 0;

  offset = {
    top: 120,
    left: 80,
    right: 80,
    bottom: 40,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Creates the endboss, loads all images and starts animations.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.world = world;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.y = 520 - this.height;
    this.x = 5100;
    this.animate();
  }
  /**
   * Starts the animation interval handling alert, walk, attack, hurt and dead states.
   */
  animate() {
    setInterval(() => {
    if (!this.character) return;
    this.checkCharacterDistance();
    this.endbossIsDead();
    this.endbossIsHurt();
    this.endbossIsAttack();
    this.endbossIsWalking();
    this.endbossAlert();
  },100); 
}

  /**
   * Calculates the distance between the endboss and the character.
   */
  checkCharacterDistance() {
    this.distance = Math.abs(this.x - this.character.x);
  }

  /**
   * Handles the endboss death state and triggers the win screen.
   */
  endbossIsDead() {
    if (!this.isDead()) return;
    this.playAnimation(this.IMAGES_DEAD);
    if (!this.winTriggered) {
      this.winTriggered = true;
      setTimeout(() => {
        this.world.showYouWin();
        playsound.play("gameover");
        playsound.pause("endgame");
      }, 1000);
    }
  }

  /**
   * Plays the hurt animation if the endboss is hurt and not dead.
   */
  endbossIsHurt() {
    if (!this.isHurt() || this.isDead()) return;
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Plays the attack animation when the character is very close.
   */
  endbossIsAttack() {
    if (this.distance >= 10 || this.isDead()) return;
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Moves the endboss toward the character and plays walk animation.
   */
  endbossIsWalking() {
    if (this.distance >= 550 || this.distance < 10 || this.isDead()) return;
    this.playAnimation(this.IMAGES_WALKING);
    this.playEndbossSound();
    if (this.x > this.character.x) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }

  /**
   * Plays the alert animation when the character is far away.
   */
  endbossAlert() {
    if (this.distance < 550 || this.isDead()) return;
    this.playAnimation(this.IMAGES_ALERT);
    playsound.pause("endgame");
    playsound.pause("chicken");
  }

  /**
   * Plays endboss background music and chicken sounds if not already playing.
   */
  playEndbossSound() {
    if (playsound.sounds["endgame"].paused) {
      playsound.play("endgame");
      playsound.pause("backgroundmusic");
    }
    if (playsound.sounds["chicken"].paused) {
      playsound.play("chicken");
    }
  }
}