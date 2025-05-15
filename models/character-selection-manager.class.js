class CharacterSelectionManager {
    constructor(world) {
        this.world = world;
        this.characterSelection = [];
    }

    initCharacterSelection() {
        this.characterSelection = [
            {
                name: "Hero 1",
                imgSrc: "img/Heros/Gladiator_1/Idel/tile000.png",
                x: 200,
                y: 200
            },
            {
                name: "Hero 2",
                imgSrc: "img/Heros/Gladiator_2/Idel/tile000.png",
                x: 400,
                y: 200
            }
        ];
    }

    handleCharacterSelection(x, y) {
        for (let char of this.characterSelection) {
            if (x >= char.x && x <= char.x + 100 && y >= char.y && y <= char.y + 100) {
                this.world.gameStateManager.startGameWithCharacter(char.name);
                break;
            }
        }
    }
}