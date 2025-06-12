
let canvas;
let world ;
let keyboard = new Keyboard();



/**
 * Initializes the game.
 * Creates the canvas, keyboard, game state manager, and world.
 * Starts the world loop.
 * @public
 */
function init() {
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();
    const gameStateManager = new GameStateManager(null);
    world = new World(canvas, keyboard, gameStateManager);
    gameStateManager.setWorld(world);
    world.start();
}



window.addEventListener("keydown", (e) => {
    if (e.keyCode == 68) { // D
        keyboard.RIGTH = true;
    }
    if (e.keyCode == 65) { // A
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) { // W
        keyboard.UP = true;
    }
    if (e.keyCode == 83) { // S
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) { // SPACE
        keyboard.SPACE = true;
    }
    if (e.keyCode == 69) { // E 
        keyboard.E = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 68) { // D
        keyboard.RIGTH = false;
    }
    if (e.keyCode == 65) { // A
        keyboard.LEFT = false;
    }
    if (e.keyCode == 87) { // W
        keyboard.UP = false;
    }
    if (e.keyCode == 83) { // S
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) { // SPACE
        keyboard.SPACE = false;
    }
    if (e.keyCode == 69) { // E 
        keyboard.E = false;
    }
});

document.getElementById('leftButton').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
document.getElementById('leftButton').addEventListener('touchend', () => {
    keyboard.LEFT = false;
});

document.getElementById('rightButton').addEventListener('touchstart', () => {
    keyboard.RIGTH = true;
});
document.getElementById('rightButton').addEventListener('touchend', () => {
    keyboard.RIGTH = false;
});

document.getElementById('jumpButton').addEventListener('touchstart', () => {
    keyboard.UP = true;
});
document.getElementById('jumpButton').addEventListener('touchend', () => {
    keyboard.UP = false;
});

document.getElementById('attackButton').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
document.getElementById('attackButton').addEventListener('touchend', () => {
    keyboard.SPACE = false;
});
document.getElementById('blockButton').addEventListener('touchstart', () => {
    keyboard.E = true;
});
document.getElementById('blockButton').addEventListener('touchend', () => {
    keyboard.E = false;
});

