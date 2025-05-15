class InputManager {
    constructor(world) {
        this.world = world;
    }

    setupInput() {
        console.log("Setting up input...");
        this.addKeyboardListeners();
        this.addMouseListeners();
    }

    addKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                this.world.keyboard.RIGHT = true;
            }
            if (e.keyCode == 37) {
                this.world.keyboard.LEFT = true;
            }
            if (e.keyCode == 38) {
                this.world.keyboard.UP = true;
            }
            if (e.keyCode == 40) {
                this.world.keyboard.DOWN = true;
            }
            if (e.keyCode == 32) {
                this.world.keyboard.SPACE = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.keyCode == 39) {
                this.world.keyboard.RIGHT = false;
            }
            if (e.keyCode == 37) {
                this.world.keyboard.LEFT = false;
            }
            if (e.keyCode == 38) {
                this.world.keyboard.UP = false;
            }
            if (e.keyCode == 40) {
                this.world.keyboard.DOWN = false;
            }
            if (e.keyCode == 32) {
                this.world.keyboard.SPACE = false;
            }
        });
    }

 addMouseListeners() {
    this.world.canvas.addEventListener('click', (event) => {
        console.log("Canvas clicked!");
        const rect = this.world.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const state = this.world.gameStateManager.getCurrentState();
         console.log("Current state:", state);
        if (state === 'menu') {
            this.world.characterSelectionManager.handleCharacterSelection(x, y);
        } 
        else if (state === 'gameOver') {
            const button = this.world.retryButton;
            if (button.visible && this.world.ui.isInside(x, y, button)) {
                this.world.gameStateManager.restartGame();
            }
        } 
        else  if (state === 'victory') {
            const button = this.world.victoryButton;
            console.log("Victory button:", button);
            console.log("Click coordinates:", x, y);
            console.log("Is inside:", this.world.ui.isInside(x, y, button));
            if (button.visible && this.world.ui.isInside(x, y, button)) {
                console.log("Button clicked!");
                this.world.gameStateManager.restartGame();
            }
        }
    });
}

}