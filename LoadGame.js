
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            LoadGame.js
// Created:         18/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Deals with loading the whole game file
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 18/02/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************


var g_LoadingTotal = 0;
var g_LoadingCount = 0;
var g_LoadingAssets = null;

// #############################################################################################
/// Function:<summary>
///             Initialise the GameMaker "runtime" engine.
///          </summary>
// #############################################################################################
function InitAboyne()
{
    global = new yyGameGlobals();
    g_pBuiltIn = new yyBuiltIn();
	g_pIOManager = new yyIOManager();

	Graphics_Init(canvas);

    g_pInstanceManager = new yyInstanceManager();
	g_pObjectManager = new yyObjectManager();
    g_pRoomManager = new yyRoomManager();
    g_pSpriteManager = new yySpriteManager();
    g_pBackgroundManager = new yyBackgroundManager();
    g_pSoundManager = new yySoundManager();
    g_pFontManager = new yyFontManager();
    g_pCollisionList = [];
    g_pPathManager = new yyPathManager();
    g_pTimelineManager = new yyTimelineManager();
    g_pASyncManager = new yyASyncManager();
    
    InitAboyneGlobals();
}


// #############################################################################################
/// Function:<summary>
///          	Given a loading error code, return the error string 
///          </summary>
///
/// In:		<param name="_code">Error code</param>
/// Out:	<returns>
///				The error string.
///			</returns>
// #############################################################################################
function GetNetworkErrorText(_code) {
	switch (_code)
	{
		case 1: return "MEDIA_ERR_ABORTED";
		case 2: return "MEDIA_ERR_NETWORK";
		case 3: return "MEDIA_ERR_DECODE";
		case 4: return "MEDIA_ERR_SRC_NOT_SUPPORTED";
	}
	return "Unknown Error";
}


// #############################################################################################
/// Function:<summary>
///          	Given a loading error code, return the error string 
///          </summary>
///
/// In:		<param name="_code">Error code</param>
/// Out:	<returns>
///				The error string.
///			</returns>
// #############################################################################################
function GetNetworkStateText(_code) {
	switch (_code)
	{
		case 0: return "NETWORK_EMPTY";
		case 1: return "NETWORK_IDLE";
		case 2: return "NETWORK_LOADING";
		case 3: return "NETWORK_NO_SOURCE";
	}
	return "Unknown Error";
}
// #############################################################################################
/// Function:<summary>
///          	Callback for image loading... (this is set to the image)
///          </summary>  
// #############################################################################################
function LoadGame_ImageLoad(_event) 
{
	debug("ImageLoaded: " +this.src);
	g_LoadingAssets[this.URL] = null;
	g_LoadingCount++;
}
function LoadGame_ImageLoad_Error(_event) 
{
	debug("ImageError: " + this.src ); //+ "   error: " + GetNetworkErrorText(_event.currentTarget.error["code"]));
	g_LoadingAssets[this.URL] = null;
	g_LoadingCount++;

}

// #############################################################################################
/// Function:<summary>
///          	Callbacks for sound loading... (this is set to the image)
///          </summary>  
// #############################################################################################
function ClearEventListeners(_snd) {
	_snd.removeEventListener('canplaythrough', LoadGame_SoundLoad, false);
	_snd.removeEventListener('error', LoadGame_SoundLoad_Error, false);
	_snd.removeEventListener("loadstart", LoadGame_SoundLoad_Loading, false);
	_snd.removeEventListener("suspend", LoadGame_SoundLoad_Suspended, false);
	_snd.addEventListener("stalled", LoadGame_SoundLoad_Stalled, false);
	_snd.addEventListener("stall", LoadGame_SoundLoad_Stalled, false);
}


function LoadGame_SoundLoad(_event) {

	this.completed = true;
	if (g_LoadingAssets[this.URL] != null)
	{
		g_LoadingAssets[this.URL] = null;
		g_LoadingCount++;
	}
	ClearEventListeners(this);
	debug("SoundLoaded: " + this.URL);
}
function LoadGame_SoundLoad_Error(_event) {

	debug("SoundError: " + this.URL + "   NetworkError: " + GetNetworkErrorText(this.error["code"]));
	this.completed = false;
	if (g_LoadingAssets[this.URL] != null)
	{
		g_LoadingAssets[this.URL] = null;
		g_LoadingCount++;
	}
	ClearEventListeners(this);
}

function LoadGame_SoundLoad_Loading(_event) {
	this.DoingLoading = true;
}

function LoadGame_SoundLoad_Suspended(_event) {
	//debug(this.URL + ' loading suspended');
	debug("SoundSuspended: " + this.URL );
	this.completed = true;
	if (g_LoadingAssets[this.URL] != null)
	{
		g_LoadingAssets[this.URL] = null;
		g_LoadingCount++;
	}
	ClearEventListeners(this);
}

function LoadGame_SoundLoad_Stalled(_event) {
	//debug(this.URL + ' loading stalled');
}



