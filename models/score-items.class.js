class ScoreItem extends CollectableObject {

    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        this.x = x;
        this.y = y;
        this.offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };
    }

   /**
 * Increases the character's score by 100 points when the item is collected.
 * @param {Character} character - The character who collects the item.
 * @public
 */
onCollect(character) {
    character.score = (character.score || 0) + 100; 
    
}
}