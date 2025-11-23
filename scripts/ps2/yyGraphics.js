// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyGraphics.js
// Created:         19/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     A set of global functions to control graphics. (no longer a class)
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 19/02/2011		V1.0		MJD		1st version
// 20/06/2011		V1.1		MJD		Removed all "class-ness" of it due to javascript speed issues - doesnt like with().
// 
// **********************************************************************************************************************

var	g_Canvas;
var g_Textures;
var	g_pTextureOffsets = null;

var g_DisplayWidth = 1024;
var g_DisplayHeight = 768;
var g_DisplayScaleX = 1;
var	g_DisplayScaleY = 1;


var	g_clipx = 0;
var	g_clipy = 0;
var	g_clipw = 0;
var	g_cliph = 0;
var	g_worldx = 0;
var	g_worldy = 0;
var	g_worldw = 0;
var	g_worldh = 0;
var	g_transform = [];
var g_GlobalFrameCount = 0;

var g_CacheWhite = 0xffffff;
var Graphics_TextureDrawSimple;
var Graphics_TextureDrawTiled;
var Graphics_SetViewPort;
var Graphics_SetViewArea;
var Graphics_SetTransform;
var Graphics_ClearScreen;
var Graphics_PushTransform;
var Graphics_DrawPart;



function    DisplayWidth(){ return g_DisplayWidth; }
function    DisplayHeight(){ return g_DisplayHeight; }

// #############################################################################################
/// Constructor: <summary>
///              	Add "our" canvas functions.
///					This helps obfuscation, and will shrink the code base.
///              </summary>
///
/// In:		<param name="_canvas">The canvas to "update"</param>
///
// #############################################################################################
function Graphics_AddCanvasFunctions(_graphics)
{
	debug("Graphics_AddCanvasFunctions");
	if( !_graphics ) return;

	_graphics._clip = () => debug("yyGraphics._clip CALLED")
	_graphics._rect = () => debug("yyGraphics._rect CALLED")

	_graphics._transform = _graphics.transform;
	_graphics._setTransform = _graphics.setTransform;
	_graphics._save = _graphics.save;
	_graphics._restore = _graphics.restore;
	_graphics._fillRect = _graphics.fillRect;
	_graphics._strokeRect = _graphics.strokeRect;
	_graphics._beginPath = _graphics.beginPath;
	_graphics._arc = _graphics.arc;
	_graphics._stroke = _graphics.stroke;
	_graphics._closePath = _graphics.closePath;
	_graphics.lineWidth = _graphics.lineWidth;
	_graphics._moveTo = _graphics.moveTo;
	_graphics._lineTo = _graphics.lineTo;
	_graphics._fill = _graphics.fill;
	_graphics._drawImage = _graphics.drawImage;
	_graphics._getImageData = _graphics.getImageData;
	_graphics._createImageData = _graphics.createImageData;
	_graphics._putImageData = _graphics.putImageData;
	// _graphics._clip = _graphics.clip;
	// _graphics._rect = _graphics.rect;
	/*_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;
	_graphics._ = _graphics.;*/
}

