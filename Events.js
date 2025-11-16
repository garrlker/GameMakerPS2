// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Events.js
// Created:			02/06/2011
// Author:			Mike
// Project:			HTML5
// Description:		General event handling code.
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// ??/??/2011		V1.0        MJD     1st version
// 02/06/2011		V1.1        MJD     Added collision events.
// 
// **********************************************************************************************************************

// #############################################################################################
/// Function:<summary>
///             Handles 'other' 'outside' and 'boundary' events
///          </summary>
// #############################################################################################
function    HandleOther()
{

	var pool = g_RunRoom.m_Active.pool;
	for (var instIndex = 0; instIndex < pool.length; instIndex++)
	{
		var inst = pool[instIndex];
		var pObject = inst.pObject;

        if (!inst.marked)
        {
            // Outside events
            if (pObject.REvent[EVENT_OTHER_OUTSIDE])
            {
                if (sprite_exists(inst.sprite_index) || sprite_exists(inst.mask_index))
                {                            
                    var bbox = inst.get_bbox();
                    if ((bbox.right < 0) || (bbox.left > g_RunRoom.GetWidth()) || (bbox.bottom < 0) || (bbox.top > g_RunRoom.GetHeight()))
                    {
                        inst.PerformEvent(EVENT_OTHER_OUTSIDE, EVENT_OTHER, inst, inst);
                    }
                }
                else 
                {
                    if ((inst.x < 0) || (inst.x > g_RunRoom.GetWidth()) || (inst.y < 0) || (inst.y > g_RunRoom.GetHeight()))
                    {
                        inst.PerformEvent(EVENT_OTHER_OUTSIDE, EVENT_OTHER, inst, inst);
                    }
                }
            }
                    
            // Boundary events
            if (pObject.REvent[EVENT_OTHER_BOUNDARY])
            {
                if (sprite_exists(inst.sprite_index) || sprite_exists(inst.mask_index))
                {
                    var bbox = inst.get_bbox();
                    if ((bbox.left < 0) || (bbox.right > g_RunRoom.GetWidth()) || (bbox.top < 0) || (bbox.bottom > g_RunRoom.GetHeight()))
                    {
                        inst.PerformEvent(EVENT_OTHER_BOUNDARY, EVENT_OTHER, inst, inst);
                    }
                }
                else
                {
                    if ((inst.x < 0) || (inst.x > g_RunRoom.GetWidth()) || (inst.y < 0) || (inst.y > g_RunRoom.GetHeight()))
                    {
                        inst.PerformEvent(EVENT_OTHER_BOUNDARY, EVENT_OTHER, inst, inst);
                    }
                }
            }
                    
            // TODO: Outside view events                    
            // TODO: Boundary view events
        }
    }
}


