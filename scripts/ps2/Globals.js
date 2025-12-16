
// **********************************************************************************************
// Global
// **********************************************************************************************
var Pi = 3.14159265,
	CACHE_SINGLE_IMAGE = false,	// TODO: Caching images
	DEBUG_MODE = false,
	AUDIO_ON = true,

// os_device
	g_DeviceType = 0, 				// Actual variable
	BROWSER_TYPE_UNKNOWN = -1,
	BROWSER_IPHONE = 0,
	BROWSER_IPHONE_RETENA = 1,
	BROWSER_IPAD = 2,

	// browser in upper byte.
	g_OSBrowser = 0;				// Actual variable
	BROWSER_NOT_A_BROWSER = -1,		// game is not being played in a browser.
	BROWSER_UNKNOWN = 0,			// Unknown browser...
	BROWSER_IE = 1,
	BROWSER_FIREFOX = 2,
	BROWSER_CHROME = 3,
	BROWSER_SAFARI = 4,
	BROWSER_SAFARI_MOBILE = 5,
	BROWSER_OPERA = 6,
	
	// os_type
	g_OSPlatform = 0,			// actual variable
	BROWSER_UNKNOWN = -1,
	BROWSER_WIN32 = 0,
	BROWSER_WIN64 = 1,
	BROWSER_MACOSX = 2,
	BROWSER_PSP = 3,
	BROWSER_IOS = 4,
	BROWSER_ANDROID = 5,
	BROWSER_LINUX = 6,

	g_OSVersion = 0,				// Actual variable
	BROWSER_OS_VERSION = -1,		// 0 for unknown.
	
	
	ROOM_ENDOFGAME = -100,
	ROOM_RESTARTGAME    =  -200,
	ROOM_LOADGAME       =  -300,
	ROOM_ABORTGAME      =  -400;


	OBJECT_SELF = -1,          // reference to self object
	OBJECT_OTHER = -2,         // reference to other obejct in meeting
	OBJECT_ALL = -3,           // reference to all objects
	OBJECT_NOONE = -4,         // reference to no object
	OBJECT_GLOBAL = -5,        // reference to the global object
	OBJECT_LOCAL = -7,         // reference to the local object
	OBJECT_NOTSPECIFIED = -6;  // reference to non-specified object (can be local or global)


// **********************************************************************************************
// Objects
// **********************************************************************************************

// EVENTS
var EVENT_CREATE      =   0x000,
	EVENT_DESTROY     =   0x100,
	EVENT_ALARM       =   0x200,
	EVENT_STEP        =   0x300,
	EVENT_COLLISION   =   0x400,
	EVENT_KEYBOARD    =   0x500,
	EVENT_MOUSE       =   0x600,
	EVENT_OTHER       =   0x700,
	EVENT_DRAW        =   0x800,
	EVENT_KEYPRESS    =   0x900,
	EVENT_KEYRELEASE  =   0xA00,

	EVENT_STEP_NORMAL         = EVENT_STEP|1,
	EVENT_STEP_BEGIN          = EVENT_STEP|2,
	EVENT_STEP_END            = EVENT_STEP|3,

	EVENT_OTHER_OUTSIDE       = EVENT_OTHER|1,
	EVENT_OTHER_BOUNDARY      = EVENT_OTHER|2,
	EVENT_OTHER_STARTGAME     = EVENT_OTHER|3,
	EVENT_OTHER_ENDGAME       = EVENT_OTHER|4,
	EVENT_OTHER_STARTROOM     = EVENT_OTHER|5,
	EVENT_OTHER_ENDROOM       = EVENT_OTHER|6,
	EVENT_OTHER_NOLIVES       = EVENT_OTHER|7,
	EVENT_OTHER_ANIMATIONEND  = EVENT_OTHER|8,
	EVENT_OTHER_ENDOFPATH     = EVENT_OTHER|9,
	EVENT_OTHER_NOHEALTH      = EVENT_OTHER|10,
	EVENT_OTHER_CLOSEBUTTON   = EVENT_OTHER|11,
	EVENT_OTHER_OUTSIDE_VIEW0 = EVENT_OTHER|12,
	EVENT_OTHER_BOUNDARY_VIEW0 = EVENT_OTHER|13,

    EVENT_OTHER_USER0 = EVENT_OTHER|14;
    EVENT_OTHER_USER1 = EVENT_OTHER|15;
    EVENT_OTHER_USER2 = EVENT_OTHER|16;
    EVENT_OTHER_USER3 = EVENT_OTHER|17;
    EVENT_OTHER_USER4 = EVENT_OTHER|18;
    EVENT_OTHER_USER5 = EVENT_OTHER|19;
    EVENT_OTHER_USER6 = EVENT_OTHER|20;
    EVENT_OTHER_USER7 = EVENT_OTHER|21;
    EVENT_OTHER_USER8 = EVENT_OTHER|22;
    EVENT_OTHER_USER9 = EVENT_OTHER|23;
    EVENT_OTHER_USER10= EVENT_OTHER|24;
    EVENT_OTHER_USER11= EVENT_OTHER|25;
    EVENT_OTHER_USER12= EVENT_OTHER|26;
    EVENT_OTHER_USER13= EVENT_OTHER|27;
    EVENT_OTHER_USER14= EVENT_OTHER|28;
    EVENT_OTHER_USER15= EVENT_OTHER|29;
    
    EVENT_OTHER_WEB_IMAGE_LOAD = EVENT_OTHER | 60,
	EVENT_OTHER_WEB_SOUND_LOAD = EVENT_OTHER | 61,
	
EVENT_MOUSE_LBUTTON_DOWN = EVENT_MOUSE|1;
EVENT_MOUSE_RBUTTON_DOWN = EVENT_MOUSE|2;
EVENT_MOUSE_MBUTTON_DOWN = EVENT_MOUSE|3;
EVENT_MOUSE_LBUTTON_PRESSED = EVENT_MOUSE|4;  
EVENT_MOUSE_RBUTTON_PRESSED = EVENT_MOUSE|5;
EVENT_MOUSE_MBUTTON_PRESSED = EVENT_MOUSE|6;
EVENT_MOUSE_LBUTTON_RELEASED = EVENT_MOUSE|7;
EVENT_MOUSE_RBUTTON_RELEASED = EVENT_MOUSE|8;
EVENT_MOUSE_MBUTTON_RELEASED = EVENT_MOUSE|9;
EVENT_MOUSE_GLOBAL_LBUTTON_DOWN = EVENT_MOUSE|10;
EVENT_MOUSE_GLOBAL_RBUTTON_DOWN = EVENT_MOUSE|11;
EVENT_MOUSE_GLOBAL_MBUTTON_DOWN = EVENT_MOUSE|12;
EVENT_MOUSE_GLOBAL_LBUTTON_PRESSED = EVENT_MOUSE|13;
EVENT_MOUSE_GLOBAL_RBUTTON_PRESSED = EVENT_MOUSE|14;
EVENT_MOUSE_GLOBAL_MBUTTON_PRESSED = EVENT_MOUSE|15;
EVENT_MOUSE_GLOBAL_LBUTTON_RELEASED = EVENT_MOUSE|16;
EVENT_MOUSE_GLOBAL_RBUTTON_RELEASED = EVENT_MOUSE|17;
EVENT_MOUSE_GLOBAL_MBUTTON_RELEASED = EVENT_MOUSE|18;
EVENT_MOUSE_NOBUTTON = EVENT_MOUSE | 19;
EVENT_MOUSE_ENTER = EVENT_MOUSE | 20;
EVENT_MOUSE_LEAVE = EVENT_MOUSE | 21;


