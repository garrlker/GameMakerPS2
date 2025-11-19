
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_IO.js
// Created:         19/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Deals with Game Maker IO
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 19/02/2011		V1.0        MJD     1st version
//                                      Mouse functions added
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Waits till the user presses a key on the keyboard.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_wait()
{
    ErrorFunction("keyboard_wait()");
}


// #############################################################################################
/// Function:<summary>
///             Simulates a press of the key with the indicated keycode.
///          </summary>
///
/// In:		 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_key_press(_key)
{
    HandleKeyPressed(_key);
}

// #############################################################################################
/// Function:<summary>
///             Simulates a press of the key with the indicated keycode.
///          </summary>
///
/// In:		 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_key_release(_key)
{
    HandleKeyReleased(_key);
}

// #############################################################################################
/// Function:<summary>
///             Check mouse buttons
///          </summary>
///
/// In:		 <param name="_num">0=none,-1=any, 1=LMB, 2=RMB or 3=MBM</param>
/// Out:	 <returns>
///				0 for none, 1 for down.
///			 </returns>
// #############################################################################################
function    mouse_check( _num )
{
    with(g_pIOManager)
    {
        switch(_num){
            case    0:      if( m_DoMouseButton==0 ) return 0; else return 1;
            case    1:      if( (m_DoMouseButton&1)==0 ) return 0; else return 1;
            case    2:      if( (m_DoMouseButton&2)==0 ) return 0; else return 1;
            case    3:      if( (m_DoMouseButton&4)==0 ) return 0; else return 1;
            case    -1:     if( m_DoMouseButton==0 ) return 1; else return 0;
        }
    }
    return 0;
}

// #############################################################################################
/// Function:<summary>
///             Check mouse button pressed
///          </summary>
///
/// In:		 <param name="_num">0=none,-1=any, 1=LMB, 2=RMB or 3=MBM</param>
/// Out:	 <returns>
///				0 for none, 1 for pressed.
///			 </returns>
// #############################################################################################
function    mouse_check_button( _num )
{
    with(g_pIOManager)
    {
        switch(_num){
            case    0:      if( (ButtonDown[0]|ButtonDown[1]|ButtonDown[2])==0 ) return 0; else return 1;
            case    1:      if( ButtonDown[0]==0 ) return 0; else return 1;
            case    2:      if( ButtonDown[1]==0) return 0; else return 1;
            case    3:      if( ButtonDown[2]==0 ) return 0; else return 1;
            case    -1:     if( (ButtonDown[0]|ButtonDown[1]|ButtonDown[2])==0 ) return 1; else return 0;
        }
    }
    return 0;
}


// #############################################################################################
/// Function:<summary>
///             Check mouse button pressed
///          </summary>
///
/// In:		 <param name="_num">0=none,-1=any, 1=LMB, 2=RMB or 3=MBM</param>
/// Out:	 <returns>
///				0 for none, 1 for pressed.
///			 </returns>
// #############################################################################################
function    mouse_check_button_pressed( _num )
{
    with(g_pIOManager)
    {
        switch(_num){
            case    0:      if( (ButtonPressed[0]|ButtonPressed[1]|ButtonPressed[2])==0 ) return 0; else return 1;
            case    1:      if( ButtonPressed[0]==0 ) return 0; else return 1;
            case    2:      if( ButtonPressed[1]==0) return 0; else return 1;
            case    3:      if( ButtonPressed[2]==0 ) return 0; else return 1;
            case    -1:     if( (ButtonPressed[0]|ButtonPressed[1]|ButtonPressed[2])==0 ) return 1; else return 0;
        }
    }
    return 0;
}

// #############################################################################################
/// Function:<summary>
///             Check mouse button pressed
///          </summary>
///
/// In:		 <param name="_num">0=none,-1=any, 1=LMB, 2=RMB or 3=MBM</param>
/// Out:	 <returns>
///				0 for none, 1 for pressed.
///			 </returns>
// #############################################################################################
function    mouse_check_button_released( _num )
{
    with(g_pIOManager)
    {
        switch(_num){
            case    0:      if( (ButtonReleased[0]|ButtonReleased[1]|ButtonReleased[2])==0 ) return 0; else return 1;
            case    1:      if( ButtonReleased[0]==0 ) return 0; else return 1;
            case    2:      if( ButtonReleased[1]==0) return 0; else return 1;
            case    3:      if( ButtonReleased[2]==0 ) return 0; else return 1;
            case    -1:     if( (ButtonReleased[0]|ButtonReleased[1]|ButtonReleased[2])==0 ) return 1; else return 0;
        }
        return 0;
    }
}

// #############################################################################################
/// Function:<summary>
///             Not yet supported
///          </summary>
// #############################################################################################
function    mouse_wheel_up()
{
    return 0;
}

// #############################################################################################
/// Function:<summary>
///             Not yet supported
///          </summary>
// #############################################################################################
function    mouse_wheel_down()
{
    return 0;
}


// #############################################################################################
/// Function:<summary>
///             Clear mouse pressed button
///          </summary>
// #############################################################################################
function    mouse_clear( _button ) 
{
    if( _button>=1 && _button<=3 ){
        g_pIOManager.ButtonPressed[_button]=0;
    }
}


// #############################################################################################
/// Function:<summary>
///             Clear mouse pressed button
///          </summary>
// #############################################################################################
function    io_clear( ) 
{
    g_pIOManager.Clear();
}

// #############################################################################################
/// Function:<summary>
///             not supported
///          </summary>
// #############################################################################################
function    io_handle( ){}
function    mouse_wait(){}




// #############################################################################################
/// Function:<summary>
///             Returns whether the key with the particular keycode is currently down.
///          </summary>
///
/// In:		 <param name="key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_check(key) 
{
    return g_pIOManager.KeyDown[key];
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the key with the particular keycode was pressed since the last step.
///          </summary>
///
/// In:		 <param name="key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_check_pressed(key)
{
    return g_pIOManager.KeyPressed[key]; 
}

// #############################################################################################
/// Function:<summary>
///             Clears the state of the key. This means that it will no longer generate keyboard #
///             events until it starts repeating.
///          </summary>
///
/// In:		 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_clear(_key)
{
    g_pIOManager.KeyPressed[key] = false; 
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the key with the particular keycode was released since the last step.
///          </summary>
///
/// In:		 <param name="key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_check_released(key) 
{
    return g_pIOManager.KeyReleased[key];
}


// #############################################################################################
/// Function:<summary>
///             Returns whether the key with the particular keycode is pressed by checking the 
///             hardware directly. The result is independent of which application has focus. 
///             It allows for a few more checks. In particular you can use keycodes vk_lshift, 
///             vk_lcontrol, vk_lalt, vk_rshift, vk_rcontrol and vk_ralt to check whether the 
///             left or right shift, control or alt key is pressed.
///          </summary>
///
/// In:		 <param name="key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function keyboard_check_direct(key) 
{
    return keyboard_check_pressed;
}

// #############################################################################################
/// Function:<summary>
///          	Gets the absolute mouse "X" on the canvas.
///          </summary>
///
/// Out:	<returns>
///				The real mouse X
///			</returns>
// #############################################################################################
function display_mouse_get_x()
{
    return g_pBuiltIn.mouse_x;
}

// #############################################################################################
/// Function:<summary>
///          	Gets the absolute mouse "Y" on the canvas.
///          </summary>
///
/// Out:	<returns>
///				The real mouse Y
///			</returns>
// #############################################################################################
function display_mouse_get_y()
{
    return g_pBuiltIn.mouse_y;
}

