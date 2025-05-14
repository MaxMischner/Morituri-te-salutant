class World{
   
    character = new Character();
    level = level1;
    debugMode = true;
    canvas;
    ctx;
    keyboard;
    isStunned;
    camera_x = 0;
    
constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ui = new UIRenderer(this);
    this.setWorld();
    this.gameStarted = false;
    this.selectedCharacter = null;

    this.initCharacterSelection();
    this.initUIElements();
    this.setupInput();
    this.checkCollisions();
    this.startBackground = new Image();
    this.startBackground.src = "img/Interface/1.png"; 

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
}
setupInput() {
    this.canvas.addEventListener("click", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (!this.gameStarted) {
            for (let char of this.characterSelection) {
                if (
                    x >= char.x && x <= char.x + 100 &&
                    y >= char.y && y <= char.y + 100
                ) {
                    this.selectedCharacter = char.name;
                    this.startGameWithCharacter(char.name);
                    return;
                }
            }
            return;
        }

        // Prüfe Retry-Button
        if (this.retryButton.visible && this.ui.isInside(x, y, this.retryButton)) {
            this.restartGame();
            return;
        }

        // Prüfe Victory-Button
        if (this.victoryButton.visible && this.ui.isInside(x, y, this.victoryButton)) {
            this.restartGame();
            return;
        }
    });
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

    // Zeichenfläche leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ⬇️ Startmenü zuerst prüfen
    if (!this.gameStarted) {
        this.ui.drawStartMenu(this.characterSelection, this.selectedCharacter);
        return;
    }

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
    window.location.reload(); // oder: init();
}



startGameWithCharacter(name) {
    this.gameStarted = true;

    if (name === "Hero 1") {
        this.character = new Hero1(); // deine Gladiator_1-Klasse
    } else if (name === "Hero 2") {
        this.character = new Hero2(); // ggf. eigene Klasse für Gladiator_2
    }

    this.level.character = this.character;
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