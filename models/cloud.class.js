class Cloud extends MoveabelObject{
    width= 200;
    speed = 0.2;

    constructor(){
        super().loadImage('./img/Clouds/Clouds_white/Shape2/cloud_shape2_1.png')
        this.x = 10 + Math.random() * 4000;
        this.y = 50 + Math.random() * 150;
        this.animate();
    }

/**
 * Starts the animation loop that continuously moves the object to the left.
 * This function runs at approximately 60 frames per second.
 */
animate() {
    setInterval(() => {
        this.moveLeft(false);
    }, 1000 / 60);
}  
}