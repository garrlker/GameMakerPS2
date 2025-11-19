
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:	    	Function_File.js
// Created:	        09/06/2011
// Author:    		Mike
// Project:		    HTML5
// Description:   	
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 09/06/2011		V1.0-       MJD     1st version
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///          	A TEXT file type
///          </summary>
// #############################################################################################
function yyTextFile() {
	this.m_pFile = "";
	this.m_index = 0;
	this.m_Write = false; // can not write to this file.
	this.m_changed = false;
	this.m_FileName = ""
}

// #############################################################################################
/// Property: <summary>
///           	Skip newlines...
///           </summary>
// #############################################################################################
yyTextFile.prototype.SkipNewLines = function()
{
	var str;	
	var i = this.m_index;
	var s = this.m_pFile;
	while(i<s.length)
	{
		var c = s.charCodeAt(i);
		if( c==0x0d || c==0x0a ){
			i++;
		}else{
			break;
		}
	}
	this.m_index = i;
};


// #############################################################################################
/// Property: <summary>
///           	Skip newlines...
///           </summary>
// #############################################################################################
yyTextFile.prototype.NextLine = function () {
	var str;
	var i = this.m_index;
	var s = this.m_pFile;
	while (i < s.length)
	{
		var c = s.charCodeAt(i);
		if (c == 0x0d || c == 0x0a)
		{
			i++;
			c = s.charCodeAt(i);
			if (c == 0x0d || c == 0x0a)
			{
				i++;
			}
			break;
		} else
		{
			i++;
		}
	}
	this.m_index = i;
};


// #############################################################################################
/// Property: <summary>
///           	Skip whitespace - including new lines
///           </summary>
// #############################################################################################
yyTextFile.prototype.SkipWhiteSpace = function () {
	var str;
	var i = this.m_index;
	var s = this.m_pFile;
	while (i < s.length)
	{
		var c = s.charCodeAt(i);
		if (c == 0x0d || c == 0x0a || c==0x09 || c==0x20)
		{
			i++;
		} else
		{
			break;
		}
	}
	this.m_index = i;
};



// #############################################################################################
/// Function:<summary>
///             Opens the file with the indicated name for reading. The function returns the id 
///             of the file that must be used in the other functions. You can open multiple files 
///             at the same time (32 max). Don't forget to close them once you are finished with them.
///          </summary>
///
/// In:		 <param name="_fname">Name of file to open for reading</param>
/// Out:	 <returns>
///				File handle, or <0 for error
///			 </returns>
// #############################################################################################
function file_text_open_read(_fname) 
{
	// Always try LOCAL first in case it's been modified and SAVED
	var pTextFile = LoadTextFile_Block(_fname,true);
	if (pTextFile == null) pTextFile = LoadTextFile_Block(_fname, false);
	if (pTextFile == null) return -1;

	pFile = new yyTextFile();
	pFile.m_pFile = pTextFile;
	pFile.m_index = 0;
	pFile.m_FileName = _fname;

	return g_TextFiles.Add(pFile);
}


// #############################################################################################
/// Function:<summary>
///             Closes the file with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid">File to close</param>
///				
// #############################################################################################
function file_text_close(_fileid) {
	var pFile = g_TextFiles.Get(_fileid);
	if (!pFile)
	{
		Error("Error: Illegal file handle");
		return;
	}

	// If the file has changed (only happens with WRITE files), then save to local storage
	if (pFile.m_changed){
		SaveTextFile_Block(pFile.m_FileName, pFile.m_pFile);
	}
	
	 g_TextFiles.DeleteIndex(_fileid);
}

// #############################################################################################
/// Function:<summary>
///             Opens the indicated file for writing, creating it if it does not exist. 
///             The function returns the id of the file that must be used in the other functions.
///          </summary>
///
/// In:		 <param name="_fname">Name of file to open for writing</param>
/// Out:	 <returns>
///				File handle, or <0 for error
///			 </returns>
// #############################################################################################
function file_text_open_write(_fname) 
{
	pFile = new yyTextFile();
	pFile.m_FileName = _fname;
	pFile.m_pFile = "";
	pFile.m_index = 0;
	pFile.m_write = true;

	return g_TextFiles.Add(pFile);
}


