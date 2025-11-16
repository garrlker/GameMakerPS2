// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_grid.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Collections used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 20/02/2011		V1.0        MJD     Simple ds_grid implemented.
// 20/07/2011		V1.1		MJD		All but 3 functions completed and tested.
// 
// **********************************************************************************************************************


var g_Grid_min,
	g_Grid_max,
	g_Grid_value,
	g_Grid_mean,
	g_Grid_value_exists,
	g_Grid_value_x,
	g_Grid_value_y;

// #############################################################################################
/// Function:<summary>
///          	Sets the precision used for comparisons. (data structures)
///          </summary>
// #############################################################################################
function ds_set_precision(_prec)
{
    g_Precsision = _prec;
}







// #############################################################################################
/// Function:<summary>
///          	Create a new grid object
///          </summary>
///
/// In:		<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyGrid(_w, _h) 
{
	this.m_pGrid = [];
	this.m_Width = _w;
	this.m_Height = _h;
	var t=_w*_h;
	for (var i = 0; i < t; i++)
	{
		this.m_pGrid[i] = null;
	}
}

// #############################################################################################
/// Function:<summary>
///          	Creates a new grid with the indicated width and height. The function returns an 
///				integer as an id that must be used in all other functions to access the particular grid.
///          </summary>
///
/// In:		<param name="_w">Width of grid</param>
///			<param name="_h">Height of grid</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_create(_w, _h) {
	if (_w < 0 || _h < 0){
		Error("Error: Invalid ds_grid size: (" + _w + "," + _h + ")");
	}
	var pGrid = new yyGrid(_w, _h);
	var id = g_ActiveGrids.Add(pGrid);
	return id;
}


// #############################################################################################
/// Function:<summary>
///          	Destroys the grid with the given id, freeing the memory used. Don't forget to 
///				call this function when you are ready with the structure.
///          </summary>
///
/// In:		<param name="_id">index to delete</param>
///				
// #############################################################################################
function ds_grid_destroy(_id) {
	g_ActiveGrids.DeleteIndex(_id);
}

// #############################################################################################
/// Function:<summary>
///          	 Copies the grid source into the grid with the given id.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_copy(_id, _source) {
	var pDestGrid = g_ActiveGrids.Get(_id);
	if (pDestGrid == null || pDestGrid == undefined)
	{
		Error("Error: invalid dest ds_grid(copy)");
		return;
	}

	var pSrcGrid = g_ActiveGrids.Get(_source);
	if (pSrcGrid == null || pSrcGrid  == undefined)
	{
		Error("Error: invalid source ds_grid(copy)");
		return;
	}

	pDestGrid.m_Width = pSrcGrid.m_Width;
	pDestGrid.m_Height = pSrcGrid.m_Height;
	pDestGrid.m_pGrid = pSrcGrid.m_pGrid.slice();
}


// #############################################################################################
/// Function:<summary>
///          	Resizes the grid to the new width and height. Existing cells keep their original 
///				value.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_resize(_id, _w, _h) {
	if (_w < 1 || _h < 1)
	{
		Error("Error: Can't resize grid to 0 ("+string(_w)+","+string(_h)+")");
		return;
	}

	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid dest ds_grid(copy)");
		return;
	}

	var pGrid2 = new yyGrid(_w, _h);
	var i = g_ActiveGrids.Add(pGrid2);

	// COPY grid
	ds_grid_set_grid_region(i, _id, 0, 0, pGrid.m_Width - 1, pGrid.m_Height - 1, 0, 0);
	
	// Now remove the temp ID, and copy the grid over...
	g_ActiveGrids.DeleteIndex(i);
	g_ActiveGrids.Set(_id, pGrid2);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the width of the grid with the indicated id.
///          </summary>
///
/// In:		<param name="_id">Grid ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_width(_id) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_width)");
		return;
	}
	return pGrid.m_Width;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the height of the grid with the indicated id.
