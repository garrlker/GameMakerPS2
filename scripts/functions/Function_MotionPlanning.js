
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_MotionPlanning.js
// Created:			02/06/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 02/06/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///          	Computes the difference between the directions (positive <= 180)
///          </summary>
///
/// In:		<param name="_dir1"></param>
///			<param name="_dir2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function DiffDir( _dir1 , _dir2)
{
	var Result= 0.0;

	while ( dir1 <= 0.0 ) { dir1 = dir1 + 360; }
	while ( dir1 >= 360.0 ) { dir1 = dir1 - 360; }
	while ( dir2 < 0.0 ) { dir2 = dir2 + 360; }
	while ( dir2 >= 360. ) { dir2 = dir2 - 360; }
	Result = dir2-dir1;
	if ( Result < 0 ) { Result = -Result; }
	if ( Result > 180 ) { Result = 360-Result; }

	return Result;
}


// #############################################################################################
/// Function:<summary>
///             Tests whether a position for inst is free with respect to objects of objind
///             useall is only used when objind = OBJECT_ALL
///          </summary>
///
/// In:		<param name="inst"></param>
///			<param name="x"></param>
///			<param name="y"></param>
///			<param name="objind"></param>
///			<param name="checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function TestFree(_pInst, _x, _y, _objind, _checkall)
{
	if ( _objind == OBJECT_ALL )
	{
		if ( _checkall )
		{
			return place_empty(_pInst, _x,_y);
		}
		else
		{
			return place_free(_pInst, _x, _y);
		}
	}
	else
	{
		return (instance_place(_pInst, _x, _y, _objind) == OBJECT_NOONE);
	}
}


// #############################################################################################
/// Function:<summary>
///          	This function lets the instance take a step straight towards the indicated 
///             position (x,y). The size of the step is indicated by the stepsize. 
///             If the instance is already at the position it will not move any further. 
///             If checkall is true the instance will stop when it hits an instance of any object. 
///             If it is false it only stops when hitting a solid instance. 
///
///             Note: That this function does not try to make detours if it meets an obstacle. 
///             It simply fails in that case. The function returns whether or not the goal position 
///             was reached.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_stepsize"></param>
///			<param name="_objind"></param>
///			<param name="_checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_linear_step_common( _pInst, _x,_y,_stepsize,_objind, _checkall) 
{
    var  Result = false;

    var dist = 0.0;
    var newx = 0.0;
    var newy = 0.0;

    // check whether at the correct position
    if ( (_pInst.x == _x) && (_pInst.y == _y) ) return true;

    // check whether close enough for a single step
    dist = sqrt(  Sqr(_pInst.x-_x)+Sqr(_pInst.y-_y) );
    if ( dist <= _stepsize )
    {
	    newx = _x; 
	    newy = _y;
	    Result = true;
    }
    else
    {
	    newx = _pInst.x + _stepsize * (_x-_pInst.x) / dist;
	    newy = _pInst.y + _stepsize * (_y-_pInst.y) / dist;
	    Result = false;
    }
    // Check whether free
    if ( !TestFree(_pInst,newx,newy,_objind,_checkall) ){ 
        return Result; 
    }
    
    _pInst.setdirection( point_direction(_pInst.x,_pInst.y, newx,newy ) );
    _pInst.SetPosition( newx, newy );

    return Result;
}
// #############################################################################################
/// Function:<summary>
///          	This function lets the instance take a step straight towards the indicated 
///             position (x,y). The size of the step is indicated by the stepsize. 
///             If the instance is already at the position it will not move any further. 
///             If checkall is true the instance will stop when it hits an instance of any object. 
///             If it is false it only stops when hitting a solid instance. 
///
///             Note: That this function does not try to make detours if it meets an obstacle. 
///             It simply fails in that case. The function returns whether or not the goal position 
///             was reached.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_stepsize"></param>
///			<param name="_objind"></param>
///			<param name="_checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_linear_step( _pInst, _x,_y,_stepsize, _checkall) 
{ 
    return  mp_linear_step_common( _pInst, _x,_y,_stepsize, OBJECT_ALL, _checkall); 
}


// #############################################################################################
/// Function:<summary>
///          	Same as the function above but this time only instances of obj are considered 
///             as obstacles. obj can be an object or an instance id.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_stepsize"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_linear_step_object( _pInst, _x,_y,_stepsize,_obj) 
{
    return  mp_linear_step_common( _pInst, _x,_y,_stepsize, _obj, true); 
}

