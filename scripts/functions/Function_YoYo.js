
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_YoYo.js
// Created:			27/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 27/05/2011		
// 
// **********************************************************************************************************************


var     g_YoYoTimerStart;

// yoyo constants
var     os_win32;
var     os_win64;
var     os_macosx;
var     os_psp;
var     os_ios;
var     os_android;
var     of_challenge_win;
var     of_challenge_lose;
var     of_challenge_tie;
var     leaderboard_type_number;
var     leaderboard_type_time_mins_secs;


// Identify a GameMaker:HTML5 game3
var g_GameMakerIdentifier = aa_1241_kz();
function aa_1241_kz() { return 0x87155211; }

// #############################################################################################
/// Function:<summary>
///          	Enable/Disable alpha blending
///          </summary>
///
/// In:		<param name="_on_off"></param>
///				
// #############################################################################################
function    YoYo_EnableAlphaBlend( _on_off )
{
}

// #############################################################################################
/// Function:<summary>
///          	Are online achievements available?
///          </summary>
///
/// Out:	<returns>
///				true/false for yes/no
///			</returns>
// #############################################################################################
function    YoYo_AchievementsAvailable()
{
    return false;
}

// #############################################################################################
/// Function:<summary>
///          	Log into achievement system
///          </summary>
// #############################################################################################
function    YoYo_LoginAchievements()
{
}

