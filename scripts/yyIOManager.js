
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            IOManager.js
// Created:         17/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/02/2011		
// 
// **********************************************************************************************************************

var MAX_KEYS = 256;
var MAX_BUTTONS = 3;
var MAX_INPUT_STRING = 1024;

var VIRTUALKEY_ACTIVE = 1;
var VIRTUALKEY_DRAW = 2;
var VIRTUALKEY_OUTLINE = 4;

var	NEW_INPUT_EVENT = 1;                // this is a new event
var	TOUCH_INPUT_EVENT = 2;				// this was done via mouse or touch
var INPUT_EVENT_ACTIVE = 0x80000000;	// this was done via mouse or touch

var MAX_INPUT_EVENTS = 128;             // number of events we can handle each frame

var g_ButtonButton = 0,
    g_EventMouseX=0,
    g_EventMouseY=0,
    g_EventButtons=0,
    g_EventButtonDown=0,
    g_EventButtonUp=0,
    g_EventLastButtonDown=0,
    g_EventLastButtonUp=0,
    g_LastKeyPressed=0;

var g_KeyDown = [];
var g_KeyPressed = [];
var g_KeyUp = [];

// Used for virtual key-press tracking
var g_VirtualKeys = [];
var g_InputEvents = [];

// Collects together the current set of input events, including holding onto the mouse down state
var g_CurrentInputEvents = [];

var g_LastVirtualKeys = 0;

//document.body.onkeydown=function(evt){evt=evt?evt:window.event;console.log(evt)};
//document.body.onkeyup=function(evt){evt=evt?evt:window.event;console.log(evt)};

function hideshow2(which)
{
    if (!document.getElementById) return;
    if (which.style.visibility=="hidden")
        which.style.visibility="visible";
    else
        which.style.visibility="hidden";
}

function hideshow(which)
{
	if (!document.getElementById) return;
	if (which.style.display == "block")
	{
		which.style.display = "none";
	} else
	{
		which.style.display = "block";
	}
}

// #############################################################################################
/// Function:<summary>
///             Key down event callback
///          </summary>
// #############################################################################################
function    yyKeyDownCallback( evt )
{
    if( evt.repeat ) {
        return;
    }

    var keycode;
    if(evt == null)
    {
        keycode = window.event.which;
        if (keycode == 122) return; 	// if F11, then allow it to pass through
        if (keycode != 121) window.event.preventDefault(); else g_ToggleFullscreen = true; //F10
        window.event.preventDefault();
    }
    else 
    {
    	keycode = evt.which;
    	if (keycode == 122) return;		// if F11, then allow it to pass through
        if( keycode==120) {
            hideshow( document.getElementById('debug_console') );
        }else if( keycode!=121) evt.preventDefault(); else g_ToggleFullscreen=true;
        evt.preventDefault();
	}

    if( g_KeyDown[keycode]  )  return;      // MUST be a repeat.
  
    g_KeyDown[keycode]=true;
    g_KeyPressed[keycode]=true;
    g_LastKeyPressed = keycode;
    //console.log(keycode);

}

