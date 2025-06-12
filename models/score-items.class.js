class ScoreItem extends CollectableObject {

    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        
        this.x = x;
        this.y = y;
    }

   /**
 * Increases the character's score by 100 points when the item is collected.
 * @param {Character} character - The character who collects the item.
 * @public
 */
onCollect(character) {
    character.score = (character.score || 0) + 100; // add 100 points
    console.log("Punkte +100!");
}

}