class ScoreRenderer {
    constructor(world) {
        this.world = world;
        this.initImages();
    }

/**
 * Initializes the images used in the score display.
 * Loads the score icon image.
 * @private
 */
initImages() {
    this.scoreIcon = new Image();
    this.scoreIcon.src = "img/Collectebals/PNG/shiny/5.png";
}

 /**
 * Draws the score display on the screen.
 * Skips drawing if no character is present, if the score is undefined, or if the score icon is not ready.
 * @public
 */
draw() {
    if (!this.world.character || this.world.character.score === undefined) return;
    if (!this.scoreIcon || !this.scoreIcon.complete) return;
    this.prepareContext();
    this.drawScoreIconAndText(this.world.character.score);
    this.world.ctx.restore();
}

  /**
 * Prepares the canvas context for drawing the score display.
 * Resets the transform and saves the current context state.
 * @private
 */
prepareContext() {
    this.world.ctx.save();
    this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Draws the score icon and the current score value on the screen.
 * @param {number} score - The current score value to display.
 * @private
 */
drawScoreIconAndText(score) {
    const iconSize = 32;
    const x = 20;
    const y = 80;
    this.world.ctx.drawImage(this.scoreIcon, x, y, iconSize, iconSize);
    this.world.ctx.fillStyle = "#fff";
    this.world.ctx.font = "20px Arial";
    this.world.ctx.textAlign = "left";
    this.world.ctx.fillText(`${score}`, x + iconSize + 10, y + iconSize - 8);
}
}