class MenuRenderer {
    constructor(world) {
        this.world = world;
        this.initImages();
    }

    initImages() {
        this.startBackground = new Image();
        this.startBackground.src = "img/Interface/1.png";
    }

    draw(characterSelection, selectedCharacter) {
        this.prepareContext();
        this.drawStartBackground();
        this.drawStartTitle();
        this.drawCharacterOptions(characterSelection, selectedCharacter);
        this.world.ctx.restore();
    }

    prepareContext() {
        this.world.ctx.save();
        this.world.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawStartBackground() {
        if (this.startBackground.complete) {
            this.world.ctx.drawImage(this.startBackground, 0, 0, this.world.canvas.width, this.world.canvas.height);
        } else {
            this.world.ctx.fillStyle = "#1a1aff";
            this.world.ctx.fillRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        }
    }

    drawStartTitle() {
        this.world.ctx.fillStyle = "#fff";
        this.world.ctx.font = "bold 30px Arial";
        this.world.ctx.textAlign = "center";
        this.world.ctx.textBaseline = "middle";
        this.world.ctx.fillText("Choose Your Character", this.world.canvas.width / 2, 30);
    }

    drawCharacterOptions(characterSelection, selectedCharacter) {
        characterSelection.forEach(char => {
            if (!char.img) {
                char.img = new Image();
                char.img.src = char.imgSrc;
            }

            if (char.img.complete) {
                this.world.ctx.drawImage(char.img, char.x, char.y, 100, 100);
            }

            this.world.ctx.fillStyle = "#fff";
            this.world.ctx.font = "20px Arial";
            this.world.ctx.fillText(char.name, char.x + 50, char.y + 130);

            if (selectedCharacter === char.name) {
                this.drawSelectionHighlight(char);
            }
        });
    }

    drawSelectionHighlight(char) {
        this.world.ctx.strokeStyle = "#ffff00";
        this.world.ctx.lineWidth = 3;
        this.world.ctx.strokeRect(char.x - 5, char.y - 5, 110, 110);
    }
}