// #############################################################################################
/// Function:<summary>
///             Main graphics code. globals "canvas" and "graphics" must have been initialised.
///          </summary>
// #############################################################################################
function    Graphics_Init( _canvas )
{
    g_Textures = [];
    g_pTextureOffsets = null;

	g_clipx = 0;
	g_clipy = 0;
	g_clipw = 0;
	g_cliph = 0;

	g_worldx = 0;
	g_worldy = 0;
	g_worldw = 0;
	g_worldh = 0;

	g_transform = [];
	g_transform[0] = 1;
	g_transform[1] = 0;
	g_transform[2] = 0;
	g_transform[3] = 0;
	g_transform[4] = 1;
	g_transform[5] = 0;


    if( !g_WebGL ){

	    // Fill in RELEASE function pointers.
        if (CACHE_SINGLE_IMAGE)
        {
    	    Graphics_TextureDrawSimple = Graphics_TextureDrawSimple_Cache;
        } else
        {
    	    Graphics_TextureDrawSimple = Graphics_TextureDrawSimple_NoCache;
        }
        Graphics_TextureDrawTiled = Graphics_TextureDrawTiled_RELEASE;
        Graphics_TextureDraw = Graphics_TextureDraw_RELEASE;
        Graphics_SetViewPort = Graphics_SetViewPort_RELEASE;
        Graphics_SetViewArea = Graphics_SetViewArea_RELEASE;
        Graphics_SetTransform = Graphics_SetTransform_RELEASE;
        Graphics_ClearScreen = Graphics_ClearScreen_RELEASE;
        Graphics_PushTransform  = Graphics_PushTransform_RELEASE;
        Graphics_DrawPart = Graphics_DrawPart_RELEASE;
        Graphics_Save = Graphics_Save_RELEASE;
        Graphics_Restore = Graphics_Restore_RELEASE;
        Graphics_DrawText = Graphics_DrawText_RELEASE;



	    // Fill in DEBUG function pointers.
        if(DEBUG_MODE)
        {
    	    if (CACHE_SINGLE_IMAGE)
    	    {
			    // Make the white value slightly OFF white, so it caches a white image as well...
    		    g_CacheWhite = 0x1ffffff;
    		    Graphics_TextureDrawSimple = Graphics_TextureDrawSimple_Cache_DEBUG;
    	    } else
    	    {
    		    Graphics_TextureDrawSimple = Graphics_TextureDrawSimple_NoCache_DEBUG;
    	    }
    	    Graphics_TextureDrawTiled = Graphics_TextureDrawTiled_RELEASE;
    	    Graphics_TextureDraw = Graphics_TextureDraw_DEBUG;
        } 
    }else{
        InitWebGLFunctions();
    }
    
    
    Graphics_SetViewPort(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    Graphics_SetViewArea(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

    
}

function Graphics_Save_RELEASE(){ graphics._save(); }
function Graphics_Restore_RELEASE(){ graphics._restore(); }

// #############################################################################################
/// Function:<summary>
///          	Setup the texture offset array
///          </summary>
///
/// In:		<param name="_pTable">Pointer to the texture table</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	Graphics_SetEntryTable(_pTable)
{
	g_pTextureOffsets = _pTable;
    for(var i in _pTable)
    {
        var pTPE = _pTable[i];
        pTPE.cache = [];                // clear colour cache
        pTPE.count = 0;
        pTPE.maxcache= 4;				// Max number of times to cache this image.

        pTPE.vh_tile = 0;               // How is it tiled?
        pTPE.hvcached = null;           // tiling cache.

        pTPE.singleimage = null;             // clear colour cache
        pTPE.texture = g_Textures[pTPE.tp];	 // get raw pointe to texture.
    }
}

// #############################################################################################
/// Function:<summary>
///          	Create a cacheblock
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyCacheBlock() 
{
	this.pImage = null;
	this.lastused = 0;
}

// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_pTPE"></param>
///			<param name="_colour"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function Graphics_CacheBlock(_pTPE, _colour) 
{
	var pCacheBlock = _pTPE.cache[_colour];

	if(pCacheBlock != null)
	{
		pCacheBlock.lastused = g_GlobalFrameCount;
		return pCacheBlock.pImage;	
	}
	
	var usetime = -9999999999;
	pCacheBlock = null;
	FoundColour = -1;
	if( _pTPE.count<_pTPE.maxcache )
	{
		pCacheBlock = new yyCacheBlock();
		_pTPE.count++;
	}
	else{
		for(var i in _pTPE.cache)
		{
			var pBlock = _pTPE.cache[i];
			if (pBlock != null)
			{
				var t = g_GlobalFrameCount - pBlock.lastused;
				if (t > usetime)
				{
					FoundColour = i;
					pCacheBlock = pBlock;
					usetime = t;
				}
			}
		}
	}
	if (FoundColour > 0) _pTPE.cache[FoundColour] = null;

	_pTPE.cache[_colour] = pCacheBlock;
	pCacheBlock.lastused = g_GlobalFrameCount;
	pCacheBlock.pImage = Graphics_ColouriseImage(_pTPE, _colour);
	return pCacheBlock.pImage;
}

// #############################################################################################
/// Function:<summary>
///             "Get" an offset
///          </summary>
// #############################################################################################
function    Graphics_GetTextureEntry( _index )
{
	return g_pTextureOffsets[_index];
}


// #############################################################################################
/// Function:<summary>
///          	Sets the current g_transform...
///          </summary>
// #############################################################################################
function Graphics_SetTransform_RELEASE() 
{
    graphics._setTransform(g_transform[0], g_transform[3], g_transform[1], g_transform[4], g_transform[2], g_transform[5]);
}


// #############################################################################################
/// Function:<summary>
///				Clear the region in the indicated color
///          </summary>
///
/// In:		 <param name="col">Colour to clear the screen with</param>
// #############################################################################################
function Graphics_ClearScreen_RELEASE(_col)
{
	debug("Graphics_ClearScreen_RELEASE", _col);
		// We can cheat here a bit
    // graphics._save();

    // var trans = [];
    // trans[0] = 1;
    // trans[1] = 0;
    // trans[2] = 0;
    // trans[3] = 1;
    // trans[4] = 0;
    // trans[5] = 0;
    // graphics._setTransform(trans[0], trans[1], trans[2], trans[3], trans[4], trans[5]);

    // graphics.fillStyle = GetHTMLRGB(_col|0xff000000);
		// graphics._fillRect(g_clipx, g_clipy, g_clipw, g_cliph);
		// graphics.fillStyle = 0xf00;
		// let fillStyle = graphics.fillStyle;
		// console.log("fillStyle", fillStyle);
		// graphics.fillStyle = (_col);
		Screen.clear(_col);
		// graphics.fillStyle = fillStyle;
        
    // graphics._restore();
}

// #############################################################################################
/// Function:<summary>
///          	This specifies the CLIP region, and is in screen pixels.
///          </summary>
///
/// In:		<param name="_portx"></param>
///			<param name="_porty"></param>
///			<param name="_portw"></param>
///			<param name="_porth"></param>
///				
// #############################################################################################
function Graphics_SetViewPort_RELEASE(_portx, _porty, _portw, _porth)
{
    g_clipx = _portx;
    g_clipy = _porty;
    g_clipw = _portw;
    g_cliph = _porth;
}

// #############################################################################################
/// Function:<summary>
///          	Specify a "region" to look at in the world.
///          </summary>
///
/// In:		<param name="_wolrdx"></param>
///			<param name="_worldy"></param>
///			<param name="_worldw"></param>
///			<param name="_worldh"></param>
///				
// #############################################################################################
function Graphics_SetViewArea_RELEASE(_worldx, _worldy, _worldw, _worldh) 
{
    g_transform[0] = 1;
    g_transform[1] = 0;
    g_transform[2] = 0;
    g_transform[3] = 1;
    g_transform[4] = 0;
    g_transform[5] = 0;
    graphics._setTransform(g_transform[0], g_transform[1], g_transform[2], g_transform[3], g_transform[4], g_transform[5]);

    graphics._beginPath();
    graphics._rect(g_clipx, g_clipy, g_clipw, g_cliph);
    graphics._clip();
    
    var w = g_clipw / _worldw;
    var h = g_cliph / _worldh;

    g_worldx = _worldx;
    g_worldy = _worldy;
    g_worldw = _worldw;
    g_worldh = _worldh;

    g_transform[0] = w;
    g_transform[1] = 0;
    g_transform[2] = -(_worldx*w) + g_clipx;

    g_transform[3] = 0;
    g_transform[4] = h;
    g_transform[5] = -(_worldy*h) + g_clipy;

    Graphics_SetTransform();
}





// #############################################################################################
/// Function:<summary>
///             Add a texture to the "pool"
///          </summary>
///
/// In:		 <param name="_name">Name+path of texture to load</param>
/// Out:	 <returns>
///				The index it's assigned to.
///			 </returns>
// #############################################################################################
function    Graphics_AddTexture( _name )
{
	var i = g_Textures.length;
	var texture = new Image(_name);
	texture.src = _name;
	g_Textures[i] = texture;
	return i;
}

// #############################################################################################
/// Function:<summary>
///             Adds an IMAGE to the texture pool.
///          </summary>
///
/// In:		 <param name="_pImage">dynamically created image to add</param>
/// Out:	 <returns>
///				The "index" it's assigned to.
///			 </returns>
// #############################################################################################
function Graphics_AddImage(_pImage) 
{
	var i = g_Textures.length;
	g_Textures[i] = _pImage;
	return i;
}


// #############################################################################################
/// Function:<summary>
///             Begin rendering
///          </summary>
// #############################################################################################
function    Graphics_StartFrame()
{
	g_GlobalFrameCount++;
}

// #############################################################################################
/// Function:<summary>
///             End rendering
///          </summary>
// #############################################################################################
function    Graphics_EndFrame()
{

}


// #############################################################################################
/// Function:<summary>
///				Sets the correct view area in the world angle is the rotation
///				in degrees counter-clockwise
///          </summary>
///
/// In:		 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="w"></param>
///			 <param name="h"></param>
///			 <param name="angle"></param>
///				
// #############################################################################################
function    GR_D3D_Set_View_Area(_x, _y, _w, _h, _angle)
{
/*	Matrix m;

	m.Unit();

	Vector3 V1( (x+w/2.0f), (y+h/2.0f), -16000.0f ); 
	Vector3 V2( (x+w/2.0f), (y+h/2.0f), 0.0f );
	Vector3 V3(sinf( -angle*(Pi/180.0f)), cosf( -angle*(Pi/180.0f) ), 0.0f );

	Matrix::LookAtLH( &m, &V1, &V2, &V3 );
	Graphics::SetMatrix( eM_View, (float*)&m );

	Matrix::OrthoLH( &m, w, -h*g_RenderTargetActive, 1.0f, 32000.0f );
	Graphics::SetMatrix( eM_Projection, (float*)&m );
*/	
}


// #############################################################################################
/// Function:<summary>
///          	Extract and image from a texture page into it's "own" single image.
///          </summary>
///
/// In:		<param name="_pTPE">Texture page entry to extract</param>
/// Out:	<returns>
///				A "singleimage" to use.
///			</returns>
// #############################################################################################
function    Graphics_ExtractImage(_pTPE)
{
    var singleimage = document.createElement(g_CanvasName);
    var pImg = singleimage.getContext('2d');   
    Graphics_AddCanvasFunctions(pImg);


    singleimage.width = _pTPE.w;
    singleimage.height = _pTPE.h;
    pImg._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, 0, 0, _pTPE.w, _pTPE.h);
    singleimage.complete = true;
    return singleimage;
}



// #############################################################################################
/// Function:<summary>
///          	Extract and image into a RAW byte array (ARGB format)
///          </summary>
///
/// In:		<param name="_pTPE">Texture page entry to extract</param>
/// Out:	<returns>
///				A "singleimage" to use.
///			</returns>
// #############################################################################################
function Graphics_ExtractImageBytes(_pTPE) {
	var singleimage = document.createElement(g_CanvasName);
	var pImg = singleimage.getContext('2d');
	Graphics_AddCanvasFunctions(pImg);


	// First allocate and fill the TOTAL size of the original image.
	var pData = [];
	var tot=_pTPE.ow* _pTPE.oh * 4;
	for(var i=0;i<tot;i++) pData[i]=0;

	singleimage.width = _pTPE.w;
	singleimage.height = _pTPE.h;
	pImg._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, 0, 0, _pTPE.w, _pTPE.h);
	singleimage.complete = true;


    var data, sdata, imagedata, ddata;

    // This function cannot be called if the image is not from the same domain. You'll get security error if you do. ?!?!?
    try
    {
    	data = pImg.getImageData(0, 0, _pTPE.w, _pTPE.h);
    } catch (ex)
    {
    	return pData;
    }
    pSrcData = data.data;



	var baseindex = (_pTPE.XOffset + (_pTPE.YOffset * _pTPE.ow)) * 4;
	for (y = 0; y < _pTPE.h; y++)
	{
		var bindex = baseindex;
		var imageindex = (y*data.width)*4;
		var ww = _pTPE.w*4;
		for (x = 0; x < ww; x++)
		{
			pData[bindex++] = pSrcData[imageindex++];
		}
		baseindex += _pTPE.ow*4;
	}

	return pData;
}

