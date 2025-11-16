// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Sprite.js
// Created:         22/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 22/02/2011		V1.0        MJD     1st version
// 26/05/2011		V1.1        MJD     Rest of the functions added
// 
// **********************************************************************************************************************

var		MASK_PRECISE   = 0,
		MASK_RECTANGLE = 1,
		MASK_ELLIPSE   = 2,
		MASK_DIAMOND   = 3;


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
function    sprite_exists( _index )
{
    if( g_pSpriteManager.Get(_index) == null ) return false;
    return true;
}



// #############################################################################################
/// Function:<summary>
///             Get the width of a sprite
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the width of</param>
/// Out:	 <returns>
///				width of sprite, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_width( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.width;
}


// #############################################################################################
/// Function:<summary>
///             Get the width of a sprite
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the width of</param>
/// Out:	 <returns>
///				width of sprite, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_height( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.height;
}


// #############################################################################################
/// Function:<summary>
///             Get the NAME of a sprite
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the name of</param>
/// Out:	 <returns>
///				Name of sprite, or "" if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_name( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return "";
    return pSpr.pName;
}
function    sprite_name( _index ){ return sprite_get_name(_index); }

 


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
function    sprite_get_number( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.numb;
}


// #############################################################################################
/// Function:<summary>
///             Get the sprite's transparancy setting 
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the transparancy setting of</param>
/// Out:	 <returns>
///				Transparancy setting, or false if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_transparent( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.transparent;
}

// #############################################################################################
/// Function:<summary>
///             Get the sprite's x offset (X-Origin)
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the offset of</param>
/// Out:	 <returns>
///				X Offset, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_xoffset( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.xOrigin;
}

// #############################################################################################
/// Function:<summary>
///             Get the sprite's y offset (Y-Origin)
///          </summary>
///
/// In:		 <param name="_index">Index of sprite to get the offset of</param>
/// Out:	 <returns>
///				Y Offset, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_yoffset( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.yOrigin;
}


// #############################################################################################
/// Function:<summary>
///             Get the sprite's bounding box left edge
///          </summary>
///
/// In:		 <param name="_index">Index of sprite</param>
/// Out:	 <returns>
///				Left edge, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_bbox_left( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.bbox.left;
}


// #############################################################################################
/// Function:<summary>
///             Get the sprite's bounding box right edge
///          </summary>
///
/// In:		 <param name="_index">Index of sprite</param>
/// Out:	 <returns>
///				Right edge, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_bbox_right( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.bbox.right;
}



// #############################################################################################
/// Function:<summary>
///             Get the sprite's bounding box top edge
///          </summary>
///
/// In:		 <param name="_index">Index of sprite</param>
/// Out:	 <returns>
///				Top edge, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_bbox_top( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.bbox.top;
}


// #############################################################################################
/// Function:<summary>
///             Get the sprite's bounding box bottom edge
///          </summary>
///
/// In:		 <param name="_index">Index of sprite</param>
/// Out:	 <returns>
///				Bottom edge, or 0 if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_bbox_bottom( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return 0;
    return pSpr.bbox.bottom;
}


// #############################################################################################
/// Function:<summary>
///             Get the sprite's "precise" collision check
///          </summary>
///
/// In:		 <param name="_index">Index of sprite</param>
/// Out:	 <returns>
///				returns the precise setting, or false if not found.
///			 </returns>
// #############################################################################################
function    sprite_get_bbox_precise( _index )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return false;
    return pSpr.bbox.colcheck;
}



// #############################################################################################
/// Function:<summary>
///             Set the sprites X and Y offset (origin)
///          </summary>
///
/// In:		 <param name="_index">sprite index</param>
///			 <param name="_xoffset">x offset</param>
///			 <param name="_yoffset">y offset</param>
///				
// #############################################################################################
function    sprite_set_offset( _index, _xoffset, _yoffset )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr==null) return;
    pSpr.xOrigin = _xoffset;
    pSpr.yOrigin = _yoffset;
}


// #############################################################################################
/// Function:<summary>
///             Set the sprites bounding box
///          </summary>
///
/// In:		 <param name="_index">sprite index</param>
///			 <param name="_left">left edge</param>
///			 <param name="_top">top edge</param>
///			 <param name="_right">right edge</param>
///			 <param name="_bottom">bottom edge</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    sprite_set_bbox( _index, _left, _top, _right, _bottom )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr===null) return;
    pSpr.bbox.left = _left;
    pSpr.bbox.top  = _top;
    pSpr.bbox.right = _right;
    pSpr.bbox.bottom = _bottom;
}



