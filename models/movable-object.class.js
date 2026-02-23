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

    playAnimatio(images){
                let i = this.currentImage % this.IMAGES_WALKING.length;
             let path = this.images[i]
             this.img = this.imageCache[path];
             this.currentImage++;

    }
 

    moveRight() {
        
    }
    
    
    moveLeft(){
         setInterval(() => {
            this.x -= this.speed;
        }, 1000/ 60);
    }
}