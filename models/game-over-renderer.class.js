class GameOverRenderer {
    constructor(world) {
        this.world = world;
    }

    draw() {
        if (!this.world.character || !this.world.character.isDead) return;

        this.drawOverlay();
        this.drawDeathTitle();
        this.drawRetryButton();
        this.saveRetryButtonPosition();
    }

    drawOverlay(opacity = 0.5) {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.world.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    drawDeathTitle() {
        const { x, y, scale } = this.getFloatingTitleTransform();
        this.world.ctx.translate(x, y);
        this.world.ctx.scale(scale, scale);
        this.drawCenteredShadowText("YOU DIED...", "bold 64px Arial", "#ff4444");
    }

    getFloatingTitleTransform() {
        const time = Date.now() / 500;
        const offset = Math.sin(time) * 3;
        const scale = 1 + Math.sin(time) * 0.03;

        return {
            x: this.world.canvas.width / 2,
            y: this.world.canvas.height / 2 + offset,
            scale
        };
    }

    drawCenteredShadowText(text, font, color) {
        this.world.ctx.fillStyle = color;
        this.world.ctx.font = font;
        this.world.ctx.textAlign = "center";
        this.world.ctx.shadowColor = "#000";
        this.world.ctx.shadowBlur = 10;
        this.world.ctx.fillText(text, 0, 0);
    }

    drawRetryButton() {
        this.world.ctx.shadowBlur = 0;
        this.world.ctx.fillStyle = "#222";
        this.world.ctx.fillRect(-80, 60, 160, 40);
        this.world.ctx.strokeStyle = "#fff";
        this.world.ctx.strokeRect(-80, 60, 160, 40);
        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = "20px Arial";
        this.world.ctx.fillText("RETRY", 0, 87);
        this.world.ctx.restore();
    }

    saveRetryButtonPosition() {
        const x = this.world.canvas.width / 2 - 80;
        const y = this.world.canvas.height / 2 + 60;
        const width = 160;
        const height = 40;

        this.world.retryButton = {
            x, y, width, height, visible: true
        };
    }
}