class ThrowableObject extends MovableObject{
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

    bottleHit_sound = new Audio('audio/throwable/bottleBreak.mp3')


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

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
animate() {
  setInterval(() => {
    if (this.isSplashed) {
      if (!this.hasPlayedSplashSound) { 
        this.bottleHit_sound.currentTime = 0;
        this.bottleHit_sound.play()
        this.hasPlayedSplashSound = true; 
      }
      this.playaAnimation(this.IMAGES_SPLASH);
    } else {
      this.playaAnimation(this.IMAGES_ROTATION);
    }
  }, 20);
}

splash() {
  this.isSplashed = true;
  this.speedY = 0;
  this.hasPlayedSplashSound = false;
}}