// #############################################################################################
/// Function:<summary>
///             Handles collision events
///          </summary>
// #############################################################################################
function    HandleCollision()
{
    // id1 and id2 are the OBJECT IDs to collide with
    for( var id1 in g_pCollisionList )
    {
        // get the 1st object, and its recursive instance pool
        var pObject1 = g_pObjectManager.Get(id1);        
        var pObj1Pool = pObject1.GetRPool();
        
        // Must "foreach" over the list of things needing to collide with
        for (var inst1 = 0; inst1 < pObj1Pool.length; inst1++)
        {
        	var pInst1 = pObj1Pool[inst1];
        	if (!pInst1.marked)
        	{
        		// Now get the 2nd object ID we're colliding to.  (must "foreach" over these as well)
        		var pCollArray = g_pCollisionList[id1];
        		for (var coll2 in pCollArray)
        		{
        			var id2 = pCollArray[coll2];        // get id2.

        			// Now get the 2nd object we're going to collide with.
        			var pObject2 = g_pObjectManager.Get(id2);        		        			

        			// Now loop through all recursive INSTANCES of this object and test to the primary one.
        			var pObj2Pool = pObject2.GetRPool();        			
        			for (var inst2 = 0; inst2 < pObj2Pool.length; inst2++)
        			{
        				var pInst2 = pObj2Pool[inst2];
        				
        				if (!pInst2.marked)
        				{
        					// Do they collide?       
        					if (pInst1.Collision_Instance(pInst2, true))
        					{        					            					
        						if ((pInst1.solid) || (pInst2.solid))
        						{
        							pInst1.x = pInst1.xprevious;
        							pInst1.y = pInst1.yprevious;
        							pInst1.path_position = pInst1.path_positionprevious;

        							pInst2.x = pInst2.xprevious;
        							pInst2.y = pInst2.yprevious;
        							pInst2.path_position = pInst2.path_positionprevious;
        						}


        						pInst1.other = pInst2.id;
        						pInst2.other = pInst1.id;        						
        						pObject1.PerformEvent(EVENT_COLLISION, id2, pInst1, pInst2);
                                PerformInstanceCollisionRecursive(pInst1, pInst2);
        						//pObject2.PerformEvent(EVENT_COLLISION, id1, pInst2, pInst1);

        						if ((pInst1.solid) || (pInst2.solid))
        						{
        							pInst1.Adapt_Path();         // We do not call the end-of-path event again
        							pInst2.Adapt_Path();
        							pInst1.SetPosition(pInst1.x + pInst1.hspeed, pInst1.y + pInst1.vspeed);
        							pInst2.SetPosition(pInst2.x + pInst2.hspeed, pInst2.y + pInst2.vspeed);


        							// If collision is not resolved then set to previous position
        							if (pInst1.Collision_Instance(pInst2, true) == true)
        							{
        								pInst1.x = pInst1.xprevious;
        								pInst1.y = pInst1.yprevious;
        								pInst1.path_position = pInst1.path_positionprevious;

        								pInst2.x = pInst2.xprevious;
        								pInst2.y = pInst2.yprevious;
        								pInst2.path_position = pInst2.path_positionprevious;
        							}
        						}
        					}
        				}
        			}
        		}
        	}
        }
    }  
}              

// #############################################################################################
/// Function:<summary>
///             For the second instance in a collision we need to use the its actual type
///             and recurse up the first instance's inheritance hierarchy until we find a way
///             to handle the collision for the second instance, if at all possible.
///             In the VC_Runner the collision pairs only use instances at their actual type
///             level, thus this situation is handled implicitly.
///             We do not need to do something similar for the first instance in a collision due
///             to the manner in which g_pCollisionList is built up.
///          </summary>
// #############################################################################################
function PerformInstanceCollisionRecursive(pInst1, pInst2)
{
    var pObj1 = pInst1.pObject;
    var pObj2 = pInst2.pObject;
    while (pObj1) 
    {                                
        if (pObj2.Collisions[pObj1.ID]) 
        {
            pObj2.PerformEvent(EVENT_COLLISION, pObj1.ID, pInst2, pInst1);
            break;
        }
        pObj1 = pObj1.pParent;
    }
}


// #############################################################################################
/// Function:<summary>
///             Given a point, do a collision test with each instance that has the desired
///             event. (mouse click etc).
///          </summary>
///
/// In:		 <param name="_event">Primary event</param>
///    		 <param name="_sub_event">Secondary event</param>
///			 <param name="x">X Point to test with</param>
///			 <param name="y">Y Point to test with</param>
///				
// #############################################################################################
function    DoPointToInstance( _event, _sub_event, _x,_y )
{
    // First scale the coordinate into the current screen scale.
    //_x = _x * scale;

    // Might be better to loop through objects, rather than active instances... less getSprite stuff...
    for(i=g_RunRoom.m_Active.length-1;i>=0;i-- )
    {
        var pInst = g_RunRoom.m_Active.Get(i);
        with( pInst )
        {
        	if (bbox_dirty) Compute_BoundingBox();
            if( !marked && pObject.REvent[_event|_sub_event] )
            {
                var pSprite = g_pSpriteManager.Get( pInst.sprite_index );
                var ox = pSprite.xOrigin;
                var oy = pSprite.yOrigin;
                if( ( _x>=bbox.left) && (_x<bbox.right) && (_y>=bbox.top) && (_y<bbox.bottom) )
                {
                	pInst.PerformEvent(_event, _sub_event, pInst, pInst);        // timer enum starts at 1..
                }
            }
        }
    }
}



