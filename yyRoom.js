
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyRoom.js
// Created:	        17/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/02/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Game Maker "ACTIVE" Room class
///          </summary>
// #############################################################################################
function    yyRoom()
{
    this.id = g_RoomID++;
    this.Init();
}


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoom.prototype.Init = function () {
	this.m_lasttile = ""; 						// index of the last tile found

	this.m_pCaption = ""; 					    // caption of the room
	this.m_speed = 30;                            // game speed for the room (steps per second)
	this.m_width = 1024;                          // size of the room (in pixels)
	this.m_height = 768;
	this.m_persistent = false; 			    // Whether room instances are persistent
	this.m_Initialised = false;
	this.m_color = 0; 						// The screen color
	this.m_showcolor = true; 				// Whether to draw the screen color
	this.m_ViewClearScreen = true;

	this.m_background = [];                     // the backgrounds
	for (var t = 0; t < MAX_BACKGROUNDS; t++)
	{
		this.m_background[t] = null;
	}

	this.m_enableviews = false; 				// whether views are enabled
	this.m_code = null; 						// Creation code for the room

	this.m_Active = new yyOList(); 		        // the ACTIVE instance list (ordered by DEPTH)
	this.m_Deactive = new yyList(); 		    // the DEACTIVE instance list
	this.m_Deactive.packing = true;
	this.m_DepthSorting = [];					// When the depth is changed, we need to remember it so we can "change" it at a safe point. 

	this.m_NumTiles = 0;
	this.m_Tiles = [];
	this.m_PlayfieldManager = new yyPlayfieldManager();
	this.m_Views = [];

	this.m_Marked = [];

	// RK :: Used to reduce the amount of memory used when loading rooms
	this.m_pStorage = null;

	this.m_pName = "Room";
};

// #############################################################################################
/// Function:<summary>
///             Are the views enabled?
///          </summary>
// #############################################################################################
yyRoom.prototype.GetEnableViews = function () { return this.m_enableviews; };
yyRoom.prototype.GetWidth = function () { return this.m_width; };
yyRoom.prototype.GetHeight = function () { return this.m_height; };
yyRoom.prototype.GetSpeed = function () { return this.m_speed; };
yyRoom.prototype.GetName = function () { return this.m_pName; };
yyRoom.prototype.GetCaption = function () { return this.m_pCaption; };
yyRoom.prototype.GetPersistent = function () { return this.m_persistent; };
yyRoom.prototype.GetPool = function () { return this.m_Active.pool; };

yyRoom.prototype.SetWidth = function (_val) { this.m_width = _val; g_pBuiltIn.room_width = _val; };
yyRoom.prototype.SetHeight = function (_val) { this.m_height = _val; g_pBuiltIn.room_height = _val; };
yyRoom.prototype.SetSpeed = function (_val) { this.m_speed = _val; g_pBuiltIn.room_speed = _val; };
yyRoom.prototype.SetName = function (_name) { this.m_pName = _name; };
yyRoom.prototype.SetCaption = function (_caption) { this.m_pCaption = _caption; g_pBuiltIn.room_caption = _caption; };
yyRoom.prototype.SetPersistent = function (_val) { this.m_persistent = _val; g_pBuiltIn.room_persistent = _val; };


// #############################################################################################
/// Function:<summary>
///             Generates storage information for an empty room for later use when switching to
///             this room
///          </summary>
// #############################################################################################
yyRoom.prototype.CreateEmptyStorage = function () {

    this.m_pStorage =
    {
        pName: "room_empty_" + this.id,
        width: 640,
        height: 480,
        backgrounds: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{} ],
        views: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{} ],
        pInstances: [],
        tiles: []
    };
};