EVENT_ALARM_0 = EVENT_ALARM|1;
EVENT_ALARM_1 = EVENT_ALARM|2;
EVENT_ALARM_2 = EVENT_ALARM|3;
EVENT_ALARM_3 = EVENT_ALARM|4;
EVENT_ALARM_4 = EVENT_ALARM|5;
EVENT_ALARM_5 = EVENT_ALARM|6;
EVENT_ALARM_6 = EVENT_ALARM|7;
EVENT_ALARM_7 = EVENT_ALARM|8;
EVENT_ALARM_8 = EVENT_ALARM|9;
EVENT_ALARM_9 = EVENT_ALARM|10;
EVENT_ALARM_10 = EVENT_ALARM|11;
EVENT_ALARM_11 = EVENT_ALARM|12;



 GML_EVENT_CREATE      =   0;
 GML_EVENT_DESTROY     =   1;
 GML_EVENT_ALARM       =   2;
 GML_EVENT_STEP        =   3;
 GML_EVENT_COLLISION   =   4;
 GML_EVENT_KEYBOARD    =   5;
 GML_EVENT_MOUSE       =   6;
 GML_EVENT_OTHER       =   7;
 GML_EVENT_DRAW        =   8;
 GML_EVENT_KEYPRESS    =   9;
 GML_EVENT_KEYRELEASE  =  10;

GML_MOUSE_LeftButton = 0;
GML_MOUSE_RightButton = 1;
GML_MOUSE_MiddleButton = 2;
GML_MOUSE_NoButton = 3;
GML_MOUSE_LeftPressed = 4;
GML_MOUSE_RightPressed = 5;
GML_MOUSE_MiddlePressed = 6;
GML_MOUSE_LeftReleased = 7;
GML_MOUSE_RightReleased = 8;
GML_MOUSE_MiddleReleased = 9;
GML_MOUSE_MOUSEEnter = 10;
GML_MOUSE_MOUSELeave = 11;
GML_MOUSE_Joystick1Left = 16;
GML_MOUSE_Joystick1Right = 17;
GML_MOUSE_Joystick1Up = 18;
GML_MOUSE_Joystick1Down = 19;
GML_MOUSE_Joystick1Button1 = 21;
GML_MOUSE_Joystick1Button2 = 22;
GML_MOUSE_Joystick1Button3 = 23;
GML_MOUSE_Joystick1Button4 = 24;
GML_MOUSE_Joystick1Button5 = 25;
GML_MOUSE_Joystick1Button6 = 26;
GML_MOUSE_Joystick1Button7 = 27;
GML_MOUSE_Joystick1Button8 = 28;
GML_MOUSE_Joystick2Left = 31;
GML_MOUSE_Joystick2Right = 32;
GML_MOUSE_Joystick2Up = 33;
GML_MOUSE_Joystick2Down = 34;
GML_MOUSE_Joystick2Button1 = 36;
GML_MOUSE_Joystick2Button2 = 37;
GML_MOUSE_Joystick2Button3 = 38;
GML_MOUSE_Joystick2Button4 = 39;
GML_MOUSE_Joystick2Button5 = 40;
GML_MOUSE_Joystick2Button6 = 41;
GML_MOUSE_Joystick2Button7 = 42;
GML_MOUSE_Joystick2Button8 = 43;
GML_MOUSE_GlobLeftButton = 50;
GML_MOUSE_GlobRightButton = 51;
GML_MOUSE_GlobMiddleButton = 52;
GML_MOUSE_GlobLeftPressed = 53;
GML_MOUSE_GlobRightPressed = 54;
GML_MOUSE_GlobMiddlePressed = 55;
GML_MOUSE_GlobLeftReleased = 56;
GML_MOUSE_GlobRightReleased = 57;
GML_MOUSE_GlobMiddleReleased = 58;
GML_MOUSE_GML_MOUSEWheelUp = 60;
GML_MOUSE_GML_MOUSEWheelDown = 61;


