/**
 * Represents the playable character Pepe.
 * @extends MovableObject
 */
class Character extends MovableObject {
  speed = 5.5;
  height = 280;
  camera_x = 0;
  energy = 120;
  coinNumber = 0;
  bottleNumber = 0;
  idleTime = 0;

  offset = {
    top: 100,
    left: 20,
    right: 20,
    bottom: 10,
  };

  IMAGES_STANDING = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-41.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  world;

  /**
   * Creates the character, loads all images, applies gravity and starts animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_STANDING);
    this.applyGravity();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.y = 80;
  }
  /**
   * Starts all animation intervals for idle, movement, state and jump.
   */
  animate() {
    this.characterIdleAnimation();
    this.characterMovmentAnimation()
    this.characterDamage();
    this.characterIsJumping();
  }

  /**
   * Starts the idle animation loop. Resets idle counter on input, otherwise increments it.
   */
  characterIdleAnimation() {
    let i = 0;
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {
        i = 0;
        playsound.pause("sleep");
      } else {
        i++;
      }
      this.characterSleepAnimation(i);
    }, 200);
  }

  /**
   * Plays standing or sleeping animation based on idle duration.
   * @param {number} i - The idle frame counter.
   */
  characterSleepAnimation(i) {
    if (!this.isAboveGround() && !this.isHurt() && !this.isDead()) {
      if (i < 15) {
        this.playAnimation(this.IMAGES_STANDING);
      } else {
        this.playAnimation(this.IMAGES_SLEEPING);
        if (playsound.sounds["sleep"].paused) {
          playsound.play("sleep");
        }
      }
    }
  }

  /**
   * Handles movement input and updates the camera position each frame.
   */
  characterMovmentAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        playsound.pause("walking");
        return;
      }
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
      playsound.pause("walking");
    }
      this.characterMoveRight();
      this.characterMoveLeft();
      this.characterJump();

      this.world.camera_x = -this.x + 180;
    }, 1000 / 70);
  }

  /**
   * Moves the character to the right and plays the walking sound.
   */
  characterMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.otherDirection = false;
      this.moveRight();
      if (!this.isAboveGround() && playsound.sounds["walking"].paused) {
        playsound.play("walking");
      }
    }
  }

  /**
   * Moves the character to the left and plays the walking sound.
   */
  characterMoveLeft() {

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.otherDirection = true;
      this.moveLeft();
      if (!this.isAboveGround() && playsound.sounds["walking"].paused) {
        playsound.play("walking");
      }
    }
  }

  /**
   * Makes the character jump if space is pressed and character is on the ground.
   */
  characterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      playsound.play("jump");
    }

  }
  /**
   * Checks the character's damage state each frame and plays the corresponding animation.
   */
  characterDamage() {
    setInterval(() => {

      if (this.isDead()) {
        this.characterIsDead();
      }
      else if (this.isHurt()) {
        this.characterIsHurt();
      }
      else {
        this.characterIsWalking();
      }
    }, 50);
  }

  /**
   * Plays the death animation, sound, and triggers the game-over screen.
   */
  characterIsDead() {
    this.playAnimation(this.IMAGES_DEAD);

  if (playsound.sounds["dead"].paused) {
    playsound.play("dead");
  }

  if (!this.gameOverTriggered) {
    this.gameOverTriggered = true;

    setTimeout(() => {
      this.world.showGameOver();
    }, 1000);
  }
}
  /**
   * Plays the hurt animation and sound when the character takes damage.
   */
  characterIsHurt() {

    this.playAnimation(this.IMAGES_HURT);

    if (playsound.sounds["dead2"].paused) {
      playsound.play("dead2");
    }
  }



  /**
   * Plays the walking animation when moving on the ground.
   */
  characterIsWalking() {
    if (!this.isAboveGround()) {

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  /**
   * Plays the jumping animation while the character is above ground.
   */
  characterIsJumping() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 80);
  }
}



