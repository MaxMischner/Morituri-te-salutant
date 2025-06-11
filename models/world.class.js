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
     


}
initCharacterSelection() {
    this.characterSelection = [
        {
            name: "Hero 1",
            imgSrc: "../img/Heros/Gladiator_1/Idle_2/tile000.png",
            x: 200,     
        y: 180
        },
        {
            name: "Hero 2",
            imgSrc: "../img/Heros/Gladiator_2/Idle_2/tile000.png",
            x: 450,      
        y: 180
        }
    ];
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

    this.playButton = {
    x: this.canvas.width / 2 - 65,
    y: this.canvas.height / 2 - 25,
    width: 125,
    height: 75,
    visible: true
};

}
setupInput() {

    // Prüfe ob Bildschirm kleiner als 720px ist
    if (window.innerWidth < 720) {

        // → Touchsteuerung aktivieren
        this.canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
const scaleY = this.canvas.height / rect.height;

const canvasX = (e.touches[0].clientX - rect.left) * scaleX;
const canvasY = (e.touches[0].clientY - rect.top) * scaleY;

this.handleInput(canvasX, canvasY); // wir lagern es in handleInput aus → gleiche Logik wie click
        });

    } else {

        // → Maussteuerung aktivieren
        this.canvas.addEventListener("click", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.handleInput(x, y);
        });

    }
}
handleInput(x, y) {
    if (this.gameStateManager.currentState === 'start') {
        if (this.ui.isInside(x, y, this.playButton)) {
            this.gameStateManager.setCurrentState('menu');
        }
        return;
    }

    if (this.gameStateManager.currentState === 'menu') {
        for (let char of this.characterSelection) {
            if (x >= char.x && x <= char.x + 100 &&
                y >= char.y && y <= char.y + 100) {
                this.selectedCharacter = char.name;
                this.gameStateManager.startGameWithCharacter(char.name);
                return;
            }
        }
        return;
    }

    if (this.ui.isInside(x, y, this.ui.soundButton)) {
        soundManager.toggleSound();
        return;
    }

    if (this.retryButton.visible && this.ui.isInside(x, y, this.retryButton)) {
        this.restartGame();
        return;
    }

    if (this.victoryButton.visible && this.ui.isInside(x, y, this.victoryButton)) {
        this.restartGame();
        return;
    }
}





    setWorld(){
        this.character.world = this;
    
       this.level.enemies.forEach(enemy => {
    enemy.world = this;
    if (enemy instanceof Endboss) {
        enemy.animate();
    }
});  
    }
    
    

checkCollisions() {
    this.checkEnemyHits();
    this.checkCollectables();
}
checkEnemyHits() {
    this.level.enemies.forEach(enemy => {
        if (this.character.isAttacking && this.character.isAttackFrameActive()) {
            if (this.character.hit(enemy)) {
                enemy.takeDamage();
            }
        }

        if (!enemy.isDead) {
            enemy.tryAttack(this.character);
        }
    });
}

