// AthenaEnv Pads module implementation for PS2 gamepad support
// Replaces Web Gamepad API with native PS2 pad support

// Get pad at port 0 (first controller)
// Note: If pad is already initialized elsewhere (e.g., yyIOManager.js),
// Pads.get(0) should return the same instance
const gamepadPad = Pads.get(0);

// Map GameMaker button numbers to PS2 pad button constants
// Button numbers are 1-indexed in GameMaker (button parameter)
function getPadButton(button) {
    // Standard PS2 controller button mapping
    // Button 1 = CROSS, Button 2 = CIRCLE, Button 3 = SQUARE, Button 4 = TRIANGLE
    // Button 5 = L1, Button 6 = R1, Button 7 = L2, Button 8 = R2
    // Button 9 = SELECT, Button 10 = START, Button 11 = L3, Button 12 = R3
    // Button 13 = UP, Button 14 = DOWN, Button 15 = LEFT, Button 16 = RIGHT
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

// Update pad state - should be called each frame
// This replaces the polling mechanism from Web Gamepad API
// Note: pad.update() should be called in the main game loop (e.g., in GameMaker_DoAStep)
function updatePad() {
    gamepadPad.update();
}

// GameMaker joystick functions using AthenaEnv Pads module
function joystick_check_button(_joystick, button) {
    const padButton = getPadButton(button);
    if (padButton === null) return 0;
    return gamepadPad.pressed(padButton) ? 1 : 0;
}

// L2 trigger (Z axis) - returns pressure value 0-255
function joystick_zpos() {
    return Pads.getPressure(0, Pads.L2);
}

// Left stick X axis
function joystick_xpos(_joystick) {
    // Normalize from -127..128 to -1..1
    return gamepadPad.lx / 128;
}

// Left stick Y axis
function joystick_ypos(_joystick) {
    return gamepadPad.ly / 128;
}

// Right stick Y axis (R axis)
function joystick_rpos(_joystick) {
    return gamepadPad.ry / 128;
}

// Right stick X axis (U axis)
function joystick_upos(_joystick) {
    return gamepadPad.rx / 128;
}

// R2 trigger (V axis) - returns pressure value 0-255
function joystick_vpos(_joystick) {
    return Pads.getPressure(0, Pads.R2);
}

