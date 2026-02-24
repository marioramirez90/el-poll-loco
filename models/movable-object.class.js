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

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

            
        });
    }

    playaAnimation(images){
             let i = this.currentImage % this.IMAGES_WALKING.length;
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

    
}