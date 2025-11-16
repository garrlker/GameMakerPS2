
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Graphics.js
// Created:			09/06/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 09/06/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///          	Returns the width of the display in pixels.
///             (returns the CANVAS size)
///          </summary>
///
/// Out:	<returns>
///				width of the canvas in pixels
///			</returns>
// #############################################################################################
function display_get_width()
{
    return DISPLAY_WIDTH;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the height of the display in pixels.
///             (returns the CANVAS size)
///          </summary>
///
/// Out:	<returns>
///				height of the canvas in pixels
///			</returns>
// #############################################################################################
function display_get_height()
{
    return DISPLAY_HEIGHT;
}


// #############################################################################################
/// Function:<summary>
///          	Clears the entire room in the given color (no alpha blending).
///          </summary>
///
/// In:		<param name="_col">Colour to clear to</param>
///				
// #############################################################################################
function draw_clear( _col )
{
	Graphics_ClearScreen( ConvertGMColour(_col) );
}

// #############################################################################################
/// Function:<summary>
///          	Clears the entire room in the given color and alpha value 
///             (in particular useful for surfaces).
///          </summary>
///
/// In:		<param name="_col"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_clear_alpha(_col, _alpha) 
{
	graphics._save();

	var trans = [];
	trans[0] = 1;
	trans[1] = 0;
	trans[2] = 0;
	trans[3] = 1;
	trans[4] = 0;
	trans[5] = 0;
	graphics._setTransform(trans[0], trans[1], trans[2], trans[3], trans[4], trans[5]);


	// if its a total clear, then we can use clearRect....if it's there.
	if (!graphics.clearRect || _col != 0 || _alpha != 0)
	{
		graphics.globalAlpha = _alpha;
		graphics.fillStyle = GetHTMLRGBA( ConvertGMColour(_col) ,_alpha);
		graphics.globalCompositeOperation = 'copy';
		graphics.fillRect(g_clipx, g_clipy, g_clipw, g_cliph);
	} 
	else
	{
		graphics.clearRect(g_clipx, g_clipy, g_clipw, g_cliph);
	}

	graphics._restore();
}


// #############################################################################################
/// Function:<summary>
///          	Returns a color with the indicated red, green, and blue components, where 
///             red, green and blue must be values between 0 and 255.
///          </summary>
///
/// In:		<param name="_red"></param>
///			<param name="_green"></param>
///			<param name="_blue"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function make_color_rgb(_red,_green,_blue) 
{
    return (~~_red) | (_green<<8) | (_blue<<16);
}
function    make_color(_r, _g, _b) { return make_color_rgb(_r, _g, _b); }

// #############################################################################################
/// Function:<summary>
///          	Returns the red component of the color.
///          </summary>
///
/// In:		<param name="_col">colour to extract RED from</param>
/// Out:	<returns>
///				RED value
///			</returns>
// #############################################################################################
function color_get_blue(_col) 
{
    return (_col>>16)&0xff;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the green component of the color.
///          </summary>
///
/// In:		<param name="_col">colour to extract GREEN from</param>
/// Out:	<returns>
///				GREEN value
///			</returns>
// #############################################################################################
function color_get_green(_col) 
{
    return (_col>>8)&0xff;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the blue component of the color.
///          </summary>
///
/// In:		<param name="_col">colour to extract BLUE from</param>
/// Out:	<returns>
///				BLUE value
///			</returns>
// #############################################################################################
function color_get_red(_col) 
{
    return (_col&0xff);
}


// #############################################################################################
/// Function:<summary>
///				Transforms a RGB color into a HSV color
///          </summary>
///
/// In:		 <param name="col">RGB colour to convert to HSV</param>
/// Out:	 <returns>
///				Converted HSV colour
///			 </returns>
// #############################################################################################
function Color_RGBtoHSV( _col )
{
	var rr = 0.0;
	var gg = 0.0;
	var bb = 0.0;
	var hh = 0.0;
	var ss = 0.0;
	var vv = 0.0;
	var d = 0.0;
	var m = 0.0;

	rr = ((_col>>16)&0xff)/255.0;
	gg = ((_col>>8)&0xff)/255.0;
	bb = (_col&0xff)/255.0;
	m = yymin( yymin(rr,gg) , bb);
	vv = yymax( yymax(rr,gg) , bb);
	d = vv-m;

	if ( vv == 0 ) ss = 0.0; else ss = 1.0*d/vv;		
	if ( ss == 0 ) hh = 0.0;							
	else if ( rr == vv ) hh = 60.0*(gg-bb)/d;			
	else if ( gg == vv ) hh = 120.0 + 60.0*(bb-rr)/d;	
	else hh = 240.0 + 60.0*(rr-gg)/d ;				
	if ( hh<0 ) hh = hh+360.0;							

	var Result;
	
	// v,s,h
	Result = ((Math.floor(vv * 255.0) << 16) & 0xff) | (Math.floor(ss * 255.0) << 8) | (Math.floor(hh * 255.0 / 360.0) & 0xff);
	return Result;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the hue component of the color.
///          </summary>
///
/// In:		<param name="_col"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function color_get_hue(_col) 
{
    return Color_RGBtoHSV(_col)&0xff;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the saturation component of the color.
///          </summary>
///
/// In:		<param name="_col"></param>
/// Out:	<returns>
///				The saturation of the colour
///			</returns>
// #############################################################################################
function color_get_saturation(_col)
{
    return (Color_RGBtoHSV(_col)>>8)&0xff;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value component of the color.
///          </summary>
///
/// In:		<param name="_col"></param>
/// Out:	<returns>
///				The value of the colour
///			</returns>
// #############################################################################################
function color_get_saturation(_col)
{
    return (Color_RGBtoHSV(_col)>>16)&0xff;
}

// #############################################################################################
/// Function:<summary>
///          	Returns a merged color of col1 and col2. The merging is determined by amount. 
///             A value of 0 corresponds to col1, a value of 1 to col2, and values in between to 
///             merged values.
///             DOES A LERP.
///          </summary>
///
/// In:		<param name="_col1"></param>
///			<param name="_col2"></param>
///			<param name="_amount"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function merge_color(_col1,_col2,_amount) 
{
    var r1 = (_col1>>16)&0xff;
    var g1 = (_col1>>8)&0xff;
    var b1 = _col1&0xff;

    var r2 = (_col2>>16)&0xff;
    var g2 = (_col2>>8)&0xff;
    var b2 = _col2&0xff;
    
    var amount2 = 1.0 - _amount;
    var r = Math.floor( r1*amount2 + r2*_amount);
    var g = Math.floor( g1*amount2 + g2*_amount);
    var b = Math.floor( b1*amount2 + b2*_amount);
    
    return ((r<<16)&0xff0000) | ((g<<8)&0xff00) | (b&0xff);
}

// #############################################################################################
/// Function:<summary>
///             Returns a color with the indicated hue, saturation and value components 
///				(each between 0 and 255).
///          </summary>
///
/// In:		 <param name="_hue"></param>
///    		 <param name="_saturation"></param>
///  		 <param name="_value"></param>
///				
// #############################################################################################
function make_color_hsv( _hue,_saturation,_value ) 
{
	var rr = 0.0;
	var gg = 0.0;
	var bb = 0.0;
	var hh = 0.0;
	var ss = 0.0;
	var vv = 0.0;
	var f = 0.0;
	var p = 0.0;
	var q = 0.0;
	var t = 0.0;
	var i = 0;
	var Result;

	hh = _hue*360.0/255.0;
	if ( hh == 360.0 ) hh = 0.0;
	ss = _saturation/255.0;
	vv = _value/255.0;

	if (ss == 0)
	{
		rr = vv;
		gg = vv;
		bb = vv;
	}
	else
	{
		hh = hh/60.0; 
		i = Math.floor(hh);
		f = hh - i;
		p = vv*(1.0-ss);					
		q = vv*(1.0-(ss*f));				
		t = vv*(1.0-(ss*(1.0-f)));		
		switch ( i )
		{
			case 0: 	{ rr=vv; gg=t;  bb=p; } break;
			case 1: 	{ rr=q;  gg=vv; bb=p; } break;
			case 2: 	{ rr=p;  gg=vv; bb=t; } break;
			case 3: 	{ rr=p;  gg=q;  bb=vv; } break;
			case 4: 	{ rr=t;  gg=p;  bb=vv; } break;
			default:	{ rr=vv; gg=p; bb=q; }
		}
	}
	Result = Math.floor(rr * 255.0)  | (Math.floor(gg * 255.0) << 8) | (Math.floor(bb * 255.0)<< 16);
	return Result;

}


// #############################################################################################
/// Function:<summary>
///             Set drawing alpha
///          </summary>
///
/// In:		 <param name="_alpha">Alpha value to set</param>
///				
// #############################################################################################
function    draw_set_alpha( _alpha )
{
    // cap _alpha to between 0 and 1
    if (_alpha < 0) { _alpha = 0; }
    if (_alpha > 1) { _alpha = 1; }
    
    g_GlobalAlpha = _alpha;    
    g_GlobalColour_HTML_RGBA = GetHTMLRGBA(g_GlobalColour, g_GlobalAlpha);
}

// #############################################################################################
/// Function:<summary>
///          	Get the current drawing alpha
///          </summary>
///
/// Out:	<returns>
///				the current global alpha value.
///			</returns>
// #############################################################################################
function    draw_get_alpha( )
{
    return g_GlobalAlpha;
}

// #############################################################################################
/// Function:<summary>
///          	Get the current drawing colour
///          </summary>
///
/// Out:	<returns>
///				the current global colour value.
///			</returns>
// #############################################################################################
function    draw_get_color( )
{
    return g_GlobalColour;
}
// #############################################################################################
/// Function:<summary>
///             Set drawing alpha
///          </summary>
///
/// In:		 <param name="_colour">Set global colour</param>
///				
// #############################################################################################
function    draw_set_color( _colour )
{
    g_GlobalColour = ConvertGMColour(_colour);
    g_GlobalColour_HTML_RGB = GetHTMLRGB(g_GlobalColour);
    g_GlobalColour_HTML_RGBA = GetHTMLRGBA(g_GlobalColour,g_GlobalAlpha);
}



// #############################################################################################
/// Function:<summary>
///             Draw a "round" rectangle
///          </summary>
///
/// In:		 <param name="_x1">Top X coordinate</param>
///			 <param name="_y1">Top Y coordinate</param>
///			 <param name="_x2">Bottom X coordinate</param>
///			 <param name="_y2">Bottom X coordinate</param>
///			 <param name="_outline">Outline the rect?</param>
///				
// #############################################################################################
function draw_roundrect( _x1, _y1, _x2, _y2, _outline) 
{
    var width = _x2-_x1;
    var height = _y2-_y1;
    
    radius = 10;

    graphics.fillStyle = g_GlobalColour_HTML_RGBA;
    graphics.globalAlpha = g_GlobalAlpha;
    
    graphics.beginPath();
    graphics.moveTo(_x1 + radius, _y1);
    graphics.lineTo(_x1 + width - radius, _y1);
    graphics.quadraticCurveTo(_x1 + width, _y1, _x1 + width, _y1 + radius);
    graphics.lineTo(_x1 + width, _y1 + height - radius);
    graphics.quadraticCurveTo(_x1 + width, _y1 + height, _x1 + width - radius, _y1 + height);
    graphics.lineTo(_x1 + radius, _y1 + height);
    graphics.quadraticCurveTo(_x1, _y1 + height, _x1, _y1 + height - radius);
    graphics.lineTo(_x1, _y1 + radius);
    graphics.quadraticCurveTo(_x1, _y1, _x1 + radius, _y1);
    graphics.closePath();

    if (_outline) {
        graphics.stroke();
    }else{
        graphics.fill();
    }        
}


// #############################################################################################
/// Function:<summary>
///             Draw a "round" rectangle
///          </summary>
///
/// In:		 <param name="_x1">Top X coordinate</param>
///			 <param name="_y1">Top Y coordinate</param>
///			 <param name="_x2">Bottom X coordinate</param>
///			 <param name="_y2">Bottom X coordinate</param>
///			 <param name="_outline">Outline the rect?</param>
///				
// #############################################################################################
function draw_roundrect_color( _x1, _y1, _x2, _y2, _col1, _col2, _outline) 
{
    var width = _x2-_x1;
    var height = _y2-_y1;
    
    radius = 10;

    var col = 
    graphics.fillStyle = GetHTMLRGBA( ConvertGMColour(_col1), 1.0);
    graphics.globalAlpha = g_GlobalAlpha;
    
    graphics.beginPath();
    graphics.moveTo(_x1 + radius, _y1);
    graphics.lineTo(_x1 + width - radius, _y1);
    graphics.quadraticCurveTo(_x1 + width, _y1, _x1 + width, _y1 + radius);
    graphics.lineTo(_x1 + width, _y1 + height - radius);
    graphics.quadraticCurveTo(_x1 + width, _y1 + height, _x1 + width - radius, _y1 + height);
    graphics.lineTo(_x1 + radius, _y1 + height);
    graphics.quadraticCurveTo(_x1, _y1 + height, _x1, _y1 + height - radius);
    graphics.lineTo(_x1, _y1 + radius);
    graphics.quadraticCurveTo(_x1, _y1, _x1 + radius, _y1);
    graphics.closePath();

    if (_outline) {
        graphics.stroke();
    }else{
        graphics.fill();
    }        
}

// #############################################################################################
/// Function:<summary>
///             Draw a "round" rectangle
///          </summary>
///
/// In:		 <param name="_x1">Top X coordinate</param>
///			 <param name="_y1">Top Y coordinate</param>
///			 <param name="_x2">Bottom X coordinate</param>
///			 <param name="_y2">Bottom X coordinate</param>
///			 <param name="_outline">Outline the rect?</param>
///				
// #############################################################################################
function    draw_rectangle( _x1,_y1, _x2,_y2, _outline )
{
    graphics.globalAlpha = g_GlobalAlpha;

    if( _outline )
    {
        graphics.strokeStyle = g_GlobalColour_HTML_RGBA;
        graphics._strokeRect(_x1 + 0.5, _y1 + 0.5, _x2 - _x1, _y2 - _y1);
    }else{
        graphics.fillStyle = g_GlobalColour_HTML_RGBA;
        graphics._fillRect(_x1+0.5,_y1+0.5,_x2-_x1,_y2-_y1);
    }        
}

// #############################################################################################
/// Function:<summary>
///             Draw a "round" rectangle
///          </summary>
///
/// In:		 <param name="_x1">Top X coordinate</param>
///			 <param name="_y1">Top Y coordinate</param>
///			 <param name="_x2">Bottom X coordinate</param>
///			 <param name="_y2">Bottom X coordinate</param>
///			 <param name="_col">Colour of the rect as a number</param>
///			 <param name="_outline">Whether or not to draw the rect as an outline</param>
///				
// #############################################################################################
function    draw_rectangle_color( _x1,_y1, _x2,_y2, _col1, _col2,_col3,_col4, _outline ) {

	//return;
	var col = GetHTMLRGBA( ConvertGMColour(_col1), 1.0 );
	graphics.globalAlpha = g_GlobalAlpha;

    if (_outline)
    {
        graphics.strokeStyle = col;
        graphics._strokeRect(_x1 + 0.5, _y1 + 0.5, _x2 - _x1, _y2 - _y1);
    }
    else 
    {        
        graphics.fillStyle = col;
        graphics._fillRect(_x1 + 0.5, _y1 + 0.5, _x2 - _x1, _y2 - _y1);
    }        
}

// #############################################################################################
/// Function:<summary>
///             Draw a "round" rectangle with a gradient
///          </summary>
///
/// In:		 <param name="_x1">Top X coordinate</param>
///			 <param name="_y1">Top Y coordinate</param>
///			 <param name="_x2">Bottom X coordinate</param>
///			 <param name="_y2">Bottom X coordinate</param>
///			 <param name="_col1">Start colour of the rect as a number</param>
///			 <param name="_col2">End colour of the rect as a number</param>
///			 <param name="_vert">Whether or not the gradient should be vertical (or horizontal)</param>
///			 <param name="_outline">Whether or not to draw the rect as an outline</param>
///				
// #############################################################################################
function draw_rectangle_gradient(_x1, _y1, _x2, _y2, _col1, _col2, _vert, _outline)
{
	graphics.globalAlpha = g_GlobalAlpha;

	var col1 = GetHTMLRGB( ConvertGMColour(_col1) );
    var col2 = GetHTMLRGB( ConvertGMColour(_col2) );
    var gradient;
    if (_vert) {
        gradient = graphics.createLinearGradient(_x1, _y1, _x1, _y2);
    }
    else {
        gradient = graphics.createLinearGradient(_x1, _y1, _x2, _y1);        
    }
    gradient.addColorStop(0, col1 );
    gradient.addColorStop(1, col2 );
    
    if (_outline)
    {
        graphics.strokeStyle = gradient;
        graphics._strokeRect(_x1 + 0.5, _y1 + 0.5, _x2 - _x1, _y2 - _y1);
    }
    else 
    {        
        graphics.fillStyle = gradient;
        graphics._fillRect(_x1 + 0.5, _y1 + 0.5, _x2 - _x1, _y2 - _y1);
    } 
}

// #############################################################################################
/// Function:<summary>
///          	Plot a single point
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    draw_point( _x,_y )
{
    graphics.globalAlpha = g_GlobalAlpha;
    graphics.fillStyle = g_GlobalColour_HTML_RGBA;
    graphics._fillRect(_x + 0.5, _y + 0.5, 1, 1);
}



// #############################################################################################
/// Function:<summary>
///          	Draws a line from (x1,y1) to (x2,y2) with width w.
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_w"></param>
///				
// #############################################################################################
function draw_line_width(_x1,_y1,_x2,_y2,_w) 
{
    // Start from the top-left point.
	graphics.globalAlpha = g_GlobalAlpha;
	graphics.strokeStyle = g_GlobalColour_HTML_RGBA;

    graphics.lineWidth = _w;
    graphics._beginPath();
    graphics._moveTo(_x1 + 0.5, _y1 + 0.5);
    graphics._lineTo(_x2 + 0.5, _y2+ 0.5);
    graphics._stroke();
    graphics._closePath();
}




// #############################################################################################
/// Function:<summary>
///          	Draws a line from (x1,y1) to (x2,y2).
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_w"></param>
///				
// #############################################################################################
function draw_line(_x1,_y1,_x2,_y2) 
{
    draw_line_width(_x1,_y1,_x2,_y2,1);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the color of the pixel corresponding to position (x,y) in the room. 
///             This is not very fast, so use with care.
///          </summary>
///
/// In:		<param name="_x">X coordinate of the pixel</param>
///			<param name="_y">Y coordinate of the pixel</param>
/// Out:	<returns>
///				The colour of the pixel, or 0 for off screen/canvas.
///			</returns>
// #############################################################################################
function draw_getpixel(_x,_y)
{
    return GetCanvasPixel(canvas, _x, _y) 
}

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
///			 <param name="_x3"></param>
///			 <param name="_y3"></param>
///			 <param name="_outline"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_triangle(_x1, _y1, _x2, _y2, _x3, _y3, _outline) {

	_x1 += 0.5;
	_y1 += 0.5;
	_x2 += 0.5;
	_y2 += 0.5;
	_x3 += 0.5;
	_y3 += 0.5;

	graphics.globalAlpha = g_GlobalAlpha;
	//Graphics_SetTransform();
	graphics.lineWidth = 1;
	if (_outline)
	{
		graphics.strokeStyle = g_GlobalColour_HTML_RGBA;
		graphics._beginPath();
		graphics._moveTo(_x1, _y1);
		graphics._lineTo(_x2, _y2);
		graphics._lineTo(_x3, _y3);
		graphics._lineTo(_x1, _y1);
		graphics._stroke();
		graphics._closePath();
	} else
	{
		// HORRIBLE!!
		graphics.strokeStyle = g_GlobalColour_HTML_RGBA;
		graphics.lineJoin = "bevel";
		graphics.fillStyle = g_GlobalColour_HTML_RGBA;
		graphics._beginPath();
		graphics._moveTo(_x1, _y1);
		graphics._lineTo(_x2, _y2);
		graphics._lineTo(_x3, _y3);
		graphics._lineTo(_x1, _y1);
		graphics._fill();
		graphics._stroke();
		graphics._closePath();
		//graphics.mozImageSmoothingEnabled = true;
		graphics.lineJoin = "miter";
	}

}

// #############################################################################################
/// Function:<summary>
///				Draws a healthbar at the location with the colors; amount between 0 and 100
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="amount"></param>
///			 <param name="backcol"></param>
///			 <param name="mincol"></param>
///			 <param name="midcol"></param>
///			 <param name="maxcol"></param>
///			 <param name="direction">direction: 0 = from left, 1 = from right, 2 = from top, 3 = from bottom</param>
///			 <param name="showback"></param>
///			 <param name="showborder"></param>
// #############################################################################################
function draw_healthbar(x1, y1, x2, y2, amount, backcol, mincol, midcol, maxcol, direction, showback, showborder)
{
    var xx1;
	var xx2;
	var yy1;
	var yy2;
	var col;

	// Draw background
	if (showback)
	{
		draw_rectangle_color(x1, y1, x2, y2, backcol, backcol, backcol, backcol, false);
		if (showborder)
		{
			draw_rectangle_color(x1, y1, x2, y2, clBlack, clBlack, clBlack, clBlack, true);
		}
	}


	// Computer bar
	if ( amount < 0 ) {
	    amount = 0;
	}
	if ( amount > 100 ) {
	    amount = 100;
	}
	var fr = amount / 100;

	switch (direction)
	{
		case 0:		xx1 = x1;            
					yy1 = y1;                  
					xx2 = x1+fr*(x2-x1);  
					yy2 = y2;
					break;

		case 1:		xx1 = x2-fr*(x2-x1); 
					yy1 = y1;
					xx2 = x2;             
					yy2 = y2; 
					break;

		case 2:		xx1 = x1;
					yy1 = y1;                 
					xx2 = x2;
					yy2 = y1+fr*(y2-y1); 
					break;

		case 3:		xx1 = x1;
					yy1 = y2-fr*(y2-y1);       
					xx2 = x2;
					yy2 = y2;
					break;

		default:	xx1 = x1; 
					yy1 = y1; 
					xx2 = x1+fr*(x2-x1); 
					yy2 = y2;
					break;
	}
	
	if ( amount > 50 )	
	{
		col = Color_MergeRGB(midcol, maxcol, (amount - 50.0) / 50.0);
	}
	else {
		col = Color_MergeRGB(mincol, midcol, amount / 50.0);
	}

	draw_rectangle_color(xx1, yy1, xx2, yy2, col, col, col, col, false);
	if ( showborder )
	{
		draw_rectangle_color(xx1, yy1, xx2, yy2, clBlack, clBlack, clBlack, clBlack, true);
	}
}



// #############################################################################################
/// Function:<summary>
///             Sets the precision with which circles are drawn, that is, the number of segments 
///             they consist of. The precision must lie between 4 and 64 and must be dividable 
///             by 4. This is also used for drawing ellipses and rounded rectangles.
///
///             This is ignored.
///
///          </summary>
///
/// In:		 <param name="_precision"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_set_circle_precision(_precision) 
{
    // function ignored.
}

// #############################################################################################
/// Function:<summary>
///				Draws an arrow with a point of the indicated size
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="size"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_arrow(x1, y1, x2, y2, size)
{
	var dd = Math.sqrt( ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)) );
	if (dd != 0) 
	{    
	    if (size > dd) {
	        size = dd;
	    }
	    var xx = size * (x2-x1)/dd;
	    var yy = size * (y2-y1)/dd;

	    draw_line(x1, y1, x2, y2);
	    draw_triangle(x2-xx-yy/3.0, y2-yy+xx/3.0, x2, y2, x2-xx+yy/3.0, y2-yy-xx/3.0, false);
	}
}

// #############################################################################################
/// Function:<summary>
///				Draws an ellipse with the given bounding box in the current color
///				outline indicates whether to only draw the outline
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="outline"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_ellipse(x, y, x1, y1, outline)
{    
    var w = x1 - x;
    var h = y1 - y;

    var kappa = 0.5522848;
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

    graphics.beginPath();
    graphics.moveTo(x, ym);
    graphics.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    graphics.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    graphics.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    graphics.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    graphics.closePath();
 
 
    graphics.globalAlpha = g_GlobalAlpha;
    if (outline) {   
        graphics.strokeStyle = g_GlobalColour_HTML_RGBA;
        graphics.stroke();
    }
    else {
        graphics.fillStyle = g_GlobalColour_HTML_RGBA;        
        graphics.fill();
    }
}


// #############################################################################################
/// Function:<summary>
///				Draws an ellipse with the given bounding box in the current color
///				outline indicates whether to only draw the outline
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="outline"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_ellipse_color(x, y, x1, y1, _col1,_col2, outline)
{    
    var w = x1 - x;
    var h = y1 - y;

    var kappa = 0.5522848;
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

    graphics.beginPath();
    graphics.moveTo(x, ym);
    graphics.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    graphics.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    graphics.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    graphics.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    graphics.closePath();
 
    var col1 = GetHTMLRGBA( ConvertGMColour(_col1), 1.0);
    var col2 = GetHTMLRGBA( ConvertGMColour(_col2), 1.0);
    var gradient = graphics.createRadialGradient( xm,ym, 0, xm, ym, min(w/2,h/2) );
    gradient.addColorStop(0, col1);
    gradient.addColorStop(1, col2);
 
    graphics.globalAlpha = g_GlobalAlpha;
    if (outline) {   
        graphics.strokeStyle = gradient; 
        graphics.stroke();
    }
    else {
        graphics.fillStyle = gradient; 
        graphics.fill();
    }
}


// #############################################################################################
/// Function:<summary>
///          	Draws a circle at (x,y) with radius r. outline indicates whether only the 
///             outline must be drawn (true) or it should be filled (false).
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_r"></param>
///			<param name="_outline">true to draw an outline</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_circle_color(_x,_y,_r,_col1,_col2,_outline)
{
    graphics.globalAlpha = g_GlobalAlpha;

    var col1 = GetHTMLRGBA( ConvertGMColour(_col1), 1.0);
    var col2 = GetHTMLRGBA( ConvertGMColour(_col2), 1.0);
    var gradient = graphics.createRadialGradient( _x,_y, 0, _x, _y, _r );
    gradient.addColorStop(0, col1);
    gradient.addColorStop(1, col2);
 
    graphics.beginPath();
    if( _outline )
    {
        graphics.strokeStyle = gradient; //g_GlobalColour_HTML_RGBA; 
        graphics._arc(_x, _y, _r, 0, Math.PI*2, true); 
        graphics._stroke();
	} else
	{
        graphics.fillStyle = gradient; //g_GlobalColour_HTML_RGBA;
        graphics._arc(_x, _y, _r, 0, Math.PI*2, false); 
        graphics._fill();
	}
	graphics._closePath();
}

// #############################################################################################
/// Function:<summary>
///          	Draws a circle at (x,y) with radius r. outline indicates whether only the 
///             outline must be drawn (true) or it should be filled (false).
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_r"></param>
///			<param name="_outline">true to draw an outline</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_circle(_x,_y,_r,_outline)
{
    graphics.globalAlpha = g_GlobalAlpha;
    graphics.beginPath();
    if (_outline)
    {
        graphics.strokeStyle = g_GlobalColour_HTML_RGBA; 
        graphics._arc(_x, _y, _r, 0, Math.PI*2, true); 
        graphics._stroke();
	} 
	else
	{
        graphics.fillStyle = g_GlobalColour_HTML_RGBA;
        graphics._arc(_x, _y, _r, 0, Math.PI*2, false); 
        graphics._fill();
	}
	graphics._closePath();
}


// #############################################################################################
/// Function:<summary>
///          	Plot a single point
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    draw_point_color( _x,_y, _col )
{
    var col1 = GetHTMLRGBA( ConvertGMColour(_col), 1.0);

    graphics.globalAlpha = g_GlobalAlpha;
    graphics.fillStyle = col1;
    graphics._fillRect(_x,_y,1,1);
}




// #############################################################################################
/// Function:<summary>
///          	Draws a line from (x1,y1) to (x2,y2) with width w.
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_w"></param>
///				
// #############################################################################################
function draw_line_width_color(_x1,_y1,_x2,_y2,_w,_col1,_col2) 
{
    // Start from the top-left point.
	graphics.globalAlpha = g_GlobalAlpha;

    var col1 = GetHTMLRGBA( ConvertGMColour(_col1), 1.0);
    var col2 = GetHTMLRGBA( ConvertGMColour(_col2), 1.0);
    var gradient = graphics.createLinearGradient(_x1, _y1, _x2, _y2);
    gradient.addColorStop(0, col1);
    gradient.addColorStop(1, col2);
    
	graphics.strokeStyle = gradient; //g_GlobalColour_HTML_RGBA;

    graphics.lineWidth = _w;
    graphics._beginPath();
    graphics._moveTo(_x1 + 0.5, _y1 + 0.5);
    graphics._lineTo(_x2 + 0.5, _y2 + 0.5);
    graphics._stroke();
    graphics._closePath();
}


// #############################################################################################
/// Function:<summary>
///          	Draws a line from (x1,y1) to (x2,y2) with width w.
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
///			<param name="_w"></param>
///				
// #############################################################################################
function draw_line_color(_x1,_y1,_x2,_y2,_col1,_col2) 
{
    draw_line_width_color(_x1,_y1, _x2,_y2, 1, _col1,_col2);
}

// #############################################################################################
/// Function:<summary>
///             Draws a button, up indicates whether up (1) or down (0).
///          </summary>
///
/// In:		 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
///			 <param name="_down"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_button(_x1, _y1, _x2, _y2, _down)
{
    _x1+=1.5;
    _y1+=1.5;
    _x2-=0.5;
    _y2-=0.5;

	if ( !_down )
	{
	    draw_line_width_color(_x1,_y1,_x2,_y1,2, 0xffffff, 0xffffff );
	    draw_line_width_color(_x1,_y1,_x1,_y2,2, 0xffffff, 0xffffff );

	    draw_line_width_color(_x2,_y1,_x2,_y2,2, 0x404040, 0x404040 );
	    draw_line_width_color(_x2,_y2,_x1,_y2,2, 0x404040, 0x404040 );
	}
	else
	{
	    draw_line_width_color(_x1,_y1,_x2,_y1,2, 0x404040, 0x404040 );
	    draw_line_width_color(_x1,_y1,_x1,_y2,2, 0x404040, 0x404040 );

	    draw_line_width_color(_x2,_y1,_x2,_y2,2, 0xffffff, 0xffffff );
	    draw_line_width_color(_x2,_y2,_x1,_y2,2, 0xffffff, 0xffffff );
	}

    graphics.globalAlpha = 1;
    graphics.fillStyle = g_GlobalColour_HTML_RGBA;
    var w = (_x2-_x1)-2;
    var h = (_y2-_y1)-2;
    graphics._fillRect(_x1+1,_y1+1,w,h);
}


// #############################################################################################
/// Function:<summary>
///				Draws an ellipse with the given bounding box with a gradient from the centre
///             of the ellipse to the max radius of the ellipse
///          </summary>
///
/// In:		 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="x2"></param>
///			 <param name="y2"></param>
///			 <param name="outline"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function draw_ellipse_gradient(x, y, x1, y1, col1, col2, outline) 
{
    var w = x1 - x;
    var h = y1 - y;

    var kappa = 0.5522848;
    ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

    graphics.beginPath();
    graphics.moveTo(x, ym);
    graphics.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    graphics.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    graphics.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    graphics.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    graphics.closePath();

    var c1 = GetHTMLRGBA( ConvertGMColour(col1), g_GlobalAlpha);
    var c2 = GetHTMLRGBA( ConvertGMColour(col2), g_GlobalAlpha);    

    var gradient = graphics.createRadialGradient(xm, ym, 0, xm, ym, w);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);

    graphics.globalAlpha = g_GlobalAlpha;
    if (outline) {
        graphics.strokeStyle = gradient;
        graphics.stroke();
    }
    else {
        graphics.fillStyle = gradient;
        graphics.fill();
    }
}

// #############################################################################################
/// Function:<summary>
///          	Indicates what blend mode to use. The following values are possible: 
///				bm_normal, bm_add, bm_subtract, and bm_max. Don't forget to reset the mode to normal 
///				after use because otherwise also other sprites and even the backgrounds are drawn 
///				with the new blend mode.
///          </summary>
///
/// In:		<param name="mode"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_set_blend_mode(mode) {
	ErrorFunction("draw_set_blend_mode()");
}
// #############################################################################################
/// Function:<summary>
///          	Indicates what blend mode to use for both the source and destination color. 
///				The new color is some factor times the source and another factor times the destination. 
///				These factors are set with this function. To understand this, the source and destination 
///				both have a red, green, blue, and alpha component. So the source is (Rs, Gs, Bs, As) and 
///				the destination is (Rd, Gd, Bd, Ad). All are considered to lie between 0 and 1. 
///          </summary>
///
/// In:		<param name="src"></param>
///			<param name="dest"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_set_blend_mode_ext(src, dest) {
	ErrorFunction("draw_set_blend_mode_ext()");
}