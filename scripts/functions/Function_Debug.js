
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            Function_Debug.js
// Created:         17/05/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 17/05/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************

var g_MissingFunction_done = [];
var g_WarningFunction_done = [];
var lastPrint = Date.now();


// #############################################################################################
/// Property: <summary>
///           	
///           </summary>
// #############################################################################################
var print = function (text) {
	//return;
	var newline = String.fromCharCode(0x0a);
	text = text.replace('<b>', '').replace('</b>', '');
	var element = document.getElementById('debug_console');
	var diff = Date.now() - lastPrint;
	if (!element)
	{
		alert(text);
	} else
	{
		element.value += text + newline;
		// scroll down
		var len = element.textLength;
		/*if (len == undefined || len == 0 )
		{
		element.setSelectionRange(0, len);
		} else
		{
		element.setSelectionRange(len - 1, len);
		}*/
	}
	lastPrint = Date.now();
};


//function printStackTrace() {  var callstack = [];  var isCallstackPopulated = false;  try {    i.dont.exist+=0; //doesn't exist- that's the point  
//} catch(e) {    if (e.stack) { //Firefox      
//var lines = e.stack.split('\n');      for (var i=0, len=lines.length; i&lt;len; i++) {        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {          callstack.push(lines[i]);        }      }      //Remove call to printStackTrace()      callstack.shift();      isCallstackPopulated = true;    }    else if (window.opera &amp;&amp; e.message) { //Opera      var lines = e.message.split('\n');      for (var i=0, len=lines.length; i&lt;len; i++) {        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {          var entry = lines[i];          //Append next line also since it has the file info          if (lines[i+1]) {            entry += ' at ' + lines[i+1];            i++;          }          callstack.push(entry);        }      }      //Remove call to printStackTrace()      callstack.shift();      isCallstackPopulated = true;    }  }  if (!isCallstackPopulated) { //IE and Safari    var currentFunction = arguments.callee.caller;    while (currentFunction) {      var fn = currentFunction.toString();      var fname = fn.substring(fn.indexOf(&amp;quot;function&amp;quot;) + 8, fn.indexOf('')) || 'anonymous';      callstack.push(fname);      currentFunction = currentFunction.caller;    }  }  output(callstack);


// #############################################################################################
/// Function:<summary>
///          	Console out debug text
///          </summary>
// #############################################################################################
function debug()
{
  var index;
  
  for (index = 0; index < arguments.length; ++index) {
      print( arguments[index] );
  }
}

// #############################################################################################
/// Function:<summary>
///          	Console out debug text
///          </summary>
// #############################################################################################
function Error() {
    var index;

    for (index = 0; index < arguments.length; ++index)
    {
    	print(arguments[index]);
    }
}


// #############################################################################################
/// Function:<summary>
///             Function is not supported error
///          </summary>
///
/// In:		 <param name="_text">Name of function</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ErrorFunction(_text)
{
    if( !g_MissingFunction_done[_text] )
    {
        g_MissingFunction_done[_text] = true;
        var txt =  "Error: function "+_text+" is not supported.";
        debug( txt );
    }
}



// #############################################################################################
/// Function:<summary>
///             Display an error for a missing function
///          </summary>
///
/// In:		 <param name="_text">error string</param>
///				
// #############################################################################################
function MissingFunction( _text )
{   
    if( !g_MissingFunction_done[_text] )
    {
        g_MissingFunction_done[_text] = true;
        var txt =  "Error: function "+_text+" is not yet implemented";
        debug( txt );
    }
}


// #############################################################################################
/// Function:<summary>
///             Display a warning about a function. (i.e. not all colours used etc.)
///          </summary>
///
/// In:		 <param name="_text">warning string</param>
///				
// #############################################################################################
function WarningFunction(_text) {
	if (!g_WarningFunction_done[_text])
	{
		g_WarningFunction_done[_text] = true;
		var txt = "Warning: function " + _text;
		debug(txt);
	}
}

// #############################################################################################
/// Function:<summary>
///          	Given a string with "#", replace them with 0x0a.
///          </summary>
///
/// In:		<param name="_txt">String to replace</param>
/// Out:	<returns>
///				Replaced string.
///			</returns>
// #############################################################################################
function SplitText(_txt) 
{
	var sl = g_pFontManager.Split_TextBlock(_txt, -1);

	var newline = String.fromCharCode(0x0a);
	var s = "";
	for (var i = 0; i < sl.length; i++)
	{
		if (i != 0) s = s + newline;
		s += sl[i];
	}
	return s;
}

// #############################################################################################
/// Function:<summary>
///             Display an error for an action
///          </summary>
///
/// In:		 <param name="_errstr">error string</param>
///			 <param name="_serious">true/false for serioud (aborts)</param>
///				
// #############################################################################################
function MessageBox( _errstr )
{
    alert( _errstr );
}


