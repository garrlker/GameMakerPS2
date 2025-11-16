
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Texture.js
// Created:         17/05/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/05/2011		
// 
// **********************************************************************************************************************

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_inst"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_self( _inst )
{
	var index;

	index = _inst.sprite_index;

	g_pSpriteManager.Get(index).Draw( Math.floor(_inst.image_index ),
		_inst.x,_inst.y,_inst.image_xscale, _inst.image_yscale,
		_inst.image_angle,_inst.image_blend,_inst.image_alpha );
}

// #############################################################################################
/// Function:<summary>
///             Draw a sprite with colour, rotation and alpha...
///          </summary>
// #############################################################################################
function    draw_sprite_ext( _sprite, _sub_index, _x,_y, _xscale, _yscale, _rot, _col, _alpha )
{
    var pSpr = g_pSpriteManager.Get(_sprite);
    if( pSpr!=null ){
        _alpha = min(1.0, _alpha);
        pSpr.Draw( _sub_index, _x,_y, _xscale, _yscale, _rot, ConvertGMColour(_col), _alpha );
    }
}

// #############################################################################################
/// Function:<summary>
///             Draw a sprite with colour, rotation and alpha...
///          </summary>
// #############################################################################################
function    draw_sprite( _sprite, _sub_index, _x,_y )
{
    var pSpr = g_pSpriteManager.Get(_sprite);
    if( pSpr!=null ){
        pSpr.DrawSimple( _sub_index, _x,_y, 1 );
    }
}

// #############################################################################################
/// Function:<summary>
///             Draw a sprite with colour, rotation and alpha...
///          </summary>
// #############################################################################################
function draw_sprite_pos(_sprite, _sub_index, _x1, _y1, _x2,_y2, _x3,_y3, _x4,_y4, _alpha) {
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
        _alpha = min(1.0, _alpha);
		pSpr.DrawSimplePos(_sub_index, _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _alpha);
	}
}



// #############################################################################################
/// Function:<summary>
///             Draw a sprite "stretched" on X and Y
///          </summary>
///
/// In:		 <param name="_sprite">Sprite to draw</param>
///			 <param name="_sub_index">sub index of sprite</param>
///			 <param name="_x">X location</param>
///			 <param name="_y">Y location</param>
///			 <param name="_w">X scale</param>
///			 <param name="_h">Y scale</param>
///				
// #############################################################################################
function draw_sprite_stretched(_sprite, _sub_image, _x, _y, _w,_h) 
{
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	
		
	    Graphics_DrawStretchedExt(pSpr.ppTPE[_sub_image], _x,_y, _w,_h, 0xffffff,1.0);
	}

}



// #############################################################################################
/// Function:<summary>
///             Draw a sprite "stretched" on X and Y
///          </summary>
///
/// In:		 <param name="_sprite">Sprite to draw</param>
///			 <param name="_sub_index">sub index of sprite</param>
///			 <param name="_x">X location</param>
///			 <param name="_y">Y location</param>
///			 <param name="_w">X scale</param>
///			 <param name="_h">Y scale</param>
///			 <param name="_colour">colour to tint with</param>
///			 <param name="_alpha">alpha to draw with</param>
///				
// #############################################################################################
function    draw_sprite_stretched_ext( _sprite, _sub_image, _x,_y, _w, _h, _colour, _alpha )
{
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	
		
	    Graphics_DrawStretchedExt(pSpr.ppTPE[_sub_image], _x,_y, _w,_h, ConvertGMColour(_colour),_alpha);
	}
    //draw_sprite_ext(_sprite,_sub_index,_x,_y,_xscale,_yscale,0,_colour, _alpha);
}


// #############################################################################################
/// Function:<summary>
///				Indicates whether to use linear interpolation (true) or pick the nearest pixel 
///				(false). Linear interpolation gives smoother textures but can also be a bit blurry 
///				and sometimes costs extra time. This setting also influence the drawing of sprites 
///				and background. Default is false. (This can also be changed in the global game settings.)
///          </summary>
///
/// In:		 <param name="_linear">true/false to switch on/off bilinear filtering</param>
///				
// #############################################################################################
function texture_set_interpolation(_linear)
{
	//MissingFunction("texture_set_interpolation()");
}



