// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:	    	yyVertexBuilder.js
// Created:	        06/09/2011
// Author:    		Mike
// Project:		    HTML5
// Description:   	Vertex buffer allocation for WebGL
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 06/09/2011		V1.0        MJD     1st version - based on the C++ runner.
// 
// **********************************************************************************************************************


var DEFAULT_VB_SIZE	= 4096;
var MAX_VERTEX_COUNT = 32768;


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    yyVBuffer(_size)
{
    this.floats  = new Float32Array(DEFAULT_VB_SIZE*3);
    this.UVs     = new Float32Array(DEFAULT_VB_SIZE*2);
    this.Colours = new Int32Array(DEFAULT_VB_SIZE);
    this.max = _size;
    this.current = 0;
    
    this.pVBuffer_Float = g_WebGL.createBuffer();
    this.pVBuffer_UVs = g_WebGL.createBuffer();
    this.pVBuffer_Colours = g_WebGL.createBuffer();
    
    g_WebGL.bindBuffer(g_WebGL.ARRAY_BUFFER, this.pVBuffer_Float);
    g_WebGL.bufferData(g_WebGL.ARRAY_BUFFER, this.floats, g_WebGL.DYNAMIC_DRAW);    
    
    g_WebGL.bindBuffer(g_WebGL.ARRAY_BUFFER, this.pVBuffer_UVs);
    g_WebGL.bufferData(g_WebGL.ARRAY_BUFFER, this.UVs, g_WebGL.DYNAMIC_DRAW);    

    g_WebGL.bindBuffer(g_WebGL.ARRAY_BUFFER, this.pVBuffer_Colours);
    g_WebGL.bufferData(g_WebGL.ARRAY_BUFFER, this.Colours, g_WebGL.DYNAMIC_DRAW);       
}


// #############################################################################################
/// Function: <summary>
///              
///           </summary>
// #############################################################################################
yyVBuffer.prototype.FillBuffer = function()
{

};