// #############################################################################################
/// Function:<summary>
///             Set the sprite's "precise" collision check
///          </summary>
///
/// In:     <param name="_index">Index of sprite</param>
///         <param name="_preciese">true/false to enable or disable precise collision</param>
///
// #############################################################################################
function    sprite_set_precise( _index, _preciese )
{
    var pSpr = g_pSpriteManager.Get(_index);
    if( pSpr===null) return false;
    pSpr.bbox.colcheck = _preciese;
}





// #############################################################################################
/// Function:<summary>
///             Set the sprite's ALPHA using another sprite
///          </summary>
///
/// In:     <param name="_index">Index of sprite</param>
///         <param name="_spr"sprite to use</param>
///
// #############################################################################################
function    sprite_set_alpha_from_sprite( _dest, _src )
{
	var pDest = g_pSpriteManager.Get(_dest);
    if (pDest === null) return false;
    if (!pDest.copy)
    {
    	Error("Error: Can't set the alpha channel of normal sprite. It must 'duplicated' first");
    	return false; 					// can't change a non-duplicated sprite
    }
    var pDestTPE = pDest.ppTPE[0];

    var pSrc = g_pSpriteManager.Get(_src);
    if (pSrc === null) return false;
    var pSrcTPE = pSrc.ppTPE[0];


    CopyImageToAlpha(pDestTPE, pSrcTPE);
    return true;
}

// #############################################################################################
/// Function:<summary>
///             Grab a section from the screen and turn it into a sprite
///          </summary>
///
/// In:		 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_w"></param>
///			 <param name="_h"></param>
///			 <param name="_removeback"></param>
///			 <param name="_smooth"></param>
///			 <param name="_xorig"></param>
///			 <param name="_yorig"></param>
///				
// #############################################################################################
function    sprite_create_from_screen(_x,_y,_w,_h,_removeback,_smooth,_xorig,_yorig)
{
	var singleimage = document.createElement(g_CanvasName);
	var pGraphics = singleimage.getContext('2d');
	Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

	singleimage.width = canvas.width;
	singleimage.height = canvas.height;
	pGraphics._drawImage(canvas, 0, 0);
	singleimage.complete = true;

	// Create a new sprite
	var pNewSpr = new yySprite();
	var newindex = g_pSpriteManager.AddSprite(pNewSpr);

	pNewSpr.pName = "screen.copy";
	pNewSpr.width = singleimage.width;
	pNewSpr.height = singleimage.height;
	pNewSpr.bbox = new YYRECT();
	pNewSpr.bbox.right = pNewSpr.width;
	pNewSpr.bbox.bottom = pNewSpr.height;
	pNewSpr.transparent = true;
	pNewSpr.smooth = true;
	pNewSpr.preload = true;
	pNewSpr.bboxmode = 0;
	pNewSpr.colcheck = false;
	pNewSpr.xOrigin = _xorig;
	pNewSpr.yOrigin = _yorig;

	pNewSpr.copy = true;

	pNewSpr.numb = 1;
	pNewSpr.cullRadius = 0;
	pNewSpr.maskcreated = false;
	pNewSpr.sepmasks = false;
	pNewSpr.colmask = [];    					    // Mask used for precise collision checking
	pNewSpr.ppTPE = []; 							// pointer to TPageEntry
	pNewSpr.Masks = [];                             // Masks


	// Create a texture page entry.
	var pTPE = new yyTPageEntry();
	pNewSpr.ppTPE[0] = pTPE;
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = pNewSpr.width;
	pTPE.h = pNewSpr.height;
	pTPE.XOffset = 0;
	pTPE.YOffset = 0;
	pTPE.CropWidth = pTPE.w;
	pTPE.CropHeight = pTPE.h;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;

	pTPE.tp = Graphics_AddImage(singleimage);
	pTPE.texture = g_Textures[pTPE.tp];


	return newindex;
}

