// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyFont.js
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
///             Initialise a Font from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
// #############################################################################################
function    yyFont( )
{
	this.runtime_created = false;
	this.spritefont = false;

	this.pName = "";
    this.size = 12;
    this.bold = false;
    this.italic = false;
    this.first = 32;			// FIRST chartacter we support
    this.last =  127;			// LAST character we support
    this.fontstyle = "";		// used in "web fonts" to hold the font style
	this.prop = false;			// used in a sprite font to indicate proportional.
    
    this.antialias = 0;
    this.charset = 0;       
    this.scalex = 1;
    this.scaley = 1;

    this.glyphs = null;
    this.TPEntry = null;
    this.pSprites = null;
}

// #############################################################################################
/// Function: <summary>
///           	Create a font from storage
///           </summary>
// #############################################################################################
yyFont.prototype.CreateFromStorage = function(_pStorage)
{
	this.pName = _pStorage.pName;
	this.size = _pStorage.size;
	this.bold = _pStorage.bold;
	this.italic = _pStorage.italic;
	this.first = _pStorage.first & 0xffff;
	this.runtime_created = false;

	this.antialias = 0;
	this.charset = 0;
	if (((_pStorage.first >> 16) & 0xff) !== 0) this.charset = (_pStorage.first >> 16) & 0xff;
	if (((_pStorage.first >> 24) & 0xff) !== 0) this.antialias = ((_pStorage.first >> 24) & 0xff) - 1;

	this.last = _pStorage.last;
	this.scalex = _pStorage.scaleX;
	this.scaley = _pStorage.scaleY;
	this.glyphs = _pStorage.glyphs;
	this.TPEntry = Graphics_GetTextureEntry(_pStorage.TPageEntry);
};




// #############################################################################################
/// Function:<summary>
///				Returns the height of the text
///          </summary>
///
/// In:		 <param name="str">String to get height of</param>
/// Out:	 <returns>
///				Height of the string provided
///			 </returns>
// #############################################################################################
yyFont.prototype.TextHeight = function (_str) {
	if (this.runtime_created)
	{
		if (this.spritefont)
		{
			var c = _str.charCodeAt(0);
			if (c < this.first || c > this.last) c = this.first;
			var pTPE = this.pSprites.ppTPE[c - this.first];
			return pTPE.CropHeight;
		} else
		{
			return this.size;
		}
	} else
	{
		return this.glyphs[this.first].h;
	}
};


// #############################################################################################
/// Function:<summary>
///				Returns the width of the text
///          </summary>
///
/// In:		 <param name="str">String to get width of</param>
/// Out:	 <returns>
///				Width of the text string provided
///			 </returns>
// #############################################################################################
yyFont.prototype.TextWidth = function (str) {
	if (str == null) return 0;

	if (this.runtime_created)
	{
		if (this.spritefont)
		{
			var Result = 0;
			var i = 0;
			while (i < str.length)
			{
				var c = str.charCodeAt(i++);
				if (c < this.first || c > this.last) c = this.first;

				var pTPE = this.pSprites.ppTPE[c - this.first];
				if (this.prop) Result += pTPE.CropWidth; else Result += pTPE.ow;
			}
			return Result;
		} else
		{
			graphics.font = this.fontstyle;
			var metrics = graphics.measureText(str);
			return metrics.width;
		}
	} else
	{
		var Result = 0;
		var i = 0;
		while (i < str.length)
		{
			var c = str.charCodeAt(i++);
			if (c < 0 || c > 255) c = this.first;
			Result = Result + this.glyphs[c].shift;   // s_shift[ pStr[-1] ]; 
		}
		return Result;
	}
};