GML_EVENT_STEP_NORMAL = 0,
	GML_EVENT_STEP_BEGIN = 1,
	GML_EVENT_STEP_END = 2,

	GML_EVENT_OTHER_OUTSIDE = 0,
	GML_EVENT_OTHER_BOUNDARY = 1,
	GML_EVENT_OTHER_STARTGAME = 2,
	GML_EVENT_OTHER_ENDGAME = 3,
	GML_EVENT_OTHER_STARTROOM = 4,
	GML_EVENT_OTHER_ENDROOM = 5,
	GML_EVENT_OTHER_NOLIVES = 6,
	GML_EVENT_OTHER_ANIMATIONEND = 7,
	GML_EVENT_OTHER_ENDOFPATH = 8,
	GML_EVENT_OTHER_NOHEALTH = 9,
	GML_EVENT_OTHER_CLOSEBUTTON = 30,
	GML_EVENT_OTHER_OUTSIDE_VIEW0 = 40,
	GML_EVENT_OTHER_BOUNDARY_VIEW0 = 50,

	GML_ev_user0 = 10,
	GML_ev_user1 = 11,
	GML_ev_user2 = 12,
	GML_ev_user3 = 13,
	GML_ev_user4 = 14,
	GML_ev_user5 = 15,
	GML_ev_user6 = 16,
	GML_ev_user7 = 17,
	GML_ev_user8 = 18,
	GML_ev_user9 = 19,
	GML_ev_user10 = 20,
	GML_ev_user11 = 21,
	GML_ev_user12 = 22,
	GML_ev_user13 = 23,
	GML_ev_user14 = 24,
	GML_ev_user15 = 25,

	GML_EVENT_OTHER_WEB_IMAGE_LOAD = 60;
	GML_EVENT_OTHER_WEB_SOUND_LOAD = 61;

    GML_EVENT_KEYPRESS_NOKEY    =   EVENT_KEYPRESS|0,
    GML_EVENT_KEYPRESS_ANYKEY   =   EVENT_KEYPRESS|1,
    GML_EVENT_KEYPRESS_BACKSPACE=   EVENT_KEYPRESS|8,
	GML_EVENT_KEYPRESS_TAB      =   EVENT_KEYPRESS|9,
	GML_EVENT_KEYPRESS_ENTER    =   EVENT_KEYPRESS|13,
	GML_EVENT_KEYPRESS_SHIFT    =   EVENT_KEYPRESS|16,
	GML_EVENT_KEYPRESS_CTRL     =   EVENT_KEYPRESS|17,
	GML_EVENT_KEYPRESS_ALT      =   EVENT_KEYPRESS|18,
	GML_EVENT_KEYPRESS_PAUSE    =   EVENT_KEYPRESS|19,
	GML_EVENT_KEYPRESS_ESCAPE   =   EVENT_KEYPRESS|27,
	GML_EVENT_KEYPRESS_SPACE    =   EVENT_KEYPRESS|32,

	GML_EVENT_KEYPRESS_PAGEUP   =   EVENT_KEYPRESS|33,
	GML_EVENT_KEYPRESS_PAGEDOWN =   EVENT_KEYPRESS|34,
	GML_EVENT_KEYPRESS_END      =   EVENT_KEYPRESS|35,
	GML_EVENT_KEYPRESS_HOME     =   EVENT_KEYPRESS|36,
	GML_EVENT_KEYPRESS_LEFT     =   EVENT_KEYPRESS|37,
	GML_EVENT_KEYPRESS_UP       =   EVENT_KEYPRESS|38,
	GML_EVENT_KEYPRESS_RIGHT    =   EVENT_KEYPRESS|39,
	GML_EVENT_KEYPRESS_DOWN     =   EVENT_KEYPRESS|40,
	GML_EVENT_KEYPRESS_INSERT   =   EVENT_KEYPRESS|45,
	GML_EVENT_KEYPRESS_DELETE   =   EVENT_KEYPRESS|46,

	GML_EVENT_KEYPRESS_0        =   EVENT_KEYPRESS|48,
	GML_EVENT_KEYPRESS_1        =   EVENT_KEYPRESS|49,
	GML_EVENT_KEYPRESS_2        =   EVENT_KEYPRESS|50,
	GML_EVENT_KEYPRESS_3        =   EVENT_KEYPRESS|51,
	GML_EVENT_KEYPRESS_4        =   EVENT_KEYPRESS|52,
	GML_EVENT_KEYPRESS_5        =   EVENT_KEYPRESS|53,
	GML_EVENT_KEYPRESS_6        =   EVENT_KEYPRESS|54,
	GML_EVENT_KEYPRESS_7        =   EVENT_KEYPRESS|55,
	GML_EVENT_KEYPRESS_8        =   EVENT_KEYPRESS|56,
	GML_EVENT_KEYPRESS_9        =   EVENT_KEYPRESS|57,
	GML_EVENT_KEYPRESS_A        =   EVENT_KEYPRESS|65,
	GML_EVENT_KEYPRESS_B        =   EVENT_KEYPRESS|66,
	GML_EVENT_KEYPRESS_C        =   EVENT_KEYPRESS|67,
	GML_EVENT_KEYPRESS_D        =   EVENT_KEYPRESS|68,
	GML_EVENT_KEYPRESS_E        =   EVENT_KEYPRESS|69,
	GML_EVENT_KEYPRESS_F        =   EVENT_KEYPRESS|70,
	GML_EVENT_KEYPRESS_G        =   EVENT_KEYPRESS|71,
	GML_EVENT_KEYPRESS_H        =   EVENT_KEYPRESS|72,
	GML_EVENT_KEYPRESS_I        =   EVENT_KEYPRESS|73,
	GML_EVENT_KEYPRESS_J        =   EVENT_KEYPRESS|74,
	GML_EVENT_KEYPRESS_K        =   EVENT_KEYPRESS|75,
	GML_EVENT_KEYPRESS_L        =   EVENT_KEYPRESS|76,
	GML_EVENT_KEYPRESS_M        =   EVENT_KEYPRESS|77,
	GML_EVENT_KEYPRESS_N        =   EVENT_KEYPRESS|78,
	GML_EVENT_KEYPRESS_O        =   EVENT_KEYPRESS|79,
	GML_EVENT_KEYPRESS_P        =   EVENT_KEYPRESS|80,
	GML_EVENT_KEYPRESS_Q        =   EVENT_KEYPRESS|81,
	GML_EVENT_KEYPRESS_R        =   EVENT_KEYPRESS|82,
	GML_EVENT_KEYPRESS_S        =   EVENT_KEYPRESS|83,
	GML_EVENT_KEYPRESS_T        =   EVENT_KEYPRESS|84,
	GML_EVENT_KEYPRESS_U        =   EVENT_KEYPRESS|85,
	GML_EVENT_KEYPRESS_V        =   EVENT_KEYPRESS|86,
	GML_EVENT_KEYPRESS_W        =   EVENT_KEYPRESS|87,
	GML_EVENT_KEYPRESS_X        =   EVENT_KEYPRESS|88,
	GML_EVENT_KEYPRESS_Y        =   EVENT_KEYPRESS|89,
	GML_EVENT_KEYPRESS_Z        =   EVENT_KEYPRESS|90,
	GML_EVENT_KEYPRESS_F1       =   EVENT_KEYPRESS|112,
	GML_EVENT_KEYPRESS_F2       =   EVENT_KEYPRESS|113,
	GML_EVENT_KEYPRESS_F3       =   EVENT_KEYPRESS|114,
	GML_EVENT_KEYPRESS_F4       =   EVENT_KEYPRESS|115,
	GML_EVENT_KEYPRESS_F5       =   EVENT_KEYPRESS|116,
	GML_EVENT_KEYPRESS_F6       =   EVENT_KEYPRESS|117,
	GML_EVENT_KEYPRESS_F7       =   EVENT_KEYPRESS|118,
	GML_EVENT_KEYPRESS_F8       =   EVENT_KEYPRESS|119,
	GML_EVENT_KEYPRESS_F9       =   EVENT_KEYPRESS|120,
	GML_EVENT_KEYPRESS_F10      =   EVENT_KEYPRESS|121,
	GML_EVENT_KEYPRESS_F11      =   EVENT_KEYPRESS|122,
	GML_EVENT_KEYPRESS_F12      =   EVENT_KEYPRESS|123,

	// unsupported via GameMaker
	GML_EVENT_KEYPRESS_SCROLL_LOCK  =   EVENT_KEYPRESS|145,
	GML_EVENT_KEYPRESS_SEMICOLON    =   EVENT_KEYPRESS|186,
	GML_EVENT_KEYPRESS_PLUS         =   EVENT_KEYPRESS|187,
	GML_EVENT_KEYPRESS_COMMA        =   EVENT_KEYPRESS|188,
	GML_EVENT_KEYPRESS_MINUS        =   EVENT_KEYPRESS|189,
	GML_EVENT_KEYPRESS_FULLSTOP     =   EVENT_KEYPRESS|190,
	GML_EVENT_KEYPRESS_FWSLASH      =   EVENT_KEYPRESS|191,
	GML_EVENT_KEYPRESS_AT           =   EVENT_KEYPRESS|192,
	GML_EVENT_KEYPRESS_RIGHTSQBR    =   EVENT_KEYPRESS|219,
	GML_EVENT_KEYPRESS_BKSLASH      =   EVENT_KEYPRESS|220,
	GML_EVENT_KEYPRESS_LEFTSQBR     =   EVENT_KEYPRESS|221,
	GML_EVENT_KEYPRESS_HASH         =   EVENT_KEYPRESS|222,
	GML_EVENT_KEYPRESS_TILD         =   EVENT_KEYPRESS|223,

