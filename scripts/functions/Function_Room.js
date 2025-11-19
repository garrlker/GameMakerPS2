
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Room.js
// Created:         26/05/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 26/05/2011		V1.0        MJD     1st version. Functions blocked in.
// 
// **********************************************************************************************************************




// #############################################################################################
/// Function:<summary>
///             Returns whether a room with the given index exists.
///          </summary>
///
/// In:		 <param name="_ind">room index to check</param>
/// Out:	 <returns>
///				true for yes, false for no.
///			 </returns>
// #############################################################################################
function room_exists( _ind )
{
    if( g_pRoomManager.Get( _ind )===null ) return false;
    return true;
}


// #############################################################################################
/// Function:<summary>
///              Returns the name of the room with the given index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_get_name(_ind)
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return "";
    return pRoom.m_pName;
}
function room_name(_ind){ return room_get_name(_ind); }


// #############################################################################################
/// Function:<summary>
///             Sets the width for the room with the indicated index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_w"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_width(_ind,_w) 
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return;
    pRoom.m_width = _w;
    pRoom.m_pStorage.width = _w;
}

// #############################################################################################
/// Function:<summary>
///              Sets the height for the room with the indicated index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_h"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_height(_ind,_h)
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return;
    pRoom.m_height = _h;
    pRoom.m_pStorage.height = _h;
   }

// #############################################################################################
/// Function:<summary>
///             Sets the caption for the room with the indicated index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_str"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_caption(_ind,_str)
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return;
    pRoom.m_pCaption = _str;
   }

// #############################################################################################
/// Function:<summary>
///             Sets whether the room with the indicated index is persistent or not.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_persistent(_ind, _val) 
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return;
    
    var persistent = (_val >= 0.5) ? true : false;    
    pRoom.m_persistent = persistent;
    pRoom.m_pStorage.persistent = persistent;
}


// #############################################################################################
/// Function:<summary>
///             Sets the initialization code string for the room with the indicated index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_str"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_code(_ind,_str) 
{
    var pRoom = g_pRoomManager.Get(_ind);
    if (pRoom) {
        pRoom.m_code = _str;
    }
}

// #############################################################################################
/// Function:<summary>
///             Sets the color properties for the room with the indicated index if is does 
///             not have a background image. col indicates the color and show indicates whether 
///             the color must be shown or not.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_colour"></param>
///			 <param name="_show"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_background_color(_ind,_colour,_show) 
{
	var pRoom = g_pRoomManager.Get(_ind);
    if( pRoom===null ) return;
    pRoom.m_color = _colour;
    pRoom.m_showcolor = _show;
}


// #############################################################################################
/// Function:<summary>
///             Sets background with index bind (0-7) for the room with the indicated index. 
///             vis indicates whether the background is visible and fore whether it is actually 
///             a foreground. back is the index of the background image. x,y indicate the position 
///             of the image and htiled and vtiled indicate whether the image must be tiled. 
///             hspeed and vspeed indicate the speed with which the background moves and alpha 
///             indicates an alpha translucency value (1 = solid and fastest).
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_bind"></param>
///			 <param name="_vis"></param>
///			 <param name="_fore"></param>
///			 <param name="_back"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_htiled"></param>
///			 <param name="_vtiled"></param>
///			 <param name="_hspeed"></param>
///			 <param name="_vspeed"></param>
///			 <param name="_alpha"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_background(_ind,_bind,_vis,_fore,_back,_x,_y,_htiled,_vtiled,_hspeed,_vspeed,_alpha) 
{
	var pRoom = g_pRoomManager.Get(_ind);


	if (_vis > 0.5) _vis = true; else _vis=false;
	
	array_set_1D(global, "__background_x__", _bind,_x);
	array_set_1D(global, "__background_y__", _bind,_y);
	array_set_1D(global, "__background_index__", _bind,_back);
	array_set_1D(global, "__background_htiled__", _bind,_htiled);
	array_set_1D(global, "__background_vtiled__", _bind,_vtiled);
	array_set_1D(global, "__background_alpha__", _bind,_alpha);
	array_set_1D(global, "__background_hspeed__", _bind,_hspeed);
	array_set_1D(global, "__background_vspeed__", _bind,_vspeed);
	array_set_1D(global, "__background_foreground__", _bind,_fore);
	array_set_1D(global, "__background_visible__", _bind,_vis);


	var pStore = pRoom.m_pStorage; 	// change actual storage...
	if (pStore.backgrounds[_bind] != null)
	{
		pStore.backgrounds[_bind].visible = _vis;
		pStore.backgrounds[_bind].foreground = _fore;
		pStore.backgrounds[_bind].index = _back;
		pStore.backgrounds[_bind].x = _x;
		pStore.backgrounds[_bind].y = _y;
		pStore.backgrounds[_bind].htiled = _htiled;
		pStore.backgrounds[_bind].vtiled = _vtiled;
		pStore.backgrounds[_bind].hspeed = _hspeed;
		pStore.backgrounds[_bind].vspeed = _vspeed;
		pStore.backgrounds[_bind].alpha = _alpha;
	}
}


