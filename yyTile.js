
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyTiles.js
// Created:         17/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/02/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Game Maker "ACTIVE" Room class
///          </summary>
// #############################################################################################
function    yyTile()
{   
    this.x = 0;                     // X coordinate
    this.y = 0;                     // Y coordinate
    this.index = 0;                 // Background index to use as the tileset
    this.xo = 0;                    // X texel index
    this.yo = 0;                    // Y texel index
    this.w = 0;                      // width in texels
    this.h = 0;                     // height in texels
    this.depth = 0.0;               // depth (acts as layer ID)
    this.id = g_DynamicTileID++;	// tile ID
    this.xscale = 1.0;              // tile X scale
    this.yscale = 1.0;              // tile Y scale
    this.blend = 0xffffff;          // colour blend
    this.alpha = 1.0;
    this.visible = true; 
}




// #############################################################################################
/// Function:<summary>
///             Create a tile from its "loaded" data
///          </summary>
///
/// In:		 <param name="_pTileStorage">Tile data</param>
///
// #############################################################################################
function    CreateTileFromStorage( _pTileStorage )
{
    //{ "x":0,  "y":0,  "index":2,  "xo":320,  "yo":0,  "w":64,  "h":64,  "depth":10,  "id":10000235,  },
    var pTile = new yyTile();

    //m_pStorage = _pTileStorage;
	if( _pTileStorage.x!=undefined ) pTile.x = _pTileStorage.x;
	if ( _pTileStorage.y!=undefined ) pTile.y = _pTileStorage.y;
	if( _pTileStorage.index!=undefined ) pTile.index = _pTileStorage.index;        
	if( _pTileStorage.xo!=undefined ) pTile.xo = _pTileStorage.xo;              
	if( _pTileStorage.yo!=undefined ) pTile.yo = _pTileStorage.yo;
	if( _pTileStorage.w!=undefined ) pTile.w = _pTileStorage.w;
	if( _pTileStorage.h!=undefined )  pTile.h= _pTileStorage.h;
	if( _pTileStorage.depth!=undefined ) pTile.depth = _pTileStorage.depth;
	if( _pTileStorage.id!=undefined ) pTile.id = _pTileStorage.id;
	if (_pTileStorage.xscale!=undefined) pTile.xscale = _pTileStorage.xscale;
    if (_pTileStorage.yscale!=undefined) pTile.yscale = _pTileStorage.yscale;
    if (_pTileStorage.alpha!=undefined) pTile.alpha = _pTileStorage.alpha;

	if (g_DynamicTileID < _pTileStorage.id) g_DynamicTileID = _pTileStorage.id + 1;
    return pTile;
}


// #############################################################################################
/// Function:<summary>
///            Draw the tile. 
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyTile.prototype.Draw = function () {
	var pImage = g_pBackgroundManager.GetImage(this.index);
	if (pImage != null)
	{
		var pTPE = pImage.TPEntry;
		if (pTPE.tp >= g_Textures.length) return;
		// if (!g_Textures[pTPE.tp].complete) return;

        // graphics.globalAlpha = this.alpha; // don't worry about this for now
		graphics.drawImage(g_Textures[pTPE.tp], pTPE.x + this.xo, pTPE.y + this.yo, this.w, this.h, this.x, this.y, this.w * this.xscale, this.h * this.yscale);
	}
};