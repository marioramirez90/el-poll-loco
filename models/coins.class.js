class Coins extends MovableObject {
  height = 170;
  width = 170;
  x = 200;
  offset = {
    top: 55,
    left: 55,
    right: 55,
    bottom: 55,
  };

   static coinIndex = 0;

  IMAGES = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",

    
  ];


  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    
    this.loadImages(this.IMAGES);
    this.x = 400 + Math.floor(Math.random() * 5) * 1000 + Math.random() * 1000;
    
    
    this.animate();
  }


  animate() {
    setInterval(() => {
   
        this.playaAnimation(this.IMAGES);
      
    }, 200);
  }
}
