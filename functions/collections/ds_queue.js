
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_queue.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     stack collection used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 26/05/2011		V1.0        MJD     ds_queue blocked in
// 23/07/2011		V1.1        MJD     Simple ds_queue implemented.
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///             Creates a new queue. The function returns an integer as an id that must be used 
///             in all other functions to access the particular queue. You can create multiple queues.
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_create()
{    
    var st = [];
    return g_ActiveQueues.Add( st );            // allocate a new Queue
}



// #############################################################################################
/// Function:<summary>
///              Destroys the queue with the given id, freeing the memory used. Don't forget to 
///             call this function when you are ready with the structure.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_destroy(_id)
{
    g_ActiveQueues.DeleteIndex(_id);
}


// #############################################################################################
/// Function:<summary>
///             Clears the queue with the given id, removing all data from it but not destroying it
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_clear(_id)
{
	var st = g_ActiveQueues.Get(_id);
	if(!st) {
		Error("Error: invalid ds_queue ID (ds_queue_clear)");
		return;
	}
	st = [];
	g_ActiveQueues.Set(_id, st);
}


// #############################################################################################
/// Function:<summary>
///             Copies the queue source into the queue with the given id.
///          </summary>
///
/// In:		 <param name="_dest"></param>
///			 <param name="_source"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_copy(_dest,_source)
{
	var pDest = g_ActiveQueues.Get(_id);
	if (pDest == null)
	{
		Error("Error: invalid DEST ds_queue ID (ds_queue_copy)");
		return;
	}
	var pSrc = g_ActiveQueues.Get(_source);
	if (pSrc == null)
	{
		Error("Error: invalid SOURCE ds_queue ID (ds_queue_copy)");
		return;
	}

	pDest = pSrc.slice();
	g_ActiveQueues.Set(_id, pDest);
}



// #############################################################################################
/// Function:<summary>
///             Returns the number of values stored in the queue.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_size(_id)
{
	var st = g_ActiveQueues.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_size)");
		return 0;
	}
	return st.length;
}



// #############################################################################################
/// Function:<summary>
///             Returns whether the queue is empty. This is the same as testing whether the size is 0.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_empty(_id)
{
    return (ds_queue_size(_id)==0 );
}

// #############################################################################################
/// Function:<summary>
///             Enters the value in the queue.
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_val"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_enqueue(_id,_val)
{
	var st = g_ActiveQueues.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_enqueue)");
		return 0;
	}
	st[ st.length ] = _val;
}

// #############################################################################################
/// Function:<summary>
///             Returns the value that is longest in the queue and removes it from the queue.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_dequeue(_id)
{
	var st = g_ActiveQueues.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_dequeue)");
		return 0;
	}
	if( st.length == 0 ) return 0;
	v = st.splice(0,1);
	return v[0];
}


// #############################################################################################
/// Function:<summary>
///             Returns the value at the head of the queue, that is, the value that has been the 
///             longest in the queue. (It does not remove it from the queue.)
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_head(_id)
{
	var st = g_ActiveQueues.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_head)");
		return 0;
	}
	if( st.length == 0 ) return 0;
	return st[0];
}


// #############################################################################################
/// Function:<summary>
///             Returns the value at the tail of the queue, that is, the value that has most 
///             recently been added to the queue. (It does not remove it from the queue.)
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_tail(_id)
{
	var st = g_ActiveQueues.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_tail)");
		return 0;
	}
	if( st.length == 0 ) return 0;
	return st[st.length-1];
}



// #############################################################################################
/// Function:<summary>
///             Turns the data structure into a string and returns this string. The string can 
///             then be used to e.g. save it to a file. This provides an easy mechanism for saving 
///             data structures.
///          </summary>
///
/// In:		 <param name="_id"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_write(_id)
{
	var queue = g_ActiveQueues.Get(_id);
	if (queue == null)
	{
		Error("Error: invalid ds_queue ID (ds_queue_write)");
		return "";
	}
	return JSON.stringify(queue);
}


// #############################################################################################
/// Function:<summary>
///             Reads the data structure from the given string (as created by the previous call).
///          </summary>
///
/// In:		 <param name="_id"></param>
///			 <param name="_str"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    ds_queue_read(_id,_pJSON)
{
	var queue = g_ActiveQueues.Get(_id);
	if (queue == null)
	{
		Error("Error: invalid ds_queue ID (ds_list_read)");
		return;
	}
		
	queue = JSON.parse(_pJSON);
	g_ActiveQueues.Set(_id, list);
}
                                                
                                                


