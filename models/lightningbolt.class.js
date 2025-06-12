class LightningBolt extends MoveabelObject {
    height = 200;
    width = 80;
    speedY = 5;
    impactY;
    hasHit = false;
    currentFrame = 0;
    frameTimer = 0;
    frameInterval = 100;

    offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
};


    IMAGES_LIGHTNING = [
        'img/Orcs/Orc_Shaman/Lightning bolt/tile000.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile001.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile002.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile003.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile004.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile005.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile006.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile007.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile008.png',
        'img/Orcs/Orc_Shaman/Lightning bolt/tile009.png'        
    ]

    constructor(x, y, target) {
        super();
        this.x = x - this.width / 2;
        this.y = y;
        this.target = target;
        this.impactY = this.target.y + this.target.height - 10;

        this.loadImage(this.IMAGES_LIGHTNING[0]);
        this.loadImages(this.IMAGES_LIGHTNING);
        

        this.animate();
    }

    /**
 * Starts the Lightning Bolt animation loop.
 * Handles movement, frame updates, and impact detection.
 * @private
 */
animate() {
    const interval = setInterval(() => {
        if (this.isDead) {
            clearInterval(interval);
            return;
        }

        this.moveDown();
        this.updateAnimationFrame();
        this.handleImpact();
    }, 1000 / 60);
}

/**
 * Moves the Lightning Bolt downward based on its vertical speed.
 * @private
 */
moveDown() {
    this.y += this.speedY;
}

/**
 * Updates the Lightning Bolt animation frame based on time elapsed.
 * @private
 */
updateAnimationFrame() {
    const now = Date.now();
    if (now - this.frameTimer > this.frameInterval) {
        this.frameTimer = now;
        this.currentFrame++;

        if (this.currentFrame >= this.IMAGES_LIGHTNING.length) {
            this.currentFrame = this.IMAGES_LIGHTNING.length - 1;
        }

        const path = this.IMAGES_LIGHTNING[this.currentFrame];
        this.img = this.imageCache[path];
    }
}

/**
 * Checks if the Lightning Bolt has reached the impact point and triggers hit check and removal.
 * @private
 */
handleImpact() {
    if (!this.hasHit && this.y >= this.impactY) {
        this.hasHit = true;
        this.checkHit();
        this.scheduleRemoval();
    }
}

/**
 * Checks if the Lightning Bolt hits the target based on X position overlap.
 * Applies damage to the target if a hit is detected.
 * @private
 */
checkHit() {
    // Simple X-axis check (hit if center of bolt is within player bounds)
    const player = this.target;
    const boltCenter = this.x + this.width / 2;
    const playerLeft = player.x + player.offset.left;
    const playerRight = player.x + player.width - player.offset.right;

    if (boltCenter >= playerLeft && boltCenter <= playerRight) {
        player.takeDamage(30, null);
        console.log("Lightning Bolt hits the player!");
    } else {
        console.log("Lightning Bolt misses the player.");
    }
}

/**
 * Schedules the Lightning Bolt for removal from the active effects list after 1 second.
 * Ensures the effect is properly cleaned up from the level.
 * @private
 */
scheduleRemoval() {
    setTimeout(() => {
        if (this.world?.level?.activeEffects) {
            const index = this.world.level.activeEffects.indexOf(this);
            if (index !== -1) {
                this.world.level.activeEffects.splice(index, 1);
            }
        }
    }, 1000);
}

}
