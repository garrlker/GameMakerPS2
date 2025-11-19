
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yyBuiltIn.js
// Created:         19/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Deals with all built in variables
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 19/02/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************

// #############################################################################################
/// Function:<summary>
///             Create a set of built in variables
///          </summary>
// #############################################################################################
function    yyBuiltIn()
{
    // global variables
    this.room = 0;
    this.room_first = 0;
    this.room_last = 0;
    this.transition_kind = 0;
    this.transition_steps = 0;
    this.score = 0;
    this.lives = 0;
    this.health = 0;
    this.game_id = 0;
    this.working_directory = "/";
    this.temp_directory = "/";
    this.program_directory = "/";
    this.instance_count = 0;
    this.instance_id = 0;

    // room parameters
    this.room_width = 0;
    this.room_height = 0;
    this.room_caption = "room";
    this.room_speed = 30;
    this.room_persistent = false;
    
    this.background_color = 0x00000000;
    this.background_showcolor = false;
    this.background_visible = false;
    this.background_foreground = false;
    this.background_index = 0;
    this.background_x = 0;
    this.background_y = 0;
    this.background_width = 0;
    this.background_height = 0;
    this.background_htiled = 0;
    this.background_vtiled = 0;
    this.background_xscale = 1.0;
    this.background_yscale = 1.0;
    this.background_hspeed = 0;
    this.background_vspeed = 0;
    this.background_blend = 0;
    this.background_alpha = 1.0;

    this.view_enabled = false;
    this.view_current = 0;
    this.view_visible = 0;
    this.view_xview = 0;
    this.view_yview = 0;
    this.view_wview = 0;
    this.view_hview = 0;
    this.view_xport = 0;
    this.view_yport = 0;
    this.view_wport = 0;
    this.view_hport = 0;
    this.view_angle = 0;
    this.view_hborder = 0;
    this.view_vborder = 0;
    this.view_hspeed = 0;
    this.view_vspeed = 0;
    this.view_object = 0;

    // interaction values
    this.mouse_x = 0;
    this.mouse_y = 0;
    this.mouse_button = 0;
    this.mouse_lastbutton = 0;
    this.keyboard_key = 0;
    this.keyboard_lastkey = 0;
    this.keyboard_lastchar = 0;
    this.keyboard_string = 0;

    // others
    this.cursor_sprite = 0;
    this.show_score = false;
    this.show_lives = false;
    this.show_health = false;
    this.caption_score = "score";
    this.caption_lives = "lives";
    this.caption_health = "health";
    this.fps = 0;
    this.current_time = 0;
    this.current_year = 0;
    this.current_month = 0;
    this.current_day = 0;
    this.current_weekday = 0;
    this.current_hour = 0;
    this.current_minute = 0;
    this.current_second = 0;

    // event related
    this.event_type = 0;
    this.event_number = 0;
    this.event_object = 0;
    this.event_action = 0;

    // special
    this.secure_mode = 0;
    this.error_occurred = 0;
    this.error_last = 0;
    this.gamemaker_registered = true;
    this.gamemaker_pro = true;
    this.m_Arrays = [];

	this.keyboard_key = 0;
	this.keyboard_lastkey  = 0;
	this.keyboard_lastchar = "";
    this.async_load = -1;



}

yyBuiltIn.prototype.get_os_type = function () { return YoYo_GetPlatform(); };
yyBuiltIn.prototype.get_os_device = function () { return YoYo_GetDevice(); };
yyBuiltIn.prototype.get_os_browser = function () { return YoYo_GetBrowser(); };
yyBuiltIn.prototype.get_os_version = function () { return YoYo_GetVersion(); };
yyBuiltIn.prototype.get_async_load = function () { return this.async_load; };

yyBuiltIn.prototype.set_current_room = function (_room) { room_goto(_room); };
yyBuiltIn.prototype.get_current_room = function () { return g_RunRoom.id; };

yyBuiltIn.prototype.setbackground_color = function (_val) { g_RunRoom.m_color = this.background_color = _val; };
yyBuiltIn.prototype.getbackground_color = function () { return this.background_color; };

