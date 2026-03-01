class Bottle extends MovableObject {
  height = 100;
  width = 100;
  x = 100;
  y = 400;

  offset = {
    top: 20,
    left: 35,
    right: 35,
    bottom: 10,
  };

  static BottleIndex = 0;

  IMAGES = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");

    this.x = 300 + Bottle.BottleIndex * 500 + Math.random() * 200;

    Bottle.BottleIndex++;
  }
}
