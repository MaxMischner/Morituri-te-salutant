class HealthBarRenderer {
    constructor(world) {
        this.world = world;
    }

    draw() {
        if (!this.world.character || this.world.character.energy === undefined) return;

        this.prepareContext();
        this.drawHealthBarBackground();
        this.drawHealthBarFill(this.world.character.energy);
        this.drawHealthBarFrame();
        this.drawBlockIcons();
        this.world.ctx.restore();
    }

    prepareContext() {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawHealthBarBackground() {
        this.world.ctx.fillStyle = "#444";
        this.world.ctx.fillRect(20, 20, 200, 20);
    }

    drawHealthBarFill(energy) {
        const maxEnergy = 100;
        const energyPercent = Math.max(0, energy / maxEnergy);
        const barWidth = 200 * energyPercent;

        const gradient = this.world.ctx.createLinearGradient(20, 20, 220, 20);
        gradient.addColorStop(1.0, "#0f0");
        gradient.addColorStop(0.5, "#ff0");
        gradient.addColorStop(0.0, "#f00");

        this.world.ctx.fillStyle = gradient;
        this.world.ctx.fillRect(20, 20, barWidth, 20);
    }

    drawHealthBarFrame() {
        this.world.ctx.strokeStyle = "#000";
        this.world.ctx.lineWidth = 2;
        this.world.ctx.strokeRect(20, 20, 200, 20);
    }

    drawBlockIcons() {
        if (!this.world.character || this.world.character.blockEnergy === undefined) return;
        if (!this.world.blockIcon || !this.world.blockIcon.complete) return;

        const iconSize = 20;
        const spacing = 4;
        const startX = 20;
        const y = 50;

        for (let i = 0; i < this.world.character.blockEnergy; i++) {
            const x = startX + i * (iconSize + spacing);
            this.world.ctx.drawImage(this.world.blockIcon, x, y, iconSize, iconSize);
        }
    }
}