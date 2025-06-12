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
    blockMaxHoldTime = 10000; 
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
        this.movementInterval = null;
    this.animationInterval = null;
        
        
   }

    
/**
 * Starts the main character animation and input handling loop.
 */
animate() {
    if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD, "DEAD");
        return;
    }

    this.setStoppableInterval(() => {
        this.checkFallIntoPit();
        this.handleMovement();
        this.handleCombatInput();
        this.clampCharacterPosition();
        this.updateBlockStatus();
    }, 1000 / 60);

    this.setStoppableInterval(() => {
        this.handleAnimationState();
    }, 100);
}

/**
 * Checks if the character has fallen into a pit and triggers death if so.
 * @private
 */
checkFallIntoPit() {
    if (this.y > 600 && !this.isDead) {
        this.energy = 0;
        this.die();
        console.log("Charakter ist in ein Loch gefallen!");
    }
}

/**
 * Handles horizontal character movement and camera positioning.
 * Updates the character's horizontal position based on player input
 * and adjusts the camera to follow the character.
 * @private
 */
handleMovement() {
    const endZoneStart = this.world.level.level_end_x - 720;
    const levelEnd = this.world.level.level_end_x - 50;
    const inEndZone = this.x >= endZoneStart;
    if (this.world.keyboard.RIGTH && this.x < levelEnd) {
        this.moveRight();
    }
    if (this.world.keyboard.LEFT) {
        if ((inEndZone && this.x > endZoneStart) || (!inEndZone && this.x > 25)) {
            this.moveLeft();
        }
    }
    this.world.camera_x = (this.x <= endZoneStart)
        ? -this.x + 25
        : -endZoneStart;
}


/**
 * Handles player combat input for attack, block, and jump.
 * @private
 */
handleCombatInput() {
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
}

/**
 * Clamps the character's horizontal position within level boundaries.
 * @private
 */
clampCharacterPosition() {
    const endZoneStart = this.world.level.level_end_x - 720;
    const levelEnd = this.world.level.level_end_x - 50;
    let inEndZone = this.x >= endZoneStart;

    if (this.x < 25) {
        this.x = 25;
    } else if (this.x > levelEnd) {
        this.x = levelEnd;
    } else if (inEndZone && this.x < endZoneStart) {
        this.x = endZoneStart;
    }
}

/**
 * Updates the character's current animation state.
 * Delegates to specific animation handlers depending on the character state.
 * @private
 */
handleAnimationState() {
    if (this.isBlocking) {
        this.updateBlockAnimation();
    } else if (this.isAttacking) {
        this.updateAttackAnimation();
    } else if (this.isAboveGround()) {
        this.updateJumpAnimation();
    } else if (this.isHurt) {
        this.updateHurtAnimation();
    } else if (this.isDead) {
        this.updateDeathAnimation();
    } else {
        this.updateRunOrIdleAnimation();
    }
}

/**
 * Updates the block animation and handles block hold logic.
 * @private
 */
updateBlockAnimation() {
    this.playAnimation(this.IMAGES_BLOCK, "BLOCK");

    if (this.currentImage >= 4) {
        this.blockActive = true;
        this.blockHoldTime += 100;

        this.currentImage = 4;

        if (this.blockHoldTime >= 3000 || this.blockEnergy <= 0) {
            this.isBlocking = false;
            this.blockActive = false;
            this.blockHoldTime = 0;
            this.currentImage = 0;
        }
    }
}

/**
 * Updates the attack animation.
 * @private
 */
updateAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");
}

/**
 * Updates the jump animation while the character is in the air.
 * @private
 */
updateJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMP, "JUMP");
}

/**
 * Updates the hurt animation when the character is damaged.
 * @private
 */
updateHurtAnimation() {
    this.playHurtAnimation(this.IMAGES_HURT, "HURT");
}

/**
 * Updates the death animation and locks the final death frame.
 * @private
 */
updateDeathAnimation() {
    if (!this.deadAnimationPlayed) {
        this.playAnimation(this.IMAGES_DEAD, "DEAD");

        setTimeout(() => {
            this.currentImage = this.IMAGES_DEAD.length - 1;
            this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
            this.deadAnimationPlayed = true;
        }, this.IMAGES_DEAD.length * 100);
    }
}

/**
 * Updates the run or idle animation depending on player input.
 * @private
 */
updateRunOrIdleAnimation() {
    if (this.world.keyboard.RIGTH || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_RUN, "RUN");
    } else {
        this.playAnimation(this.IMAGES_IDLE, "IDLE");
    }
}

/**
 * Initiates the block action if blocking is allowed and block energy is available.
 * Sets the block state and records the block start time.
 * @private
 */
startBlock() {
    if (!this.isBlocking && this.blockEnergy > 0) {
        this.isBlocking = true;
        this.blockActive = true;
        this.blockStartTime = Date.now();
        console.log("Block started");
    }
}

/**
 * Updates the block status and ends the block if the duration is exceeded or block energy is depleted.
 * @private
 */
updateBlockStatus() {
    if (this.isBlocking) {
        const currentTime = Date.now();
        if (currentTime - this.blockStartTime >= this.blockDuration || this.blockEnergy <= 0) {
            this.isBlocking = false;
            this.blockActive = false;
            console.log("Block ended");
        }
    }
}
}