// #############################################################################################
/// Function:<summary>
///				Returns the shift for the character
///          </summary>
///
/// In:		 <param name="ch">character to get shift(Kerning?) of.</param>
/// Out:	 <returns>
///				SHIFT (kerning?) of the character
///			 </returns>
// #############################################################################################
yyFont.prototype.GetShift = function (ch) {

	if (this.runtime_created)
	{
		if (this.spritefont)
		{
			var Result = 0;
			if (ch < this.first || ch > this.last) ch = this.first;

			var pTPE = this.pSprites.ppTPE[ch - this.first];
			if (this.prop) Result += pTPE.CropWidth; else Result += pTPE.ow;
			return Result;
		} else
		{
			graphics.font = this.fontstyle;
			var metrics = graphics.measureText(ch);
			return metrics.width;
		}
	}


	if (ch >= this.first && ch <= this.last)				// get the character shift
	{
		return this.glyphs[ch].shift;
	}
	else if (0x20 >= this.first && 0x20 <= this.last)		// make sure we HAVE a space in the character set
	{
		return this.glyphs[0x20].shift;
	}
	else
	{
		return this.glyphs[this.first].shift; 							// failing all that, just use the 1st character in the font
	}
};




// #############################################################################################
/// Function:<summary>
///				Draw a string in the indicated color at the indicated place
///          </summary>
///
/// In:		 <param name="_x">X coordinate to render at</param>
///			 <param name="_y">Y coordinate to render at</param>
///			 <param name="_pStr">string to draw</param>
///			 <param name="_col">Colour to render with</param>
///			 <param name="_alpha">Alpha value to draw with</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyFont.prototype.Draw_String = function (_x, _y, _pStr, _xscale, _yscale, _angle, _col, _alpha) {

	var cached_image;
	var TP = g_Textures[this.TPEntry.tp];
	if (!TP.complete) return;                   // if texture hasn't loaded, return...

	graphics.globalAlpha = _alpha;
	var len = _pStr.length;

	// If coloured, then cache a "colourised" version
	_col = _col & 0xffffff;
	if (_col != 0xffffff){
		cached_image = Graphics_CacheBlock(this.TPEntry, _col);
	}



	_angle = RAD(_angle);
	if (Math.abs(_angle) > 0.001)
	{
		Graphics_PushTransform(_x, _y, this.scalex * _xscale, this.scalex * _yscale, -_angle);
		_x = 0;
		_y = 0;
	}

	for (var i = 0; i < len; i++)
	{
		ch = _pStr.charCodeAt(i);
		if (ch < this.first || ch > this.last) ch = 0x20;

		var xs = this.glyphs[ch].x;
		var ys = this.glyphs[ch].y;
		var ws = this.glyphs[ch].w;
		var hs = this.glyphs[ch].h;

		// use a matrix to rotate and position it..
		if ((_col != 0xffffff) && (cached_image != null))
		{
			if (Math.abs(_angle) < 0.001)
			{
				graphics._drawImage(cached_image, xs, ys, ws, hs, _x + this.glyphs[ch].offset, _y, ws * this.scalex * _xscale, hs * this.scaley * _yscale);
			} else
			{
				graphics._drawImage(cached_image, xs, ys, ws, hs, _x + this.glyphs[ch].offset, _y, ws, hs);
			}
		} else
		{
			if (Math.abs(_angle) < 0.001)
			{
				graphics._drawImage(TP, xs + this.TPEntry.x, ys + this.TPEntry.y, ws, hs, _x + this.glyphs[ch].offset, _y, ws * this.scalex * _xscale, hs * this.scaley * _yscale);
			} else{
				graphics._drawImage(TP, xs + this.TPEntry.x, ys + this.TPEntry.y, ws, hs, _x + this.glyphs[ch].offset, _y, ws, hs);
			}
		}
		_x += this.GetShift( ch );
	}
	if (Math.abs(_angle) > 0.001) Graphics_SetTransform();
};