// #############################################################################################
/// Constructor: <summary>
///              	Draws the indicated part of subimage subimg (-1 = current) of the sprite with 
///					the top-left corner of the part at position (x,y).
///              </summary>
///
/// In:		<param name="_sprite"></param>
///			<param name="_sub_image"></param>
///			<param name="_left"></param>
///			<param name="_top"></param>
///			<param name="_width"></param>
///			<param name="_height"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
///
// #############################################################################################
function draw_sprite_part(_sprite,_sub_image,_left,_top,_width,_height,_x,_y) 
{
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	


        Graphics_DrawPart(pSpr.ppTPE[_sub_image],_left,_top,_width,_height,_x,_y) ;
	}
}



// #############################################################################################
/// Constructor: <summary>
///              	Draws the indicated part of subimage subimg (-1 = current) of the sprite with 
///					the top-left corner of the part at position (x,y) but now with scale factors 
///					and a color and transparency setting.
///              </summary>
///
/// In:		<param name="_sprite"></param>
///			<param name="_subimg"></param>
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
///
// #############################################################################################
function draw_sprite_part_ext(_sprite, _sub_image, _left, _top, _width, _height, _x, _y, _xscale, _yscale, _color, _alpha)
{
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	


        _color = ConvertGMColour(_color);
        Graphics_DrawGeneral(pSpr.ppTPE[_sub_image], _left,_top,_width,_height,    _x,_y,_xscale,_yscale,  0,  _color,_color,_color,_color,  _alpha);
	}
}


// #############################################################################################
/// Function:<summary>
///          	Draws the sprite tiled so that it fills the entire room. (x,y) is the place where 
///				one of the sprites is drawn.
///          </summary>
///
/// In:		<param name="_sprite"></param>
///			<param name="_sub_image"></param>
///			<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_sprite_tiled(_sprite, _sub_image, _x, _y) {

	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	
    
        Graphics_TextureDrawTiled( pSpr.ppTPE[_sub_image], _x, _y, true, true );
    }
}



// #############################################################################################
/// Function:<summary>
///          	Draws the sprite tiled so that it fills the entire room but now with scale factors 
///				and a color and transparency setting.
///          </summary>
///
/// In:		<param name="_sprite"></param>
///			<param name="_subimg"></param>
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
function draw_sprite_tiled_ext(_sprite,_subimg,_x,_y,_xscale,_yscale,_color,_alpha) 
{
    _color = ConvertGMColour(_color);
	MissingFunction("draw_sprite_tiled_ext()");
}


// #############################################################################################
/// Function:<summary>
///          	The most general drawing function. It draws the indicated part of subimage subimg 
///				(-1 = current) of the sprite with the top-left corner of the part at position (x,y) 
///				but now with scale factors, a rotation angle, a color for each of the four vertices 
///				(top-left, top-right, bottom-right, and bottom-left), and an alpha transparency value. 
///				Note that rotation takes place around the top-left corner of the part.
///          </summary>
///
/// In:		<param name="_sprite"></param>
///			<param name="_subimg"></param>
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
function draw_sprite_general(_sprite, _subimg, _left, _top, _width, _height, _x, _y, _xscale, _yscale, _rot, _c1, _c2, _c3, _c4, _alpha) 
{
	var pSpr = g_pSpriteManager.Get(_sprite);
	if (pSpr != null)
	{
    	if (pSpr.numb <= 0) return;
	    _sub_image = (~ ~_sub_image) % pSpr.numb;
	    if (_sub_image < 0) _sub_image = _sub_image + pSpr.numb;	


        _c1 = ConvertGMColour(_c1);
        _c2 = ConvertGMColour(_c2);
        _c3 = ConvertGMColour(_c3);
        _c4 = ConvertGMColour(_c4);
        Graphics_DrawGeneral(pSpr.ppTPE[_sub_image], _left,_top,_width,_height,    _x,_y,_xscale,_yscale,  _rot,  _c1,_c2,_c3,_c4,  _alpha);
	}
}
