
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Game.js
// Created:         25/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     General gaming functions
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 25/02/2011		V1.0        MJD     1st version.
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///          	Simple "sleep"
///          </summary>
///
/// In:		<param name="_time"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var sleep = Timing_Wait;	// (_time) 
/*{
	Timing_Wait(_time);
}*/

// #############################################################################################
/// Function:<summary>
///             get a list of instances for this object (recursive)
///          </summary>
///
/// In:		 <param name="_obj">object ID to use</param>
/// Out:	 <returns>
///				list of active instances - recursive
///			 </returns>
// #############################################################################################
function    instance_number( _obj )
{   
    return g_pObjectManager.Get(_obj).Instances_Recursive.length;
}


// #############################################################################################
/// Function:<summary>
///          	Shows the highscore table. numb is the new score. If this score is good enough to 
///				be added to the list, the player can input a name. Use -1 to simple display the current list.
///          </summary>
///
/// In:		<param name="_numb"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_show(_numb) {
	if (_numb != -1) highscore_add(null, _numb);

	var str = "";
	for (var i = 0; i < MAX_HIGHSCORE; i++)
	{
		var tab = 30;
		var num;
		// Look for insertion point
		num = g_HighScoreValues[i].toString();
		str = str + num;
		tab -= num.length;
		while (tab > 0)
		{
			str = str + " ";
			tab--;
		}
		str = str + g_HighScoreNames[i]+chr(13)+chr(10);
	}
	alert(str);

}

// #############################################################################################
/// Function:<summary>
///          	Sets the background image to use. back must be the index of one of the background 
///				resources.
///          </summary>
///
/// In:		<param name="_back"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_set_background(_back) {
	g_HiscoreBackground = _back;
}

// #############################################################################################
/// Function:<summary>
///          	Shows the highscore table with a number of options (can also be achieved by 
///				using a number of the previous functions). numb is the new score. If this score 
///				is good enough to be added to the list, the player can input a name. Use -1 to 
///				simple display the current list. back is the background image to use, border 
///				indicates whether or not to show the border. col1 is the color for the new entry, 
///				col2 the color for the other entries. name is the name of the font to use, and size 
///				is the font size.
///          </summary>
///
/// In:		<param name="_numb"></param>
///			<param name="_back"></param>
///			<param name="_border"></param>
///			<param name="_col1"></param>
///			<param name="_col2"></param>
///			<param name="_name"></param>
///			<param name="_size"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_show_ext(_numb,_back,_border,_col1,_col2,_name,_size) {
	highscore_set_border(_border);
	g_HiscoreFont = _name;
	g_HiscoreFontSize = _size;
	highscore_set_colors(_back, _col1, _col2);
	highscore_show(_numb);
}

// #############################################################################################
/// Function:<summary>
///          	Draws the highscore table in the room in the indicated box, using the current font. 
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function draw_highscore(_x1, _y1, _x2, _y2)
{
	var halign = g_pFontManager.halign;
	var dy = (_y2 - _y1) / MAX_HIGHSCORE;
	for (var i = 0; i < MAX_HIGHSCORE; i++)
	{
		// Look for insertion point
		g_pFontManager.halign = 0;								// LEFT align
		draw_text(_x1, _y1, g_HighScoreValues[i].toString());
		g_pFontManager.halign = 2;								// RIGHT align
		draw_text(_x2, _y1, g_HighScoreNames[i]);

		_y1 += dy;
	}
	g_pFontManager.halign = halign;
}

// #############################################################################################
/// Function:<summary>
///          	Sets whether the highscore form must have a border or not.
///          </summary>
///
/// In:		<param name="_show"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_set_border(_show) 
{
	g_HiscoreFontBorder = _show;
}

// #############################################################################################
/// Function:<summary>
///          	Sets the font used for the text in the table. (This is a normal Windows font, 
///				not one of the font resources.) You specify the name, size and style 
///				(0=normal, 1= bold, 2=italic, 3=bold-italic).
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_size"></param>
///			<param name="_style"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_set_font(_name,_size,_style) 
{
    g_HiscoreFont = _name;
    g_HiscoreFontSize = _size;
    g_HiscoreFontStyle = _style;
}

// #############################################################################################
/// Function:<summary>
///          	Sets the colors used for the background, the new entry in the table, and the other entries.

///          </summary>
///
/// In:		<param name="_back"></param>
///			<param name="_new"></param>
///			<param name="_other"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_set_colors(_back,_new,_other) 
{
	g_HiscoreBackgroundColour = _back;
	g_HiscoreNewColour = _new;
	g_HiscoreOtherColour = _other;
}