// #############################################################################################
/// Function:<summary>
///             Merges the storage with the current storage for this room
///             this room
///          </summary>
// #############################################################################################
yyRoom.prototype.CloneStorage = function (_pStorage) {

    if (_pStorage != null) {
            
        // Copy across the basic settings (except for the name... that's expected
		this.m_pStorage.width = _pStorage.width;
		this.m_pStorage.height = _pStorage.height;
		this.m_pStorage.colour = _pStorage.colour;
		this.m_pStorage.showColour = _pStorage.showColour;
		this.m_pStorage.enableViews = _pStorage.enableViews;
		this.m_pStorage.viewClearScreen = _pStorage.viewClearScreen;
		this.m_pStorage.pCaption = _pStorage.pCaption;
		this.m_pStorage.speed = _pStorage.speed;
		this.m_pStorage.persistent = _pStorage.persistent;		
    
        for (var i = 0; i < _pStorage.backgrounds.length; i++) 
        {        
            var sourceBackground = _pStorage.backgrounds[i];
            if (sourceBackground != null) 
            {            
                this.m_pStorage.backgrounds[i] = {                    
                        visible: sourceBackground.visible, 
                        index: sourceBackground.index, 
                        vspeed: sourceBackground.vspeed, 
                        hspeed: sourceBackground.hspeed,                
                        foreground: sourceBackground.foreground,
                        x: sourceBackground.x,
                        y: sourceBackground.y,
                        htiled: sourceBackground.htiled,
                        vtiled: sourceBackground.vtiled,
                        hspeed: sourceBackground.hspeed,
                        vspeed: sourceBackground.vspeed,
                        stretch: sourceBackground.stretch,
                        alpha: sourceBackground.alpha,
                        blend: sourceBackground.blend };
            }
        }
        for (var i = 0; i < _pStorage.views.length; i++) 
        {        
            var sourceView = _pStorage.views[i];
            if (sourceView) 
            {
                this.m_pStorage.views[i] = {
                    visible: sourceView.visible,                      
                    xview: sourceView.xview,
                    yview: sourceView.yview,
                    wview: sourceView.wview,
                    hview: sourceView.hview,
                    xport: sourceView.xport,
                    yport: sourceView.yport,
                    wport: sourceView.wport,
                    hport: sourceView.hport,
                    hborder: sourceView.hborder,
                    vborder: sourceView.vborder,
                    hspeed: sourceView.hspeed,
                    vspeed: sourceView.vspeed,
                    index: sourceView.index };                    
            }            
        }
    
        this.m_pStorage.pInstances = new Array(_pStorage.pInstances.length);
        for (var i = 0; i < _pStorage.pInstances.length; i++) 
        {
            var sourceInstance = _pStorage.pInstances[i];
            if (sourceInstance) 
            {                
                this.m_pStorage.pInstances[i] = {
                    x: sourceInstance.x,
                    y: sourceInstance.y,
                    index: sourceInstance.index,
                    id: sourceInstance.id };
            }
        }        
        
        this.m_pStorage.tiles = new Array(_pStorage.pInstances.length);
        for (var i = 0; i < _pStorage.tiles.length; i++) 
        {
            var sourceTile = _pStorage.tiles[i];
            if (sourceTile != null)
            {
                this.m_pStorage.tiles[i] = {                            
                    x: sourceTile.x,
	                y: sourceTile.y,
	                index: sourceTile.index,
	                xo: sourceTile.xo,   
	                yo: sourceTile.yo,
	                w: sourceTile.w,
	                h: sourceTile.h,
	                depth: sourceTile.depth,
	                id: sourceTile.id };
	        }
        }
    }
};


// #############################################################################################
/// Function:<summary>
///             Create a room from its "loaded" data
///          </summary>
///
/// In:		 <param name="_ID"></param>
///			 <param name="_pObjectStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoom.prototype.CreateRoomFromStorage = function (_pRoomStorage) 
{
	with (this)
	{
		Init();
		m_pStorage = _pRoomStorage;
		if (_pRoomStorage.pName != undefined) SetName(_pRoomStorage.pName);
		if (_pRoomStorage.pCaption != undefined) SetCaption(_pRoomStorage.pCaption);
		if (_pRoomStorage.width != undefined) SetWidth(_pRoomStorage.width);
		if (_pRoomStorage.height != undefined) SetHeight(_pRoomStorage.height);
		if (_pRoomStorage.speed != undefined) SetSpeed(_pRoomStorage.speed);
		if (_pRoomStorage.persistent != undefined) SetPersistent(_pRoomStorage.persistent);
		if (_pRoomStorage.colour != undefined) m_color = _pRoomStorage.colour;
		if (_pRoomStorage.showColour != undefined) m_showcolor = _pRoomStorage.showColour;
		if (_pRoomStorage.enableViews != undefined) m_enableviews = _pRoomStorage.enableViews;
		if (_pRoomStorage.viewClearScreen != undefined) m_ViewClearScreen = _pRoomStorage.viewClearScreen;
		


		// If we add any defaults, we need to "set" the values
		this.SetWidth(this.m_width);
		this.SetHeight(this.m_height);
		this.SetSpeed(this.m_speed);
		this.SetCaption(this.m_pCaption);
		this.SetPersistent(this.m_persistent);
		m_Views = [];


		// Make Tiles
		m_NumTiles = 0;
		for (var index in _pRoomStorage.tiles)
		{
			var pTileStorage = _pRoomStorage.tiles[index];

			if (pTileStorage != null)
			{
				var pTile = CreateTileFromStorage(pTileStorage);
				this.m_PlayfieldManager.Add(pTile);
				this.m_Tiles[pTile.id] = pTile;
				this.m_NumTiles++;
			}
		}

		if (_pRoomStorage.pCode != undefined) m_code = _pRoomStorage.pCode;


		// Create views
		var i = 0;
		for (var v in _pRoomStorage.views)
		{
			m_Views[v] = CreateViewFromStorage(_pRoomStorage.views[v]);
		}
	}
};

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoom.prototype.ClearInstances = function () {
	var i;
	var delindex = 0;
	var DelList = [];

	// Loop through all the active instances, and get all the non-persistant ones.
	for (i = this.m_Active.length - 1; i >= 0; i--)
	{
		this.DeleteInstance(this.m_Active.Get(0));
	}

	for (i = this.m_Deactive.length - 1; i >= 0; i--)
	{
		this.DeleteInstance(this.m_Deactive.Get(0));
	}
};


// #############################################################################################
/// Function:<summary>
///             Clears the instances held in the storage for this room
///          </summary>
///
// #############################################################################################
yyRoom.prototype.ClearInstancesFromStorage = function () {
    this.m_pStorage.pInstances = [];
};