// #############################################################################################
/// Function:<summary>
///             CAdds an area of the screen as a next subimage to the sprite with index ind. 
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_w"></param>
///			 <param name="_h"></param>
///			 <param name="_removeback"></param>
///			 <param name="_smooth"></param>
///				
// #############################################################################################
function sprite_add_from_screen(_ind,_x,_y,_w,_h,_removeback,_smooth)
{
	var singleimage = document.createElement(g_CanvasName);
	var pGraphics = singleimage.getContext('2d');
	Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

	// Create a new sprite
	pNewSpr = g_pSpriteManager.Get(_ind);
	pNewSpr.numb++;

	// This sprite must be the same size as the ones that are already there!
	singleimage.width = pNewSpr.width;
	singleimage.height = pNewSpr.height;
	pGraphics._drawImage( canvas, _x,_y,_w,_h,    0,0,singleimage.width,singleimage.height);
	singleimage.complete = true;

	pNewSpr.numb++;

	// Create a texture page entry.
	var pTPE = new yyTPageEntry();
	pNewSpr.ppTPE[pNewSpr.ppTPE.length] = pTPE;
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = pNewSpr.width;
	pTPE.h = pNewSpr.height;
	pTPE.XOffset = 0;
	pTPE.YOffset = 0;
	pTPE.CropWidth = pTPE.w;
	pTPE.CropHeight = pTPE.h;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;

	pTPE.tp = Graphics_AddImage(singleimage);
	pTPE.texture = g_Textures[pTPE.tp];

	return _ind;
}


// #############################################################################################
/// Function:<summary>
///             Creates a sprite by copying the given area from the surface with the given id
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="w"></param>
///			 <param name="h"></param>
///			 <param name="removeback"></param>
///			 <param name="smooth"></param>
///			 <param name="xorig"></param>
///			 <param name="yorig"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_create_from_surface(_id, _x, _y, _w, _h, _removeback, _smooth, _xorig, _yorig)
{
	var singleimage = document.createElement(g_CanvasName);
	var pGraphics = singleimage.getContext('2d');
	Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

	singleimage.width = g_Surfaces.Get(_id).width;
	singleimage.height = g_Surfaces.Get(_id).height;
	pGraphics._drawImage(g_Surfaces.Get(_id), 0, 0);
	singleimage.complete = true;

	// Create a new sprite
	var pNewSpr = new yySprite();
	var newindex = g_pSpriteManager.AddSprite(pNewSpr);

	pNewSpr.pName = "surface.copy";
	pNewSpr.width = singleimage.width;
	pNewSpr.height = singleimage.height;
	pNewSpr.bbox = new YYRECT();
	pNewSpr.bbox.right = pNewSpr.width;
	pNewSpr.bbox.bottom = pNewSpr.height;
	pNewSpr.transparent = true;
	pNewSpr.smooth = true;
	pNewSpr.preload = true;
	pNewSpr.bboxmode = 0;
	pNewSpr.colcheck = false;
	pNewSpr.xOrigin = _xorig;
	pNewSpr.yOrigin = _yorig;

	pNewSpr.copy = true;

	pNewSpr.numb = 1;
	pNewSpr.cullRadius = 0;
	pNewSpr.maskcreated = false;
	pNewSpr.sepmasks = false;
	pNewSpr.colmask = [];    					    // Mask used for precise collision checking
	pNewSpr.ppTPE = []; 							// pointer to TPageEntry
	pNewSpr.Masks = [];                             // Masks


	// Create a texture page entry.
	var pTPE = new yyTPageEntry();
	pNewSpr.ppTPE[0] = pTPE;
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = pNewSpr.width;
	pTPE.h = pNewSpr.height;
	pTPE.XOffset = 0;
	pTPE.YOffset = 0;
	pTPE.CropWidth = pTPE.w;
	pTPE.CropHeight = pTPE.h;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;

	pTPE.tp = Graphics_AddImage(singleimage);
	pTPE.texture = g_Textures[pTPE.tp];


	return newindex;
}



// #############################################################################################
/// Function:<summary>
///             Adds an area of the surface id as a next subimage to the sprite with index ind
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_id"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_w"></param>
///			 <param name="_h"></param>
///			 <param name="_removeback"></param>
///			 <param name="_smooth"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_add_from_surface(_ind,_id,_x,_y,_w,_h,_removeback,_smooth)
{
	var singleimage = document.createElement(g_CanvasName);
	var pGraphics = singleimage.getContext('2d');
	Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

	// Create a new sprite
	pNewSpr = g_pSpriteManager.Get(_ind);
	pNewSpr.numb++;

	// This sprite must be the same size as the ones that are already there!
	singleimage.width = pNewSpr.width; 
	singleimage.height = pNewSpr.height;
	pGraphics._drawImage(g_Surfaces.Get(_id), 0, 0, _w, _h, 0, 0, singleimage.width, singleimage.height);
	singleimage.complete = true;


	// Create a NEw texture page entry at the end of the list
	var pTPE = new yyTPageEntry();
	pNewSpr.ppTPE[pNewSpr.ppTPE.length] = pTPE;
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = pNewSpr.width;
	pTPE.h = pNewSpr.height;
	pTPE.XOffset = 0;
	pTPE.YOffset = 0;
	pTPE.CropWidth = pTPE.w;
	pTPE.CropHeight = pTPE.h;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;

	pTPE.tp = Graphics_AddImage(singleimage);
	pTPE.texture = g_Textures[pTPE.tp];

	return _ind;
}



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_delete( _ind ) {
	g_pSpriteManager.Delete(_ind);
}