// #############################################################################################
/// Function:<summary>
///          	Like the previous function, this function lets the instance take a step towards 
///             a particular position. But in this case it tries to avoid obstacles. When the 
///             instance would run into a solid instance (or any instance when checkall is true) 
///             it will change the direction of motion to try to avoid the instance and move around it. 
///             The approach is not guaranteed to work but in most easy cases it will effectively move 
///             the instance towards the goal. The function returns whether or not the goal was reached.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_stepsize"></param>
///			<param name="_checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_potential_step(_pInst, _x,_y,_stepsize,_checkall) 
{
    // don't avoid objects just now...
    mp_linear_step_common( _pInst, _x,_y,_stepsize, OBJECT_ALL, _checkall); 
}

// #############################################################################################
/// Function:<summary>
///          	Same as the function above but this time only instances of obj are considered as 
///             obstacles. obj can be an object or an instance id.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_stepsize"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_potential_step_object(_pInst, _x,_y,_stepsize,_obj) 
{
    // don't try and avoid objects just now
    mp_linear_step_common( _pInst, _x,_y,_stepsize, _obj, true); 
}


// #############################################################################################
/// Function:<summary>
///          	The previous function does its work using a number of parameters that can be 
///             changed using this function. Globally the method works as follows. It first 
///             tries to move straight towards the goal. It looks a number of steps ahead which 
///             can be set with the parameter ahead (default 3). Reducing this value means that 
///             the instance will start changing direction later. Increasing it means it will 
///             start changing direction earlier. If this check leads to a collision it starts 
///             looking at directions more to the left and to the right of the best direction. 
///             It does this in steps of size rotstep (default 10). Reducing this gives the 
///             instance more movement possibilities but will be slower. The parameter maxrot 
///             is a bit more difficult to explain. The instance has a current direction. 
///             maxrot (default 30) indicates how much it is allowed to change its current 
///             direction in a step. So even if it can move e.g. straight to the goal it will only 
///             do so if it does not violate this maximal change of direction. If you make maxrot 
///             large the instance can change a lot in each step. This will make it easier to find 
///             a short path but the path will be uglier. If you make the value smaller the path 
///             will be smoother but it might take longer detours (and sometimes even fail to find 
///             the goal). When no step can be made the behavior depends on the value of the parameter 
///             onspot. If onspot is true (the default value), the instance will rotate on its 
///             spot by the amount indicated with maxrot. If it is false it will not move at all. 
///             Setting it to false is useful for e.g. cars but reduces the chance of finding a path.
///          </summary>
///
/// In:		<param name="_maxrot"></param>
///			<param name="_rotstep"></param>
///			<param name="_ahead"></param>
///			<param name="_onspot"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_potential_settings(_pInst, _maxrot,_rotstep,_ahead,_onspot) 
{
    MissingFunction("mp_potential_settings()");
}



// #############################################################################################
/// Function:<summary>
///          	This function computes a straight-line path for the instance from its current 
///             position to the position (xg,yg) using the indicated step size. It uses steps as 
///             in the function mp_linear_step(). The indicated path must already exist and will be 
///             overwritten by the new path. (See a later chapter on how to create and destroy paths.) 
///             The function will return whether a path was found. The function will stop and report 
///             failure if no straight path exists between start and goal. If it fails a path is 
///             still created that runs till the position where the instance was blocked.
///          </summary>
///
/// In:		<param name="_path"></param>
///			<param name="_xg"></param>
///			<param name="_yg"></param>
///			<param name="_stepsize"></param>
///			<param name="_checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_linear_path(_pInst, _path,_xg,_yg,_stepsize,_checkall) 
{
    MissingFunction("mp_linear_path()");
}

// #############################################################################################
/// Function:<summary>
///          	Same as the function above but this time only instances of obj are considered as 
///             obstacles. obj can be an object or an instance id.
///          </summary>
///
/// In:		<param name="_path"></param>
///			<param name="_xg"></param>
///			<param name="_yg"></param>
///			<param name="_stepsize"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_linear_path_object(_pInst, _path,_xg,_yg,_stepsize,_obj) 
{
    MissingFunction("mp_linear_path_object()");
}

// #############################################################################################
/// Function:<summary>
///          	This function computes a path for the instance from its current position and 
///             orientation to the position (xg,yg) using the indicated step size trying to avoid 
///             collision with obstacles. It uses potential field steps, like in the function 
///             mp_potential_step() and also the parameters that can be set with mp_potential_settings(). 
///             The indicated path must already exist and will be overwritten by the new path. 
///             (See a later chapter on how to create and destroy paths.) The function will return 
///             whether a path was found. To avoid the function continuing to compute forever you 
///             need to provide a length factor larger than 1. The function will stop and report 
///             failure if it cannot find a path shorter than this factor times the distance 
///             between start and goal. A factor of 4 is normally good enough but if you expect long 
///             detours you might make it longer. If it fails a path is still created that runs in 
///             the direction of the goal but it will not reach it.
///          </summary>
///
/// In:		<param name="_path"></param>
///			<param name="_xg"></param>
///			<param name="_yg"></param>
///			<param name="_stepsize"></param>
///			<param name="_factor"></param>
///			<param name="_checkall"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_potential_path(_pInst, _path,_xg,_yg,_stepsize,_factor,_checkall) 
{
    MissingFunction("mp_potential_path()");
}

