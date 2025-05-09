class MoveabelObject {
    x = 25;
    y = 350;
    img;
    height = 100 ;
    width = 100;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    otherDiretion = false;
    energy = 100;
    isDead = false;
    animationTimer = 0;
    animationInterval = 100;
    isAttacking = false;
    attackHitFrame = 4;
    attackRange = {
        offsetX: 50,  // Wie weit der Angriff reicht (vor oder hinter dem Angreifer)
        width: 70,    // Breite der Hitbox
    };

    offset = {
        top: 0,
        bottom: 0,
        left:0,
        right: 0
    }
    animationSpeeds = {
        IDLE: 150,
        RUN: 120,
        ATTACK: 60,
        JUMP: 150,
        HURT: 100,
    };

    speedY = 0;
    acceleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
    
                const tile = this.getGroundTileBelow();
                if (tile) {
                    this.speedY = 0;
                    this.y = tile.y - (this.height - this.offset.bottom);
                }
            }
            
        }, 1000 / 25);
    }
    
    
    

    isAboveGround() {
        return !this.isOnGroundTile();
    }
    

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
     arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
        
    }

    jump() {
        this.speedY = 25;
    }

    
    moveLeft(blockCheck = true) {
        this.x -= this.speed;
        this.otherDiretion = true;
    
        if (blockCheck && this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
            this.x += this.speed;
        }
    }
    
    moveRight(blockCheck = true) {
        this.x += this.speed;
        this.otherDiretion = false;
    
        if (blockCheck && this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
            this.x -= this.speed;
        }
    }
    
    attack() {
        this.isAttacking = true;
        this.currentImage = 0; // Animation von vorne starten
    
        // Zeit steuert wann der Angriff endet
        setTimeout(() => {
            this.isAttacking = false;
        }, 500); 
    }

    isAttackFrameActive() {
        if (!this.isAttacking) return false;
    
        let i = this.currentImage % this.IMAGES_ATTACK.length;
        return i === this.attackHitFrame;
    }
    hit(target) {
        let hitbox = {
            x: this.otherDiretion 
                ? this.x - this.attackRange.offsetX 
                : this.x + this.width,
            y: this.y + this.offset.top,
            width: this.attackRange.width,
            height: this.height - this.offset.top - this.offset.bottom
        };
    
        let targetBox = {
            x: target.x + target.offset.left,
            y: target.y + target.offset.top,
            width: target.width - target.offset.left - target.offset.right,
            height: target.height - target.offset.top - target.offset.bottom
        };
    
        let isHit = hitbox.x < targetBox.x + targetBox.width &&
                    hitbox.x + hitbox.width > targetBox.x &&
                    hitbox.y < targetBox.y + targetBox.height &&
                    hitbox.y + hitbox.height > targetBox.y;
    
                    if (isHit) {
                        console.log("Treffer erkannt!");
                        if (target instanceof Enemy) {
                            target.isStunned = true;
                            target.stunTime = Date.now();
                            console.log("Gegner gestunnt!");
                    
                            // NEU: Welt sofort aktualisieren
                            if (target.world) {
                                target.world.draw(); // <-- NEU
                            }
                        }
                    }
        
    
        return isHit;
    }

    takeDamage(amount = 20) {
        if (this.isDead) return;
    
        if (this.blockActive) {
            console.log("BLOCK → Angriff wurde geblockt!");
            this.blockEnergy--; // Blockenergie verbrauchen
            return; // Kein Schaden
        }
    
        this.energy -= amount;
    
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        } else {
            this.playHurtAnimation();
        }
    }
    

    onHitEffect() {
        let oldImg = this.img;
        this.img = null;  // Blinken (optional ersetzen mit rotem Overlay)
        
        setTimeout(() => {
            this.img = oldImg;
        }, 200);
    }

    die() {
        this.isDead = true;
        this.speed = 0;
        this.playDeathAnimation();
        console.log(`${this.constructor.name} is dead.`);
    }
    
    
    
    

    playAnimation(images, type = "RUN") {
        let now = Date.now();
        let interval = this.animationSpeeds[type] || 150; // Falls nicht gesetzt → 150ms Standard
    
        if (now - this.animationTimer < interval) {
            return;
        }
    
        this.animationTimer = now;
    
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT, "HURT");
    
        setTimeout(() => {
            this.currentImage = 0;
        }, this.IMAGES_HURT.length * 100);
    }
    
    playDeathAnimation() {
        this.currentImage = 0; // Start der Animation
    
        let deathInterval = setInterval(() => {
            // Prüfen ob die Animation zu Ende ist
            if (this.currentImage >= this.IMAGES_DEAD.length) {
                clearInterval(deathInterval);
                
                // Letzten Frame dauerhaft anzeigen
                let path = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
                this.img = this.imageCache[path];
                return;
            }
    
            // Nächstes Bild setzen
            let path = this.IMAGES_DEAD[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }
    
    
    
    

    isColliding(mo) {
        let moX = mo.x;
    
        let thisRight = this.x + this.width - this.offset.right;
        let thisBottom = this.y + this.height - this.offset.bottom;
        let thisLeft = this.x + this.offset.left;
        let thisTop = this.y + this.offset.top;
    
        let moRight = moX + mo.width - mo.offset.right;
        let moBottom = mo.y + mo.height - mo.offset.bottom;
        let moLeft = moX + mo.offset.left;
        let moTop = mo.y + mo.offset.top;
    
        return thisRight >= moLeft &&
               thisBottom >= moTop &&
               thisLeft < moRight &&
               thisTop < moBottom;
    }
    

    isOnGroundTile() {
        if (!this.world?.level?.groundTiles) {
            return false; 
        }
    
        return this.world.level.groundTiles.some(tile =>
            this.y + this.height - this.offset.bottom >= tile.y &&
            this.y + this.height - this.offset.bottom <= tile.y + 5 &&
            this.x + this.width - this.offset.right > tile.x &&
            this.x + this.offset.left < tile.x + tile.width
        );
    }
    
getGroundTileBelow() {
    if (!this.world?.level?.groundTiles) return null;

    return this.world.level.groundTiles.find(tile =>
        this.y + this.height - this.offset.bottom >= tile.y &&   // mit Offset Bottom
        this.y + this.height - this.offset.bottom <= tile.y + tile.height && 
        this.x + this.width - this.offset.right > tile.x &&      // mit Offset rechts
        this.x + this.offset.left < tile.x + tile.width          // mit Offset links
    );
}


isBlockingTile(tile) {
    return this.x + this.width - this.offset.right > tile.x &&
           this.x + this.offset.left < tile.x + tile.width &&
           this.y + this.height - this.offset.bottom > tile.y &&
           this.y + this.offset.top < tile.y + tile.height;
}



    
}