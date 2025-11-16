// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			Function_Font.js
// Created:			01/08/2011
// Author:			Mike
// Project:			HTML5
// Description:		Code for rendering and processing fonts.
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 01/08/2011		V1.1		MJD		Split off from graphics code into it's own set.
//
// **********************************************************************************************************************


function    draw_set_halign( _align )
{
    g_pFontManager.halign  = _align;
}

function    draw_set_valign( _align )
{
    g_pFontManager.valign  = _align;
}

function    draw_set_font( _font )
{
    g_pFontManager.fontid = _font;
}


// #############################################################################################
/// Function:<summary>
///          	Draws the string at position (x,y), using the drawing color and alpha. 
///				A # symbol or carriage return chr(13) or linefeed chr(10) are interpreted as newline 
///				characters. In this way you can draw multi-line texts. (Use \# to get the # symbol itself.)
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text(_x, _y, _text) {
	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, -1, -1, 0, 1, 1);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the string at position (x,y) like above. The four colors specify the colors 
///				of the top-left, top-right, bottom-right, and bottom-left corner of the text. 
///				alpha is the alpha transparency to be used (0-1).
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_c1"></param>
///			<param name="_c2"></param>
///			<param name="_c3"></param>
///			<param name="_c4"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_color(_x, _y, _text, _c1, _c2, _c3, _c4, _alpha)
{
	WarningFunction("draw_text_color() only uses the 1st colour");
	var oldalpha = g_GlobalAlpha;
	var oldcol = g_GlobalColour;
	g_GlobalAlpha = _alpha;
	g_GlobalColour = GetHTMLRGB(ConvertGMColour(_c1));

	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, -1, -1, 0, 1, 1);

	g_GlobalAlpha = oldalpha;
	g_GlobalColour = oldcol;
}


// #############################################################################################
/// Function:<summary>
///          	Similar to the previous routine but you can specify two more things. 
///				First of all, sep indicates the separation distance between the lines of text in a 
///				multiline text. Use -1 to get the default distance. Use w to indicate the width of 
///				the text in pixels. Lines that are longer than this width are split- up at spaces 
///				or - signs. Use -1 to not split up lines.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_sep"></param>
///			<param name="_w"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_ext(_x, _y, _text, _sep, _w) {
	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, _sep, _w, 0, 1, 1);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the string at position (x,y) in the same way as above, but scale it horizontally 
///				and vertically with the indicated factors and rotate it counter-clockwise over angle degrees.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_angle"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_transformed(_x, _y, _text, _xscale, _yscale, _angle) {
	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, -1, -1, _angle, _xscale, _yscale);
}

// #############################################################################################
/// Function:<summary>
///          	Combines the function draw_text_ext and draw_text_transformed. It makes it possible 
///				to draw a multi-line text rotated and scaled.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_sep"></param>
///			<param name="_w"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_angle"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_ext_transformed(_x, _y, _text, _sep, _w, _xscale, _yscale, _angle) {
	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, _sep, _w, _angle, _xscale, _yscale);
}


// #############################################################################################
/// Function:<summary>
///          	Similar to draw_text_ext_transformed() but with colored vertices.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_sep"></param>
///			<param name="_w"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_angle"></param>
///			<param name="_c1"></param>
///			<param name="_c2"></param>
///			<param name="_c3"></param>
///			<param name="_c4"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_ext_transformed_color(_x, _y, _text, _sep, _w, _xscale, _yscale, _angle, _c1, _c2, _c3, _c4, _alpha) {
	WarningFunction("draw_text_ext_transformed_color() only uses the 1st colour");

	var oldalpha = g_GlobalAlpha;
	var oldcol = g_GlobalColour;
	g_GlobalAlpha = _alpha;
	g_GlobalColour = ConvertGMColour(_c1);
	g_GlobalColour_HTML_RGBA = GetHTMLRGB(g_GlobalColour);

	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, _sep, _w, _angle, _xscale, _yscale);

	g_GlobalAlpha = oldalpha;
	g_GlobalColour = oldcol;
}


// #############################################################################################
/// Function:<summary>
///          	Similar to draw_text_transformed() but with colored vertices.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_y"></param>
///			<param name="_text"></param>
///			<param name="_xscale"></param>
///			<param name="_yscale"></param>
///			<param name="_angle"></param>
///			<param name="_c1"></param>
///			<param name="_c2"></param>
///			<param name="_c3"></param>
///			<param name="_c4"></param>
///			<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_text_transformed_color(_x, _y, _text, _xscale, _yscale, _angle, _c1, _c2, _c3, _c4, _alpha) {
	WarningFunction("draw_text_transformed_color() only uses the 1st colour");

	var oldalpha = g_GlobalAlpha;
	var oldcol = g_GlobalColour;
	g_GlobalAlpha = _alpha;
	g_GlobalColour = ConvertGMColour(_c1);
	g_GlobalColour_HTML_RGBA = GetHTMLRGB(g_GlobalColour);

	g_pFontManager.GR_Text_Draw(_text.toString(), _x, _y, -1, -1, _angle, _xscale, _yscale);

	g_GlobalAlpha = oldalpha;
	g_GlobalColour = oldcol;
}



// #############################################################################################
/// Function:<summary>
///          	Height of the string in the current font as it would be drawn using the draw_text() function.
///          </summary>
///
/// In:		<param name="_text"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_height(_text) {
	g_pFontManager.SetFont();
	var newlines = 1;
	for (var i = 0; i < _text.length; i++){
		if (_text[i] == '#') newlines++;
	}
	return g_pFontManager.thefont.TextHeight("M") * newlines;
}
// #############################################################################################
/// Function:<summary>
///				Width of the string in the current font as it would be drawn using the draw_text() 
///				function. Can be used for precisely positioning graphics.
///          </summary>
///
/// In:		<param name="_text"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_width(_text) {
	g_pFontManager.SetFont();
	return g_pFontManager.thefont.TextWidth(_text);
}


