
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Instance.js
// Created:			31/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 31/05/2011		
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///          	Returns the id of the (n+1)'th instance of type obj. obj can be an object or 
///             the keyword all. If it does not exist, the special object noone is returned. 
///             Note that the assignment of the instances to the instance id's changes every 
///             step so you cannot use values from previous steps.
///          </summary>
///
/// In:		<param name="_obj"></param>
///			<param name="_n"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_find(_obj,_n) 
{
    var pInstArray = GetWithArray(_obj);
    if( pInstArray==null ) return OBJECT_NOONE;
    if( _n>=pInstArray.length ) return OBJECT_NOONE;
      
    return pInstArray[_n].id;
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether an instance of type obj exists. obj can be an object, an 
///             instance id, or the keyword all.
///          </summary>
///
/// In:		<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_exists(_obj) 
{
    var pObj = GetWithArray(_obj);
    if (pObj!=null && pObj.length>0 ) return true;
    return false;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the number of instances of type obj. obj can be an object or the keyword all.
///          </summary>
///
/// In:		<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_number(_obj) 
{
    var pInstArray = GetWithArray(_obj);
    if( pInstArray==null ) return 0;
    
    var count = 0;
    for(var i=0;i<pInstArray.length;i++){
        if( !pInstArray[i].marked )  count++;
    }
    
	return count;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the id of the instance of type obj at position (x,y). When multiple 
///             instances are at that position the first is returned. obj can be an object or 
///             the keyword all. If it does not exist, the special object noone is returned.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_position(_x,_y,_obj) 
{
    return Instance_SearchLoop( null, Math.floor(_obj), false,OBJECT_NOONE,    _x,_y,  
        function(_pInstance)
        {
            if( _pInstance.Collision_Point(_x,_y,true) ) return _pInstance.id; else return 0;
        }
    );
}

// #############################################################################################
/// Function:<summary>
///          	Returns the id of the instance of type obj nearest to (x,y). obj can be an 
///             object or the keyword all.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_nearest(_inst,_x,_y,_obj) 
{
    var dist = 10000000000;
    var i = 0;
    var object_id = Instance_SearchLoop( null, Math.floor(_obj), false,OBJECT_NOONE,    _x,_y,  
        function(_pInstance)
        {
            var xx = _x-_pInstance.x;
            var yy = _y-_pInstance.y;
                
            var d = Math.sqrt(xx*xx + yy*yy);
            if( d<dist){
                i = _pInstance.id;
                dist = d;
            }
        }
    );
	return i;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the id of the instance of type obj furthest away from (x,y). 
///             obj can be an object or the keyword all.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_furthest( _inst, _x,_y,_obj ) 
{
    var dist = -10000000000;
    var i = 0;
    var object_id = Instance_SearchLoop( null, Math.floor(_obj), false,OBJECT_NOONE,    _x,_y,  
        function(_pInstance)
        {
            var xx = _x-_pInstance.x;
            var yy = _y-_pInstance.y;
                
            var d = Math.sqrt(xx*xx + yy*yy);
            if( d>dist){
                i = _pInstance.id;
                dist = d;
            }
        }
    );
	return i;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the id of the instance of type obj met when the current instance is 
///             placed at position (x,y). obj can be an object or the keyword all. 
///             If it does not exist, the special object noone is returned.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_place( _pInst, _x,_y,_obj) 
{
    with(_pInst)
    {
        var xx = _pInst.x;
        var yy = _pInst.y;
        _pInst.SetPosition(_x,_y);
        
        var id = Instance_SearchLoop( null, Math.floor(_obj), false, OBJECT_NOONE,   _x,_y,  
            function(_pInstance)
            {
                if (_pInstance.Collision_Instance(_pInst, true)) {
                    return _pInstance.id; 
                }
                else { 
                    return 0;
                }
            }
        );
        _pInst.SetPosition(xx,yy);
        return id;
        
    }
}



// #############################################################################################
/// Function:<summary>
///             Creates an instance of obj at position (x,y). The function returns the id of the new instance.
///          </summary>
///
/// In:		 <param name="Result"></param>
///			 <param name="selfinst"></param>
///			 <param name="otherinst"></param>
///			 <param name="argc"></param>
///			 <param name="arg"></param>
/// Out:	 <returns>
///				The ID of the instance
///			 </returns>
// #############################################################################################
function  instance_create( _x, _y, _obj )
{
    var pInst = g_RunRoom.GML_AddInstance(_x,_y,_obj );
	pInst.PerformEvent(EVENT_CREATE, 0, pInst, pInst );
	return pInst.id;
}


// #############################################################################################
/// Function:<summary>
///             Destroy an instance - or rather, mark for deletion later...
///          </summary>
///
/// In:     <param name="_pInst">"this"</param>
///         <param name="_pOther">"other"</param>
///				
// #############################################################################################
function    instance_destroy( _pInst )
{
    _pInst.PerformEvent( EVENT_DESTROY,0, _pInst, _pInst );
    _pInst.marked = true;
}



// #############################################################################################
/// Function:<summary>
///          	Destroys all instances whose sprite contains position (x,y).
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function position_destroy(_inst, _x, _y) 
{
	var i;
	var bottom, top;
	var keep = [];
	var pActiveList = g_RunRoom.m_Active;

	for (i in pActiveList.pool)
	{
		var pInst = pActiveList.pool[i];
		if (pInst.bbox_dirty) pInst.Compute_BoundingBox();

		var bbox = pInst.bbox;
		if( !((_x > bbox.right) || (_x < bbox.left) || (_y > bbox.bottom) || (_y < bbox.top)) )
		{
			keep[keep.length] = pInst;
		}
	}


	// Now run through the list and delete them.
	var pActiveList = g_RunRoom.m_Active;
	for (i = 0; i < keep.length; i++)
	{
		instance_destroy(keep[i]);
	}
}

// #############################################################################################
/// Function:<summary>
///          	Changes all instances at (x,y) into obj. perf indicates whether to perform 
///             the destroy and creation events.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
///			<param name="_perf"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function position_change(_x, _y, _objindex, _perf) 
{
	var i;
	var bottom, top;
	var keep = [];
	var pActiveList = g_RunRoom.m_Active;

	for (i in pActiveList.pool)
	{
		var pInst = pActiveList.pool[i];
		if (pInst.bbox_dirty) pInst.Compute_BoundingBox();

		var bbox = pInst.bbox;
		if (!((_x > bbox.right) || (_x < bbox.left) || (_y > bbox.bottom) || (_y < bbox.top)))
		{
			keep[keep.length] = pInst;
		}
	}


	// Now run through the list and delete them.
	var pActiveList = g_RunRoom.m_Active;
	for (i = 0; i < keep.length; i++)
	{
		instance_change(keep[i], _objindex, _perf) 
	} 
}


// #############################################################################################
/// Function:<summary>
///          	Sets the motion with the given speed in direction dir.
///          </summary>
///
/// In:		<param name="_dir"></param>
///			<param name="_speed"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function motion_set(_inst, _dir,_speed) 
{
  _inst.setdirection ( _dir );
  _inst.setspeed ( _speed );
}

// #############################################################################################
/// Function:<summary>
///          	Adds the motion to the current motion (as a vector addition).
///          </summary>
///
/// In:		<param name="_dir"></param>
///			<param name="_speed"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function motion_add(_inst, _dir, _speed) 
{
	_inst.AddTo_Speed(_dir, _speed);
}



// #############################################################################################
/// Function:<summary>
///          	Creates a copy of the current instance. The argument indicates whether the 
///             creation event must be executed for the copy. The function returns the id of 
///             the new copy.
///          </summary>
///
/// In:		<param name="_performevent"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function instance_copy(_inst, _performevent) 
{
	var pNewInst = new yyInstance(0, 0, g_room_maxid++, _inst.object_index, true);
	pNewInst.Assign( _inst );

    var pInst = g_RunRoom.AddInstanceToRoom( pNewInst );
	if( _performevent ){
	    pNewInst.PerformEvent(EVENT_CREATE, 0, pNewInst, pNewInst );
	}
	return pNewInst.id;
}


// #############################################################################################
/// Function:<summary>
///          	Changes the instance into obj. perf indicates whether to perform the 
///             destroy and creation events.
///          </summary>
///
/// In:		<param name="_inst">Instance to effect</param>
///    		<param name="_objindex">Object to change into</param>
///			<param name="_perf">Perform destroy and create events?</param>
///				
// #############################################################################################
function instance_change(_inst, _objindex, _perf) 
{
	if( _perf ) _inst.PerformEvent(EVENT_DESTROY, 0, _inst, _inst );	
	var active = g_RunRoom.m_Active.Delete(_inst);						// remove from ordered list

	_inst.SetObjectIndex(_objindex, true);

	_inst.sprite_index = _inst.pObject.SpriteIndex;
	var pSprite = g_pSpriteManager.Get(_inst.sprite_index);
	if (pSprite)
	{
		_inst.bbox.left = pSprite.bbox.left;
		_inst.bbox.right = pSprite.bbox.right;
		_inst.bbox.top = pSprite.bbox.top;
		_inst.bbox.bottom = pSprite.bbox.bottom;
	}


	if (active) g_RunRoom.m_Active.Add(_inst);							// now add back at the correct depth
	if( _perf ) _inst.PerformEvent(EVENT_CREATE, 0, _inst, _inst );    
}


// #############################################################################################
/// Function:<summary>
///          	Deactivates all instances in the room. If notme is true the calling instance 
///				is not deactivated (which is normally what you want).
///          </summary>
///
/// In:		<param name="_inst">"this" instance</param>
///			<param name="_notme">TRUE if you don't want THIS instance to be deactivated as well</param>
///				
// #############################################################################################
function instance_deactivate_all(_inst, _notme) {

	var list = [];
	list = g_RunRoom.m_Active.pool; 			// Copy the whole array.
	g_RunRoom.m_Active.Clear();


	var pDeactiveList = g_RunRoom.m_Deactive;
	for (var i = 0; i < list.length; i++)
	{
		if (list[i] == _inst)
		{
			if (_notme == false)
			{
				pDeactiveList.Add(list[i]);			// if we want to deactive "me" then do so...
			} else
			{
				g_RunRoom.m_Active.Add(list[i]);	// if not, stick it back in the active list.
			}
		} else
		{
			pDeactiveList.Add(list[i]);				// deactive everything else.
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Activates all instances in the room.
///          </summary>
///
/// In:		<param name="_inst">"this" instance</param>
// #############################################################################################
function instance_activate_all(_inst) {

	var list = [];
	list = g_RunRoom.m_Deactive.pool; 			// Copy the whole array.
	g_RunRoom.m_Deactive.Clear();


	var pActiveList = g_RunRoom.m_Active;
	for (var i = 0; i < list.length; i++)
	{
		pActiveList.Add(list[i]); 					// Active everything!
	}
}


// #############################################################################################
/// Function:<summary>
///          	Activate all instances of a cetrtain object type in the room.
///          </summary>
///
/// In:		<param name="_inst">"this" instance</param>
///    		<param name="_objindex">"this" instance</param>
// #############################################################################################
function instance_activate_object(_inst, _objindex) 
{
	var i;
	var keep = [];
	var pDeactiveList = g_RunRoom.m_Deactive;
	for (i in pDeactiveList.pool)
	{
		var pInst = pDeactiveList.pool[i];
		if (pInst.object_index == _objindex)
		{
			keep[keep.length] = pInst;
		}
	}

	var pActiveList = g_RunRoom.m_Active;
	for (i = 0; i < keep.length; i++)
	{
		pDeactiveList.DeleteIndex(keep[i]); 					// Deactivate instance
		pActiveList.Add(keep[i]); 						// move it into active list
	}
}


// #############################################################################################
/// Function:<summary>
///          	Deactivate all instances of a cetrtain object type in the room.
///          </summary>
///
/// In:		<param name="_inst">"this" instance</param>
///    		<param name="_objindex">"this" instance</param>
// #############################################################################################
function instance_deactivate_object(_inst, _objindex) 
{
	var i;
	var keep = [];
	var pActiveList = g_RunRoom.m_Active;
	for (i in pActiveList.pool)
	{
		var pInst = pActiveList.pool[i];
		if (pInst.object_index == _objindex)
		{
			keep[keep.length] = pInst;
		}
	}


	var pDeactiveList = g_RunRoom.m_Deactive;
	for (i = 0; i < keep.length; i++)
	{
		pActiveList.Delete(keep[i]); 					// Deactivate instance
		pDeactiveList.Add(keep[i]); 						// move it into active list
	}
}


// #############################################################################################
/// Function:<summary>
///          	Deactivates all instances in the indicated region (that is, those whose bounding 
///				box lies partially inside the region). If inside is false the instances completely 
///				outside the region are deactivated. If notme is true the calling instance is not 
///				deactivated (which is normally what you want).
///          </summary>
///
/// In:		 <param name="_inst"></param>
///			 <param name="_left"></param>
///			 <param name="_top"></param>
///			 <param name="_width"></param>
///			 <param name="_height"></param>
///			 <param name="_wantinside">true if you want the ones INSIDE to deactivate</param>
///			 <param name="_notme"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function instance_deactivate_region(_inst, _left,_top,_width,_height,_wantinside,_notme) 
{
	var i;
	var bottom, top;
	var keep = [];
	var pActiveList = g_RunRoom.m_Active;


	right = _left + _width - 1;
	bottom = _top + _height - 1;
	for (i in pActiveList.pool)
	{
	    var outside = false;
		var pInst = pActiveList.pool[i];
		if (pInst.bbox_dirty) pInst.Compute_BoundingBox();
		
		var bbox = pInst.bbox;
		if( (pInst.sprite_index!=0)  || (pInst.mask_index!=0) ){
		    if( (_left > bbox.right) || (right < bbox.left)  || (_top > bbox.bottom ) || (bottom < bbox.top) ){
		        outside=true;
		    }
		}else{
		    if ((pInst.x > right) || (pInst.x < _left) || (pInst.y > bottom) || (pInst.y < _top))
		    {
		      		outside = true;
		    }
		}
		
		if ( outside != _wantinside ) keep[keep.length] = pInst;		
	}



	var pDeactiveList = g_RunRoom.m_Deactive;
	for (i = 0; i < keep.length; i++)
	{
	    if( _inst==keep[i] ){
            if( !_notme){
		        pActiveList.Delete(keep[i]); 					    // Deactivate instance
		        pDeactiveList.Add(keep[i]); 						// move it into active list
            }
	    }else{
		    pActiveList.Delete(keep[i]); 					    // Deactivate instance
		    pDeactiveList.Add(keep[i]); 						// move it into active list
        }
	}
}




// #############################################################################################
/// Function:<summary>
///          	Activates all instances in the indicated region. If inside is false the instances 
///             completely outside the region are activated.
///          </summary>
///
/// In:		 <param name="_inst"></param>
///			 <param name="_left"></param>
///			 <param name="_top"></param>
///			 <param name="_width"></param>
///			 <param name="_height"></param>
///			 <param name="_wantinside">true if you want the ones INSIDE to deactivate</param>
///			 <param name="_notme"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function instance_activate_region(_inst, _left,_top,_width,_height,_wantinside) 
{
	var i;
	var bottom, top;
	var keep = [];
	var pDeactiveList = g_RunRoom.m_Deactive;


	right = _left + _width - 1;
	bottom = _top + _height - 1;
	for (i in pDeactiveList.pool)
	{
	    var outside = false;
		var pInst = pDeactiveList.pool[i];
		if (pInst.bbox_dirty) pInst.Compute_BoundingBox();
		
		var bbox = pInst.bbox;
		if( (pInst.sprite_index!=0)  || (pInst.mask_index!=0) ){
		    if( (_left > bbox.right) || (right < bbox.left)  || (_top > bbox.bottom ) || (bottom < bbox.top) ){
		        outside=true;
		    }
		}else{
		    if( (pInst.x > right) || (pInst.x < _left)  || (pInst.y > bottom ) || (pInst.y< _top) ){
		        outside=true;
		    }
		}
		
		if ( outside != _wantinside ) keep[keep.length] = pInst;		
	}



	var pActiveList = g_RunRoom.m_Active;
	for (i = 0; i < keep.length; i++)
	{
	    if( _inst==keep[i] ){
            if( !_notme){
		        pDeactiveList.DeleteIndex(keep[i]); 					    // Deactivate instance
		        pActiveList.Add(keep[i]); 						// move it into active list
            }
	    }else{
	        pDeactiveList.DeleteIndex(keep[i]); 					    // Deactivate instance
	        pActiveList.Add(keep[i]); 						// move it into active list
        }
	}
}