// NUMPAD
	GML_EVENT_KEYPRESS_NUM_LOCK = EVENT_KEYPRESS | 144,
	GML_EVENT_KEYPRESS_NUM_0 = EVENT_KEYPRESS | 96,
	GML_EVENT_KEYPRESS_NUM_1 = EVENT_KEYPRESS | 97,
	GML_EVENT_KEYPRESS_NUM_2 = EVENT_KEYPRESS | 98,
	GML_EVENT_KEYPRESS_NUM_3 = EVENT_KEYPRESS | 99,
	GML_EVENT_KEYPRESS_NUM_4 = EVENT_KEYPRESS | 100,
	GML_EVENT_KEYPRESS_NUM_5 = EVENT_KEYPRESS | 101,
	GML_EVENT_KEYPRESS_NUM_6 = EVENT_KEYPRESS | 102,
	GML_EVENT_KEYPRESS_NUM_7 = EVENT_KEYPRESS | 103,
	GML_EVENT_KEYPRESS_NUM_8 = EVENT_KEYPRESS | 104,
	GML_EVENT_KEYPRESS_NUM_9 = EVENT_KEYPRESS | 105,
	GML_EVENT_KEYPRESS_NUM_STAR = EVENT_KEYPRESS | 106,
	GML_EVENT_KEYPRESS_NUM_PLUS = EVENT_KEYPRESS | 107,
	GML_EVENT_KEYPRESS_NUM_MINUS = EVENT_KEYPRESS | 109,
	GML_EVENT_KEYPRESS_NUM_DOT = EVENT_KEYPRESS | 110,
	GML_EVENT_KEYPRESS_NUM_DIV = EVENT_KEYPRESS | 111,


	// KeyDOWN events...
	GML_EVENT_KEYBOARD_NOKEY = EVENT_KEYBOARD | 0,
	GML_EVENT_KEYBOARD_ANYKEY = EVENT_KEYBOARD | 1,
	GML_EVENT_KEYBOARD_BACKSPACE = EVENT_KEYBOARD | 8,
	GML_EVENT_KEYBOARD_TAB = EVENT_KEYBOARD | 9,
	GML_EVENT_KEYBOARD_ENTER = EVENT_KEYBOARD | 13,
	GML_EVENT_KEYBOARD_SHIFT = EVENT_KEYBOARD | 16,
	GML_EVENT_KEYBOARD_CTRL = EVENT_KEYBOARD | 17,
	GML_EVENT_KEYBOARD_ALT = EVENT_KEYBOARD | 18,
	GML_EVENT_KEYBOARD_PAUSE = EVENT_KEYBOARD | 19,
	GML_EVENT_KEYBOARD_ESCAPE = EVENT_KEYBOARD | 27,
	GML_EVENT_KEYBOARD_SPACE = EVENT_KEYBOARD | 32,

	GML_EVENT_KEYBOARD_PAGEUP = EVENT_KEYBOARD | 33,
	GML_EVENT_KEYBOARD_PAGEDOWN = EVENT_KEYBOARD | 34,
	GML_EVENT_KEYBOARD_END = EVENT_KEYBOARD | 35,
	GML_EVENT_KEYBOARD_HOME = EVENT_KEYBOARD | 36,
	GML_EVENT_KEYBOARD_LEFT = EVENT_KEYBOARD | 37,
	GML_EVENT_KEYBOARD_UP = EVENT_KEYBOARD | 38,
	GML_EVENT_KEYBOARD_RIGHT = EVENT_KEYBOARD | 39,
	GML_EVENT_KEYBOARD_DOWN = EVENT_KEYBOARD | 40,
	GML_EVENT_KEYBOARD_INSERT = EVENT_KEYBOARD | 45,
	GML_EVENT_KEYBOARD_DELETE = EVENT_KEYBOARD | 46,

	GML_EVENT_KEYBOARD_0 = EVENT_KEYBOARD | 48,
	GML_EVENT_KEYBOARD_1 = EVENT_KEYBOARD | 49,
	GML_EVENT_KEYBOARD_2 = EVENT_KEYBOARD | 50,
	GML_EVENT_KEYBOARD_3 = EVENT_KEYBOARD | 51,
	GML_EVENT_KEYBOARD_4 = EVENT_KEYBOARD | 52,
	GML_EVENT_KEYBOARD_5 = EVENT_KEYBOARD | 53,
	GML_EVENT_KEYBOARD_6 = EVENT_KEYBOARD | 54,
	GML_EVENT_KEYBOARD_7 = EVENT_KEYBOARD | 55,
	GML_EVENT_KEYBOARD_8 = EVENT_KEYBOARD | 56,
	GML_EVENT_KEYBOARD_9 = EVENT_KEYBOARD | 57,
	GML_EVENT_KEYBOARD_A = EVENT_KEYBOARD | 65,
	GML_EVENT_KEYBOARD_B = EVENT_KEYBOARD | 66,
	GML_EVENT_KEYBOARD_C = EVENT_KEYBOARD | 67,
	GML_EVENT_KEYBOARD_D = EVENT_KEYBOARD | 68,
	GML_EVENT_KEYBOARD_E = EVENT_KEYBOARD | 69,
	GML_EVENT_KEYBOARD_F = EVENT_KEYBOARD | 70,
	GML_EVENT_KEYBOARD_G = EVENT_KEYBOARD | 71,
	GML_EVENT_KEYBOARD_H = EVENT_KEYBOARD | 72,
	GML_EVENT_KEYBOARD_I = EVENT_KEYBOARD | 73,
	GML_EVENT_KEYBOARD_J = EVENT_KEYBOARD | 74,
	GML_EVENT_KEYBOARD_K = EVENT_KEYBOARD | 75,
	GML_EVENT_KEYBOARD_L = EVENT_KEYBOARD | 76,
	GML_EVENT_KEYBOARD_M = EVENT_KEYBOARD | 77,
	GML_EVENT_KEYBOARD_N = EVENT_KEYBOARD | 78,
	GML_EVENT_KEYBOARD_O = EVENT_KEYBOARD | 79,
	GML_EVENT_KEYBOARD_P = EVENT_KEYBOARD | 80,
	GML_EVENT_KEYBOARD_Q = EVENT_KEYBOARD | 81,
	GML_EVENT_KEYBOARD_R = EVENT_KEYBOARD | 82,
	GML_EVENT_KEYBOARD_S = EVENT_KEYBOARD | 83,
	GML_EVENT_KEYBOARD_T = EVENT_KEYBOARD | 84,
	GML_EVENT_KEYBOARD_U = EVENT_KEYBOARD | 85,
	GML_EVENT_KEYBOARD_V = EVENT_KEYBOARD | 86,
	GML_EVENT_KEYBOARD_W = EVENT_KEYBOARD | 87,
	GML_EVENT_KEYBOARD_X = EVENT_KEYBOARD | 88,
	GML_EVENT_KEYBOARD_Y = EVENT_KEYBOARD | 89,
	GML_EVENT_KEYBOARD_Z = EVENT_KEYBOARD | 90,
	GML_EVENT_KEYBOARD_F1 = EVENT_KEYBOARD | 112,
	GML_EVENT_KEYBOARD_F2 = EVENT_KEYBOARD | 113,
	GML_EVENT_KEYBOARD_F3 = EVENT_KEYBOARD | 114,
	GML_EVENT_KEYBOARD_F4 = EVENT_KEYBOARD | 115,
	GML_EVENT_KEYBOARD_F5 = EVENT_KEYBOARD | 116,
	GML_EVENT_KEYBOARD_F6 = EVENT_KEYBOARD | 117,
	GML_EVENT_KEYBOARD_F7 = EVENT_KEYBOARD | 118,
	GML_EVENT_KEYBOARD_F8 = EVENT_KEYBOARD | 119,
	GML_EVENT_KEYBOARD_F9 = EVENT_KEYBOARD | 120,
	GML_EVENT_KEYBOARD_F10 = EVENT_KEYBOARD | 121,
	GML_EVENT_KEYBOARD_F11 = EVENT_KEYBOARD | 122,
	GML_EVENT_KEYBOARD_F12 = EVENT_KEYBOARD | 123,

	// unsupported via GameMaker
	GML_EVENT_KEYBOARD_SCROLL_LOCK = EVENT_KEYBOARD | 145,
	GML_EVENT_KEYBOARD_SEMICOLON = EVENT_KEYBOARD | 186,
	GML_EVENT_KEYBOARD_PLUS = EVENT_KEYBOARD | 187,
	GML_EVENT_KEYBOARD_COMMA = EVENT_KEYBOARD | 188,
	GML_EVENT_KEYBOARD_MINUS = EVENT_KEYBOARD | 189,
	GML_EVENT_KEYBOARD_FULLSTOP = EVENT_KEYBOARD | 190,
	GML_EVENT_KEYBOARD_FWSLASH = EVENT_KEYBOARD | 191,
	GML_EVENT_KEYBOARD_AT = EVENT_KEYBOARD | 192,
	GML_EVENT_KEYBOARD_RIGHTSQBR = EVENT_KEYBOARD | 219,
	GML_EVENT_KEYBOARD_BKSLASH = EVENT_KEYBOARD | 220,
	GML_EVENT_KEYBOARD_LEFTSQBR = EVENT_KEYBOARD | 221,
	GML_EVENT_KEYBOARD_HASH = EVENT_KEYBOARD | 222,
	GML_EVENT_KEYBOARD_TILD = EVENT_KEYBOARD | 223,

	// NUMPAD
	GML_EVENT_KEYBOARD_NUM_LOCK = EVENT_KEYBOARD | 144,
	GML_EVENT_KEYBOARD_NUM_0 = EVENT_KEYBOARD | 96,
	GML_EVENT_KEYBOARD_NUM_1 = EVENT_KEYBOARD | 97,
	GML_EVENT_KEYBOARD_NUM_2 = EVENT_KEYBOARD | 98,
	GML_EVENT_KEYBOARD_NUM_3 = EVENT_KEYBOARD | 99,
	GML_EVENT_KEYBOARD_NUM_4 = EVENT_KEYBOARD | 100,
	GML_EVENT_KEYBOARD_NUM_5 = EVENT_KEYBOARD | 101,
	GML_EVENT_KEYBOARD_NUM_6 = EVENT_KEYBOARD | 102,
	GML_EVENT_KEYBOARD_NUM_7 = EVENT_KEYBOARD | 103,
	GML_EVENT_KEYBOARD_NUM_8 = EVENT_KEYBOARD | 104,
	GML_EVENT_KEYBOARD_NUM_9 = EVENT_KEYBOARD | 105,
	GML_EVENT_KEYBOARD_NUM_STAR = EVENT_KEYBOARD | 106,
	GML_EVENT_KEYBOARD_NUM_PLUS = EVENT_KEYBOARD | 107,
	GML_EVENT_KEYBOARD_NUM_MINUS = EVENT_KEYBOARD | 109,
	GML_EVENT_KEYBOARD_NUM_DOT = EVENT_KEYBOARD | 110,
	GML_EVENT_KEYBOARD_NUM_DIV = EVENT_KEYBOARD | 111,


	// Key Released 
	GML_EVENT_KEYRELEASE_NOKEY = EVENT_KEYRELEASE | 0,
	GML_EVENT_KEYRELEASE_ANY = EVENT_KEYRELEASE | 1,
	GML_EVENT_KEYRELEASE_BACKSPACE = EVENT_KEYRELEASE | 8,
	GML_EVENT_KEYRELEASE_TAB = EVENT_KEYRELEASE | 9,
	GML_EVENT_KEYRELEASE_ENTER = EVENT_KEYRELEASE | 13,
	GML_EVENT_KEYRELEASE_SHIFT = EVENT_KEYRELEASE | 16,
	GML_EVENT_KEYRELEASE_CTRL = EVENT_KEYRELEASE | 17,
	GML_EVENT_KEYRELEASE_ALT = EVENT_KEYRELEASE | 18,
	GML_EVENT_KEYRELEASE_PAUSE = EVENT_KEYRELEASE | 19,
	GML_EVENT_KEYRELEASE_ESCAPE = EVENT_KEYRELEASE | 27,
	GML_EVENT_KEYRELEASE_SPACE = EVENT_KEYRELEASE | 32,

	GML_EVENT_KEYRELEASE_PAGEUP = EVENT_KEYRELEASE | 33,
	GML_EVENT_KEYRELEASE_PAGEDOWN = EVENT_KEYRELEASE | 34,
	GML_EVENT_KEYRELEASE_END = EVENT_KEYRELEASE | 35,
	GML_EVENT_KEYRELEASE_HOME = EVENT_KEYRELEASE | 36,
	GML_EVENT_KEYRELEASE_LEFT = EVENT_KEYRELEASE | 37,
	GML_EVENT_KEYRELEASE_UP = EVENT_KEYRELEASE | 38,
	GML_EVENT_KEYRELEASE_RIGHT = EVENT_KEYRELEASE | 39,
	GML_EVENT_KEYRELEASE_DOWN = EVENT_KEYRELEASE | 40,
	GML_EVENT_KEYRELEASE_INSERT = EVENT_KEYRELEASE | 45,
	GML_EVENT_KEYRELEASE_DELETE = EVENT_KEYRELEASE | 46,

	GML_EVENT_KEYRELEASE_0 = EVENT_KEYRELEASE | 48,
	GML_EVENT_KEYRELEASE_1 = EVENT_KEYRELEASE | 49,
	GML_EVENT_KEYRELEASE_2 = EVENT_KEYRELEASE | 50,
	GML_EVENT_KEYRELEASE_3 = EVENT_KEYRELEASE | 51,
	GML_EVENT_KEYRELEASE_4 = EVENT_KEYRELEASE | 52,
	GML_EVENT_KEYRELEASE_5 = EVENT_KEYRELEASE | 53,
	GML_EVENT_KEYRELEASE_6 = EVENT_KEYRELEASE | 54,
	GML_EVENT_KEYRELEASE_7 = EVENT_KEYRELEASE | 55,
	GML_EVENT_KEYRELEASE_8 = EVENT_KEYRELEASE | 56,
	GML_EVENT_KEYRELEASE_9 = EVENT_KEYRELEASE | 57,
	GML_EVENT_KEYRELEASE_A = EVENT_KEYRELEASE | 65,
	GML_EVENT_KEYRELEASE_B = EVENT_KEYRELEASE | 66,
	GML_EVENT_KEYRELEASE_C = EVENT_KEYRELEASE | 67,
	GML_EVENT_KEYRELEASE_D = EVENT_KEYRELEASE | 68,
	GML_EVENT_KEYRELEASE_E = EVENT_KEYRELEASE | 69,
	GML_EVENT_KEYRELEASE_F = EVENT_KEYRELEASE | 70,
	GML_EVENT_KEYRELEASE_G = EVENT_KEYRELEASE | 71,
	GML_EVENT_KEYRELEASE_H = EVENT_KEYRELEASE | 72,
	GML_EVENT_KEYRELEASE_I = EVENT_KEYRELEASE | 73,
	GML_EVENT_KEYRELEASE_J = EVENT_KEYRELEASE | 74,
	GML_EVENT_KEYRELEASE_K = EVENT_KEYRELEASE | 75,
	GML_EVENT_KEYRELEASE_L = EVENT_KEYRELEASE | 76,
	GML_EVENT_KEYRELEASE_M = EVENT_KEYRELEASE | 77,
	GML_EVENT_KEYRELEASE_N = EVENT_KEYRELEASE | 78,
	GML_EVENT_KEYRELEASE_O = EVENT_KEYRELEASE | 79,
	GML_EVENT_KEYRELEASE_P = EVENT_KEYRELEASE | 80,
	GML_EVENT_KEYRELEASE_Q = EVENT_KEYRELEASE | 81,
	GML_EVENT_KEYRELEASE_R = EVENT_KEYRELEASE | 82,
	GML_EVENT_KEYRELEASE_S = EVENT_KEYRELEASE | 83,
	GML_EVENT_KEYRELEASE_T = EVENT_KEYRELEASE | 84,
	GML_EVENT_KEYRELEASE_U = EVENT_KEYRELEASE | 85,
	GML_EVENT_KEYRELEASE_V = EVENT_KEYRELEASE | 86,
	GML_EVENT_KEYRELEASE_W = EVENT_KEYRELEASE | 87,
	GML_EVENT_KEYRELEASE_X = EVENT_KEYRELEASE | 88,
	GML_EVENT_KEYRELEASE_Y = EVENT_KEYRELEASE | 89,
	GML_EVENT_KEYRELEASE_Z = EVENT_KEYRELEASE | 90,
	GML_EVENT_KEYRELEASE_F1 = EVENT_KEYRELEASE | 112,
	GML_EVENT_KEYRELEASE_F2 = EVENT_KEYRELEASE | 113,
	GML_EVENT_KEYRELEASE_F3 = EVENT_KEYRELEASE | 114,
	GML_EVENT_KEYRELEASE_F4 = EVENT_KEYRELEASE | 115,
	GML_EVENT_KEYRELEASE_F5 = EVENT_KEYRELEASE | 116,
	GML_EVENT_KEYRELEASE_F6 = EVENT_KEYRELEASE | 117,
	GML_EVENT_KEYRELEASE_F7 = EVENT_KEYRELEASE | 118,
	GML_EVENT_KEYRELEASE_F8 = EVENT_KEYRELEASE | 119,
	GML_EVENT_KEYRELEASE_F9 = EVENT_KEYRELEASE | 120,
	GML_EVENT_KEYRELEASE_F10 = EVENT_KEYRELEASE | 121,
	GML_EVENT_KEYRELEASE_F11 = EVENT_KEYRELEASE | 122,
	GML_EVENT_KEYRELEASE_F12 = EVENT_KEYRELEASE | 123,

	// unsupported via GameMaker
	GML_EVENT_KEYRELEASE_SCROLL_LOCK = EVENT_KEYRELEASE | 145,
	GML_EVENT_KEYRELEASE_SEMICOLON = EVENT_KEYRELEASE | 186,
	GML_EVENT_KEYRELEASE_PLUS = EVENT_KEYRELEASE | 187,
	GML_EVENT_KEYRELEASE_COMMA = EVENT_KEYRELEASE | 188,
	GML_EVENT_KEYRELEASE_MINUS = EVENT_KEYRELEASE | 189,
	GML_EVENT_KEYRELEASE_FULLSTOP = EVENT_KEYRELEASE | 190,
	GML_EVENT_KEYRELEASE_FWSLASH = EVENT_KEYRELEASE | 191,
	GML_EVENT_KEYRELEASE_AT = EVENT_KEYRELEASE | 192,
	GML_EVENT_KEYRELEASE_RIGHTSQBR = EVENT_KEYRELEASE | 219,
	GML_EVENT_KEYRELEASE_BKSLASH = EVENT_KEYRELEASE | 220,
	GML_EVENT_KEYRELEASE_LEFTSQBR = EVENT_KEYRELEASE | 221,
	GML_EVENT_KEYRELEASE_HASH = EVENT_KEYRELEASE | 222,
	GML_EVENT_KEYRELEASE_TILD = EVENT_KEYRELEASE | 223,

	// NUMPAD
	GML_EVENT_KEYRELEASE_NUM_LOCK = EVENT_KEYRELEASE | 144,
	GML_EVENT_KEYRELEASE_NUM_0 = EVENT_KEYRELEASE | 96,
	GML_EVENT_KEYRELEASE_NUM_1 = EVENT_KEYRELEASE | 97,
	GML_EVENT_KEYRELEASE_NUM_2 = EVENT_KEYRELEASE | 98,
	GML_EVENT_KEYRELEASE_NUM_3 = EVENT_KEYRELEASE | 99,
	GML_EVENT_KEYRELEASE_NUM_4 = EVENT_KEYRELEASE | 100,
	GML_EVENT_KEYRELEASE_NUM_5 = EVENT_KEYRELEASE | 101,
	GML_EVENT_KEYRELEASE_NUM_6 = EVENT_KEYRELEASE | 102,
	GML_EVENT_KEYRELEASE_NUM_7 = EVENT_KEYRELEASE | 103,
	GML_EVENT_KEYRELEASE_NUM_8 = EVENT_KEYRELEASE | 104,
	GML_EVENT_KEYRELEASE_NUM_9 = EVENT_KEYRELEASE | 105,
	GML_EVENT_KEYRELEASE_NUM_STAR = EVENT_KEYRELEASE | 106,
	GML_EVENT_KEYRELEASE_NUM_PLUS = EVENT_KEYRELEASE | 107,
	GML_EVENT_KEYRELEASE_NUM_MINUS = EVENT_KEYRELEASE | 109,
	GML_EVENT_KEYRELEASE_NUM_DOT = EVENT_KEYRELEASE | 110,
	GML_EVENT_KEYRELEASE_NUM_DIV = EVENT_KEYRELEASE | 111;


