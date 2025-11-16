
// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			Function_Window.js
// Created:			05/07/2011
// Author:			Mike
// Project:
// Description:
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 05/07/2011
//
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Sets whether the game window is visible. Clearly you normally want the window to 
///             remain visible during the whole game. The program will not receive keyboard events 
///             when the window is invisible.
///          </summary>
///
/// In:		 <param name="_visible">true for visible, false for invisible</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_visible(_visible) 
{
    ErrorFunction("window_set_visible()");
}


// #############################################################################################
/// Function:<summary>
///             Returns whether the game window is visible.
///          </summary>
///
/// Out:	 <returns>
///				always true
///			 </returns>
// #############################################################################################
function window_get_visible() 
{
    return true;
}


// #############################################################################################
/// Function:<summary>
///             Sets whether the window is shown in full screen mode.
///          </summary>
///
/// In:		 <param name="_full">true for full screen, false for "windowed"</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_fullscreen(_full) {
	if (g_FullScreen == _full) return;
	g_ToggleFullscreen = true;

}


// #############################################################################################
/// Function:<summary>
///             Returns whether the window is shown in full screen mode.
///          </summary>
///
/// Out:	 <returns>
///				true for in fullscreen, false for error
///			 </returns>
// #############################################################################################
function window_get_fullscreen() {
	return g_FullScreen;
}

