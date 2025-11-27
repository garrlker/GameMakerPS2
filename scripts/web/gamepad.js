// Scaffold code for using the Web Gamepad API to connect to the first controller
// and log button presses to the console

let gamepadIndex = null;

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
// Store last known axis state to detect changes
let lastAxisState = [];
// Poll gamepad state and log when a button is pressed
function pollGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    if (gamepadIndex !== null && gamepads[gamepadIndex]) {
        gp = gamepads[gamepadIndex];
        
        // Log button presses
        for (let i = 0; i < gp.buttons.length; ++i) {
            const pressed = gp.buttons[i].pressed;
            const value = gp.buttons[i].value; // For triggers, value ranges 0.0 to 1.0
            // On new press, log info
            if (pressed && !lastButtonState[i]) {
                console.log(`Button ${i} pressed (value: ${value.toFixed(3)})`);
            }
            // Log trigger values (typically buttons 6 and 7 for L2/R2)
            if (value > 0.01 && !pressed) {
                // This is a trigger being pressed (analogue input)
                if (i === 6 || i === 7) {
                    console.log(`Trigger ${i === 6 ? 'L2' : 'R2'} (button ${i}): ${value.toFixed(3)}`);
                }
            }
            lastButtonState[i] = pressed;
        }
        
        // Log analogue stick data (axes)
        if (gp.axes.length > 0) {
            // Initialize lastAxisState if needed
            if (lastAxisState.length !== gp.axes.length) {
                lastAxisState = new Array(gp.axes.length).fill(0);
            }
            
            for (let i = 0; i < gp.axes.length; ++i) {
                const axisValue = gp.axes[i];
                const threshold = 0.1; // Only log if moved significantly
                
                // Log when axis value changes significantly
                if (Math.abs(axisValue - lastAxisState[i]) > threshold) {
                    const stickName = i < 2 ? (i === 0 ? 'Left Stick X' : 'Left Stick Y') 
                                         : (i === 2 ? 'Right Stick X' : 'Right Stick Y');
                    console.log(`${stickName} (axis ${i}): ${axisValue.toFixed(3)}`);
                    lastAxisState[i] = axisValue;
                } else if (Math.abs(axisValue) > threshold) {
                    // Update lastAxisState even if not logging
                    lastAxisState[i] = axisValue;
                }
            }
        }
    }
    requestAnimationFrame(pollGamepad);
}

// Initialize polling
requestAnimationFrame(pollGamepad);

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