// #############################################################################################
/// Function:<summary>
///          	Changes the different default strings used when showing the highscore table. 
///				caption is the caption of the form. nobody is the string used when there is nobody 
///				at the particular rank. escape is the string at the bottom indicating to press the 
///				escape key. You can in particular use this when your game should use a different language.
///          </summary>
///
/// In:		<param name="_caption"></param>
///			<param name="_nobody"></param>
///			<param name="_escape"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_set_strings(_caption,_nobody,_escape) 
{
	g_HiscoreCaption = _caption;
	g_HighscoreNobody = _nobody;
	g_HighscoreEscape = _escape;
}



// #############################################################################################
/// Function:<summary>
///          	Clears the highscore list.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_clear() 
{
    g_HighScoreValues[0]=
    g_HighScoreValues[1]=
    g_HighScoreValues[2]=
    g_HighScoreValues[3]=
    g_HighScoreValues[4]=
    g_HighScoreValues[5]=
    g_HighScoreValues[6]=
    g_HighScoreValues[7]=
    g_HighScoreValues[8]=
    g_HighScoreValues[9]=0;
    g_HighScoreNames[0]=
    g_HighScoreNames[1]=
    g_HighScoreNames[2]=
    g_HighScoreNames[3]=
    g_HighScoreNames[4]=
    g_HighScoreNames[5]=
    g_HighScoreNames[6]=
    g_HighScoreNames[7]=
    g_HighScoreNames[8]=
    g_HighScoreNames[9]=g_HighscoreNobody;
}

// #############################################################################################
/// Function:<summary>
///          	Adds a player with name str and score numb to the list.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_numb"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_add( _str,_numb ) 
{
    for(var i=0;i<MAX_HIGHSCORE;i++)
    {
        // Look for insertion point
        if( _numb>g_HighScoreValues[i] ){
            g_HighScoreValues.splice(i,0,_numb);
            if (!_str){
            	_str = get_string("Well done! You have a highscore! Please enter your name", g_HighscoreNobody );
            }
            g_HighScoreNames.splice(i,0,_str);
            
            g_HighScoreValues.splice(10,1);
            g_HighScoreNames.splice(10, 1);
            return;
        }
    }
}