///          </summary>
///
/// In:		<param name="_id">Grid ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_height(_id) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_height)");
		return;
	}
	return pGrid.m_Height;
}


// #############################################################################################
/// Function:<summary>
///          	Clears the grid with the given id, to the indicated value (can both be a number or a string).
///          </summary>
///
/// In:		<param name="_id">Grid ID</param>
/// In:		<param name="_val">value to fill with</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_clear(_id,_val) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_height)");
		return;
	}
	for (var i = 0; i < pGrid.m_pGrid.length; i++)
	{
		pGrid.m_pGrid[i] = _val;
	}
}



// #############################################################################################
/// Function:<summary>
///          	Sets the indicated cell in the grid with the given id, to the indicated value 
///				(can both be a number or a string).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_set(_id, _x, _y, _val) 
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined) 
	{
		Error("Error: invalid ds_grid ID (ds_grid_set)");
		return;
	}
	if (_x < 0 || _x >= pGrid.m_Width || _y < 0 || _y >= pGrid.m_Height) 
	{
		Error("Error: grid out of bounds(set): " + _id + " (" + _x + "," + _y + ")");
		return;
	}
	pGrid.m_pGrid[_x + (_y * pGrid.m_Width)] = _val;
}



// #############################################################################################
/// Function:<summary>
///          	Add the value to the indicated cell in the grid with the given id. For strings 
//				this corresponds to concatenation.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_add(_id, _x, _y, _val) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_add)");
		return;
	}
	if (_x < 0 || _x >= pGrid.m_Width || _y < 0 || _y >= pGrid.m_Height)
	{
		Error("Error: grid out of bounds(ds_grid_add): " + _id + " (" + _x + "," + _y + ")");
		return;
	}
	pGrid.m_pGrid[_x + (_y * pGrid.m_Width)] += _val;
}


// #############################################################################################
/// Function:<summary>
///          	Multiplies the value to the indicated cell in the grid with the given id. 
///				Is only valid for numbers.
///          </summary>
///
/// In:		<param name="id"></param>
///			<param name="x"></param>
///			<param name="y"></param>
///			<param name="val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    ds_grid_multiply(_id,_x,_y,_val) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_multiply)");
		return;
	}
	if (_x < 0 || _x >= pGrid.m_Width || _y < 0 || _y >= pGrid.m_Height)
	{
		Error("Error: grid out of bounds(ds_grid_multiply): " + _id + " (" + _x + "," + _y + ")");
		return;
	}
	pGrid.m_pGrid[_x + (_y * pGrid.m_Width)] *= _val;
}

