
// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			yyIniFile.js
// Created:			11/07/2011
// Author:			Mike
// Project:			GameMaker HTML5
// Description:		Given a string, creates an INI file structure.
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 11/07/2011       V1.0        MJD     Ported from the C++ version.
//
// **********************************************************************************************************************
	
	
	var	g_LastFileSize = 0;

// #############################################################################################
/// Function:<summary>
///          	Create a new INI file "object"
///          </summary>
///
/// Out:	<returns>
///				The "empty" object
///			</returns>
// #############################################################################################
function yyIniFile( _pName )
{
	this.m_Changed = false;
	this.m_Keys = [];
	this.m_pFileName = _pName; 
	this.m_pFileBuffer = "";
	this.m_FileIndex = 0;
	this.m_LineNumber = 0;

	//this.OpenIniFile = INI_OpenIniFile;
	//this.ReadIniFile = INI_ReadIniFile;
	//this.NextLine = INI_NextLine;
	//this.IsWhiteSpace = INI_IsWhiteSpace;
	//this.SkipWhiteSpace = INI_SkipWhiteSpace;
	//this.GetSection = INI_GetSection;
	//this.GetKey = INI_GetKey;
	//this.FindKey = INI_FindKey;
	//this.ReadInt = INI_ReadInt;
	//this.ReadFloat = INI_ReadFloat;
	//this.ReadString = INI_ReadString;
	//this.SetKey = INI_SetKey;
    //this.DeleteKey = INI_DeleteKey;
    //this.DeleteSection = INI_DeleteSection;
    //this.WriteIniFile = INI_WriteIniFile;
};




// #############################################################################################
/// Function:<summary>
///             Create an ini file class
///          </summary>
///
/// In:		 <param name="FileName">Name of the ini file</param>
///
// #############################################################################################
function INI_OpenIniFile(_FileName, _fLocal)
{
    var pFile = LoadTextFile_Block( _FileName, _fLocal );

	pIniFile = new yyIniFile(_FileName);
	pIniFile.m_pFileBuffer = pFile;
	pIniFile.ReadIniFile();
	
	var count=0;
	for(var i in pIniFile.m_Keys)
	{
	    count++;
	    break;
	}
	if( count==0 ) return null;
	return pIniFile;
}




// #############################################################################################
/// Function:<summary>
///             Move to AFTER the newline
///          </summary>
// #############################################################################################
yyIniFile.prototype.NextLine = function () {
	while ((this.m_pFileBuffer.charCodeAt(this.m_FileIndex) != 0x0a) && (this.m_pFileBuffer.charCodeAt(this.m_FileIndex) != 0x0d) && (this.m_FileIndex < this.m_Size))
	{
		this.m_FileIndex++;
	}
	this.m_LineNumber++;
	this.m_FileIndex++; 	// Skip 0x0a or 0x0d
	if (this.m_FileIndex >= this.m_Size) return;

	// Now check or the second part of the new line...
	if ((this.m_pFileBuffer.charCodeAt(this.m_FileIndex) == 0x0a) && (this.m_pFileBuffer.charCodeAt(this.m_FileIndex) == 0x0d))
	{
		this.m_FileIndex++; 	// Skip 0x0a or 0x0d
	}
};

