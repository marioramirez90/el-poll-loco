class DrawableObject {
    img;
    imageCache =[]
    currentImage = 0;
     x = 120;
    y = 200;
      height = 150;
    width = 100;

        loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

      draw(ctx){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height,);
    }

       playaAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}