class MovableObject{
    x = 120;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache =[]
    currentImage = 0;
    speed = 0.2;
    otherDiretion = false;
    speedY = 0.15;
    acceleration = 4; 
    energy = 100;
    lastHit = 0;
  

    applyGravity(){  
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                  this.y -= this.speedY
            this.speedY -= this.acceleration;
            }
        }, 1000/ 25);
    }

    isAboveGround(){
        return this.y < 210; 
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height,);
    }

    drawframe(ctx){
        if(this instanceof Character || this instanceof Chicken ||  this instanceof Endboss){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height,);
        ctx.stroke()
    };}


    loadImages(arr){ 
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }

    playaAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
           this.x += this.speed;  
    }
    
    moveLeft(){
               this.x -= this.speed;
    }

    jump(){
         this.speedY = 30;
    }

    isColliding(mo){
        
        return this.x + this.width - this.offset.right > mo.x + this.offset.left &&
          this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;  
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;   
    } else {
        this.lastHit = new Date().getTime()
    }
    }

   isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;

    }

    isDead(){
        return this.energy == 0;
    }

}