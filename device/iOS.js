
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            LoadGame.js
// Created:         18/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Deals with loading the whole game file
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 18/02/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************

// Track the identifiers for the current list of active input events
var g_activeInputEventIDs = [];
var g_event = "None";

// #############################################################################################
/// Function:<summary>
///             Load a whole game from the "game file" object
///          </summary>
// #############################################################################################
function yyTouch(_id,_x,_y)
{
    this.id=_id;
    this.x = _x;
    this.y = _y;
}


function log(msg) {
    setTimeout(function () {
        throw new Error(msg);
    }, 0);
}

function getExistingMouseDevice(touchEventId) 
{   
    for (var i in g_activeInputEventIDs) {
        if (g_activeInputEventIDs[i] == touchEventId) {
            return i;
        }
    }
    log("Failed to find pre-exisiting mouse device index");
    return -1;    
}

function allocateMouseDevice(touchEventId) {

    var mouseDevice = -1;
    for (var i in g_activeInputEventIDs) {
        if ((g_activeInputEventIDs[i] == touchEventId) || (g_activeInputEventIDs[i] == -1)) {
            mouseDevice = i;
            break;
        }
    }
    if (mouseDevice == -1) {
        mouseDevice = g_activeInputEventIDs.length;
    }
    g_activeInputEventIDs[mouseDevice] = touchEventId;
    return mouseDevice;
}

function touchHandler(event) {

    // Each event contains the following:
    // - touches: A list of information for every finger currently touching the screen
    // - targetTouches: Like touches, but is filtered to only the information for finger touches that started out within the same node
    // - changedTouches: A list of information for every finger involved in the event        
    for (var touchIndex = 0; touchIndex < event.changedTouches.length; touchIndex++) {

        var touchEvent = event.changedTouches[touchIndex];

        // Find the "mouse device" we're associating this updated touch with
        var type = "";
        var mouseDevice = -1;
        g_event = event.type;
        switch (event.type) 
        {
            case "touchstart":                
                mouseDevice = allocateMouseDevice(touchEvent.identifier);                
                // log("Allocated mouseDevice: " + mouseDevice + " for event: " + touchEvent.identifier);
                break;
            case "touchend":
                mouseDevice = getExistingMouseDevice(touchEvent.identifier);
                // log("Ending mouseDevice: " + mouseDevice);
                g_activeInputEventIDs[mouseDevice] = -1;
                break;
            case "touchmove":                
                mouseDevice = getExistingMouseDevice(touchEvent.identifier);                
                // log("Moving mouseDevice: " + mouseDevice);
                break;
            default:
                return;
        }

        // Each touch has the following:
        // - clientX: X coordinate of touch relative to the viewport (excludes scroll offset)
        // - clientY: Y coordinate of touch relative to the viewport (excludes scroll offset)
        // - screenX: Relative to the screen
        // - screenY: Relative to the screen
        // - pageX: Relative to the full page (includes scrolling)
        // - pageY: Relative to the full page (includes scrolling)
        // - target: Node the touch event originated from
        // - identifier: An identifying number, unique to each touch event

        // If it's the first touch event currently in flight then treat it as a main mouse event        
        if (mouseDevice == 0) 
        {   
            if( g_pIOManager!=null ){
                g_EventMouseX = touchEvent.screenX - canvasMinX;
                g_EventMouseY = touchEvent.screenY - canvasMinY;
            }
        
            switch (event.type) 
            {
                case "touchstart":  g_EventButtons = 1; break;
                case "touchmove":   g_EventButtons = 1;  break;
                case "touchend":    g_EventButtons = 0; break;                
            }
        }
        
        // Ensure the input event is used with virtual keys
        g_CurrentInputEvents[mouseDevice].x = touchEvent.screenX - canvasMinX;
        g_CurrentInputEvents[mouseDevice].y = touchEvent.screenY - canvasMinY;

        g_LastTouchX = touchEvent.screenX - canvasMinX;
        g_LastTouchY = touchEvent.screenY - canvasMinY;
        switch (event.type) 
        {
            case "touchstart":
                g_CurrentInputEvents[mouseDevice].Flags = TOUCH_INPUT_EVENT | INPUT_EVENT_ACTIVE | NEW_INPUT_EVENT;                    
                break;
            case "touchend":
                g_CurrentInputEvents[mouseDevice].Flags = 0;                    
                break;
            case "touchmove":
            default:
                break;
        }
        // Don't allow the user to move the page around
        event.preventDefault();
    }
}

// #############################################################################################
/// Function:<summary>
///             Load a whole game from the "game file" object
///          </summary>
///
/// In:		 <param name="_GameFile">The game file to laod</param>
///
// #############################################################################################
function bindTouchEvents() 
{
	canvas.ontouchstart = touchHandler;
	canvas.ontouchmove = touchHandler;
	canvas.ontouchend = touchHandler;
	canvas.ontouchcancel = touchHandler;

    //document.addEventListener("touchstart", touchHandler, true);
    //document.addEventListener("touchmove", touchHandler, true);
    //document.addEventListener("touchend", touchHandler, true);
    //document.addEventListener("touchcancel", touchHandler, true); 
}
