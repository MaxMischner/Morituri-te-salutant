class Enemy extends MoveabelObject {
    constructor() {
        super();
        this.isStunned = false;
        this.isInvincible = false;
        this.invincibilityDuration = 1000;
    }
    direction = -1;
    IMAGES_IDEL = [];
    attackCooldown = 2000;  
    lastAttackTime = 0;


    turning = false;         
    turnWaitTime = 1000;     
    attackState = "idle"; 
    attackTimer = 0;
    attackDuration = {
    windup: 600,
    strike: 500,
    cooldown: 1500
};
attackRangeValue = 45;

/**
 * Updates the current attack phase based on elapsed time.
 * Delegates to specialized phase handlers.
 * @private
 */
updateAttack() {
    if (this.attackState === "idle") return;

    const elapsed = Date.now() - this.attackTimer;

    if (this.attackState === "windup") {
        this.handleWindupPhase(elapsed);
    } else if (this.attackState === "strike") {
        this.handleStrikePhase(elapsed);
    } else if (this.attackState === "cooldown") {
        this.handleCooldownPhase(elapsed);
    }
}

/**
 * Handles the windup phase of the attack.
 * @param {number} elapsed - Time in ms since the windup started.
 * @private
 */
handleWindupPhase(elapsed) {
    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");

    if (elapsed >= this.attackDuration.windup) {
        this.attackState = "strike";
        this.attackTimer = Date.now();
    }
}

/**
 * Handles the windup phase of the attack.
 * @param {number} elapsed - Time in ms since the windup started.
 * @private
 */
handleWindupPhase(elapsed) {
    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");

    if (elapsed >= this.attackDuration.windup) {
        this.attackState = "strike";
        this.attackTimer = Date.now();
    }
}

/**
 * Handles the strike phase of the attack and deals damage if the target is in range.
 * @param {number} elapsed - Time in ms since the strike started.
 * @private
 */
handleStrikePhase(elapsed) {
    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");

    if (elapsed >= this.attackDuration.strike) {
        const target = this.world.character;
        if (this.isAttackTargetInRange(target)) {
            target.takeDamage(20, this);
        }

        this.attackState = "cooldown";
        this.attackTimer = Date.now();
    }
}

/**
 * Handles the cooldown phase of the attack.
 * @param {number} elapsed - Time in ms since the cooldown started.
 * @private
 */
handleCooldownPhase(elapsed) {
    this.playAnimation(this.IMAGES_IDEL, "IDLE");

    if (elapsed >= this.attackDuration.cooldown) {
        this.attackState = "idle";
    }
}



/**
 * Initiates the attack sequence by setting the state to 'windup' and starting the attack timer.
 * If an attack is already in progress, the method returns immediately.
 * @private
 */
startAttack() {
    if (this.attackState !== "idle") return;

    this.attackState = "windup";
    this.attackTimer = Date.now();
}




/**
 * Executes the enemy patrol behavior.
 * Handles idle patrol, turning, movement, attack and stun states.
 * 
 */
patrol() {
    if (this.isDead) return;
    if (this.handleStunState()) return;
    if (this.handleAttackState()) return;
    if (this.handleTurning()) return;
    this.handleMovement();
}

/**
 * Handles the stunned state and plays hurt animation if the enemy is stunned.
 * @returns {boolean} True if enemy is stunned and no further action should occur.
 * @private
 */
handleStunState() {
    if (this.isStunned) {
        const stunDuration = Date.now() - this.stunTime;
        if (stunDuration < 3000) {
            this.playAnimation(this.IMAGES_HURT, "HURT");
            return true;
        } else {
            this.isStunned = false;
        }
    }
    return false;
}

/**
 * Handles the attack state and updates the attack if currently attacking.
 * @returns {boolean} True if enemy is currently attacking and no further action should occur.
 * @private
 */
handleAttackState() {
    if (this.attackState !== "idle") {
        this.updateAttack();
        return true;
    }
    return false;
}

/**
 * Handles turning behavior if no ground tile is ahead or while turning.
 * @returns {boolean} True if enemy is turning and no further action should occur.
 * @private
 */
handleTurning() {
    if (this.turning) {
        this.playAnimation(this.IMAGES_IDEL, "IDLE");

        if (Date.now() - this.turnTimer >= this.turnWaitTime) {
            this.turning = false;
            this.direction *= -1;
            this.otherDiretion = this.direction < 0;
        }
        return true;
    }

    const tileAhead = this.getGroundTileAhead();

    if (!tileAhead) {
        this.turning = true;
        this.turnTimer = Date.now();
        return true;
    }

    return false;
}

/**
 * Handles enemy movement and detects blocking tiles.
 * @private
 */
handleMovement() {
    this.x += this.direction * this.speed;
    this.otherDiretion = this.direction < 0;

    if (this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
        this.x -= this.direction * this.speed;
        this.turning = true;
        this.turnTimer = Date.now();
    } else {
        this.playAnimation(this.IMAGES_RUN, "RUN");
    }
}

/**
 * Attempts to initiate an attack on the target if the enemy is not dead and not already attacking.
 * @param {Character|MoveableObject} target - The target to attack.
 * @private
 */
tryAttack(target) {
    if (this.isDead) return;
    if (this.attackState !== "idle") return;

    if (this.isAttackTargetInRange(target)) {
        this.startAttack();
    }
}


/**
 * Attempts to hit the target during an active attack frame.
 * Delegates hit calculation and applies effects based on the target's state.
 * @param {Character|MoveableObject} target - The target to hit.
 * @returns {boolean} True if the target was hit, false otherwise.
 * 
 */
hit(target) {
    if (!this.isAttackFrameActive()) {
        console.log("Kein aktiver Angriffsframe");
        return false;
    }

    console.log("Enemy hit-Methode aufgerufen", target);

    const isHit = this.calculateHit(target);

    if (isHit) {
        this.applyHitEffects(target);
    } else {
        console.log("Kein Treffer");
    }

    return isHit;
}

/**
 * Calculates whether the target is within the attack range.
 * @param {Character|MoveableObject} target - The target to check.
 * @returns {boolean} True if the target is in range, false otherwise.
 * @private
 */
calculateHit(target) {
    return this.isAttackTargetInRange(target);
}

/**
 * Applies the effects of a successful hit to the target.
 * @param {Character|MoveableObject} target - The target to apply effects to.
 * @private
 */
applyHitEffects(target) {
    console.log("Treffer erkannt!", target);

    if (target instanceof Character) {
        if (target.isBlocking) {
            console.log("Charakter blockt den Angriff!");
            this.isStunned = true;
            this.stunTime = Date.now();
            console.log("Gegner wurde gestunnt!", this.isStunned, this.stunTime);
        } else {
            console.log("Charakter nimmt Schaden!");
            target.takeDamage(20);
        }
    }
}



/**
 * Checks whether the target is within the enemy's attack range based on direction.
 * @param {Character|MoveableObject} target - The target to check.
 * @returns {boolean} True if the target is in attack range, false otherwise.
 * @private
 */
isAttackTargetInRange(target) {
    let facingLeft = this.otherDiretion;
    let inRange = false;

    if (facingLeft) {
        inRange = this.x >= target.x && this.x - target.x <= this.attackRangeValue;
    } else {
        inRange = target.x >= this.x && target.x - this.x <= this.attackRangeValue;
    }

    return inRange;
}

/**
 * Renders the visual stun effect on the enemy, including flashing and stars.
 * 
 */
showStunEffect() {
    if (!this.img || !this.world?.ctx) return;

    const ctx = this.world.ctx;
    ctx.save();

    ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "yellow";

    if (this.otherDiretion) {
        this.drawStunEffectFacingLeft(ctx);
    } else {
        this.drawStunEffectFacingRight(ctx);
    }

    ctx.restore();
}

/**
 * Draws the stun visual effect when the enemy is facing left.
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
 * @private
 */
drawStunEffectFacingLeft(ctx) {
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "yellow";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("STUN", this.width / 2, -10);

    this.drawStunStars(ctx, true);
}

/**
 * Draws the stun visual effect when the enemy is facing right.
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
 * @private
 */
drawStunEffectFacingRight(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "yellow";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("STUN", this.x + this.width / 2, this.y - 10);

    this.drawStunStars(ctx, false);
}

/**
 * Draws animated stun stars above the enemy.
 * The stars rotate around a central point and are flipped if the enemy is facing left.
 * @param {CanvasRenderingContext2D} ctx - The rendering context.
 * @param {boolean} [flipped=false] - Whether to flip the star positions for left-facing direction.
 * @private
 */
drawStunStars(ctx, flipped = false) {
    let time = Date.now() / 200;
    let starCount = 3;

    for (let i = 0; i < starCount; i++) {
        let angle = time + (i * (Math.PI * 2 / starCount));
        let offsetX = Math.cos(angle) * 30;
        let offsetY = Math.sin(angle) * 10;

        let starX = flipped
            ? this.width / 2 + offsetX
            : this.x + this.width / 2 + offsetX;

        let starY = flipped
            ? -20 + offsetY
            : this.y - 20 + offsetY;

        ctx.beginPath();
        ctx.arc(starX, starY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
    }
}

/**
 * Checks for the ground tile directly ahead of the enemy based on its current direction.
 * Returns the tile if found, or null if no ground tile is present.
 * @returns {Object|null} The ground tile object ahead, or null if none is found.
 * @private
 */
getGroundTileAhead() {
    const checkX = this.x + (this.direction * this.width / 2);
    const checkY = this.y + this.height + 5;

    if (!this.world?.level?.groundTiles) return null;

    return this.world.level.groundTiles.find(tile => {
        return (
            checkX + this.width / 2 >= tile.x &&
            checkX <= tile.x + tile.width &&
            checkY >= tile.y &&
            checkY <= tile.y + tile.height
        );
    });
}

}