// #############################################################################################
/// Function:<summary>
///             Sets the correct size for drawing the room
///          </summary>
// #############################################################################################
yyRoom.prototype.DrawSetSize = function () {
	var i, w, h;
	//var view;

	// Compute the size
	if (g_RunRoom.GetEnableViews())
	{
		/*w = 8;
		h = 8;        // minimum size
		for (i= 0;i<MAX_VIEW;i++)
		{
		view = Run_Room->GetView(i);
		if (!view->visible) continue;
		w = yymax(w,view->wport+view->xport);
		h = yymax(h,view->hport+view->yport);
		}*/
	}
	else
	{
		w = g_RunRoom.GetWidth();
		h = g_RunRoom.GetHeight();
	}

	// Make sure it is not too large
	if (w > DisplayWidth()) w = DisplayWidth();
	if (h > DisplayHeight()) h = DisplayHeight();

	// Now adapt the size
	/*if ((w != GR_Window_Get_Region_Width()) || (h != GR_Window_Get_Region_Height()))
	{
	GR_Window_Set_Region_Size(w,h,true);
	GR_Window_Default();
	GR_D3D_Set_Region(w,h);
	}
	*/
};



// #############################################################################################
/// Function:<summary>
///             Create a new instance from the 
///          </summary>
///
/// In:		 <param name="_store"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoom.prototype.GML_AddInstance = function (_x, _y, _objid) {
	return this.AddInstance(_x, _y, g_room_maxid++, _objid, true);
};


// #############################################################################################
/// Function:<summary>
///             Create a new instance, and add it to the rooms active list
///          </summary>
///
/// In:		 <param name="_x">X coordinate</param>
///			 <param name="_y">X coordinate</param>
///			 <param name="_id">instance index (must be unique)</param>
///			 <param name="_objindex">Object to base instance on</param>
/// Out:	 <returns>
///				the instance pointer
///			 </returns>
// #############################################################################################
yyRoom.prototype.AddInstance = function (_x, _y, _id, _objindex) {
	var pinst = new yyInstance(_x, _y, _id, _objindex, true);
	this.m_Active.AddUnsorted(pinst);
	g_pInstanceManager.Add(pinst);
	return pinst;
};

// #############################################################################################
/// Function:<summary>
///             Adds an instance to the room
///          </summary>
///
/// In:		 <param name="_inst">Instance to add</param>
// #############################################################################################
yyRoom.prototype.AddInstanceToRoom = function (_pInst) {
	this.m_Active.AddUnsorted(_pInst);
	g_pInstanceManager.Add(_pInst);
};

// #############################################################################################
/// Function:<summary>
///             Copy all the view data into the arrays for GML to access
///          </summary>
// #############################################################################################
yyRoom.prototype.CopyViewsToArrays = function () {
	// Update the view user variables
	var index = 0;
	for (i in this.m_Views)
	{
		pView = this.m_Views[i];

		array_set_1D(global, "__view_xview__", index, pView.worldx);
		array_set_1D(global, "__view_yview__", index, pView.worldy);
		array_set_1D(global, "__view_wview__", index, pView.worldw);
		array_set_1D(global, "__view_hview__", index, pView.worldh);
		array_set_1D(global, "__view_xport__", index, pView.portx);
		array_set_1D(global, "__view_yport__", index, pView.porty);
		array_set_1D(global, "__view_wport__", index, pView.portw);
		array_set_1D(global, "__view_hport__", index, pView.porth);
		array_set_1D(global, "__view_angle__", index, 0);
		array_set_1D(global, "__view_hborder__", index, pView.hborder);
		array_set_1D(global, "__view_vborder__", index, pView.vborder);
		array_set_1D(global, "__view_hspeed__", index, pView.hspeed);
		array_set_1D(global, "__view_vspeed__", index, pView.vspeed);
		array_set_1D(global, "__view_object__", index, pView.objid);

		index++;
	}
};

// #############################################################################################
/// Function:<summary>
///             Copy all the view data FROM the arrays back into the view data
///          </summary>
// #############################################################################################
yyRoom.prototype.CopyViewsFromArrays = function () {

	// Update the view user variables
	var index = 0;
	for (i in this.m_Views)
	{
		pView = this.m_Views[i];

		pView.worldx = array_get_1D(global, "__view_xview__", index);
		pView.worldy = array_get_1D(global, "__view_yview__", index);
		pView.worldw = array_get_1D(global, "__view_wview__", index);
		pView.worldh = array_get_1D(global, "__view_hview__", index);
		pView.portx = array_get_1D(global, "__view_xport__", index);
		pView.porty = array_get_1D(global, "__view_yport__", index);
		pView.portw = array_get_1D(global, "__view_wport__", index);
		pView.porth = array_get_1D(global, "__view_hport__", index);
		pView.hborder = array_get_1D(global, "__view_hborder__", index);
		pView.vborder = array_get_1D(global, "__view_vborder__", index);
		pView.hspeed = array_get_1D(global, "__view_hspeed__", index);
		pView.vspeed = array_get_1D(global, "__view_vspeed__", index);
		pView.objid = array_get_1D(global, "__view_object__", index);

		index++;
	}
};


