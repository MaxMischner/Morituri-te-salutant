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
    cleanupOldWorld();
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();
    const gameStateManager = new GameStateManager(null);
    world = new World(canvas, keyboard, gameStateManager);
    gameStateManager.setWorld(world);
    world.start();
}

/**
 * Cleans up the old world before initializing a new one.
 * Stops the old world's drawing loop, world timers, and event listeners.
 * @private
 */
function cleanupOldWorld() {
    if (world) {
        world.stopDrawingLoop();
        world.stopWorldTimers();
        if (world.mouseHandler) {
            world.canvas.removeEventListener("click", world.mouseHandler);
        }
        if (world.touchHandler) {
            world.canvas.removeEventListener("touchstart", world.touchHandler);
        }
    }
}

/**
 * Checks the screen orientation on mobile devices and toggles the 
 * visibility of an overlay prompting the user to rotate their device.
 * 
 * The overlay is shown if the screen width is below 480px and 
 * the device is held in portrait mode.
 */
function checkOrientation() {
    const overlay = document.getElementById('rotate-overlay');

    const isMobile = window.innerWidth < 1025;
    const isPortrait = window.innerHeight > window.innerWidth;

    overlay.style.display = (isMobile && isPortrait) ? 'flex' : 'none';
}

/**
 * Adds listeners to handle orientation changes and window resizing.
 * Shows or hides the rotate overlay based on device orientation.
 */
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/**
 * Adds keyboard listeners for character movement and actions.
 * 
 * W → Jump
 * A → Move Left
 * S → Move Down
 * D → Move Right
 * SPACE → Attack
 * E → Block
 */
window.addEventListener("keydown", handleKeyDown);

/**
 * Handles keydown events for movement and actions.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function handleKeyDown(e) {
    if (!world?.gameStateManager || world.gameStateManager.currentState !== 'playing') return;

    switch (e.code) {
        case "KeyD": keyboard.RIGTH = true; break;
        case "KeyA": keyboard.LEFT = true; break;
        case "KeyW": keyboard.UP = true; break;
        case "KeyS": keyboard.DOWN = true; break;
        case "Space": keyboard.SPACE = true; break;
        case "KeyE": keyboard.E = true; break;
    }
}

/**
 * Adds a keyup listener to reset movement and action keys when released.
 */
window.addEventListener("keyup", handleKeyUp);

/**
 * Handles key release events for movement and actions.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function handleKeyUp(e) {
    switch (e.code) {
        case "KeyD": keyboard.RIGTH = false; break;
        case "KeyA": keyboard.LEFT = false; break;
        case "KeyW": keyboard.UP = false; break;
        case "KeyS": keyboard.DOWN = false; break;
        case "Space": keyboard.SPACE = false; break;
        case "KeyE": keyboard.E = false; break;
    }
}



/**
 * Enables touch control for the left movement button.
 * When pressed, the character moves left.
 */
document.getElementById('leftButton').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});
document.getElementById('leftButton').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

/**
 * Enables touch control for the right movement button.
 * When pressed, the character moves right.
 */
document.getElementById('rightButton').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGTH = true;
});
document.getElementById('rightButton').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGTH = false;
});

/**
 * Enables touch control for the jump button.
 * When pressed, the character jumps.
 */
document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
});
document.getElementById('jumpButton').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
});

/**
 * Enables touch control for the attack button.
 * When pressed, the character performs an attack.
 */
document.getElementById('attackButton').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});
document.getElementById('attackButton').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

/**
 * Enables touch control for the block button.
 * When pressed, the character blocks incoming attacks.
 */
document.getElementById('blockButton').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.E = true;
});
document.getElementById('blockButton').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.E = false;
});


