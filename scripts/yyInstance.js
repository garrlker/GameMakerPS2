

var g_Events = new Array( "StepEvent", "DrawEvent", "LeftButtonPressed", "RightButtonPressed", "NoButtonPressed" );
var g_rr = new YYRECT(0, 0, 0, 0);

// For inherited (and debug) events
var Current_Object = null;
var Current_Event_Type = -1;
var Current_Event_Number = -1;

// #############################################################################################
/// Function:<summary>
///              Create an instance
///          </summary>
///
/// In:		 <param name="xx">X coordinate</param>
///			 <param name="yy">Y coordinate</param>
///			 <param name="id">ID of instance</param>
///			 <param name="objectind">object ID</param>
///			 <param name="_AddObjectLink">link instance?</param>
///				
// #############################################################################################
function    yyInstance( _xx, _yy, _id, _objectind, _AddObjectLink)
{
    // Array of user "arrays", accessed "by name"
    this.m_Arrays = [];

	this.x = _xx;
    this.y = _yy;
	this.xprevious = _xx;
	this.yprevious = _yy;
	this.xstart = _xx;
	this.ystart = _yy;
	this.hspeed = 0;
	this.vspeed = 0;
	this.direction = 0;
	this.speed = 0;
	this.friction = 0;
	this.gravity = 0;
	this.gravity_direction = 270;
	this.object_index = _objectind;
	this.id = _id;

	//this.alarm = [];
	for(var i= 0 ; i<=(MAXTIMER-1); i++ ) {
    	array_set_1D(this, "__alarm__", i, -1);
		//this.alarm[i] = -1; 
	}

	this.solid = true;
	this.visible = true;
	this.persistent = false;
	this.depth = 0;
	this.bbox = new YYRECT(0,0,0,0);
    //this.bbox_left = 0;       
    //this.bbox_right = 0;
    //this.bbox_top = 0;
    //this.bbox_bottom = 0;
	this.sprite_index = 0;
	this.image_index = 0;
	this.image_single = -1;                         // Not supported

    this.image_number = 0;    
    this.sprite_width = 0;    
    this.sprite_height = 0;   
    this.sprite_xoffset = 0;  
    this.sprite_yoffset = 0;  

	this.image_xscale = 1;
	this.image_yscale = 1;
	this.image_angle = 0;
	this.image_alpha = 1;
	this.image_blend = 0xffffff;
	this.image_speed = 1;
	this.mask_index = -1;

	this.path_index = -1;
	this.path_position = 0;
	this.path_positionprevious = 0;
	this.path_speed = 0;
	this.path_scale = 1;
	this.path_orientation = 0;
	this.path_endaction = 0;
	this.path_end = 0; 			
	this.path_xstart = 0;       
	this.path_ystart = 0;       

	this.timeline_index = -1;
	this.timeline_position = 0;
	this.timeline_speed = 1;
    this.timeline_paused = false;


	this.InstanceIndex = -1;
	this.Created = false;

	this.marked = false;
	this.deactivated = false;
	this.initcode = null;
	this.precise = false;
    this.bbox_dirty = true;
    this.mouse_over = false;


	//this.vars = null;
	//vars = YYNEW CVariableList();
    
	this.pObject = null;                                     // Pointer to object type
	this.SetObjectIndex(_objectind, _AddObjectLink);
	
	this.sprite_index = this.pObject.SpriteIndex;   
    var pSprite = g_pSpriteManager.Get(this.sprite_index);
    if(pSprite){
        this.bbox.left = pSprite.bbox.left;
        this.bbox.right = pSprite.bbox.right;
        this.bbox.top = pSprite.bbox.top;
        this.bbox.bottom = pSprite.bbox.bottom;
    }
}

yyInstance.prototype.setx = function (_x) { this.x = _x; this.bbox_dirty = true; };
yyInstance.prototype.sety = function (_y) { this.y = _y; this.bbox_dirty = true; };
yyInstance.prototype.setangle = function (_ang) { this.image_angle = _ang; this.bbox_dirty = true; };
yyInstance.prototype.setxscale = function (_scale) { this.image_xscale = _scale; this.bbox_dirty = true; };
yyInstance.prototype.setyscale = function (_scale) { this.image_yscale = _scale; this.bbox_dirty = true; };
yyInstance.prototype.SetDirtyBBox = function (flag) { this.bbox_dirty = flag; };
yyInstance.prototype.GetDirty = function () { return this.bbox_dirty; };
yyInstance.prototype.getdepth = function () { return this.depth; };

yyInstance.prototype.set_imageblend = function (_col) { this.image_blend = ConvertGMColour(_col); };
yyInstance.prototype.get_imageblend = function () { return ConvertGMColour(this.image_blend); };


// #############################################################################################
/// Function:<summary>
///             gets number of images of the instance's current sprite
///          </summary>
// #############################################################################################
yyInstance.prototype.get_image_number = function () {

	var pSprite = g_pSpriteManager.Get(this.sprite_index);
	return pSprite.ppTPE.length;
};


// #############################################################################################
/// Function:<summary>
///             get the width of the current sprite
///          </summary>
// #############################################################################################
yyInstance.prototype.get_sprite_width = function () {
	var pSprite = g_pSpriteManager.Get(this.sprite_index);
	return pSprite.width;
};


