
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:	    	_GameMaker.js
// Created:	        09/07/2011
// Author:    		Mike
// Project:		    HTML5
// Description:   	GameMaker HTML5 "Aboyne" runtime engine.
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 09/07/2011		
// 
// **********************************************************************************************************************
//var image = new Image();
//image.src = "smiley.png";
//var image2 = new Image();
//image2.src = image.src;
//var testpng = new Image();
//testpng.src = "html5game/test.png";
var div_a = 0;
var xxx=100;

var canvas = null;
var g_Canvas_OriginalPosition, g_Canvas_OriginalLeft,g_Canvas_OriginalTop;

var graphics = null;
var GlobalGraphicsHandle = null;
var g_StartUpState=0;

// Run steps for the game
var	lasttime =0;
var	curtime =0;
var	slp = 0;
var	lastfpstime = 0;
var	diff = 0;
var newfps = 0;
var Fps = 60;
var g_TimerCallback;


//g_GameMakerHTML5Dir = "http://www.yoyogames.com/demos/tntbf/html5game/";
window.onload = GameMaker_Init;



    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback, element ){
              	g_TimerCallback = window.setTimeout(callback, 1000 / 60);	
              };
    })();


/*var g_StringTableName = [ "Rvvu:Muhv~", "Rvvu:Muhv~" ];
for(var iStr in g_StringTableName)
{
	var ss = g_StringTableName[iStr];
	var st = "";
	for (var i = 0; i < ss.length; i++)
	{
		st += String.fromCharCode(ss.charCodeAt(i) ^ 0x1A);
	}
	g_StringTableName[iStr] = st;
}
*/





// #############################################################################################
/// Function:<summary>
///             Create our debug console, but hide it.
///          </summary>
///
/// In:		 <param name="_canvas">The canvcas handle</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function CreateDebugConsole()
{
	return;
    var c = document.getElementById(g_CanvasName);
    var y = document.createElement('textarea');
    y.setAttribute("id","debug_console");
    y.setAttribute("cols","100");
    y.setAttribute("rows","20");
    y.style.display = "none";
    var obj = c.parentNode;
    obj.insertBefore(y, c.nextSibling);
    g_GameMakerIdentifier = 0x71562;   


/*
    var obj = c.parentNode;
    var dv2 = document.createElement("div");
    dv2.setAttribute("id", "containerdiv");
    dv2.style.height = c.height+"px";
    obj.insertBefore(dv2, c.nextSibling);    
    obj.insertBefore(y, dv2.nextSibling);
    */

    /*var obj = c.parentNode;
    var dv1 = document.createElement("div");
    dv1.setAttribute("id", "gamemaker_image");
    dv1.style.position="absolute";
    dv1.style.left="100px";
    dv1.style.top="100px";
    //dv1.style.height="0px";               // appears to be the "center" offset
    //dv1.style.width="0px";
    //dv1.style.clip="rect(0px, 75px, 75px, 0px)";
    dv1.style.msTransform='rotate(15deg)';
    dv1.style.MozTransform = 'rotate(15deg)';
    dv1.style.WebkitTransform = 'rotate(45deg)';
    dv1.style.transformStyle="preserve-3d";
    dv1.insertBefore(image, null);
    obj.insertBefore(dv1, null);
    
    image2.style.position="absolute";
    image2.style.left="100px";
    image2.style.top="150px";
    image2.style.zoom="0.75";
    image2.style.height="27px";
    image2.style.width="100px";
    obj.insertBefore(image2, null);
    */
}


// #############################################################################################
/// Function:<summary>
///          	Get the location of the canvas on the web page.
///          </summary>
///
/// Out:	<returns>
///				canvasMinX,canvasMinY hold the base of the canvas.
///				canvasMaxX,canvasMaxY hold the top end.
///			</returns>
// #############################################################################################
function CalcCanvasLocation()
{
	canvasMinX = 0; 	// canvas.offsetLeft;
	canvasMinY = 0; 	// canvas.offsetTop;
	pNode = canvas;
	if (pNode.offsetParent)
	{
		while (pNode != null)
		{
			canvasMinX += pNode.offsetLeft;
			canvasMinY += pNode.offsetTop;
			pNode = pNode.offsetParent;
		}
	}
	canvasMaxX = canvasMinX + DISPLAY_WIDTH;
	canvasMaxY = canvasMinX + DISPLAY_HEIGHT;
}