// #############################################################################################
/// Function:<summary>
///             Draw a simple texture map
///          </summary>
///
/// In:		 <param name="id"></param>
///			 <param name="pTPE"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Graphics_TextureDrawSimple_Cache(_pTPE, _x, _y, _alpha) 
{
	if (_pTPE.singleimage == null) _pTPE.singleimage = Graphics_ExtractImage(_pTPE);
	
	_x += _pTPE.XOffset;
	_y += _pTPE.YOffset;
	graphics.globalAlpha = _alpha;

	graphics._drawImage(_pTPE.singleimage, _x, _y);
}

// Cache the image - debug mode
function Graphics_TextureDrawSimple_Cache_DEBUG(_pTPE, _x, _y, _alpha)
{
	if (!_pTPE.texture) return;
	if (!_pTPE.texture.complete) return;

	Graphics_TextureDrawSimple_Cache(_pTPE, _x, _y, _alpha);
}


// Non-cached, release mode
function Graphics_TextureDrawSimple_NoCache(_pTPE, _x, _y, _alpha) 
{  
	graphics.globalAlpha = _alpha;
	graphics._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, Math.floor(_x) + _pTPE.XOffset, Math.floor(_y) + _pTPE.YOffset, _pTPE.CropWidth, _pTPE.CropHeight);
}

