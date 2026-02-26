class Chicken extends MovableObject{
    height = 70 ;
    width = 70;
    x = 600;
    energy = 10;

    static chickenIndex = 0;
    offset = {
    top: 100,
    left: 10,
    right: 10,
    bottom: 10,
    
 }
    IMAGES_WALKING =[
       'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD =[
       'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    
    ];

  
     constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_DEAD)
        this.x = 800 + Math.random() * Chicken.chickenIndex * 800;
        Chicken.chickenIndex++;
         this.y = 490 - this.height;
        this.animate();


        

    }
    hit() {
        this.energy = 0;
    }

   animate() {
        
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

      
        setInterval(() => {
            if (this.isDead()) {
                this.playaAnimation(this.IMAGES_DEAD);
            } else {
                this.playaAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}