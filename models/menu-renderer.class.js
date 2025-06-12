class MenuRenderer {
    constructor(world) {
        this.world = world;
        this.initImages();
    }

   /**
 * Initializes the images used in the start menu.
 * Loads the background image for the start screen.
 * @private
 */
initImages() {
    this.startBackground = new Image();
    this.startBackground.src = "img/Interface/1.png";
}

/**
 * Draws the start menu screen, including background, title, and character selection options.
 * @param {boolean} characterSelection - Whether the character selection screen is active.
 * @param {string} selectedCharacter - The name of the currently selected character.
 * @public
 */
draw(characterSelection, selectedCharacter) {
    this.prepareContext();
    this.drawStartBackground();
    this.drawStartTitle();
    this.drawCharacterOptions(characterSelection, selectedCharacter);
    this.world.ctx.restore();
}

/**
 * Prepares the canvas context for drawing the menu screen.
 * Resets the transform and saves the current context state.
 * @private
 */
prepareContext() {
    this.world.ctx.save();
    this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Draws the start menu background image.
 * If the image is not yet loaded, draws a solid blue background instead.
 * @private
 */
drawStartBackground() {
    if (this.startBackground.complete) {
        this.world.ctx.drawImage(this.startBackground, 0, 0, this.world.canvas.width, this.world.canvas.height);
    } else {
        this.world.ctx.fillStyle = "#1a1aff";
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }
}

/**
 * Draws the start menu title "Choose Your Character" at the top center of the screen.
 * @private
 */
drawStartTitle() {
    this.world.ctx.fillStyle = "#fff";
    this.world.ctx.font = "bold 30px Arial";
    this.world.ctx.textAlign = "center";
    this.world.ctx.textBaseline = "middle";
    this.world.ctx.fillText("Choose Your Character", this.world.canvas.width / 2, 30);
}

/**
 * Draws the available character options on the screen.
 * For each character, draws its image and name, and highlights the selected character.
 * @param {Array<Object>} characterSelection - The list of available character objects.
 * @param {string} selectedCharacter - The name of the currently selected character.
 * @private
 */
drawCharacterOptions(characterSelection, selectedCharacter) {
    characterSelection.forEach(char => {
        if (!char.img) {
            char.img = new Image();
            char.img.src = char.imgSrc;
        }

        if (char.img.complete) {
            this.world.ctx.drawImage(char.img, char.x, char.y, 100, 100);
        }

        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = "20px Arial";
        this.world.ctx.fillText(char.name, char.x + 50, char.y + 130);

        if (selectedCharacter === char.name) {
            this.drawSelectionHighlight(char);
        }
    });
}

/**
 * Draws a yellow highlight frame around the selected character.
 * @param {Object} char - The character object to highlight.
 * @private
 */
drawSelectionHighlight(char) {
    this.world.ctx.strokeStyle = "#ffff00";
    this.world.ctx.lineWidth = 3;
    this.world.ctx.strokeRect(char.x - 5, char.y - 5, 110, 110);
}

}