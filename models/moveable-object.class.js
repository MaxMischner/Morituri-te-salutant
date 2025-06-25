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
    isHurt = false;
    isDead = false; 
    invincibilityDuration = 1000;
     intervalIDs = [];
    animationTimer = 0;
    animationInterval = 100;
    isAttacking = false;
    attackHitFrame = 4;
    attackRange = {
    offsetX: 70,  
    width: 100,   
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

/**
 * Sets an interval that can be stopped later via {@link stopInterval}.
 * The interval ID is stored internally.
 *
 * @param {Function} fn - The function to execute on each interval tick.
 * @param {number} time - The interval time in milliseconds.
 */
setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    this.intervalIDs.push(id);
}

/**
 * Stops all intervals that were created using {@link setStoppableInterval}.
 * Clears all stored interval IDs and stops their execution.
 */
stopInterval() {
    this.intervalIDs.forEach(clearInterval);
    this.intervalIDs = []; 
}

/**
 * Applies gravity to the object by continuously updating its vertical position.
 * If the object is above the ground or falling, it will move downward.
 * Stops vertical movement when the object reaches a ground tile.
 */
applyGravity() {
    this.setStoppableInterval(() => {
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

/**
 * Checks if the object is currently above any ground tile.
 *
 * @returns {boolean} True if the object is above the ground, false otherwise.
 */
isAboveGround() {
    return !this.isOnGroundTile();
}

/**
 * Loads a single image and assigns it to the object's current image.
 *
 * @param {string} path - The path to the image file.
 */
loadImage(path) {
    this.img = new Image();
    this.img.src = path;
}

/**
 * Loads multiple images and stores them in the image cache.
 *
 * @param {string[]} arr - An array of image paths to load.
 */
loadImages(arr) {
    arr.forEach(path => {
        const img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}

/**
 * Makes the object jump by applying an upward vertical speed.
 * The jump is only performed if the object is alive.
 */
jump() {
    if (this.isDead) return;
    this.speedY = 25;
    soundManager.play("jump");
}

/**
 * Moves the object to the left.
 * Optionally checks for blocking tiles to prevent movement through obstacles.
 *
 * @param {boolean} [blockCheck=true] - Whether to check for blocking tiles.
 */
moveLeft(blockCheck = true) {
    this.x -= this.speed;
    this.otherDiretion = true;

    if (blockCheck && this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
        this.x += this.speed;
    }
}

/**
 * Moves the object to the right.
 * Optionally checks for blocking tiles to prevent movement through obstacles.
 *
 * @param {boolean} [blockCheck=true] - Whether to check for blocking tiles.
 */
moveRight(blockCheck = true) {
    this.x += this.speed;
    this.otherDiretion = false;

    if (blockCheck && this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
        this.x -= this.speed;
    }
}

/**
 * Initiates an attack action.
 * Sets the attacking state, triggers sound, and manages attack cooldowns.
 * If already attacking or on cooldown, no new attack is started.
 */
attack() {
    if (this.isAttacking || this.attackOnCooldown) return;
    this.isAttacking = true;
    this.attackOnCooldown = true;
    this.currentImage = 0;
    soundManager.play("attack");
    setTimeout(() => {
        this.isAttacking = false;
    }, 500);
    setTimeout(() => {
        this.attackOnCooldown = false;
    }, 800); 
}

/**
 * Checks whether the current attack frame is an active hit frame.
 *
 * @returns {boolean} True if the current frame can hit a target, false otherwise.
 */
isAttackFrameActive() {
    if (!this.isAttacking) return false;
    const i = this.currentImage % this.IMAGES_ATTACK.length;
    return i >= this.attackHitFrame && i <= this.attackHitFrame + 2;
}

/**
 * Checks if an attack hits the given target and applies effects.
 * @param {Object} target - The target object (Character or Enemy).
 * @returns {boolean} Whether the target was hit.
 */
hit(target) {
    if (!this.isAttackFrameActive()) return false;
    const hitbox = MoveableObjectUtils.getAttackHitbox(this);
    const targetBox = MoveableObjectUtils.getTargetHitbox(target);
    if (!MoveableObjectUtils.isCollision(hitbox, targetBox)) return false;
    if (MoveableObjectUtils.handleAlreadyHit(target)) return false;
    MoveableObjectUtils.applyHitEffects(this, target);
    return true;
}

/**
 * Applies damage to the object and handles blocking, death, and hurt logic.
 * @param {number} amount - The damage amount to apply.
 * @param {Object|null} attacker - The attacking entity, if any.
 */
takeDamage(amount = 20, attacker = null) {
    if (MoveableObjectUtils.isImmuneToDamage(this)) return;
    if (MoveableObjectUtils.handleBlock(this, attacker)) return;
    if (MoveableObjectUtils.handleEnemyStun(this)) return;
    MoveableObjectUtils.applyDamage(this, amount);
}

/**
 * Applies a temporary hit effect by making the object invisible (or blink).
 * After 200 ms, the original image is restored.
 */
onHitEffect() {
    const oldImg = this.img;
    this.img = null;  
    setTimeout(() => {
        this.img = oldImg;
    }, 200);
}

/**
 * Kills the object and starts the death animation.
 * Sets object state to dead, stops movement, plays death sound.
 *
 * @param {string} target - The sound identifier to play on death.
 */
    die(target) {
        this.isDead = true;
        this.speed = 0;
        this.playDeathAnimation(this.IMAGES_DEAD, 'DEAD'  );
        soundManager.play(target);
}
    
/**
 * Plays an animation by cycling through the given image frames.
 * The frame update is controlled by the animation speed of the given type.
 *
 * @param {string[]} images - The array of image paths to cycle through.
 * @param {string} [type="RUN"] - The animation type to determine the frame interval (default: "RUN").
 */
playAnimation(images, type = "RUN") {
    const now = Date.now();
    const interval = this.animationSpeeds[type] || 150;
    if (now - this.animationTimer < interval) {
        return;
    }
    this.animationTimer = now;
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path] || this.img;
    this.currentImage++;
}

/**
 * Plays the hurt animation sequence for the object.
 * If no hurt images are defined, a warning is logged.
 * After the animation, the current frame index is reset.
 */
playHurtAnimation() {
    if (!this.IMAGES_HURT || this.IMAGES_HURT.length === 0) {
        return;
    }
    this.playAnimation(this.IMAGES_HURT, "HURT");
    setTimeout(() => {
        this.currentImage = 0;
    }, this.IMAGES_HURT.length * 100);
}

/**
 * Plays the death animation sequence for this object.
 */
playDeathAnimation() {
    this.currentImage = 0;
    MoveableObjectUtils.startDeathAnimationInterval(this);
}

/**
 * Checks if this object is colliding with another moveable object.
 *
 * @param {Object} mo - The other moveable object to check collision with.
 * @param {number} mo.x - X-position of the other object.
 * @param {number} mo.y - Y-position of the other object.
 * @param {number} mo.width - Width of the other object.
 * @param {number} mo.height - Height of the other object.
 * @param {Object} mo.offset - Offset values for the other object (left, right, top, bottom).
 * @returns {boolean} True if the two objects are colliding, false otherwise.
 */
isColliding(mo) {
    const moX = mo.x;
    const thisRight = this.x + this.width - this.offset.right;
    const thisBottom = this.y + this.height - this.offset.bottom;
    const thisLeft = this.x + this.offset.left;
    const thisTop = this.y + this.offset.top;
    const moRight = moX + mo.width - mo.offset.right;
    const moBottom = mo.y + mo.height - mo.offset.bottom;
    const moLeft = moX + mo.offset.left;
    const moTop = mo.y + mo.offset.top;
    return thisRight >= moLeft &&
           thisBottom >= moTop &&
           thisLeft < moRight &&
           thisTop < moBottom;
}

/**
 * Checks whether the object is currently standing on a ground tile.
 *
 * @returns {boolean} True if the object is on a ground tile, false otherwise.
 */
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

/**
 * Finds the ground tile directly below the object, if any.
 *
 * @returns {Object|null} The ground tile object below the object, or null if none is found.
 */
getGroundTileBelow() {
    if (!this.world?.level?.groundTiles) return null;
    return this.world.level.groundTiles.find(tile =>
        this.y + this.height - this.offset.bottom >= tile.y &&
        this.y + this.height - this.offset.bottom <= tile.y + tile.height &&
        this.x + this.width - this.offset.right > tile.x &&
        this.x + this.offset.left < tile.x + tile.width
    );
}

/**
 * Checks whether this object is colliding with the given blocking tile.
 *
 * @param {Object} tile - The tile object to check for collision.
 * @param {number} tile.x - X-position of the tile.
 * @param {number} tile.y - Y-position of the tile.
 * @param {number} tile.width - Width of the tile.
 * @param {number} tile.height - Height of the tile.
 * @returns {boolean} True if the object is colliding with the tile, false otherwise.
 */
isBlockingTile(tile) {
    return this.x + this.width - this.offset.right > tile.x &&
           this.x + this.offset.left < tile.x + tile.width &&
           this.y + this.height - this.offset.bottom > tile.y &&
           this.y + this.offset.top < tile.y + tile.height;
}
}