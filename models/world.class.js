class World{

character = new Character();
enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
clouds =[
    new Cloud(),
]
backgroundObjects = [
    
    new BackgroundObject('img/5_background/layers/air.png',-960),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -960),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -960),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -960),

    new BackgroundObject('img/5_background/layers/air.png',0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('img/5_background/layers/air.png',959),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959),

    new BackgroundObject('img/5_background/layers/air.png',959*2),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 959*2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 959*2),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 959*2),

     new BackgroundObject('img/5_background/layers/air.png',959*3),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959*3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959*3),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959*3),

]

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
}

setWorld(){
    this.character.world = this;
}
    draw(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects)
        this.addToMap(this.character)

        this.addObjectsToMap(this.enemies)
        this.addObjectsToMap(this.clouds)

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
        this.ctx.save();
        this.ctx.translate(mo.width, 0 );
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;

    }
      this.ctx.drawImage(mo.img,mo.x,mo.y,mo.width,mo.height);
      if(mo.otherDiretion){
        mo.x = mo.x * -1;
        this.ctx.restore();
      }
}

};