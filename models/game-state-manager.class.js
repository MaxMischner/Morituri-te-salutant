class GameStateManager {
    constructor(world) {
        this.world = world;
        this.currentState = 'menu'; // Mögliche Zustände: 'menu', 'playing', 'paused', 'gameOver', 'victory'
    }

    startGameWithCharacter(characterName) {
        this.currentState = 'playing';
        this.world.gameStarted = true;

        if (characterName === "Hero 1") {
            this.world.character = new Hero1();
        } else if (characterName === "Hero 2") {
            this.world.character = new Hero2();
        }
        
        this.world.level.character = this.world.character;
        this.world.setWorld();
        this.world.character.animate();
    }

    restartGame() {
        this.currentState = 'menu';
        this.world.gameStarted = false;
        this.world.character = null;
        this.victoryStateSet = false;
    }

    setVictory() {
        console.log("Setting game state to victory");
        this.currentState = 'victory';
        this.world.gameStarted = false;
        // Hier können Sie weitere Aktionen für den Sieg implementieren
        // z.B. Punktestand speichern, Erfolge freischalten, etc.
    }

    setGameOver() {
        console.log("Setting game state to game over");
        this.currentState = 'gameOver';
        this.world.gameStarted = false;
        // Hier können Sie weitere Aktionen für das Spielende implementieren
        // z.B. Statistiken speichern, Neustart-Option anzeigen, etc.
    }

    endGame(isVictory) {
        if (isVictory) {
            this.setVictory();
        } else {
            this.setGameOver();
        }
    }

    getCurrentState() {
        return this.currentState;
    }

    // Weitere Methoden können hier hinzugefügt werden
}