// No cached, debug mode
function Graphics_TextureDrawSimple_NoCache_DEBUG(_pTPE, _x, _y, _alpha) 
{
	if (!_pTPE.texture) return;
	if (!_pTPE.texture.complete) return;

	Graphics_TextureDrawSimple_NoCache(_pTPE, _x, _y, _alpha)
}



// #############################################################################################
/// Function:<summary>
///             Draw a texture tiled across the screen. This creates a "cache" of the large image
///				to save drawing it many times.
///          </summary>
///
/// In:		 <param name="id"></param>
///			 <param name="pTPE"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	Graphics_TextureDrawTiled_RELEASE( _pTPE, _x, _y, vtile, htile ) {

	var pTexture = _pTPE.texture;

	if (!pTexture) return;
	if (!pTexture.complete) return;
    



    var i = 0;
    if( vtile ) i = 1;
    if( htile ) i |= 2; 


    // tiled?        
    if( i==0 )
    {
	    graphics._drawImage(pTexture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, _x + _pTPE.XOffset, _y + _pTPE.YOffset, _pTPE.CropWidth, _pTPE.CropHeight);
        return;
    }
        
	var w = _pTPE.ow;
	var h = _pTPE.oh;
	if (vtile)
	{
		w = (((((g_pCurrentView.worldw + (_pTPE.ow - 1)) / _pTPE.ow) & 0xffffffff) + 2) * _pTPE.ow);
		//_x = (_x + g_worldx) - ( (~~((_x + g_worldx) / _pTPE.ow))*_pTPE.ow);
		_x = (((~ ~(g_worldx / _pTPE.ow)) * _pTPE.ow) + (~ ~_x) % _pTPE.ow) - _pTPE.ow;
	}
	if (htile)
	{
		h = (((((g_pCurrentView.worldh + (_pTPE.oh - 1)) / _pTPE.oh) & 0xffffffff) + 2) * _pTPE.oh);
		//_y = (_y + g_worldy) - ( (~ ~((_y + g_worldy) / _pTPE.oh)) * _pTPE.oh);
		_y = (((~ ~(g_worldy / _pTPE.oh)) * _pTPE.oh) + (~ ~_y) % _pTPE.oh) - _pTPE.oh;
	}

    if ((_pTPE.hvcached != null) && (_pTPE.hvcached.width < w || _pTPE.hvcached.height < h))
    {
        _pTPE.hvcached = null;
        _pTPE.vh_til = 0;
    }

    // How is it tiled? 
    if( (_pTPE.vh_tile != i)  || (!_pTPE.hvcached) )
    {
        _pTPE.vh_tile = i;           
            
        var buffer = document.createElement(g_CanvasName);
        var pImg = buffer.getContext('2d');           
		Graphics_AddCanvasFunctions(pImg);

        buffer.width  = w;
        buffer.height = h;

        var cx = w/_pTPE.ow;
        var cy = h/_pTPE.oh;
		for(var y=0;y<cy;y++)
		{
			for(var x=0;x<cx;x++)
			{
            	pImg._drawImage(pTexture, _pTPE.x, _pTPE.y, _pTPE.CropWidth, _pTPE.CropHeight, _pTPE.XOffset + (x * _pTPE.ow), _pTPE.YOffset + (y * _pTPE.oh), _pTPE.CropWidth, _pTPE.CropHeight);
			}
		}

        _pTPE.hvcached = buffer;

    }

    graphics._drawImage(_pTPE.hvcached, _x, _y );
}