// #############################################################################################
/// Function:<summary>
///          	Sets the all cells in the region in the grid with the given id, to the indicated 
///				value (can both be a number or a string).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_set_region(_id, _x1, _y1, _x2, _y2, _val) 
{
	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}

	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_region)");
		return;
	}
	if ((_x1 < 0 || _x1 >= pGrid.m_Width || _y1 < 0 || _y1 >= pGrid.m_Height) || (_x2 < 0 || _x2 >= pGrid.m_Width || _y2 < 0 || _y2 >= pGrid.m_Height))
	{
		Error("Error: region out of bounds(ds_grid_set_region): " + _id);
	}


	// Now actually loop through and do the "set"
	for (var y = _y1; y <= _y2; y++)
	{
		var index = (y * pGrid.m_Width)+_x1;
		for (var x = _x1; x <= _x2; x++)
		{
			pGrid.m_pGrid[index] = _val;
			index++;
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Add the value to the cell in the region in the grid with the given id. 
///				For strings this corresponds to concatenation.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_add_region(_id, _x1, _y1, _x2, _y2, _val) {
	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}

	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_add_region)");
		return;
	}
	if ((_x1 < 0 || _x1 >= pGrid.m_Width || _y1 < 0 || _y1 >= pGrid.m_Height) || (_x2 < 0 || _x2 >= pGrid.m_Width || _y2 < 0 || _y2 >= pGrid.m_Height))
	{
		Error("Error: region out of bounds(ds_grid_add_region): " + _id);
	}


	// Now actually loop through and do the "set"
	for (var y = _y1; y <= _y2; y++)
	{
		var index = (y * pGrid.m_Width) + _x1;
		for (var x = _x1; x <= _x2; x++)
		{
			pGrid.m_pGrid[index] += _val;
			index++;
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Multiplies the value to the cells in the region in the grid with the given id. 
///				Is only valid for numbers.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_multiply_region(_id, _x1, _y1, _x2, _y2, _val) {
	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}

	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_multiply_region)");
		return;
	}
	if ((_x1 < 0 || _x1 >= pGrid.m_Width || _y1 < 0 || _y1 >= pGrid.m_Height) || (_x2 < 0 || _x2 >= pGrid.m_Width || _y2 < 0 || _y2 >= pGrid.m_Height))
	{
		Error("Error: region out of bounds(ds_grid_multiply_region): " + _id);
	}


	// Now actually loop through and do the "set"
	for (var y = _y1; y <= _y2; y++)
	{
		var index = (y * pGrid.m_Width) + _x1;
		for (var x = _x1; x <= _x2; x++)
		{
			pGrid.m_pGrid[index] *= _val;
			index++;
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Sets all cells in the disk with center (xm,ym) and radius r. 
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_set_disk(_id,_x,_y,_r,_val) 
{ 
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_disk)");
		return;
	}

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var i = 0;
	var j = 0;

	x1 = ~ ~(yymax(0.0, Math.floor(_x - _r)));
	x2 = ~ ~(yymin(this.m_Width - 1, Math.ceil(_x + _r)));
	y1 = ~ ~(yymax(0, Math.floor(_y - _r)));
	y2 = ~ ~(yymin(this.m_Height - 1, Math.ceil(_y + _r)));

	_r = _r*_r;
	var w = pGrid.m_Width;
	for ( i=x1 ; i<=x2 ; i++ )
	{
		var ix = (i-_x)*(i-_x);
		for ( j=y1 ; j<=y2 ; j++ )
		{
			var jy = j-_y;
			if ( ix+(jy*jy) <= _r )
			{
				if (i >= 0 && i < pGrid.m_Width && j >= 0 && j < pGrid.m_Height)
				{
					pGrid.m_pGrid[i + (j*w)] = _val;
				}				
			}
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Add the value to all cells in the disk with center (xm,ym) and radius r. 
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_add_disk(_id,_x,_y,_r,_val) 
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_disk)");
		return;
	}

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var i = 0;
	var j = 0;

	x1 = ~ ~(yymax(0.0, Math.floor(_x - _r)));
	x2 = ~ ~(yymin(this.m_Width - 1, Math.ceil(_x + _r)));
	y1 = ~ ~(yymax(0, Math.floor(_y - _r)));
	y2 = ~ ~(yymin(this.m_Height - 1, Math.ceil(_y + _r)));

	_r = _r * _r;
	var w = pGrid.m_Width;
	for (i = x1; i <= x2; i++)
	{
		var ix = (i - _x) * (i - _x);
		for (j = y1; j <= y2; j++)
		{
			var jy = j - _y;
			if (ix + (jy * jy) <= _r)
			{
				if (i >= 0 && i < pGrid.m_Width && j >= 0 && j < pGrid.m_Height)
				{
					pGrid.m_pGrid[i + (j * w)] += _val;
				}				
			}
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Add the value to all cells in the disk with center (xm,ym) and radius r. 
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_multiply_disk(_id,_x,_y,_r,_val) 
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_disk)");
		return;
	}

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var i = 0;
	var j = 0;

	x1 = ~ ~(yymax(0.0, Math.floor(_x - _r)));
	x2 = ~ ~(yymin(this.m_Width - 1, Math.ceil(_x + _r)));
	y1 = ~ ~(yymax(0, Math.floor(_y - _r)));
	y2 = ~ ~(yymin(this.m_Height - 1, Math.ceil(_y + _r)));

	_r = _r * _r;
	var w = pGrid.m_Width;
	for (i = x1; i <= x2; i++)
	{
		var ix = (i - _x) * (i - _x);
		for (j = y1; j <= y2; j++)
		{
			var jy = j - _y;
			if (ix + (jy * jy) <= _r)
			{
				if (i >= 0 && i < pGrid.m_Width && j >= 0 && j < pGrid.m_Height)
				{
					pGrid.m_pGrid[i + (j * w)] *= _val;
				}				
			}
		}
	}
}