// #############################################################################################
/// Function:<summary>
///          	Given the text the address bar, parse it and get the 
///          </summary>
///
/// In:		<param name="_url"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParseURL(_url) {
	g_Arguments = [];
	g_ArgumentIndex = [];
	g_ArgumentValue = [];
	g_ArgumentCount = 0;

	var params = _url.search;
	var url = _url.protocol + "//" + _url.host + _url.pathname;
	g_ArgumentIndex[0] = url;
	g_ArgumentValue[0] = null;
	
	if (params[0] == "?") params = params.substring(1, params.length);
	
	var index = start = 0;
	var arg = "";
	var val = null;
	while (index < params.length)
	{
		var c = params[index];
		
		// end of paramater?
		if (c == "&")
		{
			if (arg != "")
			{
				if( start!=index) val = params.substring(start, index);
				g_ArgumentIndex[g_ArgumentIndex.length] = arg;
				g_ArgumentValue[g_ArgumentValue.length] = val;
				g_Arguments[arg] = val;
				g_ArgumentCount++;
				arg = "";
				val = null;
			}
			start = index + 1;
		} else if (c == "=")
		{
			arg = params.substring(start, index);
			val = null;
			start = index + 1;
		}
		index++;
	}

	// Probably no "&" at the end of the string... so finsih off.
	if (arg != "")
	{
		if (start != index) val = params.substring(start, index);
		g_ArgumentIndex[g_ArgumentIndex.length] = arg;
		g_ArgumentValue[g_ArgumentValue.length] = val;
		g_Arguments[arg] = val;
		g_ArgumentCount++;
		arg = val = "";
	}

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
function GameMaker_Init() 
{
	debug("GameMaker_Init ", !document.getElementById, !document.createElement);
    if (!document.getElementById || !document.createElement) return;
    // ParseURL( window.location );


	canvas = document.getElementById(g_CanvasName);
	
	graphics = null;
	if( !InitWebGL(canvas) ){
	    graphics = canvas.getContext('2d');
	}	
	GlobalGraphicsHandle = graphics;
	GlobalWebGLHandle = g_WebGL;




	// Remember these settings, as FULLSCREEN will mess them up.
	g_Canvas_OriginalPosition = canvas.style.position;
	g_Canvas_OriginalLeft = canvas.style.left;
	g_Canvas_OriginalTop = canvas.style.top;


	// Update the canvas to use OUR functions. This helps obfuscation, and will shrink the code base.
	Graphics_AddCanvasFunctions(graphics);


    //document.body.appendChild( canvas );
	// document.body.oncontextmenu = function () { return false; };  
    
    CreateDebugConsole();
    //hideshow(document.getElementById('debug_console'));
    

    g_OriginalWidth  = canvas.width;
    g_OriginalHeight = canvas.height;

    // get width, height and canvas bounds...
    DISPLAY_WIDTH = g_OriginalWidth;
    DISPLAY_HEIGHT = g_OriginalHeight;


    CalcCanvasLocation();
    // bindTouchEvents();

    //requestAnimationFrame
	//setInterval(GameMaker_Tick, 1000 / (60));

    //hideshow(document.getElementById('debug_console'));
	InitAboyne();                               // Init the "runtime" engine
	YoYo_Init();                                // Init the YoYo GML functions

    //var pFile = LoadBinaryData_Block( g_RootDir+"test.dat");

	g_pGMFile = JSON_game;
	LoadGame_PreLoadAssets(g_pGMFile);
	g_StartUpState = 0;

	/*var JSFile = LoadTextFile_Block("test.js");
	eval(JSFile);
	TestFunction1("Hello #1");
	TestFunction2("Hello #2");
	TestFunction3("Hello","World");
	*/

	//pINI = new yyIniFile("test.ini");
    //pINI = INI_OpenIniFile("tntbfdata.ini");
    //var v = pINI.ReadInt("Save Data", "fed",  "12" );


	/*var f = file_text_open_append("test.txt");
	file_text_write_string(f," Extra text to append!!");
	file_text_writeln(f);
	file_text_write_real(f,12.34567);
	file_text_writeln(f);
	file_text_close(f);
	*/
	
	//var s = file_exists("test.txt");
	
	/*var f = file_text_open_read("test.txt");
	var eof = file_text_eof(f);
	var s = file_text_read_string(f);
	var n1 = file_text_read_real(f);
	var n2 = file_text_read_real(f);
	var eol1 = file_text_eoln(f);
	file_text_readln(f);
	var s1 = file_text_read_string(f);
	var s2 = file_text_read_string(f);
	var s3 = file_text_read_string(f);

	var err1 = file_text_read_string(f);
	var err2 = file_text_read_real(f);
	eof = file_text_eof(f);
	file_text_close(f);
	*/

	debug("GameMaker_Init - animate");
	os.setInterval(() => {
		animate();
	})
}

