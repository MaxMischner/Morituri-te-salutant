class HealthBarRenderer {
    constructor(world) {
        this.world = world;
    }

    /**
 * Draws the character's health bar and block icons on the screen.
 * Skips drawing if no character is present or if character energy is undefined.
 * @public
 */
draw() {
    if (!this.world.character || this.world.character.energy === undefined) return;

    this.prepareContext();
    this.drawHealthBarBackground();
    this.drawHealthBarFill(this.world.character.energy);
    this.drawHealthBarFrame();
    this.drawBlockIcons();
    this.world.ctx.restore();
}


/**
 * Prepares the canvas context for drawing the health bar.
 * Resets the transform and saves the current context state.
 * @private
 */
prepareContext() {
    this.world.ctx.save();
    this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
}


/**
 * Draws the background rectangle of the health bar.
 * @private
 */
drawHealthBarBackground() {
    this.world.ctx.fillStyle = "#444";
    this.world.ctx.fillRect(20, 20, 200, 20);
}

/**
 * Draws the filled portion of the health bar based on the character's current energy.
 * The fill uses a gradient from green to red to indicate health level.
 * @param {number} energy - The current energy value of the character.
 * @private
 */
drawHealthBarFill(energy) {
    const maxEnergy = 100;
    const energyPercent = Math.max(0, energy / maxEnergy);
    const barWidth = 200 * energyPercent;

    const gradient = this.world.ctx.createLinearGradient(20, 20, 220, 20);
    gradient.addColorStop(1.0, "#0f0");
    gradient.addColorStop(0.5, "#ff0");
    gradient.addColorStop(0.0, "#f00");

    this.world.ctx.fillStyle = gradient;
    this.world.ctx.fillRect(20, 20, barWidth, 20);
}

/**
 * Draws the frame (border) around the health bar.
 * @private
 */
drawHealthBarFrame() {
    this.world.ctx.strokeStyle = "#000";
    this.world.ctx.lineWidth = 2;
    this.world.ctx.strokeRect(20, 20, 200, 20);
}

/**
 * Draws block energy icons on the screen based on the character's current block energy.
 * Skips drawing if block energy or block icon is not available.
 * @private
 */
drawBlockIcons() {
    if (!this.world.character || this.world.character.blockEnergy === undefined) return;
    if (!this.world.blockIcon || !this.world.blockIcon.complete) return;

    const iconSize = 20;
    const spacing = 4;
    const startX = 20;
    const y = 50;

    for (let i = 0; i < this.world.character.blockEnergy; i++) {
        const x = startX + i * (iconSize + spacing);
        this.world.ctx.drawImage(this.world.blockIcon, x, y, iconSize, iconSize);
    }
}

}