// #############################################################################################
/// Function:<summary>
///          	Common code for region copy
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_xpos"></param>
///			<param name="_ypos"></param>
///			<param name="_call"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_set_grid_region_Common(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos,_call) 
{
	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}

	var pSrcGrid = g_ActiveGrids.Get(_source);
	if (pSrcGrid == null || pSrcGrid  == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_grid_region)");
		return;
	}
	var pDestGrid = g_ActiveGrids.Get(_id);
	if (pDestGrid == null || pDestGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_grid_region)");
		return;
	}



	// Now actually loop through and do the "copy"
	for (var y = _y1; y <= _y2; y++)
	{
		var tempxpos = _xpos;
		var index = (y * pSrcGrid.m_Width) + _x1;
		for (var x = _x1; x <= _x2; x++)
		{
			if ((x >= 0 && x < pSrcGrid.m_Width && y >= 0 && y < pSrcGrid.m_Height) && (tempxpos >= 0 && tempxpos < pDestGrid.m_Width && _ypos >= 0 && _ypos < pDestGrid.m_Height))
			{
				_call( pDestGrid, (tempxpos + (_ypos * pDestGrid.m_Width)), pSrcGrid, index);
			}
			index++;
			tempxpos++;
		}
		_ypos++;
	}
}

// #############################################################################################
/// Function:<summary>
///          	Copies the contents of the cells in the region in grid source to grid id. 
///				xpos and ypos indicate the place where the region must be placed in the grid. 
///				(Can also be used to copy values from one place in a grid to another.)
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_xpos"></param>
///			<param name="_ypos"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_set_grid_region(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos) 
{
	ds_grid_set_grid_region_Common(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos,
		function myfunction(_pDestGrid, _destindex, _pGrid, _index) {
			_pDestGrid.m_pGrid[_destindex] = _pGrid.m_pGrid[_index];
		}
	);
}



// #############################################################################################
/// Function:<summary>
///          	SCopies the contents of the cells in the region in grid source to grid id. 
///				xpos and ypos indicate the place where the region must be placed in the grid. 
///				(Can also be used to copy values from one place in a grid to another.)
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_xpos"></param>
///			<param name="_ypos"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_add_grid_region(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos ) 
{
	ds_grid_set_grid_region_Common(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos,
		function myfunction(_pDestGrid, _destindex, _pGrid, _index) {
			_pDestGrid.m_pGrid[_destindex] += _pGrid.m_pGrid[_index];
		});
}

// #############################################################################################
/// Function:<summary>
///          	Multiplies the contents of the cells in the region in grid source to grid id. 
///				xpos and ypos indicate the place where the region must be multiplied in the grid. 
///				(id and source can be the same.) Only valid for numbers.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_xpos"></param>
///			<param name="_ypos"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_multiply_grid_region(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos, _val) {
	ds_grid_set_grid_region_Common(_id, _source, _x1, _y1, _x2, _y2, _xpos, _ypos,
		function myfunction(_pDestGrid, _destindex, _pGrid, _index) {
			_pDestGrid.m_pGrid[_destindex] *= _pGrid.m_pGrid[_index];
		}
		);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value of the indicated cell in the grid with the given id.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    ds_grid_get(_id,_x,_y)
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_get)");
		return;
	}

	if (_x < 0 || _x >= pGrid.m_Width || _y < 0 || _y >= pGrid.m_Height)
	{
		Error("Error: grid out of bounds(set): " + _id + " (" + _x + "," + _y + ")");
		return 0;
	}
	return pGrid.m_pGrid[_x + (_y * pGrid.m_Width)];
}


