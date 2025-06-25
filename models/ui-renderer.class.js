class UIRenderer {

    constructor(world) {
        this.world = world;
        this.healthBarRenderer = new HealthBarRenderer(world);
        this.scoreRenderer = new ScoreRenderer(world);
        this.bossHealthRenderer = new BossHealthRenderer(world);
        this.menuRenderer = new MenuRenderer(world);
        this.gameOverRenderer = new GameOverRenderer(world);
        this.victoryScreenRenderer = new VictoryScreenRenderer(world);
        this.soundButton = {
            x: 230, 
            y: 20,
            width: 30,
            height: 30,
            iconOn: new Image(),
            iconOff: new Image()
        };
        this.soundButton.iconOn.src = "img/Interface/Icons_31.png";
        this.soundButton.iconOff.src = "img/Interface/Icons_29.png";
    }

/**
 * Checks if the given point (x, y) is inside the specified rectangle.
 * @param {number} x - The X coordinate of the point.
 * @param {number} y - The Y coordinate of the point.
 * @param {{x: number, y: number, width: number, height: number}} rect - The rectangle to check against.
 * @returns {boolean} True if the point is inside the rectangle, false otherwise.
 * @public
 */
isInside(x, y, rect) {
    return (
        x >= rect.x &&
        x <= rect.x + rect.width &&
        y >= rect.y &&
        y <= rect.y + rect.height
    );
}

/**
 * Draws all UI elements on the screen.
 * Calls the respective draw methods of the various UI renderers and draws the sound button.
 * @public
 */
drawAll() {
    this.healthBarRenderer.draw();
    this.scoreRenderer.draw();
    this.bossHealthRenderer.draw();
    this.gameOverRenderer.draw();
    this.victoryScreenRenderer.draw();
    this.drawSoundButton();
}

/**
 * Draws the start menu with the given character selection options and the currently selected character.
 * @param {Array<Object>} characterSelection - The list of available character objects.
 * @param {string} selectedCharacter - The name of the currently selected character.
 * @public
 */
drawStartMenu(characterSelection, selectedCharacter) {
    this.menuRenderer.draw(characterSelection, selectedCharacter);
}

/**
 * Draws the sound toggle button on the screen.
 * Displays either the "sound on" or "sound off" icon depending on the current sound state.
 * Skips drawing if the icons are not yet loaded.
 * @public
 */
drawSoundButton() {
    const ctx = this.world.ctx;
    const btn = this.soundButton;
    if (!btn.iconOn.complete || !btn.iconOff.complete) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const icon = soundManager.enabled ? btn.iconOn : btn.iconOff;
    ctx.drawImage(icon, btn.x, btn.y, btn.width, btn.height);
    ctx.restore();
}

/**
 * Draws the start screen by rendering background, game title, and play button.
 * @public
 */
drawStartScreen() {
    const ctx = this.world.ctx;
    const canvas = this.world.canvas;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.drawStartBackground(canvas);
    this.drawGameTitle(canvas);
    this.drawPlayButton(ctx);
    ctx.restore();
}

/**
 * Draws the start screen background image or a fallback color if not loaded.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @private
 */
drawStartBackground(canvas) {
    const ctx = this.world.ctx;
    if (this.menuRenderer.startBackground.complete) {
        ctx.drawImage(this.menuRenderer.startBackground, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#1a1aff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Draws the game title on the start screen.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @private
 */
drawGameTitle(canvas) {
    const ctx = this.world.ctx;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Morituri te salutant", canvas.width / 2, 40);
}

/**
 * Draws the play button with an image or fallback and label.
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
 * @private
 */
drawPlayButton(ctx) {
    const btn = this.world.playButton;
    if (!this.playButtonImage) {
        this.playButtonImage = new Image();
        this.playButtonImage.src = "img/Interface/69.png";}
    if (this.playButtonImage.complete) {
        ctx.drawImage(this.playButtonImage, btn.x, btn.y, btn.width, btn.height);
    } else {
        ctx.fillStyle = "#f00";
        ctx.fillRect(btn.x, btn.y, btn.width, btn.height);}
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Play", btn.x + btn.width / 2, btn.y + btn.height / 2 + 8);
}
}