// #############################################################################################
/// Function:<summary>
///          	Load a particle from the web
///          </summary>
///
/// In:		<param name="_filename"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function LoadParticleImage(_filename)
{
	debug("Loading: " + _filename);
	var index = Graphics_AddTexture(_filename);

	// Create a texture page entry.
	var pTPE = new yyTPageEntry();
	pTPE.x = 0;
	pTPE.y = 0;
	pTPE.w = 63;
	pTPE.h = 63;
	pTPE.XOffset = -32;
	pTPE.YOffset = -32;
	pTPE.CropWidth = 63;
	pTPE.CropHeight = 63;
	pTPE.ow = pTPE.w;
	pTPE.oh = pTPE.h;
	pTPE.tp = index;
	pTPE.texture = g_Textures[index];			// get raw texture page
	pTPE.cache = []; 							// clear colour cache
	pTPE.maxcache = 16;
	pTPE.count = 0;
	var par = g_ParticleTextures.length;
	g_ParticleTextures[par] = pTPE;
	return par;
}


// #############################################################################################
/// Function:<summary>
///          	Get the DOM to include a .JS file. It will need a "game tick" to actually load.
///          </summary>
///
/// In:		<param name="_pFile">JS file to load</param>
///				
// #############################################################################################
function Include_JSFile(_pFile) {
	debug("Loading: " + g_RootDir + _pFile);
	var e = window.document.createElement('script');
	e.setAttribute('src', g_RootDir + _pFile);
	e.setAttribute('type', "text/javascript");
	window.document.body.appendChild(e);
}


// #############################################################################################
/// Function:<summary>
///          	Run through ALL the .JS files we've to load, and get the DOM to load them.
///
///				Extensions: [{ jsFiles: ["test.js"], init: "JS_MYINIT", final: "JS_MYQUIT" }]
///
///          </summary>
///
/// In:		<param name="_GameFile">JSON file</param>
///				
// #############################################################################################
function LoadExtensions(_GameFile) 
{
	if (_GameFile.Extensions != undefined)
	{
		for (var i = 0; i < _GameFile.Extensions.length; i++)
		{
			var pExt = _GameFile.Extensions[i];
			for (var js = 0; js < pExt.jsFiles.length; js++)
			{
				Include_JSFile( pExt.jsFiles[js] );
			}
		}
	}
}


// #############################################################################################
/// Function:<summary>
///          	Load the textures..
///          </summary>
///
/// In:		<param name="_GameFile"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function LoadGame_PreLoadAssets(_GameFile) 
{
	debug("LoadGame_PreLoadAssets ", os.getcwd());
    if( _GameFile.Name ) document.title = _GameFile.Name;

    g_LoadingAssets = [];
    LoadExtensions(_GameFile);

    g_LoadingCount=0;
	// Load texture pages
	for (index = 0; index < _GameFile.Textures.length; index++)
	{
		g_LoadingTotal++;
		debug("Loading: " +  g_RootDir + _GameFile.Textures[index]);
		var index = Graphics_AddTexture(g_RootDir + _GameFile.Textures[index]);
		g_Textures[index].onload = LoadGame_ImageLoad;
		g_Textures[index].onerror = LoadGame_ImageLoad_Error;
		g_Textures[index].URL = _GameFile.Textures[index];
		g_LoadingAssets[g_Textures[index].URL] = g_Textures[index];
	}


	// Load the particle textures
	for (var i = 2; i < 16; i++){
		g_LoadingTotal++;
		var p = LoadParticleImage(g_RootDir + "particles/IDR_GIF" + i + ".png");

		var t = g_ParticleTextures[p].tp;
		g_Textures[t].onload = LoadGame_ImageLoad;
		g_Textures[t].onerror = LoadGame_ImageLoad_Error;
		g_Textures[t].URL = "particles/IDR_GIF" + i + ".png";
		g_LoadingAssets[g_Textures[t].URL] = g_Textures[t];
	}

	// Now load WAV files (not mp3/ogg)
	for (index = 0; index < _GameFile.Sounds.length; index++)
	{
		if(  _GameFile.Sounds[index]!=null){
	        g_LoadingTotal++;
	        debug("Loading: " + g_RootDir + _GameFile.Sounds[index].origName);
	        var id = SoundManager_AddRawSound(g_RootDir + _GameFile.Sounds[index].origName, _GameFile.Sounds[index].pName, _GameFile.Sounds[index].extension, LoadGame_SoundLoad, LoadGame_SoundLoad_Error);
	        if(id>=0 && g_LoadingAssets[g_RawSounds[id].URL])
	        {
	        	g_LoadingAssets[g_RawSounds[id].URL] = g_RawSounds[id];
	        } else
	        {
	        	g_LoadingTotal--;
	        }
		}		

	}		
}


