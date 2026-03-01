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

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw(150, 150)
        this.loadImages(this.IMAGES_ROTATION);
         this.animate();

    }
    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);

    }
    animate() {
    setInterval(() => {
   
        this.playaAnimation(this.IMAGES_ROTATION);
      
    }, 20);
  }

}