// #############################################################################################
/// Function:<summary>
///             Saves subimage subimg of sprite ind to the file with the name fname. 
///             This must be a .png file.
///          </summary>
///
/// In:		 <param name="_ind"></param>
///			 <param name="_subimg"></param>
///			 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_save(_ind,_subimg,_fname)
{
    MissingFunction("sprite_save()");
}



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_ind"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_duplicate(_ind) 
{
	var pSpr = g_pSpriteManager.Get(_ind);
	if (pSpr == null) return 0;

	var pNewSpr = new yySprite();
	var newindex = g_pSpriteManager.AddSprite(pNewSpr);

	pNewSpr.pName = pSpr.pName+".copy";
	pNewSpr.width =			pSpr.width;		
	pNewSpr.height = 		pSpr.height; 
	pNewSpr.bbox.Copy(pSpr.bbox);
	pNewSpr.transparent = 	pSpr.transparent;
	pNewSpr.smooth = 		pSpr.smooth;
	pNewSpr.preload = 		pSpr.preload;
	pNewSpr.bboxmode = 		pSpr.bboxmode;
	pNewSpr.colcheck = 		pSpr.colcheck;
	pNewSpr.xOrigin = 		pSpr.xOrigin; 
	pNewSpr.yOrigin = 		pSpr.yOrigin;

	pNewSpr.copy = true;

	pNewSpr.numb =			pSpr.numb; 
	pNewSpr.cullRadius = 	pSpr.cullRadius;
	pNewSpr.maskcreated = 	pSpr.maskcreated;
	pNewSpr.sepmasks =		pSpr.sepmasks; 
	pNewSpr.colmask = []; //Array.slice( 					    // Mask used for precise collision checking
	pNewSpr.ppTPE = []; 							    // pointer to TPageEntry
	pNewSpr.Masks = [];                                    // Masks
	//pNewSpr.bitmaps = [];


	// Loop though and copy all the images, AND create new texture page entries to point to the new images.
	for(var i=0;i<pSpr.numb;i++)
	{
		// Copy texture page entrys.
		var pTPE = new yyTPageEntry();
		pNewSpr.ppTPE[i] = pTPE;
		pTPE.copy( pSpr.ppTPE[i] );

		var pImage = Graphics_ExtractImage(pSpr.ppTPE[i]);
		pTPE.tp = Graphics_AddImage(pImage);
		pTPE.x = 0;
		pTPE.y = 0;
		pTPE.texture = g_Textures[pTPE.tp];
	}
	return newindex;
}


