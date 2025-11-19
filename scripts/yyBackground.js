
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyBackground.js
// Created:         24/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 24/02/2011		
// 
// **********************************************************************************************************************

// #############################################################################################
/// Function:<summary>
///             Initialise a background image from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    yyBackgroundImage()
{
	this.pName = "";
	this.transparent = false;
	this.smooth = false;
	this.preload = false;
	this.TPEntry = null;
}

// #############################################################################################
/// Function:<summary>
///             Initialise a background image from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function CreateBackgroundImageFromStorage(_pStorage) {
	var pImage = new yyBackgroundImage();
	pImage.pName = _pStorage.pName;
	if (_pStorage.transparent != undefined) pImage.transparent = _pStorage.transparent;
	if (_pStorage.smooth != undefined) pImage.smooth = _pStorage.smooth;
	if (_pStorage.preload != undefined) pImage.preload = _pStorage.preload;
	pImage.TPEntry = Graphics_GetTextureEntry(_pStorage.TPEntryIndex);
	return pImage;
};


// #############################################################################################
/// Function:<summary>
///             Initialise a background from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    yyBackground( _pStorage ) 
{
	this.Clear();

    if( _pStorage.visible != undefined) this.visible = _pStorage.visible;
    if( _pStorage.foreground!= undefined ) this.foreground = _pStorage.foreground;
    if( _pStorage.index != undefined) this.index = _pStorage.index;
    if( _pStorage.x != undefined) this.x = _pStorage.x;
    if( _pStorage.y != undefined) this.y = _pStorage.y;
    if( _pStorage.htiled != undefined) this.hTiled = _pStorage.htiled;
    if( _pStorage.vtiled != undefined) this.vTiled = _pStorage.vtiled;
    if( _pStorage.hspeed != undefined) this.hSpeed = _pStorage.hspeed;
    if( _pStorage.vspeed != undefined) this.vSpeed = _pStorage.vspeed;
    if (_pStorage.stretch != undefined) this.stretch = _pStorage.stretch;
    if (_pStorage.alpha != undefined) this.alpha = _pStorage.alpha;
    if (_pStorage.blend != undefined) this.blend = _pStorage.blend;
}

// #############################################################################################
/// Function:<summary>
///          	Reset/Clear the background
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
yyBackground.prototype.Clear = function () {
	this.visible = false;
	this.foreground = false;
	this.index = -1;
	this.x = 0;
	this.y = 0;
	this.hTiled = true;
	this.vTiled = true;
	this.hSpeed = 0;
	this.vSpeed = 0;
	this.xscale = 1;
	this.yscale = 1;
	this.stretch = false;
	this.alpha = 1.0;
	this.blend = 0xffffff;
};


// #############################################################################################
/// Function:<summary>
///             Create a new background manager
///          </summary>
// #############################################################################################
function yyBackgroundManager() {
	this.images = [];			// raw images. As many as needed.
	this.background = [];		// backgrounds attached to CURRENT room. (0..7)
	this.length = 0;
}





// #############################################################################################
/// Function:<summary>
///             Get a background from the manager
///          </summary>
///
/// In:		 <param name="_indexe">background to retrieve</param>
// #############################################################################################
yyBackgroundManager.prototype.GetImage = function (_index) {
	return this.images[_index];
};

// #############################################################################################
/// Function:<summary>
///             Get a background from the manager
///          </summary>
///
/// In:		 <param name="_indexe">background to retrieve</param>
// #############################################################################################
yyBackgroundManager.prototype.Get = function (_index) {
	return this.background[_index];
};

// #############################################################################################
/// Function:<summary>
///             Delete a background IMAGE
///          </summary>
///
/// In:		 <param name="_index">Index of image to delete</param>
// #############################################################################################
yyBackgroundManager.prototype.DeleteImage = function (_index) 
{
	// only delete it IF it has a value (saves adding entries to the array if theres nothing there).
	if (this.image[_index] != undefined){
		this.image[_index] = undefined;
	}
};

// #############################################################################################
/// Function:<summary>
///             Add a new background image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">background image Storage</param>
// #############################################################################################
yyBackgroundManager.prototype.Clear = function () {
	this.background = [];
	length = 0;
};

// #############################################################################################
/// Function:<summary>
///             Add a new background image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">background image Storage</param>
// #############################################################################################
yyBackgroundManager.prototype.AddImage = function (_pStorage) {
	var pBack = null;
	if (_pStorage != null)
	{
		pBack = CreateBackgroundImageFromStorage(_pStorage);
	}
	return this.AddBackgroundImage(pBack);
};


// #############################################################################################
/// Function:<summary>
///             Add a new background image into the pool
///          </summary>
///
/// In:		 <param name="_pBackground">background image Storage</param>
// #############################################################################################
yyBackgroundManager.prototype.AddBackgroundImage = function (_pBackground) 
{
	var i = this.images.length;
	this.images[i] = _pBackground;
	this.length = i+1;
	return i;
};

// #############################################################################################
/// Function:<summary>
///             Add a new background image into the pool
///          </summary>
///
/// In:		 <param name="_index">Index to "set"</param>
///    		 <param name="_pBackground">background image Storage</param>
// #############################################################################################
yyBackgroundManager.prototype.SetBackgroundImage = function (_index, _pBackground) 
{
	this.images[_index] = _pBackground;
};

// #############################################################################################
/// Function:<summary>
///             Add a new background image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">background image Storage</param>
// #############################################################################################
yyBackgroundManager.prototype.Add = function (_pStorage) {
	with (this)
	{
		var pBack = null;
		if (_pStorage != null)
		{
			pBack = new yyBackground(_pStorage);
		}
		background[background.length] = pBack;
	}
};




