class GameStateManager {
    currentState;
    
    constructor(world) {
        this.world = world;
        this.currentState = 'start'; // Mögliche Zustände: 'menu', 'playing', 'paused', 'gameOver', 'victory'
    }

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

    setCurrentState(state) {
    return this.currentState = state;
}


resetLevelAndRestartCharacter() {
    // Nur: Aktuell gewählten Character merken
    const selectedCharacter = this.selectedCharacter || "Hero 1"; // fallback falls undefined

    // Dann → kompletten neuen Gameflow starten
    this.restartGameWithSelectedCharacter(selectedCharacter);
}


restartGameWithSelectedCharacter(characterName) {
    this.selectedCharacter = characterName; // "Hero 1" oder "Hero 2"
    this.characterSelection = true;
    this.currentState = 'playing';

    // → rufe dein init/startGame erneut auf:
    init(); // oder startGame(), je nachdem wie du es gebaut hast
}


setWorld(world) {
    this.world = world;
}









clearImageCache() {
    for (const key in MoveabelObject.imageCache) {
        const img = MoveabelObject.imageCache[key];
        if (img instanceof HTMLImageElement) {
            img.src = "";
        }
        delete MoveabelObject.imageCache[key];
    }
}

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