yyBuiltIn.prototype.set_view_xview = function (_val) { array_set_1D(global, "view_xview", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_yview = function (_val) { array_set_1D(global, "view_yview", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_wview = function (_val) { array_set_1D(global, "view_wview", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_hview = function (_val) { array_set_1D(global, "view_hview", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_xport = function (_val) { array_set_1D(global, "view_xport", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_yport = function (_val) { array_set_1D(global, "view_yport", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_wport = function (_val) { array_set_1D(global, "view_wport", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_hport = function (_val) { array_set_1D(global, "view_hport", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_angle = function (_val) { };
yyBuiltIn.prototype.set_view_hborder = function (_val) { array_set_1D(global, "view_hborder", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_vborder = function (_val) { array_set_1D(global, "view_vborder", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_hspeed = function (_val) { array_set_1D(global, "view_hspeed", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_vspeed = function (_val) { array_set_1D(global, "view_vspeed", 0, ~ ~_val); };
yyBuiltIn.prototype.set_view_object = function (_val) { array_set_1D(global, "view_object", 0, ~ ~_val); };

yyBuiltIn.prototype.get_view_xview = function (_val) { return array_get_1D(global, "view_xview", 0); };
yyBuiltIn.prototype.get_view_yview = function (_val) { return array_get_1D(global, "view_yview", 0); };
yyBuiltIn.prototype.get_view_wview = function (_val) { return array_get_1D(global, "view_wview", 0); };
yyBuiltIn.prototype.get_view_hview = function (_val) { return array_get_1D(global, "view_hview", 0); };
yyBuiltIn.prototype.get_view_xport = function (_val) { return array_get_1D(global, "view_xport", 0); };
yyBuiltIn.prototype.get_view_yport = function (_val) { return array_get_1D(global, "view_yport", 0); };
yyBuiltIn.prototype.get_view_wport = function (_val) { return array_get_1D(global, "view_wport", 0); };
yyBuiltIn.prototype.get_view_hport = function (_val) { return array_get_1D(global, "view_hport", 0); };
yyBuiltIn.prototype.get_view_angle = function (_val) { return 0; };
yyBuiltIn.prototype.get_view_hborder = function (_val) { return array_get_1D(global, "view_hborder", 0); };
yyBuiltIn.prototype.get_view_vborder = function (_val) { return array_get_1D(global, "view_vborder", 0); };
yyBuiltIn.prototype.get_view_hspeed = function (_val) { return array_get_1D(global, "view_hspeed", 0); };
yyBuiltIn.prototype.get_view_vspeed = function (_val) { return array_get_1D(global, "view_vspeed", 0); };
yyBuiltIn.prototype.get_view_object = function (_val) { return array_get_1D(global, "view_object", 0); };

yyBuiltIn.prototype.setbackground_showcolor = function (_val) { g_RunRoom.m_showcolor = _val; };
yyBuiltIn.prototype.getbackground_showcolor = function (_val) { return g_RunRoom.m_showcolor; };

yyBuiltIn.prototype.setbackground_visible = function (_val) { array_set_1D(global, "__background_visible__", 0, _val); };
yyBuiltIn.prototype.sebackground_foreground = function (_val) { array_set_1D(global, "__background_foreground__", 0, _val); };
yyBuiltIn.prototype.setbackground_index = function (_val) { array_set_1D(global, "__background_index__", 0, _val); };
yyBuiltIn.prototype.setbackground_x = function (_val) { array_set_1D(global, "__background_x__", 0, ~ ~_val); };
yyBuiltIn.prototype.setbackground_y = function (_val) { array_set_1D(global, "__background_y__", 0, ~ ~_val); };
yyBuiltIn.prototype.setbackground_width = function (_val) { array_set_1D(global, "__background_width__", 0, ~ ~_val); };
yyBuiltIn.prototype.setbackground_height = function (_val) { array_set_1D(global, "__background_height__", 0, ~ ~_val); };
yyBuiltIn.prototype.setbackground_htiled = function (_val) { array_set_1D(global, "__background_htiled__", 0, _val); };
yyBuiltIn.prototype.setbackground_vtiled = function (_val) { array_set_1D(global, "__background_vtiled__", 0, _val); };
yyBuiltIn.prototype.setbackground_xscale = function (_val) { array_set_1D(global, "__background_xscale__", 0, _val); };
yyBuiltIn.prototype.setbackground_yscale = function (_val) { array_set_1D(global, "__background_yscale__", 0, _val); };
yyBuiltIn.prototype.setbackground_hspeed = function (_val) { array_set_1D(global, "__background_hspeed__", 0, _val); };
yyBuiltIn.prototype.setbackground_vspeed = function (_val) { array_set_1D(global, "__background_vspeed__", 0, _val); };
yyBuiltIn.prototype.setbackground_blend = function (_val) { array_set_1D(global, "__background_blend__", 0, _val&0xffffff); };

yyBuiltIn.prototype.setbackground_alpha = function (_val) {
	if (_val < 0) _val = 0;
	if (_val > 1) _val = l;
	array_set_1D(global, "__background_alpha__", 0, _val);
};

yyBuiltIn.prototype.getbackground_visible = function () { array_get_1D(global, "__background_visible__", 0); };
yyBuiltIn.prototype.gebackground_foreground = function () { array_get_1D(global, "__background_foreground__", 0); };
yyBuiltIn.prototype.getbackground_index = function () { array_get_1D(global, "__background_index__", 0); };
yyBuiltIn.prototype.getbackground_x = function () { array_get_1D(global, "__background_x__", 0); };
yyBuiltIn.prototype.getbackground_y = function () { array_get_1D(global, "__background_y__", 0); };
yyBuiltIn.prototype.getbackground_width = function () { array_get_1D(global, "__background_width__", 0); };
yyBuiltIn.prototype.getbackground_height = function () { array_get_1D(global, "__background_height__", 0); };
yyBuiltIn.prototype.getbackground_htiled = function () { array_get_1D(global, "__background_htiled__", 0); };
yyBuiltIn.prototype.getbackground_vtiled = function () { array_get_1D(global, "__background_vtiled__", 0); };
yyBuiltIn.prototype.getbackground_xscale = function () { array_get_1D(global, "__background_xscale__", 0); };
yyBuiltIn.prototype.getbackground_yscale = function () { array_get_1D(global, "__background_yscale__", 0); };
yyBuiltIn.prototype.getbackground_hspeed = function () { array_get_1D(global, "__background_hspeed__", 0); };
yyBuiltIn.prototype.getbackground_vspeed = function () { array_get_1D(global, "__background_vspeed__", 0); };
yyBuiltIn.prototype.getbackground_blend = function () { array_get_1D(global, "__background_blend__", 0); };
yyBuiltIn.prototype.getbackground_alpha = function () { array_get_1D(global, "__background_alpha__", 0); };


// #############################################################################################
/// Function:<summary>
///             Copy ALL built in valiables
///          </summary>
///
/// In:		 <param name="_pBuiltIn">Class to clone</param>
// #############################################################################################
yyBuiltIn.prototype.Copy = function (_pBuiltIn) {
	// Copy everything!!
	for (var v in _pBuiltIn)
	{
		var p = _pBuiltIn[v];
		this[v] = p;
	}
};