// **********************************************************************************************
// Instance
// **********************************************************************************************
var MAXTIMER = 12;


// **********************************************************************************************
// Backgrounds
// **********************************************************************************************
var MAX_BACKGROUNDS = 8,
	MAX_VIEWS = 8,
	MAX_SOUNDS = 1,         // number of "duplicate" sounds to load
	MAX_HIGHSCORE = 10;
	
// **********************************************************************************************	
// Color constants
// **********************************************************************************************	
var clBlack = 0x000000,
    clMaroon = 0x000080,
    clGreen = 0x008000,
    clOlive = 0x008080,
    clNavy = 0x800000,
    clPurple = 0x800080,
    clTeal = 0x808000,
    clGray = 0x808080,
    clSilver = 0xC0C0C0,
    clRed = 0x0000FF,
    clLime = 0x00FF00,
    clYellow = 0x00FFFF,
    clBlue = 0xFF0000,
    clFuchsia = 0xFF00FF,
    clAqua = 0xFFFF00,
    clLtGray = 0xC0C0C0,
    clDkGray = 0x808080,
    clWhite = 0xFFFFFF,
    clMoneyGreen = 0xC0DCC0,
    clSkyBlue = 0xF0CAA6,
    clCream = 0xF0FBFF,
    clMedGray = 0xA4A0A0;


