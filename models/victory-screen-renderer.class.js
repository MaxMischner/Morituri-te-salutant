class VictoryScreenRenderer {
    constructor(world) {
        this.world = world;
    }

    draw() {
        const boss = this.world.level.enemies.find(e => e instanceof Endboss);
        if (!boss || !boss.isDead) return;
        if (!this.victoryStateSet) {
        
        this.victoryStateSet = true;
    }

        this.prepareContext();
        this.drawVictoryOverlay();
        this.drawVictoryTitle();
        this.drawVictoryScore();
        this.drawVictoryButton();
        this.saveVictoryButtonPosition();
        this.world.ctx.restore();
    }

    prepareContext() {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawVictoryOverlay() {
        this.world.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    drawVictoryTitle() {
        this.world.ctx.fillStyle = "#ffff66";
        this.world.ctx.font = "bold 70px Arial";
        this.world.ctx.textAlign = "center";
        this.world.ctx.shadowColor = "#000";
        this.world.ctx.shadowBlur = 10;
        this.world.ctx.fillText("VICTORY", this.world.canvas.width / 2, this.world.canvas.height / 2 - 80);
    }

    drawVictoryScore() {
        const score = this.world.character.score || 0;

        this.world.ctx.font = "30px Arial";
        this.world.ctx.shadowBlur = 5;
        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.fillText(`Your Score: ${score}`, this.world.canvas.width / 2, this.world.canvas.height / 2);
    }

    drawVictoryButton() {
        const btnX = this.world.canvas.width / 2 - 100;
        const btnY = this.world.canvas.height / 2 + 60;
        const btnW = 200;
        const btnH = 50;

        this.world.ctx.shadowBlur = 0;
        this.world.ctx.fillStyle = "#222";
        this.world.ctx.fillRect(btnX, btnY, btnW, btnH);

        this.world.ctx.strokeStyle = "#fff";
        this.world.ctx.strokeRect(btnX, btnY, btnW, btnH);

        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = "24px Arial";
        this.world.ctx.fillText("PLAY AGAIN", this.world.canvas.width / 2, btnY + 33);
    }

    saveVictoryButtonPosition() {
        const x = this.world.canvas.width / 2 - 100;
        const y = this.world.canvas.height / 2 + 60;
        const width = 200;
        const height = 50;

        this.world.victoryButton = {
            x,
            y,
            width,
            height,
            visible: true
        };
    }
}