// #############################################################################################
/// Function:<summary>
///             "Common" grid "get" function
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_get_common(_id,_x1,_y1,_x2,_y2)                  
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid  == undefined){
		Error("Error: invalid ds_grid ID (ds_grid_get_sum)");
		return 0;
	}


	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if( _x1<0 ) _x1=0;
	if (_x1 >= pGrid.m_Width) _x1 = pGrid.m_Width - 1;
	if( _x2<0 ) _x2=0;
	if (_x2 >= pGrid.m_Width) _x2 = pGrid.m_Width - 1;



	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}
	if( _y1<0 ) _y1=0;
	if (_y1 >= pGrid.m_Height) _y1 = pGrid.m_Height - 1;
	if( _y2<0 ) _y2=0;
	if (_y2 >= pGrid.m_Height) _y2 = pGrid.m_Height - 1;


	g_Grid_max = g_Grid_min = g_Grid_value = g_Grid_mean = 0;
	var first = true;
	var count = 0;
    
	// Now actually loop through and do the "copy"
	for (var y = _y1; y <= _y2; y++)
	{
		var index = (y * pGrid.m_Width) + _x1;
		for (var x = _x1; x <= _x2; x++)
		{
			var v = pGrid.m_pGrid[index];
			if( first ){
				g_Grid_min = g_Grid_max = v;
				first = false;
			}else{
				if( g_Grid_min>v ) g_Grid_min=v;
				if( g_Grid_max<v ) g_Grid_max=v;
			}
			g_Grid_value += v;
			count++;
			index++;
		}
	}
	g_Grid_mean = g_Grid_value / count;
}

// #############################################################################################
/// Function:<summary>
///             Returns the sum of the values of the cells in the region in the grid with the 
///             given id. Does only work when the cells contain numbers.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    ds_grid_get_sum(_id,_x1,_y1,_x2,_y2)                  
{
	ds_grid_get_common(_id,_x1,_y1,_x2,_y2);
	return g_Grid_value;
}
// #############################################################################################
/// Function:<summary>
///             Returns the sum of the values of the cells in the region in the grid with the 
///             given id. Does only work when the cells contain numbers
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_get_max(_id,_x1,_y1,_x2,_y2)
{
	ds_grid_get_common(_id,_x1,_y1,_x2,_y2);
	return g_Grid_max;
}

// #############################################################################################
/// Function:<summary>
///             Returns the sum of the values of the cells in the region in the grid with the 
///             given id. Does only work when the cells contain numbers.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_get_min(_id,_x1,_y1,_x2,_y2) {
	ds_grid_get_common(_id, _x1, _y1, _x2, _y2);
	return g_Grid_min;
}


// #############################################################################################
/// Function:<summary>
///             Returns the sum of the values of the cells in the region in the grid with the 
///             given id. Does only work when the cells contain numbers.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_get_mean(_id,_x1,_y1,_x2,_y2) {
	ds_grid_get_common(_id, _x1, _y1, _x2, _y2);
	return g_Grid_mean;
}



