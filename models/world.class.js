class World{

character = new Character();
statusBar = new StatusBar();
level = level1;
enemies = level1.enemies
clouds = level1.clouds
backgroundObjects = level1.backgroundObjects

keyboard;
canvas;
ctx;
camera_x = -100;

constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
}

setWorld(){
    this.character.world = this;
}

checkCollisions() {
    setInterval(() => {
        this.level.enemies.forEach((enemy, index) => { 
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    enemy.hit();
                    this.character.jump();
                    
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 1000);

                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }, 100);
}


draw(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
     this.addObjectsToMap(this.level.enemies);
     this.addObjectsToMap(this.level.clouds);
     this.ctx.translate(-this.camera_x, 0);
 



    let self = this;

    requestAnimationFrame(function(){
            self.draw();
    });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o)
        })

    }

    addToMap(mo){
        if(mo.otherDiretion){
            this.flipImage(mo);
      

    }
    mo.draw(this.ctx);
    mo.drawframe(this.ctx);
      
 
      if(mo.otherDiretion){
        this.flipImageBack(mo);
      
      }
 }

 
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0 );
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
          mo.x = mo.x * -1;
        this.ctx.restore();
    }





   
   

 };