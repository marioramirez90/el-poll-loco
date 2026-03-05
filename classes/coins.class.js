/**
* Represents a collectible coin with a spinning animation.
* @extends MovableObject
*/
class Coins extends MovableObject {
    
    height = 170;
    width = 170;

    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55,
    };

    IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

    /**
    * Creates a coin at a random x position and starts the spin animation.
    */
    constructor() {
        super().loadImage("img/8_coin/coin_1.png");

        this.loadImages(this.IMAGES);
        this.x = 900 + Math.random() * 4500;

        this.animate();
    }

    /**
    * Starts the coin spinning animation.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}