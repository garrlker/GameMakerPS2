
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Collision.js
// Created:			30/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 30/05/2011		
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///          	This function tests whether at point (x,y) there is a collision with entities of 
///             object obj. 
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function collision_point(_pInst, _x,_y,_obj,_prec,_notme) 
{
    return Instance_SearchLoop( _pInst, Math.floor(_obj), _notme, false,   _x,_y,_prec,  
        function( _pInstance )
        {
            return _pInstance.Collision_Point(_x,_y,_prec);
        }
    );
}

// #############################################################################################
/// Function:<summary>
///          	This function tests whether there is a collision between the (filled) rectangle 
///             with the indicated opposite corners and entities of object obj. For example, 
///             you can use this to test whether an area is free of obstacles.
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function collision_rectangle(_pInst, _x1,_y1,_x2,_y2,_obj,_prec,_notme) 
{
    return Instance_SearchLoop( _pInst, Math.floor(_obj), _notme, false,   _x1,_y1,_x2,_y2,_prec,  
        function(_pInstance) 
        {
            return _pInstance.Collision_Rectangle(_x1,_y1,_x2,_y2,_prec);
        }
    );;
}

// #############################################################################################
/// Function:<summary>
///          	This function tests whether there is a collision between the (filled) circle 
///             centered at position (xc,yc) with the given radius and entities of object obj. 
///             For example, you can use this to test whether there is an object close to a 
///             particular location.
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_xc"></param>
///			<param name="_yc"></param>
///			<param name="_radius"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function collision_circle(_pInst, _xc,_yc,_radius,_obj,_prec,_notme) 
{
    return collision_ellipse(_pInst, 
                            _xc-_radius, _yc-_radius,
                            _xc+_radius, _yc+_radius,
                            _obj,
                            _prec,
                            _notme
                            );
}

// #############################################################################################
/// Function:<summary>
///          	This function tests whether there is a collision between the (filled) ellipse 
///             with the indicated opposite corners and entities of object obj. 
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function collision_ellipse(_pInst, _x1,_y1,_x2,_y2,_obj,_prec,_notme) 
{
    return Instance_SearchLoop( _pInst, Math.floor(_obj), _notme, false,   _x1,_y1,_x2,_y2,_prec,  
        function(_pInstance) 
        {
            return _pInstance.Collision_Ellipse(_x1,_y1,_x2,_y2,_prec);
        }
    );
}

// #############################################################################################
/// Function:<summary>
///          	This function tests whether there is a collision between the line segment from 
///             (x1,y1) to (x2,y2) and entities of object obj. This is a powerful function. 
///             You can e.g. use it to test whether an instance can see another instance by 
///             checking whether the line segment between them intersects a wall.
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function collision_line(_pInst, _x1,_y1,_x2,_y2,_obj,_prec,_notme)
{    
    var prec = (_prec >= 0.5) ? true : false;
    var notme = (_notme >= 0.5) ? true : false;

    return Instance_SearchLoop( _pInst, Math.floor(_obj), notme, false,   _x1,_y1,_x2,_y2,prec,  
        function(_pInstance) 
        {
            return _pInstance.Collision_Line(_x1,_y1,_x2,_y2,prec);
        }
    );
}