/*var dv1 = document.getElementById('gamemaker_image');
dv1.style.left=xxx+"px";
var r = "rotate("+div_a+"deg)";
dv1.style.msTransform=r;
dv1.style.MozTransform = r;
dv1.style.WebkitTransform = r;
xxx+=1;
xxx &= 255;
div_a+=1;
if( div_a>360 ) div_a-=360;
*/
// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function animate() {
	// debug("animate ", g_StartUpState);
	// requestAnimFrame(animate);

	switch (g_StartUpState)
	{
		case 0: if (g_LoadingCount >= g_LoadingTotal) { g_LoadingCount = g_LoadingTotal; g_StartUpState = 1; }
				ProcessFileLoading();
				// ProcessLoadinBar(g_LoadingCount >= g_LoadingTotal);
				break;
		case 1: LoadGame(g_pGMFile);
				g_StartUpState = 2;
				break;
		case 2:
				StartGame();
				g_StartUpState = 3;
				//YoYo_FacebookLike("http://www.yoyogames.com/");
				break;
		case 3:
				GameMaker_Tick();
				break;	
	}
}

// #############################################################################################
/// Function:<summary>
///             Draw text "centered"
///          </summary>
///
/// In:		 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="colour"></param>
///			 <param name="text"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function DrawCenteredText(x,y,colour, text)
{
    graphics.fillStyle=colour;
	graphics.lineStyle=colour;
	graphics.font = "14px Verdana"; ;
    //graphics.font = "26px sans-serif"; ;
    graphics.textAlign = "center";
    graphics.fillText(text, x,y);
    graphics.textAlign = "left";
}

// #############################################################################################
/// Function:<summary>
///             Render the loading bar...
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ProcessLoadinBar(done) 
{
	// TODO: Leave commented out, canvas fillstyle code is bugging out :()
    var barwidth = (DISPLAY_WIDTH/100) * 50;        // Loading bar 80% width of screen
    var barheight = 4;                              // Loading bar only 4 pixels high
    var x = (DISPLAY_WIDTH-barwidth)/2;
    var y = 10+(DISPLAY_HEIGHT-barheight)/2;

		// Screen.clear();
    // graphics.fillStyle = GetHTMLRGBA(0xffffff, 1.0);
    graphics.fillStyle = GetHTMLRGBA(0x151515, 1.0);
		graphics.tempColor = 0x151515;
    // graphics.fillRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
		Screen.clear(graphics.fillStyle)


    g_GlobalAlpha = 1.0;    
    if( g_LoadingCount!=0 ){
        var w = (barwidth/g_LoadingTotal)*g_LoadingCount;
        
        // Dar gray bar
        // graphics.fillStyle = GetHTMLRGBA(0x404040, 1.0);
				graphics.fillStyle = 0x404040;
        graphics.fillRect( x,y, barwidth, barheight);

        // graphics.fillStyle = GetHTMLRGBA(0x8d8f90, 1.0);
				graphics.fillStyle = 0x8d8f90;
				debug("fillStyle og number", 0x8d8f90);
				debug("fillStyle number", graphics.fillStyle);
        graphics.fillRect( x,y, w, barheight);
    }
    
    DrawCenteredText(DISPLAY_WIDTH/2 || 0, (DISPLAY_HEIGHT / 2) || 0, graphics.fillStyle, "Loading");
		Screen.flip();
}



