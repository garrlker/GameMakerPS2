let gamepadIndex = null;

// TODO: Multi gamepad support

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    // Use the first controller that connects
    if (gamepadIndex === null) {
        gamepadIndex = e.gamepad.index;
    }
});

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
    if (e.gamepad.index === gamepadIndex) {
        gamepadIndex = null;
    }
});

// Store last known button state to detect new presses
let lastButtonState = [];
let gp = {buttons: [], axes: []};
let lastAxisState = [];

function joystick_check_button(_joystick, button) {
    return gp.buttons[button - 1]?.pressed || 0;
}
function joystick_zpos() {
    return gp.buttons[6]?.value || 0;
}

function joystick_xpos(_joystick) {
    return gp.axes[0];
}
function joystick_ypos(_joystick) {
    return gp.axes[1];
}
function joystick_rpos(_joystick) {
    return gp.axes[3];
}
function joystick_upos(_joystick) {
    return gp.axes[2];
}
function joystick_vpos(_joystick) {
    return gp.buttons[7]?.value || 0;
}

