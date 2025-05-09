class ScoreItem extends CollectableObject {

    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        
        this.x = x;
        this.y = y;
    }

    onCollect(character) {
        character.score = (character.score || 0) + 100; // Punkte +100
        console.log("Punkte +100!");
    }
}