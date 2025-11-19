
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_priority.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     Collections used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 20/02/2011		V1.0        MJD     Simple ds_priority implemented.
// 
// **********************************************************************************************************************




// #############################################################################################
/// Function:<summary>
///          	Create a new lIST object
///          </summary>
///
/// In:		<param name="_w"></param>
///			<param name="_h"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyPriorityQueue_Item(_depth,_obj) 
{
	this.depth = _depth;
	this.m_pObj = _obj;
}



// #############################################################################################
/// Function:<summary>
///          	Creates a new priority queue. The function returns an integer as an id that must 
///				be used in all other functions to access the particular priority queue.
///          </summary>
///
/// Out:	<returns>
///				The ID of a new list
///			</returns>
// #############################################################################################
function ds_priority_create() {
	return g_ActivePriorityQueues.Add( new yyOList() );
}

// #############################################################################################
/// Function:<summary>
///          	Destroys the priority queue with the given id, freeing the memory used. 
///				Don't forget to call this function when you are ready with the structure.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_destroy(_id) 
{
	g_ActivePriorityQueues.DeleteIndex(_id);
}


// #############################################################################################
/// Function:<summary>
///          	Clears the priority queue with the given id, removing all data from it but not 
///				destroying it.
///          </summary>
// #############################################################################################
function ds_priority_clear(_id) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid dest priority queue ds_priority_copy()");
		return;
	}
	pQueue.Clear();
}

// #############################################################################################
/// Function:<summary>
///          	Copies the priority queue source into the priority queue with the given id.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_copy(_id, _source) 
{
	var pDestQueue = g_ActivePriorityQueues.Get(_id);
	if (pDestQueue == null || pDestQueue  == undefined)
	{
		Error("Error: invalid dest priority queue ds_priority_copy()");
		return;
	}

	var pSrcQueue = g_ActivePriorityQueues.Get(_source);
	if (pSrcQueue == null || pSrcQueue == undefined)
	{
		Error("Error: invalid source priority queue ds_priority_copy()");
		return;
	}

	// COPY list
	pDestQueue = pSrcQueue.slice();
	g_ActivePriorityQueues.Set(_id, pDestQueue);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of values stored in the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				The number of values stored in the queue
///			</returns>
// #############################################################################################
function ds_priority_size(_id) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_size()");
		return 0;
	}
	return pQueue.length;
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether the priority queue is empty. This is the same as testing whether 
///				the size is 0.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_empty(_id) {
	if (ds_priority_size(_id) == 0) return true; else return false;
}


// #############################################################################################
/// Function:<summary>
///          	Adds the value with the given priority to the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_val"></param>
///			<param name="_prio"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_add(_id, _val, _prio) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_add()");
		return;
	}
	 var node = new yyPriorityQueue_Item(_prio, _val);
	 pQueue.Add(node);
}


// #############################################################################################
/// Function:<summary>
///          	Changes the priority of the given value in the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_val"></param>
///			<param name="_prio"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_change_priority(_id, _val, _prio) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_change_priority()");
		return;
	}
	
	while (i < pQueue.length)
	{
		var pNode = pQueue.Get(i);
		if (pNode != null)
		{
		    var v = pNode.m_pObj;
		    if( typeof(_val)=="number" && typeof(v)=="number"  )
		    {
			    // Find the node....
			    if( g_Precsision > abs(v-_val) )
			    {
				    // Once we find it. Remove it, change its depth, and add it back in.
				    pQueue.Delete(pNode);
				    pNode.depth = _prio;
				    pQueue.Add(pNode);
				    return;
			    }
		    }else{
			    // Find the node....
			    if (v == _val)
			    {
				    // Once we find it. Remove it, change its depth, and add it back in.
				    pQueue.Delete(pNode);
				    pNode.depth = _prio;
				    pQueue.Add(pNode);
				    return;
			    }
			}
		}
		i++;
	}
}


// #############################################################################################
/// Function:<summary>
///          	Returns the priority of the given value in the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_find_priority(_id, _val)
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_find_priority()");
		return;
	}
	
	while (i < pQueue.length)
	{
		var pNode = pQueue.Get(i);
		if (pNode != null)
		{
			// Find the node....
			if (pNode.m_pObj == _val) return pNode.depth;
		}
		i++;
	}
	return 0;
}


// #############################################################################################
/// Function:<summary>
///          	Deletes the given value (with its priority) from the priority queue
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_delete_value(_id, _val) {
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_delete_value()");
		return;
	}

	while (i < pQueue.length)
	{
		var pNode = pQueue.Get(i);
		if (pNode != null)
		{
		    var v =pNode.m_pObj;
		    if( typeof(_val)=="number" && typeof(v)=="number"  )
		    {
			    // Find the node....
			    if( g_Precsision > abs(v-_val) ) return pNode.depth;
			}else{
			    // Find the node....
			    if (v == _val) return pNode.depth;
			}
		}
		i++;
	}
	return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value with the smallest priority and deletes it from the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_delete_min(_id) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_delete_min()");
		return;
	}

	if (pQueue.length <= 0) return 0;

	var pNode = pQueue.Get(0);
	pQueue.Delete(pNode);
	return pNode.m_pObj;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value with the smallest priority but does not delete it from the 
///				priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_find_min(_id) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_find_min()");
		return;
	}

	if (pQueue.length <= 0) return 0;

	var pNode = pQueue.Get(0);
	return pNode.m_pObj;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the value with the largest priority and deletes it from the priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_delete_max(_id)
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_delete_max()");
		return;
	}

	if (pQueue.length <= 0) return 0;

	var pNode = pQueue.Get(Queue.length-1);
	pQueue.Delete(pNode);
	return pNode.m_pObj;
}
// #############################################################################################
/// Function:<summary>
///          	Returns the value with the largest priority but does not delete it from the 
///				priority queue.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_find_max(_id) 
{
	var pQueue = g_ActivePriorityQueues.Get(_id);
	if (pQueue == null || pQueue == undefined)
	{
		Error("Error: invalid priority queue ds_priority_find_max()");
		return;
	}

	if (pQueue.length <= 0) return 0;

	var pNode = pQueue.Get(Queue.length - 1);
	return pNode.m_pObj;
}


// #############################################################################################
/// Function:<summary>
///          	Turns the data structure into a string and returns this string. The string can 
///				then be used to e.g. save it to a file. This provides an easy mechanism for 
///				saving data structures.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_write(_id) {
	var list = g_ActivePriorityQueues.Get(_id);
	if (list == null)
	{
		Error("Error: invalid ds_priority ID (ds_priority_write)");
		return "";
	}
	return JSON.stringify(list);
}



// #############################################################################################
/// Function:<summary>
///          	Reads the data structure from the given string (as created by the previous call).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_pJSON"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_priority_read(_id, _pJSON) 
{
	var queue = g_ActivePriorityQueues.Get(_id);
	if (queue == null)
	{
		Error("Error: invalid ds_priority ID (ds_priority_read)");
		return;
	}

	queue = JSON.parse(_pJSON);
	g_ActivePriorityQueues.Set(_id, queue);
}