// #############################################################################################
/// Function:<summary>
///             get the height of the current sprite
///          </summary>
// #############################################################################################
yyInstance.prototype.get_sprite_height = function () {
	var pSprite = g_pSpriteManager.Get(this.sprite_index);
	return pSprite.height;
};



// #############################################################################################
/// Function:<summary>
///             get the xoffset of the current sprite
///          </summary>
// #############################################################################################
yyInstance.prototype.get_sprite_xoffset = function () {
	var pSprite = g_pSpriteManager.Get(this.sprite_index);
	return pSprite.xOrigin;
};

// #############################################################################################
/// Function:<summary>
///             get the xoffset of the current sprite
///          </summary>
// #############################################################################################
yyInstance.prototype.get_sprite_yoffset = function () {
	var pSprite = g_pSpriteManager.Get(this.sprite_index);
	return pSprite.yOrigin;
};

// #############################################################################################
/// Function:<summary>
///             Set the DEPTH of an instance.
///          </summary>
///
/// In:		 <param name="_depth">New depth of the instance</param>
// #############################################################################################
yyInstance.prototype.setdepth = function (_depth) {
	//g_RunRoom.m_Active.Delete(this);
	this.depth = _depth;
	g_RunRoom.m_DepthSorting[g_RunRoom.m_DepthSorting.length] = this;
	//g_RunRoom.m_Active.Add(this, _depth);
};


// #############################################################################################
/// Function:<summary>
///				Sets the position of the instance
///          </summary>
///
/// In:		 <param name="_newx"></param>
///			 <param name="_newy"></param>
///				
// #############################################################################################
yyInstance.prototype.SetPosition = function (_newx, _newy) {
	if ((this.x == _newx) && (this.y == _newy)) return;

	this.x = _newx;
	this.y = _newy;
	this.bbox_dirty = true;
};

// #############################################################################################
/// Function:<summary>
///				Copy the instance data from "inst" into "this"
///          </summary>
///
/// In:		 <param name="inst">Instance to copy from</param>
///			 <param name="_LinkToObjectType">Link into active objects</param>
// #############################################################################################
yyInstance.prototype.Assign = function (_pInst, _LinkToObjectType) {
	if (this.pObject != null)
	{
		this.pObject.RemoveInstance(this);
		this.pObject = null;
	}

	// Copy everything!!
	for (var v in _pInst)
	{
		var p = _pInst[v];
		this[v] = p;
	}

	// Copy the bbox properly, so it's not just a reference.
	this.bbox.Copy(_pInst.bbox);

	for (var i = 0; i <= MAXTIMER - 1; i++)
	{
		var a = array_get_1D(_pInst, "__alarm__", i);
		array_set_1D(this, "__alarm__", i, a);
	}

	if (_LinkToObjectType && this.pObject != null)
	{
		this.pObject.AddInstance(this);
	}
};

// #############################################################################################
/// Function:<summary>
///             Copies object "type" (using index) _val into this one.
///          </summary>
///
/// In:		 <param name="val"></param>
///				
// #############################################################################################
yyInstance.prototype.SetObjectIndex = function (_objindex, _LinkToObjectType) {
	// Set the TYPE index
	this.object_index = _objindex;

	if (this.pObject != null)
	{
		this.pObject.RemoveInstance(this);
		this.pObject = null;
	}
	if (_objindex == -1) _objindex = 0;


	this.pObject = g_pObjectManager.Get(_objindex);
	if (this.pObject != null)
	{
		// Otherwise add the instance to it's list.
		if (_LinkToObjectType)
		{
			this.pObject.AddInstance(this);
		}

		// and copy the data over...
		this.mask_index = this.pObject.SpriteMask;
		this.depth = this.pObject.Depth;
		this.solid = this.pObject.Solid;
		this.visible = this.pObject.Visible;
		this.persistent = this.pObject.Persistent;

		//SetSpriteIndex(m_pObject->GetSpriteIndex());
		this.bbox_dirty = true;
	}
};


// #############################################################################################
/// Function:<summary>
///				Computes the speed and direction from the components
///          </summary>
// #############################################################################################
yyInstance.prototype.Compute_Speed1 = function () {
	with (this)
	{
		// direction
		if (this.hspeed == 0)
		{
			if (this.vspeed > 0)
			{
				this.direction = 270;
			}
			else if (this.vspeed < 0)
			{
				this.direction = 90;
			}
			else { this.direction = 0; }
		}
		else
		{
			var dd = 180 * (Math.atan2(this.vspeed, this.hspeed)) / Pi;
			if (dd <= 0) { this.direction = -dd; } else { this.direction = 360.0 - dd; }
		}

		if (Math.abs(this.direction - Round(this.direction)) < 0.0001)
		{
			this.direction = Round(this.direction);
		}
		this.direction = fmod(this.direction, 360.0);

		// speed
		this.speed = Math.sqrt(Sqr(this.hspeed) + Sqr(this.vspeed));
		if (Math.abs(this.speed - Round(this.speed)) < 0.0001) this.speed = Round(this.speed);
	}
};