// #############################################################################################
/// Function:<summary>
///             Sets the view with index vind (0-7) for the room with the indicated index. 
///             vis indicates whether the view is visible. xview, yview, wview, and hview indicate 
///             the position of the view in the room. xport, yport, wport, and hport indicate the 
///             position on the screen. When the view must follow an object hborder and vborder indicate 
///             the minimal visible border that must be kept around the object. hspeed and vspeed indicate 
///             the maximal speed with which the view can move. obj is the index of the object or the 
///             index of the instance.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_vind"></param>
///			 <param name="_vis"></param>
///			 <param name="_xview"></param>
///			 <param name="_yview"></param>
///			 <param name="_wview"></param>
///			 <param name="_hview"></param>
///			 <param name="_xport"></param>
///			 <param name="_yport"></param>
///			 <param name="_wport"></param>
///			 <param name="_hport"></param>
///			 <param name="_hborder"></param>
///			 <param name="_vborder"></param>
///			 <param name="_hspeed"></param>
///			 <param name="_vspeed"></param>
///			 <param name="_obj"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_view(_ind, _vind, _vis, _xview, _yview, _wview, _hview, _xport, _yport, _wport, _hport, _hborder, _vborder, _hspeed, _vspeed, _obj) 
{
	var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom == null) return;
	var pView = pRoom.m_Views[_vind];

	if (_vis > 0.5) pView.visible = true; else pView.visible=false;
	pView.worldx = _xview;                    // rectangle in the world (area of the world to draw)
	pView.worldy = _yview;
	pView.worldw = _wview;
	pView.worldh = _hview;
	pView.portx = _xport; 					// rectangle in the draw region (area to FIT into)
	pView.porty = _yport;
	pView.portw = _wport;
	pView.porth = _hport;
	pView.hborder = _hborder;                    // "safe" region before scrolling to follow "objid"
	pView.vborder = _vborder;
	pView.hspeed = _hspeed;                   // speed to use to "catch up"
	pView.vspeed = _vspeed;
	pView.objid = _obj;                    // object id to follow

	var pStore = pRoom.m_pStorage; 	// change actual storage...
	if (pStore.views[_vind] != null)
	{
		if (_vis > 0.5) pStore.views[_vind].visible = true; else pStore.views[_vind].visible = false;
		pStore.views[_vind].xview = _xview;
		pStore.views[_vind].yview = _yview;
		pStore.views[_vind].wview = _wview;
		pStore.views[_vind].hview = _hview;
		pStore.views[_vind].xport = _xport;
		pStore.views[_vind].yport = _yport;
		pStore.views[_vind].wport = _wport;
		pStore.views[_vind].hport = _hport;
		pStore.views[_vind].hborder = _hborder;
		pStore.views[_vind].vborder = _vborder;
		pStore.views[_vind].hspeed = _hspeed;
		pStore.views[_vind].vspeed = _vspeed;
		pStore.views[_vind].obj = _obj;
	}
}

// #############################################################################################
/// Function:<summary>
///             Sets whether views must be enabled for the room with the indicated index.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_set_view_enabled(_ind, _val) 
{
	var pRoom = g_pRoomManager.Get(_ind);
	pRoom.enableViews = _val;
	pRoom.m_pStorage.enableViews = _val; 	// change actual storage...
}

// #############################################################################################
/// Function:<summary>
///             Adds a new room. It returns the index of the room. Note that the room will not be
///             part of the room order. So the new room does not have a previous or a next room. 
///             If you want to move to an added room you must provide the index of the room.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_add() 
{
    var pRoom = new yyRoom();
    pRoom.CreateEmptyStorage();

    g_pRoomManager.Add(pRoom);
    
    return pRoom.id;
}


// #############################################################################################
/// Function:<summary>
///             Adds a copy of the room with the given index. It returns the index of the room.
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_duplicate(_ind) 
{
    var pRoom = g_pRoomManager.Get(_ind);
    if (!pRoom) {
    
        debug("Trying to duplicate non-existent room.");
        return 0;
    }
    
    return g_pRoomManager.DuplicateRoom(_ind);
}

// #############################################################################################
/// Function:<summary>
///             Assigns the indicated room to room ind. So this makes a copy of the room.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_room"></param>
/// Out:	 <returns>
///				Whether or not it was able to successfully complete the operation
///			 </returns>
// #############################################################################################
function room_assign(_ind,_room) 
{
    if (g_pRoomManager.Get(_ind) && g_pRoomManager.Get(_room)) {
        g_pRoomManager.AssignRoom(_ind, _room);
        return true;
    }
    
    return false;
}


// #############################################################################################
/// Function:<summary>
///             Adds a new instance of object obj to the room, placing it at the indicate position. 
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_obj"></param>
/// Out:	 <returns>
///				The index of the instance.
///			 </returns>
// #############################################################################################
function room_instance_add(_ind,_x,_y,_obj) 
{
    var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom) {
	
	    // Allocate the instance ID
	    var instance_id = g_room_maxid++;
    
        // Add the instance to the storage of the room
        var instanceIndex = pRoom.m_pStorage.pInstances.length;
        pRoom.m_pStorage.pInstances[instanceIndex] = { 
            x: _x, 
            y: _y, 
            index: _obj, 
            id: instance_id };

		return instance_id;
	}
	
	return 0;
}


