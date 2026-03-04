/**
 * Represents a scrolling background layer with optional parallax.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject{
    width = 960;
    height = 540;

    /**
     * Creates a background object.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - The x position of the background.
     * @param {number} [parallaxFactor=1] - The parallax scroll factor (0 = static, 1 = full scroll).
     */
    constructor(imagePath, x, parallaxFactor = 1){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 540 - this.height;
        this.parallaxFactor = parallaxFactor;
    }
}