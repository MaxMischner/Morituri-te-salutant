
class World{
   
    character = new Character();
    level = createLevel1();
    debugMode = false;
    canvas;
    ctx;
    keyboard;
    isStunned;
    camera_x = 0;
    currentState;
    
    constructor(canvas, keyboard, gameStateManager) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.gameStarted = false;
    this.selectedCharacter = null;
    this.initCharacterSelection();
    this.initUIElements();
    this.ui = new UIRenderer(this);
    this.setupInput();
    this.checkCollisions();
    this.startBackground = new Image();
    this.startBackground.src = "img/Interface/1.png"; 
    this.gameStateManager = gameStateManager;
    this.renderer = new WorldRenderer(this);
}
initCharacterSelection() {
    this.characterSelection = [
        {
            name: "Hero 1",
            imgSrc: "./img/Heros/Gladiator_1/Idle_2/tile000.png",
            x: 200,     
            y: 180
        },
        {   name: "Hero 2",
            imgSrc: "./img/Heros/Gladiator_2/Idle_2/tile000.png",
            x: 450,      
            y: 180
        }
    ];
}

/**
 * Initializes the UI elements used in the game.
 * 
 * - Loads icons for block and score.
 * - Sets up the retry, victory, and play button configurations.
 * - Positions the play button based on canvas dimensions.
 */
initUIElements() {
    this.blockIcon = new Image();
    this.blockIcon.src = "./img/Collectebals/PNG/tile000.png";
    this.scoreIcon = new Image();
    this.scoreIcon.src = "img/Collectebals/PNG/shiny/5.png";
    this.retryButton = {x: 0, y: 0, width: 160, height: 40,visible: false};
    this.victoryButton = { x: 0, y: 0, width: 200, height: 50,visible: false};
    this.playButton = {x: this.canvas.width / 2 - 65, y: this.canvas.height / 2 - 25,
    width: 125,
    height: 75,
    visible: true
};
}

/**
 * Sets up input handling based on device type (touch or mouse).
 */
setupInput() {
    if (window.innerWidth < 720) {
        this.setupTouchInput();
    } else {
        this.setupMouseInput();
    }
}

/**
 * Sets up touch input handling for mobile devices.
 */
setupTouchInput() {
    this.canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const canvasX = (e.touches[0].clientX - rect.left) * scaleX;
        const canvasY = (e.touches[0].clientY - rect.top) * scaleY;
        this.handleInput(canvasX, canvasY);
    });
}

/**
 * Sets up mouse input handling for desktop devices.
 */
setupMouseInput() {
    this.canvas.addEventListener("click", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.handleInput(x, y);
    });
}

/**
 * Handles input logic based on the current game state.
 * Delegates to state-specific input handlers.
 * 
 * @param {number} x - X coordinate of the input.
 * @param {number} y - Y coordinate of the input.
 */
handleInput(x, y) {
    if (this.gameStateManager.currentState === 'start') {
        this.handleStartScreenInput(x, y);
        return;}
    if (this.gameStateManager.currentState === 'menu') {
        this.handleMenuInput(x, y);
        return;}
    this.handleInGameButtonInput(x, y);
}

/**
 * Handles input during the start screen.
 * 
 * @param {number} x - X coordinate of the input.
 * @param {number} y - Y coordinate of the input.
 */
handleStartScreenInput(x, y) {
    if (this.ui.isInside(x, y, this.playButton)) {
        this.gameStateManager.setCurrentState('menu');
    }
}

/**
 * Handles input during the character selection menu.
 * 
 * @param {number} x - X coordinate of the input.
 * @param {number} y - Y coordinate of the input.
 */
handleMenuInput(x, y) {
    for (let char of this.characterSelection) {
        if (x >= char.x && x <= char.x + 100 &&
            y >= char.y && y <= char.y + 100) {
            this.selectedCharacter = char.name;
            this.gameStateManager.startGameWithCharacter(char.name);
            return;
        }
    }
}

/**
 * Handles input for sound, retry, and victory buttons during gameplay.
 * 
 * @param {number} x - X coordinate of the input.
 * @param {number} y - Y coordinate of the input.
 */
handleInGameButtonInput(x, y) {
    if (this.ui.isInside(x, y, this.ui.soundButton)) {
        soundManager.toggleSound();
        return;}
    if (this.retryButton.visible && this.ui.isInside(x, y, this.retryButton)) {
        this.restartGame();
        return; }
    if (this.victoryButton.visible && this.ui.isInside(x, y, this.victoryButton)) {
        this.restartGame();}
}

/**
 * Links the current world instance to the player character and all enemies.
 * 
 * - Sets `enemy.world` and `character.world` to this instance.
 * - If an enemy is an Endboss, starts its animation.
 */
setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
        enemy.world = this;
        if (enemy instanceof Endboss) {
            enemy.animate();
        }
    });
}

/**
 * Checks all collisions in the game world.
 * 
 * - Detects player attacks on enemies.
 * - Detects player collisions with collectable objects.
 */
checkCollisions() {
    this.checkEnemyHits();
    this.checkCollectables();
}

/**
 * Checks and processes collisions between the player character and enemies.
 * 
 * - If the player is attacking and in an active attack frame, checks for hits on enemies.
 * - Damages enemies that are hit.
 * - Allows alive enemies to attempt an attack on the player.
 */
checkEnemyHits() {
    this.level.enemies.forEach(enemy => {
        if (this.character.isAttacking && this.character.isAttackFrameActive()) {
            if (this.character.hit(enemy)) {
                enemy.takeDamage(); }
        } if (!enemy.isDead) {
            enemy.tryAttack(this.character);
        }
    });
}

/**
 * Checks for collisions between the player character and collectable objects.
 * 
 * - If a collectable is collided with, it triggers its collection effect.
 * - The collectable is then removed from the level.
 */
checkCollectables() {
    this.level.collectableObjects.forEach((collectable, index) => {
        if (this.character.isColliding(collectable)) {
            collectable.onCollect(this.character);
            this.level.collectableObjects.splice(index, 1);
        }
    });
}

 /**
 * Renders the game world and UI based on the current game state.
 */
draw() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentState = this.gameStateManager.currentState;
    if (currentState === 'start') {
        this.drawStartScreen();
    } else if (currentState === 'menu') {
        this.drawMenuScreen();
    } else if (currentState === 'playing') {
        this.renderer.drawPlayingState();
    }ctx.restore();
}

/**
 * Renders the start screen UI.
 */
drawStartScreen() {
    this.ui.drawStartScreen();
}

/**
 * Renders the character selection menu.
 */
drawMenuScreen() {
    this.ui.drawStartMenu(this.characterSelection, this.selectedCharacter);
}

/**
 * Logs stunned enemies to the console for debugging.
 */
logStunnedEnemies() {
    this.level.enemies.forEach(enemy => {
        if (enemy.isStunned) console.log("Stunned enemy:", enemy);
    });
}

/**
 * Starts the cloud spawning loop with spawn control.
 * 
 * - Maintains a list of active clouds in `level.clouds`.
 * - Ensures no more than 15 clouds are present and no more than 3 are spawning concurrently.
 * - Spawns clouds at random horizontal positions beyond `level_end_x` and random vertical positions.
 * - Uses an internal recursive function (`spawnCloud`) with timeouts to schedule the spawns.
 */
startCloudSpawner() {
    let concurrentSpawns = 0;
    const spawnCloud = () => {
        this.level.clouds = this.level.clouds.filter(cloud => cloud.x > -cloud.width);
        if (this.level.clouds.length < 15 && concurrentSpawns < 3) {
            concurrentSpawns++;
            let cloud = new Cloud();
            cloud.x = this.level.level_end_x + Math.random() * 200;
            cloud.y = 50 + Math.random() * 100;
            this.level.clouds.push(cloud);
            setTimeout(() => { concurrentSpawns--; }, 3000);}
        let nextSpawn = 20000 + Math.random() * 30000;
        setTimeout(spawnCloud, nextSpawn); };
    spawnCloud(); 
}

/**
 * Restarts the current game session.
 * 
 * - Hides retry and victory buttons.
 * - Calls `resetLevelAndRestartCharacter()` to reset the level and player character.
 */
restartGame() {
    this.retryButton.visible = false;
    this.victoryButton.visible = false;
    this.gameStateManager.resetLevelAndRestartCharacter();
}

/**
 * Starts the main rendering loop and initializes the cloud spawner.
 * 
 * - Begins the `requestAnimationFrame` loop to continuously render the game world.
 * - Stores the animation frame ID for later cancellation.
 * - Starts the cloud spawner after a 5-second delay.
 */
start() {
    const loop = () => {
        this.draw();
        this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    setTimeout(() => {
        this.startCloudSpawner();
    }, 5000);
}

/**
 * Stops the main rendering loop.
 * 
 * - Cancels the current `requestAnimationFrame` loop.
 * - Resets `animationFrameId` to null.
 */
stopDrawingLoop() {
    if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
}

/**
 * Stops any running world-related timers.
 * 
 * - Cancels the cloud spawning timeout (if active).
 * - Resets `cloudTimeoutId` to null.
 */
stopWorldTimers() {
    if (this.cloudTimeoutId) {
        clearTimeout(this.cloudTimeoutId);
        this.cloudTimeoutId = null;
    }
}
}