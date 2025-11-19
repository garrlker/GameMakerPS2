
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Object.js
// Created:         22/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 26/05/2011		V1.0        MJD     Rest of the functions added
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///             Get the number of subimages a sprite has
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the number of subimages of</param>
/// Out:	 <returns>
///				Number of sub images, or 0 if not found.
///			 </returns>
// #############################################################################################
function    object_exists( _ind )
{
    if( g_pObjectManager.Get(_ind) === null ) return false;
    return true;
}



// #############################################################################################
/// Function:<summary>
///             Returns the name of the object with the given index.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				Name of the object, or ""
///			 </returns>
// #############################################################################################
function object_get_name(_ind)
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return "";
    return pObj.Name;
}

// #############################################################################################
/// Function:<summary>
///             Returns the index of the default sprite of the object with the given index.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_sprite(_ind)
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return -1;
    return pObj.SpriteIndex;
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the object with the given index is default solid.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_solid(_ind)
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return false;
    return pObj.Solid;
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the object with the given index is default visible.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_visible(_ind) 
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return false;
    return pObj.Visible;
}


// #############################################################################################
/// Function:<summary>
///             Returns the depth of the object with the given index.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_depth(_ind) 
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return 0;
    return pObj.Depth;
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the object with the given index is persistent.
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_persistent(_ind) 
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return false;
    return pObj.Persistent;
}


// #############################################################################################
/// Function:<summary>
///             Returns the index of the mask of the object with the given index 
///             (-1 if is has no special mask).
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function object_get_mask(_ind) 
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return -1;
    return pObj.SpriteMask;
}


// #############################################################################################
/// Function:<summary>
///             Returns index of the parent object of object ind 
///          </summary>
///
/// In:		 <param name="_ind">Object index</param>
/// Out:	 <returns>
///				(a negative value is returned if it has no parent).
///			 </returns>
// #############################################################################################
function object_get_parent(_ind) 
{
    var pObj = g_pObjectManager.Get(_ind);
    if( pObj===null ) return -1;
    return pObj.ParentID;
}



// #############################################################################################
/// Function:<summary>
///             Sets the sprite of the object with the given index. Use -1 to remove the current sprite from the object.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_spr"></param>
///				
// #############################################################################################
function object_set_sprite(_ind,_spr) 
{
    var pObj = g_pObjectManager.Get(_ind); 
    if (pObj === null ) return;   
    pObj.SpriteIndex = _spr;
}


// #############################################################################################
/// Function:<summary>
///             Sets whether instances created of the object must default be solid (true or false).
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_solid"></param>
///				
// #############################################################################################
function object_set_solid(_ind,_solid) 
{
    var pObj = g_pObjectManager.Get(_ind); 
    if (pObj === null ) return;   
    pObj.Solid = _solid;
}



// #############################################################################################
/// Function:<summary>
///             Sets whether instances created of the object must default be visible (true or false).
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_vis"></param>
///				
// #############################################################################################
function object_set_visible(_ind,_vis) 
{
    var pObj = g_pObjectManager.Get(_ind) ;
    if (pObj === null ) return;   
    pObj.Visible = _vis;
}


// #############################################################################################
/// Function:<summary>
///             Sets the default depth of instances created of the object.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_depth"></param>
///				
// #############################################################################################
function object_set_depth(_ind,_depth)
{
    var pObj = g_pObjectManager.Get(_ind); 
    if (pObj === null ) return;   
    pObj.Depth = _depth;
}


// #############################################################################################
/// Function:<summary>
///             Sets whether instances created of the object must default be persistent (true or false).
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_pers"></param>
///				
// #############################################################################################
function object_set_persistent(_ind,_pers) 
{
    var pObj = g_pObjectManager.Get(_ind); 
    if (pObj === null ) return;   
    pObj.Persistent = _pers;
}


// #############################################################################################
/// Function:<summary>
///             Sets the sprite mask of the object with the given index. 
///             Use -1 to set the mask to be the sprite of the object.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_spr"></param>
///				
// #############################################################################################
function object_set_mask(_ind,_spr) 
{
    var pObj = g_pObjectManager.Get(_ind) ;
    if (pObj === null ) return;   
    pObj.SpriteMask = _spr;
}


// #############################################################################################
/// Function:<summary>
///              Sets the parent of the object. Use -1 to not have a parent. Changing the parent changes the behavior of 
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_ParentID"></param>
///				
// #############################################################################################
function object_set_parent(_ind,_ParentID)
{
    var pObj = g_pObjectManager.Get(_ind) ;
    if (pObj === null ) return;   
    pObj.ParentID = _ParentID;
    pObj.pParent = g_pObjectManager.Get(_ParentID);
}



// #############################################################################################
/// Function:<summary>
///          	 Returns whether object ind2 is an ancestor of object ind1.
///          </summary>
///
/// In:		<param name="_ind1">parent</param>
///			<param name="_ind2">object to test</param>
/// Out:	<returns>
///				true for yes, false for no.
///			</returns>
// #############################################################################################
function    object_is_ancestor(_ind1,_ind2)
{
    var pObj = g_pObjectManager.Get(_ind2) ;
    if (pObj === null ) return false;   
    
    pObj = pObj.pParent;
    while( pObj !==null )
    {
        if( pObj.ID === _ind1 ) return true;
        pObj = pObj.pParent;
    }
    return false;
}


