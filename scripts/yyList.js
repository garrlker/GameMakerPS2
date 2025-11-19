
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyList.js
// Created:         17/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     A basic LIST object for us...
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/02/2011		V1.00		MJD		1st verison
// 14/07/2011		V1.01		MJD		changed functions to use "prototype"
//										removed all "with()" constructs
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Allocate an slot
///          </summary>
///
/// Out:	 <returns>
///				An object index
///			 </returns>
// #############################################################################################
function yyList( )
{
    this.pool = [];
    this.packing = false;
    this.length = 0;        // size of the ARRAY
    this.count = 0;         // number of elements IN the array
}


// #############################################################################################
/// Function:<summary>
///             Allocate an slot
///          </summary>
///
/// Out:	 <returns>
///				An object index
///			 </returns>
// #############################################################################################
yyList.prototype.Alloc = function () {
	for (var l = 0; l < this.pool.length; l++)
	{
		if (this.pool[l] == null) return l;    // Found some space...
	}
	return this.pool.length;                 // add a new one
};


// #############################################################################################
/// Function:<summary>
///             Add an item to the managers lists
///          </summary>
///
/// In:		 <param name="pObj">Object to add</param>
// #############################################################################################
yyList.prototype.Add = function (_pItem) {
	var index = this.Alloc();
	this.pool[index] = _pItem;
	this.count++;
	this.length = this.pool.length;
	return index;
};



// #############################################################################################
/// Function:<summary>
///             Get the item from the pool
///          </summary>
///
/// In:		 <param name="pObj">Object to add</param>
// #############################################################################################
yyList.prototype.Get = function (_objind) {
	if (_objind < 0 || _objind >= this.pool.length) return null;
	return this.pool[_objind];
};



// #############################################################################################
/// Function:<summary>
///             Find an item in the pool, and return its index
///          </summary>
///
/// In:		 <param name="pObj">Item to remove</param>
// #############################################################################################
yyList.prototype.FindItem = function (_item) {
	for (var l = 0; l < this.pool.length; l++)
	{
		if (this.pool[l] == _item) return l;
	}
};


// #############################################################################################
/// Function:<summary>
///             Delete an item from the pool by searching for it
///          </summary>
///
/// In:		 <param name="pObj">Item to remove</param>
// #############################################################################################
yyList.prototype.DeleteItem = function (_item) {
	for (var l = 0; l < this.pool.length; l++)
	{
		if (this.pool[l] == _item)
		{
			if (this.packing)
			{
				this.pool.splice(l, 1);
			} else
			{
				this.pool[l] = null;
			}
			this.count--;
			this.length = this.pool.length;
			return true;
			break;
		}
	}
	return false;
};



// #############################################################################################
/// Function:<summary>
///             Delete an item from the pool using it's index
///          </summary>
///
/// In:		 <param name="pObj">Items index to remove</param>
// #############################################################################################
yyList.prototype.DeleteIndex = function (_objind) {
	if (_objind < 0 || _objind >= this.pool.length) return false;
	if (this.packing)
	{
		this.pool.splice(_objind, 1);
	} else
	{
		this.pool[_objind] = null;
	}
	this.count--;
	this.length = this.pool.length;
	return true;
};

// #############################################################################################
/// Function:<summary>
///             clear the list (just remake it)
///          </summary>
// #############################################################################################
yyList.prototype.Clear = function () {
	this.pool = [];
	this.count = 0;
	this.length = this.pool.length;
};



// #############################################################################################
/// Function:<summary>
///             insert elements into the array
///          </summary>
// #############################################################################################
yyList.prototype.Insert = function (_index, _val) {
	if (_index < 0 || _index > this.pool.length) return;
	this.pool.splice(_index, 0, _val);
	this.count++;
	this.length = this.pool.length;

};


// #############################################################################################
/// Function:<summary>
///             Sets a value at the provided index
///          </summary>
// #############################################################################################
yyList.prototype.Set = function (_index, _val) {
	if (_index < 0 || _index >= this.pool.length) return;
	this.pool[_index] = _val;
};


// #############################################################################################
/// Function:<summary>
///             Sets a value at the provided index
///          </summary>
// #############################################################################################
yyList.prototype.Sort = function (_assend) {
	if (_assend)
	{
		this.pool.sort(function (a, b) { return a - b });
	} else
	{
		this.pool.sort(function (a, b) { return b - a });
	}
};


// #############################################################################################
/// Function:<summary>
///             Sets a value at the provided index
///          </summary>
// #############################################################################################
yyList.prototype.Randomize = function () {
	this.pool.sort(function () { return 0.5 - Math.random() });
};

// #############################################################################################
/// Function:<summary>
///             Sets a value at the provided index
///          </summary>
// #############################################################################################
yyList.prototype.Shuffle = function () {
	this.pool.sort(function () { return 0.5 - Math.random() });
};