// #############################################################################################
/// Function:<summary>
///             Adds the image stored in the file fname to the set of sprite resources. 
///
///				Many different image file types can be dealt with. When the image is not a gif 
///				image it can be a strip containing a number of subimages for the sprite next to 
///				each other. 
///
///				Use imgnumb to indicate their number (1 for a single image). For 
///				gif images, this argument is not used; the number of images in the gif file is 
///				used instead. 
///
///				removeback indicates whether to make all pixels with the background 
///				color (left-bottom pixel) transparent. 
///
///				smooth indicates whether to smooth the edges. 
///
///				xorig and yorig indicate the position of the origin in the sprite. 
///
///				The function returns the index of the new sprite that you can then use to draw it 
///				or to assign it to the variable sprite_index of an instance. 
///				
///          </summary>
///
/// In:		 <param name="_filename">filename of image to load</param>
///			 <param name="_imgnumb">Number of images</param>
///			 <param name="_removeback">removeback indicates whether to make all pixels with the background color (left-bottom pixel) transparent. </param>
///			 <param name="_smooth">smooth indicates whether to smooth the edges</param>
///			 <param name="_xorig">X origin of the sprite</param>
///			 <param name="_yorig">Y origin of the sprite</param>
/// Out:	 <returns>
///				When an error occurs -1 is returned.
///			 </returns>
// #############################################################################################
function sprite_add(_filename, _imgnumb, _removeback, _smooth, _xorig, _yorig) {
	// Create a new sprite
	var pNewSpr = new yySprite();
	var newindex = g_pSpriteManager.AddSprite(pNewSpr);

	var image = Graphics_AddTexture(g_RootDir + _filename);
	g_Textures[image].onload = ASync_ImageLoad_Callback;
	g_Textures[image].onerror = ASync_ImageLoad_Error_Callback;

	g_pASyncManager.Add(newindex, _filename, ASYNC_SPRITE, g_Textures[image]);

	pNewSpr.pName = _filename;
	pNewSpr.width = -1;
	pNewSpr.height = -1;
	pNewSpr.bbox = new YYRECT();
	pNewSpr.bbox.right = 0; //pNewSpr.width;
	pNewSpr.bbox.bottom = 0; //pNewSpr.height;
	pNewSpr.transparent = _removeback;
	pNewSpr.smooth = _smooth;
	pNewSpr.preload = true;
	pNewSpr.bboxmode = 0;
	pNewSpr.colcheck = false;
	pNewSpr.xOrigin = _xorig;
	pNewSpr.yOrigin = _yorig;

	pNewSpr.copy = false;

	pNewSpr.numb = _imgnumb;
	pNewSpr.cullRadius = 0;
	pNewSpr.maskcreated = false;
	pNewSpr.sepmasks = false;
	pNewSpr.colmask = [];    					    // Mask used for precise collision checking
	pNewSpr.ppTPE = []; 							// pointer to TPageEntry
	pNewSpr.Masks = [];                             // Masks


	// Create a texture page entry.
	for (var i = 0; i < _imgnumb; i++)
	{
		var pTPE = new yyTPageEntry();
		pNewSpr.ppTPE[i] = pTPE;
		pTPE.x = 0;
		pTPE.y = 0;
		pTPE.w = 0;
		pTPE.h = 0;
		pTPE.XOffset = 0;
		pTPE.YOffset = 0;
		pTPE.CropWidth = 0;
		pTPE.CropHeight = 0;
		pTPE.ow = pTPE.w;
		pTPE.oh = pTPE.h;

		pTPE.tp = image;
		pTPE.texture = g_Textures[pTPE.tp];
	}

	return newindex;
}

// #############################################################################################
/// Function:<summary>
///             Adds the image stored in the file fname to the set of sprite resources. 
///
///				Many different image file types can be dealt with. When the image is not a gif 
///				image it can be a strip containing a number of subimages for the sprite next to 
///				each other. 
///
///				Use imgnumb to indicate their number (1 for a single image). For 
///				gif images, this argument is not used; the number of images in the gif file is 
///				used instead. 
///
///				removeback indicates whether to make all pixels with the background 
///				color (left-bottom pixel) transparent. 
///
///				smooth indicates whether to smooth the edges. 
///
///				xorig and yorig indicate the position of the origin in the sprite. 
///
///				The function returns the index of the new sprite that you can then use to draw it 
///				or to assign it to the variable sprite_index of an instance. 
///				
///          </summary>
///
/// In:		 <param name="_ind">index of sprite to replace</param>
///    		 <param name="_filename">filename of image to load</param>
///			 <param name="_imgnumb">Number of images</param>
///			 <param name="_removeback">removeback indicates whether to make all pixels with the background color (left-bottom pixel) transparent. </param>
///			 <param name="_smooth">smooth indicates whether to smooth the edges</param>
///			 <param name="_xorig">X origin of the sprite</param>
///			 <param name="_yorig">Y origin of the sprite</param>
/// Out:	 <returns>
///				When an error occurs -1 is returned.
///			 </returns>
// #############################################################################################
function sprite_replace(_ind, _filename, _imgnumb, _removeback, _smooth, _xorig, _yorig) {
	// Create a new sprite
	var pNewSpr = g_pSpriteManager.Get(_ind);

	var image = Graphics_AddTexture(g_RootDir + _filename);
	g_Textures[image].onload = ASync_ImageLoad_Callback;
	g_Textures[image].onerror = ASync_ImageLoad_Error_Callback;

	g_pASyncManager.Add(_ind, _filename, ASYNC_SPRITE, g_Textures[image]);

	pNewSpr.width = 0;
	pNewSpr.height = 0;
	pNewSpr.bbox = new YYRECT();
	pNewSpr.bbox.right = 0; 
	pNewSpr.bbox.bottom = 0;
	pNewSpr.transparent = _removeback;
	pNewSpr.smooth = _smooth;
	pNewSpr.preload = true;
	pNewSpr.bboxmode = 0;
	pNewSpr.colcheck = false;
	pNewSpr.xOrigin = _xorig;
	pNewSpr.yOrigin = _yorig;

	pNewSpr.copy = false;

	pNewSpr.numb = _imgnumb;
	pNewSpr.cullRadius = 0;
	pNewSpr.maskcreated = false;
	pNewSpr.sepmasks = false;
	pNewSpr.colmask = [];    					    // Mask used for precise collision checking
	pNewSpr.ppTPE = []; 							// pointer to TPageEntry
	pNewSpr.Masks = [];                             // Masks


	// Create a texture page entry.
	for (var i = 0; i < _imgnumb; i++)
	{
		var pTPE = new yyTPageEntry();
		pNewSpr.ppTPE[i] = pTPE;
		pTPE.x = 0;
		pTPE.y = 0;
		pTPE.w = 0;
		pTPE.h = 0;
		pTPE.XOffset = 0;
		pTPE.YOffset = 0;
		pTPE.CropWidth = 0;
		pTPE.CropHeight = 0;
		pTPE.ow = pTPE.w;
		pTPE.oh = pTPE.h;

		pTPE.tp = image;
		pTPE.texture = g_Textures[pTPE.tp];
	}

	return _ind;
}



