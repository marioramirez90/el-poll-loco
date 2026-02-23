class Character extends MovableObject {
    speed = 5.5;
    height = 280;
    camera_x = 0;
  

    IMAGES_STANDING =[
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
        
    ];
     IMAGES_SLEEPING =[
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];

    IMAGES_WALKING =[
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

        IMAGES_JUMPING =[
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',

    ];

    

    world;

    constructor(){
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.applyGravity()
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING) ;
        this.loadImages(this.IMAGES_SLEEPING);
        this.animate();
        this.y = 3;
    }
    animate(){
       
            setInterval(() => {
                     this.playaAnimation(this.IMAGES_SLEEPING);
                   this.playaAnimation(this.IMAGES_STANDING);
                  
        },500);
     
        setInterval(() =>{
           
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                 this.otherDiretion = false; 0
                 this.moveRight()
                 
            }
             if (this.world.keyboard.LEFT && this.x > 0 ){
                 this.otherDiretion = true;
                 this.moveLeft()
            
            } 
            
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();
                
               
            }
            
            this.world.camera_x = -this.x + 100;

        }, 1000/60)
        

        setInterval(() => {
          
            if(this.isAboveGround()){
                 this.playaAnimation(this.IMAGES_JUMPING);
                
            }else{
                 if (this.world.keyboard.RIGHT|| this.world.keyboard.LEFT ){
                this.playaAnimation(this.IMAGES_WALKING);
            }

            }

           
          
        },50);

    }


 
    
}