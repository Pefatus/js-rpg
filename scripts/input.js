window.keys = { "up": false, "down": false, "left": false, "right": false };

const keyMap = {
    "w": "up", "ArrowUp": "up",
    "s": "down", "ArrowDown": "down",
    "a": "left", "ArrowLeft": "left",
    "d": "right", "ArrowRight": "right",
}

const activateMoveKey = (key) => { if (key in keyMap) window.keys[keyMap[key]] = true };
const deactivateMoveKey = (key) => { if (key in keyMap) window.keys[keyMap[key]] = false };

window.addEventListener("keydown", (e) => activateMoveKey(e.key));
window.addEventListener("keyup", (e) => deactivateMoveKey(e.key));