// #############################################################################################
/// Function:<summary>
///             erase all current backgrounds and add the new rooms backgrounds instead.
///          </summary>
///
/// In:		 <param name="_pRoom">Room to use</param>
// #############################################################################################
function    CreateRoomBackgrounds( _pRoom  )
{
    g_pBackgroundManager.Clear();
    
    var pBackgrounds = _pRoom.m_pStorage.backgrounds;
    for(var i=0;i<pBackgrounds.length;i++)
    {
        g_pBackgroundManager.Add( pBackgrounds[i] );
        var pBack = g_pBackgroundManager.Get(i);
        array_set_1D(global, "__background_visible__", i, pBack.visible);
        array_set_1D(global, "__background_foreground__", i, pBack.foreground);
        array_set_1D(global, "__background_index__", i, pBack.index);
        array_set_1D(global, "__background_x__", i, pBack.x);
        array_set_1D(global, "__background_y__", i, pBack.y);
        array_set_1D(global, "__background_width__", i, pBack.width);
        array_set_1D(global, "__background_height__", i, pBack.height);
        array_set_1D(global, "__background_htiled__", i, pBack.hTiled);
        array_set_1D(global, "__background_vtiled__", i, pBack.vTiled);
        array_set_1D(global, "__background_xscale__", i, pBack.xscale);
        array_set_1D(global, "__background_yscale__", i, pBack.yscale);
        array_set_1D(global, "__background_vspeed__", i, pBack.vSpeed);
        array_set_1D(global, "__background_hspeed__", i, pBack.hSpeed);
        array_set_1D(global, "__background_blend__", i, pBack.blend);
        array_set_1D(global, "__background_alpha__", i, pBack.alpha);
    }
    g_pBuiltIn.background_color = _pRoom.m_color;
}


