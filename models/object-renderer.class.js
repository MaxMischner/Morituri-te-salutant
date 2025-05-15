class ObjectRenderer {
    constructor(world) {
        this.world = world;
    }

    renderBackground(backgroundObjects) {
        this.renderObjects(backgroundObjects);
    }

    renderGround(groundTiles) {
        this.renderObjects(groundTiles);
    }

    renderClouds(clouds) {
        this.renderObjects(clouds);
    }

    renderCharacter(character) {
        this.renderObject(character);
    }

    renderCollectables(collectables) {
        this.renderObjects(collectables);
    }

    renderEffects(effects) {
        this.renderObjects(effects);
    }

    renderEnemies(enemies) {
        enemies.forEach(enemy => {
            if (!enemy.img) return;

            this.world.ctx.save();

            if (enemy.isStunned) {
                enemy.showStunEffect();
            } else {
                if (enemy.otherDiretion) {
                    this.world.ctx.translate(enemy.x + enemy.width, enemy.y);
                    this.world.ctx.scale(-1, 1);
                    this.world.ctx.drawImage(enemy.img, 0, 0, enemy.width, enemy.height);
                } else {
                    this.world.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
                }
            }

            if (this.world.debugMode) {
                this.drawFrame(enemy, this.world.debugRenderer.getDebugColor(enemy));
            }

            this.world.ctx.restore();
        });
    }

    renderObjects(objects) {
        objects.forEach(obj => this.renderObject(obj));
    }

    renderObject(obj) {
        if (!obj.img) return;
        this.world.ctx.save();

        if (obj.otherDiretion) {
            this.world.ctx.translate(obj.x + obj.width, obj.y);
            this.world.ctx.scale(-1, 1);
            if (obj instanceof CollectableObject) {
                this.applyGlowEffect(obj);
            }
            this.world.ctx.drawImage(obj.img, 0, 0, obj.width, obj.height);
        } else {
            if (obj instanceof CollectableObject) {
                this.applyGlowEffect(obj);
            }
            this.world.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        }

        if (this.world.debugMode) {
            this.drawFrame(obj, this.world.debugRenderer.getDebugColor(obj));
        }

        this.world.ctx.restore();
    }

    applyGlowEffect(obj) {
        if (!(obj instanceof CollectableObject)) return;

        let time = Date.now() / 500;
        let glow = Math.sin(time) * 10 + 20;

        this.world.ctx.shadowBlur = glow;
        this.world.ctx.shadowColor = this.getGlowColor(obj);
    }

    getGlowColor(obj) {
        if (obj instanceof Blockstone) return "blue";
        if (obj instanceof ScoreItem) return "gold";
        return "white";
    }

    drawFrame(obj, color = 'blue') {
        if (obj instanceof Character || obj instanceof Enemy) {
            this.world.ctx.beginPath();
            this.world.ctx.lineWidth = "5";
            this.world.ctx.strokeStyle = color;
            this.world.ctx.rect(obj.otherDiretion ? 0 : obj.x, obj.otherDiretion ? 0 : obj.y, obj.width, obj.height);
            this.world.ctx.stroke();
        }
    }
}