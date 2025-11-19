
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_map.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Collections used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 20/02/2011		V1.0        MJD     ds_map blocked in.
// 23/07/2011		V1.1        MJD     Simple ds_map implemented.
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///             Creates a new map. The function returns an integer as an id that must be used in 
///             all other functions to access the particular map.
///          </summary>
///
/// Out:	 <returns>
///				ID of the map
///			 </returns>
// #############################################################################################
function ds_map_create()
{
    var pMap = [];
	var id = g_ActiveMaps.Add( pMap );
	return id;
}


// #############################################################################################
/// Function:<summary>
///             Destroys the map with the given id, freeing the memory used. Don't forget to call 
///             this function when you are ready with the structure.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_destroy(_id)
{
    g_ActiveMaps.DeleteIndex(_id);
}


// #############################################################################################
/// Function:<summary>
///             Clears the map with the given id, removing all data from it but not destroying it
///          </summary>
///
/// In:		 <param name="_id">MAP ID to clear</param>
///				
// #############################################################################################
function ds_map_clear(_id) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        var pVar = [];
        g_ActiveMaps.Set( _id, pVar );
    }
}



// #############################################################################################
/// Function:<summary>
///              Copies the map source into the map with the given id.
///          </summary>
///
/// In:		 <param name="_dest">Dest</param>
///			 <param name="_source">Source to copy from</param>
///				
// #############################################################################################
function ds_map_copy(_dest,_source)
{
	var pDest = g_ActiveMaps.Get( _dest );
	var pSrc = g_ActiveMaps.Get( _source );
    if( pDest && pSrc ){
        pDest = pSrc.slice();
        g_ActiveMaps.Set( _dest, pDest );
    }
}



// #############################################################################################
/// Function:<summary>
///             Returns the number of key-value pairs stored in the map.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_size(_id) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap) return pMap.length;
    return 0;
}


// #############################################################################################
/// Function:<summary>
///             Returns whether the map is empty. This is the same as testing whether the size is 0.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_empty(_id) 
{
    return (ds_map_size(_id)==0);
}


// #############################################################################################
/// Function:<summary>
///             Adds the key-value pair to the map.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_add(_id,_key,_val)
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        if( pMap[_key]!= undefined ){
            Error("Error: KEY("+_key+") already present in ds_map["+_id+"], you can not add a key twice.");
        }
        pMap[_key] = _val;        
    }
}


// #############################################################################################
/// Function:<summary>
///             Replaces the value corresponding with the key with a new value.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_replace(_id,_key,_val)
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        if( pMap[_key]== undefined ){
            Error("Error: Key("+_key+") NOT present in ds_map["+_id+"], you must add a key before replacing it.");
        }
        pMap[_key] = _val;
    }
}



// #############################################################################################
/// Function:<summary>
///             Deletes the key and the corresponding value from the map. 
///             (If there are multiple entries with the same key, only one is removed.)
///             Our only allow 1 value per key.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_delete(_id,_key) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        if( pMap[_key] != undefined  ) pMap[_key] = undefined;
    }
}

// #############################################################################################
/// Function:<summary>
///             Returns whether the key exists in the map.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_exists( _id, _key ) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        if( pMap[_key] != undefined  ) return true;
    }
    return false;
}

// #############################################################################################
/// Function:<summary>
///             Returns the value corresponding to the key. 
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_find_value(_id,_key)
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap){
        if( pMap[_key] != undefined  ) return  pMap[_key];
    }
    Error( "Error: Key ("+_key+") not found in ds_map["+_id+"]" );
    return 0;
}



// #############################################################################################
/// Function:<summary>
///             Returns the largest key in the map smaller than the indicated key. 
///             (Note that the key is returned, not the value. You can use the previous routine 
///             to find the value.)
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_find_previous(_id,_key) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap)
    {
        var pPrev = 0;
        for(var key in pMap)
        {
           if( _key==key) return pPrev;
           pPrev = key;
        }
    }
    return 0;
}




// #############################################################################################
/// Function:<summary>
///             Returns the smallest key in the map larger than the indicated key.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_key"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_find_next(_id,_key) 
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap)
    {
        var found = false;
        for(var key in pMap)
        {
            if(found) return key;
           if( _key==key) found = true;
        }
    }
    return 0;
}


// #############################################################################################
/// Function:<summary>
///             Returns the smallest key in the map.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_find_first(_id)
{
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap)
    {
        for(var key in pMap)
        {
            return key;
        }
    }
    return 0;
}



// #############################################################################################
/// Function:<summary>
///             Returns the largest key in the map. 
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_find_last(_id) 
{
    var pPrev = 0;
	var pMap = g_ActiveMaps.Get( _id );
    if( pMap)
    {
        for(var key in pMap){
           pPrev = key;
        }
    }
    return pPrev;
}


// #############################################################################################
/// Function:<summary>
///             Turns the data structure into a string and returns this string. 
///             The string can then be used to e.g. save it to a file. 
///             This provides an easy mechanism for saving data structures.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_write(_id)
{
	var map = g_ActiveMaps.Get(_id);
	if (map == null)
	{
		Error("Error: invalid ds_map ID (ds_list_write)");
		return "";
	}
	return JSON.stringify(map);
}


// #############################################################################################
/// Function:<summary>
///             Reads the data structure from the given string (as created by the previous call).
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_pJSON"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ds_map_read(_id, _pJSON) 
{
	var pMap = g_ActiveMaps.Get(_id);
	if(pMap == null)
	{
		Error("Error: invalid ds_map ID (ds_list_read)");
		return;
	}
		
	pMap = JSON.parse(_pJSON);
	g_ActiveMaps.Set(_id, pMap);
}