checkCollectables() {
    this.level.collectableObjects.forEach((collectable, index) => {
        if (this.character.isColliding(collectable)) {
            collectable.onCollect(this.character);
            this.level.collectableObjects.splice(index, 1);
        }
    });
}
 
  draw() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentState = this.gameStateManager.currentState;

    if (currentState === 'start') {
        this.ui.drawStartScreen();
        ctx.restore();
        return;
    }

    if (currentState === 'menu') {
        this.ui.drawStartMenu(this.characterSelection, this.selectedCharacter);
        ctx.restore();
        return;
    }

    if (currentState === 'playing') {

    // Kollisionen prüfen
    this.checkCollisions();

    // Alte Wolken entfernen
    this.level.clouds = this.level.clouds.filter(cloud => cloud.x > -cloud.width);

    // Kamera verschieben
    ctx.translate(this.camera_x, 0);

    // Landschaft & Objekte zeichnen
    this.addObjektToMap(this.level.backgroundObjects);
    this.addObjektToMap(this.level.groundTiles);
    this.addObjektToMap(this.level.clouds);

    this.addToMap(this.character);
    this.addObjektToMap(this.level.collectableObjects);
    this.addObjektToMap(this.level.activeEffects);

    // Gegner + Richtungszeichnung
    this.addEnemisDirektion(this.level.enemies);

    // 🎨 UI-Elemente zeichnen (ausgelagert)
    this.ui.drawAll();

    // Gestunnte Gegner debuggen
    this.level.enemies.forEach(enemy => {
        if (enemy.isStunned) console.log("Gestunnter Gegner:", enemy);
    });

    // Kamera zurücksetzen
    ctx.translate(-this.camera_x, 0);

    // Debug-Modus (Hitboxen etc.)
    if (this.debugMode) {
        this.level.enemies.forEach(enemy => this.drawOffsetBox(enemy));
        this.drawOffsetBox(this.character);
    }
    ctx.restore();
}
}



    addObjektToMap(objekts){
        objekts.forEach(o =>{
            this.addToMap(o);
            
        });
    }

   addEnemisDirektion(enemies) {
    enemies.forEach(mo => {
        if (!mo.img) return;

        this.ctx.save();

        if (mo.isStunned) {
            // Nur Stun-Effekt zeichnen (inkl. Spiegelung + Bild)
            mo.showStunEffect();
        } else {
            // Normale Gegnerzeichnung (inkl. Spiegelung)
            if (mo.otherDiretion) {
                this.ctx.translate(mo.x + mo.width, mo.y);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
            } else {
                this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            }
        }

        // Debug-Hitbox
        if (this.debugMode) {
            this.drawFrame(mo, this.getDebugColor(mo));
        }

        this.ctx.restore();
    });
}

    
    

    addToMap(mo){
        if (!mo.img) return;
        this.ctx.save();
    
        if (mo.otherDiretion) {
            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            if (mo instanceof CollectableObject) {
                this.applyGlowEffect(mo);
            }
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        } else {
            if (mo instanceof CollectableObject) {
                this.applyGlowEffect(mo);
            }
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            
            
        }
        if (this.debugMode ) {
            this.drawFrame(mo, this.getDebugColor(mo));
        }
    
        this.ctx.restore();
    }

    applyGlowEffect(mo) {
        if (!(mo instanceof CollectableObject)) return; // Nur für Collectables
    
        let time = Date.now() / 500;
        let glow = Math.sin(time) * 10 + 20; // Pulsieren
    
        this.ctx.shadowBlur = glow;
        this.ctx.shadowColor = this.getGlowColor(mo);
    }

    getGlowColor(mo) {
        if (mo instanceof Blockstone) {
            return "blue";
        } 
        else if (mo instanceof ScoreItem) {
            return "gold";
        }
        else {
            return "white";
        }
    }
    
    
    
    drawFrame(mo, color = 'blue'){
        if (mo instanceof Character ||mo instanceof Enemy ) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = color;
        this.ctx.rect(mo.otherDiretion ? 0 : mo.x, mo.otherDiretion ? 0 : mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }
    }

    getDebugColor(mo) {
        if (mo instanceof Character) return 'blue';
        if (mo instanceof Enemy) return 'red';
        return 'grey';
        
    }

    drawOffsetBox(mo, color = 'orange') {
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = color;
    
        let x = mo.x + (mo.offset?.left || 0) + this.camera_x;
        let y = mo.y + (mo.offset?.top || 0);
        let width = mo.width - (mo.offset?.left || 0) - (mo.offset?.right || 0);
        let height = mo.height - (mo.offset?.top || 0) - (mo.offset?.bottom || 0);
    
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }
    
    
startCloudSpawner() {
    let concurrentSpawns = 0;

    const spawnCloud = () => {
        // Alte Wolken bereinigen
        this.level.clouds = this.level.clouds.filter(cloud => cloud.x > -cloud.width);

        // Maximal 15 Wolken gesamt UND nicht mehr als 3 gleichzeitig im Spawnprozess
        if (this.level.clouds.length < 15 && concurrentSpawns < 3) {
            concurrentSpawns++; // Spawnbeschränkung erhöhen

            let cloud = new Cloud();
            cloud.x = this.level.level_end_x + Math.random() * 200;
            cloud.y = 50 + Math.random() * 100;
            this.level.clouds.push(cloud);

            // Nach kurzer Zeit wieder freigeben
            setTimeout(() => {
                concurrentSpawns--;
            }, 3000); // Nach 1 Sekunde darf wieder gespawnt werden
        }

        // Nächster Versuch in 20–50 Sekunden
        let nextSpawn = 20000 + Math.random() * 30000;
        setTimeout(spawnCloud, nextSpawn);
    };

    spawnCloud(); // Erste Wolke starten
}



restartGame() {
    this.retryButton.visible = false;
    this.victoryButton.visible = false;
    this.gameStateManager.resetLevelAndRestartCharacter();
}








start() {
    const loop = () => {
        this.draw();
        this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    // ⬇️ Hier STARTET der Cloud-Spawner nach 5 Sekunden
    setTimeout(() => {
        this.startCloudSpawner();
    }, 5000);
}
stopDrawingLoop() {
    if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
}

stopWorldTimers() {
    if (this.cloudTimeoutId) {
        clearTimeout(this.cloudTimeoutId);
        this.cloudTimeoutId = null;
    }
}

}