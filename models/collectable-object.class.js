class CollectableObject extends MoveabelObject {

    width = 50;
    height = 50;

    onCollect(character) {
        // Wird in den Unterklassen überschrieben
        console.log("Item aufgesammelt!");
    }

}