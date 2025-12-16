// Only one pad is supported at the moment
// Waiting on a PR in AthenaEnv that adds better multi-pad support
const pad1 = Pads.get(0);

/**
 * This idle waits a game until a 2nd pad is connected. 
 * Will enable multipad support once this PR is merged: https://github.com/DanielSant0s/AthenaEnv/pull/129
 */
// const pad2 = Pads.get(1); 

function getPad(_joystick) {
    return pad1;
    // if (joystick === 1) return pad1;
    // if (joystick === 2) return pad2;
}

// Map GameMaker button numbers to PS2 pad button constants
// Button numbers are 1-indexed in GameMaker
function getPadButton(button) {
    switch(button) {
        case 1: return Pads.CROSS;
        case 2: return Pads.CIRCLE;
        case 3: return Pads.SQUARE;
        case 4: return Pads.TRIANGLE;
        case 5: return Pads.L1;
        case 6: return Pads.R1;
        case 7: return Pads.L2;
        case 8: return Pads.R2;
        case 9: return Pads.SELECT;
        case 10: return Pads.START;
        case 11: return Pads.L3;
        case 12: return Pads.R3;
        case 13: return Pads.UP;
        case 14: return Pads.DOWN;
        case 15: return Pads.LEFT;
        case 16: return Pads.RIGHT;
        default: return null;
    }
}

// Update pad state - called each frame
function updatePad() {
    pad1.update();
    //pad2.update();
}

// GameMaker engine joystick functions implemented using AthenaEnv's Pads module
function joystick_check_button(joystick, button) {
    const padButton = getPadButton(button);
    if (padButton === null) return 0;
    return getPad(joystick).pressed(padButton) ? 1 : 0; 
}

// L2 trigger (Z axis) - returns pressure value 0-255
function joystick_zpos(joystick) {
    return Pads.getPressure(joystick - 1, Pads.L2);
}

// Left stick X axis
function joystick_xpos(joystick) {
    // Normalize from -127..128 to -1..1
    return getPad(joystick).lx / 128;
}

// Left stick Y axis
function joystick_ypos(joystick) {
    return getPad(joystick).ly / 128;
}

// Right stick Y axis (R axis)
function joystick_rpos(joystick) {
    return getPad(joystick).ry / 128;
}

// Right stick X axis (U axis)
function joystick_upos(joystick) {
    return getPad(joystick).rx / 128;
}

// R2 trigger (V axis) - returns pressure value 0-255
function joystick_vpos(joystick) {
    return Pads.getPressure(joystick - 1, Pads.R2);
}

