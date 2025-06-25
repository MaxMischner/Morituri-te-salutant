class MoveableObjectUtils {

/**
 * @private
 * Returns the current attack hitbox.
 * @returns {{x: number, y: number, width: number, height: number}}
 */
    static getAttackHitbox(obj) {
        return {
            x: obj.otherDiretion
                ? obj.x - obj.attackRange.offsetX
                : obj.x + obj.width,
            y: obj.y + obj.offset.top,
            width: obj.attackRange.width,
            height: obj.height - obj.offset.top - obj.offset.bottom
        };
    }

/**
 * @private
 * Returns the target's hitbox.
 * @param {Object} target - The target object.
 * @returns {{x: number, y: number, width: number, height: number}}
 */
static getTargetHitbox(target) {
        return {
            x: target.x + target.offset.left,
            y: target.y + target.offset.top,
            width: target.width - target.offset.left - target.offset.right,
            height: target.height - target.offset.top - target.offset.bottom
        };
    }

/**
 * @private
 * Checks if two boxes collide.
 * @param {Object} hitbox 
 * @param {Object} targetBox 
 * @returns {boolean}
 */
   static isCollision(hitbox, targetBox) {
        const tolerance = 5;
        return (hitbox.x - tolerance) < (targetBox.x + targetBox.width) &&
               (hitbox.x + hitbox.width + tolerance) > targetBox.x &&
               (hitbox.y - tolerance) < (targetBox.y + targetBox.height) &&
               (hitbox.y + hitbox.height + tolerance) > targetBox.y;
    }

/**
 * @private
 * Checks if the target was already hit recently.
 * @param {Object} target 
 * @returns {boolean} Whether the target should be skipped.
 */
 static handleAlreadyHit(target) {
        if (target.alreadyHit) {
            return true;
        }
        target.alreadyHit = true;
        setTimeout(() => {
            target.alreadyHit = false;
        }, 500);
        return false;
    }

/**
 * @private
 * Applies hit effects based on target type.
 * @param {Object} target 
 */
 static applyHitEffects(obj, target) {
        if (target instanceof Character) {
            if (target.isBlocking) {
                obj.isStunned = true;
                obj.stunTime = Date.now();
            } else {
                target.takeDamage(20);
            }
        } else if (target instanceof Enemy) {
            target.takeDamage(20);
        }

    }

/**
 * @private
 * Checks if the object is dead or invincible.
 * @returns {boolean} True if immune to damage.
 */
static isImmuneToDamage(obj) {
        if (obj.isDead || obj.isInvincible) {
            return true;
        }
        return false;
    }

/**
 * @private
 * Handles blocking logic if the object is a blocking Character.
 * @param {Object|null} attacker - The attacking entity.
 * @returns {boolean} True if attack was blocked.
 */
 static handleBlock(obj, attacker) {
        if (obj instanceof Character && obj.isBlocking) {
            soundManager.play("block");
            obj.blockEnergy--;
            if (obj.blockEnergy <= 0) {
                obj.isBlocking = false; }
            if (attacker instanceof Enemy) {
                attacker.isStunned = true;
                attacker.stunTime = Date.now();}
            return true; 
        }
        return false;
 }

/**
 * @private
 * Handles stun logic for stunned enemies.
 * @returns {boolean} True if stunned enemy should not deal damage.
 */
  static handleEnemyStun(obj) {
        if (obj instanceof Enemy && obj.isStunned) {

            return true;
        }
        return false;
    }

/**
 * @private
 * Applies damage, triggers death or hurt effects.
 * @param {number} amount - The damage amount to apply.
 */
 static applyDamage(obj, amount) {
        obj.energy -= amount;
        if (obj.energy <= 0) {
            obj.energy = 0;
            obj.die("deathEnemy");
        } else {
            obj.isHurt = true;
            obj.playHurtAnimation();
            obj.onHitEffect();
            soundManager.play("hit");
            MoveableObjectUtils.startInvincibility(obj);
            MoveableObjectUtils.resetHurtState(obj);
        }  
    }

/**
 * @private
 * Starts invincibility period after taking damage.
 */
 static startInvincibility(obj) {
        obj.isInvincible = true;
        setTimeout(() => {
            obj.isInvincible = false;
        }, obj.invincibilityDuration);
    }

/**
 * @private
 * Resets hurt state after the hurt animation ends.
 */
 static resetHurtState(obj) {
        setTimeout(() => {
            obj.isHurt = false;
        }, obj.IMAGES_HURT.length * obj.animationSpeeds.HURT);
    }

    /**
 * @private
 * Starts the interval that updates the death animation frames.
 */
static startDeathAnimationInterval(obj) {
    const deathInterval = setInterval(() => {
        if (MoveableObjectUtils.isDeathAnimationFinished(obj)) {
            clearInterval(deathInterval);
            MoveableObjectUtils.showFinalDeathFrame(obj);
            return;
        }
        MoveableObjectUtils.updateDeathAnimationFrame(obj);
    }, 150);
}

/**
 * @private
 * Checks if the death animation has finished.
 * @returns {boolean}
 */
static isDeathAnimationFinished(obj) {
    return obj.currentImage >= obj.IMAGES_DEAD.length;
}

/**
 * @private
 * Shows the last frame of the death animation permanently.
 */
static showFinalDeathFrame(obj) {
    const path = obj.IMAGES_DEAD[obj.IMAGES_DEAD.length - 1];
    obj.img = obj.imageCache[path];
}

/**
 * @private
 * Updates the current frame of the death animation.
 */
static updateDeathAnimationFrame(obj) {
    const path = obj.IMAGES_DEAD[obj.currentImage];
    obj.img = obj.imageCache[path];
    obj.currentImage++;
}
}