// #############################################################################################
/// Function:<summary>
///				Computes the components from the speed and direction
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Compute_Speed2 = function () {
	this.hspeed = this.speed * Math.cos(this.direction * Pi / 180.0);
	this.vspeed = -this.speed * Math.sin(this.direction * Pi / 180.0);

	// Round a bit
	if (Math.abs(this.hspeed - Round(this.hspeed)) < 0.0001) { this.hspeed = Round(this.hspeed); }
	if (Math.abs(this.vspeed - Round(this.vspeed)) < 0.0001) { this.vspeed = Round(this.vspeed); }
};

// #############################################################################################
/// Function:<summary>
///				Add speed amount in direction dir
///          </summary>
///
/// In:		 <param name="_dir"></param>
///			 <param name="_amount"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.AddTo_Speed = function (_dir, _amount) {
	this.hspeed += _amount * Math.cos(_dir * Math.PI / 180.0);
	this.vspeed -= _amount * Math.sin(_dir * Math.PI / 180.0);

	this.Compute_Speed1();
};


// #############################################################################################
/// Function:<summary>
///				Adapts the speed of the instance based on friction and gravity
///          </summary>
// #############################################################################################
yyInstance.prototype.AdaptSpeed = function () {
	// deal with friction
	if (this.friction != 0.0)
	{
		var ns;
		if (this.speed > 0)
		{
			ns = this.speed - this.friction;
		}
		else
		{
			ns = this.speed + this.friction;
		}



		if ((this.speed > 0) && (ns < 0))
		{
			this.setspeed(0);
		}
		else if ((this.speed < 0) && (ns > 0))
		{
			this.setspeed(0);
		}
		else if (this.speed != 0)
		{
			this.setspeed(ns);
		}
	}


	// deal with gravity
	if (this.gravity != 0)
	{
		this.AddTo_Speed(this.gravity_direction, this.gravity);
	}
};


// #############################################################################################
/// Function:<summary>
///             Get the image number
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.GetImageNumber = function () {
	return g_pSpriteManager.GetImageCount(this.sprite_index);
};



// #############################################################################################
/// Function:<summary>
///             Perform an event on this instance.
///          </summary>
///
/// In:		 <param name="_pInst">the event to perform</param>
///          <param name="_pInst">the THIS to use in the event</param>
///			 <param name="_pOther">the OTHER to use in the event</param>
// #############################################################################################
yyInstance.prototype.PerformEvent = function (_event, _index, _pInst, _pOther) {
	//if( pObject.Name == "oAssessmentBack" & _event==EVENT_DRAW){
	//    this.testcode = 1;
	//}
	var pObj = this.pObject;

	// Store current object settings
	var oldobj = Current_Object;
	var oldtype = Current_Event_Type;
	var oldnumb = Current_Event_Number;
	var evnt = _event;
	if (evnt != EVENT_COLLISION) evnt |= _index;

	var result = false;
	while (pObj != null)
	{
		// if the object handles this event, then do the event.
		if (pObj.Event[evnt])
		{
			Current_Object = pObj;
			Current_Event_Type = _event;
			Current_Event_Number = _index;

			result = pObj.PerformEvent(_event, _index, _pInst, _pOther);
			break;
		}
		// If the object DOESN'T handle this event, then try the parent.
		pObj = pObj.pParent;
	}

	// Restore previous current object settings
	Current_Object = oldobj;
	Current_Event_Type = oldtype;
	Current_Event_Number = oldnumb;

	return result;
};


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="val"></param>
///				
// #############################################################################################
yyInstance.prototype.sethspeed = function (_val) {
	if (this.hspeed == _val) return;

	this.hspeed = _val;
	this.Compute_Speed1();
};


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.setvspeed = function (_val) {
	if (this.vspeed == _val) return;
	this.vspeed = _val;
	this.Compute_Speed1();
};


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="val"></param>
///				
// #############################################################################################
yyInstance.prototype.setdirection = function (_val) {
	this.direction = fmod(_val, 360.0);
	this.Compute_Speed2();
};


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_val"></param>
///				
// #############################################################################################
yyInstance.prototype.setspeed = function (_val) {
	if (this.speed == _val) return;

	this.speed = _val;
	this.Compute_Speed2();
};

