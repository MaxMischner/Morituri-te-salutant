class WorldRenderer  {
   
 constructor(world) {
        this.world = world;
        this.ctx = world.ctx;
        this.level = world.level;
        this.character = world.character;
        this.ui = world.ui;
        this.camera_x = world.camera_x;
        this.debugMode = world.debugMode;
    }

/**
 * Renders the entire game world and UI during active gameplay.
 *//**
 * Renders the entire game world and UI during active gameplay.
 */
drawPlayingState() {
    const ctx = this.ctx;
    this.world.checkCollisions();
    this.removeOffscreenClouds();
    this.ctx.translate(this.world.camera_x, 0);
    this.drawWorldElements();
    this.addEnemisDirektion(this.level.enemies);
    this.world.ui.drawAll();
    ctx.translate(-this.world.camera_x, 0);
    this.drawDebugHitboxes();
}

/**
 * Draws debug hitboxes around the player and enemies if debug mode is active.
 */
drawDebugHitboxes() {
    if (this.debugMode) {
        this.level.enemies.forEach(enemy => this.drawOffsetBox(enemy));
        this.drawOffsetBox(this.character);
    }
}

/**
 * Removes clouds that have moved off the screen.
 */
removeOffscreenClouds() {
    this.level.clouds = this.level.clouds.filter(cloud => cloud.x > -cloud.width);
}

/**
 * Draws all static and dynamic world elements.
 */
drawWorldElements() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.groundTiles);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.activeEffects);
}

/**
 * Adds an array of objects to the rendering map.
 * 
 * Calls `addToMap()` for each object.
 * 
 * @param {Object[]} objects - The array of objects to render.
 */
addObjectsToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
}

/**
 * Renders a single object on the canvas, handling orientation and glow effects.
 * 
 * @param {Object} mo - The object to render.
 */
addToMap(mo) {
    this.ctx.save();
    const mirrored = mo.otherDiretion === true;
    this.drawObjectWithOptionalGlow(mo, mirrored);
    if (this.debugMode) {
        this.drawFrame(mo, this.getDebugColor(mo));
    }
    this.ctx.restore();
}

/**
 * Draws an object with optional glow effect and orientation.
 * 
 * @param {Object} mo - The object to render.
 * @param {boolean} mirrored - Whether to mirror the object horizontally.
 */
drawObjectWithOptionalGlow(mo, mirrored) {
    if (mirrored) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) {
            this.ctx.restore(); return; }
        if (mo instanceof CollectableObject) {
            this.applyGlowEffect(mo); }
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    } else {
        if (mo instanceof CollectableObject) {
            this.applyGlowEffect(mo);}
        if (!mo.img || !mo.img.complete || !mo.img.naturalWidth) {return;}
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);}
}

/**
 * Applies a pulsing glow effect to collectable objects.
 * 
 * - Uses a sine-based animation for a pulsing glow.
 * - Sets the canvas shadowBlur and shadowColor.
 * 
 * @param {Object} mo - The object to apply the glow to (only works for CollectableObject).
 */
applyGlowEffect(mo) {
    if (!(mo instanceof CollectableObject)) return; // Only for Collectables
    let time = Date.now() / 500;
    let glow = Math.sin(time) * 10 + 20; // Pulsing effect
    this.ctx.shadowBlur = glow;
    this.ctx.shadowColor = this.getGlowColor(mo);
}

/**
 * Draws the debug frame for an object if debug mode is active.
 * 
 * @param {Object} mo - The object to render debug frame for.
 */
drawDebugFrameForObject(mo) {
    if (this.debugMode) {
        this.drawFrame(mo, this.getDebugColor(mo));
    }
}

/**
 * Returns the glow color for a given collectable object.
 * 
 * - Blockstone → blue
 * - ScoreItem → gold
 * - Other objects → white
 * 
 * @param {Object} mo - The object to determine the glow color for.
 * @returns {string} The color to use for the glow effect.
 */
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

/**
 * Draws a debug frame (rectangle) around the given object.
 * 
 * Only works for Character or Enemy objects.
 * 
 * - Handles object mirroring (`otherDiretion`).
 * - Uses a customizable color.
 * 
 * @param {Object} mo - The object to draw the frame for (Character or Enemy).
 * @param {string} [color='blue'] - The color of the debug frame.
 */
drawFrame(mo, color = 'blue') {
    if (mo instanceof Character || mo instanceof Enemy) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = color;
        this.ctx.rect(mo.otherDiretion ? 0 : mo.x, mo.otherDiretion ? 0 : mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }
}

/**
 * Returns the debug color for the given object.
 * 
 * - Character → blue
 * - Enemy → red
 * - Other objects → grey
 * 
 * @param {Object} mo - The object to determine the debug color for.
 * @returns {string} The color to use when drawing debug frames.
 */
getDebugColor(mo) {
    if (mo instanceof Character) return 'blue';
    if (mo instanceof Enemy) return 'red';
    return 'grey';
}

/**
 * Draws an offset box (usually a hitbox or collision box) around the given object.
 * 
 * - Uses the object's offset properties to adjust the box.
 * - Compensates for the camera position on the x-axis.
 * - The box is drawn using the provided color.
 * 
 * @param {Object} mo - The object to draw the offset box for.
 * @param {string} [color='orange'] - The color of the offset box.
 */
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

/**
 * Adds enemies to the rendering map and handles their orientation and effects.
 * 
 * @param {Enemy[]} enemies - The enemies to render.
 */
addEnemisDirektion(enemies) {
    enemies.forEach(mo => {
        if (!mo.img) return;
        this.ctx.save();
        if (mo.isStunned) {
            this.drawStunnedEnemy(mo);
        } else {
            this.drawNormalEnemy(mo);}
        if (this.debugMode) {
            this.drawFrame(mo, this.getDebugColor(mo));}
        this.ctx.restore();
    });
}

/**
 * Draws a stunned enemy with stun effect.
 * 
 * @param {Enemy} enemy - The enemy to render.
 */
drawStunnedEnemy(enemy) {
    enemy.showStunEffect();
}

/**
 * Draws a normal enemy with proper orientation (mirrored if needed).
 * 
 * @param {Enemy} enemy - The enemy to render.
 */
drawNormalEnemy(enemy) {
    if (enemy.otherDiretion) {
        this.ctx.translate(enemy.x + enemy.width, enemy.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(enemy.img, 0, 0, enemy.width, enemy.height);
    } else {
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
}
    
  /**
 * Draws the debug frame for an enemy if debug mode is active.
 * 
 * @param {Enemy} enemy - The enemy to render debug frame for.
 */
drawEnemyDebugFrame(enemy) {
    if (this.debugMode) {
        this.drawFrame(enemy, this.getDebugColor(enemy));
    }
}
}