// #############################################################################################
/// Function:<summary>
///				Starts the particular room; starting indicates whether starting the game
///          </summary>
///
/// In:		 <param name="numb"></param>
///			 <param name="starting"></param>
// #############################################################################################
function StartRoom( _numb, _starting )
{
    // get the current room
    var g_CurrentRoom = g_RunRoom;

    g_pInstanceManager.PerformEvent(EVENT_OTHER_ENDROOM, 0);    

    // Extract all persistent instances from the room currently in use.
    // NB: This is done first since clearing the rooms m_Active list means that if
    // we switch room to the currently active room then we don't successfully delete
    // the instances from the instance pool and thus end up with 2x the instances we should    
    var persistent = [];    
    if (g_CurrentRoom != null)
    {            
        // Loop through all the active instances and copy any persistent ones to the persistent array
        var i;
        for (i=g_CurrentRoom.m_Active.length-1; i>=0; i--)
        {
            var pInst = g_CurrentRoom.m_Active.Get(i);
            if (pInst.persistent === true)
            {
                persistent[persistent.length] = pInst;
                pInst.createdone=true;
            }
        }
        
        // Now remove the copied instances from the active list...
        for (i=persistent.length-1; i >= 0; i--) {
            g_CurrentRoom.m_Active.Delete(persistent[i]);
        }

        // Finally, remove all NON-persistent instances (clean up OLD room)
        if( g_CurrentRoom.m_persistent===false ) {
            g_CurrentRoom.ClearInstances();
        }
    }


    // Some global initialization
	New_Room = -1;
	g_pIOManager.Clear();
	
	// Kill all particles currently in flight
	ParticleSystem_ClearParticles();

	// Create the room, dealing with persistence
	g_RunRoom = g_pRoomManager.Get( _numb );
	var ispersistent = g_RunRoom.m_persistent;
	if (ispersistent === true && g_RunRoom.m_Initialised === false) {
	    ispersistent=false;
	}
	if (ispersistent === false) 
	{	    
	    g_RunRoom.CreateRoomFromStorage(g_RunRoom.m_pStorage);
	    g_RunRoom.CopyViewsToArrays();	    
	}
	g_pBuiltIn.room = g_RunRoom.id;
	g_RunRoom.DrawSetSize();


    CreateRoomBackgrounds( g_RunRoom );

	// If this room is NOT persistent then we need to recreate all instances EXCEPT those that already exist in the persistent list
	// Any instance created in here will perform the create event... including "new" PERSISTENT instances
	if (ispersistent === false)
	{
	    g_RunRoom.ClearInstances();
	    
        // Loop through all instances in the storage of the room and create the ones NOT in the persistent list...
        with (g_RunRoom)
        {
            g_RunRoom.ClearInstances();
            m_Active = new yyOList();
            var pInstStorage = m_pStorage.pInstances;
            for (var l=0; l < m_pStorage.pInstances.length; l++)
            {
                var found = false;
                var pIStore = m_pStorage.pInstances[l];
                
                // Now check to see if this instance exists in the persistent list and has thus already been created
                for (var u=persistent.length-1;u>=0;u--)
                {
                    if( pIStore.id == persistent[u].id ) {
                        found = true;
                        break;
                    }
                }
                
                // if it doesn't then create it and add it to the room, and execute any creation code and events we need
                if (!found)
                {   
                    var pInstance = g_RunRoom.AddInstance(pIStore.x, pIStore.y, pIStore.id, pIStore.index);
                    pInstance.createdone = false;
                }
            }        
            
            var pInstStorage = m_pStorage.pInstances;
            for(var l=0; l < m_pStorage.pInstances.length; l++)
            {
                var pIStore = m_pStorage.pInstances[l];

                var pInstance = g_pInstanceManager.Get(pIStore.id);
                if (pInstance.createdone == false)
                {
                    pInstance.createdone = true;
                    if (pIStore.pCode){
			            pIStore.pCode(pInstance);
			        } 
			        pInstance.PerformEvent(EVENT_CREATE, 0, pInstance, pInstance );
                }
            }                                    
        }
    }
    // Add the persistent instances into the room's active list
    for (var u=0; u < persistent.length; u++)
    {
        g_RunRoom.m_Active.Add(persistent[u]);
    }
        

    // Start the room, performing the correct events
    if (_starting) {
        g_pInstanceManager.PerformEvent(EVENT_OTHER_STARTGAME, 0 );
    }

    // If the room has startup code, execute it...  
    if ((ispersistent == false) && (g_RunRoom.m_code != null))
    {
        g_RunRoom.m_code();
        //Code_Execute(dum,dum,code,&res);
    }    
    
    g_pInstanceManager.PerformEvent(EVENT_OTHER_STARTROOM,0);
    
    g_RunRoom.m_Initialised = true;
/*  
    // draw room for the first time
    if (New_Room == -1)
    {
        // Check whether we did not already move to another room
        if (Draw_Automatic == true)
        {
            Draw_Room();
            GR_Transition_Finish();
            GR_D3D_Start_Frame();
            Transition_Kind=0;
        }
    }
*/
    SetCanvasSize();
}

function    SwitchRoom( _NewRoom )
{
    //EndRoom(false);
	StartRoom(_NewRoom,false);
}



// #############################################################################################
/// Function:<summary>
///				Starts the game
///          </summary>
// #############################################################################################
function    StartGame()
{
	//g_pObjectManager.Create_Object_Lists();
	g_pBuiltIn.score = 0;	
	g_pBuiltIn.lives = -1;

	Score = 0;
	Lives=-1;
	Transition_Kind=0;
	
	
	// create the running rooms
	persnumb = 0;   // no persistent instances
	debug("StartGame - Starting room")
	StartRoom( g_pRoomManager.GetOrder(0).id, true );


	lasttime = curtime = YoYo_GetTimer();
	lastfpstime = ~~(lasttime / 1000000) + 4;
	g_pBuiltIn.fps = Fps;
}

