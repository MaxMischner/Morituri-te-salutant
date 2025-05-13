class World{
   
    character = new Character();
    level = level1;
    debugMode = true;
    canvas;
    ctx;
    keyboard;
    isStunned;
    camera_x = 0;
    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.blockIcon = new Image();
        this.blockIcon.src = "../img/Collectebals/PNG/tile000.png"; // Pfad anpassen!
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

    this.canvas.addEventListener("click", (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // === Retry-Button prüfen ===
    if (this.retryButton.visible) {
        const b = this.retryButton;
        if (
            clickX >= b.x && clickX <= b.x + b.width &&
            clickY >= b.y && clickY <= b.y + b.height
        ) {
            this.restartGame();
            return;
        }
    }

    // === Victory-Button prüfen ===
    if (this.victoryButton.visible) {
        const b = this.victoryButton;
        if (
            clickX >= b.x && clickX <= b.x + b.width &&
            clickY >= b.y && clickY <= b.y + b.height
        ) {
            this.restartGame();
            return;
        }
    }
});



    }

    setWorld(){
        this.character.world = this;
    
       this.level.enemies.forEach(enemy => {
    enemy.world = this;

    // Boss: Animation erst starten, wenn world verfügbar ist
    if (enemy instanceof Endboss) {
        enemy.animate();
    }
});

        
        
            
        
    }
    
    

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isAttacking && this.character.isAttackFrameActive()) {
                    console.log("Angriff aktiv, prüfe Treffer");
                    if (this.character.hit(enemy)) {
                        console.log("Treffer erkannt in checkCollisions");
                        enemy.takeDamage();
                    }
                }

                if (!enemy.isDead) {
                    enemy.tryAttack(this.character);
                }

            });
            this.level.collectableObjects.forEach((collectable, index) => {
                if (this.character.isColliding(collectable)) {
                    collectable.onCollect(this.character);
                    this.level.collectableObjects.splice(index, 1); // Entfernen nach Aufsammeln
                }
            });

        }, 100);
    }
    
   
    
    
    
    draw() {
        this.level.clouds = this.level.clouds.filter(cloud => cloud.x > -cloud.width);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

        this.ctx.translate(this.camera_x,0);

        this.addObjektToMap(this.level.backgroundObjects);
        this.addObjektToMap(this.level.groundTiles);
        this.addObjektToMap(this.level.clouds);
       setTimeout(() => {
                this.startCloudSpawner();
            }, 5000);
   
        this.addToMap(this.character);
        

        
        this.addObjektToMap(this.level.collectableObjects);
        this.addEnemisDirektion(this.level.enemies);
        this.drawBossHP();
        this.addObjektToMap(this.level.activeEffects);
        this.drawCharacterHealthBar();
        this.drawCharacterBlockIcons();
        this.drawScoreCounter();


        
        // HIER NEU: Logging für gestunnte Gegner
        this.level.enemies.forEach(enemy => {
            if (enemy.isStunned) {
                console.log("Gestunnter Gegner wird gezeichnet", enemy);
            }
        });

        this.ctx.translate(-this.camera_x,0);

   
    

    

    let self =this;
    requestAnimationFrame(function () {
        self.draw();
    });



    if (this.debugMode) {
        this.level.enemies.forEach(enemy => this.drawOffsetBox(enemy));
        this.drawOffsetBox(this.character);
    }
    
    this.drawDeathScreen();
    this.drawVictoryScreen()
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


drawCharacterHealthBar() {
    const character = this.character;
    if (!character || character.energy === undefined) return;

    const ctx = this.ctx;

    // Speichern des aktuellen Kontexts
    ctx.save();

    // Zurücksetzen der Transformation, um die HealthBar unabhängig von der Kamera zu zeichnen
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const maxEnergy = 100;
    const energyPercent = Math.max(0, character.energy / maxEnergy);
    const barWidth = 200 * energyPercent;

    // Fest platzierte Leiste (oben links)
    const x = 20;
    const y = 20;
    const width = 200;
    const height = 20;

    // Hintergrund
    ctx.fillStyle = "#444";
    ctx.fillRect(x, y, width, height);

    // Farbverlauf für aktuelle Energie
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
gradient.addColorStop(1.0, "#0f0");  // Grün (voll)
gradient.addColorStop(0.5, "#ff0");  // Gelb (halb)
gradient.addColorStop(0.0, "#f00");  // Rot (kritisch)


    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, height);

    // Rahmen
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Wiederherstellen des gespeicherten Kontexts
    ctx.restore();
}