// #############################################################################################
/// Function:<summary>
///				Computes the real scaled, translated bounding box
///          </summary>
// #############################################################################################
yyInstance.prototype.Compute_BoundingBox = function () {
	var spr, t;

	if (this.mask_index >= 0)
	{
		spr = g_pSpriteManager.Get(this.mask_index); ;
	} else
	{
		spr = g_pSpriteManager.Get(this.sprite_index); ;
	}

	var bbox = this.bbox;
	if (spr === null)
	{
		this.bbox.left = -100000; // no collisions
		this.bbox.top = -100000;
		this.bbox.right = -100000;
		this.bbox.bottom = -100000;

		this.precise = false;
	}
	else if (this.image_angle == 0)
	{
		//bbox.Copy( spr.bbox );
		var pRect = spr.bbox;
		bbox.left = Round(this.x + this.image_xscale * (pRect.left - spr.xOrigin));
		bbox.right = Round(this.x + this.image_xscale * (pRect.right - spr.xOrigin + 1) - 1);

		if (bbox.left > bbox.right)
		{
			t = bbox.left;
			bbox.left = bbox.right;
			bbox.right = t;
		}

		bbox.top = Round(this.y + this.image_yscale * (pRect.top - spr.yOrigin));
		bbox.bottom = Round(this.y + this.image_yscale * (pRect.bottom - spr.yOrigin + 1) - 1);
		if (bbox.top > bbox.bottom)
		{
			t = bbox.top;
			bbox.top = bbox.bottom;
			bbox.bottom = t;
		}
		this.precise = spr.GetCollisionChecking();
	}
	else
	{
		var pRect = spr.bbox;
		var xmin, xmax;

		// base on sprite bbox, and these can't change, so will always be in order, left<right and top<bottom
		xmin = this.image_xscale * (pRect.left - spr.xOrigin);
		xmax = this.image_xscale * (pRect.right - spr.xOrigin + 1) - 1;


		var ymin, ymax;
		ymin = this.image_yscale * (pRect.top - spr.yOrigin);
		ymax = this.image_yscale * (pRect.bottom - spr.yOrigin + 1) - 1;

		var cc, ss;
		cc = Math.cos(this.image_angle * Pi / 180.0);
		ss = Math.sin(this.image_angle * Pi / 180.0);

		// factor out "common" calculations...
		var cc_xmax = cc * xmax;
		var cc_xmin = cc * xmin;
		var ss_ymax = ss * ymax;
		var ss_ymin = ss * ymin;
		var t;
		if (cc_xmax < cc_xmin)
		{
			t = cc_xmin;
			cc_xmin = cc_xmax;
			cc_xmax = t;
		}
		if (ss_ymax < ss_ymin)
		{
			t = ss_ymin;
			ss_ymin = ss_ymax;
			ss_ymax = t;
		}
		bbox.left = (this.x + cc_xmin + ss_ymin) | 0;
		bbox.right = (this.x + cc_xmax + ss_ymax) | 0;

		// factor out "common" calculations...
		var cc_ymax = cc * ymax;
		var cc_ymin = cc * ymin;
		var ss_xmax = ss * xmax;
		var ss_xmin = ss * xmin;
		if (cc_ymax < cc_ymin)
		{
			t = cc_ymin;
			cc_ymin = cc_ymax;
			cc_ymax = t;
		}
		if (ss_xmax < ss_xmin)
		{
			t = ss_xmin;
			ss_xmin = ss_xmax;
			ss_xmax = t;
		}
		bbox.top = (this.y + cc_ymin - ss_xmax) | 0;
		bbox.bottom = (this.y + cc_ymax - ss_xmin) | 0;

		this.precise = spr.GetCollisionChecking();
	}
	this.bbox = bbox;
	this.bbox_dirty = false;
};


// #############################################################################################
/// Function:<summary>
///				Returns whether there is a collision with a point
///          </summary>
///
/// In:		 <param name="x">X coordinate</param>
///			 <param name="y">Y coordinate</param>
///			 <param name="prec">indicates whether to use precise checking</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Collision_Point = function (_x, _y, _prec) {
	if (this.marked) return false;

	// First, if either box is dirty, recompute bounding box.
	if (this.bbox_dirty) this.Compute_BoundingBox();

	// easy cases first
	var bbox = this.bbox;
	if (_x >= bbox.right + 1) return false;
	if (_x < bbox.left) return false;
	if (_y >= bbox.bottom + 1) return false;
	if (_y < bbox.top) return false;


	// If the point collided with the box, and we're not doing "precise" collisions, then exit true.
	if ((!_prec) || (!this.precise)) return true;



	// handle precise collision tests
	var pSpr;
	if (this.mask_index < 0)
	{
		pSpr = g_pSpriteManager.Get(this.sprite_index);
	} else
	{
		pSpr = g_pSpriteManager.Get(this.mask_index);
	}


	// If this is an invalid sprite, or it has NO images, then false.
	if ((pSpr === null) || (pSpr.numb == 0)) return false;

	return pSpr.PreciseCollisionPoint(Math.floor(this.image_index), bbox,
                                        Round(this.x), Round(this.y),
                                        this.image_xscale, this.image_yscale,
                                        this.image_angle,
                                        Round(_x), Round(_y)
                                    );
};


// #############################################################################################
/// Function:<summary>
///				Returns whether there is a collision with a rectangle
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="prec">indicates whether to use precise checking</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Collision_Rectangle = function (_x1, _y1, _x2, _y2, _prec) {
	if (this.marked) return false;

	// First, if either box is dirty, recompute bounding box.
	if (this.bbox_dirty) this.Compute_BoundingBox();

	// easy cases first
	var bbox = this.bbox;
	if (yymin(_x1, _x2) >= bbox.right + 1) return false;
	if (yymax(_x1, _x2) < bbox.left) return false;
	if (yymin(_y1, _y2) >= bbox.bottom + 1) return false;
	if (yymax(_y1, _y2) < bbox.top) return false;

	if ((!_prec) || (!this.precise)) return true;

	// handle precise collision tests
	var pSpr;
	if (this.mask_index < 0)
	{
		pSpr = g_pSpriteManager.Get(this.sprite_index);
	} else
	{
		pSpr = g_pSpriteManager.Get(this.mask_index);
	}


	// If this is an invalid sprite, or it has NO images, then false.
	if ((pSpr === null) || (pSpr.numb == 0)) return false;

	//function Rect(ALeft, ATop, ARight, ABottom: Integer): TRect;
	g_rr.left = Round(yymin(_x1, _x2));
	g_rr.top = Round(yymin(_y1, _y2));
	g_rr.right = Round(yymax(_x1, _x2));
	g_rr.bottom = Round(yymax(_y1, _y2));

	Result = pSpr.PreciseCollisionRectangle(Math.floor(this.image_index), bbox, Round(this.x), Round(this.y),
												this.image_xscale, this.image_yscale, this.image_angle,
												g_rr
											);
	return Result;
};