// #############################################################################################
/// Function:<summary>
///          	Render any system level stuff we need to render. 
///				This will always be ON TOP of the game
///          </summary>
// #############################################################################################
function 	RenderSystemOverlays() {
	g_pIOManager.Render();
}

// #############################################################################################
/// Function:<summary>
///          	Process the new and moved instances in the active list.
///          </summary>
// #############################################################################################
function UpdateActiveLists() {
	if( g_RunRoom.m_Active.unsorted>=0 ) g_RunRoom.m_Active.Sort();
	if (g_RunRoom.m_DepthSorting.length > 0) g_RunRoom.ProcessDepthList();
}

// #############################################################################################
/// Function:<summary>
///				Executes a single frame of the game.
///          </summary>
// #############################################################################################
function    GameMaker_DoAStep()
{
	g_pIOManager.StartStep();
	//UpdateYoYoFunctions();
//	if (Splash_Is_Shown_In_Main())	return;

	g_pInstanceManager.RememberOldPositions();                     	// Remember old positions

	// Handle events that must react to the old position
	g_pInstanceManager.PerformEvent(EVENT_STEP_BEGIN, 0);
	UpdateActiveLists();
	if (New_Room != -1) return;

    // ASync loading (and events) are called after the BEGIN step.
    g_pASyncManager.Process();
    UpdateActiveLists();
    if (New_Room != -1) return;

	HandleTimeLine();
	UpdateActiveLists();
	if (New_Room != -1) return;

	HandleAlarm();
	UpdateActiveLists();
	if (New_Room != -1) return;

	HandleKeyboard();
	UpdateActiveLists();
	if (New_Room != -1) return;

	//HandleJoystick();
	//if (New_Room != -1) return;

	HandleMouse();
	UpdateActiveLists();
	if (New_Room != -1) return;

    g_pInstanceManager.PerformEvent(EVENT_STEP_NORMAL, 0);                 	//HandleStep(EVENT_STEP_END);
    UpdateActiveLists();
    if (New_Room != -1) return;

	
	g_pInstanceManager.UpdatePositions();	



	// Handle event that should react to the new position
	HandleOther();
	UpdateActiveLists();
	if (New_Room != -1) return;

	HandleCollision();
	UpdateActiveLists();
	if (New_Room != -1) return;

    g_pInstanceManager.PerformEvent(EVENT_STEP_END, 0);                 	//HandleStep(EVENT_STEP_END);
    UpdateActiveLists();
    if (New_Room != -1) return;

	// Handle the particle systems
	ParticleSystem_UpdateAll();

	debug("Drawing room ", g_RunRoom.id);
	// Bookkeeping && drawing
	if (g_RunRoom!=null){
    	g_RunRoom.RemoveMarked();
	    g_RunRoom.Draw();
	    UpdateActiveLists();
	   }
	
	g_RunRoom.ScrollBackground();
	
	g_pInstanceManager.UpdateImages();
	UpdateActiveLists();
	
	// Set all instances in the new positions
	//Cursor_Subimage = Cursor_Subimage+1;
	//if (DebugMode){
	//	DebugForm->UpdateDebugInfo();
	//}

	RenderSystemOverlays();
}



	
// #############################################################################################
/// Function:<summary>
///          	Sets the size of the canvas, and works out scaling values for "the world"
///          </summary>
///
/// In:		<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function SetCanvasSize()	
{
    var left,right,top,bottom;
    
    left = 0;
    right = -999999;
    top  = 0;
    bottom = -999999;
    with( g_RunRoom )
    {
        if (m_enableviews )
        {
            for( i in m_Views )
            {
                pView = m_Views[i];
	            if (pView.visible) 
                {
                    //if( left > pView.portx ) left = pView.portx;
                    if( right < pView.portx+pView.portw ) right = pView.portx+pView.portw;
                    //if( top > pView.porty ) top = pView.porty;
                    if( bottom< pView.porty+pView.porth ) bottom = pView.porty+pView.porth;
                }
            }
        }
        else{
            left = 0;
            right = g_RunRoom.m_width;
            top = 0;
            bottom = g_RunRoom.m_height;
        }
    }
	g_DisplayWidth =  DISPLAY_WIDTH; 
	g_DisplayHeight = DISPLAY_HEIGHT;
    g_DisplayScaleX = DISPLAY_WIDTH / (right-left);
    g_DisplayScaleY = DISPLAY_HEIGHT / (bottom-top);

    // Drawing inside a view scale this later, so we need to ANTI-Scale this now, so later it's "fixed"
    g_DefaultView.portw = g_DisplayWidth / g_DisplayScaleX;		
    g_DefaultView.porth = g_DisplayHeight / g_DisplayScaleY;
    g_DefaultView.worldw = g_DisplayWidth / g_DisplayScaleX;
    g_DefaultView.worldh = g_DisplayHeight / g_DisplayScaleY;


}
	
	
	
	
// #############################################################################################
/// Function:<summary>
///             Get the widh of the browser window
///          </summary>
///
/// Out:	 <returns>
///				Width in pixels
///			 </returns>
// #############################################################################################
function    GetBrowserWidth()
{
    var w = 640; 
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        w = window.innerWidth;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        w = document.documentElement.clientWidth;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        w = document.body.clientWidth;
    }
    return w;
}

