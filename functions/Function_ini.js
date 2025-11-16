// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_ini.js
// Created:			27/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 27/05/2011		V1.1        MJD     Functions blocked in
// 
// **********************************************************************************************************************



var g_IniFile = null;

// #############################################################################################
/// Function:<summary>
///          	Opens the INI file with the given name. 
///             The ini file must be stored in the same folder as the game!
///          </summary>
///
/// In:		<param name="_file">file to open</param>
///				
// #############################################################################################
function ini_open(_file) 
{
	var pIni = null;
	if (g_SupportsLocalStorage)
	{
        pIni = INI_OpenIniFile(_file, true);
	}
	if( pIni==null ){
        pIni = INI_OpenIniFile(_file, false);
    }
	if( pIni==null ){
	    pIni = new yyIniFile(_file);
	}
	
	g_IniFile = pIni;
}


// #############################################################################################
/// Function:<summary>
///          	Closes the currently open INI file.
///          </summary>
// #############################################################################################
function ini_close() 
{
    if( g_IniFile.m_Changed ) g_IniFile.WriteIniFile();
    g_IniFile = null;
}

// #############################################################################################
/// Function:<summary>
///          	Reads the string value of the indicated key in the indicated section. 
///             When the key or section does not exist the default value is returned.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="_key"></param>
///			<param name="_default"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_read_string(_section,_key,_default)
{
    if( g_IniFile==null ) return _default;
    return g_IniFile.ReadString(_section,_key,_default);
}


// #############################################################################################
/// Function:<summary>
///          	Reads the real value of the indicated key in the indicated section. 
///             When the key or section does not exist the default value is returned.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="_key"></param>
///			<param name="_default"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_read_real(_section,_key,_default) 
{
    if( g_IniFile==null ) return _default;
    return g_IniFile.ReadFloat(_section,_key,_default);
}


// #############################################################################################
/// Function:<summary>
///          	Writes the string value for the indicated key in the indicated section.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="_key"></param>
///			<param name="_value"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_write_string(_section,_key,_value) 
{
    if( g_IniFile==null ) return false;
    g_IniFile.SetKey(_section,_key,_value);
    return true;
}

// #############################################################################################
/// Function:<summary>
///          	Writes the real value for the indicated key in the indicated section.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="_key"></param>
///			<param name="_value"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_write_real(_section,_key,_value) 
{
    if( g_IniFile==null ) return false;
    g_IniFile.SetKey(_section,_key,""+_value);
    return true;
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated key exists in the indicated section.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="_key"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_key_exists(_section,_key)
{
    if( g_IniFile==null ) return false;
    var pKey = g_IniFile.FindKey(_section,_key);
    if( pKey!=null && pKey!=undefined ) return true;
    return false;
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether the indicated section exists.
///          </summary>
///
/// In:		<param name="_section"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_section_exists(_section) 
{
    if( g_IniFile==null ) return false;
    var pSection = g_IniFile.m_Keys[_section];
    if( pSection!=null && pSection!=undefined ) return true;
    return false;
}

// #############################################################################################
/// Function:<summary>
///          	Deletes the indicated key from the indicated section.
///          </summary>
///
/// In:		<param name="_section"></param>
///			<param name="key"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_key_delete(_section,_key) 
{
    if( g_IniFile==null ) return false;
    return g_IniFile.DeleteKey(_section,_key);
}

// #############################################################################################
/// Function:<summary>
///          	Deletes the indicated section.
///          </summary>
///
/// In:		<param name="_section"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ini_section_delete(_section) 
{
    if( g_IniFile==null ) return false;
    return g_IniFile.DeleteSection(_section);
}


