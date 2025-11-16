
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            ds_stack.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     stack collection used by Game Maker
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 26/05/2011		V1.0        MJD     Simple ds_stack blocked in.
// 21/07/2011		V1.1        MJD     Simple ds_stack implemented.
// 
// **********************************************************************************************************************



// #############################################################################################
/// Function:<summary>
///          	Creates a new stack. The function returns an integer as an id that must be used 
///				in all other functions to access the particular stack. You can create multiple stacks.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_create(){
    var st = [];
    return g_StackCollection.Add( st );            // allocate a new LIST
}



// #############################################################################################
/// Function:<summary>
///          	Destroys the stack with the given id, freeing the memory used. Don't forget to 
///				call this function when you are ready with the structure.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_destroy(_id) {
	g_StackCollection.DeleteIndex(_id);
}

// #############################################################################################
/// Function:<summary>
///          	Clears the stack with the given id, removing all data from it but not destroying it.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_clear(_id) {
	var st = g_StackCollection.Get(_id);
	if (st == null) {
		Error("Error: invalid ds_stack ID (ds_stack_clear)");
		return;
	}
	st = [];
	g_StackCollection.Set(_id, st);
}

// #############################################################################################
/// Function:<summary>
///          	Copies the stack source into the stack with the given id.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_source"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_copy(_id, _source) {
	var pDest = g_StackCollection.Get(_id);
	if (pDest == null)
	{
		Error("Error: invalid DEST ds_stack ID (ds_stack_clear)");
		return;
	}
	var pSrc = g_StackCollection.Get(_source);
	if (pSrc == null)
	{
		Error("Error: invalid SOURCE ds_stack ID (ds_stack_clear)");
		return;
	}

	pDest = pSrc.slice();
	g_StackCollection.Set(_id, pDest);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the number of values stored in the stack.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_size(_id) 
{
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_size)");
		return 0;
	}
	return st.length;
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether the stack is empty. This is the same as testing whether the size is 0.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_empty(_id) {
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_empty)");
		return true;
	}

	if (st.length == 0) return true; else return false;
}


// #############################################################################################
/// Function:<summary>
///          	Pushes the value on the stack.
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_push(_id, _val) {
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_push)");
		return;
	}

	st.push(_val);
}


// #############################################################################################
/// Function:<summary>
///          	Returns the value on the top of the stack and removes it from the stack.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_pop(_id) {
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_pop)");
		return 0;
	}
	if (st.length == 0)
	{
		Error("Error: invalid stack is empty (ds_stack_pop)");
		return 0;
	}

	return st.pop();
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value on the top of the stack but does not remove it from the stack.
///          </summary>
///
/// In:		<param name="_id"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_top(_id) 
{
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_pop)");
		return 0;
	}
	if (st.length == 0)
	{
		Error("Error: invalid stack is empty (ds_stack_pop)");
		return 0;
	}

	return st[st.length-1];
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
function ds_stack_write(_id) {
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_write)");
		return;
	}
	return JSON.stringify(st);
}


// #############################################################################################
/// Function:<summary>
///          	Reads the data structure from the given string (as created by the previous call).
///          </summary>
///
/// In:		<param name="_id"></param>
///			<param name="_str"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ds_stack_read(_id, _pJSON) {
	var st = g_StackCollection.Get(_id);
	if (st == null)
	{
		Error("Error: invalid ds_stack ID (ds_stack_read)");
		return;
	}
	st = JSON.parse(_pJSON);
	g_StackCollection.Set(_id, st);
}
                                                
                                                


