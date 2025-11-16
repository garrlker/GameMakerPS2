// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			yyASync.js
// Created:			02/08/2011
// Author:			Mike
// Project:			HTML5
// Description:		Used to load images, sounds and files ASync across the web.
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 02/08/2011		V1.0		MJD		1st version
//
// **********************************************************************************************************************

var ASYNC_UNKNOWN = 0,
    ASYNC_IMAGE = 1,
    ASYNC_SPRITE = 2,
    ASYNC_BACKGROUND = 3,
    ASYNC_SOUND = 4,
    
    ASYNC_STATUS_NONE=0,
    ASYNC_STATUS_LOADED=1,
    ASYNC_STATUS_ERROR=-1;


// #############################################################################################
/// Function:<summary>
///          	An ASync node
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyASyncNode() {
	this.m_Name = "";
	this.m_ID = -1;
	this.m_Status = 0;
	this.m_pObject = null;
	this.m_Type = ASYNC_UNKNOWN;
	this.m_Complete = false;
}



// #############################################################################################
/// Function:<summary>
///             IMAGE load callback
///          </summary>
///
/// In:		 <param name="_event"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ASync_ImageLoad_Callback(_event)
{
    var pFile = _event.currentTarget.GameMakerASyncLoad;
    if( !pFile ) return;

    pFile.m_Complete = true;
    pFile.m_Status = ASYNC_STATUS_LOADED;
    
    
    if( pFile.m_Type == ASYNC_SPRITE )
    {
        // Now actually UPDATE the sprite and TPage stuff.
        var pSpr = g_pSpriteManager.Get( pFile.m_ID );
        if( pSpr == null ) return;
        
        var pTexture = pSpr.ppTPE[0].texture;
        var w = pTexture.width;
        var h = pTexture.height;
        var sprw = w/pSpr.numb;
        var x = 0;
        pSpr.width = w;
	    pSpr.height = h;
	    pSpr.bbox.right = w; 
	    pSpr.bbox.bottom = h;
        for(var i=0;i<pSpr.numb;i++)
        {
            var pTPE = pSpr.ppTPE[i];
            
            pTPE.x = x;
            pTPE.w = sprw;
            pTPE.h = h;
	        pTPE.CropWidth = pTPE.w;
	        pTPE.CropHeight = pTPE.h;
	        pTPE.ow = pTPE.w;
	        pTPE.oh = pTPE.h;            
	        
	        x+=sprw;
        }
        return;
    }    
    
    if( pFile.m_Type == ASYNC_BACKGROUND )
    {
        // Now actually UPDATE the sprite and TPage stuff.
        var pBack = g_pBackgroundManager.GetImage( pFile.m_ID );
        if( pBack == null ) return;
        
        var pTPE =pBack.TPEntry;
        var pTexture = pTPE.texture;
            
        pTPE.w = pTexture.width;
        pTPE.h = pTexture.height;
        pTPE.CropWidth = pTPE.w;
        pTPE.CropHeight = pTPE.h;
        pTPE.ow = pTPE.w;
        pTPE.oh = pTPE.h;            
        
        return;
    }
    if (pFile.m_Type == ASYNC_SOUND)
    {
    	pFile.m_pObject.complete = true;

    	var pSnd = g_pSoundManager.Get(pFile.m_ID);
    	pSnd.AddSound( g_RawSounds[pFile.m_Name] );
    	return;
    }    
}


// #############################################################################################
/// Function:<summary>
///             IMAGE load error callback
///          </summary>
///
/// In:		 <param name="_event"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ASync_ImageLoad_Error_Callback(_event)
{
	var pFile = _event.currentTarget.GameMakerASyncLoad;
    if( !pFile ) return;

    pFile.m_Complete = true;
    pFile.m_Status = ASYNC_STATUS_ERROR;
}






// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyASyncManager() {
	this.pool = new yyAllocate(5);
};


// #############################################################################################
/// Function: <summary>
///				Get the pool
///           </summary>
// #############################################################################################
yyASyncManager.prototype.GetPool = function () {
	return this.pool;
};


// #############################################################################################
/// Function: <summary>
///				Get the pool
///           </summary>
// #############################################################################################
yyASyncManager.prototype.Add = function ( _id, _filename, _type, _object) {

	// Add a new file to "watch"
	var pFile = new yyASyncNode();
	pFile.m_ID = _id;
	pFile.m_Name = _filename;
	pFile.m_pObject = _object;
	pFile.m_Type = _type;
	this.pool.Add(pFile);
	
	_object.GameMakerASyncLoad = pFile;
};



// #############################################################################################
/// Function: <summary>
///				Get the pool
///           </summary>
// #############################################################################################
yyASyncManager.prototype.Process = function () {
	var map = ds_map_create();
	g_pBuiltIn.async_load = map;

	var pool = this.pool.pool;
	for (var i = 0; i < pool.length; i++)
	{
		var pFile = pool[i];
		if (pFile != null)
		{
			if (pFile.m_Complete)
			{
				ds_map_clear(map);
				ds_map_add(map, "filename", pFile.m_Name);
				ds_map_add(map, "id", pFile.m_ID);
				ds_map_add(map, "status", pFile.m_Status);

				if (pFile.m_Type == ASYNC_IMAGE) g_pObjectManager.ThrowEvent(EVENT_OTHER_WEB_IMAGE_LOAD, 0); // Throw an event for the image
				else if (pFile.m_Type == ASYNC_SPRITE) g_pObjectManager.ThrowEvent(EVENT_OTHER_WEB_IMAGE_LOAD, 0); // Throw an event for the image
				else if (pFile.m_Type == ASYNC_BACKGROUND) g_pObjectManager.ThrowEvent(EVENT_OTHER_WEB_IMAGE_LOAD, 0); // Throw an event for the image
				else if (pFile.m_Type == ASYNC_SOUND) g_pObjectManager.ThrowEvent(EVENT_OTHER_WEB_SOUND_LOAD, 0);

				// Done load, so delete handle.
				this.pool.DeleteIndex(i);
			}
		}
	}
	ds_map_destroy(map);
	g_pBuiltIn.async_load = -1;
};



