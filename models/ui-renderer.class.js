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

   


   isInside(x, y, element) {
    return x >= element.x && 
           x <= element.x + element.width && 
           y >= element.y && 
           y <= element.y + element.height;
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