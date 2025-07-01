class Blockstone extends CollectableObject {

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
 * Increases the character's block energy by 1 when this item is collected.
 * @param {Character} character - The character collecting the item.
 * @private
 */
onCollect(character) {
    character.blockEnergy = (character.blockEnergy || 0) + 1;
}

}