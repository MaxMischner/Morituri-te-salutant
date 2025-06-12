class GroundTile extends MoveabelObject {
    

    constructor(imagepath, x, y) {
        super().loadImage(imagepath);
        this.x = x;
        this.y = y;
        this.width = 32;   
        this.height = 32;  
    }

/**
 * Draws the object on the canvas at its current position, adjusted by the camera offset.
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
 * @param {number} [camera_x=0] - The horizontal camera offset.
 * @public
 */
draw(ctx, camera_x = 0) {
    ctx.drawImage(this.img, this.x - camera_x, this.y, this.width, this.height);
}

}

