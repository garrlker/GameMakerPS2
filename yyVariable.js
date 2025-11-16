
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			yyVariable.js
// Created:			30/05/2011
// Author:			Mike
// Project:			HTML5
// Description:		Deals with variables we can't do natively. (like arrays etc.)
//					Also deals with global/local exists.
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 30/05/2011		V1.0        MJD     1st version. 1D and 2D arrays added.
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///          	Simple user Array class
///          </summary>
///
/// In:		<param name="_pName"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    yyArray( _pName, _dim )
{
    this.m_pName = _pName;
    this.m_array = [];
    this.m_dimensions = _dim;          // 1 or 2 (for dimensions)
}

var array_get_1D = array_get_1D_RELEASE;
var array_set_1D = array_set_1D_RELEASE;
var array_get_2D = array_get_2D_RELEASE;
var array_set_2D = array_set_2D_RELEASE;

// #############################################################################################
/// Function:<summary>
///          	Write to a 1D array. If it's not defined, define it...
///          </summary>
///
/// In:		<param name="_pInst">Instance the array is attached to</param>
///			<param name="_pName">Name of array</param>
///			<param name="_a">array index</param>
///			<param name="_val">value to write</param>
///				
// #############################################################################################
function array_set_1D_DEBUG(_pInst, _pName, _a, _val) 
{
    if( !_pInst ) {
        debug("ERROR: Accessing array with in an invalid instance/global");
        return;
    }
    var pArr = _pInst.m_Arrays[_pName];                   // First try local, if not defined - try global.

    if (!pArr) 
    {
        // Is the array defined? if not... define it LOCALLY (instance)
        pArr = global.m_Arrays[_pName];
        if (!pArr) {
            pArr = new yyArray(_pName, 1);           // create the "user" array
            _pInst.m_Arrays[_pName] = pArr;         // add it into the instance
        }
    }  
    if( pArr.m_dimensions!=1 ) {
        debug("ERROR: Illegal number of dimensions when accessing array "+pArr.m_pName);
        return;
    }

    pArr.m_array[~~_a] = _val;
}


function    array_set_1D_RELEASE( _pInst, _pName, _a, _val )
{
	var pArr = _pInst.m_Arrays[_pName];                   // First try local, if not defined - try global.

    if (!pArr) 
    {
        // Is the array defined? if not... define it LOCALLY (instance)
        pArr = global.m_Arrays[_pName];
        if (!pArr) {
            pArr = new yyArray(_pName, 1);           // create the "user" array
            _pInst.m_Arrays[_pName] = pArr;         // add it into the instance
        }
    }  
    pArr.m_array[~~_a] = _val;
}



// #############################################################################################
/// Function:<summary>
///          	Read from a 1D array. If it's not defined, define it...
///             NOTE:  Can  NOT pass null into here anymore!!
///          </summary>
///
/// In:		<param name="_pInst">Instance</param>
///			<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    array_get_1D_DEBUG( _pInst, _pName, _a )
{
	var pArr = _pInst.m_Arrays[_pName];                          // Is the array defined? if not... check global

    if( !pArr ) {
        // Is the array defined? if not... ERROR!!
        pArr = global.m_Arrays[_pName];
        if (!pArr) {
            debug("Error: Tying to access unknown variable " + _pName);
            return 0;                                 // if we just created it, then its ALL 0
        }
    }
    else if( pArr.m_dimensions!=1 ) 
    {
        debug("ERROR: Illegal number of dimensions when accessing array "+pArr.m_pName);
        return 0;
    }

    _a = ~ ~_a;
    if( pArr.m_array[_a]===undefined  ) { 
        debug("Error: Out of bounds trying to access "+_pName+"["+_a+"], or value never written.");
        return 0;
    }        
    return pArr.m_array[_a];
}



// RELEASE mode 1D array access.
function    array_get_1D_RELEASE( _pInst, _pName, _a ) {

	_a = ~ ~_a;
    var pArr = _pInst.m_Arrays[_pName];                         // Is the array defined? if not... check global
    if( pArr ) return pArr.m_array[_a];

    // If not a "local" array, then "assume" it's been defined globally.
    return global.m_Arrays[_pName].m_array[_a];
}




