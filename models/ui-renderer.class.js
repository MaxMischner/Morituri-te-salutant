class UIRenderer {

    
    constructor(world) {
        this.world = world;
        this.healthBarRenderer = new HealthBarRenderer(world);
        this.scoreRenderer = new ScoreRenderer(world);
        this.bossHealthRenderer = new BossHealthRenderer(world);
        this.menuRenderer = new MenuRenderer(world);
        this.gameOverRenderer = new GameOverRenderer(world);
        this.victoryScreenRenderer = new VictoryScreenRenderer(world);

        this.soundButton = {
            x: 230, // direkt rechts neben der Healthbar (20 + 200 + 10)
            y: 20,
            width: 30,
            height: 30,
            iconOn: new Image(),
            iconOff: new Image()
        };
        this.soundButton.iconOn.src = "img/Interface/Icons_31.png";
        this.soundButton.iconOff.src = "img/Interface/Icons_29.png";

        
       
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
          this.drawSoundButton();
          
    }

    drawStartMenu(characterSelection, selectedCharacter) {
        this.menuRenderer.draw(characterSelection, selectedCharacter);
    }

    drawSoundButton() {
        const ctx = this.world.ctx;
        const btn = this.soundButton;
        if (!btn.iconOn.complete || !btn.iconOff.complete) return;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const icon = soundManager.enabled ? btn.iconOn : btn.iconOff;
        ctx.drawImage(icon, btn.x, btn.y, btn.width, btn.height);
        ctx.restore();
    }

    drawStartScreen() {
    const ctx = this.world.ctx;
    const canvas = this.world.canvas;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Hintergrundbild (wie im Menü)
    if (this.menuRenderer.startBackground.complete) {
        ctx.drawImage(this.menuRenderer.startBackground, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#1a1aff"; // Fallback-Farbe
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Spieltitel
    ctx.fillStyle = "#fff";
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Morituri te salutant", canvas.width / 2, 40);

    // Play-Button
    const btn = this.world.playButton;
    // NEU: Button-Grafik als Hintergrund
if (!this.playButtonImage) {
    this.playButtonImage = new Image();
    this.playButtonImage.src = "img/Interface/69.png"; // Stelle sicher, dass die Datei dorthin kopiert wird
}

if (this.playButtonImage.complete) {
    ctx.drawImage(this.playButtonImage, btn.x, btn.y, btn.width, btn.height);
} else {
    ctx.fillStyle = "#f00";
    ctx.fillRect(btn.x, btn.y, btn.width, btn.height); // Fallback
}


    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px Arial";
    ctx.fillText("Play", btn.x + btn.width / 2, btn.y + btn.height / 2 + 8);

    ctx.restore();
}


}