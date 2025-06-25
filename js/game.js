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

/**
 * Checks the screen orientation on mobile devices and toggles the 
 * visibility of an overlay prompting the user to rotate their device.
 * 
 * The overlay is shown if the screen width is below 480px and 
 * the device is held in portrait mode.
 */
function checkOrientation() {
    const overlay = document.getElementById('rotate-overlay');

    const isMobile = window.innerWidth < 480;
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
    if (e.keyCode === 68) keyboard.RIGTH = true;  // D → Right
    if (e.keyCode === 65) keyboard.LEFT = true;   // A → Left
    if (e.keyCode === 87) keyboard.UP = true;     // W → Up (Jump)
    if (e.keyCode === 83) keyboard.DOWN = true;   // S → Down
    if (e.keyCode === 32) keyboard.SPACE = true;  // SPACE → Attack
    if (e.keyCode === 69) keyboard.E = true;      // E → Block
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
    if (e.keyCode === 68) keyboard.RIGTH = false; // D → Right
    if (e.keyCode === 65) keyboard.LEFT = false;  // A → Left
    if (e.keyCode === 87) keyboard.UP = false;    // W → Up
    if (e.keyCode === 83) keyboard.DOWN = false;  // S → Down
    if (e.keyCode === 32) keyboard.SPACE = false; // SPACE → Attack
    if (e.keyCode === 69) keyboard.E = false;     // E → Block
}


/**
 * Enables touch control for the left movement button.
 * When pressed, the character moves left.
 */
document.getElementById('leftButton').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
document.getElementById('leftButton').addEventListener('touchend', () => {
    keyboard.LEFT = false;
});

/**
 * Enables touch control for the right movement button.
 * When pressed, the character moves right.
 */
document.getElementById('rightButton').addEventListener('touchstart', () => {
    keyboard.RIGTH = true;
});
document.getElementById('rightButton').addEventListener('touchend', () => {
    keyboard.RIGTH = false;
});

/**
 * Enables touch control for the jump button.
 * When pressed, the character jumps.
 */
document.getElementById('jumpButton').addEventListener('touchstart', () => {
    keyboard.UP = true;
});
document.getElementById('jumpButton').addEventListener('touchend', () => {
    keyboard.UP = false;
});

/**
 * Enables touch control for the attack button.
 * When pressed, the character performs an attack.
 */
document.getElementById('attackButton').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
document.getElementById('attackButton').addEventListener('touchend', () => {
    keyboard.SPACE = false;
});

/**
 * Enables touch control for the block button.
 * When pressed, the character blocks incoming attacks.
 */
document.getElementById('blockButton').addEventListener('touchstart', () => {
    keyboard.E = true;
});
document.getElementById('blockButton').addEventListener('touchend', () => {
    keyboard.E = false;
});


