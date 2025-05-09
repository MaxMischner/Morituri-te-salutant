class GroundTile extends MoveabelObject {
    

    constructor(imagepath, x, y) {
        super().loadImage(imagepath);
        this.x = x;
        this.y = y;
        this.width = 32;   
        this.height = 32;  
    }

    draw(ctx, camera_x = 0) {
        ctx.drawImage(this.img, this.x - camera_x, this.y, this.width, this.height);
    }
}