//***************************************************************************************************************************
//***************************************************************************************************************************
//
//                                      actual global variables....
//
//***************************************************************************************************************************
//***************************************************************************************************************************
// Our controllers.  Assign 
var global =							// Assign this block to NULL
	g_pObjectManager=
	g_pInstanceManager=
	g_pIOManager = 
	g_pRoomManager = 
	g_pBuiltIn = 
	g_pGMFile =
	g_pGraphics =
	g_pSoundManager =
	g_pBackgroundManager =
	g_pCollisionList = 
	g_pPathManager =
	g_pTimelineManager =
	g_pASyncManager = 
	g_RunRoom = 
	g_DefaultView = 
	g_DefaultViewArray =
	g_CurrentView =
	g_ParticleTextures =
	g_ParticleTypes =
	g_ParticleSystems =
	g_ActiveGrids =
	g_ActivePriorityQueues =
    g_ListCollection =
	g_StackCollection = 
	g_ActiveMaps = 
	g_ActiveQueues =
    g_Surfaces =
	g_pTempTPE =
	g_VirtualKeyDrawList = 
	g_HighScoreValues =
	g_HighScoreNames =
	g_HiscoreCaption =
	g_HighscoreNobody =
	g_HighscoreEscape =
	g_HiscoreFont =
	g_HiscoreFontStyle =
	g_Arguments =
	g_ArgumentIndex =
	g_ArgumentValue =
	g_RootDir =
	g_TextFiles = 
	Current_View = null,

	// assign to true
    g_HiscoreFontBorder = 
	Draw_Automatic = true,             // Whether to automatically draw the room each step

	// assign to false
	g_SupportsLocalStorage,
	Run_Paused =
	g_FullScreen =
	g_canPlayMp3 =
	g_canPlayOgg =
	g_ToggleFullscreen = false,

	//Assign a global to ZERO!
	g_RoomID = 
	New_Room =
	Score = 
	Lives = 
	Transition_Kind = 
	persnumb = 
	DISPLAY_WIDTH =
	DISPLAY_HEIGHT =
	canvasMinX =
	canvasMaxX =
	canvasMinY = 
	canvasMaxY =
	g_Precsision = 
	g_room_maxid =
	g_GlobalVolume=
	g_GlobalAlpha = 
	g_GlobalColour = 
	g_GlobalColour_HTML_RGB =
	g_GlobalColour_HTML_RGBA =
	g_OriginalWidth = 
	g_OriginalHeight =
	g_LastWidth =
	g_LastHeight = 
	g_DynamicTileID =
	g_HiscoreBackgroundColour =
	g_HiscoreNewColour =
	g_HiscoreOtherColour =
	g_HiscoreFontSize =
	g_HiscoreBackground =

	g_LastEvent =
	g_LastSubEvent =
	g_ArgumentCount =
	g_ActualTextWidth =
	g_ActualTextHeight =

    g_CurrentCursor = 
    cr_default =      
    cr_none =         
    cr_arrow =        
    cr_cross =        
    cr_beam =         
    cr_size_nesw =    
    cr_size_ns =      
    cr_size_nwse =    
    cr_size_we =      
    cr_uparrow =      
    cr_hourglass =    
    cr_drag =         
    cr_nodrop =       
    cr_hsplit =       
    cr_vsplit =       
    cr_multidrag =    
    cr_sqlwait =      
    cr_no =              
    cr_appstart =     
    cr_help =         
    cr_handpoint =    
    cr_size_all =     	
	
	c_black = 
	c_white = 
	c_red = 
	c_green =
	c_blue = 
	c_blackA =
	c_whiteA =
	c_redA = 
	c_greenA = 
	c_blueA = 0;