// #############################################################################################
/// Function:<summary>
///          	Create a "full" matrix and use "push" it.
///          </summary>
///
/// In:		 <param name="_x">X location</param>
///			 <param name="_y">Y location</param>
///			 <param name="_xs">X scale</param>
///			 <param name="_ys">Y scale</param>
///			 <param name="_angle">angle in radians/</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Graphics_PushTransform_RELEASE( _x,_y, _xs,_ys, _angle ) 
{
	var trans = [];

    trans[0] = Math.cos(_angle);
    trans[3] = Math.sin(_angle);
    trans[1] = -trans[3];
    trans[4] = trans[0];

    trans[0] *= _xs;
    trans[3] *= _xs;

    trans[1] *= _ys;
    trans[4] *= _ys;

    trans[2] = _x;
    trans[5] = _y;

    graphics._transform( trans[0], trans[3], trans[1], trans[4], trans[2], trans[5] );
}


// #############################################################################################
/// Function:<summary>
///             Draws the texture
///          </summary>
///
/// In:		 <param name="pTPE">Texture page entry</param>
///			 <param name="xorig">The X origin of the texture</param>
///			 <param name="yorig">The Y origin of the texture</param>
///			 <param name="x">the X position to put th origin on</param>
///			 <param name="y">the X position to put th origin on</param>
///			 <param name="xsc">X Scale are the scale factor in x- and y- direction</param>
///			 <param name="ysc">Y Scale are the scale factor in x- and y- direction</param>
///			 <param name="rot">rot is the rotation angle (counterclockwise in radians)</param>
///			 <param name="col">col is the blend color</param>
///			 <param name="_alpha">alpha is the alpha transparency value (0-1)</param>
///				
// #############################################################################################
function Graphics_TextureDraw_RELEASE(_pTPE, _xorig, _yorig, _x, _y, _xsc, _ysc, _rot, _col, _alpha)
{
	debug("Graphics_TextureDraw_RELEASE")
	// if (!_pTPE.texture.complete) return;
	if ( (abs(_xsc) <= 0.0001) || (abs(_ysc) <= 0.0001) || (_alpha<=0) ) return;

    _col = _col & 0xffffff;

		// TODO: Was at my wits end over colors not working, let's not leave this in here leaking memory forever
		const textureColor = Color.new(
			_col & 0xFF,
			(_col >> 8) & 0xFF,
			(_col >> 16) & 0xFF,
			255 * _alpha
		);

    var ox = -(_xorig-_pTPE.XOffset);
    var oy = -(_yorig-_pTPE.YOffset);

    // No caching here, let athena handle it

    // If coloured, then cache a "colourised" version
    graphics.globalAlpha = _alpha;
    // if (_col != g_CacheWhite)
    // {
    // 	var cached_image = Graphics_CacheBlock(_pTPE, _col);

    // 	if (cached_image != null)
    // 	{
    // 		if (Math.abs(_rot) < 0.001 && _ysc == 1 && _xsc == 1)
    // 		{
    // 			graphics._drawImage(cached_image, 0, 0, _pTPE.w, _pTPE.h, (_x + (ox * _xsc)), (_y + (oy * _ysc)), (_pTPE.CropWidth * _xsc), (_pTPE.CropHeight * _ysc));
    // 		} else
    // 		{
    // 			Graphics_PushTransform(_x, _y, _xsc, _ysc, -_rot);
    // 			graphics._drawImage(cached_image, 0, 0, _pTPE.w, _pTPE.h, ox, oy, _pTPE.CropWidth, _pTPE.CropHeight);
    // 			Graphics_SetTransform();
    // 		}
    // 	}
    // } else
    // {
		let tempCol = _pTPE.texture.color;
		_pTPE.texture.color = textureColor;
    	if (Math.abs(_rot) < 0.001 && _ysc == 1 && _xsc == 1)
    	{
    		// If we don't have an angle, draw normally
    		graphics._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, _x + (ox * _xsc), _y + (oy * _ysc), (_pTPE.CropWidth * _xsc), (_pTPE.CropHeight * _ysc));
    	}
    	else
    	{
    		Graphics_PushTransform(_x, _y, _xsc, _ysc, -_rot);
				_pTPE.texture.angle = _rot;
    		graphics._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, ox, oy, _pTPE.CropWidth, _pTPE.CropHeight);
				_pTPE.texture.angle = 0;
				Graphics_SetTransform();
    	}
		_pTPE.texture.color = tempCol;
    // }
}
	    
