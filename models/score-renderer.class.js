class ScoreRenderer {
    constructor(world) {
        this.world = world;
        this.initImages();
    }

    initImages() {
        this.scoreIcon = new Image();
        this.scoreIcon.src = "img/Collectebals/PNG/shiny/5.png";
    }

    draw() {
        if (!this.world.character || this.world.character.score === undefined) return;
        if (!this.scoreIcon || !this.scoreIcon.complete) return;

        this.prepareContext();
        this.drawScoreIconAndText(this.world.character.score);
        this.world.ctx.restore();
    }

    prepareContext() {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawScoreIconAndText(score) {
        const iconSize = 32;
        const x = 20;
        const y = 80;

        this.world.ctx.drawImage(this.scoreIcon, x, y, iconSize, iconSize);

        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = "20px Arial";
        this.world.ctx.textAlign = "left";
        this.world.ctx.fillText(`${score}`, x + iconSize + 10, y + iconSize - 8);
    }
}