var g_CanvasName = 'canvas';



// #############################################################################################
/// Function:<summary>
///             Initialise the games globals
///          </summary>
// #############################################################################################
function    InitAboyneGlobals()
{
	debug("InitAboyneGlobals");
    // DetectBrowser();

		// TODO: Implement audio
    // var pAudioTest = new Audio();
    // pAudioTest.controls = false;
    // g_canPlayMp3 = !!pAudioTest.canPlayType && "" != pAudioTest.canPlayType('audio/mpeg');
    // g_canPlayOgg = !!pAudioTest.canPlayType && "" != pAudioTest.canPlayType('audio/ogg; codecs="vorbis"');
    // pAudioTest = null;

	g_canPlayMp3 = false;
	g_canPlayOgg = false;
	g_canPlayAdpcm = true;

    g_RoomID = 0;
    g_RunRoom = null;
	Run_Paused = false;
    New_Room = -1;
    Current_View = 0;

    g_DefaultView = new yyView();
    g_DefaultView.visible = true;
    g_DefaultViewArray = [];
    g_DefaultViewArray[0] = g_DefaultView;

    g_ParticleTextures = [];
    g_ParticleTypes = [];
    g_ParticleSystems = [];
    g_ActiveGrids = new yyAllocate(5);
    g_ActivePriorityQueues = new yyAllocate(5);
    g_ListCollection = new yyAllocate(5);
    g_StackCollection = new yyAllocate(5);
    g_ActiveMaps = new yyAllocate(5);
    g_Surfaces = new yyAllocate(5);
    g_ActiveQueues = new yyAllocate(5);
    g_pTempTPE = new yyTPageEntry();
    g_TextFiles = new yyAllocate(5);
    //g_pASyncManager = ;

    g_CanvasName = "canvas";
    g_RootDir = "html5game/";
    if( typeof(g_GameMakerHTML5Dir)!="undefined" ) {
    	g_RootDir = g_GameMakerHTML5Dir;
    }
    g_VirtualKeyDrawList = [];
	g_HighScoreValues = [];
	g_HighScoreNames = [];

	g_HiscoreCaption = "Hiscore Table";
	g_HighscoreNobody = "<Nobody>";
	g_HighscoreEscape ="Press <ESC> to Continue";
	g_HiscoreBackgroundColour = 0x000000;
	g_HiscoreBackground = -1;
	g_HiscoreNewColour = 0xffff00;
	g_HiscoreOtherColour = 0xffffff;
    g_HiscoreFont = "verdana";
    g_HiscoreFontSize = 16;
    g_HiscoreFontStyle = "";
    g_HiscoreFontBorder = true;
    
    highscore_clear();
    

    // This will allocate index 0. Surfaces need to be 1 and up (as they are used as negative sometimes).
    g_Surfaces.Alloc();

    g_Precsision = 0.0000001;
    
    Draw_Automatic = false;             // Whether to automatically draw the room each step

    g_LastEvent = -1;
    g_LastSubEvent = -1;

    g_GlobalVolume = 1.0;
    Score =0;
    Lives=-1;
    Transition_Kind=0;

    persnumb =0;
    starting = true;

    /*DISPLAY_WIDTH;
    DISPLAY_HEIGHT;
    canvasMinX;
    canvasMaxX;
    canvasMinY;
    canvasMaxY;*/
    g_DynamicTileID = 10000000;
    g_room_maxid = 100000;
    g_GlobalAlpha = 1.0;
    g_GlobalColour = 0x000000; // 0xffffff;
    g_GlobalColour_HTML_RGB = GetHTMLRGB(g_GlobalColour);
    g_GlobalColour_HTML_RGBA = GetHTMLRGBA(g_GlobalColour,g_GlobalAlpha);


    c_black = GetHTMLRGB(0x000000);
    c_white = GetHTMLRGB(0xffffff);
    c_red = GetHTMLRGB(0x0000ff);
    c_green = GetHTMLRGB(0x00ff00);
    c_blue = GetHTMLRGB(0xff0000);
    c_blackA = GetHTMLRGB(0xff000000);
    c_whiteA = GetHTMLRGB(0xffffffff);
    c_redA = GetHTMLRGB(0xff0000ff);
    c_greenA = GetHTMLRGB(0xff00ff00);
    c_blueA = GetHTMLRGB(0xffff0000);

    cr_default =        0;
    cr_none =           -1;
    cr_arrow =          -2;
    cr_cross =          -3;
    cr_beam =           -4;
    cr_size_nesw =      -6;
    cr_size_ns =        -7;
    cr_size_nwse =      -8;
    cr_size_we =        -9;
    cr_uparrow =        -10;
    cr_hourglass =      -11;
    cr_drag =           -12;
    cr_nodrop =         -13;
    cr_hsplit =         -14;
    cr_vsplit =         -15;
    cr_multidrag =      -16;
    cr_sqlwait =        -17;
    cr_no =             -18;
    cr_appstart =       -19;
    cr_help =           -20;
    cr_handpoint =      -21;
    cr_size_all =       -22;
    g_CurrentCursor =   -1;


    supports_html5_storage();

    global.m_Arrays = [];

}


// #############################################################################################
/// Function:<summary>
///				Very simple fMod.
///          </summary>
///
/// In:		 <param name="_x">value</param>
///			 <param name="_y">MOD to...</param>
/// Out:	 <returns>
///				Returns the remainder of dividing x by y as a float  
///			 </returns>
// #############################################################################################
function fmod(_x, _y) 
{
	if (_x == 0) return 0;
	var t = ((_x * 0x1000000) % (_y * 0x1000000));
	t = t / 0x1000000;
	return t;
}

// #############################################################################################
/// Function:<summary>
///             Simple "square" operation
///          </summary>
///
/// In:		 <param name="_x">value to square</param>
/// Out:	 <returns>
///				Squared value
///			 </returns>
// #############################################################################################
function    Sqr( _x )
{
    return _x*_x;
}

// #############################################################################################
/// Function:<summary>
///             Casts a number into a valid HTML "colour" type
///          </summary>
///
/// In:		 <param name="_col">Colour to use...</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    GetHTMLRGB(_col)
{
    var col="rgba("+(_col&0xff).toString()+","+((_col>>8)&0xff).toString()+","+((_col>>16)&0xff).toString()+","+((_col>>24)&0xff).toString()+")";
    return col;
}


// #############################################################################################
/// Function:<summary>
///             Casts a number into a valid HTML "colour" type
///          </summary>
///
/// In:     <param name="_col">Colour to use...</param>
///         <param name="_alpha">Alpha to use...</param>
/// Out:    <returns>
///             The colour
///         </returns>
// ###### #######################################################################################
function    GetHTMLRGBA(_col, _alpha)
{
	debug("GetHTMLRGBA Input ", _col, _alpha)
	// var col="rgba("+((_col>>16)&0xff).toString()+","+((_col>>8)&0xff).toString()+","+((_col>>0)&0xff).toString()+","+((_alpha*255.0)&0xff).toString()+")";
	var col="rgba("+((_col>>16)&0xff).toString()+","+((_col>>8)&0xff).toString()+","+((_col>>0)&0xff).toString()+","+((_alpha*255.0)&0xff).toString()+")";
    // return col;
		debug("GetHTMLRGBA Output", _col>>16 | _col>>8 | _col>>0 | _alpha * 255)
		return _col>>16 | _col>>8 | _col>>0 | _alpha * 255;
}