// #############################################################################################
/// Function:<summary>
///             Sets whether the border around the window is shown. 
///             (In full screen mode it is never shown.)
///          </summary>
///
/// In:		 <param name="_show"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_showborder(_show) 
{
    ErrorFunction("window_set_showborder()");
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the border around the window is shown in windowed mode.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_showborder() 
{
    ErrorFunction("window_get_showborder()");
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Sets whether the border icons (iconize, maximize, close) are shown. 
///             (In full screen mode these are never shown.)
///          </summary>
///
/// In:		 <param name="_show"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_showicons(_show)
{
    ErrorFunction("window_set_showicons()");
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the border icons are shown in windowed mode.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_showicons()
{
    ErrorFunction("window_get_showicons()");
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Sets whether the window must always stay on top of other windows.
///          </summary>
///
/// In:		 <param name="_stay"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_stayontop(_stay)
{
    ErrorFunction("window_set_stayontop()");
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the window always stays on top of other windows.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_stayontop() 
{
    ErrorFunction("window_get_stayontop()");
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Sets whether the window is sizeable by the player. (The player can only size it 
///             when the border is shown and the window is not in full screen mode.)
///          </summary>
///
/// In:		 <param name="_sizeable"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_sizeable(_sizeable)
{
    ErrorFunction("window_set_sizeable()");    
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the window is sizeable by the player.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_sizeable() 
{
    ErrorFunction("window_get_sizeable()");
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Sets the caption string for the window. Normally you specify this when defining 
///             the room and it can be changed using the variable room_caption. So this function 
///             is normally not useful, unless you draw the room yourself rather than letting GameMaker 
///             do it. The caption is only visible when the window has a border and when it is not in full screen mode.
///          </summary>
///
/// In:		 <param name="_caption"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_caption(_caption) 
{
    document.title = _caption;
}


// #############################################################################################
/// Function:<summary>
///             Returns the window caption.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_caption() 
{
    return document.title;
}

// #############################################################################################
/// Function:<summary>
///             Sets the mouse cursor used in the window. You can use the following constant: 
///          </summary>
///
/// In:		 <param name="curs"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_cursor(_curs) 
{     
    var curs = "";
    switch(_curs){
        case cr_default:    curs = "default"; break;
        case cr_none:		curs = ""; break;
        case cr_arrow:		curs = "auto"; break;
        case cr_cross:		curs = "crosshair"; break;
        case cr_beam:		curs = ""; break;
        case cr_size_nesw:	curs = "ne-resize"; break;
        case cr_size_ns:	curs = "n-resize"; break;
        case cr_size_nwse:	curs = "nw-resize"; break;
        case cr_size_we:	curs = "w-resize"; break;
        case cr_uparrow:	curs = ""; break;
        case cr_hourglass:	curs = "wait"; break;
        case cr_drag:		curs = "move"; break;
        case cr_nodrop:		curs = ""; break;
        case cr_hsplit:		curs = ""; break;
        case cr_vsplit:		curs = ""; break;
        case cr_multidrag:	curs = ""; break;
        case cr_sqlwait:	curs = ""; break;
        case cr_no:			curs = ""; break;
        case cr_appstart:	curs = ""; break;
        case cr_help:		curs = "help"; break;
        case cr_handpoint:	curs = "pointer"; break;
        case cr_size_all:	curs = "e-resize"; break;
    };
    
    if( curs=="" ) {
        Error("Cursor type is not supported.");
        return;
    }
    g_CurrentCursor = _curs;
    document.body.style.cursor = curs;
}


// #############################################################################################
/// Function:<summary>
///             Returns the cursor used in the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_cursor() 
{
    return g_CurrentCursor;
}


// #############################################################################################
/// Function:<summary>
///             Sets the color of the part of the window that is not used for displaying the room.
///          </summary>
///
/// In:		 <param name="_colour"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_color(_colour)
{
    g_pBuiltIn.background_color;
}


// #############################################################################################
/// Function:<summary>
///             Returns the window colour.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_color() 
{
    return g_pBuiltIn.background_color;
}


// #############################################################################################
/// Function:<summary>
///             If the window is larger than the actual room normally the room is displayed in a 
///             region centered in the window. It is though possible to indicate that it must be 
///             scaled to fill the whole or part of the window. A value of 1 is no scaling. If you 
///             use a value of 0 the region will be scaled to fill the whole window. If you set it 
///             to a negative value it will be scaled to the maximal size inside the window while 
///             maintaining the aspect ratio (this is often what you want). adaptwindow indicates 
///             whether the window size must be adapted if the scaled room does not fit in. 
///             Adapting the window is only effective when the scale factor is positive.
///          </summary>
///
/// In:		 <param name="_scale"></param>
///			 <param name="_adaptwindow"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_region_scale( _scale, _adaptwindow) 
{
    ErrorFunction("window_set_region_scale()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the scale factor for the drawing region.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_region_scale() 
{
    ErrorFunction("window_get_region_scale()");
}

// #############################################################################################
/// Function:<summary>
///             Sets the position of the (client part of the) window to the indicated position.
///          </summary>
///
/// In:		 <param name="_x"></param>
///			 <param name="_y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_position( _x,_y ) 
{
    var canv = document.getElementById(g_CanvasName);
    canv.style.position="absolute";
    canv.style.left=_x+"px";
    canv.style.top=_y+"px";
}

// #############################################################################################
/// Function:<summary>
///             Sets the size of the (client part of the) window to the indicated size. Note that 
///             is the indicated size is too small to fit the drawing region it is kept large enough 
///             for the region to fit it.
///          </summary>
///
/// In:		 <param name="_w"></param>
///			 <param name="_h"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_size(_w,_h) 
{
    canv.width = _w;
    canv.height = _h;
}


// #############################################################################################
/// Function:<summary>
///             Sets the position and size of the window rectangle. 
///             (Does both previous routines in one step.)
///          </summary>
///
/// In:		 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_w"></param>
///			 <param name="_h"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_set_rectangle(_x,_y,_w,_h) 
{
    window_set_size(_w,_h);
    window_set_position(_x,_y);
}


// #############################################################################################
/// Function:<summary>
///             Centers the window on the screen.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_center() 
{
    var bw = GetBrowserWidth();
    var bh = GetBrowserHeight();
    var w = window_get_width();
    var h = window_get_height();
    
    var x= (bw-w)/2;
    var y= (bh-h)/2;
    
    window_set_position(x,y);    
}


// #############################################################################################
/// Function:<summary>
///             Gives the window the default size and position (centered) on the screen.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_default() 
{
    ErrorFunction("window_default()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the current x-coordinate of the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_x() 
{
    return canvasMinX;
}


// #############################################################################################
/// Function:<summary>
///             Returns the current y-coordinate of the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_y() 
{
    return canvasMinY;
}


// #############################################################################################
/// Function:<summary>
///             Returns the current width of the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_width() 
{
    return canvasMaxX - canvasMinX;
}


// #############################################################################################
/// Function:<summary>
///             Returns the current height of the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_get_height() 
{
    return canvasMaxY - canvasMinY;
}


// #############################################################################################
/// Function:<summary>
///             Returns the x-coordinate of the mouse in the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_mouse_get_x() 
{
    return g_EventMouseX;
}


// #############################################################################################
/// Function:<summary>
///             Returns the y-coordinate of the mouse in the window.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_mouse_get_y() 
{
    return g_EventMouseY;
}


// #############################################################################################
/// Function:<summary>
///             Sets the position of the mouse in the window to the indicated values.
///          </summary>
///
/// In:		 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function window_mouse_set(x,y) 
{
    ErrorFunction("window_mouse_set()");
}



// #############################################################################################
/// Function:<summary>
///          	 Returns the x-coordinate of the mouse with respect to the view with index id.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				The mouse x-coordinate based around the current view..
///			</returns>
// #############################################################################################
function window_view_mouse_get_x(_id) {

	if (!g_RunRoom.m_enableviews){
		return g_pBuiltIn.mouse_x;
	}

	var pView = g_RunRoom.m_Views[_id];
	return g_pBuiltIn.mouse_x - pView.portx;
	//var xx = ((g_pBuiltIn.mouse_x - pView.scaledportx) / pView.WorldViewScaleX) + pView.worldx;
	//var yy = ((g_pBuiltIn.mouse_y - pView.scaledporty) / pView.WorldViewScaleY) + pView.worldy;

}

// #############################################################################################
/// Function:<summary>
///          	 Returns the y-coordinate of the mouse with respect to the view with index id.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				The mouse y-coordinate based around the current view..
///			</returns>
// #############################################################################################
function window_view_mouse_get_y(_id) {
	if (!g_RunRoom.m_enableviews){
		return g_pBuiltIn.mouse_y;
	}

	var pView = g_RunRoom.m_Views[_id];
	return g_pBuiltIn.mouse_y - pView.porty;
}

