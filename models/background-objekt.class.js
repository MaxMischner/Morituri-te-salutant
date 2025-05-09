class BackgroundObjekt extends MoveabelObject {
  
    height = 480;
    width = 720;
    


    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        
        this.x = x;
        this.y = y;

    }
}