// #############################################################################################
/// Function:<summary>
///             Convert a degree into a radian
///          </summary>
///
/// In:		 <param name="_deg">value to conert into a radian</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    RAD( _deg ){ return Pi * _deg / 180.0;}

// #############################################################################################
/// Function:<summary>
///             Convert the GameMaker colour (BGR) into a normal one (RGB)
///          </summary>
///
/// In:		 <param name="_col"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ConvertGMColour( _col ){ return (((_col&0xff)<<16) | (_col&0xff00) | ((_col&0xff0000)>>16)); }

// #############################################################################################
/// Function:<summary>
///             Wait for a length of time.
///          </summary>
///
/// In:		 <param name="slp">Time in ms</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Timing_Wait( _slp )
{
	var StartTime = YoYo_GetTimer();

	// very simple delay loop - a proper sleep would be better.
	while(_slp>0)
	{
		var CurrTime= YoYo_GetTimer();
		_slp -= (CurrTime-StartTime);
		StartTime = CurrTime;
	}
}


// #############################################################################################
/// Function:<summary>
///          	Does the "default" instance/object/all search and uses an anonymouse function
///             to do the actual work when an instance is found.
///
///             Instance_SearchLoop(inst,obj,notme,  <arg>,<arg>,<arg>,<arg>,<arg>,  pFunction() );
///
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_obj"></param>
///			<param name="_notme"></param>
/// Out:	<returns>
///				Returns an object (true/false, Instance, ID etc.) to the caller...
///			</returns>
// #############################################################################################
function Instance_SearchLoop(_pInst, _obj, _notme,  _error_code )
{
    var a = Instance_SearchLoop.arguments;
    var argc = Instance_SearchLoop.arguments.length;
    var _pFunction = a[argc-1];

    
    _obj = Math.floor(_obj);
    if( _obj == OBJECT_ALL) 
    {
        var pool = g_pInstanceManager.GetPool();
        for (var inst = 0; inst < pool.length;inst++ )
        {
        	var pInst = pool[inst];
        	if ((_notme) && (pInst == _pInst)) continue;
        	if (pInst.Marked) continue;

        	var r = _pFunction(pInst);
        	if (r) return r;
        }
    }
    else if(_obj < 100000)
    {
        // Get the object we want to collide with
        var pObj = g_pObjectManager.Get(_obj);
        if (pObj === null)  {
            return _error_code;
    }
        
        // Now get all the objects instances, including inherited.
        var pool = pObj.GetRPool();
        for (var inst = 0; inst < pool.length;inst++ )
        {
        	var pInst = pool[inst];

        	if ((_notme) && (_pInst == pInst)) continue;
        	if (pInst.Marked) continue;

        	// If we HIT this instance, then return it.          
        	var r = _pFunction(pInst);
        	if (r) return r;
        }
    }
    else
    {
        var pInst = g_pInstanceManager.IDLookup(_obj);
        if ((_notme) && (_pInst == pInst)) {
            return _error_code; // OBJECT_NOONE;
        }
        if (pInst.Marked) {
            return _error_code;
       }

        return _pFunction( pInst );
    }
	return _error_code;
}




// #############################################################################################
/// Property: <summary>
///              Nice little browser detection function
///           </summary>
// #############################################################################################
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.os_version = this.GetOSVersion();
	},
	GetOSVersion: function () {
		if (navigator.appVersion.indexOf("CPU OS 5_") != -1)
		{
			return 5.0;
		} else if (navigator.appVersion.indexOf("CPU OS 4_") != -1)
		{
			return 4.0;
		} else if (navigator.appVersion.indexOf("CPU OS 3_") != -1)
		{
			return 3.0;
		} else if (navigator.appVersion.indexOf("Android 3") != -1)
		{
			return 3.0;
		} else if (navigator.appVersion.indexOf("Android 2") != -1)
		{
			return 2.0;
		} else
		{
			return BROWSER_OS_VERSION;
		}
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++)
		{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString)
			{
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS: [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		},
		{
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
		},
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};


// #############################################################################################
/// Function:<summary>
///             Try and detect which browser we're running on, then set BROWSER_TYPE
///
///	            BROWSER_UNKNOWN = 0,
///	            BROWSER_IE = 1,
///	            BROWSER_FIREFOX = 2,
///	            BROWSER_CHROME = 3,
///	            BROWSER_SAFARI = 4,
///	            BROWSER_OPERA = 5,
///          </summary>
///
/// Out:	 <returns>
///				BROWSER_TYPE is set
///			 </returns>
// #############################################################################################
function DetectBrowser()
{
    BrowserDetect.init();

    //
    // get the OS we're running on.
	//
    if( BrowserDetect.OS=="Windows" ){
    	g_OSPlatform = BROWSER_WIN32;
	}else if( BrowserDetect.OS=="Mac" ){
    	g_OSPlatform = BROWSER_MACOSX;
	}else if( BrowserDetect.OS=="iPhone" ){
    	g_OSPlatform = BROWSER_IOS;
	}else if( BrowserDetect.OS=="iPad" ){
    	g_OSPlatform = BROWSER_IOS;
	}else if( BrowserDetect.OS=="Android" ){
    	g_OSPlatform = BROWSER_ANDROID;
    } else if (BrowserDetect.OS == "Linux"){
    	g_OSPlatform = BROWSER_LINUX;
	} else
	{
		g_OSPlatform = BROWSER_UNKNOWN;
    }


	// Get the OS Version (should change later to a ds_map)
	g_OSVersion = BrowserDetect.os_version;

	//
	// Now work out the Browser and browser platform (iPhone, iPad etc.)
	//
	g_OSBrowser = BROWSER_UNKNOWN;
	g_DeviceType = BROWSER_TYPE_UNKNOWN; 
	if (BrowserDetect.browser == "Explorer")
	{
		debug("Internet Explorer detected");
		g_OSBrowser = BROWSER_IE;
	} else if (BrowserDetect.browser == "Firefox")
	{
		debug("Firefox detected");
		g_OSBrowser = BROWSER_FIREFOX;
	} else if (BrowserDetect.browser == "Chrome")
	{
		debug("Chrome detected");
		g_OSBrowser = BROWSER_CHROME;
	} else if (BrowserDetect.browser == "Safari")
	{
		if (g_OSBrowser == BROWSER_IOS)
		{
			debug("Safari mobile detected");
			g_OSBrowser = BROWSER_SAFARI_MOBILE;
			g_DeviceType = BROWSER_IPHONE;
			if (BrowserDetect.OS == "iPad") g_DeviceType = BROWSER_IPAD;
		} else
		{
			debug("Safari detected");
			g_OSBrowser = BROWSER_SAFARI;
		}
	} else if (BrowserDetect.browser == "Opera")
	{
		debug("Opera detected");
		g_OSBrowser = BROWSER_OPERA;
	} else
	{
		debug("Unknown Browser - Please report these strings");
		debug("----------------------------------------------");
		if (navigator.userAgent) debug("userAgent: " + navigator.userAgent);
		if( navigator.vendor ) debug("vendor: "+navigator.vendor);
		debug("----------------------------------------------");
	}
 
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
function supports_html5_storage() 
{
	g_SupportsLocalStorage = false;
	return;
	try
	{
		if ('localStorage' in window && window['localStorage'] !== null)
		{
			g_SupportsLocalStorage = true;
		}
	} catch (e)
	{
			g_SupportsLocalStorage = false;
	}
	return g_SupportsLocalStorage;
}