// #############################################################################################
/// Function:<summary>
///          	"Common" disk function
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_get_disk_common(_id,_x,_y,_r)  
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_disk)");
		return;
	}

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var i = 0;
	var j = 0;

	x1 = ~ ~(yymax(0.0, Math.floor(_x - _r)));
	x2 = ~ ~(yymin(this.m_Width - 1, Math.ceil(_x + _r)));
	y1 = ~ ~(yymax(0, Math.floor(_y - _r)));
	y2 = ~ ~(yymin(this.m_Height - 1, Math.ceil(_y + _r)));

	var first = true;
	var count = 0;
	g_Grid_max = g_Grid_min = g_Grid_value = 0;
	_r = _r * _r;
	var w = pGrid.m_Width;
	for (i = x1; i <= x2; i++)
	{
		var ix = (i - _x) * (i - _x);
		for (j = y1; j <= y2; j++)
		{
			var jy = j - _y;
			if (ix + (jy * jy) <= _r)
			{
				if (i >= 0 && i < pGrid.m_Width && j >= 0 && j < pGrid.m_Height)
				{
					var v = pGrid.m_pGrid[i + (j * w)];
					if( first ){
						g_Grid_min = g_Grid_max = v;
						first = false;
					}else{
						if( g_Grid_min>v ) g_Grid_min=v;
						if( g_Grid_max<v ) g_Grid_max=v;
					}
					g_Grid_value += v;
					count++;
				}
			}
		}
	}
	g_Grid_mean = g_Grid_value / count;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the sum of the values of the cells in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_get_disk_sum(_id,_x,_y,_r)  
{
	ds_grid_get_disk_common(_id,_x,_y,_r);
	return g_Grid_value;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the max of the values of the cells in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_get_disk_max(_id,_x,_y,_r) 
{
	ds_grid_get_disk_common(_id,_x,_y,_r);
	return g_Grid_max;
}



// #############################################################################################
/// Function:<summary>
///          	Returns the min of the values of the cells in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_get_disk_min(_id,_x,_y,_r) {
	ds_grid_get_disk_common(_id, _x, _y, _r);
	return g_Grid_min;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the min of the values of the cells in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_get_disk_mean(_id, _x, _y, _r) 
{
	ds_grid_get_disk_common(_id, _x, _y, _r);
	return g_Grid_mean;
}




// #############################################################################################
/// Function:<summary>
///             Returns whether the value appears somewhere in the region.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_value_common(_id,_x1,_y1,_x2,_y2,_val) 
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid  == undefined){
		Error("Error: invalid ds_grid ID (ds_grid_get_sum)");
		return 0;
	}


	if (_x1 > _x2)
	{
		var t = _x1;
		_x1 = _x2;
		_x2 = t;
	}
	if( _x1<0 ) _x1=0;
	if (_x1 >= pGrid.m_Width) _x1 = pGrid.m_Width - 1;
	if( _x2<0 ) _x2=0;
	if (_x2 >= pGrid.m_Width) _x2 = pGrid.m_Width - 1;



	if (_y1 > _y2)
	{
		var t = _y1;
		_y1 = _y2;
		_y2 = t;
	}
	if( _y1<0 ) _y1=0;
	if (_y1 >= pGrid.m_Height) _y1 = pGrid.m_Height - 1;
	if( _y2<0 ) _y2=0;
	if (_y2 >= pGrid.m_Height) _y2 = pGrid.m_Height - 1;


	g_Grid_value_exists = false;
	g_Grid_value_x = -1;
	g_Grid_value_y = -1;

	for (var y = _y1; y <= _y2; y++)
	{
		var index = (y * pGrid.m_Width) + _x1;
		for (var x = _x1; x <= _x2; x++)
		{
		    var v = pGrid.m_pGrid[index];
		    if( (typeof(_val)=="number" && typeof(v)=="number") )
		    {
			    if (g_Precsision > abs(_val-v) )
			    {
				    g_Grid_value_exists = true;
				    g_Grid_value_x = x;
				    g_Grid_value_y = y;
			    }
			}else{
			    if ( _val == v  )
			    {
				    g_Grid_value_exists = true;
				    g_Grid_value_x = x;
				    g_Grid_value_y = y;
			    }
			}
			index++;
		}
	}
	return false;
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the value appears somewhere in the region.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_value_exists(_id, _x1, _y1, _x2, _y2, _val) 
{
	ds_grid_value_common(_id, _x1, _y1, _x2, _y2, _val);
	return g_Grid_value_exists;
}

