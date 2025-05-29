class Character extends MoveabelObject {
    world;
    speed = 2;
    score = 0;
    blockEnergy = 1;
    score = 0;

    isBlocking = false;
    blockFrame = 0;
    blockActive = false;
    blockHoldTime = 0;
    blockMaxHoldTime = 60000; 
   attackRange = {
    offsetX: 0,  // Erhöhen Sie diesen Wert
    width: 0,   // Erhöhen Sie diesen Wert
};

    offset = {
        top: 20,
        bottom: 0,
        left: 25,
        right: 25
    }

    animationSpeeds = {
        IDLE: 150,
        RUN: 25,
        ATTACK: 80,
        JUMP: 60,
        BLOCK: 100
    };
    
   constructor(){
        super();
        
        
   }

    
    animate(){
        if (this.isDead) {
    this.playAnimation(this.IMAGES_DEAD, "DEAD");
    
    return;
}



        setInterval(() => {
            if (this.y > 600 && !this.isDead) {
    this.energy = 0;
    this.die(death); 
    console.log("Charakter ist in ein Loch gefallen!");}

        const endZoneStart = this.world.level.level_end_x - 720;
        const levelEnd = this.world.level.level_end_x - 50;

        let inEndZone = this.x >= endZoneStart;

        // Bewegung nach rechts
        if (this.world.keyboard.RIGTH && this.x < levelEnd) {
            this.moveRight();
        }

        // Bewegung nach links
        if (this.world.keyboard.LEFT) {
            if (inEndZone) {
                // Im Endbereich, aber nicht weiter als der Beginn des Endbereichs
                if (this.x > endZoneStart) {
                    this.moveLeft();
                }
            } else if (this.x > 25) {
                // Normale Bewegung, aber nicht weiter als 25 Pixel vom linken Rand
                this.moveLeft();
            }
        }

        // Kamerabewegung
        if (this.x <= endZoneStart) {
            // Normale Kamera-Bewegung
            this.world.camera_x = -this.x + 25;
        } else {
            // Kamera bleibt am Anfang des Endbereichs stehen
            this.world.camera_x = -endZoneStart;
        }

        // Angriff
        if (this.world.keyboard.SPACE && !this.isAttacking) {
            this.attack();
        }

        // Blocken
        if (this.world.keyboard.E && this.blockEnergy > 0 && !this.isBlocking) {
            this.startBlock();
        }

        // Springen
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
        

        // Begrenzung der Charakterbewegung
        if (this.x < 25) {
            this.x = 25; // Linke Grenze
        } else if (this.x > levelEnd) {
            this.x = levelEnd; // Rechte Grenze
        } else if (inEndZone && this.x < endZoneStart) {
            this.x = endZoneStart; // Verhindert das Verlassen des Endbereichs
        }

        this.updateBlockStatus();
    }, 1000/60);
        
            setInterval(() => {

                if (this.isBlocking) {
                    this.playAnimation(this.IMAGES_BLOCK, "BLOCK");
                
                    if (this.currentImage >= 4) {
                        this.blockActive = true;
                        this.blockHoldTime += 100;
                
                        this.currentImage = 4; // Blockbild bleibt bestehen
                
                        if (this.blockHoldTime >= 2000 || this.blockEnergy <= 0) {
                            this.isBlocking = false;
                            this.blockActive = false;
                            this.blockHoldTime = 0;
                            this.currentImage = 0;
                        }
                    }
                }
                
                
                
                else if (this.isAttacking) {
                    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");
                } 
                else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMP, "JUMP");
                } 
                else {
                        if (this.isHurt) {
                            this.playAnimation(this.IMAGES_HURT, "HURT");
                        } else if (this.isDead) {
    if (!this.deadAnimationPlayed) {
        this.playAnimation(this.IMAGES_DEAD, "DEAD");

        setTimeout(() => {
            this.currentImage = this.IMAGES_DEAD.length - 1; // Letztes Frame festsetzen
            this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
            this.deadAnimationPlayed = true;
        }, this.IMAGES_DEAD.length * 100); // 100 ms pro Frame (anpassen je nach Speed)
    }
    return; // Keine weitere Aktion

                        } else if (this.world.keyboard.RIGTH || this.world.keyboard.LEFT) {
                            this.playAnimation(this.IMAGES_RUN, "RUN");
                        } else {
                            this.playAnimation(this.IMAGES_IDEL,"IDLE");
                        }
                    }

            
            }, 100);
            
            
            
            
    }

    startBlock() {
    if (!this.isBlocking && this.blockEnergy > 0) {
        this.isBlocking = true;
         this.blockActive = true;
        this.blockStartTime = Date.now();
        console.log("Block gestartet");
    }
}

updateBlockStatus() {
    if (this.isBlocking) {
        let currentTime = Date.now();
        if (currentTime - this.blockStartTime >= this.blockDuration || this.blockEnergy <= 0) {
            this.isBlocking = false;
            this.blockActive = false; 
            console.log("Block beendet");
        }
    }
}
}