function    Graphics_TextureDraw_DEBUG( _pTPE, _xorig, _yorig, _x, _y, _xsc, _ysc, _rot, _col, _alpha)
{
	if (!_pTPE.texture) return;

	try
	{
	    Graphics_TextureDraw_RELEASE(_pTPE.texture, _xorig, _yorig, _x, _y, _xsc, _ysc, _rot, _col, _alpha)
	}
	catch (ex)
	{
		debug("error drawing image");
	} 
}

	
	
// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_pTPE"></param>
///			 <param name="_col"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    Graphics_ColouriseImage( _pTPE, _col )
{
    var buffer = document.createElement(g_CanvasName);
    var pImg = buffer.getContext('2d');
    Graphics_AddCanvasFunctions(pImg); 			// update for OUR functions.
        
    buffer.width = _pTPE.w;
    buffer.height = _pTPE.h;
    pImg._drawImage( _pTPE.texture,  _pTPE.x, _pTPE.y,_pTPE.w,_pTPE.h,   0,0,_pTPE.w,_pTPE.h);

    if (~~_col != 0xffffff)
    {
    	var data, sdata, imagedata, ddata;
    	try
    	{
    		// This function cannot be called if the image is not from the same domain. You'll get security error if you do. ?!?!?
    		data = pImg._getImageData(0, 0, _pTPE.w, _pTPE.h);
    	} catch (ex)
    	{
    		return buffer;
    	}
    	sdata = data.data;

    	imageData = pImg._createImageData(_pTPE.w, _pTPE.h);
    	ddata = imageData.data;

    	var r = ((_col >> 16) & 0xff) / 255;
    	var g = ((_col >> 8) & 0xff) / 255;
    	var b = (_col & 0xff) / 255;
    	var total = (data.height * data.width * 4);
    	for (var i = total - 4; i >= 00; i -= 4)
    	{
    		ddata[i] = (sdata[i] * r) | 0;
    		ddata[i + 1] = (sdata[i + 1] * g) | 0;
    		ddata[i + 2] = (sdata[i + 2] * b) | 0;
    		ddata[i + 3] = (sdata[i + 3]);
    	}
    	imageData.data = ddata;
    	pImg._putImageData(imageData, 0, 0);
    }
    return buffer;
}

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="id"></param>
///			 <param name="pTPE"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Graphics_TextureDrawPos(_pTPE, _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _alpha) {

	var pTexture = _pTPE.texture;

	if (!pTexture) return;
	if (!pTexture.complete) return;

	graphics.globalAlpha = _alpha;
	drawTexturedTriangle(pTexture, _x1, _y1, _x2, _y2, _x3, _y3, _pTPE.x, _pTPE.y, _pTPE.x + _pTPE.w, _pTPE.y, _pTPE.x + _pTPE.w, _pTPE.y + _pTPE.h);
	drawTexturedTriangle(pTexture, _x3, _y3, _x4, _y4, _x1, _y1, _pTPE.x + _pTPE.w, _pTPE.y + _pTPE.h, _pTPE.x, _pTPE.y + _pTPE.h, _pTPE.x, _pTPE.y);
}