// #############################################################################################
/// Function:<summary>
///				Handles mouse events
///          </summary>
// #############################################################################################
function HandleMouse() 
{
    if (g_RunRoom)
    {
    	var pViews;

		// Get the default view, or the standard view array
		if(!g_RunRoom.m_enableviews){
    		pViews = g_DefaultViewArray;
    	} else{
    		pViews = g_RunRoom.m_Views;
    	}
    	
		// Now loop through the view array		
    	for (i in pViews)
    	{
    		pView = pViews[i];
    		if (pView.visible) 
			{
                if ((g_pBuiltIn.mouse_x >= pView.scaledportx) && (g_pBuiltIn.mouse_x < pView.scaledportx2) &&
                    (g_pBuiltIn.mouse_y >= pView.scaledporty) && (g_pBuiltIn.mouse_y < pView.scaledporty2)) 
                {
                	var xx = ((g_pBuiltIn.mouse_x - pView.scaledportx)/pView.WorldViewScaleX) + pView.worldx;
                	var yy = ((g_pBuiltIn.mouse_y - pView.scaledporty)/ pView.WorldViewScaleY) + pView.worldy;


                    // Now loop through instances
                    for(i=g_RunRoom.m_Active.length-1;i>=0;i-- )
                    {
                        var pInst = g_RunRoom.m_Active.Get(i);
                        var pREvent = pInst.pObject.REvent;
                        
                        // If the instance uses ANY mouse event, then we need to 
                        if( !pInst.marked ) 
						{
							if (pREvent[EVENT_MOUSE_LBUTTON_DOWN] || pREvent[EVENT_MOUSE_MBUTTON_DOWN] || pREvent[EVENT_MOUSE_RBUTTON_DOWN] ||
                                pREvent[EVENT_MOUSE_LBUTTON_PRESSED] || pREvent[EVENT_MOUSE_MBUTTON_PRESSED] || pREvent[EVENT_MOUSE_RBUTTON_PRESSED] ||
                                pREvent[EVENT_MOUSE_LBUTTON_RELEASED] || pREvent[EVENT_MOUSE_MBUTTON_RELEASED] || pREvent[EVENT_MOUSE_RBUTTON_RELEASED] ||
                                pREvent[EVENT_MOUSE_NOBUTTON] || pREvent[EVENT_MOUSE_ENTER] || pREvent[EVENT_MOUSE_LEAVE]
                            )
							{

								// NOTE:    This isn't "exactly" how GM8.x works. This will not loop through each instance, on each event.
								//          Instead, it takes a single instance and does all mouse events on that instance.
								if (pInst.bbox_dirty) pInst.Compute_BoundingBox();
								var pSprite = g_pSpriteManager.Get(pInst.sprite_index);
								if ((xx >= pInst.bbox.left) && (xx < pInst.bbox.right) && (yy >= pInst.bbox.top) && (yy < pInst.bbox.bottom))
								{

									var nobut = true;
									var ind;
									for (ind = 0; ind < 3; ind++)
									{
										if (g_pIOManager.ButtonDown[ind])
										{
											if (pREvent[EVENT_MOUSE_LBUTTON_DOWN + ind])
											{
												pInst.PerformEvent(EVENT_MOUSE_LBUTTON_DOWN + ind, 0, pInst, pInst);
											}
											nobut = false;
										}
									}

									for (ind = 0; ind < 3; ind++)
									{
										if (g_pIOManager.ButtonPressed[ind] == true)
										{
											if (pREvent[EVENT_MOUSE_LBUTTON_PRESSED + ind])
											{
												pInst.PerformEvent(EVENT_MOUSE_LBUTTON_PRESSED + ind, 0, pInst, pInst);
											}
											nobut = false;
										}
									}

									for (ind = 0; ind < 3; ind++)
									{
										if (g_pIOManager.ButtonReleased[ind] == true)
										{
											if (pREvent[EVENT_MOUSE_LBUTTON_RELEASED + ind])
											{
												pInst.PerformEvent(EVENT_MOUSE_LBUTTON_RELEASED + ind, 0, pInst, pInst);
											}
										}
									}



									// Handle "no button" events
									if (nobut)
									{
										pInst.PerformEvent(EVENT_MOUSE_NOBUTTON, 0, pInst, pInst);
									}

									// mouse_enter
									if (!pInst.mouse_over)
									{
										pInst.PerformEvent(EVENT_MOUSE_ENTER, 0, pInst, pInst);
										pInst.mouse_over = true;
									}
								} else
								{
									// mouse_enter
									if (pInst.mouse_over)
									{
										pInst.PerformEvent(EVENT_MOUSE_LEAVE, 0, pInst, pInst);
										pInst.mouse_over = false;
									}

								}
							}
                        }
                    }                    					
                }
            }
        }
        
        // handle global mouse event stuff.
		var ind;
		for (ind = 0; ind < 3; ind++)
		{
			if (g_pIOManager.ButtonDown[ind]){
				g_pInstanceManager.PerformEvent(EVENT_MOUSE_GLOBAL_LBUTTON_DOWN + ind);
			}
		}

		for (ind = 0; ind < 3; ind++)
		{
			if (g_pIOManager.ButtonPressed[ind] == true){
				g_pInstanceManager.PerformEvent(EVENT_MOUSE_GLOBAL_LBUTTON_PRESSED + ind);
			}
		}

		for (ind = 0; ind < 3; ind++)
		{
			if (g_pIOManager.ButtonReleased[ind] == true){
				g_pInstanceManager.PerformEvent(EVENT_MOUSE_GLOBAL_LBUTTON_RELEASED + ind);
			}
		}
    }
}