// #############################################################################################
/// Function:<summary>
///				Returns whether there is a collision with an ellipse
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="prec">indicates whether to use precise checking</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Collision_Ellipse = function (_x1, _y1, _x2, _y2, _prec) {
	if (this.marked) return false;

	// First, if either box is dirty, recompute bounding box.
	if (this.bbox_dirty) this.Compute_BoundingBox();

	//var rr;
	_x1 = Round(_x1);
	_x2 = Round(_x2);
	_y1 = Round(_y1);
	_y2 = Round(_y2);

	var max_x1x2, max_y1y2, min_x1x2, min_y12;

	if (_x1 < _x2)
	{
		min_x1x2 = _x1;
		max_x1x2 = _x2;
	} else
	{
		min_x1x2 = _x2;
		max_x1x2 = _x1;
	}
	if (_y1 < _y2)
	{
		min_y1y2 = _y1;
		max_y1y2 = _y2;
	} else
	{
		min_y1y2 = _y2;
		max_y1y2 = _y1;
	}


	// easy cases first
	var bbox = this.bbox;
	if (min_x1x2 >= bbox.right) return false;
	if (max_x1x2 < bbox.left) return false;
	if (min_y1y2 >= bbox.bottom) return false;
	if (max_y1y2 < bbox.top) return false;


	// check whether single line
	if ((_x1 == _x2) || (_y1 == _y2))
	{
		return this.Collision_Rectangle(_x1, _y1, _x2, _y2, _prec);
	}

	if ((!_prec) || (!this.precise)) return true;


	g_rr.left = min_x1x2;
	g_rr.top = min_y1y2;
	g_rr.right = max_x1x2;
	g_rr.bottom = max_y1y2;


	// handle precise collision tests
	var pSpr;
	if (this.mask_index < 0)
	{
		pSpr = g_pSpriteManager.Get(this.sprite_index);
	} 
	else
	{
		pSpr = g_pSpriteManager.Get(this.mask_index);
	}


	if ((pSpr === null) || (pSpr.numb == 0)) return false;


	g_CollisionEllipseCounter++;
	return pSpr.PreciseCollisionEllipse(Math.floor(this.image_index), bbox, Round(this.x), Round(this.y), this.image_xscale, this.image_yscale, this.image_angle, g_rr);
};


// #############################################################################################
/// Function:<summary>
///				Returns whether there is a collision with a line segment
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="prec">indicates whether to use precise checking</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Collision_Line = function (_x1, _y1, _x2, _y2, _prec) {
	if (this.marked)
	{
		return false;
	}

	// First, if either box is dirty, recompute bounding box.
	if (this.bbox_dirty)
	{
		this.Compute_BoundingBox();
	}

	// easy cases first    
	var i_bbox = this.bbox;
	if (yymin(_x1, _x2) >= i_bbox.right + 1) { return false; }
	if (yymax(_x1, _x2) < i_bbox.left) { return false; }
	if (yymin(_y1, _y2) >= i_bbox.bottom + 1) { return false; }
	if (yymax(_y1, _y2) < i_bbox.top) { return false; }

	// now check whether we intersect the bounding box
	// make sure line runs from left to right
	if (_x2 < _x1)
	{
		var val = _x2;
		_x2 = _x1;
		_x1 = val;

		val = _y2;
		_y2 = _y1;
		_y1 = val;
	}

	// shift left end point    
	if (_x1 < i_bbox.left)
	{
		_y1 = _y1 + (i_bbox.left - _x1) * (_y2 - _y1) / (_x2 - _x1);   // _x2 cannot be _x1
		_x1 = i_bbox.left;
	}

	// shift right end point
	if (_x2 > (i_bbox.right + 1))
	{
		_y2 = _y2 + (i_bbox.right + 1 - _x2) * (_y2 - _y1) / (_x2 - _x1);   // x2 cannot be x1
		_x2 = i_bbox.right + 1;
	}

	// check whether part lies outside
	if ((_y1 < i_bbox.top) && (_y2 < i_bbox.top)) { return false; }
	if ((_y1 >= i_bbox.bottom + 1) && (_y2 >= i_bbox.bottom + 1)) { return false; }
	if (!_prec || !this.precise) { return true; }

	// handle precise collision tests
	var pSpr = null;
	if (this.mask_index < 0)
	{
		pSpr = g_pSpriteManager.Get(this.sprite_index);
	}
	else
	{
		pSpr = g_pSpriteManager.Get(this.mask_index);
	}

	if ((pSpr == null) || (pSpr == undefined) || (pSpr.GetCount() == 0))
	{
		return false;
	}

	// (n | 0) effectively casts 'n' to an int
	return pSpr.PreciseCollisionLine(this.image_index | 0, i_bbox, Round(this.x), Round(this.y), this.image_xscale, this.image_yscale, this.image_angle, Round(_x1), Round(_y1), Round(_x2), Round(_y2));
};