// #############################################################################################
/// Function:<summary>
///          	Write to a 1D array. If it's not defined, define it...
///          </summary>
///
/// In:		<param name="_pInst">Instance the array is attached to</param>
///			<param name="_pName">Name of array</param>
///			<param name="_a">array index</param>
///			<param name="_val">value to write</param>
///				
// #############################################################################################
function    array_set_2D_DEBUG( _pInst, _pName, _a, _b, _val )
{
    // Is the array defined? if not... define it.
    var pArr = _pInst.m_Arrays[_pName]; 
    if( !pArr ) {
        pArr = new yyArray( _pName, 2 );            // create the "user" array
        _pInst.m_Arrays[_pName] = pArr;             // add it into the instance
    } 
    else if( pArr.m_dimensions!=2 ) 
    {
        debug("ERROR: Illegal number of dimensions when accessing array "+pArr.m_pName);
        return 0;
    }

    _a = ~ ~_a;
    _b = ~ ~_b;
    if (!pArr.m_array[_a]) pArr.m_array[_a] = [];
    pArr.m_array[_a][_b] = _val;
}


function array_set_2D_RELEASE(_pInst, _pName, _a, _b, _val) {
	// Is the array defined? if not... define it.
	var pArr = _pInst.m_Arrays[_pName];
	if (!pArr){
		pArr = new yyArray(_pName, 2);            // create the "user" array
		_pInst.m_Arrays[_pName] = pArr;           // add it into the instance
	}

	_a = ~ ~_a;
	_b = ~ ~_b;
	if (!pArr.m_array[_a]) pArr.m_array[_a] = [];
	pArr.m_array[_a][_b] = _val;
}



// #############################################################################################
/// Function:<summary>
///          	Read from a 1D array. If it's not defined, define it...
///          </summary>
///
/// In:		<param name="_pInst">Instance</param>
///			<param name="_a"></param>
/// Out:	<returns>
///				The value
///			</returns>
// #############################################################################################
function array_get_2D_DEBUG(_pInst, _pName, _a, _b) {
	// Is the array defined? if not... define it.
	var pArr = _pInst.m_Arrays[_pName];
	if (!pArr)
	{
		debug("Error: Tying to access unknown variable " + _pName);
		return 0;                                 // if we just created it, then its ALL 0 - Error?!?!?
	} else if (pArr.m_dimensions != 2)
	{
		debug("ERROR: Illegal number of dimensions when accessing array " + pArr.m_pName);
		return 0;
	}

	_a = ~ ~_a; // Make an INT
	_b = ~ ~_b;

	// Throw an error if it's not been set before??!?!
	if (!pArr.m_array[_a] || !pArr.m_array[_a][_b])
	{
		//Error_Show_Action("Error: Out of bounds trying to access "+_pName+"["+_a+"]["+_b+"], or value never written.", false);
		return 0;
	}

	return pArr.m_array[_a][_b];
}



function array_get_2D_RELEASE(_pInst, _pName, _a, _b) {
	_a = ~ ~_a; 	// Make an INT
	_b = ~ ~_b;
	var pArr = _pInst.m_Arrays[_pName];
	return pArr.m_array[_a][_b];
}

// #############################################################################################
/// Function:<summary>
///             Try and see if a global variable exists
///          </summary>
///
/// In:		 <param name="_var"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function variable_global_exists(_var) {
    MissingFunction("variable_global_exists");
    
	/*var s = "global.gml" + _var;
	try
	{
		var v = eval(s);
		if (v === undefined) return false;
		return true;
	} catch (e)
	{
		return false;
	}*/
}



// #############################################################################################
/// Function:<summary>
///             Does a variable exist inside the instance
///          </summary>
///
/// In:		 <param name="_pInst">Instance to check</param>
///			 <param name="_var">Variable to look for</param>
/// Out:	 <returns>
///				true of the variable is found... false if not..
///			 </returns>
// #############################################################################################
function variable_local_exists(_pInst, _var) {
    MissingFunction("variable_local_exists");

    /*
	var s = "_pInst.gml" + _var;
	try
	{
		var v = eval(s);
		if (v === undefined) return false;
		return true;
	} catch (e)
	{
		return false;
	}*/
}


// #############################################################################################
/// Function:<summary>
///             Try and see if a global variable exists
///          </summary>
///
/// In:		 <param name="_var"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function variable_global_get(_var) {
    MissingFunction("variable_global_get");

	/*var s = "global.gml" + _var;
	try
	{
		var v = eval(s);
		if (v === undefined) return 0;
		return v;
	} catch (e)
	{
		return false;
	}*/
}


// #############################################################################################
/// Function:<summary>
///          	Sets the global variable with the given name (a string) to the given value.
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_global_set(_name, _val) {

    MissingFunction("variable_global_set");

	/*var cmd;
	if (typeof (_val) == "string")
	{
		cmd = "global.gml" + _name + "=\"" + _val + "\"";
	} else
	{
		cmd = "global.gml" + _name + "=" + string(_val);
	}
	try
	{
		eval(cmd);
	} catch (e) { }*/
}

