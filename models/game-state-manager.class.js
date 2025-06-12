class GameStateManager {
    currentState;
    
    constructor(world) {
        this.world = world;
        this.currentState = 'start'; // Mögliche Zustände: 'menu', 'playing', 'paused', 'gameOver', 'victory'
    }

    /**
 * Starts the game with the selected character.
 * Initializes the character, sets up the world, and starts background music if enabled.
 * @param {string} characterName - The name of the selected character ("Hero 1" or "Hero 2").
 * @public
 */
startGameWithCharacter(characterName) {
    this.currentState = this.setCurrentState('playing');
    this.world.gameStarted = true;

    if (characterName === "Hero 1") {
        this.world.character = new Hero1();
    } else if (characterName === "Hero 2") {
        this.world.character = new Hero2();
    }
    
    this.world.level.character = this.world.character;
    this.world.setWorld();
    this.world.character.animate();

    if (soundManager.enabled) {
        soundManager.music.play();
    }
}

/**
 * Sets the game state to 'victory' and stops the game.
 * Additional victory actions (e.g., saving score or achievements) can be implemented here.
 * @public
 */
setVictory() {
    console.log("Setting game state to victory");
    this.currentState = 'victory';
    this.world.gameStarted = false;
}

/**
 * Sets the game state to 'gameOver' and stops the game.
 * Additional game over actions (e.g., displaying statistics or restart options) can be implemented here.
 * @public
 */
setGameOver() {
    console.log("Setting game state to game over");
    this.currentState = 'gameOver';
    this.world.gameStarted = false;
}

/**
 * Ends the game and sets the appropriate game state based on the outcome.
 * @param {boolean} isVictory - True if the player won the game, false if the player lost.
 * @public
 */
endGame(isVictory) {
    if (isVictory) {
        this.setVictory();
    } else {
        this.setGameOver();
    }
}

/**
 * Sets the current game state and returns the new state.
 * @param {string} state - The new game state to set.
 * @returns {string} The newly set game state.
 * @public
 */
setCurrentState(state) {
    return this.currentState = state;
}

/**
 * Resets the level and restarts the game with the currently selected character.
 * If no character is selected, defaults to "Hero 1".
 * @public
 */
resetLevelAndRestartCharacter() {
    const selectedCharacter = this.selectedCharacter || "Hero 1";

    this.restartGameWithSelectedCharacter(selectedCharacter);
}

/**
 * Restarts the game with the specified character.
 * Sets the current state to 'playing', marks character selection as active, and reinitializes the game.
 * @param {string} characterName - The name of the character to restart the game with.
 * @public
 */
restartGameWithSelectedCharacter(characterName) {
    this.selectedCharacter = characterName;
    this.characterSelection = true;
    this.currentState = 'playing';

    init();
}

/**
 * Sets the world instance for the game state manager.
 * @param {World} world - The world instance to set.
 * @public
 */
setWorld(world) {
    this.world = world;
}

/**
 * Clears the image cache of MoveableObject by resetting image sources and deleting all entries.
 * @public
 */
clearImageCache() {
    for (const key in MoveabelObject.imageCache) {
        const img = MoveabelObject.imageCache[key];
        if (img instanceof HTMLImageElement) {
            img.src = "";
        }
        delete MoveabelObject.imageCache[key];
    }
}

/**
 * Clears image references from character, enemies, and endboss to help with memory management.
 * @public
 */
clearImageReferences() {
    if (this.world?.character) {
        this.world.character.img = null;
    }

    if (this.world?.level?.enemies) {
        this.world.level.enemies.forEach(enemy => {
            enemy.img = null;
        });
    }

    if (this.world?.level?.endboss) {
        this.world.level.endboss.img = null;
    }
}


}