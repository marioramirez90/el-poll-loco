/**
* Represents a moving background cloud.
* @extends MovableObject
*/
class Cloud extends MovableObject {
y = 30;
height = 350;
width = 600;

/**
* Creates a cloud at a random x position and starts movement.
*/
constructor() {
super().loadImage("img/5_background/layers/4_clouds/1.png");
this.x = Math.random() * 5000;
this.animate();
}

/**
* Starts the cloud's leftward movement animation.
*/
animate() {
setInterval(() => {
this.moveLeft();
}, 1000 / 60);
}
}