// #############################################################################################
/// Function:<summary>
///             Key down event callback
///          </summary>
// #############################################################################################
function    yyKeyUpCallback( evt )
{
    var keycode;
    if(evt == null)
    {
        keycode = window.event.which;
        if (keycode == 122) return; 	// if F11, then allow it to pass through
        window.event.preventDefault();
    }
    else 
    {
        keycode = evt.which;
        if (keycode == 122) return; 	// if F11, then allow it to pass through
        evt.preventDefault();
    }

    g_KeyUp[keycode]=true;
    g_KeyDown[keycode] = false;
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Create an IO manager
///          </summary>
// #############################################################################################
function    yyIOManager( )
{
    this.LastChar="a";							    // Last character pressed
    this.InputString = [];				// +1 is for termination

    this.CurrentKey = this.LastKey = -1; 
    this.KeyDown = [];						    // whether the key is down
	this.KeyReleased = [];					    // Whether the key was released
	this.KeyPressed = [];					    // Wether the key was pressed


	this.LastButton = this.CurrentButton = 0; 	// Last mouse button pressed
	
	this.ButtonDown = [];						// Whether the mouse button is down
	this.ButtonReleased = [];					// Whether the mouse button was released
	this.ButtonPressed = [];					// Whether the mouse button was pressed
	this.WheelDown = this.WheelUp = false;
	    
	this.KeyMap = [];						    // Translation map for keys

	this.String_Curr = this.m_DoMouseButton = this.m_DoMouseButton_Last = this.m_DoMouseButtonX = this.MouseX = this.MouseY =  this.FrameCount = 0;


    // init data   
	for (var l = 0; l < MAX_INPUT_STRING ; l++){
        this.InputString[l]="";
    }    
    for(var l=0;l<MAX_KEYS;l++){
        this.KeyDown[l]= this.KeyReleased[l]= this.KeyPressed[l]=false;
        this.KeyMap = 0;
    }
    for(var l=0;l<MAX_BUTTONS;l++){
        this.ButtonDown[l]= this.ButtonReleased[l]= this.ButtonPressed[l]=false;
    }

    this.Update = IO_Update;
    this.Clear = IO_Clear;
    this.StartStep = IO_StartStep;
    this.Char_Last_Get = Char_Last_Get;
    this.Char_Last_Set = Char_Last_Set;
    this.Key_Last_Get = Key_Last_Get;
    this.Key_Current_Get = Key_Current_Get;
    this.Key_Last_Set = Key_Last_Set;
    this.Key_Current_Set = Key_Current_Set;
    this.Key_Down = Key_Down;
    this.Key_Pressed = Key_Pressed;
    this.Key_Released = Key_Released;
    this.Key_Clear = Key_Clear;
    this.Key_Clear_All = Key_Clear_All;
    this.Button_Last_Get = Button_Last_Get;
    this.Button_Current_Get = Button_Current_Get;
	this.Button_Last_Set = Button_Last_Set;
    this.Button_Current_Set = Button_Current_Set;
    this.Button_Down = Button_Down;
    this.Button_Pressed = Button_Pressed;
    this.Button_Released = Button_Released;
    this.Wheel_Up = Wheel_Up;
    this.Wheel_Down = Wheel_Down;
    this.Button_Clear = Button_Clear;
    this.Button_Clear_All = Button_Clear_All;
    this.HandleKeyDown =    IO_HandleKeyDown;
    this.HandleKeyPressed=  IO_HandleKeyPressed;
    this.HandleKeyReleased= IO_HandleKeyReleased;
    this.ProcessVirtualKeys = ProcessVirtualKeys;

	// going from 0 to max makes it a "proper" packed array, and is much faster for some Javascript engines.
    for (var l = 0; l < MAX_KEYS; l++){
        g_KeyDown[l]= g_KeyUp[l] = false;
    }    
    
    //canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.onmousemove = onMouseMove;
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
      
    
    // IE, Chrome, FireFox and Safari
    window.onkeydown = function () { yyKeyDownCallback(arguments[0] || window.event); };
    window.onkeyup = function () { yyKeyUpCallback(arguments[0] || window.event); };    
    
    // Setup the input events array for handling virtual keys
    g_InputEvents = new Array(MAX_INPUT_EVENTS);
    g_CurrentInputEvents = new Array(MAX_INPUT_EVENTS);
    for (var eventIndex = 0; eventIndex < MAX_INPUT_EVENTS; eventIndex++) {
        g_InputEvents[eventIndex] = new InputEvent();
        g_CurrentInputEvents[eventIndex] = new InputEvent();
    }        
}

// #############################################################################################
/// Function:<summary>
///				Sets up an InputEvent object 
///          </summary>
///
// #############################################################################################
function InputEvent()
{
    this.Flags = 0;
    this.x = 0;
    this.y = 0;
}


// #############################################################################################
/// Function:<summary>
///				Clears all IO related variables setting all buttons unpressed
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  IO_Clear()
{
    //String_Clear();
    this.Key_Clear_All();
    this.Button_Clear_All();
}



// #############################################################################################
/// Function:<summary>
///				Returns the last pressed character
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Char_Last_Get()
{
	return this.LastChar;
}

// #############################################################################################
/// Function:<summary>
///				Sets the last pressed character
///          </summary>
///
/// In:		 <param name="ch"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Char_Last_Set(_ch)
{
	this.LastChar = ch;
}


// #############################################################################################
/// Function:<summary>
///				Returns the keycode of the last pressed key
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    Key_Last_Get()
{
	return this.LastKey;
}

// #############################################################################################
/// Function:<summary>
///				Returns the keycode of the currently pressed key
///          </summary>
///
/// Out:	 <returns>
///				Current key pressed
///			 </returns>
// #############################################################################################
function    Key_Current_Get()
{
	return this.CurrentKey;
}

// #############################################################################################
/// Function:<summary>
///				Sets the keycode of the last pressed key
///          </summary>
///
/// In:		 <param name="key"></param>
// #############################################################################################
function  Key_Last_Set(_key)
{
	if ( _key<0 || _key>255) return false;
    this.LastKey= _key;
}

// #############################################################################################
/// Function:<summary>
///				Sets the keycode of the currently pressed key
///          </summary>
///
/// In:		 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Key_Current_Set(_key)
{
	if ( _key<0 || _key>255) return false;
    this.CurrentKey= _key;
}


// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated key is down at the moment
///          </summary>
///
/// In:		 <param name="_key">Key to retrun</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Key_Down(_key)
{
	if ( _key<0 || _key>255) return false;
	return this.KeyDown[_key];
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated key was pressed since last step
///          </summary>
///
/// In:		 <param name="_key">Key to retrun</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    Key_Pressed(_key)
{
	if ( _key<0 || _key>255) return false;
	return this.KeyPressed[_key];
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated key was pressed since last step
///          </summary>
///
/// In:		 <param name="_key">Key to retrun</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Key_Released( _key )
{
    if ( _key<0 || _key>255) return false;
    return this.KeyReleased[_key];
}

// #############################################################################################
/// Function:<summary>
///				Clears the key status
///          </summary>
///
/// In:		 <param name="_key">Key to clear</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Key_Clear( _key )
{
	if ( _key<0 || _key>255 ) return;
	this.KeyDown[_key] = false;
	this.KeyPressed[_key] = false;
	this.KeyReleased[_key] = false;
}

// #############################################################################################
/// Function:<summary>
///				Clears the key status of all keys
///          </summary>
// #############################################################################################
function    Key_Clear_All()
{
	this.LastKey = 0;
	this.CurrentKey = 0;
	this.LastChar = 0;

	for(var i=0;i<=MAX_KEYS;i++) { 
		this.KeyDown[i]= false; 
		this.KeyPressed[i]= false;
		this.KeyReleased[i]= false;
	}
}


// #############################################################################################
/// Function:<summary>
///				Returns the last pressed button (1=left, 2=rigth, 3=middle, 0=none)
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Button_Last_Get()
{
	return this.LastButton;
}

// #############################################################################################
/// Function:<summary>
///				Returns the currently pressed button
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Button_Current_Get()
{
	return this.CurrentButton;
}

// #############################################################################################
/// Function:<summary>
///				Sets the last pressed button (1=left, 2=rigth, 3=middle, 0=none)
///          </summary>
///
/// In:		 <param name="button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Button_Last_Set(_button)
{
  if ( (_button<1) || (_button>3) ) return;
  this.LastButton= _button;
}

// #############################################################################################
/// Function:<summary>
///				Sets the currently pressed button
///          </summary>
///
/// In:		 <param name="button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Button_Current_Set( _button )
{
  if ( (_button<1) || (_button>3) ) return;
  this.CurrentButton= _button;
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated button is down at the moment
///          </summary>
///
/// In:		 <param name="button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Button_Down(_button)
{
    _button--;
	if ( _button>=0 && _button<MAX_BUTTONS )
	{
	    return this.ButtonDown[_button - 1];
	}
	return false;
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated button was pressed since last step
///          </summary>
///
/// In:		 <param name="_button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    Button_Pressed( _button )
{
    _button--;
	if( _button>=0 && _button<MAX_BUTTONS)
	{
		return this.ButtonPressed[_button];
	}
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the indicated button was pressed since last step
///          </summary>
///
/// In:		 <param name="_button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Button_Released( _button )
{
    _button--;
    if ( _button>=0 && _button<MAX_BUTTONS ) 
    {
        return this.ButtonReleased[_button];
    }
    return false;
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the mouse wheel was moved up since last step
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Wheel_Up()
{
	return this.WheelUp;
}

// #############################################################################################
/// Function:<summary>
///				Returns whether the mouse wheel was moved down since last step
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Wheel_Down()
{
	return this.WheelDown;
}

// #############################################################################################
/// Function:<summary>
///				Clears the button status
///          </summary>
///
/// In:		 <param name="_button"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Button_Clear(_button)
{
    _button--;
	if ( _button>=0 && _button<MAX_BUTTONS ) 
	{
	    this.ButtonDown[_button] = false;
	    this.ButtonPressed[_button] = false;
	    this.ButtonReleased[_button] = false;
    }
}

// #############################################################################################
/// Function:<summary>
///				Clears the status of all buyttons
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  Button_Clear_All()
{
    this.LastButton = 0;
    this.CurrentButton = 0;

	for(var i=0; i<=MAX_BUTTONS; i++ ){
	    this.ButtonDown[i] = false;
	    this.ButtonPressed[i] = false;
	    this.ButtonReleased[i] = false;
	}
	this.WheelUp = false;
	this.WheelDown = false;
}

// #############################################################################################
/// Function:<summary>
///             Process Mouse moving events...
///          </summary>
///
/// In:		 <param name="evt">Event object</param>
// #############################################################################################
function onMouseMove( _evt )  
{
    if (_evt.pageX > canvasMinX && _evt.pageX < canvasMaxX) {
        g_EventMouseX = _evt.pageX - canvasMinX;
        g_EventMouseY = _evt.pageY - canvasMinY;
        
        // Keep the current input events updated        
        g_CurrentInputEvents[_evt.button].x = g_EventMouseX;
        g_CurrentInputEvents[_evt.button].y = g_EventMouseY;
    }
}    

// #############################################################################################
/// Function:<summary>
///             Process Mouse DOWN events...
///          </summary>
///
/// In:		 <param name="evt">Event object</param>
// #############################################################################################
function onMouseDown( _evt ) 
{
    g_ButtonButton = _evt.button;
    
    // Swap middle and RIGHT button, so middle is button 3.   
    if(g_ButtonButton == 2) g_ButtonButton=1;
    else if(g_ButtonButton== 1) g_ButtonButton=2;
    
    g_EventLastButtonDown = g_EventButtonDown;
    g_EventButtonDown = g_ButtonButton;
    g_EventButtons |= (1<<g_ButtonButton);
    
    // Only register a mousedown event if the mouse is within the canvas. This is because we don't
    // seem to get mouseup events if the user is manipulating scroll bars.
    if ((_evt.pageX >= canvasMinX) && (_evt.pageX <= canvasMaxX) &&
        (_evt.pageY >= canvasMinY) && (_evt.pageY <= canvasMaxY))
    {        
        g_CurrentInputEvents[_evt.button].Flags = TOUCH_INPUT_EVENT | INPUT_EVENT_ACTIVE | NEW_INPUT_EVENT;
        g_CurrentInputEvents[_evt.button].x = _evt.pageX - canvasMinX;
        g_CurrentInputEvents[_evt.button].y = _evt.pageY - canvasMinY;    
    }
    
    return false;
}
 
// #############################################################################################
/// Function:<summary>
///             Process Mouse UP events...
///          </summary>
///
/// In:		 <param name="evt">Event object</param>
// #############################################################################################
function onMouseUp( _evt ) 
{
    g_ButtonButton = _evt.button;

    // Swap middle and RIGHT button, so middle is button 3.   
    if(g_ButtonButton == 2) g_ButtonButton=1;
    else if(g_ButtonButton== 1) g_ButtonButton=2;

    g_EventLastButtonUp = g_EventButtonUp;
    g_EventButtonUp = g_ButtonButton;
    g_EventButtons &= ~(1<<g_ButtonButton);
    
    // Clear the current input event for this button
    g_CurrentInputEvents[_evt.button].Flags = 0;    
    
    return false;
}


// #############################################################################################
/// Function:<summary>
///             Update the IO system.
///          </summary>
// #############################################################################################
function    IO_Update()
{
    // Copy the current events over to the main events
    for (var eventIndex = 0; eventIndex < g_CurrentInputEvents.length; eventIndex++) 
    {
        g_InputEvents[eventIndex].Flags = g_CurrentInputEvents[eventIndex].Flags;
        g_InputEvents[eventIndex].x = g_CurrentInputEvents[eventIndex].x;
        g_InputEvents[eventIndex].y = g_CurrentInputEvents[eventIndex].y;
        
        // Ensure the current input events don't have the NEW_INPUT_EVENT flag lingering
        g_CurrentInputEvents[eventIndex].Flags &= ~NEW_INPUT_EVENT;
    }

	g_pBuiltIn.keyboard_lastkey  = g_pBuiltIn.keyboard_key;
	g_pBuiltIn.keyboard_key = g_LastKeyPressed;
	g_pBuiltIn.keyboard_lastchar = string(g_LastKeyPressed);

    this.MouseX = g_EventMouseX;
    this.MouseY = g_EventMouseY;
    this.m_DoMouseButton = g_EventButtons;
    
    
	// LEFT mouse button.
    if ((this.m_DoMouseButton & 1) != 0)
    {
        this.ButtonDown[0] = 1;
        if ((this.m_DoMouseButton_Last ^ this.m_DoMouseButton) != 0)
        {
        	this.ButtonPressed[0] = 1;
		}
	}else{
        this.ButtonDown[0] = 0;
        if ((this.m_DoMouseButton ^ this.m_DoMouseButton_Last) == 1)
        {
        	this.ButtonReleased[0] = 1;
		}
	}
    	
	// Right mouse button.
    if ((this.m_DoMouseButton & 2) != 0)
    {
        this.ButtonDown[1] = 1;
        if ((this.m_DoMouseButton_Last ^ this.m_DoMouseButton) != 0)
        {
        	this.ButtonPressed[1] = 1;
		}
	}else{
        this.ButtonDown[1] = 0;
        if ((this.m_DoMouseButton ^ this.m_DoMouseButton_Last) == 2)
        {
        	this.ButtonReleased[1] = 1;
		}
	}	
	    
	// Middle mouse button.
    if ((this.m_DoMouseButton & 4) != 0)
    {
        this.ButtonDown[2] = 1;
        if ((this.m_DoMouseButton_Last ^ this.m_DoMouseButton) != 0)
        {
        	this.ButtonPressed[2] = 1;
		}
	}else{
        this.ButtonDown[2] = 0;
        if ((this.m_DoMouseButton ^ this.m_DoMouseButton_Last) == 2)
        {
        	this.ButtonReleased[2] = 1;
		}
	}

    this.m_DoMouseButton_Last = this.m_DoMouseButton;

    g_pBuiltIn.mouse_x = this.MouseX;
    g_pBuiltIn.mouse_y = this.MouseY;
    g_pBuiltIn.mouse_button = g_EventLastButtonDown;
    g_pBuiltIn.mouse_lastbutton = g_EventLastButtonDown;
    
    this.ProcessVirtualKeys();
}

// #############################################################################################
/// Function:<summary>
///             Process the virtual keys
///          </summary>
// #############################################################################################
function ProcessVirtualKeys()
{       
    var CurrentVirtualKeyEvents = 0;
    var bit = 0;
	var w = g_RunRoom.GetWidth();
	var h = g_RunRoom.GetHeight();
	
    // Get the default view, or the standard view array
    var pViews = g_RunRoom.m_enableviews ? g_RunRoom.m_Views : g_DefaultViewArray;
    if (pViews[0].visible) 
	{
	    w = pViews[0].portw;
	    h = pViews[0].porth;            
    }    
	
    for (var eventIndex in g_InputEvents)
    {
        var inputEvent = g_InputEvents[eventIndex];
        if ((inputEvent.Flags & INPUT_EVENT_ACTIVE) != 0)
        {
            bit = 1;
            for (var vkeyIndex in g_VirtualKeys)
            {
                var vkey = g_VirtualKeys[vkeyIndex];
                if ((vkey.flags & VIRTUALKEY_ACTIVE) != 0)
                {
                    var x = (w * inputEvent.x) / g_DisplayWidth;
                    var y = (h * inputEvent.y) / g_DisplayHeight;
                    
                    if((x >= vkey.x) && (x < vkey.x2) && (y >= vkey.y) && (y < vkey.y2))
					{					    
						CurrentVirtualKeyEvents |= bit;						
					}
				}
				bit <<= 1;
            }
            inputEvent.Flags = 0;
        }
    }
    
    // Now process actual KEY press/releases
	bit = 1;	
	var wholediff = g_LastVirtualKeys ^ CurrentVirtualKeyEvents;
	for (var vkeyIndex in g_VirtualKeys)
	{
	    var vkey = g_VirtualKeys[vkeyIndex];
		if ((vkey.flags & VIRTUALKEY_ACTIVE) != 0)
		{
			var curr = CurrentVirtualKeyEvents & bit;
			var diff = wholediff&bit;
			
			// KEY or BUTTON
			if (vkey.key != 0) 
			{			
				// just pressed
				this.KeyPressed[ vkey.key ] |= (curr && diff);
				// held
				this.KeyDown[ vkey.key ] |= (curr && !diff);
				// released
				this.KeyReleased[ vkey.key ] |= (!curr && diff);
			}
			else {
				// NB: Currently only the main mouse can have virtual keys mapped to it
				// just pressed
				this.ButtonPressed[ vkey.button-1 ] |= (curr && diff);
				// held
				this.ButtonDown[ vkey.button-1 ] |= (curr && !diff);
				// released
				this.ButtonReleased[ vkey.button-1 ] |= (!curr && diff);
			}
		}		
		bit <<= 1;
	}

	g_LastVirtualKeys = CurrentVirtualKeyEvents;
}

// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function HandleKeyDown(key_down)
{
    // We want to check all objects to see who is interested in this event
	var pool = g_RunRoom.m_Active.pool;
	var evt = EVENT_KEYBOARD | key_down;
	for (var o=0;o<pool.length;o++)
	{
		// get the object
		var pInst = pool[o];
		var pObj = pInst.pObject;
            
        // IF this object wants the event... then perform the event on ALL it's instances.
		if (pObj.REvent[evt])
		{
			pInst.PerformEvent(EVENT_KEYBOARD, key_down, pInst, pInst);
		}
    }
}

// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function  HandleKeyPressed(key_pressed)
{
    // We want to check all objects to see who is interested in this event
	var pool = g_RunRoom.m_Active.pool;
	var evt = EVENT_KEYPRESS | key_pressed;
	for (var o=0;o<pool.length;o++)
	{
		// get the object
		var pInst = pool[o];
		var pObj = pInst.pObject;
            
        // IF this object wants the event... then perform the event on ALL it's instances.
        if (pObj.REvent[evt])
        {
        	pInst.PerformEvent(EVENT_KEYPRESS, key_pressed, pInst, pInst);
        }
    }
}

// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function  HandleKeyReleased(key_released)
{
    // We want to check all objects to see who is interested in this event
	var pool = g_RunRoom.m_Active.pool;
	var evt = EVENT_KEYRELEASE | key_released;
	for (var o=0;o<pool.length;o++)
	{
		// get the object
		var pInst = pool[o];
		var pObj = pInst.pObject;

		// IF this object wants the event... then perform the event on ALL it's instances.
        if (pObj.REvent[evt])
        {
        	pInst.PerformEvent(EVENT_KEYRELEASE, key_released, pInst, pInst);
        }
    }    
}

// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function IO_HandleKeyDown()
{
    // Process PRESSED
    var keyDown = 0; // handles events for NOKEY and ANYKEY
    for(var i=0;i<MAX_KEYS;i++)
    {
        // Has this key been pressed?
        if( this.KeyDown[i] ) 
        {
            keyDown = 1;
            HandleKeyDown(i);      
        }
    }
    
    // Handle NOKEY/ANYKEY events
    HandleKeyDown(keyDown);
}


// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function  IO_HandleKeyPressed()
{
    // Process PRESSED
    var keyPressed = 0; // handles events for NOKEY and ANYKEY
    for(var i=0;i<MAX_KEYS;i++)
    {
        // Has this key been pressed?
        if( this.KeyPressed[i] ) 
        {
            keyPressed = 1;
            HandleKeyPressed(i);
        }
    }  
    
    // Handle NOKEY/ANYKEY
    HandleKeyPressed(keyPressed);      
}



// #############################################################################################
/// Function:<summary>
///				EVENT: Handle the press of a particular key
///          </summary>
///
/// In:		 <param name="key">Key to deal with</param>
// #############################################################################################
function  IO_HandleKeyReleased()
{
    // Process PRESSED
    var keyReleased = 0; // handles events for NOKEY and ANYKEY
    for(var i=0;i<MAX_KEYS;i++)
    {
        // Has this key been pressed?
        if( this.KeyReleased[i] ) 
        {
            keyReleased = 1;
            HandleKeyReleased(i);
        }        
    }
    
    // Handle NOKEY/ANYKEY
    HandleKeyReleased(keyReleased);
}




// #############################################################################################
/// Function:<summary>
///             
///          </summary>
// #############################################################################################
function    IO_StartStep()
{
	this.FrameCount++;

    // Process keys
    for(var i=0;i<MAX_KEYS;i++){
	    this.KeyPressed[i]= g_KeyPressed[i];
	    this.KeyReleased[i] = g_KeyUp[i];
	    this.KeyDown[i] = g_KeyDown[i];
	        
	    g_KeyPressed[i] = false;
	    g_KeyUp[i] = false;
    }
        
        
        
    for(var i=0;i<=MAX_BUTTONS;i++) {
        this.ButtonPressed[i] = false;
        this.ButtonReleased[i] = false;
    }
    this.WheelUp = false;
    this.WheelDown = false;

    this.Update();
}


// #############################################################################################
/// Function:<summary>
///             Process keybaord events
///          </summary>
// #############################################################################################
function HandleKeyboard()
{
    g_pIOManager.HandleKeyDown();
    g_pIOManager.HandleKeyPressed();
    g_pIOManager.HandleKeyReleased();
}

// #############################################################################################
/// Function:<summary>
///             Constructor for a VirtualKey object
///          </summary>
// #############################################################################################
function yyVirtualKey(index)
{
    this.flags = 0;
    this.index = index;
    this.x = 0;
    this.y = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.w = 0;
    this.h = 0;
    this.u = 0;
    this.v = 0;
    this.key = 0;
    this.button = 0;
}

// #############################################################################################
/// Function:<summary>
///             Allocate a virtual key
///          </summary>
// #############################################################################################
function AllocateVirtualKey()
{
    // Attempt to re-allocate a previously released virtual key
    for (var l = 0; l < g_VirtualKeys.length; ++l) 
    {
        if (g_VirtualKeys[l].flags == 0)
        {
            return g_VirtualKeys[l];
        }
    }
    
    // Allocate a new virtual key by adding a new entry to the virtual keys array
    var i = g_VirtualKeys.length;
    g_VirtualKeys[i] = new yyVirtualKey(i);
 
    return g_VirtualKeys[i];
}

// #############################################################################################
/// Function:<summary>
///             Free up a previously allocated virtual key
///          </summary>
// #############################################################################################
function FreeVirtualKey(_vkey)
{
	g_VirtualKeys[_vkey].flags = 0;
}

// #############################################################################################
/// Property: <summary>
///           	Render IO specific stuff.
///           </summary>
// #############################################################################################
yyIOManager.prototype.Render = function () {

	// We don't render into the "world" space. We render directly onto the screen in canvas space.
	Graphics_Save();
	
	var trans = [];
	trans[0] = 1;
	trans[1] = 0;
	trans[2] = 0;
	trans[3] = 1;
	trans[4] = 0;
	trans[5] = 0;
	graphics._setTransform(trans[0], trans[1], trans[2], trans[3], trans[4], trans[5]);



	// Loop through all the virtual keys and look for draw flags
	for (var l = 0; l < g_VirtualKeyDrawList.length; ++l)
	{
		var pKey = g_VirtualKeyDrawList[l];
		graphics.globalAlpha = 1.0;
		graphics.strokeStyle = GetHTMLRGBA(0xff0000, 1.0);
		graphics._strokeRect(pKey.x, pKey.y, pKey.w, pKey.h);
	}

	// And ..... restore.
	Graphics_Restore();
};