// #############################################################################################
/// Function:<summary>
///             Opens the indicated file for appending data at the end, creating it if it does 
///             not exist. The function returns the id of the file that must be used in the other 
///             functions.
///          </summary>
///
/// In:		 <param name="_fname">Name of file to open for appending</param>
/// Out:	 <returns>
///				File handle, or <0 for error
///			 </returns>
// #############################################################################################
function file_text_open_append(_fname) 
{
	var f = file_text_open_read(_fname);
	if (f < 0)
	{
		// Not found? Open a new file for writing instead...
		return file_text_open_write(_fname);
	}
	var pFile = g_TextFiles.Get(f);
	pFile.m_write = true;
	pFile.m_index = pFile.m_pFile.length; 	// end of file is starting point
	return f;
}




// #############################################################################################
/// Function:<summary>
///             Writes the string to the file with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid">file handle</param>
///			 <param name="_str">string to write</param>
///				
// #############################################################################################
function file_text_write_string(_fileid,_str) {
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}
	if (!pFile.m_write)
	{
		Error("Error: File " + pFile.m_FileName + " has not been opened with WRITE permisions");
		return;
	}
	pFile.m_pFile += _str;
	pFile.m_changed = true;
	pFile.m_index = pFile.m_pFile.length; 	// end of file is starting point
}


// #############################################################################################
/// Function:<summary>
///             Write the real value to the file with the given file id. (As separator between 
///             the integer and decimal part always a dot is used.
///          </summary>
///
/// In:		 <param name="_fileid">File handle</param>
///			 <param name="_x">value to write</param>
///				
// #############################################################################################
function file_text_write_real(_fileid,_x) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}
	if (!pFile.m_write)
	{
		Error("Error: File " + pFile.m_FileName + " has not been opened with WRITE permisions");
		return;
	}
	pFile.m_pFile += _x;
	pFile.m_changed = true;
	pFile.m_index = pFile.m_pFile.length; 	// end of file is starting point
}


// #############################################################################################
/// Function:<summary>
///             Write a newline character to the file.
///          </summary>
///
/// In:		 <param name="fileid">file handle</param>
///				
// #############################################################################################
function file_text_writeln(_fileid) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}
	if (!pFile.m_write)
	{
		Error("Error: File " + pFile.m_FileName + " has not been opened with WRITE permisions");
		return;
	}
	pFile.m_pFile += String.fromCharCode(0x0d);
	pFile.m_pFile += String.fromCharCode(0x0a);
	pFile.m_index = pFile.m_pFile.length; 	// end of file is starting point
}


// #############################################################################################
/// Function:<summary>
///             Reads a string from the file with the given file id and returns this string. 
///             A string ends at the end of line.
///          </summary>
///
/// In:		 <param name="_fileid">File handle</param>
/// Out:	 <returns>
///				string
///			 </returns>
// #############################################################################################
function file_text_read_string(_fileid) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}

	// first SKIP newline(s) - We must be ON a newline to skip them.
	pFile.SkipNewLines();

	var str = "";	
	var i = pFile.m_index;
	var s = pFile.m_pFile;
	while(i<s.length)
	{
		var c = s.charCodeAt(i);
		if( c==0x0d || c==0x0a ){
			break;
		}else{
			str+=s[i++];
		}
	}
	pFile.m_index = i;
	return str;
}


// #############################################################################################
/// Function:<summary>
///             Reads a real value from the file and returns this value.
///          </summary>
///
/// In:		 <param name="_fileid">File handle</param>
/// Out:	 <returns>
///				The "real" number that was read.
///			 </returns>
// #############################################################################################
function file_text_read_real(_fileid) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if (!pFile)
	{
		Error("Error: Illegal file handle");
		return;
	}

	// first SKIP newline(s) - We must be ON a newline to skip them.
	pFile.SkipWhiteSpace();

	var str = "";
	var i = pFile.m_index;
	var s = pFile.m_pFile;
	while (i < s.length)
	{
		var c = s[i]; //.charCodeAt(i);
		if ( (c >='0' && c <='9') || (c=='.') )
		{
			str += s[i++];
		} else
		{
			break;
		}
	}
	pFile.m_index = i;
	return parseFloat(str);
}


// #############################################################################################
/// Function:<summary>
///             Skips the rest of the line in the file and starts at the start of the next line.
///          </summary>
///
/// In:		 <param name="_fileid">file handle</param>
///				
// #############################################################################################
function file_text_readln(_fileid) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if (!pFile)
	{
		Error("Error: Illegal file handle");
		return;
	}

	pFile.NextLine(); 
}

// #############################################################################################
/// Function:<summary>
///             Returns whether we reached the end of the file.
///          </summary>
///
/// In:		 <param name="_fileid">file handle</param>
///				
// #############################################################################################
function file_text_eof(_fileid) {
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}

	if( pFile.m_index >= pFile.m_pFile.length ) return true;
	return false;
}


