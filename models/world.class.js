class World {
   
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.camera_x = 0;
        

        this.character = new Character();
        this.level = level1;
        this.debugMode = true;

        this.ui = new UIRenderer(this);
        this.collisionManager = new CollisionManager(this);
        this.cloudManager = new CloudManager(this);
        this.debugRenderer = new DebugRenderer(this);
        this.objectRenderer = new ObjectRenderer(this);
        this.gameStateManager = new GameStateManager(this);
        this.characterSelectionManager = new CharacterSelectionManager(this);
        this.inputManager = new InputManager(this);

        this.setWorld();
        this.gameStarted = false;
        this.selectedCharacter = null;

        this.characterSelectionManager.initCharacterSelection();
        this.initUIElements();
        this.inputManager.setupInput();
        this.collisionManager.checkCollisions();

        this.startBackground = new Image();
        this.startBackground.src = "img/Interface/1.png"; 
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });  
    }
    
    initUIElements() {
        this.blockIcon = new Image();
        this.blockIcon.src = "../img/Collectebals/PNG/tile000.png";

        this.scoreIcon = new Image();
        this.scoreIcon.src = "img/Collectebals/PNG/shiny/5.png";

        this.retryButton = {
            x: 0, y: 0, width: 160, height: 40,
            visible: false
        };

        this.victoryButton = {
            x: 0, y: 0, width: 200, height: 50,
            visible: false
        };
    }

    draw() {
        const ctx = this.ctx;
        const canvas = this.canvas;

        // Zeichenfläche leeren
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ⬇️ Startmenü zuerst prüfen
        if (!this.gameStarted) {
            this.ui.drawStartMenu(this.characterSelectionManager.characterSelection, this.selectedCharacter);
            return;
        }

        // Kollisionen prüfen
        this.collisionManager.checkCollisions();
        this.cloudManager.updateClouds();

        // Kamera verschieben
        ctx.translate(this.camera_x, 0);

        // Landschaft & Objekte zeichnen
        this.objectRenderer.renderBackground(this.level.backgroundObjects);
        this.objectRenderer.renderGround(this.level.groundTiles);
        this.objectRenderer.renderClouds(this.level.clouds);

        this.objectRenderer.renderCharacter(this.character);
        this.objectRenderer.renderCollectables(this.level.collectableObjects);
        this.objectRenderer.renderEffects(this.level.activeEffects);
        this.objectRenderer.renderEnemies(this.level.enemies);

        // 🎨 UI-Elemente zeichnen (ausgelagert)
        this.ui.drawAll();

        // Kamera zurücksetzen
        ctx.translate(-this.camera_x, 0);

        // Debug-Modus (Hitboxen etc.)
        if (this.debugMode) {
            this.debugRenderer.renderDebugInfo();
        }
    }

    start() {
        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();

        // ⬇️ Hier STARTET der Cloud-Spawner nach 5 Sekunden
        setTimeout(() => {
            this.cloudManager.startCloudSpawner();
        }, 5000);
    }
racter = this.character;
    this.setWorld(); // falls du die Welt neu setzen musst
    this.character.animate();
}

start() {
    const loop = () => {
        this.draw();
        requestAnimationFrame(loop);
    };
    loop();

    // ⬇️ Hier STARTET der Cloud-Spawner nach 5 Sekunden
    setTimeout(() => {
        this.startCloudSpawner();
    }, 5000);
}
}