// #############################################################################################
/// Function: <summary>
///           		Autoscroll the backgrounds
///           </summary>
// #############################################################################################
yyRoom.prototype.ScrollBackground = function () {
	// Draw the backgrounds
	for (var i = 0; i < g_pBackgroundManager.background.length; i++)
	{
		var v = array_get_1D(global, "__background_visible__", i);
		var f = array_get_1D(global, "__background_foreground__", i);
		if (v && !f)
		{
			var pBack = g_pBackgroundManager.Get(i);

			pBack.hspeed = array_get_1D(global, "__background_hspeed__", i);
			pBack.vspeed = array_get_1D(global, "__background_vspeed__", i);
			pBack.x = array_get_1D(global, "__background_x__", i);
			pBack.y = array_get_1D(global, "__background_y__", i);

			pBack.x += pBack.hspeed;
			pBack.y += pBack.vspeed;

			array_set_1D(global, "__background_x__", i, pBack.x);
			array_set_1D(global, "__background_y__", i, pBack.y);
		}
	}
};

// #############################################################################################
/// Function:<summary>
///             This updates all views to follow the object the user has requested.
///             views that have no object to follow are not touched/processed
///          </summary>
// #############################################################################################
yyRoom.prototype.UpdateViews = function () {
	var i;
	var l, t, ix, iy;
	var pView;
	var pInst;

	if (!this.m_enableviews) return;
	this.CopyViewsFromArrays();



	// Update the pViews
	for (i in this.m_Views)
	{
		pView = this.m_Views[i];
		if ((pView.visible) && (pView.objid >= 0))
		{

			// Find the pInstance to follow
			pInst = null;
			if (pView.objid < 100000)
			{
				// if they selected an OBJECT, then pick the 1st unmarked one!
				var pObj = g_pObjectManager.Get(pView.objid);
				if (pObj != null)
				{
					var pool = pObj.GetRPool();
					for (var o in pool)
					{
						pInst = pool[o];
						if (!pInst.marked) break;   // if NOT marked, use this one!
						pInst = null;               // makes sure we can tell we found one		        
					}
				}

			}
			else                           // pView object is an pInstance
			{
				pInst = g_pInstanceManager.Get(pView.objid);
				if (pInst != NULL && pInst.marked) pInst = NULL;
			}

			// if we have an object to follow.... then follow it!
			if (pInst != null)
			{
				// Find the new position
				l = pView.worldx;
				t = pView.worldy;
				ix = Math.round(pInst.x);
				iy = Math.round(pInst.y);

				if (2 * pView.hborder >= pView.worldw)
				{
					l = ix - pView.worldw / 2;
				} else if (ix - pView.hborder < pView.worldx)
				{
					l = ix - pView.hborder;
				} else if (ix + pView.hborder > pView.worldx + pView.worldw)
				{
					l = ix + pView.hborder - pView.worldw;
				}

				if (2 * pView.vborder >= pView.worldh)
				{
					t = iy - pView.worldh / 2;
				} else if (iy - pView.vborder < pView.worldy)
				{
					t = iy - pView.vborder;
				} else if (iy + pView.vborder > pView.worldy + pView.worldh)
				{
					t = iy + pView.vborder - pView.worldh;
				}


				// Make sure it does not extend beyond the room
				if (l < 0) l = 0;
				if (l + pView.worldw > this.m_width) l = this.m_width - pView.worldw;
				if (t < 0) t = 0;
				if (t + pView.worldh > this.m_height) t = this.m_height - pView.worldh;

				// Restrict motion speed
				if (pView.hspeed >= 0)
				{
					if ((l < pView.worldx) && (pView.worldx - l > pView.hspeed)) l = pView.worldx - pView.hspeed;
					if ((l > pView.worldx) && (l - pView.worldx > pView.hspeed)) l = pView.worldx + pView.hspeed;
				}
				if (pView.vspeed >= 0)
				{
					if ((t < pView.worldy) && (pView.worldy - t > pView.vspeed)) t = pView.worldy - pView.vspeed;
					if ((t > pView.worldy) && (t - pView.worldy > pView.vspeed)) t = pView.worldy + pView.vspeed;
				}
				pView.worldx = l;
				pView.worldy = t;

			} //if (pInst != null) 

		} // if((pView.visible) && (pView.objid>=0))

	} //for( i in Run_Room.m_pViews )

	this.CopyViewsToArrays();
};

var g_can = null;