// #############################################################################################
/// Function:<summary>
///          	Adds the current score to the highscore list. The player is asked to provide a name.
///          </summary>
// #############################################################################################
function highscore_add_current() {
	highscore_add(null, Score);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the score of the person on the given place (1-10). This can be used 
///				to draw your own highscore list.
///          </summary>
///
/// In:		<param name="_place"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_value(_place) 
{
    if( _place<0 || _place>10 ) return -1;
    return g_HighScoreValues[_place];
}


// #############################################################################################
/// Function:<summary>
///          	Returns the name of the person on the given place (1-10).
///          </summary>
///
/// In:		<param name="_place"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function highscore_name(_place) 
{
    if( _place<0 || _place>10 ) return -1;
    return g_HighScoreNames[_place];
}


// #############################################################################################
/// Function:<summary>
///             LERP between to colours
///          </summary>
///
/// In:		 <param name="_col1">Colour #1</param>
///			 <param name="_col2">Colour #2</param>
///			 <param name="_value">LERP Value</param>
/// Out:	 <returns>
///				Merged TRGB value
///			 </returns>
// #############################################################################################
function Color_MergeRGB(_col1, _col2, _value)
{
	var r1,r2,g1,g2,b1,b2;

	r1 = (_col1>>16)&0xff;
	g1 = (_col1>>8)&0xff;
	b1 = (_col1&0xff);
	
	r2 = (_col2>>16)&0xff;
	g2 = (_col2>>8)&0xff;
	b2 = (_col2&0xff);
	
	
	var val2 = 1.0 - _value;
	var r = Round(r1*val2 + r2*_value);
	var g = Round(g1*val2 + g2*_value);
	var b = Round(b1*val2 + b2*_value);

	var col = ((r&0xff)<<16) | ((g&0xff)<<8) | (b&0xff);
	return col;
}

// #############################################################################################
/// Function:<summary>
///				LERPs between the two colors, value between 0 and 1 (0=col1, 1=col2)
///          </summary>
///
/// In:		 <param name="_col1">Colour #1</param>
///			 <param name="_col2">Colour #2</param>
///			 <param name="_value">LERP Value</param>
/// Out:	 <returns>
///				Merged TColor
///			 </returns>
// #############################################################################################
function Color_Merge(_col1, _col2, _value)
{        
	return Color_MergeRGB(_col1, _col2, _value);
}




// #############################################################################################
/// Function:<summary>
///             Perform event
///          </summary>
///
/// In:		 <param name="_pInst">Instance to apply event to</param>
///			 <param name="_event">event to do</param>
///			 <param name="_subevent">SubEvent</param>
// #############################################################################################
function event_perform(_pInst, _event, _subevent) {
	var event = event_lookup(_event, _subevent);
	var subevent = sub_event_lookup(_event, _subevent);
	_pInst.PerformEvent(event, subevent, _pInst, _pInst);
}

// #############################################################################################
/// Function:<summary>
///             Performs events on an object using the given timeline at the event index given
///          </summary>
///
/// In:		 <param name="_pInst">Instance to apply timeline event to</param>
///			 <param name="_timelineInd">Timeline to use</param>
///			 <param name="_eventInd">Event index</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function event_perform_timeline(_pInst, _other, _timelineInd, _eventInd)
{
    var timeline = g_pTimelineManager.Get(_timelineInd);
    if ((timeline != null) && (timeline != undefined)) 
    {
        var eventData = timeline.Events[_eventInd];
        if ((eventData != null) && (eventData != undefined))
        {
            // Call the event code associated with the timeline event
            eventData.Event(_pInst, _pInst);
        }
    }
}

// #############################################################################################
/// Function:<summary>
///          	This functions works the same as the function above except that this time you can 
///				specify events in another object. Note that the actions in these events are applied 
///				to the current instance, not to instances of the given object!
///          </summary>
///
/// In:		<param name="obj">Object ID to perform event with</param>
///			<param name="_event">Event type</param>
///			<param name="_subevent">Sub event type</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function event_perform_object(_pInst, _obj, _event, _subevent) 
{
	var event = event_lookup(_event, _subevent);
	var subevent = sub_event_lookup(_event, _subevent);

	var pObject = g_pObjectManager.Get(_obj);
	pObject.PerformEvent(event, subevent, _pInst, _pInst);
}


var g_DontRun = true;
// #############################################################################################
/// Function:<summary>
///          	In the other events you can also define 16 user events. These are only performed 
///				if you call this function. numb must lie in the range 0 to 15.
///          </summary>
///
/// In:		<param name="_pInst"></param>
///			<param name="_subevent"></param>
///				
// #############################################################################################
function event_user(_pInst, _subevent) {
	if (_subevent < 0 || _subevent > 15)
	{
		Error("Error: illegal user event ID: " + _subevent);
	}
	_subevent += GML_ev_user0;
	event_perform(_pInst, GML_EVENT_OTHER, _subevent);
}



// #############################################################################################
/// Function:<summary>
///          	Performs the inherited event. This only works if the instance has a parent object.
///          </summary>
///
/// In:		<param name="_pInst"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function event_inherited(_pInst) {
	if (_pInst.pObject.pParent != null)
	{
		// Save actual object		
		var objid = _pInst.object_index;
		var pObject = _pInst.pObject;
		
		// Set to the PARENT for the duration of the call
		_pInst.object_index = _pInst.pObject.ParentID;
		_pInst.pObject = _pInst.pObject.pParent;

		// CALL the event while instance "IS" that object type
		_pInst.pObject.PerformEvent(g_LastEvent, g_LastSubEvent, _pInst, _pInst);

		// Restore object details
		_pInst.object_index = objid;
		_pInst.pObject = pObject;

	}
}



// #############################################################################################
/// Function:<summary>
///          	Returns the number of command-line parameters. The actual parameters can be retrieved 
///				with the following function.
///          </summary>
///
/// Out:	<returns>
///				The number of arguments passed into the web page
///			</returns>
// #############################################################################################
function parameter_count() {
	return g_ArgumentCount;
}

// #############################################################################################
/// Function:<summary>
///          	Returns command-line parameters n. The first parameter has index 1. The last one has index 
///          </summary>
///
/// In:		<param name="_index"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function parameter_string(_index) {
	if (_index < 0 || _index > g_ArgumentCount) return "";

	var s = g_ArgumentIndex[_index];
	if (g_ArgumentValue[_index] != null) s = s + "=" + g_ArgumentValue[_index];
	return s;
}



function clipboard_get_text() {
	return "";
}
var clipboard_set_text = debug;