// #############################################################################################
/// Function:<summary>
///             Does a variable exist inside the instance
///          </summary>
///
/// In:		 <param name="_pInst">Instance to check</param>
///			 <param name="_var">Variable to look for</param>
/// Out:	 <returns>
///				true of the variable is found... false if not..
///			 </returns>
// #############################################################################################
function variable_local_get(_pInst, _var) {
    MissingFunction("variable_local_get");

	/*var s = "_pInst.gml" + _var;
	try
	{
		var v = eval(s);
		if (v === undefined) return false;
		return v;
	} catch (e)
	{
		return false;
	}*/
}

// #############################################################################################
/// Function:<summary>
///          	Sets the global variable with the given name (a string) to the given value.
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_local_set(_name, _val) {
    MissingFunction("variable_local_set");

	/*var cmd;
	if (typeof (_val) == "string")
	{
		cmd = "_pInst.gml" + _name + "=\"" + _val + "\"";
	} else
	{
		cmd = "_pInst.gml" + _name + "=" + string(_val);
	}
	try
	{
		eval(cmd);
	} catch (e) { }*/
}


// #############################################################################################
/// Constructor: <summary>
///              	Returns the value of index ind of the global array variable with the given name (a string).
///              </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_ind"></param>
///
// #############################################################################################
function variable_global_array_get(_name,_ind)
{
    MissingFunction("variable_global_array_get");
    return 0;
	//return array_get_1D(global, "gml" + _name, _ind);
}

// #############################################################################################
/// Constructor: <summary>
///              	Sets the index ind1,ind2 in the local 2-dimensional array variable with the 
///					given name (a string) to the given value.
///              </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_value"></param>
///
// #############################################################################################
function variable_global_array_set(_name,_ind1,_value) 
{
    MissingFunction("variable_global_array_set");
	//array_set_1D(global, "gml" + _name, _ind, _value);
}

// #############################################################################################
/// Constructor: <summary>
///              	Returns the value of index ind1,ind2 of the global 2-dimensional array variable 
///					with the given name (a string).
///              </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_ind2"></param>
///
// #############################################################################################
function variable_global_array2_get(_name,_ind1,_ind2)
{
    MissingFunction("variable_global_array2_get");
    return 0;
	//return array_get_2D( global,"gml"+_name,_ind,_ind2 );
}

// #############################################################################################
/// Function:<summary>
///          	Sets the index ind1,ind2 in the local 2-dimensional array variable with the 
///				given name (a string) to the given value.
///          </summary>
///
/// In:		<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_ind2"></param>
///			<param name="_value"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_global_array2_set(_name,_ind1,_ind2,_value) 
{
    MissingFunction("variable_global_array2_set");
    return 0;
	//return array_set_2D(global, "gml" + _name, _ind, _ind2, _value);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value of index ind of the local array variable with the given name (a string).
///          </summary>
///
/// In:		<param name="_inst"></param>
///			<param name="_name"></param>
///			<param name="_ind"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_local_array_get(_inst,_name,_ind) 
{
    MissingFunction("variable_local_array_get");
	//return array_get_1D(inst, "gml" + _name, _ind);
	return 0;
}

// #############################################################################################
/// Function:<summary>
///          	Sets the index ind1,ind2 in the local 2-dimensional array variable with the given 
///				name (a string) to the given value.
///          </summary>
///
/// In:		<param name="_inst"></param>
///			<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_value"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_local_array_set(_inst, _name, _ind1, _value) {
    MissingFunction("variable_local_array_set");
	//array_set_1D(inst, "gml" + _name, _ind, _value);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the value of index ind1,ind2 of the local 2-dimensional array variable 
///				with the given name (a string).
///          </summary>
///
/// In:		<param name="_inst"></param>
///			<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_ind2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_local_array2_get(_inst,_name,_ind1,_ind2) 
{
    MissingFunction("variable_local_array2_get");
    return 0;
	//return array_get_2D(inst, "gml" + _name, _ind, _ind2);
}


// #############################################################################################
/// Function:<summary>
///          	Sets the index ind1,ind2 in the local 2-dimensional array variable with the given name (a string) to the given value.
///          </summary>
///
/// In:		<param name="_inst"></param>
///			<param name="_name"></param>
///			<param name="_ind1"></param>
///			<param name="_ind2"></param>
///			<param name="_value"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function variable_local_array2_set(_inst,_name,_ind1,_ind2,_value) 
{
    MissingFunction("variable_local_array2_set");
	//array_set_2D(inst, "gml" + _name, _ind, _ind2, _value);
}





