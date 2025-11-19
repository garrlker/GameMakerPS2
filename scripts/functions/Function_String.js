
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_String.js
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




// #############################################################################################
/// Function:<summary>
///          	Returns a string containing the character with asci code val.
///          </summary>
///
/// In:		<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function chr(_val) 
{
    return String.fromCharCode(_val);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the asci code of the first character in str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ord(_str) 
{
    return _str.charCodeAt(0);
}

// #############################################################################################
/// Function:<summary>
///          	Turns str into a real number. str can contain a minus sign, a decimal dot and 
///             even an exponential part.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function real(_str) 
{
    return parseFloat(_str);
}

// #############################################################################################
/// Function:<summary>
///          	Turns the real value into a string using a standard format (no decimal places 
///             when it is an integer, and two decimal places otherwise).
///          </summary>
///
/// In:		<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################

function string(_obj) 
{
    if( _obj==undefined ) {
        return "undefined";
    }
    
    // Set to two decimal places as per Delphi runner
    if ((typeof (_obj) == "number") && ((_obj | 0) != _obj))
    {
    	return _obj.toFixed(2).toString();
    } 
    else
    {
    	return _obj.toString();
    }
}

// #############################################################################################
/// Function:<summary>
///          	Turns val into a string using your own format: tot indicates the total number 
///             of places and dec indicates the number of decimal places.
///          </summary>
///
/// In:		<param name="_val"></param>
///			<param name="_tot"></param>
///			<param name="_dec"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_format(_val,_tot,_dec) 
{
    if ((_val == undefined) || (typeof (_val) != "number")) {
        return "undefined";
    }

    // Set number of decimal places accordingly and turn into a string
    var strs = _val.toFixed(_dec).toString().split(".");

    // Pad the sections of the string out and concatenate them together
    var str;
    for (var i = 0; i < strs.length; i++) {
        switch (i) {
            case 0:
                while (strs[i].length < _tot) {
                    strs[i] = " " + strs[i];
                }
                str = strs[i] + ".";
                break;

            case 1:
                while (strs[i].length < _dec) {
                    strs[i] = strs[i] + "0";
                }
                str = str + strs[i];
                break;
        }
    }
    return str;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of characters in the string.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_length(_str) 
{
    if( !_str ) {
        return 0;
    }
    return _str.length; //();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the position of substr in str (0=no occurrence).
///          </summary>
///
/// In:		<param name="_substr"></param>
///			<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_pos(_substr, _str)
{    
    return _str.indexOf(_substr) + 1;
	}

// #############################################################################################
/// Function:<summary>
///          	Returns a substring of str, starting at position index, and of length count.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_index"></param>
///			<param name="_count"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_copy(_str,_index,_count) 
{
	return _str.substring(_index - 1, _index + _count);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the character in str at position index.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_index"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_char_at(_str,_index) 
{
	return _str.charAt(_index - 1);
}

// #############################################################################################
/// Function:<summary>
///          	Returns a copy of str with the part removed that starts at position index and 
///             has length count.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_index"></param>
///			<param name="_count"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_delete(_str,_index,_count) 
{    
    return (_str.substring(0, _index - 1) + _str.substring(_index - 1 + _count, _str.length));
}

// #############################################################################################
/// Function:<summary>
///          	Returns a copy of str with substr added at position index.
///          </summary>
///
/// In:		<param name="_substr"></param>
///			<param name="_str"></param>
///			<param name="_index"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_insert(_substr, _str,_index) 
{
	return (_str.substring(0, _index - 1) + _substr + _str.substring(_index - 1, _str.length));
}

// #############################################################################################
/// Function:<summary>
///          	Returns a copy of str with the first occurrence of substr replaced by newstr.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_substr"></param>
///			<param name="_newstr"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_replace(_str, _substr, _newstr) 
{    
    return _str.replace(_substr, _newstr);
}

// #############################################################################################
/// Function:<summary>
///          	Returns a copy of str with all occurrences of substr replaced by newstr.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_substr"></param>
///			<param name="_newstr"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_replace_all(_str,_substr,_newstr) 
{    
    var s = new String(_str);
    while (s.indexOf(_substr) != -1) {    
        s = s.replace(_substr, _newstr);    
    }
    return s;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of occurrences of substr in str.
///          </summary>
///
/// In:		<param name="_substr"></param>
///			<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_count(_substr,_str) 
{
    var count = 0;
    if (_substr.length > 0)
    {    
        var index = 0;
        while (index != -1) {
            index = _str.indexOf(_substr, index);
            if (index > -1) {
                count += 1;
                index += _substr.length;
            }
        }
    }
    return count;
}

// #############################################################################################
/// Function:<summary>
///          	Returns a lowercase copy of str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_lower(_str) 
{
    return _str.toLowerCase();
}

// #############################################################################################
/// Function:<summary>
///          	Returns an uppercase copy of str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_upper(_str) 
{
    return _str.toUpperCase();
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string consisting of count copies of str.
///          </summary>
///
/// In:		<param name="_str"></param>
///			<param name="_count"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_repeat(_str,_count) 
{
    var s = "";
    for(var i=0;i<_count;i++)
    {
        s = s+_str;
    }
    return s;
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string that only contains the letters in str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_letters(_str) 
{
    var s = "";
    //var strs = _str.match(/[A-Z]|[a-z]*/g);
    /*if (strs != null) {
        for (var n = 0; n < strs.length; n++) {
            s = s + strs[n];
        }
    }*/
    for(var i=0;i<_str.length;i++){
        var c = _str[i];
        if( (c>='A' && c<='Z') || (c>='a' && c<='z') ){
            s = s+c;
        }
    }
    
    return s;    
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string that only contains the digits in str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_digits(_str) 
{
    var s = "";
    //var strs = _str.match(/[0-9]*/g);
    /*if (strs != null) {
        for (var n = 0; n < strs.length; n++) {
            s = s + strs[n];
        }
    }*/
    for(var i=0;i<_str.length;i++){
        var c = _str[i];
        if( c>='0' && c<='9' ){
            s = s+c;
        }
    }
    
    return s;  
}

// #############################################################################################
/// Function:<summary>
///          	Returns a string that contains the letters and digits in str.
///          </summary>
///
/// In:		<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function string_lettersdigits(_str) 
{
    var s = "";
    //var strs = _str.match(/[A-Z]|[a-z]|[0-9]*/g);
    /*if (strs != null) {
        for (var n = 0; n < strs.length; n++) {
            s = s + strs[n];
        }
    }*/
    for(var i=0;i<_str.length;i++){
        var c = _str[i];
        if( (c>='A' && c<='Z') || (c>='a' && c<='z') || (c>='0' && c<='9') ){
            s = s+c;
        }
    }
    return s;  
}