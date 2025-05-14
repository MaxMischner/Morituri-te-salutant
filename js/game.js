let canvas;
let world ;
let keyboard = new Keyboard();



function init() {
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);

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
    if (e.keyCode == 69) { // E (neue Taste → z.B. für Interaktion)
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
    if (e.keyCode == 69) { // E (neue Taste → z.B. für Interaktion)
        keyboard.E = false;
    }
});