// #############################################################################################
/// Function:<summary>
///          	Same as the function above but this time only instances of obj are considered as 
///             obstacles. obj can be an object or an instance id.
///          </summary>
///
/// In:		<param name="_path"></param>
///			<param name="_xg"></param>
///			<param name="_yg"></param>
///			<param name="_stepsize"></param>
///			<param name="_factor"></param>
///			<param name="_obj"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_potential_path_object(_pInst, _path,_xg,_yg,_stepsize,_factor,_obj) 
{
    MissingFunction("mp_potential_path_object()");
}



// #############################################################################################
/// Function:<summary>
///          	This function creates the grid. It returns an index that must be used in all other 
///             calls. You can create and maintain multiple grid structures at the same moment. 
///             left and top indicate the position of the top-left corner of the grid. hcells and 
///             vcells indicate the number of horizontal and vertical cells. Finally cellwidth and 
///             cellheight indicate the size of the cells.
///          </summary>
///
/// In:		<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_hcells"></param>
///			<param name="_vcells"></param>
///			<param name="_cellwidth"></param>
///			<param name="_cellheight"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_create(_left,_top,_hcells,_vcells,_cellwidth,_cellheight) 
{
    MissingFunction("mp_grid_create()");
}

// #############################################################################################
/// Function:<summary>
///          	Destroys the indicated grid structure and frees its memory. Don't forget to call 
///             this if you don't need the structure anymore.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_destroy(_id) 
{
    MissingFunction("mp_grid_destroy()");
}

// #############################################################################################
/// Function:<summary>
///          	Mark all cells in the grid to be free.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_clear_all(_id) 
{
    MissingFunction("mp_grid_clear_all()");
}

// #############################################################################################
/// Function:<summary>
///          	Clears the indicated cell. Cell 0,0 is the top left cell.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_h"></param>
///			<param name="_v"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_clear_cell(_id,_h,_v) 
{
    MissingFunction("mp_grid_clear_cell()");
}


// #############################################################################################
/// Function:<summary>
///          	Clears all cells that intersect the indicated rectangle (in room coordinates).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_right"></param>
///			<param name="_bottom"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_clear_rectangle(_id,_left,_top,_right,_bottom) 
{
    MissingFunction("mp_grid_clear_rectangle()");
}


// #############################################################################################
/// Function:<summary>
///          	Marks the indicated cell as being forbidden. Cell 0,0 is the top left cell.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_h"></param>
///			<param name="_v"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_add_cell(_id,_h,_v) 
{
    MissingFunction("mp_grid_add_cell()");
}


// #############################################################################################
/// Function:<summary>
///          	Marks all cells that intersect the indicated rectangle as being forbidden.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_right"></param>
///			<param name="_bottom"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_add_rectangle(_id,_left,_top,_right,_bottom) 
{
    MissingFunction("mp_grid_add_rectangle()");
}


// #############################################################################################
/// Function:<summary>
///          	Marks all cells that intersect an instance of the indicated object as being forbidden. 
///             You can also use an individual instance by making obj the id of the instance. Also 
///             you can use the keyword all to indicate all instances of all objects. prec indicates 
///             whether precise collision checking must be used (will only work if precise checking is 
///             enabled for the sprite used by the instance).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_obj"></param>
///			<param name="_prec"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_add_instances(_id,_obj,_prec) 
{
    MissingFunction("mp_grid_add_instances()");
}


// #############################################################################################
/// Function:<summary>
///          	Computes a path through the grid. path must indicate an existing path that will 
///             be replaced by the computer path. xstart and ystart indicate the start of the 
///             path and xgoal and ygoal the goal. allowdiag indicates whether diagonal moves are 
///             allowed instead of just horizontal or vertical. The function returns whether it 
///             succeeded in finding a path. (Note that the path is independent of the current 
///             instance; It is a path through the g rid, not a path for a specific instance.) 
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_path"></param>
///			<param name="_xstart"></param>
///			<param name="_ystart"></param>
///			<param name="_xgoal"></param>
///			<param name="_ygoal"></param>
///			<param name="_allowdiag"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_path(_id,_path,_xstart,_ystart,_xgoal,_ygoal,_allowdiag) 
{
    MissingFunction("mp_grid_path()");
}


// #############################################################################################
/// Function:<summary>
///          	This function draws the grid with green cells being free and red cells being 
///             forbidden. This function is slow and only provided as a debug tool.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mp_grid_draw(_id) 
{
    MissingFunction("mp_grid_draw()");
}
