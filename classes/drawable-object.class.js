/**
 * Base class for all drawable game objects.
 */
class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 200;
  height = 150;
  width = 100;

  /**
   * Loads a single image from the given path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a debug frame around collidable objects.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this.isFrameDrawable()) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.strokeRect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom,
      );
    }
  }

  /**
   * Checks if this object is a type that should have a debug collision frame drawn.
   * @returns {boolean} True if the object is a collidable game entity.
   */
  isFrameDrawable() {
    return this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coins ||
      this instanceof ThrowableObject;
  }
  /**
   * Loads an array of images into the image cache.
   * @param {string[]} arr - Array of image paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays a frame-by-frame animation from the given image array.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