// #############################################################################################
/// Function:<summary>
///             Returns whether we reached the end of a line in the file.
///          </summary>
///
/// In:		 <param name="_fileid">file handle</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_text_eoln(_fileid) 
{
	var pFile = g_TextFiles.Get(_fileid);
	if( !pFile ) {
		Error("Error: Illegal file handle");
		return;
	}
	var c = pFile.m_pFile.charCodeAt(pFile.m_index);
	if( c== 0x0a || c==0x0d ) return true;
	return false;
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the file with the given name exists (true) or not (false).
///          </summary>
///
/// In:		 <param name="_fname">file name to look for</param>
/// Out:	 <returns>
///				true for yes, flase for no.
///			 </returns>
// #############################################################################################
function file_exists(_fname) {
	var exists = FileExists_Block(_fname, true);
	if (exists == true) return true;
	return FileExists_Block(_fname, false);
}


// #############################################################################################
/// Function:<summary>
///             Deletes the file with the given name.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_delete(_fname) 
{
    ErrorFunction("file_delete()");
}


// #############################################################################################
/// Function:<summary>
///             Renames the file with name oldname into newname.
///          </summary>
///
/// In:		 <param name="_oldname">Old file name</param>
///			 <param name="_newname">New file name</param>
///				
// #############################################################################################
function file_rename(_oldname,_newname) 
{
    ErrorFunction("file_rename()");
}


// #############################################################################################
/// Function:<summary>
///             Copies the file fname to the newname.
///          </summary>
///
/// In:		 <param name="_fname">File to copy FROM</param>
///			 <param name="_newname">File to copy TO</param>
///				
// #############################################################################################
function file_copy(_fname,_newname) 
{
    ErrorFunction("file_copy()");
}


// #############################################################################################
/// Function:<summary>
///             Returns whether the indicated directory does exist. The name must include the 
///             full path, not a relative path.
///          </summary>
///
/// In:		 <param name="_dname">Directory name to check for</param>
/// Out:	 <returns>
///				true for yes, false for no.
///			 </returns>
// #############################################################################################
function directory_exists(_dname) 
{
    ErrorFunction("directory_exists()");
    return true;
}


// #############################################################################################
/// Function:<summary>
///             Creates a directory with the given name (including the path towards it) 
///             if it does not exist. The name must include the full path, not a relative path.
///          </summary>
///
/// In:		 <param name="_dname">Name of directory to create</param>
/// Out:	 <returns>
///				true for done, false for error
///			 </returns>
// #############################################################################################
function directory_create(_dname) 
{
    ErrorFunction("directory_create()");
    return true;
}


// #############################################################################################
/// Function:<summary>
///             Returns the name of the first file that satisfies the mask and the attributes. 
///             If no such file exists, the empty string is returned. The mask can contain a path 
///             and can contain wildchars, for example 'C:\temp\*.doc'. The attributes give the 
///             additional files you want to see. (So the normal files are always returned when 
///             they satisfy the mask.) You can add up the following constants to see the type of 
///             files you want:
///          </summary>
///
/// In:		 <param name="_mask"></param>
///			 <param name="_attr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_find_first(_mask,_attr) 
{
    ErrorFunction("file_find_first()");
    return -1;
}


// #############################################################################################
/// Function:<summary>
///             Returns the name of the next file that satisfies the previously given mask and 
///             the attributes. If no such file exists, the empty string is returned.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_find_next() 
{
    ErrorFunction("file_find_next()");
}


// #############################################################################################
/// Function:<summary>
///             Must be called after handling all files to free memory.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_find_close()
{
    ErrorFunction("file_find_close()");
}


// #############################################################################################
/// Function:<summary>
///             Returns whether the file has all the attributes given in attr. Use a combination 
///             of the constants indicated above
///          </summary>
///
/// In:		 <param name="_fname"></param>
///			 <param name="_attr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_attributes(_fname,_attr) 
{
	ErrorFunction("file_attributes()");
	return true;
}


// #############################################################################################
/// Function:<summary>
///             Returns the name part of the indicated file name, with the extension but without 
///             the path.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_name(_fname) 
{
    MissingFunction("filename_name()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the path part of the indicated file name, including the final backslash.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_path(_fname) 
{
    MissingFunction("filename_path()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the directory part of the indicated file name, which normally is the same 
///             as the path except for the final backslash.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_dir(_fname) 
{
    MissingFunction("filename_dir()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the drive information of the filename.
///				For a URL, it returns the domain address.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_drive(_fname) 
{
    MissingFunction("filename_drive()");
}



// #############################################################################################
/// Function:<summary>
///             Returns the indicated file name, with the extension (including the dot) changed 
///             to the new extension. By using an empty string as the new extension you can remove 
///             the extension.
///          </summary>
///
/// In:		 <param name="_fname"></param>
///			 <param name="_newext"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_change_ext(_fname,_newext) 
{
    MissingFunction("filename_change_ext()");
}


// #############################################################################################
/// Function:<summary>
///             Opens the file with the indicated name. The mode indicates what can be done with 
///             the file: 0 = reading, 1 = writing, 2 = both reading and writing). When the file 
///             does not exist it is created. The function returns the id of the file that must 
///             be used in the other functions. You can open multiple files at the same time (32 max). 
///             Don't forget to close them once you are finished with them.
///          </summary>
///
/// In:		 <param name="_fname"></param>
///			 <param name="_mod"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_open(_fname,_mod)
{
    ErrorFunction("file_bin_open()");
}


// #############################################################################################
/// Function:<summary>
///             Rewrites the file with the given file id, that is, clears it and starts writing 
///             at the start.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_rewrite(_fileid) 
{
    ErrorFunction("file_bin_rewrite()");
}


// #############################################################################################
/// Function:<summary>
///             Closes the file with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_close(_fileid) 
{
    ErrorFunction("file_bin_close()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the size (in bytes) of the file with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_size(_fileid) 
{
    ErrorFunction("file_bin_size()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the current position (in bytes; 0 is the first position) of the file 
///             with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_position(_fileid) 
{
    ErrorFunction("file_bin_position()");
}


// #############################################################################################
/// Function:<summary>
///             Moves the current position of the file to the indicated position. To append to a 
///             file move the position to the size of the file before writing.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
///			 <param name="_pos"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_seek(_fileid,_pos) 
{
    ErrorFunction("file_bin_seek()");
}


// #############################################################################################
/// Function:<summary>
///             Writes a byte of data to the file with the given file id.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
///			 <param name="_byte"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_write_byte(_fileid,_byte) 
{
    ErrorFunction("file_bin_write_byte()");
}


// #############################################################################################
/// Function:<summary>
///             Reads a byte of data from the file and returns this.
///          </summary>
///
/// In:		 <param name="_fileid"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function file_bin_read_byte(_fileid) 
{
    ErrorFunction("file_bin_read_byte()");
}


// #############################################################################################
/// Function:<summary>
///             Exports the included file with the name fname. This must be a string variable, 
///             so don't forget the quotes.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function export_include_file(_fname) 
{
	ErrorFunction("export_include_file()");
}


// #############################################################################################
/// Function:<summary>
///             Exports the included file with the name fname to the given location. 
///             Location must contain the path and the filename.
///          </summary>
///
/// In:		 <param name="_fname"></param>
///			 <param name="_location"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function export_include_file_location(_fname,_location) 
{
    ErrorFunction("export_include_file_location()");
}


// #############################################################################################
/// Function:<summary>
///             Discard the included file with the name fname, freeing the memory used. This must 
///             be a string variable, so don't forget the quotes.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function discard_include_file(_fname) 
{
    ErrorFunction("discard_include_file()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the value (a string) of the environment variable with the given name. 
///          </summary>
///
/// In:		 <param name="_name"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function environment_get_variable(_name) 
{
	ErrorFunction("environment_get_variable()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the size of the indicated drive in bytes. drive must be a capital letter, 
///             e.g. 'C'. If you do not provide the drive, the drive of the current working directory 
///             is used.
///          </summary>
///
/// In:		 <param name="_drive"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function disk_size(_drive) 
{
	ErrorFunction("disk_size()");
}


// #############################################################################################
/// Function:<summary>
///             Returns the amount of free space on the indicated drive in bytes. drive must be a 
///             capital letter, e.g. 'C'. If you do not provide the drive, the drive of the current 
///             working directory is used.
///          </summary>
///
/// In:		 <param name="_drive"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function disk_free(_drive) 
{
	ErrorFunction("disk_free()");
}



// #############################################################################################
/// Function:<summary>
///             Returns the extension part of the indicated file name, including the leading dot.
///          </summary>
///
/// In:		 <param name="_fname"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function filename_ext(_filename) {
	var dot = _filename.lastIndexOf(".");
	var slash = _filename.lastIndexOf("\\");
	if (slash > dot) return ""; 			// . is pre URL

	return _filename.substr(dot, _filename.length);
}