// #############################################################################################
/// Function:<summary>
///          	Draw a textured triangle...Slow, use with care.
///          </summary>
///
/// In:		<param name="im"></param>
///			<param name="x0"></param>
///			<param name="y0"></param>
///			<param name="x1"></param>
///			<param name="y1"></param>
///			<param name="x2"></param>
///			<param name="y2"></param>
///			<param name="sx0"></param>
///			<param name="sy0"></param>
///			<param name="sx1"></param>
///			<param name="sy1"></param>
///			<param name="sx2"></param>
///			<param name="sy2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function drawTexturedTriangle(im, x0, y0, x1, y1, x2, y2, sx0, sy0, sx1, sy1, sx2, sy2) 
{
	graphics._save();

	// Clip the output to the on-screen triangle boundaries.
	graphics._beginPath();
	graphics._moveTo(x0, y0);
	graphics._lineTo(x1, y1);
	graphics._lineTo(x2, y2);
	graphics._closePath();
	//graphics.stroke();//xxxxxxx for wireframe
	graphics._clip();

	/*
	graphics.transform(m11, m12, m21, m22, dx, dy) sets the context transform matrix.

	The context matrix is:

	[ m11 m21 dx ]
	[ m12 m22 dy ]
	[  0   0   1 ]

	Coords are column vectors with a 1 in the z coord, so the transform is:
	x_out = m11 * x + m21 * y + dx;
	y_out = m12 * x + m22 * y + dy;

	From Maxima, these are the transform values that map the source
	coords to the dest coords:

	sy0 (x2 - x1) - sy1 x2 + sy2 x1 + (sy1 - sy2) x0
	[m11 = - -----------------------------------------------------,
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0

	sy1 y2 + sy0 (y1 - y2) - sy2 y1 + (sy2 - sy1) y0
	m12 = -----------------------------------------------------,
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0

	sx0 (x2 - x1) - sx1 x2 + sx2 x1 + (sx1 - sx2) x0
	m21 = -----------------------------------------------------,
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0

	sx1 y2 + sx0 (y1 - y2) - sx2 y1 + (sx2 - sx1) y0
	m22 = - -----------------------------------------------------,
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0

	sx0 (sy2 x1 - sy1 x2) + sy0 (sx1 x2 - sx2 x1) + (sx2 sy1 - sx1 sy2) x0
	dx = ----------------------------------------------------------------------,
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0

	sx0 (sy2 y1 - sy1 y2) + sy0 (sx1 y2 - sx2 y1) + (sx2 sy1 - sx1 sy2) y0
	dy = ----------------------------------------------------------------------]
	sx0 (sy2 - sy1) - sx1 sy2 + sx2 sy1 + (sx1 - sx2) sy0
	*/

	// TODO: eliminate common subexpressions.
	var denom = sx0 * (sy2 - sy1) - sx1 * sy2 + sx2 * sy1 + (sx1 - sx2) * sy0;
	if (denom == 0) return;

	//denom = 1.0 / denom;
	var m11 = -(sy0 * (x2 - x1) - sy1 * x2 + sy2 * x1 + (sy1 - sy2) * x0) / denom;
	var m12 = (sy1 * y2 + sy0 * (y1 - y2) - sy2 * y1 + (sy2 - sy1) * y0) / denom;
	var m21 = (sx0 * (x2 - x1) - sx1 * x2 + sx2 * x1 + (sx1 - sx2) * x0) / denom;
	var m22 = -(sx1 * y2 + sx0 * (y1 - y2) - sx2 * y1 + (sx2 - sx1) * y0) / denom;
	var dx = (sx0 * (sy2 * x1 - sy1 * x2) + sy0 * (sx1 * x2 - sx2 * x1) + (sx2 * sy1 - sx1 * sy2) * x0) / denom;
	var dy = (sx0 * (sy2 * y1 - sy1 * y2) + sy0 * (sx1 * y2 - sx2 * y1) + (sx2 * sy1 - sx1 * sy2) * y0) / denom;

	graphics._transform(m11, m12, m21, m22, dx, dy);

	// Draw the whole image.  Transform and clip will map it onto the
	// correct output triangle.
	//
	// TODO: figure out if drawImage goes faster if we specify the rectangle that
	// bounds the source coords.
	graphics._drawImage(im, 0, 0);
	graphics._restore();
};



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="id"></param>
///			 <param name="pTPE"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Graphics_DrawPart_RELEASE(_pTPE, _left, _top, _width, _height, _x, _y) {
	if (!_pTPE) return;
	if (!_pTPE.texture) return;
	if (!_pTPE.texture.complete) return;


	// CLIP the drawing area.
	if (_left < _pTPE.XOffset)
	{
		var off = _pTPE.XOffset - _left;
		_x += off;
		_width -= off;
		_left = 0;
	} else
	{
		var off = _left - _pTPE.XOffset;
		_left -= off;
		_width -= off;
	}


	if (_top < _pTPE.YOffset)
	{
		var off = _pTPE.YOffset - _top;
		_y += off; 	
		_height -= off;
		_top = 0;
	} else
	{
		var off = _top - _pTPE.YOffset;
		_top -= off;
		_height -= off;
	}

	if (_width > _pTPE.CropWidth) _width = _pTPE.CropWidth;
	if (_height > _pTPE.CropHeight) _height = _pTPE.CropHeight;
	if (_width <= 0 || _height <= 0) return;

	graphics._drawImage(_pTPE.texture, _left + _pTPE.x, _top + _pTPE.y, _width, _height,    _x, _y, _width, _height);
}



// #############################################################################################
/// Function:<summary>
///          	Draw a texture to "fit" a size
///          </summary>
///
/// In:		<param name="_pTPE"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_width"></param>
///			<param name="_height"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function Graphics_DrawStretchedExt(_pTPE, _x,_y,_w,_h,_color,_alpha) {
	if (!_pTPE) return;
	if (!_pTPE.texture) return;
	if (!_pTPE.texture.complete) return;

	var sx = _w / _pTPE.ow;
	var sy = _h / _pTPE.oh;
	Graphics_TextureDraw(_pTPE, 0, 0, _x, _y, sx, sy, 0, _color, _alpha);
}