// #############################################################################################
/// Function:<summary>
///				Draw a string using a SPRITE font in the indicated color at the indicated place
///          </summary>
///
/// In:		 <param name="_x">X coordinate to render at</param>
///			 <param name="_y">Y coordinate to render at</param>
///			 <param name="_pStr">string to draw</param>
///			 <param name="_col">Colour to render with</param>
///			 <param name="_alpha">Alpha value to draw with</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyFont.prototype.Draw_Sprite_String = function (_x, _y, _pStr, _xscale, _yscale, _angle, _col, _alpha) {

	if (this.pSprites == null) return;
	graphics.globalAlpha = _alpha;

	var len = _pStr.length;
	_col = _col & 0xffffff;


	_angle = RAD(_angle);
	var ss = Math.sin(_angle);
	var cc = Math.cos(_angle);
	var ss_xsc = ss * _xscale;
	var cc_xsc = cc * _xscale;

	var xsc = this.scalex * _xscale;
	var ysc = this.scaley * _yscale;

	for (var i = 0; i < len; i++)
	{
		ch = _pStr.charCodeAt(i);
		if (ch < this.first || ch > this.last)
		{
		}
		else
		{

			var x = _x;
			var y = _y;

			var pTPE = this.pSprites.ppTPE[ch - this.first];
			var TP = g_Textures[pTPE.tp]; 		// get texture page
			if (TP.complete)							// make sure texture has loaded
			{
				var ox = pTPE.XOffset;
				var oy = pTPE.YOffset;
				if (this.prop) ox = 0;

				// If coloured, then cache a "colourised" version
				if (_col != 0xffffff)
				{
					var cached_image = Graphics_CacheBlock(pTPE, _col);

					if (Math.abs(_angle) < 0.001)
					{
						graphics._drawImage(cached_image, 0, 0, pTPE.CropWidth, pTPE.CropHeight, x + (ox * xsc), y + (oy * ysc), pTPE.CropWidth * xsc, pTPE.CropHeight * ysc);
					} else
					{
						// use a matrix to rotate and position it..
						Graphics_PushTransform(x, y, xsc, ysc, -_angle);
						graphics._drawImage(cached_image, 0, 0, pTPE.CropWidth, pTPE.CropHeight, ox, oy, pTPE.CropWidth, pTPE.CropHeight);
						Graphics_SetTransform();
					}
				} else
				{
					if (Math.abs(_angle) < 0.001)
					{
						graphics._drawImage(TP, pTPE.x, pTPE.y, pTPE.w, pTPE.h, x + (ox * xsc), y + (oy * ysc), pTPE.CropWidth * xsc, pTPE.CropHeight * ysc);
					} else
					{
						Graphics_PushTransform(x, y, xsc, ysc, -_angle);
						graphics._drawImage(TP, pTPE.x, pTPE.y, pTPE.w, pTPE.h, ox, oy, pTPE.CropWidth, pTPE.CropHeight);
						Graphics_SetTransform();
					}
				}
			}
		}
		var shift;
		if (!this.prop) shift = pTPE.ow+1; else shift = pTPE.CropWidth+1;
		_x = _x + cc_xsc * shift;
		_y = _y - ss_xsc * shift;
	}
};





























// #############################################################################################
/// Function:<summary>
///             Create a new Font manager
///          </summary>
// #############################################################################################
function    yyFontManager( )
{
    this.Fonts = [];
    this.length = 0;
    this.thefont = null;
    this.fontid = 0;
    this.valign = 0;
    this.halign = 0;
}

// #############################################################################################
/// Function:<summary>
///             Get a Font from the manager
///          </summary>
///
/// In:		 <param name="_indexe">Font to retrieve</param>
// #############################################################################################
yyFontManager.prototype.Font_Get = function (_index) {
	return this.Fonts[_index];
};

// #############################################################################################
/// Function:<summary>
///             Add a new Font image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Font image Storage</param>
// #############################################################################################
yyFontManager.prototype.Clear = function () {
	this.Fonts = [];
	length = 0;
};


// #############################################################################################
/// Function:<summary>
///             Add a new Font image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Font image Storage</param>
// #############################################################################################
yyFontManager.prototype.Add = function (_pStorage) {
	var pFont = null;
	if (_pStorage != null)
	{
		pFont = new yyFont();
		pFont.CreateFromStorage(_pStorage);
	}
	this.Fonts[this.Fonts.length] = pFont;
	return this.Fonts.length - 1;
};

// #############################################################################################
/// Function:<summary>
///             Add a new Font image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Font image Storage</param>
// #############################################################################################
yyFontManager.prototype.AddFont = function (_pFont) {
	this.Fonts[this.Fonts.length] = _pFont;
	return this.Fonts.length - 1;
};