// #############################################################################################
/// Function:<summary>
///             There are NO tiles OR particles, so just loop through all the instances...
///          </summary>
///
/// In:		 <param name="r">Rect to "fit" in</param>
// #############################################################################################
yyRoom.prototype.DrawInstancesTiles = function (_rect) {
	for (var index in this.m_Tiles)
	{
		var pTile = this.m_Tiles[index];
		if (((pTile.x + pTile.w) > _rect.left) && (pTile.x < _rect.right))
		{
			pTile.Draw();
		}
	}
	/*if (g_can == null)
	{
		g_can = document.createElement(g_CanvasName);
		g_can.width = 400;
		g_can.height = 288;
		var g = g_can.getContext('2d');
		g.globalAlpha = 1;
		g.fillStyle = "#ff0000";
		g.fillRect(0, 0, 400, 288);
	} else
	{
		graphics.drawImage(g_can, 0, 0);
	}*/


	for (var i = this.m_Active.length - 1; i >= 0; i--)
	{
		var pInst = this.m_Active.Get(i);


		// If this instance has been "marked", move to the next one - should really be a WHILE loop here instead of "continue"
		if (pInst.marked || pInst.visible == 0) continue;


		// "IF" in 3D mode, set the instance depth...
		//if( GR_3D_Get_Mode() )  GR_3D_Set_Depth(yymin(11000.0f,pInst->GetDepth()));

		// Perform drawing event, if we couldn't, then draw it "simply"
		if (!pInst.PerformEvent(EVENT_DRAW, 0, pInst, pInst))
		{
			// Otherwise just DRAW it..
			var pSprite = g_pSpriteManager.Get(pInst.sprite_index);
			if (pSprite)
			{
				if ((pInst.image_xscale == 1.0) && (pInst.image_yscale == 1.0) && (pInst.image_angle == 0.0) && (pInst.image_blend == 0xffffff)) // &&  (pInst.image_alpha == 1.0))
				{
					pSprite.DrawSimple(pInst.image_index, pInst.x, pInst.y, pInst.image_alpha);
				}
				else
				{
					pSprite.Draw(pInst.image_index,
									pInst.x, pInst.y,
									pInst.image_xscale, pInst.image_yscale,
									pInst.image_angle,
									pInst.image_blend,
									pInst.image_alpha
								);
				}
			}
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             There are NO tiles OR particles, so just loop through all the instances...
///          </summary>
///
/// In:		 <param name="r">Rect to "fit" in</param>
// #############################################################################################
yyRoom.prototype.DrawInstancesOnly = function (_rect) {
	for (var i = this.m_Active.length - 1; i >= 0; i--)
	{
		var pInst = this.m_Active.Get(i);


		// If this instance has been "marked", move to the next one - should really be a WHILE loop here instead of "continue"
		if (pInst.marked || pInst.visible == 0) continue;


		// "IF" in 3D mode, set the instance depth...
		//if( GR_3D_Get_Mode() )  GR_3D_Set_Depth(yymin(11000.0f,pInst->GetDepth()));

		// Perform drawing event, if we couldn't, then draw it "simply"
		if (!pInst.PerformEvent(EVENT_DRAW, 0, pInst, pInst))
		{
			// Otherwise just DRAW it..
			var pSprite = g_pSpriteManager.Get(pInst.sprite_index);
			if (pSprite)
			{
				if ((pInst.image_xscale == 1.0) && (pInst.image_yscale == 1.0) && (pInst.image_angle == 0.0) && (pInst.image_blend == 0xffffff)) // &&  (pInst.image_alpha == 1.0))
				{
					pSprite.DrawSimple(pInst.image_index, pInst.x, pInst.y, pInst.image_alpha);
				}
				else
				{
					pSprite.Draw(pInst.image_index,
									pInst.x, pInst.y,
									pInst.image_xscale, pInst.image_yscale,
									pInst.image_angle,
									pInst.image_blend,
									pInst.image_alpha
								);
				}
			}
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             There are NO tiles OR particles, so just loop through all the instances...
///          </summary>
///
/// In:		 <param name="r">Rect to "fit" in</param>
// #############################################################################################
yyRoom.prototype.DrawInstancesParticles = function (_rect) {

	var partdepth = ParticleSystem_LargestDepth();

	for (var i = this.m_Active.length - 1; i >= 0; i--)
	{
		var pInst = this.m_Active.Get(i);


		// If this instance has been "marked", move to the next one - should really be a WHILE loop here instead of "continue"
		if (pInst.marked || pInst.visible == 0) continue;


		while (partdepth > pInst.depth)
		{
			ParticleSystem_DrawDepth(partdepth);
			partdepth = ParticleSystem_NextDepth(partdepth);
		}

		// Perform drawing event, if we couldn't, then draw it "simply"
		if (!pInst.PerformEvent(EVENT_DRAW, 0, pInst, pInst))
		{
			// Otherwise just DRAW it..
			var pSprite = g_pSpriteManager.Get(pInst.sprite_index);
			if (pSprite)
			{
				if ((pInst.image_xscale == 1.0) && (pInst.image_yscale == 1.0) && (pInst.image_angle == 0.0) && (pInst.image_blend == 0xffffff)) // &&  (pInst.image_alpha == 1.0))
				{
					pSprite.DrawSimple(pInst.image_index, pInst.x, pInst.y, pInst.image_alpha);
				}
				else
				{
					pSprite.Draw(pInst.image_index,
									pInst.x, pInst.y,
									pInst.image_xscale, pInst.image_yscale,
									pInst.image_angle,
									pInst.image_blend,
									pInst.image_alpha
								);
				}
			}
		}
	}

	// Render any particles that are left...
	while (partdepth > -1000000000)
	{
		ParticleSystem_DrawDepth(partdepth);
		partdepth = ParticleSystem_NextDepth(partdepth);
	}
};


// #############################################################################################
/// Function:<summary>
///             There are instances, particles and tiles to draw
///          </summary>
///
/// In:		 <param name="r">Rect to "fit" in</param>
// #############################################################################################
yyRoom.prototype.DrawInstancesParticlesTiles = function (_rect) {

    // Draw the tiles
    for (var index in this.m_Tiles)
	{
		var pTile = this.m_Tiles[index];
		if (((pTile.x + pTile.w) > _rect.left) && (pTile.x < _rect.right))
		{
			pTile.Draw();
		}
	}

    // Draw instances and particles
    var partdepth = ParticleSystem_LargestDepth();
	for (var i = this.m_Active.length - 1; i >= 0; i--)
	{
		var pInst = this.m_Active.Get(i);


		// If this instance has been "marked", move to the next one - should really be a WHILE loop here instead of "continue"
		if (pInst.marked || pInst.visible == 0) continue;


		while (partdepth > pInst.depth)
		{
			ParticleSystem_DrawDepth(partdepth);
			partdepth = ParticleSystem_NextDepth(partdepth);
		}

		// Perform drawing event, if we couldn't, then draw it "simply"
		if (!pInst.PerformEvent(EVENT_DRAW, 0, pInst, pInst))
		{
			// Otherwise just DRAW it..
			var pSprite = g_pSpriteManager.Get(pInst.sprite_index);
			if (pSprite)
			{
				if ((pInst.image_xscale == 1.0) && (pInst.image_yscale == 1.0) && (pInst.image_angle == 0.0) && (pInst.image_blend == 0xffffff)) // &&  (pInst.image_alpha == 1.0))
				{
					pSprite.DrawSimple(pInst.image_index, pInst.x, pInst.y, pInst.image_alpha);
				}
				else
				{
					pSprite.Draw(pInst.image_index,
									pInst.x, pInst.y,
									pInst.image_xscale, pInst.image_yscale,
									pInst.image_angle,
									pInst.image_blend,
									pInst.image_alpha
								);
				}
			}
		}
	}

	// Render any particles that are left...
	while (partdepth > -1000000000)
	{
		ParticleSystem_DrawDepth(partdepth);
		partdepth = ParticleSystem_NextDepth(partdepth);
	}
};


// #############################################################################################
/// Function:<summary>
///             Draw everything actually "inside" the room
///          </summary>
///
/// In:		 <param name="_rect">Region to draw to</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoom.prototype.DrawTheRoom = function (_rect) {

	g_roomExtents = _rect;

	if (this.m_showcolor)
	{
		Graphics_ClearScreen(g_pBuiltIn.background_color);
	}



	// Draw the backgrounds
	for (var i = 0; i < g_pBackgroundManager.background.length; i++)
	{
		var v = array_get_1D(global, "__background_visible__", i);
		var f = array_get_1D(global, "__background_foreground__", i);
		if (v && !f)
		{
			var pBack = g_pBackgroundManager.Get(i);
			pBack.x = array_get_1D(global, "__background_x__", i);
			pBack.y = array_get_1D(global, "__background_y__", i);
			pBack.index = array_get_1D(global, "__background_index__", i);
			pBack.hTiled = array_get_1D(global, "__background_htiled__", i);
			pBack.vTiled = array_get_1D(global, "__background_vtiled__", i);
			pBack.alpha = array_get_1D(global, "__background_alpha__", i);
			pBack.blend = array_get_1D(global, "__background_blend__", i);
			pBack.hspeed = array_get_1D(global, "__background_hspeed__", i);
			pBack.vspeed = array_get_1D(global, "__background_vspeed__", i);

			var pImage = g_pBackgroundManager.GetImage(pBack.index);
			if (pImage != null)
			{
				if (pBack.stretch)
				{
					Graphics_DrawStretchedExt(pImage.TPEntry, pBack.x, pBack.y, this.m_width, this.m_height, pBack.blend, pBack.alpha);
				} else
				{
					Graphics_TextureDrawTiled(pImage.TPEntry, pBack.x, pBack.y, pBack.hTiled, pBack.vTiled);
				}
			}
		}
	}
	//float partdepth = ParticleSystem_LargestDepth();	    

	if (this.m_PlayfieldManager.m_Playfields.count > 0)
	{
		if (g_ParticleSystems.length != 0)
		{
			this.DrawInstancesParticlesTiles(_rect)
		}
		else
		{
			this.DrawInstancesTiles(_rect);
		}
	} else if (g_ParticleSystems.length != 0)
	{
		this.DrawInstancesParticles(_rect);
	} else
	{
		this.DrawInstancesOnly(_rect);
	}


	// Draw the foregrounds
	//GR_3D_Set_Depth(-12000);
	for (var i = 0; i < g_pBackgroundManager.background.length; i++)
	{
		var pBack = g_pBackgroundManager.Get(i);
		if (pBack != null && pBack.visible && pBack.foreground)
		{
			var pImage = g_pBackgroundManager.GetImage(this.index);
			if (pImage != null)
			{
				if (pBack.stretch)
				{
					Graphics_DrawStretchedExt(pImage.TPEntry, pBack.x, pBack.y, this.m_width, this.m_height, pBack.blend, pBack.alpha);
				} else
				{
					Graphics_TextureDrawTiled(pImage.TPEntry, pBack.x, pBack.y, pBack.hTiled, pBack.vTiled);
				}
			}
		}
	}
};



var g_LastTouchX = 0;
var g_LastTouchY = 0;
// #############################################################################################
/// Function:<summary>
///             Draw the room
///          </summary>
// #############################################################################################
yyRoom.prototype.Draw = function () {
	var r = new YYRECT();
	this.UpdateViews();
	//Run_Room->SortTiles();



	// Get a "VIEW" array... and if we don't have one, supply the "fake" one.
	var pViews;
	if (!this.m_enableviews)
	{
		pViews = g_DefaultViewArray;
		g_DisplayScaleX = DISPLAY_WIDTH / g_RunRoom.m_width;
		g_DisplayScaleY = DISPLAY_HEIGHT / g_RunRoom.m_height;
	} else
	{
		pViews = this.m_Views;
		if( this. m_ViewClearScreen ) Graphics_ClearScreen( g_pBuiltIn.background_color ); 		// In case the views don't cover the window
	}



	Current_View = 0;
	for (i in pViews)
	{
		g_pCurrentView = pViews[i];
		if (g_pCurrentView.visible)
		{
			Graphics_Save();
			g_pCurrentView.scaledportx = g_pCurrentView.portx * g_DisplayScaleX;
			g_pCurrentView.scaledporty = g_pCurrentView.porty * g_DisplayScaleY;
			g_pCurrentView.scaledportw = g_pCurrentView.portw * g_DisplayScaleX;
			g_pCurrentView.scaledporth = g_pCurrentView.porth * g_DisplayScaleY;
			g_pCurrentView.scaledportx2 = g_pCurrentView.scaledportx + g_pCurrentView.scaledportw;
			g_pCurrentView.scaledporty2 = g_pCurrentView.scaledporty + g_pCurrentView.scaledporth;
			g_pCurrentView.WorldViewScaleX = g_pCurrentView.scaledportw / g_pCurrentView.worldw;
			g_pCurrentView.WorldViewScaleY = g_pCurrentView.scaledporth / g_pCurrentView.worldh;

			Graphics_SetViewPort(g_pCurrentView.scaledportx, g_pCurrentView.scaledporty, g_pCurrentView.scaledportw, g_pCurrentView.scaledporth);
			Graphics_SetViewArea(g_pCurrentView.worldx, g_pCurrentView.worldy, g_pCurrentView.worldw, g_pCurrentView.worldh);

			// no Angle allowed on view....
			r.left = g_pCurrentView.worldx;
			r.top = g_pCurrentView.worldy;
			r.right = g_pCurrentView.worldx + g_pCurrentView.worldw;
			r.bottom = g_pCurrentView.worldy + g_pCurrentView.worldh;

			this.DrawTheRoom(r);
			Current_View++;
			Graphics_Restore();
		}
	}


	
	/*graphics.globalAlpha = 1.0;
	graphics.fillStyle = GetHTMLRGBA(0x000000, 1.0);
	graphics.fillRect(0, 0, 150,30);
	graphics.fillStyle = GetHTMLRGBA(0xffffff, 1.0);
	//graphics.fillText("sleep=" + g_roomdiff/1000.0, 10, 15);
	graphics.fillText("fps=" + g_pBuiltIn.fps, 10, 15);
	*/


	/*draw_set_alpha(1.0);
	draw_set_color(0xff0000);
	//draw_circle(100, 100, 50, 0);
	draw_triangle(10, 10, 100, 10, 100, 100, false);
	//draw_set_color(0x00ff00);
	draw_triangle(10, 10, 10, 100, 100, 100, false);
	*/

	//drawTexturedTriangle(image, 0, 50, 100, 0, 200, 50,   0, 0, 150, 0, 150, 150);
	//drawTexturedTriangle(image, 200, 50, 100, 100, 0, 50,   150, 150,  0, 150, 0, 0);
	
};

// #############################################################################################
/// Function:<summary>
///             Removed all "marked" instances - those that have been deleted.
///          </summary>
// #############################################################################################
yyRoom.prototype.RemoveMarked = function () {
	// First copy all MARKED instances into array
	var tmp = [];
	var pInstArray = g_pInstanceManager.m_Instances.pool;
	for (var i in pInstArray)
	{
		var pInst = pInstArray[i];
		if (pInst.marked)
		{
			tmp[tmp.length] = pInst;
		}
	}

	// Now loop through the marked list, and delete them from everywhere else!
	for (var i = 0; i < tmp.length; i++)
	{
		var pInst = tmp[i];
		this.DeleteInstance(pInst);
	}
};



// #############################################################################################
/// Function:<summary>
///             Delete an instance from the room
///          </summary>
///
/// In:		 <param name="pInst">Instance to remove</param>
// #############################################################################################
yyRoom.prototype.DeleteInstance = function (pInst) {
	g_pInstanceManager.Remove(pInst);
	this.m_Active.Delete(pInst);
	this.m_Deactive.DeleteItem(pInst);
	pInst.pObject.RemoveInstance(pInst);
};


// #############################################################################################
/// Property: <summary>
///           	Add a tile to the room.
///           </summary>
// #############################################################################################
yyRoom.prototype.AddTile = function (_pTile) {

	this.m_PlayfieldManager.Add(_pTile);
	this.m_Tiles[_pTile.id] = _pTile;
	this.m_NumTiles++;
};



// #############################################################################################
/// Property: <summary>
///           	Add a tile to the room.
///           </summary>
// #############################################################################################
yyRoom.prototype.DeleteTile = function (_id) {
	var pTile = this.m_Tiles[_id];
	if (pTile)
	{
		this.m_PlayfieldManager.Delete(pTile);
		this.m_Tiles[_id] = null;
		this.m_NumTiles--;
	}
};

// #############################################################################################
/// Property: <summary>
///           	Add a tile to the room.
///           </summary>
// #############################################################################################
yyRoom.prototype.DeleteTileLayer = function (_depth) {
	var pPlayfield = this.m_PlayfieldManager.Get(_depth);
	var pool = pPlayfield.GetPool();

	// Delete all tile that exist in this layer.
	for (var tile in pool)
	{
		var pTile = pool[tile];
		if (pTile)
		{
			this.m_Tiles[pTile.id] = null;
			this.m_NumTiles--;
		}
	}

	m_PlayfieldManager.Delete(_depth);
};


// #############################################################################################
/// Property: <summary>
///           	Remove all tiles currently in use
///           </summary>
// #############################################################################################
yyRoom.prototype.ClearTiles = function () {

    this.m_NumTiles = 0;
    this.m_Tiles = [];
};


// #############################################################################################
/// Property: <summary>
///           	Remove all tiles specified in storage
///           </summary>
// #############################################################################################
yyRoom.prototype.ClearTilesFromStorage = function () {
	this.m_pStorage.tiles = [];
};



// #############################################################################################
/// Function:<summary>
///             Process DEPTH list
///          </summary>
///
/// In:		 <param name="_depth">New depth of the instance</param>
// #############################################################################################
yyRoom.prototype.ProcessDepthList = function () {
	if (this.m_DepthSorting.length == 0) return;

	var list = this.m_DepthSorting;
	for (var i = 0; i < this.m_DepthSorting.length; i++)
	{
		var pInst = list[i];
		this.m_Active.Delete(pInst);
		this.m_Active.Add(pInst, pInst.depth);
	}
	
	// Now we've processed it... Clear the list
	this.m_DepthSorting = [];
};






























// #############################################################################################
/// Function:<summary>
///             Simple room manager
///          </summary>
// #############################################################################################
function    yyRoomManager()
{
    this.pRooms = []; //new yyList();
    this.m_RoomOrder = [];
}


// #############################################################################################
/// Function:<summary>
///             Set the room order
///          </summary>
// #############################################################################################
yyRoomManager.prototype.SetRoomOrder = function (_order) {
	this.m_RoomOrder = _order;
};


// #############################################################################################
/// Function:<summary>
///             Add a room to the list
///          </summary>
///
/// In:		 <param name="_pRoom">Room to add</param>
/// Out:	 <returns>
///				index room was added at
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.Add = function (_pRoom) {
	return this.pRooms[this.pRooms.length] = _pRoom;
};

// #############################################################################################
/// Function:<summary>
///             Get a room at a specific point
///          </summary>
///
/// In:		 <param name="_pRoom"></param>
/// Out:	 <returns>
///				The actual room
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.Get = function (_Index) {
	return this.pRooms[_Index];
};

// #############################################################################################
/// Function:<summary>
///             Get a room at a specific point
///          </summary>
///
/// In:		 <param name="_pRoom"></param>
/// Out:	 <returns>
///				The actual room
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.GetOrder = function (_Index) {
	return this.pRooms[this.m_RoomOrder[_Index]];
};

// #############################################################################################
/// Function:<summary>
///             Delete a room
///          </summary>
///
/// In:		 <param name="_Index"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.Delete = function (_Index) {
	this.pRooms[_Index] = null;
};

// #############################################################################################
/// Function:<summary>
///             Creates a new room that is a duplicate of the room at the index given
///          </summary>
///
/// In:		 <param name="_Index"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.DuplicateRoom = function (_Index) {

    var pOriginalRoom = g_pRoomManager.Get(_Index);

    var pDuplicateRoom = new yyRoom();
    pDuplicateRoom.CreateEmptyStorage();
    pDuplicateRoom.CloneStorage(pOriginalRoom.m_pStorage);
        
    this.Add(pDuplicateRoom);    
    return pDuplicateRoom.id;
};


// #############################################################################################
/// Function:<summary>
///             Assigns
///          </summary>
///
/// In:		 <param name="_Index"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyRoomManager.prototype.AssignRoom = function (_dest, _source) {

    // Add all instances, tiles, backgrounds etc... to the destination room and copy across the basic settings
    var destRoom = this.pRooms[_dest];
    var sourceRoom = this.pRooms[_source];
    
    if (!destRoom || !sourceRoom) {
        return;
    }
    
    // Assign the source storage to the destination room
	destRoom.CloneStorage(sourceRoom.m_pStorage);
};

