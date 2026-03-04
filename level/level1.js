/** @type {Level} The Level instance holding all entities for level 1. */
let level1;
/**
 * Initializes level 1 with all enemies, clouds, coins, bottles and background layers.
 */
function initLevel1(){



level1 = new Level(
    [
    new Chicken(),
    new Smallchicken(),
    new Chicken(),
    new Smallchicken(),
    new Chicken(),
    new Chicken(),
    new Smallchicken(),
    new Smallchicken(),
    new Smallchicken(),
    new Smallchicken(),
    new Chicken(),
    new Chicken(),
    new Smallchicken(),
    new Smallchicken(),
    new Chicken(),
    new Chicken(),
    new Smallchicken(),
    new Smallchicken(),
    new Chicken(),
    new Chicken(),
    new Endboss()
   
],
[
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud()
   
],

[
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins()
    


  
    
   
],

[
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle(),
    new Bottle()


],
 [
    
    new BackgroundObject('img/5_background/layers/air.png',-960*2, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -960*2, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -960*2, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -960*2, 1),

    new BackgroundObject('img/5_background/layers/air.png',-960, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -960, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -960, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -960, 1),

    new BackgroundObject('img/5_background/layers/air.png',0, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0, 1),

    new BackgroundObject('img/5_background/layers/air.png',960, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 960, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 960, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 960, 1),

    new BackgroundObject('img/5_background/layers/air.png',960*2, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 960*2, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 960*2, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 960*2, 1),

    new BackgroundObject('img/5_background/layers/air.png',960*3, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 960*3, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 960*3, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 960*3, 1),

    new BackgroundObject('img/5_background/layers/air.png',960*4, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 960*4, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 960*4, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 960*4, 1),

    new BackgroundObject('img/5_background/layers/air.png',960*5, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 960*5, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 960*5, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 960*5, 1),
     
    new BackgroundObject('img/5_background/layers/air.png',960*6, 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 960*6, 0.3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 960*6, 0.6),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 960*6, 1),

]
);

}