// #############################################################################################
/// Function:<summary>
///             Returns the x-coordinate of the cell in which the value appears in the region.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_grid_value_x(_id,_x1,_y1,_x2,_y2,_val) {
	ds_grid_value_common(_id, _x1, _y1, _x2, _y2, _val);
	return g_Grid_value_x;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the y-coordinate of the cell in which the value appears in the region.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    ds_grid_value_y(_id,_x1,_y1,_x2,_y2,_val) {
	ds_grid_value_common(_id, _x1, _y1, _x2, _y2, _val);
	return g_Grid_value_y;
}


// #############################################################################################
/// Function:<summary>
///          	"Common" disk function
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_xm"></param>
///			<param name="_ym"></param>
///			<param name="_r"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_value_disk_common(_id, _x, _y, _r, _val) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_set_disk)");
		return;
	}

	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var i = 0;
	var j = 0;

	x1 = ~ ~(yymax(0.0, Math.floor(_x - _r)));
	x2 = ~ ~(yymin(this.m_Width - 1, Math.ceil(_x + _r)));
	y1 = ~ ~(yymax(0, Math.floor(_y - _r)));
	y2 = ~ ~(yymin(this.m_Height - 1, Math.ceil(_y + _r)));

	g_Grid_value_x = g_Grid_value_y = -1;
	g_Grid_value_exists = false;

	_r = _r * _r;
	var w = pGrid.m_Width;
	for (i = x1; i <= x2; i++)
	{
		var ix = (i - _x) * (i - _x);
		for (j = y1; j <= y2; j++)
		{
			var jy = j - _y;
			if (ix + (jy * jy) <= _r)
			{
				if (i >= 0 && i < pGrid.m_Width && j >= 0 && j < pGrid.m_Height)
				{
					var v = pGrid.m_pGrid[i + (j * w)];
		            if( (typeof(_val)=="number" && typeof(v)=="number") )
		            {
        			    if (g_Precsision > abs(_val-v) )
					    {
						    g_Grid_value_x = i;
						    g_Grid_value_y = j;
						    g_Grid_value_exists = true;
						    return;
    					}
    				}else{
					    if (v == _val)
					    {
						    g_Grid_value_x = i;
						    g_Grid_value_y = j;
						    g_Grid_value_exists = true;
						    return;
    					}
    				}
				}
			}
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether the value appears somewhere in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_value_disk_exists(_id,_x,_y,_r,_val) {
	ds_grid_value_disk_common(_id, _x, _y, _r, _val);
	return g_Grid_value_exists;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the x-coordinate of the cell in which the value appears in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    ds_grid_value_disk_x(_id,_x,_y,_r,_val) {
	ds_grid_value_disk_common(_id, _x, _y, _r, _val);
	return g_Grid_value_x;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the y-coordinate of the cell in which the value appears in the disk.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_r"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_value_disk_y(_id, _x, _y, _r, _val) {
	ds_grid_value_disk_common(_id, _x, _y, _r, _val);
	return g_Grid_value_y;
}

// #############################################################################################
/// Function:<summary>
///				Shuffles the values in the grid such that they end up in a random order.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_shuffle(_id) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_shuffle)");
		return;
	}

	pGrid.m_pGrid.sort(function () { return 0.5 - Math.random() });
}


// #############################################################################################
/// Function:<summary>
///          	Turns the data structure into a string and returns this string. The string can 
///				then be used to e.g. save it to a file. This provides an easy mechanism for saving 
///				data structures.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				JSON holding the grid object
///			</returns>
// #############################################################################################
function ds_grid_write(_id) 
{
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_write)");
		return;
	}
	s = JSON.stringify(pGrid);
	return s;
}



// #############################################################################################
/// Function:<summary>
///          	Reads the data structure from the given string (as created by the previous call).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_pJSON">The </param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_grid_read(_id, _pJSON) {
	var pGrid = g_ActiveGrids.Get(_id);
	if (pGrid == null || pGrid == undefined)
	{
		Error("Error: invalid ds_grid ID (ds_grid_read)");
		return;
	}
	pGrid = JSON.parse(_pJSON);
	g_ActiveGrids.Set(_id, pGrid);
}
                                                
                                                
                                                