// #############################################################################################
/// Function:<summary>
///				Returns whether there is a collision with an instance
///          </summary>
///
/// In:		 <param name="inst"></param>
///			 <param name="prec">indicates whether to use precise checking</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyInstance.prototype.Collision_Instance = function (_pInst, _prec) {
	// should really be done before here.....
	if (!(this == _pInst) && !this.marked && !_pInst.marked)
	{
		// First, if either box is dirty, recompute bounding box.
		if (this.bbox_dirty) this.Compute_BoundingBox();
		if (_pInst.bbox_dirty) _pInst.Compute_BoundingBox();


		// easy cases first
		var bbox1 = _pInst.bbox;
		var bbox2 = this.bbox;
		if (bbox1.left          >= (bbox2.right + 1))   return false;
		if ((bbox1.right + 1)   <= bbox2.left)          return false;
		if (bbox1.top           >= (bbox2.bottom + 1))  return false;
		if ((bbox1.bottom + 1)  <= bbox2.top)           return false;

		if (!_prec || (!this.precise && !_pInst.precise)) return true;


		// dealing with precise collision checking
		var pSpr1 = null;
		var pSpr2 = null;
		if (this.mask_index < 0)
		{
			pSpr1 = g_pSpriteManager.Get(this.sprite_index);
		} 
		else
		{
			pSpr1 = g_pSpriteManager.Get(this.mask_index);
		}
		if ((pSpr1 == null) || (pSpr1.numb == 0)) return false;


		if (_pInst.mask_index < 0)
		{
			pSpr2 = g_pSpriteManager.Get(_pInst.sprite_index);
		} 
		else
		{
			pSpr2 = g_pSpriteManager.Get(_pInst.mask_index);
		}
		if ((pSpr2 == null) || (pSpr2.numb == 0)) return false;


        // NB: (x | 0) is equivalent to (int)n
		return pSpr1.PreciseCollision(this.image_index | 0, this.bbox, Round(this.x), Round(this.y), 
		                              this.image_xscale, this.image_yscale,
									  this.image_angle,
									  pSpr2,
									  _pInst.image_index | 0, _pInst.bbox, Round(_pInst.x), Round(_pInst.y),
									  _pInst.image_xscale, _pInst.image_yscale,
									  _pInst.image_angle);
	}
	return false;
};





// #############################################################################################
/// Function:<summary>
///          	Assigns a path to the instance to follow
///          </summary>
///
/// In:		<param name="_ind"></param>
///			<param name="_speed"></param>
///			<param name="_scale"></param>
///			<param name="_orient"></param>
///			<param name="_absolute"></param>
///			<param name="_endact"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
yyInstance.prototype.Assign_Path = function (_ind, _speed, _scale, _orient, _absolute, _endact) {
	// First validate the path exists, and assign the index.
	this.path_index = -1;
	if (_ind < 0) return;
	var pPath = g_pPathManager.Paths[_ind]; 	// dont test _ind, as it will simply read "null/undefined" here.
	if (!pPath) return;
	if (pPath.length <= 0) return;
	if (_scale < 0) return;
	this.path_index = _ind;


	this.path_speed = _speed;
	if (this.path_speed >= 0)
	{
		this.path_position = 0;
	} else
	{
		this.path_position = 1;
	}


	this.path_positionprevious = this.path_position;
	this.path_scale = _scale;


	this.path_orientation = _orient;
	this.path_end = _endact;
	if (_absolute)
	{
		if (this.path_speed >= 0)
		{
			this.SetPosition(pPath.XPosition(0), pPath.YPosition(0));
		}
		else
		{
			this.SetPosition(pPath.XPosition(1), pPath.YPosition(1));
		}
	}


	this.path_xstart = this.x;
	this.path_ystart = this.y;
};