// #############################################################################################
/// Function:<summary>
///          	Ticks through all loading files and checks to see if there is an error, or
///				to see if it loaded.
///          </summary>
// #############################################################################################
function ProcessFileLoading() {
	for (var i in g_LoadingAssets)
	{
		var pAsset = g_LoadingAssets[i];
		if((pAsset && pAsset?.ready()))
		{
			// pAsset.completed = false;
			g_LoadingCount++;
			g_LoadingAssets[i] = null;
			// ClearEventListeners(pAsset);
			// debug("SoundError: " + pAsset.URL + "   NetworkState: " + GetNetworkStateText(pAsset.networkState));
		}
	}
}


// #############################################################################################
/// Function:<summary>
///             Load a whole game from the "game file" object
///          </summary>
///
/// In:		 <param name="_GameFile">The game file to laod</param>
///
// #############################################################################################
function LoadGame(_GameFile) 
{
    var index, pRoom;

    
    g_room_maxid = 1000000;
    
    // Make OBJECTS
    var id = 0;
    for(index in _GameFile.GMObjects )
    {
        var pObjStorage = _GameFile.GMObjects[index];
        
        if( pObjStorage!=null ){
            var pObject = CreateObjectFromStorage( id,pObjStorage );
	        g_pObjectManager.Add( pObject );
	    }
	    id++;
    }

	// Now we've loaded them all, patch up object parents
    g_pObjectManager.PatchParents();
    
    
    // Now create a collision array of the objects that we need to watch.
	var pool = g_pObjectManager.GetPool();
	for(var i in pool)
    {
        var pObj = pool[i];
        for(var j in pObj.Collisions)
        {                    
            // Check that we haven't previously registered this kind of collision
            if (g_pCollisionList[j]) {
                if (g_pCollisionList[j][i]) {
                    continue;
                }
            }
            
            // Insert collision type
            if( !g_pCollisionList[i] ){
                g_pCollisionList[i] = [];
            }
            var l = g_pCollisionList[i].length;
            g_pCollisionList[i][l] = j;
        }
        
        
        
    }
    
    //Make Rooms
    for(index in _GameFile.GMRooms )
    {
        var pRoomStorage = _GameFile.GMRooms[index];
        if( pRoomStorage != null ){
            pRoom = new yyRoom();
            pRoom.CreateRoomFromStorage(pRoomStorage);
            g_pRoomManager.Add( pRoom );	    
        }else{
            g_RoomID++;
            g_pRoomManager.Add( null );	    
        }
    }
    g_pRoomManager.SetRoomOrder( _GameFile.RoomOrder );
    for(var i=0;i<_GameFile.RoomOrder.length;i++){
        pRoom = g_pRoomManager.GetOrder( i );
        pRoom.actualroom=i;
    }
    g_pBuiltIn.room_first =  g_pRoomManager.GetOrder( 0 ).id;
    g_pBuiltIn.room_last = g_pRoomManager.GetOrder( g_pRoomManager.m_RoomOrder.length-1 ).id;




    
    // Load texture pages - now PRE-Startup

    // Load texture page offsets
	Graphics_SetEntryTable(_GameFile.TPageEntries);





    // Load Sprites
    for(index=0; index<_GameFile.Sprites.length; index++ ){
        if(  _GameFile.Sprites[index]==null ){
            g_pSpriteManager.AddSprite( null );
        }else{
            var pSprite = CreateSpriteFromStorage( _GameFile.Sprites[index] ); 
            g_pSpriteManager.AddSprite( pSprite );
        }
    }
    

    // Load Backgrounds
    for(index=0; index<_GameFile.Backgrounds.length; index++ ){
    	var im = g_pBackgroundManager.AddImage(_GameFile.Backgrounds[index]);
    	var pImage = g_pBackgroundManager.GetImage(im);
		if( pImage!=null ) pImage.copy = TPE_Copy;
    }
    
    // Load Fonts
    for(index=0; index<_GameFile.Fonts.length; index++ ){
        g_pFontManager.Add( _GameFile.Fonts[index]);
    }



	// Load Paths
    for (index = 0; index < _GameFile.Paths.length; index++)
    {
    	var pPath = CreatePathFromStorage( 	_GameFile.Paths[index] );
    	g_pPathManager.Add( pPath );
    }


    // Load Sounds
    for(index=0; index<_GameFile.Sounds.length; index++ ){
        g_pSoundManager.Add( _GameFile.Sounds[index]);
    }
    

    // Load Timelines
    if (_GameFile.Timelines != undefined) {
        for(index=0; index<_GameFile.Timelines.length; index++ ){
            g_pTimelineManager.Add( _GameFile.Timelines[index]);
        }
	}


    // Init Loaded extensions...
	if (_GameFile.Extensions != undefined)
	{
		for (var i = 0; i < _GameFile.Extensions.length; i++)
		{
			var pExt = _GameFile.Extensions[i];
			pFunc = eval(pExt.init);
			if( pFunc ) pFunc();
		}
	}
}