// #############################################################################################
/// Function:<summary>
///          	General draw function. 
///          </summary>
///
/// In:		<param name="_pTPE"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_width"></param>
///			<param name="_height"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_rot"></param>
///			<param name="_c1"></param>
///			<param name="_c2"></param>
///			<param name="_c3"></param>
///			<param name="_c4"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function Graphics_DrawGeneral(_pTPE, _left,_top,_width,_height,    _x,_y,_xscale,_yscale,  _rot,  _c1,_c2,_c3,_c4,  _alpha) 
{
	if (!_pTPE) return;
	if (!_pTPE.texture) return;
	if (!_pTPE.texture.complete) return;


	// CLIP the drawing area.
	if (_left < _pTPE.XOffset)
	{
		var off = _pTPE.XOffset - _left;
		_x += off;
		_width -= off;
		_left = 0;
	} else
	{
		var off = _left - _pTPE.XOffset;
		_left -= off;
		_width -= off;
	}


	if (_top < _pTPE.YOffset)
	{
		var off = _pTPE.YOffset - _top;
		_y += off;
		_height -= off;
		_top = 0;
	} else
	{
		var off = _top - _pTPE.YOffset;
		_top -= off;
		_height -= off;
	}

	if (_width > _pTPE.CropWidth) _width = _pTPE.CropWidth;
	if (_height > _pTPE.CropHeight) _height = _pTPE.CropHeight;
	if (_width <= 0 || _height <= 0) return;

	g_pTempTPE.x = _left+_pTPE.x;
	g_pTempTPE.y = _top+_pTPE.y;
	g_pTempTPE.w = _width;
	g_pTempTPE.h = _height;
	g_pTempTPE.XOffset = 0;
	g_pTempTPE.YOffset = 0;
	g_pTempTPE.CropWidth = g_pTempTPE.w;
	g_pTempTPE.CropHeight = g_pTempTPE.h;
	g_pTempTPE.ow = g_pTempTPE.w;
	g_pTempTPE.oh = g_pTempTPE.h;
	g_pTempTPE.tp = _pTPE.tp;
	g_pTempTPE.texture = _pTPE.texture;

	// Add cache details	
	g_pTempTPE.cache = [];					// clear colour cache
	g_pTempTPE.count = 0;
	g_pTempTPE.maxcache = 1; 				// Max number of times to cache this image.

	// Add "tiling" cache details
	g_pTempTPE.vh_tile = 0;					// How is it tiled?
	g_pTempTPE.hvcached = null;				// tiling cache.

	//  Surfaces ""ARE"" single images....
	g_pTempTPE.singleimage = null;

	Graphics_TextureDraw(g_pTempTPE, 0, 0, _x, _y, _xscale, _yscale, _rot, _c1, _alpha); 	// only draws with ONE colour!
}

// #############################################################################################
/// Function:<summary>
///          	Copy the image pSrc into the ALPHA channel of pDest. Copies the image. 
///				The original image is "forgotten"
///          </summary>
///
/// In:		<param name="_pDest"></param>
///			<param name="_pDestTPE"></param>
///			<param name="_pSrc"></param>
///			<param name="_pSrcTPE"></param>
/// Out:	<returns>
///				true for okay, false for error
///			</returns>
// #############################################################################################
function CopyImageToAlpha(_pDestTPE, _pSrcTPE) 
{
	// First copy the SOURCE image to a location where we can play with it.
	var buffer = document.createElement(g_CanvasName);
	var pImg = buffer.getContext('2d');
	Graphics_AddCanvasFunctions(pImg); 			// update for OUR functions.

	// Should it scale, or crop?  We'll scale...
	buffer.width = _pDestTPE.w;
	buffer.height = _pDestTPE.h;
	pImg.drawImage(_pSrcTPE.texture, _pSrcTPE.x, _pSrcTPE.y, _pSrcTPE.w, _pSrcTPE.h, 0, 0, _pDestTPE.w, _pDestTPE.h);


	var pSourceData, SourceDataLock, DestDataLock, pDestData, pDestImg;
	try
	{
		// This function cannot be called if the image is not from the same domain. You'll get security error if you do. ?!?!?
		SourceDataLock = pImg.getImageData(0, 0, _pDestTPE.w, _pDestTPE.h);
		pDestImg = _pDestTPE.texture.getContext('2d');
		Graphics_AddCanvasFunctions(pDestImg); 			// update for OUR functions.

		DestDataLock = pDestImg.getImageData(_pDestTPE.x, _pDestTPE.y, _pDestTPE.w, _pDestTPE.h);
	} catch (ex)
	{
		return false;
	}
	pSourceData = SourceDataLock.data;
	pDestData = DestDataLock.data;


	var total = (DestDataLock.height * DestDataLock.width * 4);
	for (var i = total - 4; i >= 00; i -= 4)
	{
		var c = ~ ~((pSourceData[i] + pSourceData[i + 1] + pSourceData[i + 2]) / 3);
		pDestData[i + 3] = c;
	}

	DestDataLock.data = pDestData;
	pDestImg.putImageData(DestDataLock, 0, 0);
	return true;
}



// #############################################################################################
/// Function:<summary>
///          	Draw some text usingthe WEB fonts
///          </summary>
///
/// In:		<param name="_font"></param>
///			<param name="_str"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_angle"></param>
///			<param name="_col"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function Graphics_DrawText_RELEASE(_font, _str, _x, _y, _xscale, _yscale, _angle, _col, _alpha) 
{
	graphics.globalAlpha = _alpha;
	graphics.fillStyle = GetHTMLRGBA(_col, 1.0);
	graphics.font = _font;
	Graphics_PushTransform(_x, _y, _xscale, _yscale, -_angle);
	graphics.fillText(_str, 0, 0);
	Graphics_SetTransform();
}


