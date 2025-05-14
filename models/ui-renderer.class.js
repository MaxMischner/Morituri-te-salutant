class UIRenderer {
    constructor(world) {
        this.world = world;
        this.healthBarRenderer = new HealthBarRenderer(world);
        this.scoreRenderer = new ScoreRenderer(world);
        this.bossHealthRenderer = new BossHealthRenderer(world);
        this.menuRenderer = new MenuRenderer(world);
        this.gameOverRenderer = new GameOverRenderer(world);
        this.victoryScreenRenderer = new VictoryScreenRenderer(world);

       
    }

   


    isInside(x, y, rect) {
        return (
            x >= rect.x &&
            x <= rect.x + rect.width &&
            y >= rect.y &&
            y <= rect.y + rect.height
        );
    }

    drawAll() {
        this.healthBarRenderer.draw();
        this.scoreRenderer.draw();
        this.bossHealthRenderer.draw();
        this.gameOverRenderer.draw();
        this.victoryScreenRenderer.draw();
    }

    drawStartMenu(characterSelection, selectedCharacter) {
        this.menuRenderer.draw(characterSelection, selectedCharacter);
    }

}