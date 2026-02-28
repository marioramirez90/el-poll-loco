class Bottle extends MovableObject {
  height = 100;
  width = 100;
  x = 100;
  y = 420;

  offset = {
    top: 1,
    left: 5,
    right: 5,
    bottom: 2,
  };

   static BottleIndex = 0;

  IMAGES = [
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    
  ];


  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    
      this.x = 300 + Math.random() * 800;
    
    
   
  }



   
}