// #############################################################################################
/// Function:<summary>
// Sets the current font correctly
///          </summary>
// #############################################################################################
yyFontManager.prototype.SetFont = function () {
	if (this.fontid >= 0 && this.fontid <= this.Fonts.length && this.Fonts[this.fontid] != null)
	{
		this.thefont = this.Fonts[this.fontid];
	}
	else
	{
		//if ( deffont == NULL ) MakeDefaultFont();
		this.thefont = this.Fonts[0]; //deffont;
	}
};



// #############################################################################################
/// Function:<summary>
// Sets the current font correctly
///          </summary>
// #############################################################################################
yyFontManager.prototype.Get = function( _id ) {
	if (_id >= 0 && _id <= this.Fonts.length && this.Fonts[_id] )
	{
		return this.Fonts[_id];
	}
	return null;
};


// #############################################################################################
/// Function:<summary>
///				replaces hash marks with newline characters
///          </summary>
///
/// In:		 <param name="str"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    String_Replace_Hash(str)
{
	if ( str == null) return 0;

	var pS = str;
	var pD = "";	
	var i=0;
	var si = 0;

	while(si<pS.length )
	{
		var s = pS[si];
		if ( s == '#' )
		{
			if ( i>0 )
			{
				if(pS[si-1] == '\\')
				{					
					pD = pD.substring(0,pD.length-1)+'#';       // the length doesn't change here, so we don't need curr++
				} 
				else
				{
					pD += String.fromCharCode(0x0a);
					i++;
				} 
			} 
		} 
		else
		{
			pD += s;
			i++;
		} 		
		si++;       //++pS;
	} 
	return pD;
}



// #############################################################################################
/// Function:<summary>
///				Splits the text in individual lines and stores them in sl
///          </summary>
///
/// In:		 <param name="str">String to split</param>
///			 <param name="linewidth"></param>
///			 <param name="sl"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyFontManager.prototype.Split_TextBlock = function (_pStr, linewidth) {
	//with(this)
	{
		var newline = String.fromCharCode(0x0a);
		if (_pStr == null) return;
		if (linewidth < 0) linewidth = 10000000; 	// means nothing will "wrap"

		sl = [];
		var sl_index = 0;

		// put newlines in
		_pStr = String_Replace_Hash(_pStr);
		var len = _pStr.length;

		// Allocate new space
		var pNew = _pStr;
		//sl->pBaseString = pNew;

		var start = 0;
		var end = 0;
		while (start < len)
		{
			var total = 0;


			// If width < 0 (i.e. no wrapping required), then we DON'T strip spaces from the start... we just copy it!  (sounds wrong.. but its what they do...)
			if (linewidth == 10000000)
			{
				while (end < len && pNew[end] != newline)
				{ // && pNew[end] != 10 ){
					end++;
				}
				//pNew[end]=0x00;				// mark END of string
				sl[sl_index++] = pNew.substring(start, end); 	// add into our list...
			}
			else
			{
				// Skip leading whitespace
				while (end < len)
				{
					if (pNew[end] != " ") break;
					end++;
				}


				// Loop through string and get the number of chars that will fit in the line.
				while (end < len && total < linewidth)
				{
					c = pNew[end];
					if (c == newline) break; 				// if we hit a newline, then "break" here...
					total += this.thefont.GetShift(c.charCodeAt(0)); 		// add on width of character
					end++;
				}
				// If we shot past the end, then move back a bit until we fit.
				if (total > linewidth)
				{
					end--;
					total -= this.thefont.GetShift(pNew.charCodeAt(end)); 			// add on width of character
				}

				// END of line
				if (pNew[end] == newline)
				{
					//pNew[end] = 0x00;
					sl[sl_index++] = pNew.substring(start, end);
				} else
				{
					// NOT a new line, but we didn't move on... fatel error. Probably a single char doesn't even fit!
					if (end == start) return sl;


					// If we don't END on a "space", OR if the next character isn't a space AS WELL. 
					// then backtrack to the start of the last "word"
					if (end != len)
					{
						if ((pNew[end] != " ") || (pNew[end] != " " && pNew[end + 1] != " "))
						{
							while (end > start)
							{
								if (pNew[--end] == " ") break; 				// FOUND start of word
							}
						}
					}

					if (end > 0)
					{
						while (pNew[end - 1] == " ")
						{
							end--;
						}
					}
					//pNew[end]=0x00;				// mark END of string
					sl[sl_index++] = pNew.substring(start, end);
				}
			}

			start = ++end;
		}

		return sl;
	}
};



