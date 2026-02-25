class Cloud extends MovableObject {
    y = 30;
    height = 350;
    width = 600;
    static cloudIndex = 0;

 constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = 600 * Cloud.cloudIndex;
        Cloud.cloudIndex++;
        this.animate();
    }
 
    animate(){          
      setInterval(() => {
        this.moveLeft();
      
        }, 1000/ 60);
    }
}