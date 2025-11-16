
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Surface.js
// Created:			09/06/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 09/06/2011		V1.0        MJD     1st verison. Functions blocked in...
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///          	Creates a surface of the indicated width and height. Returns the id of the surface, 
///             which must be used in all further calls. Note that the surface will not be cleared. 
///             This is the responsibility of the user. (Set it as a target and call the appropriate 
///             clear function.)
///          </summary>
///
/// In:		<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_create(_w,_h) 
{
	var pSurf = document.createElement(g_CanvasName);
    pSurf.m_Width = pSurf.width = _w;
    pSurf.m_Height = pSurf.height = _h;
    pSurf.complete = true;


    // Create TP index
	var pTPE = new yyTPageEntry();
	pSurf.m_pTPE = pTPE;
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = _w;
	pTPE.h = _h;
	pTPE.XOffset = 0;
	pTPE.YOffset = 0;
	pTPE.CropWidth = pTPE.w;
	pTPE.CropHeight = pTPE.h;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;
	pTPE.tp = g_Surfaces.Add(pSurf);    // NEGATE this index to indicate a surface
	pTPE.texture = pSurf;				// store RAW texture

    // Add cache details	
    pTPE.cache = [];                // clear colour cache
    pTPE.count = 0;
    pTPE.maxcache= 4;				// Max number of times to cache this image.

    // Add "tiling" cache details
    pTPE.vh_tile = 0;               // How is it tiled?
    pTPE.hvcached = null;           // tiling cache.

    //  Surfaces ""ARE"" single images....
    pTPE.singleimage = pSurf;       
	
	
	return pTPE.tp;
}

// #############################################################################################
/// Function:<summary>
///          	Frees the memory used by the surface.
///          </summary>
///
/// In:		<param name="_id">surface ID</param>
///				
// #############################################################################################
function surface_free(_id) 
{
	g_Surfaces.DeleteIndex(_id);
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the surface with the indicated id exists.
///          </summary>
///
/// In:		<param name="_id">Check to see if the surface exists</param>
/// Out:	<returns>
///				true for yes, false for no.
///			</returns>
// #############################################################################################
function surface_exists(_id) 
{
	if (g_Surfaces.Get(_id) != null) return true; else return false;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the width of the surface.
///          </summary>
///
/// In:		<param name="_id">Get the width of the surface</param>
/// Out:	<returns>
///				width of surface, or 0 if not found
///			</returns>
// #############################################################################################
function surface_get_width(_id) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
		return pSurf.m_Width;
	}
    return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the height of the surface.
///          </summary>
///
/// In:		<param name="_id">ID of surface</param>
/// Out:	<returns>
///				Height of surface, or 0 if not found
///			</returns>
// #############################################################################################
function surface_get_height(_id) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
		return pSurf.m_Height;
	}
	return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the texture corresponding to the surface. This can be used to draw textured 
///             objects with the image of the surface.
///          </summary>
///
/// In:		<param name="_id">ID of surface</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_get_texture(_id) 
{
    MissingFunction("surface_get_texture()");
    return -1;
}

// #############################################################################################
/// Function:<summary>
///          	Sets the indicated surface as the drawing target. All subsequent drawing happens 
///             on this surface. It resets the projection to simply cover the surface.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				return true;
///			</returns>
// #############################################################################################
function surface_set_target(_id) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
		var buffer = document.createElement(g_CanvasName);
		graphics = pSurf.getContext('2d');
		Graphics_AddCanvasFunctions(graphics); 			// update for OUR functions.
	}	
}

// #############################################################################################
/// Function:<summary>
///          	Resets the drawing target to the normal screen.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_reset_target() 
{
	graphics = GlobalGraphicsHandle;
}


// #############################################################################################
/// Function:<summary>
///          	Read a pixel from a surface - can be slow.
///          </summary>
///
/// In:		<param name="_buffer"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function GetCanvasPixel(_buffer, _x, _y) 
{
	var data = null;
	var pImg = _buffer.getContext('2d');
	try
	{
		// This function cannot be called if the image is not from the same domain. You'll get security error if you do. ?!?!?
		data = pImg._getImageData(0, 0, _buffer.width, _buffer.height);
	} catch (ex)
	{
		return 0xff000000;		// cant read pixel, so it's BLACK!
	}
	sdata = data.data;
	var index = ((_buffer.width *  _y) + _x)*4;
	var a1 = sdata[index] & 0xff;
	var a2 = sdata[index + 1] & 0xff;
	var a3 = sdata[index + 2] & 0xff;
	var a4 = sdata[index + 3] & 0xff;

	return ( a1 | (a2<<8) | (a3 <<16) | (a4 <<24) );

}