// #############################################################################################
/// Function:<summary>
///				Adapts the position due to the current path .
///          </summary>
///
/// Out:	 <returns>
///				Returns whether the } of the path was reached
///			 </returns>
// #############################################################################################
yyInstance.prototype.Adapt_Path = function () {
    var sp, xx, yy;


    // check whether the path exists
    if (this.path_index < 0) return false;
    if (this.path_speed == 0) return false;

    var pPath = g_pPathManager.Paths[this.path_index];
    if (!pPath) return;
    if (pPath.length <= 0) return;

    var atPathEnd = false;

    // get the new path position
    var orient = this.path_orientation * Math.PI / 180.0;

    var pNode = pPath.GetPosition(this.path_position);
    xx = pNode.x;
    yy = pNode.y;
    sp = pNode.speed;
    pNode = null;

    sp = sp / (100 * this.path_scale);
    this.path_position = this.path_position + this.path_speed * sp / pPath.length;

    // handle end actions if required
    var pNode0 = pPath.GetPosition(0);
    if ((this.path_position >= 1) || (this.path_position <= 0)) 
    {
        atPathEnd = true;    // generate an event
        switch (this.path_end) {

            // stop moving  
            case 0:
                {
                    this.path_position = 1;
                    this.path_index = -1;
                    break;
                }

                // continue from start position
            case 1:
                {
                    if (this.path_position < 0) {
                        this.path_position++;
                    }
                    else {
                        this.path_position--;
                    }
                    break;
                }

                // continue from current position
            case 2:
                {
                    var pNode1 = pPath.GetPosition(1);
                    xx = pNode1.x - pNode0.x;
                    yy = pNode1.y - pNode0.y;
                    var xdif = this.path_scale * (xx * Math.cos(orient) + yy * Math.sin(orient));
                    var ydif = this.path_scale * (yy * Math.cos(orient) - xx * Math.sin(orient));

                    if (this.path_position < 0) {
                        this.path_xstart = this.path_xstart - xdif;
                        this.path_ystart = this.path_ystart - ydif;
                        this.path_position++;
                    }
                    else {
                        this.path_xstart = this.path_xstart + xdif;
                        this.path_ystart = this.path_ystart + ydif;
                        this.path_position--;
                    }
                    break;
                }

                // reverse
            case 3:
                {
                    if (this.path_position < 0) {
                        this.path_position = -this.path_position;
                        this.path_speed = Math.abs(this.path_speed);
                    }
                    else {
                        this.path_position = 2 - this.path_position;
                        this.path_speed = -Math.abs(this.path_speed);
                    }
                    break;
                }

                // stop moving
            default:
                {
                    this.path_position = 1;
                    this.path_index = -1;
                }

        }
    }


    // find the new position in the room
    pNode = pPath.GetPosition(this.path_position);
    xx = pNode.x - pNode0.x;           // relative
    yy = pNode.y - pNode0.y;

    var newx = this.path_xstart + this.path_scale * (xx * Math.cos(orient) + yy * Math.sin(orient));
    var newy = this.path_ystart + this.path_scale * (yy * Math.cos(orient) - xx * Math.sin(orient));

    // trick to set the direction
    this.sethspeed(newx - this.x);
    this.setvspeed(newy - this.y);

    // normal speed should not be used
    this.setspeed(0);

    // Set the new position
    this.SetPosition(newx, newy);

    return atPathEnd;
};



// #############################################################################################
/// Function:<summary>
///             get the alarm timer for the given index
///          </summary>
// #############################################################################################
yyInstance.prototype.get_timer = function (_index) {
	var Result = -1;
    if ((_index >= 0) && (_index < MAXTIMER))
    {         		
	    Result = array_get_1D(this, "__alarm__", _index) ;
    }
    return Result;
};



// #############################################################################################
/// Function:<summary>
///             get the alarm timer for the given index
///          </summary>
// #############################################################################################
yyInstance.prototype.set_timer = function (_index, _val) {
	if ((_index>=0) && (_index<MAXTIMER))
	{ 
	    array_set_1D(this, "__alarm__", _index, _val);
    }
};


// #############################################################################################
/// Function:<summary>
///             get the alarm timer for the given index
///          </summary>
// #############################################################################################
yyInstance.prototype.get_bbox = function () {
    if (this.bbox_dirty) {
        this.Compute_BoundingBox();
    }
    return this.bbox;
};


// #############################################################################################
/// Function:<summary>
///             Wrap the instance against the room width/height if moving
///          </summary>
// #############################################################################################
yyInstance.prototype.wrap = function(_hor, _vert)
{
    var w, h;
    
    // find the sprite size
    if (!sprite_exists(this.sprite_index))
    {
        w = h =0;
	}
    else
    {
        var pSpr = g_pSpriteManager.Get(this.sprite_index);
        w = pSpr.width * this.image_xscale;
        h = pSpr.height * this.image_yscale;
    }
    
    // do horizontal wrap
    if (_hor)
    {
        if ((this.hspeed < 0) && (this.x < 0)) {
            this.SetPosition(this.x + g_RunRoom.GetWidth() + w, this.y);
        }
        if ((this.hspeed > 0) && (this.x >= g_RunRoom.GetWidth())) {
            this.SetPosition(this.x - g_RunRoom.GetWidth() - w, this.y);
        }
    }
    // do vertical wrap
    if (_vert)
    {
        if ((this.vspeed < 0) && (this.y < 0)) {
            this.SetPosition(this.x, this.y + g_RunRoom.GetHeight() + h);
        }
        if ((this.vspeed > 0) && (this.y >= g_RunRoom.GetHeight())) {
            this.SetPosition(this.x, this.y - g_RunRoom.GetHeight() - h);
        }
    }
};








// #############################################################################################
/// Function:<summary>
///             Holds and manages all instances
///          </summary>
// #############################################################################################
function yyInstanceManager() 
{
	this.m_Instances = new yyList();
	this.m_Instances.packing = true;
	this.m_ID2Instance = [];
}



// #############################################################################################
/// Function:<summary>
///          	Get the array of instances
///          </summary>
///
/// Out:	<returns>
///				The instance array
///			</returns>
// #############################################################################################
yyInstanceManager.prototype.GetPool = function () {
	return this.m_Instances.pool;
};


// #############################################################################################
/// Function:<summary>
///             Holds and manages all instances
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.Add = function (pInst) {
	this.m_ID2Instance[pInst.id] = pInst;
	this.m_Instances.Add(pInst);
};


// #############################################################################################
/// Function:<summary>
///          	Using the ID, lookup an instance. 
///             Instance ONLY, not object.
///          </summary>
///
/// In:		<param name="_id">Instance ID</param>
/// Out:	<returns>
///				The instance or null
///			</returns>
// #############################################################################################
yyInstanceManager.prototype.IDLookup = function (_id) {
	return this.m_ID2Instance[_id];
};

