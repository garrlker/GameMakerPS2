
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			yyView.js
// Created:			03/06/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 03/06/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyView()						// A view
{
	this.visible = false;
	this.worldx = 0;                    // rectangle in the world (area of the world to draw)
	this.worldy = 0;
	this.worldw = 640;
	this.worldh = 480;   
	this.portx = 0;						// rectangle in the draw region (area to FIT into)
	this.porty = 0;
	this.portw = 640;
	this.porth = 480;
	this.scaledportx = 0;				// clip region scaled into "canvas" space
	this.scaledporty = 0;
	this.scaledportx2 = 0; 			    
	this.scaledporty2 = 0;
	this.scaledportw = 0;
	this.scaledporth = 0;
	this.WorldViewScaleX = 1;
	this.WorldViewScaleY = 1;
	this.hborder = 32;                    // "safe" region before scrolling to follow "objid"
    this.vborder = 32;
    this.hspeed = -1;                   // speed to use to "catch up"
    this.vspeed = -1;
    this.objid = -1;                    // object id to follow
}



// #############################################################################################
/// Function:<summary>
///          	Create a view from storage
///          </summary>
///
/// In:		<param name="_pViewStorage">pointer to the view object</param>
/// Out:	<returns>
///				the new view object
///			</returns>
// #############################################################################################
function  CreateViewFromStorage( _pViewStorage )
{
    view = new yyView();
    
    if( _pViewStorage.visible!=undefined ) view.visible = _pViewStorage.visible;           // view active?
    if( _pViewStorage.xview!=undefined ) view.worldx = _pViewStorage.xview;
    if( _pViewStorage.yview!=undefined ) view.worldy = _pViewStorage.yview;
    if( _pViewStorage.wview!=undefined ) view.worldw = _pViewStorage.wview;
    if( _pViewStorage.hview!=undefined ) view.worldh = _pViewStorage.hview;
    if( _pViewStorage.xport!=undefined ) view.portx = _pViewStorage.xport;
    if( _pViewStorage.yport!=undefined ) view.porty = _pViewStorage.yport;
    if( _pViewStorage.wport!=undefined ) view.portw = _pViewStorage.wport;
    if( _pViewStorage.hport!=undefined ) view.porth = _pViewStorage.hport;
    if( _pViewStorage.hborder!=undefined ) view.hborder = _pViewStorage.hborder;
    if( _pViewStorage.vborder!=undefined ) view.vborder = _pViewStorage.vborder;
    if( _pViewStorage.hspeed!=undefined ) view.hspeed = _pViewStorage.hspeed;
    if( _pViewStorage.vspeed!=undefined ) view.vspeed = _pViewStorage.vspeed;
    if( _pViewStorage.index!=undefined ) view.objid = _pViewStorage.index;
    
    return view;
}