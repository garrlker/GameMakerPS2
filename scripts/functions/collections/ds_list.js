
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_list.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Collections used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 20/02/2011		V1.0        MJD     Simple ds_list implemented.
// 21/07/2011		V1.1		MJD		ds_list finished (read+write added)
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             Create a new LIST
///          </summary>
/// Out:	 <returns>
///				returns the ID/Index of the list
///			 </returns>
// #############################################################################################
function    ds_list_create()
{
    var l = new yyList();
    l.packing = true;
    return g_ListCollection.Add( l );            // allocate a new LIST
}


// #############################################################################################
/// Function:<summary>
///             Destroy the list at the given index
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
// #############################################################################################
function ds_list_destroy( _id )
{
    g_ListCollection.DeleteIndex(_id);
}

// #############################################################################################
/// Function:<summary>
///             Clear the list
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
// #############################################################################################
function ds_list_clear(_id) {
	var list = g_ListCollection.Get(_id);
	if (list != null)
	{
		list.Clear();
		return;
	}
	Error("Error: invalid ds_list ID (ds_list_clear)");
}

// #############################################################################################
/// Function:<summary>
///             Get the size of the list
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
// #############################################################################################
function ds_list_size(_id) {
	var list = g_ListCollection.Get(_id);
	if (list != null) return list.length;
	Error("Error: invalid ds_list ID (ds_list_size)");
	return 0;
}

// #############################################################################################
/// Function:<summary>
///             Is list empty?
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
// #############################################################################################
function ds_list_empty(_id) {
	var list = g_ListCollection.Get(_id);
	if (list != null)
	{
		if (list.length !== 0) return false;
	}
	Error("Error: invalid ds_list ID (ds_list_empty)");
}


// #############################################################################################
/// Function:<summary>
///             Add an entry to the END of the list
///         </summary>
///
/// In:     <param name="_id">id/index to delete</param>
///         <param name="_val">value to add</param>
// #############################################################################################
function    ds_list_add( _id, _val )
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.Add( _val );
    }
    Error("Error: invalid ds_list ID (ds_list_add)");
}


// #############################################################################################
/// Function:<summary>
///             Add an entry to the END of the list
///         </summary>
///
/// In:     <param name="_id">id/index to delete</param>
///         <param name="_val">value to add</param>
// #############################################################################################
function    ds_list_insert( _id, _pos, _val )
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.Insert( _pos, _val );
    }
    Error("Error: invalid ds_list ID (ds_list_insert)");
}


// #############################################################################################
/// Function:<summary>
///             Replace an entry
///          </summary>
///
/// In:     <param name="_id">id/index to delete</param>
///         <param name="_pos">position to change</param>
///         <param name="_val">value to add</param>
// #############################################################################################
function    ds_list_replace(_id,_pos,_val)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.Set(_pos, _val );
    }
    Error("Error: invalid ds_list ID (ds_list_replace)");
}



// #############################################################################################
/// Function:<summary>
///             delete an entry
///          </summary>
///
/// In:     <param name="_id">id/index to delete</param>
///         <param name="_pos">position to delete</param>
// #############################################################################################
function    ds_list_delete(_id,_pos)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.DeleteIndex(_pos);
    }
}


// #############################################################################################
/// Function:<summary>
///             Find an entry
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
///         <param name="_val">position to delete</param>
// #############################################################################################
function    ds_list_find_index(_id,_val)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.FindItem(_val);
    }
    Error("Error: invalid ds_list ID (ds_list_find_index)");
    return null;
}

// #############################################################################################
/// Function:<summary>
///             Find an entry
///          </summary>
///
/// In:     <param name="_id">id/index to delete</param>
///         <param name="_pos">position to delete</param>
// #############################################################################################
function    ds_list_find_value(_id,_pos)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        return list.Get(_pos);
    }
    Error("Error: invalid ds_list ID (ds_list_find_value)");
    return null;
}



// #############################################################################################
/// Function:<summary>
///             Find an entry
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
///         <param name="_pos">position to delete</param>
// #############################################################################################
function    ds_list_sort(_id,_assend)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        list.Sort(_assend);
    }
    Error("Error: invalid ds_list ID (ds_list_sort)");
    return null;
}

// #############################################################################################
/// Function:<summary>
///             Find an entry
///          </summary>
///
/// In:		 <param name="_id">id/index to delete</param>
///         <param name="_pos">position to delete</param>
// #############################################################################################
function    ds_list_shuffle(_id,_assend)
{
    var list = g_ListCollection.Get(_id);
    if( list!=null){
        list.Shuffle();
    }
	Error("Error: invalid ds_list ID (ds_list_shuffle)");
    return null;
}




// #############################################################################################
/// Function:<summary>
///              Turns the data structure into a string and returns this string
///          </summary>
///
/// In:		 <param name="_id">list index</param>
/// Out:	 <returns>
///				the list as a string.
///			 </returns>
// #############################################################################################
function ds_list_write( _id )
{
	var list = g_ListCollection.Get(_id);
	if (list == null)
	{
		Error("Error: invalid ds_list ID (ds_list_write)");
		return "";
	}
	return JSON.stringify(list);
}

// #############################################################################################
/// Function:<summary>
///             Reads the data structure from the given string (as created by ds_list_write() ).
///          </summary>
///
/// In:		 <param name="_id">list index</param>
///			 <param name="_pJSON">string to use to create the list</param>
///				
// #############################################################################################
function ds_list_read(_id, _pJSON) 
{
	var list = g_ListCollection.Get(_id);
	if (list == null)
	{
		Error("Error: invalid ds_list ID (ds_list_read)");
		return;
	}
		
	list = JSON.parse(_pJSON);
	g_ListCollection.Set(_id, list);
}





