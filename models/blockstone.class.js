class Blockstone extends CollectableObject {

    constructor(imagepath,x,y) {
        super().loadImage(imagepath);
        this.x = x;
        this.y = y;
        this.offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };
    }

   /**
 * Increases the character's block energy by 1 when this item is collected.
 * @param {Character} character - The character collecting the item.
 * @private
 */
onCollect(character) {
    character.blockEnergy = (character.blockEnergy || 0) + 1;
}

}