// #############################################################################################
/// Function:<summary>
///             Display an error for an action
///          </summary>
///
/// In:		 <param name="_errstr">error string</param>
///			 <param name="_serious">true/false for serioud (aborts)</param>
///				
// #############################################################################################
function Error_Show_Action( _errstr, _serious )
{
	alert( SplitText(_errstr) );
}


// #############################################################################################
/// Function:<summary>
///             Output a message to the debug console
///          </summary>
///
/// In:		 <param name="_txt">text to output</param>
///				
// #############################################################################################
function show_debug_message( _txt )
{
	debug( SplitText(_txt) );
}

// #############################################################################################
/// Function:<summary>
///             Show a message box with some user TEXT in it.
///          </summary>
///
/// In:		 <param name="_txt">text to display</param>
///				
// #############################################################################################
function show_message(_txt) 
{
	alert( SplitText(_txt) );
}

// #############################################################################################
/// Function:<summary>
///             Displays a standard error message (and/or writes it to the log file). 
///             abort indicates whether the game should abort.
///          </summary>
///
/// In:		 <param name="_str"></param>
///			 <param name="_abort"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function show_error(_str,_abort) 
{
	alert( SplitText(_str) );
    // can't abort....?!?!?!
}

// #############################################################################################
/// Function:<summary>
///          	Show a message box with some user TEXT in it.
///          </summary>
///
/// In:		<param name="_txt"></param>
///			<param name="_but1"></param>
///			<param name="_but2"></param>
///			<param name="_but3"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function show_message_ext(_txt, _but1, _but2, _but3) 
{
	ErrorFunction("show_message_ext()");
	return 2;
}


// #############################################################################################
/// Function:<summary>
///          	Displays a question; returns true when the user selects yes and false otherwise.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function show_question(_str) 
{
	return confirm(SplitText(_str));
}


// #############################################################################################
/// Function:<summary>
///          	Asks the player in a dialog box for a number. str is the message. def is the 
///				default number shown.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_def"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function get_integer(_str,_def) 
{
	return parseFloat( prompt(_str, string(_def) ) );
}
// #############################################################################################
/// Function:<summary>
///          	Asks the player in a dialog box for a string. str is the message. def is the 
///				default value shown.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_def"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function get_string(_str,_def) 
{
	return prompt(SplitText(_str), string(_def));
}

// #############################################################################################
/// Function:<summary>
///          	Sets the background image for the pop-up box for any of the functions above. 
///				back must be one of the backgrounds defined in the game. Unfortunately, alpha 
///				values are not taken into account. However, if the left-bottom pixel has an alpha 
///				value of 0, all pixels with that color will be considered transparent.
///          </summary>
///
/// In:		<param name="_back"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_background(_back) 
{
    // Just ignore as we can't change the background.
	//MissingFunction("message_background()");
}


// #############################################################################################
/// Function:<summary>
///          	Sets the alpha translucence for the pop-up box for any of the functions above. 
///				alpha must lie between 0 (completely translucent) and 1 (not translucent) 
///				(only for Windows 2000 or later).
///          </summary>
///
/// In:		<param name="_alpha"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_alpha(_alpha) 
{
    // Just ignore as we can't change the alpha.
	//MissingFunction("message_alpha()");
}

// #############################################################################################
/// Function:<summary>
///          	Sets the sprite used for the buttons in the pop-up box. spr must be a sprite consisting 
///				of three images, the first indicates the button when it is not pressed and the mouse is 
///				far away, the second indicates the button when the mouse is above it but not pressed and 
///				the third is the button when it is pressed. Unfortunately, alpha values are not taken into 
///				account. However, if the left-bottom pixel has an alpha value of 0, all pixels with that 
///				color will be considered transparent.
///          </summary>
///
/// In:		<param name="_spr"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_button(_spr) {
	ErrorFunction("message_button()");
}

// #############################################################################################
/// Function:<summary>
///          	Sets the font for the text in the pop-up box. (This is a normal Windows font, 
///				not one of the font resources you can out in your game!) style indicates the font 
///				style (0=normal, 1=bold, 2=italic, and 3=bold-italic).
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_size"></param>
///			<param name="_color"></param>
///			<param name="_style"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_text_font(_name,_size,_color,_style) 
{
	ErrorFunction("message_text_font()");
}


// #############################################################################################
/// Function:<summary>
///          	Sets the font for the buttons in the pop-up box. style indicates the font style 
///				(0=normal, 1=bold, 2=italic, and 3=bold-italic).
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_size"></param>
///			<param name="_color"></param>
///			<param name="_style"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_button_font(_name,_size,_color,_style)  
{
	ErrorFunction("message_button_font()");
}


// #############################################################################################
/// Function:<summary>
///          	Sets the font for the input field in the pop-up box. style indicates the font style 
///				(0=normal, 1=bold, 2=italic, and 3=bold-italic).
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_size"></param>
///			<param name="_color"></param>
///			<param name="_style"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function message_input_font(_name, _size, _color, _style) {
	ErrorFunction("message_input_font()");
}