// #############################################################################################
/// Function:<summary>
///          	Log out of online achievements
///          </summary>
// #############################################################################################
function YoYo_LogoutAchievements()
{
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
function    YoYo_GetConfig()
{
    return "YOYO_PAID";
}


// #############################################################################################
/// Function:<summary>
///          	Get the platform we're running on (if known)
///          </summary>
///
/// Out:	<returns>
///				BROWSER_UNKNOWN = -1,
///				BROWSER_WIN32 = 0,
///				BROWSER_WIN64 = 1,
///				BROWSER_MACOSX = 2,
///				BROWSER_PSP = 3,
///				BROWSER_IOS = 4,
///				BROWSER_ANDROID = 5,
///				BROWSER_LINUX = 6,
///			</returns>
// #############################################################################################
function    YoYo_GetPlatform() {

	return g_OSPlatform;
}

// #############################################################################################
/// Function:<summary>
///          	Get the "device" type - if knowns
///          </summary>
///
/// Out:	<returns>
///				BROWSER_TYPE = 0,
///				BROWSER_TYPE_UNKNOWN = 255,
///				BROWSER_IPHONE = 0,
///				BROWSER_IPHONE_RETENA = 1,
///				BROWSER_IPAD = 2, 
///			</returns>
// #############################################################################################
function    YoYo_GetDevice()
{
	return g_DeviceType;
}


// #############################################################################################
/// Function:<summary>
///          	Get the browser type.
///          </summary>
///
/// Out:	<returns>
///				BROWSER_NOT_A_BROWSER = -1, 	// game is not being played in a browser.
///				BROWSER_UNKNOWN = 0, 		// Unknown browser...
///				BROWSER_IE = 1,
///				BROWSER_FIREFOX = 2,
///				BROWSER_CHROME = 3,
///				BROWSER_SAFARI = 4,
///				BROWSER_OPERA = 5,
///				BROWSER_SAFARI_MOBILE = 6, 
///			</returns>
// #############################################################################################
function YoYo_GetBrowser() {
	return g_OSBrowser;
}

// #############################################################################################
/// Function:<summary>
///          	Return the OS version number
///          </summary>
///
/// Out:	<returns>
///				The OS version, or -1
///			</returns>
// #############################################################################################
function YoYo_GetVersion() {
	return g_OSVersion;
}

// #############################################################################################
/// Function:<summary>
///          	Open a URL in a window....
///          </summary>
///
/// In:		<param name="_url">URL to open</param>
///				
// #############################################################################################
function YoYo_OpenURL(_url) 
{
	var load = window.open(_url,'_self','scrollbars=yes,menubar=yes,resizable=yes,toolbar=yes,location=yes,status=yes');
}

// #############################################################################################
/// Function:<summary>
///          	Post an online score
///          </summary>
///
/// In:		<param name="_scoreboard">Scoreboard name</param>
///			<param name="_score">Score to post</param>
///				
// #############################################################################################
function    YoYo_PostScore( _scoreboard, _score )
{
}

// #############################################################################################
/// Function:<summary>
///          	Post an online achievement
///          </summary>
///
/// In:		<param name="_scoreboard">Scoreboard name</param>
///			<param name="_score">Score to post</param>
///				
// #############################################################################################
function    YoYo_PostAchievement( _scoreboard, _achivement )
{
}


// #############################################################################################
/// Function:<summary>
///          	Enable ad serving...
///          </summary>
///
/// In:		<param name="x"></param>
///			<param name="y"></param>
///			<param name="w"></param>
///			<param name="h"></param>
///			<param name="freq"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    YoYo_EnableAds(x,y,w,h, freq)
{
}

// #############################################################################################
/// Function:<summary>
///          	Disable ads
///          </summary>
// #############################################################################################
function    YoYo_DisableAds()
{
}


// #############################################################################################
/// Function:<summary>
///          	Ask to leave a rating
///          </summary>
///
/// In:		<param name="_text"></param>
///			<param name="_yes"></param>
///			<param name="_no"></param>
///			<param name="_URL"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    YoYo_LeaveRating(_text,_yes,_no,_URL)
{
}

// #############################################################################################
/// Function:<summary>
///             Hires timer
///          </summary>
///
/// Out:	 <returns>
///				time value since start of app
///			 </returns>
// #############################################################################################
function    YoYo_GetTimer()
{
    var t = new Date().getTime() * 1000;
    return t - g_YoYoTimerStart;
}









// #############################################################################################
/// Function:<summary>
///          	Add a virtual key
///          </summary>
///
/// In:		<param name="_x">x coordinate</param>
///			<param name="_y">y coordinate</param>
///			<param name="_w">width</param>
///			<param name="_h">height</param>
///			<param name="_keycode">key to map to</param>
/// Out:	<returns>
///				virtual key "id"
///			</returns>
// #############################################################################################
function YoYo_AddVirtualKey( _x,_y,_w,_h, _keycode )
{
    var vkey = AllocateVirtualKey();
    
    vkey.x = _x;
    vkey.y = _y;
    vkey.w = _w;
    vkey.h = _h;
    vkey.key = _keycode;
    vkey.x2 = _x + _w;
    vkey.y2 = _y + _h;
    vkey.button = vkey.u = vkey.v = 0;
    vkey.flags = VIRTUALKEY_ACTIVE;
    
    return (vkey.index + 1);
}

// #############################################################################################
/// Function:<summary>
///          	Delete a virtual key
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_DeleteVirtualKey(_id)
{
    var index = _id - 1;
    if ((index < 0) || ( index >= g_VirtualKeys.length)) {
        debug("Invalid index when deleting virtual key");
    }
    FreeVirtualKey(_id - 1);
}

// #############################################################################################
/// Function:<summary>
///          	Loop through all the virtual keys and keep a list of the ones to draw.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function UpdateVirtualKeyDrawList() {
	g_VirtualKeyDrawList = [];
	// Loop through all the virtual keys and look for draw flags
	for (var l = 0; l < g_VirtualKeys.length; ++l)
	{
		var pKey = g_VirtualKeys[l];
		if ((pKey.flags & VIRTUALKEY_DRAW) != 0) g_VirtualKeyDrawList[g_VirtualKeyDrawList.length] = pKey;
	}
}

// #############################################################################################
/// Function:<summary>
///          	Show the virtual key
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_ShowVirtualKey(_id) {
	_id--;
	if (!g_VirtualKeys[_id]) return;
	g_VirtualKeys[_id].flags |= VIRTUALKEY_DRAW;
	UpdateVirtualKeyDrawList();
}


// #############################################################################################
/// Function:<summary>
///          	Hide the virtual key
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_HideVirtualKey(_id) {
	_id--;
	if (!g_VirtualKeys[_id]) return;
	g_VirtualKeys[_id].flags &= ~VIRTUALKEY_DRAW;
	UpdateVirtualKeyDrawList();
}

	
// #############################################################################################
/// Function:<summary>
///          	Get TILT on X
///          </summary>
///
/// Out:	<returns>
///				-1 to 1 tilt value
///			</returns>
// #############################################################################################
function YoYo_GetTiltX()
{
    return 0;
}


