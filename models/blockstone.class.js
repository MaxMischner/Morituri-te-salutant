class Blockstone extends CollectableObject {

    

    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        
        this.x = x;
        this.y = y;
    }

    onCollect(character) {
        character.blockEnergy = (character.blockEnergy || 0) + 1; // Blockenergie +1
        console.log("Blockenergie +1!");
    }
}