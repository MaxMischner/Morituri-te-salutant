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
    }

    setWorld(){
        this.character.world = this;
    
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        
        
            
        
    }
    
    

    checkCollisions(){
        setInterval(() => {
    
            this.level.enemies.forEach(enemy => {
    
                if (this.character.isAttacking && this.character.isAttackFrameActive()) {
                    if (this.character.hit(enemy)) {
                        enemy.takeDamage();
                        console.log('enemy hit');
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
    
        }, 1000);
    }
    
   
    
    
    
    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

        this.ctx.translate(this.camera_x,0);

        this.addObjektToMap(this.level.backgroundObjects);
        this.addObjektToMap(this.level.groundTiles);
        this.addObjektToMap(this.level.clouds);
       
        this.addToMap(this.character);
        
        
        this.addObjektToMap(this.level.collectableObjects);
        this.addEnemisDirektion(this.level.enemies);
        
        this.ctx.translate(-this.camera_x,0);

       
        

        
        let self =this;
        requestAnimationFrame(function () {
            self.draw();
        });



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

    addEnemisDirektion(enemies){
        enemies.forEach(mo => {
            if (!mo.img) return;
            this.ctx.save();
            
            if (mo.otherDiretion) {
                // Spiegeln nur wenn otherDiretion true ist
                this.ctx.translate(mo.x + mo.width, mo.y);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
            } else {
                // Normal zeichnen
                this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            }
    
            // HIER NEU: Wenn gestunnt, Effekt anzeigen (→ genau hier rein!)
            if (mo.isStunned) {
                mo.showStunEffect();
            }
    
            if (this.debugMode) {
                this.drawFrame(mo, this.getDebugColor(mo));
            };
    
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
    
    

    
    
}