// #############################################################################################
/// Function:<summary>
///          	Get TILT on Y
///          </summary>
///
/// Out:	<returns>
///				-1 to 1 tilt value
///			</returns>
// #############################################################################################
function YoYo_GetTiltY()
{
    return 0;
}


// #############################################################################################
/// Function:<summary>
///          	Get TILT on Z
///          </summary>
///
/// Out:	<returns>
///				-1 to 1 tilt value
///			</returns>
// #############################################################################################
function YoYo_GetTiltZ()
{
    return 0;
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
function YoYo_SelectPicture()
{
    MissingFunction("YoYo_SelectPicture()");
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
function YoYo_GetPictureSprite()
{
    MissingFunction("YoYo_GetPictureSprite()");
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
function YoYo_OF_StartDashboard()
{
    MissingFunction("YoYo_OF_StartDashboard()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
///			<param name="_b"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_AddAchievement(_a,_b)
{
    MissingFunction("YoYo_OF_AddAchievement()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
///			<param name="_b"></param>
///			<param name="_c"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_AddLeaderboard(_a,_b,_c)
{
    MissingFunction("YoYo_OF_AddLeaderboard()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
///			<param name="_b"></param>
///			<param name="_c"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_SendChallenge(_a,_b,_c)
{
    MissingFunction("YoYo_OF_SendChallenge()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_SendInvite(_a)
{
    MissingFunction("YoYo_OF_SendInvite()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
///			<param name="_b"></param>
///			<param name="_c"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_SendSocial(_a,_b,_c)
{
    MissingFunction("YoYo_OF_SendSocial()");
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_SetURL(_a)
{
    MissingFunction("YoYo_OF_SetURL()");
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
function YoYo_OF_AcceptChallenge()
{
    MissingFunction("YoYo_OF_AcceptChallenge()");
    return "";
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
function YoYo_OF_IsOnline()
{
    MissingFunction("YoYo_OF_IsOnline()");
    return false;
}
// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="_a"></param>
///			<param name="_b"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_OF_SendChallengeResult(_a,_b)
{
    MissingFunction("YoYo_OF_SendChallengeResult()");
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
function YoYo_IsKeypadOpen() {
	return false;
}



// #############################################################################################
/// Function:<summary>
///          	Popup a Facebook "LIKE"
//
///				<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1">
///				</script><fb:like href="htp://www.yoyogames.com" send="true" width="450" show_faces="true" font="verdana"></fb:like>
///          </summary>
///
/// In:		<param name="_url"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function YoYo_FacebookLike(_url) {
    var c = document.getElementById(g_CanvasName);
    var obj = c.parentNode;

	var div = document.createElement("div");
    div.setAttribute("id", "fb-root");
    obj.insertBefore(div, c);

    var scr = document.createElement("script");
    scr.setAttribute("src", "http://connect.facebook.net/en_US/all.js#xfbml=1");
    obj.insertBefore(scr, div.nextSibling);

    var fblike = document.createElement("fb:like");
    fblike.setAttribute("href", _url);
    fblike.setAttribute("send", "true");
    fblike.setAttribute("width", "450");
    fblike.setAttribute("show_faces", "true");
    fblike.setAttribute("font", "verdana");
    obj.insertBefore(fblike, scr.nextSibling);
}


// #############################################################################################
/// Function:<summary>
///          	Init the YoYo plugins.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    YoYo_Init()
{
    g_YoYoTimerStart = new Date().getTime() * 1000;

    var t = 0;
    for(var i=0;i<12;i++){
        totalmonthlen[i] = t;
        t += monthlen[i];        
    }
    
    
    
    os_win32 = 0;
    os_win64 = 1;
    os_macosx = 2;
    os_psp = 3;
    os_ios = 4;
    os_android = 5;
    of_challenge_win = 0;
    of_challenge_lose = 1;
    of_challenge_tie = 2;
    leaderboard_type_number = 0;
    leaderboard_type_time_mins_secs = 1;
}