// #############################################################################################
/// Function:<summary>
///				Handles timeline events
///          </summary>
// #############################################################################################
function    HandleTimeLine()
{
	var pool = g_RunRoom.m_Active.pool;
	for(var inst=0;inst<pool.length;inst++)
	{
		var pInst = pool[inst];

		if (!pInst.marked && (pInst.timeline_index >= 0))
		{
			var timeline = g_pTimelineManager.Get(pInst.timeline_index);
			if ((timeline != null) && (timeline != undefined))
			{
			    // Updated the timeline position
			    if (!pInst.timeline_paused)
			    {
			        var ind1 = timeline.FindLarger(pInst.timeline_position);			            
			        pInst.timeline_position += pInst.timeline_speed;
                    var ind2 = timeline.FindLarger(pInst.timeline_position);
                            			                
                    for (var j=ind1; j < ind2; j++)
                    {
                        // Perform event timeline...
                        event_perform_timeline(pInst, pInst, pInst.timeline_index, j);
                    }
			    }
			}
		}
	}
}

// #############################################################################################
/// Function:<summary>
///				Handles alarm events
///          </summary>
// #############################################################################################
function	 HandleAlarm() {

	var pool = g_RunRoom.m_Active.pool;
	for (var inst in pool)
	{
		var pInst = pool[inst];
		if( !pInst.marked )
		{
			// Now loop through all the timers, and see which ones we need to process.
    		for(var a=0;a<MAXTIMER;a++)
			{
				var event = EVENT_ALARM|(a+1);		
				var pObj = pInst.pObject;

				// Does anyone (including parents) have an event handler for this?
				if( pObj.REvent[event] ) 
				{
					var al = ~~array_get_1D(pInst, "__alarm__", a);		// alarms must be integer based....
					if( al>=0 ) {
						al--;
						array_set_1D(pInst, "__alarm__", a, al);
					}
					if( al==0 ) {
						pInst.PerformEvent( EVENT_ALARM|(a+1), 0, pInst, pInst );        // timer enum starts at 1..
					}				
				}
			}
		}
	}

}