// #############################################################################################
/// Function:<summary>
///          	Returns the color of the pixel corresponding to position (x,y) in the surface. 
///             This is not very fast, so use with care.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_getpixel(_id,_x,_y) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
		return GetCanvasPixel( pSurf, _x, _y);
	}
	return 0x00000000;
}



// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_buffer"></param>
///			<param name="_fname"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function SaveCanvas(_buffer, _fname) 
{
	var img = canvas.toDataURL();

	// strip off the data: url prefix to get just the base64-encoded bytes
	/*var data = img.replace(/^data:image\/\w+;base64,/, "");*/
}

// #############################################################################################
/// Function:<summary>
///          	Saves a png image of the surface in the given filename. Useful for making screenshots.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_fname">File name to save as</param>
///				
// #############################################################################################
function surface_save(_id, _fname) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
		SaveCanvas(pSurf, _fname);
	}
	MissingFunction("surface_save()");
}

// #############################################################################################
/// Function:<summary>
///          	Saves part of the surface in the given png filename.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_fname"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_save_part(_id,_fname,_x,_y,_w,_h) 
{
    MissingFunction("surface_save_part()");
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface at position (x,y). (Without color blending and no alpha transparency.)
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface(_id,_x,_y) 
{
    var pSurf = g_Surfaces.Get(_id);
    if (!pSurf) return;

	graphics._drawImage(pSurf, _x, _y);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface stretched to the indicated region.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_stretched(_id,_x,_y,_w,_h) 
{
    var pSurf = g_Surfaces.Get(_id);
    if (!pSurf) return;
	Graphics_DrawStretchedExt(pSurf.m_pTPE, _x, _y, _w, _h, 0xffffff, 1.0);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface tiled so that it fills the entire room.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_tiled(_id,_x,_y) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
        Graphics_TextureDrawTiled( pSurf.m_pTPE, _x,_y, true,true );
    }
}

// #############################################################################################
/// Function:<summary>
///          	Draws the indicated part of the surface with its origin at position (x,y).
///          </summary>
///
/// In:		<param name="_id"></param>
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
function draw_surface_part(_id,_left,_top,_width,_height,_x,_y) 
{
    var pSurf = g_Surfaces.Get(_id);
    if (!pSurf) return;

    Graphics_DrawPart(pSurf.m_pTPE, _left, _top, _width, _height, _x, _y);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface scaled and rotated with blending color (use c_white for no 
///             blending) and transparency alpha (0-1).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_rot"></param>
///			<param name="_color"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_ext(_id,_x,_y,_xscale,_yscale,_rot,_color,_alpha) 
{
    var pSurf = g_Surfaces.Get(_id);
    if (!pSurf) return;

	Graphics_TextureDraw(pSurf.m_pTPE, 0, 0, _x, _y, _xscale, _yscale, _rot, _col, _alpha);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface stretched to the indicated region. color is the blending color 
///             and alpha indicates the transparency setting.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_w"></param>
///			<param name="_h"></param>
///			<param name="_color"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_stretched_ext(_id,_x,_y,_w,_h,_color,_alpha) 
{
    var pSurf = g_Surfaces.Get(_id);
    if (!pSurf) return;

	Graphics_DrawStretchedExt(pSurf.m_pTPE, _x, _y, _w, _h, _color, _alpha)
}

// #############################################################################################
/// Function:<summary>
///          	Draws the surface tiled so that it fills the entire room but now with scale factors 
///             and a color and transparency setting.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_color"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_tiled_ext(_id,_x,_y,_xscale,_yscale,_color,_alpha) 
{
    MissingFunction("draw_surface_tiled_ext()");
}

// #############################################################################################
/// Function:<summary>
///          	Draws the indicated part of the surface with its origin at position (x,y) but 
///             now with scale factors and a color and transparency setting.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_width"></param>
///			<param name="_height"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_color"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_surface_part_ext(_id,_left,_top,_width,_height,_x,_y,_xscale,_yscale,_color,_alpha) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
        // Create a TEMP TP index, and fill in "offsets"
	    var pTPE = new yyTPageEntry();
	    pTPE.x = _left;     
	    pTPE.y = _top;
	    pTPE.w = _width;
	    pTPE.h = _height;
	    pTPE.XOffset = 0;
	    pTPE.YOffset = 0;
	    pTPE.CropWidth = pTPE.w;
	    pTPE.CropHeight = pTPE.h;
	    pTPE.ow = pTPE.w;
	    pTPE.oh = pTPE.h;
	    pTPE.tp = _id;

        // Add cache details	
        pTPE.cache = [];                // clear colour cache
        pTPE.count = 0;
        pTPE.maxcache= 4;				// Max number of times to cache this image.

        // Add "tiling" cache details
        pTPE.vh_tile = 0;               // How is it tiled?
        pTPE.hvcached = null;           // tiling cache.

        //  Surfaces ""ARE"" single images....
        pTPE.singleimage = pSurf;
        pTPE.texture = pSurf;     

        Graphics_TextureDraw( pTPE, 0, 0, _x, _y, _xscale, _yscale, 0.0, _color, _alpha)
    }
}

// #############################################################################################
/// Function:<summary>
///          	The most general drawing function. It draws the indicated part of the surface 
///             with its origin at position (x,y) but now with scale factors, a rotation angle, 
///             a color for each of the four vertices (top-left, top-right, bottom-right, and 
///             bottom-left), and an alpha transparency value.
///          </summary>
///
/// In:		<param name="_id"></param>
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
function draw_surface_general(_id,_left,_top,_width,_height,_x,_y,_xscale,_yscale,_rot,_c1,_c2,_c3,_c4,_alpha) 
{
    var pSurf = g_Surfaces.Get(_id);
	if( pSurf != null)
	{
        // Create a TEMP TP index, and fill in "offsets"
	    var pTPE = new yyTPageEntry();
	    pTPE.x = _left;     
	    pTPE.y = _top;
	    pTPE.w = _width;
	    pTPE.h = _height;
	    pTPE.XOffset = 0;
	    pTPE.YOffset = 0;
	    pTPE.CropWidth = pTPE.w;
	    pTPE.CropHeight = pTPE.h;
	    pTPE.ow = pTPE.w;
	    pTPE.oh = pTPE.h;
	    pTPE.tp = _id;

        // Add cache details	
        pTPE.cache = [];                // clear colour cache
        pTPE.count = 0;
        pTPE.maxcache= 4;				// Max number of times to cache this image.

        // Add "tiling" cache details
        pTPE.vh_tile = 0;               // How is it tiled?
        pTPE.hvcached = null;           // tiling cache.

        //  Surfaces ""ARE"" single images....
        pTPE.singleimage = pSurf;

        Graphics_TextureDraw(pTPE, 0, 0, _x, _y, _xscale, _yscale, _rot, _c1, _alpha);
    }
     
}

// #############################################################################################
/// Function:<summary>
///          	Copies the source surface at position (x,y) in the destination surface. 
///             (Without any form of blending.)
///          </summary>
///
/// In:		<param name="_destination"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_source"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_copy(_destination,_x,_y,_source) {

    var pDest = g_Surfaces.Get(_destination);
    var pSrc = g_Surfaces.Get(_source);
	if( pDest!=null && pSrc!=null)
	{
		var pImg = pDest.getContext('2d');
		
		pImg.save();
		pImg.globalCompositeOperation = 'copy';
		pImg.drawImage(pSrc, _x,_y);
		pImg.restore();
	}
}

// #############################################################################################
/// Function:<summary>
///          	Copies the indicated part of the source surface at position (x,y) in the 
///             destination surface. (Without any form of blending.)
///          </summary>
///
/// In:		<param name="_destination"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_source"></param>
///			<param name="_xs"></param>
///			<param name="_ys"></param>
///			<param name="_ws"></param>
///			<param name="_hs"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function surface_copy_part(_destination,_x,_y, _source,_xs,_ys,_ws,_hs) 
{
    var pDest = g_Surfaces.Get(_destination);
    var pSrc = g_Surfaces.Get(_source);
	if( pDest!=null && pSrc!=null)
	{
	    var trans = [];
		var pImg = pDest.getContext('2d');

		pImg.save();
        
        trans[0] = 1;
        trans[1] = 0;
        trans[2] = 0;
        trans[3] = 1;
        trans[4] = 0;
        trans[5] = 0;
        pImg.setTransform( trans[0], trans[1], trans[2], trans[3], trans[4], trans[5] );

        pImg.beginPath();
        pImg.rect(_x, _y, _ws, _hs);
        pImg.clip();
		
		pImg.globalCompositeOperation = 'copy';
		pImg.drawImage(pSrc,  _xs,_ys,_ws,_hs,  _x, _y, _ws,_hs);
		pImg.restore();
	} 
}