// #############################################################################################
/// Function:<summary>
///          	Width of the string in the current font as it would be drawn using the draw_text_ext() 
///				function. Can be used for precisely positioning graphics.
///          </summary>
///
/// In:		<param name="_string"></param>
///			<param name="_sep"></param>
///			<param name="_w"></param>
/// Out:	<returns>
///				The WIDTH in pixels that the string takes up.
///			</returns>
// #############################################################################################
function string_width_ext(_string, _sep, _w) {
	g_pFontManager.SetFont();
	g_pFontManager.GR_Text_Sizes(_string, 0, 0, _sep, _w, 0);
	return g_ActualTextWidth;
}

// #############################################################################################
/// Function:<summary>
///          	Height of the string in the current font as it would be drawn using the 
///				draw_text_ext() function.
///          </summary>
///
/// In:		<param name="_string"></param>
///			<param name="_sep"></param>
///			<param name="_w"></param>
/// Out:	<returns>
///				The WIDTH in pixels that the string takes up.
///			</returns>
// #############################################################################################
function string_height_ext(_string, _sep, _w) {
	g_pFontManager.SetFont();
	g_pFontManager.GR_Text_Sizes(_string, 0, 0, _sep, _w, 0);
	return g_ActualTextHeight;
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether a font with the given index exists.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_exists(_id) {
	if (g_pFontManager.Get(_id)) return true; else return false;
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether the font with the given index is bold.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_bold(_id) {
	var pFont = g_pFontManager.Get(_id);
	if(!pFont) return false;

	return pFont.bold;
}

// #############################################################################################
/// Function:<summary>
///          	 Returns the fontname of the font with the given index.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_fontname(_id) {
	var pFont = g_pFontManager.Get(_id);
	if (!pFont) return "";

	return pFont.pName;
}
var font_name  = font_get_fontname;


// #############################################################################################
/// Function:<summary>
///          	 Returns whether the font with the given index is italic.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_italic(_id) {
	var pFont = g_pFontManager.Get(_id);
	if (!pFont) return false;

	return pFont.italic;
}

// #############################################################################################
/// Function:<summary>
///          	 Returns the index of the first character in the font with the given index.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_first(_id) {
	var pFont = g_pFontManager.Get(_id);
	if (!pFont) return 0;

	return pFont.first;
}

// #############################################################################################
/// Function:<summary>
///          	 Returns the index of the last character in the font with the given index.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_last(_id) {
	var pFont = g_pFontManager.Get(_id);
	if (!pFont) return 255;

	return pFont.last;
}


// #############################################################################################
/// Function:<summary>
///          	 Returns the size of the font with the given index.
///          </summary>
///
/// In:		<param name="_id">Font ID</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_get_size(_id) {
	var pFont = g_pFontManager.Get(_id);
	if (!pFont) return 0;

	return pFont.size;
}


// #############################################################################################
/// Function:<summary>
///          	Adds a new font and returns its index, indicating the name, size, whether it is 
///				bold or italic, and the first and last character that must be created.
///          </summary>
///
/// In:		<param name="name"></param>
///			<param name="size"></param>
///			<param name="bold"></param>
///			<param name="italic"></param>
///			<param name="first"></param>
///			<param name="last"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_add(_name, _size, _bold, _italic, _first, _last) {

	var pFont = new yyFont();
	pFont.runtime_created = true;
	pFont.pName = _name;
	pFont.size = _size;
	pFont.bold = _bold;
	pFont.italic = _italic;
	pFont.first = _first;
	pFont.last = _last;

	pFont.fontstyle = _size + "px " + _name + " ";
	if (_bold) pFont.fontstyle = pFont.fontstyle + "bold ";
	if (_italic) pFont.fontstyle = pFont.fontstyle + "Italic ";
	return g_pFontManager.AddFont(pFont);
}




// #############################################################################################
/// Function:<summary>
///          	Adds a new font and returns its index. The font is created from a sprite. 
///				The sprite should contain a subimage for each character. 
///				first indicate the index of the first character in the sprite. 
///				For example, use ord('0') if your sprite only contains the digits. 
///				prop indicates whether the font is proportional.
///				In a proportional font, for each character the width of the bounding box is used as 
///				the character width. 
///				Finally, sep indicates the amount of white space that must separate the characters horizontally. 
//				A typical value would lie between 2 and 8 depending on the font size.
///          </summary>
///
/// In:		<param name="_spr"></param>
///			<param name="_first">first indicate the index of the first character in the sprite.  (i.e. ord('0') )</param>
///			<param name="_prop">prop indicates whether the font is proportional.</param>
///			<param name="_sep">sep indicates the amount of white space that must separate the characters horizontally.</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function font_add_sprite(_spr, _first, _prop, _sep) {

	var pFont = new yyFont();
	pFont.runtime_created = true;
	pFont.pName = "sprite_font: " + _spr.pName;
	pFont.size = _spr.width;
	pFont.bold = false;
	pFont.italic = false;
	pFont.first = _first;
	pFont.spritefont = true;
	pFont.prop = _prop;
	pFont.pSprites = g_pSpriteManager.Get(_spr);
	pFont.last = _first + pFont.pSprites.numb;

	return g_pFontManager.AddFont(pFont);
}
