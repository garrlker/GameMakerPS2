
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyPlayfield.js
// Created:         17/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Playfields hold lists of tiles, batched by depth
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/05/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Create a new
///          </summary>
// #############################################################################################
function    yyPlayfield( _depth )
{   
    this.depth = _depth;
    this.visible = true; 
    this.Tiles = new yyList();
}

// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfield.prototype.Add = function (_pTile) {
	this.Tiles.Add(_pTile);
};


// #############################################################################################
/// Function:<summary>
///             Delete a tile from the 
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfield.prototype.Delete = function (_pTile) {
	this.Tiles.DeleteItem(_pTile);
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
yyPlayfield.prototype.Draw = function () {
	for (var index in this.m_Tiles)
	{
		var pTile = this.m_Tiles[index];
		pTile.Draw();
	}
};


// #############################################################################################
/// Function:<summary>
///             Get the actual POOL of tiles
///          </summary>
///
/// Out:	 <returns>
///				the pool.
///			 </returns>
// #############################################################################################
yyPlayfield.prototype.GetPool = function () {
	return this.Tiles.pool;
};







// ##########################################################################################################################################################################################
// ##########################################################################################################################################################################################
/// Function:<summary>
///             Create a playfield manager
///          </summary>
// ##########################################################################################################################################################################################
// ##########################################################################################################################################################################################
function    yyPlayfieldManager()
{   
    this.m_Playfields = new yyOList();
    this.m_NextIndex = -1;
}




// #############################################################################################
/// Property: <summary>
///           	Find the playfield with the correct depth.
///           </summary>
///
/// In:		 <param name="_depth">Playfield depth</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.Get = function (_depth) {
	var pPlayfield;

	// Find playfield at tyile depth...
	for (var index = 0; index < this.m_Playfields.count; index++)
	{
		pPlayfield = this.m_Playfields.Get(index);
		if (pPlayfield.depth == _depth) return pPlayfield;
	}
	return null;
};

// #############################################################################################
/// Property: <summary>
///           	Delete the playfield with the depth provided.
///           </summary>
///
/// In:		 <param name="_depth">Playfield depth</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.Delete = function (_depth) {
	var pPlayfield = this.Get(_depth);
	if (pPlayfield)
	{
		m_Playfields.Delete(pPlayfield);
	}
};

// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.Add = function (_pTile) {
	var pPlayfield;

	// Find playfield at tyile depth...
	pPlayfield = this.Get(_pTile.depth);
	if (pPlayfield)
	{
		pPlayfield.Add(_pTile);
	}

	pPlayfield = new yyPlayfield(_pTile.depth);
	this.m_Playfields.Add(pPlayfield);
	pPlayfield.Add(_pTile);
};

// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.DeleteTile = function (_pTile) {
	// Find playfield at tyile depth...
	pPlayfield = this.Get(_pTile.depth);
	if (pPlayfield)
	{
		pPlayfield.Delete(_pTile);
	}
};


// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.GetFirst = function () {
	this.m_NextIndex = 0;
	return this.m_Playfields.Get(0);
};

// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
yyPlayfieldManager.prototype.GetNext = function () {
	this.m_NextIndex++;
	return this.m_Playfields.Get(this.nextindex);
};


// #############################################################################################
/// Property: <summary>
///           	Hide/Show a playfield
///           </summary>
// #############################################################################################
yyPlayfieldManager.prototype.SetPlayfieldVisibility = function (_depth, _vis) {
	var pPlayfield = this.Get(_pTile.depth);
	if (pPlayfield) pPlayfield.visible = (_vis >= 0.5);
};