// #############################################################################################
/// Function:<summary>
///             Get the height of the browser window
///          </summary>
///
/// Out:	 <returns>
///				Height in pixels
///			 </returns>
// #############################################################################################
function    GetBrowserHeight()
{
    var h = 480; 
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        h = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        h = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        h = document.body.clientHeight;
    }
    return h;
}


// #############################################################################################
/// Function:<summary>
///             Process "misc" stuff. Like into/outof fullscreen
///          </summary>
// #############################################################################################
function ProcessMisc() 
{
	CalcCanvasLocation();

    var w = GetBrowserWidth();
    var h = GetBrowserHeight();

    // Check the screen is still the same size....
    if( (g_FullScreen) && (!g_ToggleFullscreen) )
    {
        if(( g_LastWidth!=w ) || ( g_LastHeight!=h ))
        {
            // Force into fullscreen to resize to the latest canvas size.
            g_ToggleFullscreen = true;
            g_FullScreen = false;                        
        }
    }


    // Check for in/out of full screen mode.
    if( g_ToggleFullscreen )
    {
        g_ToggleFullscreen = false;
        
        if( g_FullScreen )
        {
            w = g_OriginalWidth;
            h = g_OriginalHeight;
            g_FullScreen = false;

            // Remember these settings, as FULLSCREEN will mess them up.
            canvas.style.position = g_Canvas_OriginalPosition;
            canvas.style.left = g_Canvas_OriginalLeft;
            canvas.style.top = g_Canvas_OriginalTop;
        }else{
           	g_FullScreen = true;
           	window_set_position(0, 0);
        }

		canvas.width = w;
		canvas.height = h;
		DISPLAY_WIDTH = canvas.width;
		DISPLAY_HEIGHT = canvas.height;
		canvasMinX = canvas.offsetLeft;
		canvasMaxX = canvasMinX + DISPLAY_WIDTH;
		canvasMinY = canvas.offsetTop;
		canvasMaxY = canvasMinX + DISPLAY_HEIGHT;
		
		g_LastWidth = DISPLAY_WIDTH;
		g_LastHeight = DISPLAY_HEIGHT;
		
		g_DisplayWidth = w;
		g_DisplayHeight = h
        g_DisplayScaleX = 1;
        g_DisplayScaleY = 1;

        SetCanvasSize();
    }
    
}