// #############################################################################################
/// Function:<summary>
///             Is the next character a whitespace character? (includes comments etc..)
///          </summary>
///
/// Out:	 <returns>
///				TRUE for yes, FALSE for no.
///			 </returns>
// #############################################################################################
yyIniFile.prototype.IsWhiteSpace = function () {
	with (this)
	{
		if (this.m_FileIndex >= m_Size) return false;

		var c = m_pFileBuffer.charCodeAt(m_FileIndex);
		if (c == 0x20 || c == 0x09 || c == 0x0a || c == 0x0d || c == ord('#') || c == ord(';'))		// GM ini files don't support comments AT ALL!
		{
			return true;
		} else
		{
			return false;
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             Skip all whitespace (including newlines and comments)
///          </summary>
// #############################################################################################
yyIniFile.prototype.SkipWhiteSpace = function () {
	with (this)
	{
		// Skip whitespace (and newlines/comments etc.)
		while (IsWhiteSpace() && (m_FileIndex < m_Size))
		{
			// if we find a comment, ignore it....   (GM doesn't support comments)
			var c = m_pFileBuffer.charCodeAt(m_FileIndex);
			if (c == '#' || c == ';')
			{
				NextLine();
			} else if (c == 0x0a)
			{
				m_LineNumber++;
			}
			m_FileIndex++;
		}
		if (m_FileIndex >= m_Size) return;
	}
};

// #############################################################################################
/// Function:<summary>
///             Find the next section
///          </summary>
///
/// Out:	 <returns>
///				If not found, return NULL
///			 </returns>
// #############################################################################################
yyIniFile.prototype.GetSection = function () {
	with (this)
	{
		SkipWhiteSpace();

		// Scan for a "[" which will hold the section
		while ((m_pFileBuffer.charAt(m_FileIndex) != '[') && (m_FileIndex < m_Size))
		{
			m_FileIndex++;
		}
		if (m_FileIndex >= m_Size) return null;


		// Remember string start, but skip '['
		m_FileIndex++;
		var StartIndex = m_FileIndex;


		// Scan for a "]" which will hold the section
		while ((m_pFileBuffer.charAt(m_FileIndex) != ']') && (m_FileIndex < m_Size))
		{
			m_FileIndex++;
		}
		if (m_FileIndex >= m_Size) return null;

		// Make a new section.
		var len = m_FileIndex - StartIndex;
		var pSection = [];
		pSection.__m_pIniFileName__ = m_pFileBuffer.substr(StartIndex, len);

		m_FileIndex++; // Skip white space
		return pSection;
	}
};


// #############################################################################################
/// Function:<summary>
///             Find the next section
///          </summary>
///
/// Out:	 <returns>
///				If not found, return NULL
///			 </returns>
// #############################################################################################
yyIniFile.prototype.GetKey = function (_Section) {
	with (this)
	{
		SkipWhiteSpace();
		if (m_FileIndex >= m_Size || m_pFileBuffer.charAt(m_FileIndex) == '[') return false;


		// Remember string start
		var StartIndex = m_FileIndex;


		// Scan past the KEY (get it's length)
		var LastWhiteSpace = -1;
		while ((m_pFileBuffer.charAt(m_FileIndex) != '=') && (m_FileIndex < m_Size))
		{
			if (IsWhiteSpace())
			{
				if (LastWhiteSpace < 0) LastWhiteSpace = m_FileIndex;
			} else
			{
				LastWhiteSpace = -1;
			}
			m_FileIndex++;
		}
		if (m_FileIndex >= m_Size) return false;
		if (LastWhiteSpace < 0) LastWhiteSpace = m_FileIndex;

		// Make a new section.
		var len = LastWhiteSpace - StartIndex;
		var pKey = m_pFileBuffer.substr(StartIndex, len);


		// Now find the '=' sign
		while ((m_pFileBuffer.charAt(m_FileIndex) != '=') && (m_FileIndex < m_Size))
		{
			m_FileIndex++;
		}
		if (m_FileIndex >= m_Size) return false;
		m_FileIndex++; // Skip '='



		//
		// Now read the VALUE. First skip the white space before the vlaue, but make sure we dont go onto a newline
		//
		var line = m_LineNumber;
		SkipWhiteSpace();
		if (line != m_LineNumber) return false;
		StartIndex = m_FileIndex;


		// Now read to the end of the line (or comment character)
		var LastWhiteSpaceChar = -1;
		var c = m_pFileBuffer.charCodeAt(m_FileIndex);
		while ((c != 0x0a) && (c != 0x0d) && (c != ord('#')) && (c != ord(';')) && (m_FileIndex < m_Size))
		{
			if (c == 0x20 || c == 0x09)
			{
				if (LastWhiteSpaceChar < 0) LastWhiteSpaceChar = m_FileIndex;
			} else
			{
				LastWhiteSpaceChar = -1;
			}
			if (c == ord('\\')) m_FileIndex++; 		//GM doesn't support litterals.
			m_FileIndex++;
			c = m_pFileBuffer.charCodeAt(m_FileIndex);
		}

		if (LastWhiteSpaceChar >= 0)
		{
			len = LastWhiteSpaceChar - StartIndex;
		} else
		{
			len = m_FileIndex - StartIndex;
		}
		var pValue = m_pFileBuffer.substr(StartIndex, len);

		_Section[pKey] = pValue;
		return true;
	}
};


// #############################################################################################
/// Function:<summary>
///             Load an INI file into memory
///          </summary>
///
/// In:		 <param name="_filename">Name of INI file</param>
///			 <param name="content"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyIniFile.prototype.ReadIniFile = function () {
	with (this)
	{
		if (m_pFileBuffer == null) return false;
		m_Size = m_pFileBuffer.length;
		m_FileIndex = 0;
		m_LineNumber = 0;

		// First, get the first section so we can head into the loop ready.
		var pSection = GetSection();
		if (pSection == null)
		{
			m_pFileBuffer = null;
			return false;
		}
		m_Keys[pSection.__m_pIniFileName__] = pSection;


		// Now read in the INI file
		while (m_FileIndex < m_Size)
		{
			var found = GetKey(pSection);
			if (!found)
			{
				if (m_FileIndex < m_Size)
				{
					if (m_pFileBuffer.charAt(m_FileIndex) == '[')
					{
						pSection = GetSection();
						m_Keys[pSection.__m_pIniFileName__] = pSection;
					}
				}
			}
		}
		m_pFileBuffer = null;
		return true;
	}
};



// #############################################################################################
/// Function:<summary>
///             Given the section + key, retrun the key container.
///          </summary>
///
/// In:		 <param name="_pSectionName">Section name</param>
///			 <param name="_pKeyName">Key to retrieve</param>
/// Out:	 <returns>
///				the key container, or NULL for not found
///			 </returns>
// #############################################################################################
yyIniFile.prototype.FindKey = function (_pSectionName, _pKeyName) {
	with (this)
	{
		var pSection = m_Keys[_pSectionName];
		if (pSection != null && pSection != undefined)
		{
			var pValue = pSection[_pKeyName];
			if (pValue != undefined) return pValue;        // also returns NULL if it's been deleted.
		}
		return null;
	}
};


// #############################################################################################
/// Function:<summary>
///             Given the section + key, retrun the INT it holds - or the default if not found
///          </summary>
///
/// In:		 <param name="_pSectionName">Section name</param>
///			 <param name="_pKeyName">Key to retrieve</param>
/// Out:	 <returns>
///				the INT it holds, or 0 for not found  (or user supplied value)
///			 </returns>
// #############################################################################################
yyIniFile.prototype.ReadInt = function (_pSectionName, _pKeyName, _default) {
	with (this)
	{
		var pKey = FindKey(_pSectionName, _pKeyName);
		if (pKey != null)
		{
			return parseInt(pKey, 10);
		} else
		{
			return _default;
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             Given the section + key, retrun the INT it holds - or the default if not found
///          </summary>
///
/// In:		 <param name="_pSectionName">Section name</param>
///			 <param name="_pKeyName">Key to retrieve</param>
/// Out:	 <returns>
///				the INT it holds, or 0.0f for not found (or user supplied value)
///			 </returns>
// #############################################################################################
yyIniFile.prototype.ReadFloat = function (_pSectionName, _pKeyName, _default) {
	with (this)
	{
		var pKey = FindKey(_pSectionName, _pKeyName);
		if (pKey != null)
		{
			return parseFloat(pKey);
		} else
		{
			return _default;
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             Given the section + key, retrun the INT it holds - or the default if not found
///          </summary>
///
/// In:		 <param name="_pSectionName">Section name</param>
///			 <param name="_pKeyName">Key to retrieve</param>
/// Out:	 <returns>
///				the STRING it holds, or "<none>"for not found  (or user supplied value)
///			 </returns>
// #############################################################################################
yyIniFile.prototype.ReadString = function (_pSectionName, _pKeyName, _default) {
	with (this)
	{
		var pKey = FindKey(_pSectionName, _pKeyName);
		if (pKey != null)
		{
			return pKey;
		} else
		{
			return _default;
		}
	}
};


// #############################################################################################
/// Function:<summary>
///             Set a KEY value.
///          </summary>
///
/// In:		 <param name="_pSectionName">Section name</param>
///			 <param name="_pKeyName">KEY name</param>
///			 <param name="_pValue"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyIniFile.prototype.SetKey = function (_pSectionName, _pKeyName, _pValue) {
	with (this)
	{
		m_Changed = true;

		var pSection = m_Keys[_pSectionName];
		if (pSection == null || pSection == undefined)
		{
			pSection = [];
			pSection.__m_pIniFileName__ = _pSectionName;
			m_Keys[pSection.__m_pIniFileName__] = pSection;
		}

		pSection[_pKeyName] = _pValue; ;
		return true;
	}
};

// #############################################################################################
/// Function:<summary>
///             delete a key.
///          </summary>
///
/// In:		 <param name="_pKeyName"></param>
///			 <param name="_pSectionName"></param>
/// Out:	 <returns>
///				true for done, false for not found.
///			 </returns>
// #############################################################################################
yyIniFile.prototype.DeleteKey = function (_pSectionName, _pKeyName) {
	with (this)
	{
		var pSection = m_Keys[_pSectionName];
		if (pSection == null || pSection == undefined) return false;

		var pKey = pSection[_pKeyName];
		if (pKey == null || pKey == undefined) return false;

		m_Changed = true;
		pSection[_pKeyName] = null;
		return true;
	}
};

// #############################################################################################
/// Function:<summary>
///             Delete a whole section (and the keys)
///          </summary>
///
/// In:		 <param name="SectionName"></param>
/// Out:	 <returns>
///				true for done, false for not found.
///			 </returns>
// #############################################################################################
yyIniFile.prototype.DeleteSection = function (_pSectionName) {
	with (this)
	{
		var pSection = m_Keys[_pSectionName];
		if (pSection == null || pSection == undefined) return false;

		m_Changed = true;
		m_Keys[_pSectionName] = null;
		return true;
	}
};


// #############################################################################################
/// Function:<summary>
///             Save out the INI file.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyIniFile.prototype.WriteIniFile = function () {
	with (this)
	{
		if (m_Changed == false) return true; 	// No need to save!

		var pFile = "";
		var newline = chr(0x0d) + chr(0x0a);

		for (var section in m_Keys)
		{
			pFile = pFile + "[" + section + "]" + newline;

			var pSection = m_Keys[section];
			for (var key in pSection)
			{
				if (key != "__m_pIniFileName__")
				{
					var pValue = pSection[key];
					pFile = pFile + key + "=" + pValue + newline;
				}
			}
		}

        SaveTextFile_Block(m_pFileName, pFile);

		m_Changed = false;
		return true;
	}
};



// ##########################################################################################################################################################################################
// ##########################################################################################################################################################################################
// ##########################################################################################################################################################################################
// ##########################################################################################################################################################################################


// #############################################################################################
/// Function:<summary>
///          	Raw "get size" of file. Can also do file_exists etc.
///          </summary>
///
/// In:		<param name="_name"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function RawFileExists(_url) {
	try
	{
		var http = new XMLHttpRequest();
		http.open('HEAD', _url, false);
		http.send();
		return http.status != 404;
	} catch (e)
	{
		return false;
	}
}


// #############################################################################################
/// Function:<summary>
///             Read/Write a file from a server
///          </summary>
///
/// In:		 <param name="U">file or URL to access</param>
///			 <param name="V">false for GET, true for POST</param>
/// Out:	 <returns>
///				the file, or null if an error occured.
///			 </returns>
// #############################################################################################
function RawServerReadWrite(U, V) 
{
    try{
        var X = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        X.open(V ? 'PUT' : 'GET', U, false );
        X.setRequestHeader('Content-Type', 'text/html');
        X.send(V ? V : '');
        return X.responseText;
    }catch(e){
        return null;
    }
}


// #############################################################################################
/// Function:<summary>
///             Try and delete a file from a server
///          </summary>
///
/// In:		 <param name="U"></param>
/// Out:	 <returns>
///				true for okay, false for error.
///			 </returns>
// #############################################################################################
function RawServerDelete(U) 
{
    try{
        var X = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        X.open("DELETE", U, false );
        X.send('');
        return X.status;
    }catch(e){
        return false;
    }
}
// #############################################################################################
/// Function:<summary>
///             Save a TEXT file to local storage
///          </summary>
///
/// In:		 <param name="_filename"></param>
///			 <param name="_pFile"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function SaveTextFile_Block( _filename, _pFile )
{
	// Write to local storage
	if ('localStorage' in window && window['localStorage'] !== null)
	{
		try
		{
			localStorage["GameMaker." + _filename] = _pFile;
		} catch (ex)
		{
			return false;
		}
	}
}


// #############################################################################################
/// Function:<summary>
///             Load a TEXT file from local, OR remote (blocking)
///          </summary>
///
/// In:		 <param name="_FileName"></param>
///			 <param name="_fLocal"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function LoadTextFile_Block( _FileName, _fLocal )
{   
	var pFile = null;

	if (_fLocal) 
	{
		//if (g_SupportsLocalStorage)
		if('localStorage' in window && window['localStorage'] !== null)
		{
			try
			{
				pFile = localStorage["GameMaker." + _FileName];
			} catch (ex)
			{
				return null;
			}
			if ( (pFile == undefined) || (pFile==null) ) return null;
		}
	}
	else
	{
		pFile = RawServerReadWrite(g_RootDir+_FileName, false);
		if( ( pFile ==null ) || (pFile==undefined ) ) return null;
        if( pFile.substr(0,6) =="<html>") return null;
	}
	return pFile;
}


// #############################################################################################
/// Function:<summary>
///             Load a TEXT file from local, OR remote (blocking)
///          </summary>
///
/// In:		 <param name="_FileName"></param>
///			 <param name="_fLocal"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function FileExists_Block(_FileName, _fLocal) {
	var pFile = null;

	if (_fLocal)
	{
		//if (g_SupportsLocalStorage)
		if ('localStorage' in window && window['localStorage'] !== null)
		{
			try
			{
				if (localStorage["GameMaker." + _FileName]) return true;
				return false;
			} catch (ex)
			{
				return false;
			}
		}
	}
	else
	{
		return RawFileExists( g_RootDir + _FileName );
	}
}


// https://developer.mozilla.org/En/Using_XMLHttpRequest
// https://raw.github.com/vjeux/jsDataView/master/src/jdataview.js

function LoadBinaryData_Block(_filename)
{
    //mozResponseArrayBuffer 
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", _filename, false);
    xhr.send(null);
 
    buffer = xhr.mozResponseArrayBuffer;
    if (buffer) {
    var byteArray = new Uint8Array(buffer);
      for (var i = 0; i < byteArray.byteLength; i++) {
        // do something with each byte in the array
        }
    }    
}


function LoadBinaryDataOld_Block(_filename) 
{
  var req = new XMLHttpRequest();
  req.open('GET', _filename, false);
  //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.send(null);
  if (req.status != 200) return '';
  return req.responseText;

}