// #############################################################################################
/// Function:<summary>
///             Convert a GML event into one of our own...
///          </summary>
///
/// In:		 <param name="_event">GML event number </param>
///			 <param name="_subevent">GML sub event number</param>
/// Out:	 <returns>
///				HTML5 runner event number
///			 </returns>
// #############################################################################################
function    event_lookup(_event, _subevent)
{
    switch(_event)
    {
        case GML_EVENT_CREATE : return      EVENT_CREATE;    
        case GML_EVENT_DESTROY : return     EVENT_DESTROY;   
        case GML_EVENT_ALARM : 
            switch(_subevent)
            {
               case 0:  return   EVENT_ALARM_0;
               case 1:  return   EVENT_ALARM_1;
               case 2:  return   EVENT_ALARM_2;
               case 3:  return   EVENT_ALARM_3;
               case 4:  return   EVENT_ALARM_4;
               case 5:  return   EVENT_ALARM_5;
               case 6:  return   EVENT_ALARM_6;
               case 7:  return   EVENT_ALARM_7;
               case 8:  return   EVENT_ALARM_8;
               case 9:  return   EVENT_ALARM_9;
               case 10:  return  EVENT_ALARM_10;
               case 11:  return  EVENT_ALARM_11;
               default:  return  EVENT_ALARM_0;
            }
        case GML_EVENT_STEP : 
            switch(_subevent)
            {
                case    GML_EVENT_STEP_BEGIN:   return EVENT_STEP_BEGIN;
                case    GML_EVENT_STEP_NORMAL:  return EVENT_STEP_NORMAL;
                case    GML_EVENT_STEP_END:     return EVENT_STEP_END;
                default: return EVENT_STEP_NORMAL;
            }
            
        case GML_EVENT_COLLISION : return   EVENT_COLLISION; 
        case GML_EVENT_KEYBOARD : return    EVENT_KEYBOARD;
        case GML_EVENT_MOUSE:
        	switch (_subevent)
        	{
        		case GML_MOUSE_LeftButton: return EVENT_MOUSE_LBUTTON_DOWN;
        		case GML_MOUSE_RightButton: return EVENT_MOUSE_RBUTTON_DOWN;
        		case GML_MOUSE_MiddleButton: return EVENT_MOUSE_MBUTTON_DOWN;
        		case GML_MOUSE_NoButton: return EVENT_MOUSE_NOBUTTON;
        		case GML_MOUSE_LeftPressed: return EVENT_MOUSE_LBUTTON_PRESSED;
        		case GML_MOUSE_RightPressed: return EVENT_MOUSE_RBUTTON_PRESSED;
        		case GML_MOUSE_MiddlePressed: return EVENT_MOUSE_MBUTTON_PRESSED;
        		case GML_MOUSE_LeftReleased: return EVENT_MOUSE_LBUTTON_RELEASED;
        		case GML_MOUSE_RightReleased: return EVENT_MOUSE_RBUTTON_RELEASED;
        		case GML_MOUSE_MiddleReleased: return EVENT_MOUSE_MBUTTON_RELEASED;
        		case GML_MOUSE_MOUSEEnter: return 0;
        		case GML_MOUSE_MOUSELeave: return 0;
        		case GML_MOUSE_Joystick1Left: return 0;
        		case GML_MOUSE_Joystick1Right: return 0;
        		case GML_MOUSE_Joystick1Up: return 0;
        		case GML_MOUSE_Joystick1Down: return 0;
        		case GML_MOUSE_Joystick1Button1: return 0;
        		case GML_MOUSE_Joystick1Button2: return 0;
        		case GML_MOUSE_Joystick1Button3: return 0;
        		case GML_MOUSE_Joystick1Button4: return 0;
        		case GML_MOUSE_Joystick1Button5: return 0;
        		case GML_MOUSE_Joystick1Button6: return 0;
        		case GML_MOUSE_Joystick1Button7: return 0;
        		case GML_MOUSE_Joystick1Button8: return 0;
        		case GML_MOUSE_Joystick2Left: return 0;
        		case GML_MOUSE_Joystick2Right: return 0;
        		case GML_MOUSE_Joystick2Up: return 0;
        		case GML_MOUSE_Joystick2Down: return 0;
        		case GML_MOUSE_Joystick2Button1: return 0;
        		case GML_MOUSE_Joystick2Button2: return 0;
        		case GML_MOUSE_Joystick2Button3: return 0;
        		case GML_MOUSE_Joystick2Button4: return 0;
        		case GML_MOUSE_Joystick2Button5: return 0;
        		case GML_MOUSE_Joystick2Button6: return 0;
        		case GML_MOUSE_Joystick2Button7: return 0;
        		case GML_MOUSE_Joystick2Button8: return 0;
        		case GML_MOUSE_GlobLeftButton: return 0;
        		case GML_MOUSE_GlobRightButton: return 0;
        		case GML_MOUSE_GlobMiddleButton: return 0;
        		case GML_MOUSE_GlobLeftPressed: return 0;
        		case GML_MOUSE_GlobRightPressed: return 0;
        		case GML_MOUSE_GlobMiddlePressed: return 0;
        		case GML_MOUSE_GlobLeftReleased: return 0;
        		case GML_MOUSE_GlobRightReleased: return 0;
        		case GML_MOUSE_GlobMiddleReleased: return 0;
        		case GML_MOUSE_GML_MOUSEWheelUp: return 0;
        		case GML_MOUSE_GML_MOUSEWheelDown: return 0;
        		default:
        			return 0;
        	}
        case GML_EVENT_OTHER:
        	{
        		switch (_subevent)
        		{
        			case GML_EVENT_OTHER_OUTSIDE: return EVENT_OTHER_OUTSIDE;
        			case GML_EVENT_OTHER_BOUNDARY: return EVENT_OTHER_BOUNDARY;
        			case GML_EVENT_OTHER_STARTGAME: return EVENT_OTHER_STARTGAME;
        			case GML_EVENT_OTHER_ENDGAME: return EVENT_OTHER_ENDGAME;
        			case GML_EVENT_OTHER_STARTROOM: return EVENT_OTHER_STARTROOM;
        			case GML_EVENT_OTHER_ENDROOM: return EVENT_OTHER_ENDROOM;
        			case GML_EVENT_OTHER_NOLIVES: return EVENT_OTHER_NOLIVES;
        			case GML_EVENT_OTHER_ANIMATIONEND: return EVENT_OTHER_ANIMATIONEND;
        			case GML_EVENT_OTHER_ENDOFPATH: return EVENT_OTHER_ENDOFPATH;
        			case GML_EVENT_OTHER_NOHEALTH: return EVENT_OTHER_NOHEALTH;
        			case GML_EVENT_OTHER_CLOSEBUTTON: return EVENT_OTHER_CLOSEBUTTON;
        			case GML_EVENT_OTHER_OUTSIDE_VIEW0: return EVENT_OTHER_OUTSIDE_VIEW0;
        			case GML_EVENT_OTHER_BOUNDARY_VIEW0: return EVENT_OTHER_BOUNDARY_VIEW0;
        			case GML_ev_user0: return EVENT_OTHER_USER0;
        			case GML_ev_user1: return EVENT_OTHER_USER1;
        			case GML_ev_user2: return EVENT_OTHER_USER2;
        			case GML_ev_user3: return EVENT_OTHER_USER3;
        			case GML_ev_user4: return EVENT_OTHER_USER4;
        			case GML_ev_user5: return EVENT_OTHER_USER5;
        			case GML_ev_user6: return EVENT_OTHER_USER6;
        			case GML_ev_user7: return EVENT_OTHER_USER7;
        			case GML_ev_user8: return EVENT_OTHER_USER8;
        			case GML_ev_user9: return EVENT_OTHER_USER9;
        			case GML_ev_user10: return EVENT_OTHER_USER10;
        			case GML_ev_user11: return EVENT_OTHER_USER11;
        			case GML_ev_user12: return EVENT_OTHER_USER12;
        			case GML_ev_user13: return EVENT_OTHER_USER13;
        			case GML_ev_user14: return EVENT_OTHER_USER14;
        			case GML_ev_user15: return EVENT_OTHER_USER15;
        			case GML_EVENT_OTHER_WEB_IMAGE_LOAD: return EVENT_OTHER_WEB_IMAGE_LOAD;
        			case GML_EVENT_OTHER_WEB_SOUND_LOAD: return EVENT_OTHER_WEB_SOUND_LOAD;

        				defualt:
        				return 0;
        		}
        	}
        case GML_EVENT_DRAW : return        EVENT_DRAW;      
        case GML_EVENT_KEYPRESS : return    EVENT_KEYPRESS;  
        case GML_EVENT_KEYRELEASE : return  EVENT_KEYRELEASE;
        default: return 0;
    }
}


// #############################################################################################
/// Function:<summary>
///             Convert a GML subevent into one of our own...
///          </summary>
///
/// In:		 <param name="_event">GML event number </param>
///			 <param name="_subevent">GML sub event number</param>
/// Out:	 <returns>
///				HTML5 runner subevent number
///			 </returns>
// #############################################################################################
function    sub_event_lookup(_event, _subevent)
{
    return 0;
}