// #############################################################################################
/// Function:<summary>
///             Merges the images from sprite ind2 into sprite ind1, adding them at the end. 
///				If the sizes don't match the sprites are stretched to fit. 
///				Sprite ind2 is not deleted!
///          </summary>
///
/// In:		 <param name="_ind">Sprite to  merge WITH</param>
///			 <param name="_spr">Sprite chain to append to _ind</param>
/// Out:	 <returns>
///				_ind
///			 </returns>
// #############################################################################################
function sprite_merge(_dest, _src) {

	// Create a new sprite
	var pDest = g_pSpriteManager.Get(_dest);
	var pSrc = g_pSpriteManager.Get(_src);

	var w = pDest.width;
	var h = pDest.height;

//	pNewSpr.numb = _imgnumb;
//	pNewSpr.Masks = [];                             // Masks

	// Now COPY all the textures/images over and create new textute page entrys for them.
	var grap = graphics;
	for (var i = 0; i < pSrc.numb; i++)
	{
		// Create a new canvas for copying the sprite over.
		var singleimage = document.createElement(g_CanvasName);
		var pGraphics = singleimage.getContext('2d');
		Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

		// Make it the correct size, and blit the image over. (streaching to fit)
		singleimage.width = w;
		singleimage.height = h;
		graphics = pGraphics;
		Graphics_DrawStretchedExt(pSrc.ppTPE[i], 0, 0, w, h, 0xffffff, 1.0);
		singleimage.complete = true;


		var pTPE = new yyTPageEntry();
		pDest.ppTPE[pDest.ppTPE.length] = pTPE;
		pTPE.x = 0;
		pTPE.y = 0;
		pTPE.w = w;
		pTPE.h = h;
		pTPE.XOffset = 0;
		pTPE.YOffset = 0;
		pTPE.CropWidth = 0;
		pTPE.CropHeight = 0;
		pTPE.ow = pTPE.w;
		pTPE.oh = pTPE.h;

		pTPE.tp = Graphics_AddImage(singleimage);
		pTPE.texture = g_Textures[pTPE.tp];

		pDest.numb++;
	}
	graphics = grap;


	return _dest;
}




// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_ind1"></param>
///			 <param name="_ind2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_assign(_ind1, _ind2)
{
	// Create a new sprite
	var pDest = g_pSpriteManager.Get(_ind1);
	var pSrc = g_pSpriteManager.Get(_ind2);

	pDest.width = pSrc.width;
	pDest.height = pSrc.height;
	pDest.bbox = new YYRECT();
	pDest.bbox.Copy( pSrc ); 
	pDest.transparent = pSrc.transparent;
	pDest.smooth = pSrc.smooth;
	pDest.preload = pSrc.preload;
	pDest.bboxmode = pSrc.bboxmode;
	pDest.colcheck = pSrc.colcheck;
	pDest.xOrigin = pSrc.xOrigin;
	pDest.yOrigin = pSrc.yOrigin;

	pDest.copy = true;

	pDest.numb = pSrc.numb;
	pDest.cullRadius = pSrc.cullRadius;
	pDest.maskcreated = pSrc.maskcreated ;
	pDest.sepmasks = pSrc.sepmasks;
	pDest.colmask = pSrc.colmask.slice(0);    					    // Mask used for precise collision checking	
	pDest.ppTPE = []; 							            // pointer to TPageEntry
	pDest.Masks = pSrc.Masks.slice();                       // Masks

	var w = pDest.width;
	var h = pDest.height;

	// Now COPY all the textures/images over and create new textute page entrys for them.
	var grap = graphics;
	for (var i = 0; i < pSrc.numb; i++)
	{
		// Create a new canvas for copying the sprite over.
		var singleimage = document.createElement(g_CanvasName);
		var pGraphics = singleimage.getContext('2d');
		Graphics_AddCanvasFunctions(pGraphics); 			// update for OUR functions.

		// Make it the correct size, and blit the image over. (streaching to fit)
		singleimage.width = w;
		singleimage.height = h;
		graphics = pGraphics;
		Graphics_DrawStretchedExt(pSrc.ppTPE[i], 0, 0, w, h, 0xffffff, 1.0);
		singleimage.complete = true;


		var pTPE = new yyTPageEntry();
		pDest.ppTPE[pDest.ppTPE.length] = pTPE;
		pTPE.x = 0;
		pTPE.y = 0;
		pTPE.w = w;
		pTPE.h = h;
		pTPE.XOffset = 0;
		pTPE.YOffset = 0;
		pTPE.CropWidth = 0;
		pTPE.CropHeight = 0;
		pTPE.ow = pTPE.w;
		pTPE.oh = pTPE.h;

		pTPE.tp = Graphics_AddImage(singleimage);
		pTPE.texture = g_Textures[pTPE.tp];

	}
	graphics = grap;

	return _ind1;
}




// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="sepmasks"></param>
///			 <param name="bboxmode"></param>
///			 <param name="bbleft"></param>
///			 <param name="bbright"></param>
///			 <param name="bbtop"></param>
///			 <param name="bbbottom"></param>
///			 <param name="kind"></param>
///			 <param name="tolerance"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function sprite_collision_mask( _ind, _sepmasks, _bbmode,_bbleft,_bbright,_bbtop,_bbbottom,_kind,_tolerance) 
{
    var pSpr = g_pSpriteManager.Get(_ind);
    if( pSpr===null) return false;
    if (true != pSpr.colcheck) return;

    // Clean up if required
    //if ( pSpr.colmask != null) pSpr.colmask = []; 
    pSpr.colmask = [];
    pSpr.sepmasks = _sepmasks;

    // Check whether there are any images
    pSpr.bbox = new YYRECT();
    if (pSpr.numb == 0)
    { 
        return;
    }

	// Create the bounding box
    if (_bbmode == 0)
    {
		// precise mode (should really look at the mask and get the bounds...)
		pSpr.bbox.left = 0;
		pSpr.bbox.right = pSpr.width;
		pSpr.bbox.top = 0;
		pSpr.bbox.bottom = pSpr.height;
	} else if (_bbmode == 1)
	{
		// full image
		pSpr.bbox.left = 0;
		pSpr.bbox.right = pSpr.width;
		pSpr.bbox.top = 0;
		pSpr.bbox.bottom = pSpr.height;
	} else
	{
		// user defined mode
		pSpr.bbox.left = _bbleft;
		pSpr.bbox.right = _bbright;
		pSpr.bbox.top = _bbtop;
		pSpr.bbox.bottom = _bbbottom; 	
	}


    // if bounding box mode, then don't assign sprites, just fill in the bounding box.
    if( _kind==1 ){
    }


    // Compute the mask(s)
    var ppTPE = pSpr.ppTPE;
    pSpr.colmask = [];
    if(pSpr.sepmasks)
    {
    	for (var i = 0; i < pSpr.numb; i++)
    	{
    		pSpr.colmask[i] = TMaskCreate(null, pSpr.ppTPE[i], _bbmode, pSpr.bbox, _kind, _tolerance);
        }
    }
    else
    {
        // If not separate masks, then OR them altogether. 
    	pSpr.colmask[0] = TMaskCreate(pSpr.colmask[0], pSpr.ppTPE[0], _bbmode, pSpr.bbox, _kind, _tolerance);
    
        for( var i=1;i<pSpr.numb;i++){
        	pSpr.colmask[0] = TMaskCreate(pSpr.colmask[0], pSpr.ppTPE[i], _bbmode, pSpr.bbox, _kind, _tolerance);
        }
    }
    
	// why?
    //pSpr.ComputeBoundingBox();
}
     


