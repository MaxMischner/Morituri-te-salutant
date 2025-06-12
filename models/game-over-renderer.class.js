class GameOverRenderer {
    constructor(world) {
        this.world = world;
    }

  /**
 * Draws the game over screen if the character is dead.
 * Includes overlay, death title, retry button, and stores retry button position.
 * @public
 */
draw() {
    if (!this.world.character || !this.world.character.isDead) return;

    this.drawOverlay();
    this.drawDeathTitle();
    this.drawRetryButton();
    this.saveRetryButtonPosition();
}

/**
 * Draws a semi-transparent black overlay on the entire screen.
 * @param {number} [opacity=0.5] - The opacity of the overlay (0 to 1).
 * @private
 */
drawOverlay(opacity = 0.5) {
    this.world.ctx.save();
    this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.world.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
    this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
}

/**
 * Draws the animated "YOU DIED..." title in the center of the screen.
 * Uses a floating transform effect for position and scale.
 * @private
 */
drawDeathTitle() {
    const { x, y, scale } = this.getFloatingTitleTransform();
    this.world.ctx.translate(x, y);
    this.world.ctx.scale(scale, scale);
    this.drawCenteredShadowText("YOU DIED...", "bold 64px Arial", "#ff4444");
}

/**
 * Calculates the current transform (position and scale) for the floating death title animation.
 * Adds a vertical offset and scale oscillation based on time.
 * @returns {{x: number, y: number, scale: number}} The transform values for positioning and scaling the title.
 * @private
 */
getFloatingTitleTransform() {
    const time = Date.now() / 500;
    const offset = Math.sin(time) * 3;
    const scale = 1 + Math.sin(time) * 0.03;

    return {
        x: this.world.canvas.width / 2,
        y: this.world.canvas.height / 2 + offset,
        scale
    };
}

/**
 * Draws centered text with a shadow effect at the current canvas transform position (0, 0).
 * @param {string} text - The text to draw.
 * @param {string} font - The font style to use (e.g., "bold 64px Arial").
 * @param {string} color - The fill color for the text.
 * @private
 */
drawCenteredShadowText(text, font, color) {
    this.world.ctx.fillStyle = color;
    this.world.ctx.font = font;
    this.world.ctx.textAlign = "center";
    this.world.ctx.shadowColor = "#000";
    this.world.ctx.shadowBlur = 10;
    this.world.ctx.fillText(text, 0, 0);
}

/**
 * Draws the "RETRY" button centered on the screen.
 * The button is a rectangle with a label and no shadow.
 * @private
 */
drawRetryButton() {
    this.world.ctx.shadowBlur = 0;
    this.world.ctx.fillStyle = "#222";
    this.world.ctx.fillRect(-80, 60, 160, 40);
    this.world.ctx.strokeStyle = "#fff";
    this.world.ctx.strokeRect(-80, 60, 160, 40);
    this.world.ctx.fillStyle = "#fff";
    this.world.ctx.font = "20px Arial";
    this.world.ctx.fillText("RETRY", 0, 87);
    this.world.ctx.restore();
}

/**
 * Calculates and stores the position and size of the "RETRY" button in the world object.
 * This is used for detecting button clicks.
 * @private
 */
saveRetryButtonPosition() {
    const x = this.world.canvas.width / 2 - 80;
    const y = this.world.canvas.height / 2 + 60;
    const width = 160;
    const height = 40;

    this.world.retryButton = {
        x, y, width, height, visible: true
    };
}

}