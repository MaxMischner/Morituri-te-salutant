class VictoryScreenRenderer {
    constructor(world) {
        this.world = world;
    }

 /**
 * Draws the victory screen if the Endboss is defeated.
 * Renders the overlay, victory title, score, play again button, and stores button position.
 * @public
 */
draw() {
    const boss = this.world.level.enemies.find(e => e instanceof Endboss);
    if (!boss || !boss.isDead) return;
    this.prepareContext();
    this.drawVictoryOverlay();
    this.drawVictoryTitle();
    this.drawVictoryScore();
    this.drawVictoryButton();
    this.saveVictoryButtonPosition();
    this.world.ctx.restore();
}

/**
 * Prepares the canvas context for drawing the victory screen.
 * Resets the transform and saves the current context state.
 * @private
 */
prepareContext() {
    this.world.ctx.save();
    this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Draws a semi-transparent black overlay over the entire screen for the victory screen.
 * @private
 */
drawVictoryOverlay() {
    this.world.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
}

/**
 * Draws the "VICTORY" title text at the top center of the victory screen.
 * Uses yellow color with shadow effect.
 * @private
 */
drawVictoryTitle() {
    this.world.ctx.fillStyle = "#ffff66";
    this.world.ctx.font = "bold 70px Arial";
    this.world.ctx.textAlign = "center";
    this.world.ctx.shadowColor = "#000";
    this.world.ctx.shadowBlur = 10;
    this.world.ctx.fillText("VICTORY", this.world.canvas.width / 2, this.world.canvas.height / 2 - 80);
}

/**
 * Draws the player's score in the center of the victory screen.
 * Displays "Your Score: <score>".
 * @private
 */
drawVictoryScore() {
    const score = this.world.character.score || 0;
    this.world.ctx.font = "30px Arial";
    this.world.ctx.shadowBlur = 5;
    this.world.ctx.fillStyle = "#fff";
    this.world.ctx.fillText(`Your Score: ${score}`, this.world.canvas.width / 2, this.world.canvas.height / 2);
}

/**
 * Draws the "PLAY AGAIN" button on the victory screen.
 * Draws a rectangle with border and label centered below the score.
 * @private
 */
drawVictoryButton() {
    const btnX = this.world.canvas.width / 2 - 100;
    const btnY = this.world.canvas.height / 2 + 60;
    const btnW = 200;
    const btnH = 50;
    this.world.ctx.shadowBlur = 0;
    this.world.ctx.fillStyle = "#222";
    this.world.ctx.fillRect(btnX, btnY, btnW, btnH);
    this.world.ctx.strokeStyle = "#fff";
    this.world.ctx.strokeRect(btnX, btnY, btnW, btnH);
    this.world.ctx.fillStyle = "#fff";
    this.world.ctx.font = "24px Arial";
    this.world.ctx.fillText("PLAY AGAIN", this.world.canvas.width / 2, btnY + 33);
}

/**
 * Saves the position and size of the "PLAY AGAIN" button for interaction handling.
 * Stores the button data in `this.world.victoryButton`.
 * @private
 */
saveVictoryButtonPosition() {
    const x = this.world.canvas.width / 2 - 100;
    const y = this.world.canvas.height / 2 + 60;
    const width = 200;
    const height = 50;
    this.world.victoryButton = {
        x,
        y,
        width,
        height,
        visible: true
    };
}
}