// #############################################################################################
/// Function:<summary>
///				Draws a string in a block in the current font at the given location
///          </summary>
///
/// In:		 <param name="x">X coordinate</param>
///			 <param name="y">Y coordinate</param>
///			 <param name="str">String to print</param>
///			 <param name="linesep"></param>
///			 <param name="linewidth"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyFontManager.prototype.GR_Text_Draw = function (str, x, y, linesep, linewidth, _angle, _xscale, _yscale) {
	with (this)
	{
		var xscale = _xscale;
		var yscale = _yscale;
		var xoff = 0.0;
		var yoff = 0.0;
		var sl = [];
		var i = 0;

 		SetFont();

		sl = Split_TextBlock(str, linewidth);

		// compute positions and steps
		var ang = RAD(_angle);
		var ss = Math.sin(ang);
		var cc = Math.cos(ang);

		if (linesep < 0)
		{
			linesep = thefont ? thefont.TextHeight("M") : 20; // if we don't have a font then use a magic number height :/
		}
		var xsep = ss * yscale * linesep;
		var ysep = cc * yscale * linesep;

		if (valign == 1)
		{
			y = y - Math.round((sl.length * ysep) / 2.0);
			x = x - Math.round((sl.length * xsep) / 2.0);
		}

		if (valign == 2)
		{
			y = y - Math.round(sl.length * ysep);
			x = x - Math.round(sl.length * xsep);
		}


		// draw it
		if (!thefont)
		{
			graphics.fillText(str, x, y);
		}
		else
		{
			for (i = 0; i <= sl.length - 1; i++)
			{
				xoff = 0;
				yoff = 0;
				var pStr = sl[i];
				if (pStr != null)
				{
					if (halign == 1) xoff = -(xscale * thefont.TextWidth(pStr) / 2);
					if (halign == 2) xoff = -(xscale * thefont.TextWidth(pStr));

					var xx = x + cc * xoff + ss * yoff;
					var yy = y - ss * xoff + cc * yoff;
					if (thefont.runtime_created)
					{
						if (thefont.spritefont)
						{
							thefont.Draw_Sprite_String(xx, yy, pStr, xscale, yscale, _angle, g_GlobalColour, g_GlobalAlpha);
						} else
						{
							Graphics_DrawText(thefont.fontstyle, pStr, xx, yy, 1, 1, _angle, g_GlobalColour, g_GlobalAlpha);
						}
					} else
					{
						thefont.Draw_String(xx, yy, pStr, xscale, yscale, _angle, g_GlobalColour, g_GlobalAlpha);  //GR_Draw_Get_Color(), 1.0 ); //(float) GR_Draw_Get_Alpha() );
					}
				}
				y = y + ysep;
				x = x + xsep;
			}
		}
	}
};



// #############################################################################################
/// Property: <summary>
///           	Work out the width/height of a block of text.
///           </summary>
// #############################################################################################
yyFontManager.prototype.GR_Text_Sizes = function (str, x, y, linesep, linewidth ) {
	with (this)
	{
		var sl = [];
		var i = 0;
		g_ActualTextWidth = g_ActualTextHeight = 0;

		SetFont();

		sl = Split_TextBlock(str, linewidth);
		if (linesep < 0) linesep = thefont.TextHeight("M");

		// draw it
		for (i = 0; i <= sl.length - 1; i++)
		{
			var pStr = sl[i];
			if (pStr != null){
				if (g_ActualTextWidth < thefont.TextWidth(pStr)) g_ActualTextWidth = thefont.TextWidth(pStr);
			}
			g_ActualTextHeight += linesep;
		}
	}
};
