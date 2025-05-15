class CollisionManager {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        this.checkEnemyHits();
        this.checkCollectables();
    }

    checkEnemyHits() {
        this.world.level.enemies.forEach(enemy => {
            if (this.world.character.isAttacking && this.world.character.isAttackFrameActive()) {
                if (this.world.character.hit(enemy)) {
                    enemy.takeDamage();
                }
            }

            if (!enemy.isDead) {
                enemy.tryAttack(this.world.character);
            }
        });
    }

    checkCollectables() {
        this.world.level.collectableObjects.forEach((collectable, index) => {
            if (this.world.character.isColliding(collectable)) {
                collectable.onCollect(this.world.character);
                this.world.level.collectableObjects.splice(index, 1);
            }
        });
    }
}