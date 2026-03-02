class Character extends MovableObject {
  speed = 5.5;
  height = 280;
  camera_x = 0;
  energy = 100;
  coinNumber = 0;
  bottlenumber = 0;
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
  sleep_sound = new Audio("audio/character/characterSnoring.mp3");
  walking_sound = new Audio("audio/character/characterRun.mp3");
  jump_sound = new Audio("audio/character/characterJump.wav");
  damage_sound = new Audio("audio/character/characterRun.mp3");
  dead_sound = new Audio("audio/character/characterDead.wav");
  dead2_sound = new Audio("audio/character/alder-ay-dios-mio.mp3");
  coin_sound = new Audio("audio/collectibles/collectSound.wav");
  bottle_sound = new Audio("audio/collectibles/bottleCollectSound.wav");


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
  animate() {
    let i = 0; 
    setInterval(() => {
        
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
            i = 0;
        } else {
            i++;
        }
        if (!this.isAboveGround() && !this.isHurt() && !this.isDead()) {
            if (i < 10) {
                this.playaAnimation(this.IMAGES_STANDING);
            } else {
                this.playaAnimation(this.IMAGES_SLEEPING);
                this.sleep_sound.play()
            }
        }
    }, 450);

    setInterval(() => {
      this.walking_sound.pause();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDiretion = false;
        this.moveRight();
        if (!this.isAboveGround()) {
          this.walking_sound.play();
        }
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.otherDiretion = true;
        this.walking_sound.play();
        this.moveLeft();
        if (!this.isAboveGround()) {
          this.walking_sound.play();
        }
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.jump_sound.play();
      }

      this.world.camera_x = -this.x + 180;
    }, 1000 / 60);

    setInterval(() => {
      
      if (this.isDead()) {
        this.playaAnimation(this.IMAGES_DEAD);
       this.dead_sound.play();
      } else if (this.isHurt()) {
        this.playaAnimation(this.IMAGES_HURT);
               this.dead2_sound.play();
      } else if (!this.isAboveGround()) {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playaAnimation(this.IMAGES_WALKING);
          this.walking_sound.play();

        }
      }
    }, 50);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playaAnimation(this.IMAGES_JUMPING);
      }
    }, 150);
  }
}
