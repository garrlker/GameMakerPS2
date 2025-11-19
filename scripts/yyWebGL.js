// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:	    	yyWebGL.js
// Created:	        06/09/2011
// Author:    		Mike
// Project:		    HTML5
// Description:   	GameMaker HTML5 "webgl" interface.
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 06/09/2011		V1.0        MJD     1st version... lets get something on screen....
// 
// **********************************************************************************************************************


var g_WebGL = null; // primary webgl handle
var vs_shader=" varying vec4 vColor;    void main(void) {       gl_FragColor = vColor;   }";

// #############################################################################################
/// Function:<summary>
///             Try and bind WebGL to a canvas
///          </summary>
///
/// In:		 <param name="_canvas">canvas to BIND to...</param>
/// Out:	 <returns>
///				true for okay, false for error....
///			 </returns>
// #############################################################################################
function BindWebGL( _canvas )
{
    /*var gl;
    try{
      gl = _canvas.getContext("experimental-webgl");
    }catch(ex){
        return null;
    }
    if( !gl ) return null;
    
    
    gl.viewportWidth = _canvas.width;
    gl.viewportHeight = _canvas.height;      
    return gl;*/
}


// #############################################################################################
/// Function:<summary>
///             Try and Initialise WebGL
///          </summary>
///
/// In:		 <param name="_canvas">canvas to BIND to...</param>
/// Out:	 <returns>
///				true for okay, false for error....
///			 </returns>
// #############################################################################################
function    InitWebGL(_canvas)
{
    /*g_WebGL = BindWebGL(_canvas);
    if( !g_WebGL ) return false;
    
    InitShaders();
    
    
    return true;*/
    return false;
}


var addshader = function(type, source) 
{
		/*var s = g_WebGL.createShader((type == 'vertex') ? g_WebGL.VERTEX_SHADER : g_WebGL.FRAGMENT_SHADER);
		g_WebGL.shaderSource(s, source);
		g_WebGL.compileShader(s);
		if (!gl.getShaderParameter(s, g_WebGL.COMPILE_STATUS)) {
			throw "Could not compile "+type+ " shader:\n\n"+g_WebGL.getShaderInfoLog(s);
		}
		gl.attachShader(prog, s);*/
};


function InitShaders()
{
    /*var prog = gl.createProgram();

    addshader(prog, "vertex", "attribute vec3 pos;"+"void main() {"+"	gl_Position = vec4(pos, 2.0);"+"}" );
    addshader(prog, "fragment", "void main() {"+"	gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);"+"}");

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    gl.useProgram(shaderProgram);*/
   
    /*shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");*/
}

// #############################################################################################
/// Function:<summary>
///             Initialise the rendering function pointers.
///          </summary>
// #############################################################################################
function InitWebGLFunctions()
{
    // Fill in RELEASE function pointers.
    Graphics_TextureDrawSimple = WebGL_TextureDrawSimple_RELEASE;
    Graphics_TextureDrawTiled = WebGL_TextureDrawTiled_RELEASE;
    Graphics_TextureDraw = WebGL_TextureDraw_RELEASE;
    Graphics_SetViewArea = WebGL_SetViewArea_RELEASE;
    Graphics_SetViewPort = WebGL_SetViewPort_RELEASE;
    Graphics_SetTransform = WebGL_SetTransform_RELEASE;
    Graphics_ClearScreen = WebGL_ClearScreen_RELEASE;
    Graphics_PushTransform = WebGL_PushTransform_RELEASE;
    Graphics_DrawPart = WebGL_DrawPart_RELEASE;
    Graphics_Save = WebGL_Save_RELEASE;
    Graphics_Restore = WebGL_Restore_RELEASE;
    Graphics_DrawText = WebGL_DrawText_RELEASE;

}


function WebGL_Save_RELEASE(){  }
function WebGL_Restore_RELEASE(){  }