// #############################################################################################
/// Function:<summary>
///          	Create a byte array from a sprite that we can use for collision
///          </summary>
///
/// In:		<param name="_merge"></param>
///			<param name="_pTPE"></param>
///			<param name="_bbmode"></param>
///			<param name="_bbox"></param>
///			<param name="_kind"></param>
///			<param name="_tolerance"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function TMaskCreate(_merge, _pTPE, _bbmode, _bbox, _kind, _tolerance) 
{
	var w = _pTPE.ow;
	var h = _pTPE.oh;

	// get the image bytes
	var pData = [];
	var wh = h*w;
	for( j=0;j<wh;j++) pData[j] = false;	// clear the array


	if (_kind == MASK_PRECISE)
	{
		var pByteData = Graphics_ExtractImageBytes(_pTPE);
		var index = 0;
		for (var i = 0; i < pByteData.length; i+=4)
		{
			if (pByteData[i + 3] >= _tolerance) pData[index] = true; else pData[index] = false;
			index++;
		}
	}else{


		// Create the mask 
		switch (_kind)
		{
			case MASK_RECTANGLE:		{
											for(var y=_bbox.top;y<=_bbox.bottom;y++){
												for(var x=_bbox.left;x<=_bbox.right;x++){
													pData[x+(y*w)] = true;
												}
											}
											break;
										}

			case MASK_ELLIPSE:		{
											var mx = (_bbox.left + _bbox.right) / 2;
											var dx = mx-_bbox.left+0.5;
											var my = (_bbox.top + _bbox.bottom) / 2;
											var dy = my-_bbox.top+0.5;

											for(var y=_bbox.top;y<=_bbox.bottom;y++){
												for(var x=_bbox.left;x<=_bbox.right;x++){
													if( (dx > 0) && (dy > 0) ) {
														pData[x+(y*w)] = sqr( (x-mx)/dx) + sqr( (y-my)/dy ) < 1;
													}
												}
											}
											break;
										}

			case MASK_DIAMOND:				{
											var mx = (_bbox.left + _bbox.right) / 2;
											var dx = mx-_bbox.left+0.5;
											var my = (_bbox.top + _bbox.bottom) / 2;
											var dy = my-_bbox.top+0.5;

											for(var y=_bbox.top;y<=_bbox.bottom;y++){
												for(var x=_bbox.left;x<=_bbox.right;x++){
													if( (dx > 0) && (dy > 0) ) {
														pData[x+(y*w)] = Math.abs((x-mx)/dx) + Math.abs((y-my)/dy) < 1;
													}
												}
											}
											break;
										}

		}
  
	}

	// merge array is the same size as data... so just "OR" data in.
	if (_merge!=null){
		for (var i = 0; i < pData.length; i++){
			if (_merge[i]) pData[i] = true;
		}
	}
	return pData;
}



// #############################################################################################
/// Function:<summary>
///          	Set the sprite cache 
///          </summary>
///
/// In:		<param name="_ind"></param>
///			<param name="_max"></param>
///				
// #############################################################################################
function sprite_set_cache_size(_ind, _max) {
	var pSpr = g_pSpriteManager.Get(_ind);
	if (!pSpr) return false;

	var ppTPE = pSpr.ppTPE;
	for (var i = 0; i < pSpr.numb; i++)
	{
		if (ppTPE[i].maxcache > _max)
		{
			ppTPE[i].cache = [];
			ppTPE[i].count = 0;
		}
		ppTPE[i].maxcache = _max;
	}
}


// #############################################################################################
/// Function:<summary>
///          	Set the sprite cache 
///          </summary>
///
/// In:		<param name="_ind"></param>
///			<param name="_max"></param>
///				
// #############################################################################################
function sprite_set_cache_size_ext(_ind, _index, _max) {
	var pSpr = g_pSpriteManager.Get(_ind);
	if (!pSpr) return false;
	if (_index < 0 || _index > pSpr.numb) return;


	var pTPE = pSpr.ppTPE[_index];
	if (pTPE.maxcache > _max)
	{
		pTPE.cache = [];
		pTPE.count = 0;
	}
	pTPE.maxcache = _max;
}