// #############################################################################################
/// Function:<summary>
///             Removes all instances from the indicated room.
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_instance_clear(_ind) 
{
    var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom) {
        pRoom.ClearInstancesFromStorage();
    }
}


// #############################################################################################
/// Function:<summary>
///             Adds a new tile to the room at the indicate position. It returns the index of 
///             the tile. back is the background from which the tile is taken. left, top, width 
///             and height indicate the part of the background that forms the tile. x,y is the 
///             position of the tile in the room and depth is the depth of the tile.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_back"></param>
///			 <param name="_left"></param>
///			 <param name="_top"></param>
///			 <param name="_width"></param>
///			 <param name="_height"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_depth"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_tile_add(_ind,_back,_left,_top,_width,_height,_x,_y,_depth) 
{
    var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom) {
	    	
	    // And add the tile to the storage for the room
        var tileIndex = pRoom.m_pStorage.tiles.length;
        pRoom.m_pStorage.tiles[tileIndex] = { 
            x:_x, 
            y:_y, 
            index:_back, 
            xo:_left, 
            yo:_top, 
            w:_width, 
            h:_height, 
            depth:_depth, 
            id:g_room_maxid++ };                
    }
}

// #############################################################################################
/// Function:<summary>
///             Same as the previous routine but this time you can also specify a scaling factor 
///             in x and y direction and an alpha transparency for the tile.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_back"></param>
///			 <param name="_left"></param>
///			 <param name="_top"></param>
///			 <param name="_width"></param>
///			 <param name="_height"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_depth"></param>
///			 <param name="_xscale"></param>
///			 <param name="_yscale"></param>
///			 <param name="_alpha"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_tile_add_ext(_ind,_back,_left,_top,_width,_height,_x,_y,_depth,_xscale,_yscale,_alpha) 
{
    var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom) {	    
	    	
	    // Add the tile to the storage for the room
        var tileIndex = pRoom.m_pStorage.tiles.length;
        pRoom.m_pStorage.tiles[tileIndex] = { 
            x:_x, 
            y:_y, 
            index:_back, 
            xo:_left, 
            yo:_top, 
            w:_width, 
            h:_height, 
            depth:_depth,             
            xscale: _xscale,
            yscale: _yscale,
            alpha: _alpha,
            id:g_room_maxid++ };
    }
}


// #############################################################################################
/// Function:<summary>
///             Removes all tiles from the indicated room.
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_tile_clear(_ind) 
{
    var pRoom = g_pRoomManager.Get(_ind);
	if (pRoom) {					
		pRoom.ClearTilesFromStorage();
    }
}



// #############################################################################################
/// Function:<summary>
///             Goto next room..
///          </summary>
// #############################################################################################
function    room_goto_next()
{    
    if( (g_RunRoom.actualroom+1)>=g_pRoomManager.pRooms.length ) return;
    New_Room = g_pRoomManager.GetOrder(g_RunRoom.actualroom + 1).id;
}


// #############################################################################################
/// Function:<summary>
///             Goto next room..
///          </summary>
// #############################################################################################
function    room_restart()
{    
    New_Room = g_RunRoom.id;
}

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_room"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    room_goto( _room )
{
    New_Room = _room;
}



// #############################################################################################
/// Function:<summary>
///             Goto previous room..
///          </summary>
// #############################################################################################
function    room_goto_previous()
{    
    if( (g_RunRoom.actualroom-1)<0 ) return;
    New_Room = g_pRoomManager.GetOrder(g_RunRoom.actualroom - 1).id;
}


// #############################################################################################
/// Function:<summary>
///             Return the index of the room before numb (-1 = none) but don't go there.
///          </summary>
///
/// In:		 <param name="_numb"></param>
/// Out:	 <returns>
///				The previous room
///			 </returns>
// #############################################################################################
function room_previous(_numb) 
{
	var prev = -1;

    for(var i=0;i<g_pRoomManager.m_RoomOrder.length; i++)
    {
        if( g_pRoomManager.m_RoomOrder[i]==_numb ) return prev;
        prev = g_pRoomManager.m_RoomOrder[i];
    }
    return -1;
}

// #############################################################################################
/// Function:<summary>
///             Return the index of the room after numb (-1 = none).
///          </summary>
///
/// In:		 <param name="_numb"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function room_next(_numb) 
{
    for(var i=0;i<(g_pRoomManager.m_RoomOrder.length-1); i++)
    {
        if( g_pRoomManager.m_RoomOrder[i]==_numb ) {
            return g_pRoomManager.m_RoomOrder[i+1];
        }
    }
    return -1;
}


// #############################################################################################
/// Function:<summary>
///             Ends the game
///          </summary>
///
// #############################################################################################
function game_end()
{
    room_goto(ROOM_ENDOFGAME);    
}

// #############################################################################################
/// Function:<summary>
///             Restarts the game
///          </summary>
///
// #############################################################################################
function game_restart()
{
    room_goto(ROOM_RESTARTGAME);    
}