// #############################################################################################
/// Function:<summary>
///             Given a texture, check to see if it has a WEBGL handle, and if not. make one.
///          </summary>
///
/// In:		 <param name="_texture">image to bind into a texture</param>
///
// #############################################################################################
function WebGL_BindTexture(_pTPE)
{
    /*if( !_pTPE.texture.webgl_textureid )
    {
        var glTexture = g_WebGL.createTexture();
        _pTPE.texture.webgl_textureid = glTexture;
        glTexture.image = _pTPE.texture;
        
        g_WebGL.bindTexture(g_WebGL.TEXTURE_2D, glTexture);
        g_WebGL.pixelStorei(g_WebGL.UNPACK_FLIP_Y_WEBGL, true);
        g_WebGL.texImage2D(g_WebGL.TEXTURE_2D, 0, g_WebGL.RGBA, g_WebGL.RGBA, g_WebGL.UNSIGNED_BYTE, _pTPE.texture);
        g_WebGL.texParameteri(g_WebGL.TEXTURE_2D, g_WebGL.TEXTURE_MAG_FILTER, g_WebGL.NEAREST);
        g_WebGL.texParameteri(g_WebGL.TEXTURE_2D, g_WebGL.TEXTURE_MIN_FILTER, g_WebGL.NEAREST);
        g_WebGL.bindTexture(g_WebGL.TEXTURE_2D, null);    
    }*/
}


// #############################################################################################
/// Function:<summary>
///             Draw a simple TPage entry.
///          </summary>
///
/// In:		 <param name="_pTPE"></param>
///			 <param name="_x"></param>
///			 <param name="_y"></param>
///			 <param name="_alpha"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function WebGL_TextureDrawSimple_RELEASE(_pTPE, _x, _y, _alpha) 
{  
    WebGL_BindTexture(_pTPE);
    
	//graphics.globalAlpha = _alpha;
	//graphics._drawImage(_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, Math.floor(_x) + _pTPE.XOffset, Math.floor(_y) + _pTPE.YOffset, _pTPE.CropWidth, _pTPE.CropHeight);
}



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function WebGL_SetViewArea_RELEASE()
{
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
function WebGL_SetViewPort_RELEASE(_portx, _porty, _portw, _porth)
{
    g_clipx = _portx;
    g_clipy = _porty;
    g_clipw = _portw;
    g_cliph = _porth;
}


// #############################################################################################
/// Function:<summary>
///				Clear the region in the indicated color
///          </summary>
///
/// In:		 <param name="col">Colour to clear the screen with</param>
// #############################################################################################
function WebGL_ClearScreen_RELEASE(_col)
{
    g_WebGL.clear(g_WebGL.COLOR_BUFFER_BIT | g_WebGL.DEPTH_BUFFER_BIT);
    g_WebGL.clearColor( ((_col>>16)&0xff)/255.0,    ((_col>>8)&0xff)/255.0,     (_col&0xff)/255.0, 1.0);
}

var pVBuffer;
var pUVBuffer;

    
// #############################################################################################
/// Function:<summary>
///          	Sets the current g_transform...
///          </summary>
// #############################################################################################
function WebGL_SetTransform_RELEASE() 
{
    //graphics._setTransform(g_transform[0], g_transform[3], g_transform[1], g_transform[4], g_transform[2], g_transform[5]);
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
function WebGL_PushTransform_RELEASE( _x,_y, _xs,_ys, _angle ) 
{
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
function	WebGL_TextureDrawTiled_RELEASE( _pTPE, _x, _y, vtile, htile ) {
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
function WebGL_TextureDraw_RELEASE(_pTPE, _xorig, _yorig, _x, _y, _xsc, _ysc, _rot, _col, _alpha)
{
}


function WebGL_DrawPart_RELEASE(_pTPE, _left, _top, _width, _height, _x, _y) {
}


function WebGL_Save_RELEASE()
{
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
function WebGL_DrawText_RELEASE(_font, _str, _x, _y, _xscale, _yscale, _angle, _col, _alpha) 
{

}