// #############################################################################################
/// Function:<summary>
///             Get an instance using its ID
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.Get = function (_id) {
	//var pInst = this.m_ID2Instance["i"+_id];
	var pInst = this.m_ID2Instance[_id];
	if (pInst != null) return pInst;

	var pObj = g_pObjectManager.Get(_id);
	if (pObj != null)
	{
		pInst = pObj.Instances_Recursive.pool[0];
		if (pInst != null) return pInst;
	}

	return null;
};

// #############################################################################################
/// Function:<summary>
///             Holds and manages all instances
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.Remove = function (_pInst) {
	this.m_Instances.DeleteItem(_pInst);
	var id = _pInst.id;
	this.m_ID2Instance[id] = null;               // just nuke the variable, don't "delete" it.

	/*for(var index in m_ID2Instance)
	{
	if( m_ID2Instance[index] === _pInst ){
	m_ID2Instance.splice( index,1 );
	return;
	}
	}*/
	//m_ID2Instance.splice( _pInst.id,1 );
	//m_ID2Instance[pInst.id] = null;
};



// #############################################################################################
/// Function:<summary>
///             Copy the current positions, into the LAST positions - for ALL instances.
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.RememberOldPositions = function () {
	var pool = this.m_Instances.pool;
	for (var index = 0; index < pool.length; index++)
	{
		var pInst = pool[index];
		pInst.xprevious = pInst.x;
		pInst.yprevious = pInst.y;
		pInst.path_positionprevious = pInst.path_position;
	}
};



// #############################################################################################
/// Function:<summary>
///             Copy the current positions, into the LAST positions - for ALL instances.
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.UpdatePositions = function () {
	var pool = this.m_Instances.pool;
	for (var index = 0; index < pool.length; index++)
	{
		var pInst = pool[index];

		pInst.AdaptSpeed();
		if (pInst.Adapt_Path())
		{
			pInst.PerformEvent(EVENT_OTHER_ENDOFPATH, 0, pInst, pInst);
		}
		pInst.x += pInst.hspeed;
		pInst.y += pInst.vspeed;
		pInst.bbox_dirty = true;
	}
};


// #############################################################################################
/// Function:<summary>
///             Copy the current positions, into the LAST positions - for ALL instances.
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.UpdateImages = function () {
	var pool = this.m_Instances.pool;
	for (var index = 0; index < pool.length; index++)
	{
		var pInst = pool[index];
		pInst.image_index += pInst.image_speed;

		var num = pInst.GetImageNumber();
		if (pInst.image_index >= num)
		{
			pInst.image_index -= num;

			// if this instance acts on this event, then process it....
			var pObject = pInst.pObject;
			if (pObject.REvent[EVENT_OTHER_ANIMATIONEND])
			{
				pInst.PerformEvent(EVENT_OTHER_ANIMATIONEND, 0, pInst, pInst);
			}
		}
	}
};



// #############################################################################################
/// Function:<summary>
///             Perform a specific event for ALL active instances
///          </summary>
// #############################################################################################
yyInstanceManager.prototype.PerformEvent = function (_event, _index) {

	var done = true;
	if (g_RunRoom)
	{
		var evnt = _event;
		if (evnt != EVENT_COLLISION) evnt |= _index;

		var pool = g_RunRoom.m_Active.pool;
		for (var index = 0; index < pool.length;index++ )
		{
			var pInst = pool[index];
			if (!pInst.marked)
			{
			    var pObject = pInst.pObject;

			    // if this instance acts on this event, then process it....
			    if (pObject.REvent[evnt])
			    {
			    	done = pInst.PerformEvent(_event, _index, pInst, pInst);
			    }
			}
		}
	}
	return done;
};

// #############################################################################################
/// Function:<summary>
///          	GML access to instance manager.
///          </summary>
///
/// In:		<param name="_id">ID of instance or object</param>
/// Out:	<returns>
///				the first instance of an object, or instance pointed to by the id
///			</returns>
// #############################################################################################
var yyInst = yyInst_RELEASE;
function yyInst_RELEASE(_inst, _other, _id) {
	if (_id instanceof YYRef) {
		_id = yyGetInt32(_id);
	} else {
		if (typeof _id === "object" || typeof _id === "function" ) return _id;
	}
    if (_id == -1) return _inst;
    if (_id == -2) return _other;
    if (_id == -3) return _inst;
    var pInst = g_pInstanceManager.Get(_id);
	if( !pInst ) {
	    pInst = g_pObjectManager.Get(_id);
	    if( pInst ) pInst = pInst.Instances.Get(0);
    }
	return pInst;
}

function yyInst_DEBUG(_inst, _other, _id) {
	if (_id instanceof YYRef) {
		_id = yyGetInt32(_id);
	} else {
		if (typeof _id === "object" || typeof _id === "function" ) return _id;
	}
    if (_id == -1) return _inst;
    if (_id == -2) return _other;
    if (_id == -3) return _inst;
    var pInst = g_pInstanceManager.Get(_id);
	if( !pInst ) {

	    pInst = g_pObjectManager.Get(_id);
	    if( !pInst ) {
	        ErrorOnce("Unknown instance ID: "+_id);
	        debug(stacktrace());
	        return undefined;
	    }
	    pInst = pInst.Instances.Get(0);
    }
	return pInst;
}
