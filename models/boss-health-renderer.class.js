class BossHealthRenderer {
    constructor(world) {
        this.world = world;
    }

    draw() {
        const boss = this.world.level.enemies.find(e => e instanceof Endboss);
        if (!boss || !boss.isActive) return;

        this.prepareContext();
        this.drawBossHealthBar(boss);
        this.drawBossName(boss);
        this.world.ctx.restore();
    }

    prepareContext() {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawBossHealthBar(boss) {
        const width = 300;
        const height = 20;
        const margin = 30;
        const x = this.world.canvas.width - width - margin;
        const y = 80;

        const hpPercent = Math.max(0, boss.energy / 100);
        const barWidth = width * hpPercent;

        this.drawBarBackground(x, y, width, height, "#400");
        this.drawBarFill(x + (width - barWidth), y, barWidth, height, "#f00");
        this.drawBarFrame(x, y, width, height, "#000");
    }

    drawBarBackground(x, y, width, height, color) {
        this.world.ctx.fillStyle = color;
        this.world.ctx.fillRect(x, y, width, height);
    }

    drawBarFill(x, y, width, height, color) {
        this.world.ctx.fillStyle = color;
        this.world.ctx.fillRect(x, y, width, height);
    }

    drawBarFrame(x, y, width, height, color) {
        this.world.ctx.strokeStyle = color;
        this.world.ctx.strokeRect(x, y, width, height);
    }

    drawBossName(boss) {
        const width = 300;
        const margin = 30;
        const x = this.world.canvas.width - width - margin;
        const y = 80;

        this.updateBossNameAnimation(boss, y - 10);

        this.world.ctx.globalAlpha = boss.bossNameOpacity;
        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = `bold ${boss.bossNameSize}px serif`;
        this.world.ctx.textAlign = "left";
        this.world.ctx.fillText("MINOTAUROS", x, boss.bossNameY);
    }

    updateBossNameAnimation(boss, targetY) {
        if (boss.bossNameOpacity < 1) boss.bossNameOpacity += 0.005;
        if (boss.bossNameSize > 24) boss.bossNameSize -= 0.3;
        if (boss.bossNameY > targetY) boss.bossNameY -= 1.2;
    }
}