drawCharacterBlockIcons() {
    const character = this.character;
    if (!character || character.blockEnergy === undefined) return;

    // Prüfen, ob Bild geladen ist
    if (!this.blockIcon || !this.blockIcon.complete) return;

    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const iconSize = 20;
    const spacing = 4;
    const startX = 20;
    const y = 50;

    for (let i = 0; i < character.blockEnergy; i++) {
        const x = startX + i * (iconSize + spacing);
        ctx.drawImage(this.blockIcon, x, y, iconSize, iconSize);
    }

    ctx.restore();
}

drawScoreCounter() {
    const character = this.character;
    if (!character || character.score === undefined) return;
    if (!this.scoreIcon || !this.scoreIcon.complete) return;

    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Feste UI-Position

    const iconSize = 32;
    const x = 20;
    const y = 80;

    // Icon zeichnen
    ctx.drawImage(this.scoreIcon, x, y, iconSize, iconSize);

    // Text daneben zeichnen
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`${character.score}`, x + iconSize + 10, y + iconSize - 8);

    ctx.restore();
}

drawDeathScreen() {
    if (!this.character || !this.character.isDead) return;

    const ctx = this.ctx;
    const canvas = this.canvas;

    // Overlay
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Titel
    const time = Date.now() / 500;
    const offset = Math.sin(time) * 3;
    const scale = 1 + Math.sin(time) * 0.03;

    ctx.translate(canvas.width / 2, canvas.height / 2 + offset);
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 10;
    ctx.fillText("YOU DIED...", 0, 0);

    // Button zeichnen
    const btnX = -80;
    const btnY = 60;
    const btnW = 160;
    const btnH = 40;

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#222";
    ctx.fillRect(btnX, btnY, btnW, btnH);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(btnX, btnY, btnW, btnH);

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("RETRY", 0, btnY + 27);

    ctx.restore();

    // Speichere die Position relativ zum Canvas
    this.retryButton = {
        x: canvas.width / 2 - 80,
        y: canvas.height / 2 + 60,
        width: 160,
        height: 40,
        visible: true
    };
}
restartGame() {
    window.location.reload(); // oder: init();
}

drawBossHP() {
    const boss = this.level.enemies.find(e => e instanceof Endboss);
    if (!boss || !boss.isActive) return;

    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // === Leistenposition ===
    const width = 300;
    const height = 20;
    const margin = 30;
    const x = canvas.width - width - margin;
    const y = 80;

    const hpPercent = Math.max(0, boss.energy / 100);
    const barWidth = width * hpPercent;

    // === Leistenhintergrund (dunkelrot) ===
    ctx.fillStyle = "#400";
    ctx.fillRect(x, y, width, height);

    // === Lebensbalken (hellrot) ===
    ctx.fillStyle = "#f00";
    ctx.fillRect(x + (width - barWidth), y, barWidth, height);

    // === Rahmen ===
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x, y, width, height);

    // === Name oben mittig animiert ===
    if (boss.bossNameOpacity < 1) {
        boss.bossNameOpacity += 0.005; // langsamer einblenden
    }
    if (boss.bossNameSize > 24) {
    boss.bossNameSize -= 0.3;
}

    if (boss.bossNameY > y - 10) {
        boss.bossNameY -= 1.2; // langsamer aufsteigen
    }

    ctx.globalAlpha = boss.bossNameOpacity;
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${boss.bossNameSize}px serif`;
    ctx.textAlign = "left";
ctx.fillText("MINOTAUROS", x, boss.bossNameY); // exakt über der Leiste



    ctx.restore();
}


drawVictoryScreen() {
    const boss = this.level.enemies.find(e => e instanceof Endboss);
    if (!boss || !boss.isDead) return;

    const ctx = this.ctx;
    const canvas = this.canvas;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Hintergrund abdunkeln
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // VICTORY Titel
    ctx.fillStyle = "#ffff66";
    ctx.font = "bold 70px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 10;
    ctx.fillText("VICTORY", canvas.width / 2, canvas.height / 2 - 80);

    // Score anzeigen
    ctx.font = "30px Arial";
    ctx.shadowBlur = 5;
    ctx.fillStyle = "#fff";
    const score = this.character.score || 0;
    ctx.fillText(`Your Score: ${score}`, canvas.width / 2, canvas.height / 2);

    // Button
    const btnX = canvas.width / 2 - 100;
    const btnY = canvas.height / 2 + 60;
    const btnW = 200;
    const btnH = 50;

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#222";
    ctx.fillRect(btnX, btnY, btnW, btnH);

    ctx.strokeStyle = "#fff";
    ctx.strokeRect(btnX, btnY, btnW, btnH);

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("PLAY AGAIN", canvas.width / 2, btnY + 33);

    ctx.restore();

    // Button-Koordinaten speichern
    this.victoryButton = {
        x: btnX,
        y: btnY,
        width: btnW,
        height: btnH,
        visible: true
    };
}


}