var g_CollisionEllipseCounterMax = 0;
var g_roomdiff = 0.0;
// #############################################################################################
/// Function:<summary>
///             Starts the next frame, and uses the "timer" to sleep...
///          </summary>
// #############################################################################################
function GameMaker_Tick() 
{
	// Wait till it is time
	curtime = YoYo_GetTimer();
	if (curtime < lasttime || ((curtime-lasttime)> 2000000) ){
		lasttime = curtime;				// To avoid error when timer loops, or when we have a stall > 3 seconds.
		lastfpstime = lasttime;
	}
	if (g_RunRoom.GetSpeed() <= 0){
		g_RunRoom.SetSpeed(1);
	}

	diff = ~ ~(curtime - lasttime);
	g_roomdiff = ~ ~(1000000.0 / g_RunRoom.GetSpeed()) - diff;
	slp = max(0, g_roomdiff );
	slp = min( slp, 1000000.0);                        // You can never sleep more than 1 second

	var framesworth = 1000000.0 / g_RunRoom.GetSpeed();
	
	// If more than a frame, then wait some more...
	if (slp > 14000) return;
	//Timing_Wait(slp);

	//window.clearInterval(g_SleepTimerHandle);



	lasttime = curtime + slp;
	
	// Adapt frames per second
	if (lasttime < lastfpstime){
		lastfpstime = lasttime;  // To avoid error when timer loops
	}

	// When we've crossed a "second" boundary... take a sample again (1second = 1000000 microseconds)
	if ( (~~(lasttime / 1000000)) > lastfpstime)
	{
		Fps = newfps;
		newfps = 0;
		lastfpstime = ~ ~(lasttime / 1000000);
	}
	newfps = newfps+1;
	g_pBuiltIn.fps = Fps;


	if (!Run_Paused)
	{

		g_CollisionEllipseCounter = 0;
		ProcessMisc();

		// update default view each frame.
		if (g_RunRoom === null)
		{
			g_DefaultView.scaledportx2 = g_DefaultView.scaledportw = g_DefaultView.portw = g_DefaultView.worldw = DISPLAY_WIDTH;
			g_DefaultView.scaledporty2 = g_DefaultView.scaledporth = g_DefaultView.porth = g_DefaultView.worldh = DISPLAY_HEIGHT;
		} else
		{
			//g_DefaultView.portw = g_RunRoom.m_width;
			//g_DefaultView.porth = g_RunRoom.m_height;
			//g_DefaultView.worldw = g_RunRoom.m_width;
			//g_DefaultView.worldh = g_RunRoom.m_height;
			SetCanvasSize();

		}


		// **********************************************
		// Execute and render a single game frame
		// **********************************************
		if (New_Room == -1) Graphics_StartFrame(); 					// Start of frame
		//try
		{
			GameMaker_DoAStep();
		}
		/* catch (ex)
		{
			debug("GameStep Error detected");
		}*/
		if (g_CollisionEllipseCounterMax < g_CollisionEllipseCounter) g_CollisionEllipseCounterMax = g_CollisionEllipseCounter;
		//graphics.fillText("g_CollisionEllipseCounter=" + string(g_CollisionEllipseCounter), 10, 10);
		//graphics.fillText("g_CollisionEllipseCounterMax=" + string(g_CollisionEllipseCounterMax), 10, 30);


        /*with(g_pIOManager){
            var left = m_DoMouseButton&1;
            var right = m_DoMouseButton&2;
            var middle = m_DoMouseButton&4;
                
            graphics.fillStyle = "White";
            graphics.fillText("Mouse:  X:"+MouseX.toString(10)+"   Y:"+MouseY.toString(10), 30, 400 );
            graphics.fillText("Mouse:  L:"+left.toString(10)+"   M:"+middle.toString(10)+"   R:"+right.toString(10)+"   B:"+g_ButtonButton.toString(10), 30, 420 );
            graphics.fillStyle = "Black";
        }*/
        
        //graphics.fillStyle = "White";
        //graphics.fillText("Event: "+g_event, 10,30);
        //graphics.fillStyle = "Black";
        
		if (New_Room < 0 && Draw_Automatic) Graphics_EndFrame();	// Do the actual drawing on the screen



		// See whether we should the room || the game
		switch(New_Room)
		{
			case	-1:					break;;							// Nothing needs to be done
			case	ROOM_ENDOFGAME:
			case	ROOM_ABORTGAME:		Run_Running = false;
			                            return;

			case	ROOM_RESTARTGAME:	// Run_EndGame();
										StartGame();
										break;

			case	ROOM_LOADGAME:		LoadGame();
										break;

			default:					SwitchRoom(New_Room);
		}
	}	
}
