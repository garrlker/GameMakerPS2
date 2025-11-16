
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:			Function_Maths.js
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

var RAND_MAX = 0x7fff;
var g_nRandSeed = 0;

// #############################################################################################
/// Function:<summary>
///          	Returns the floor of x, that is, x rounded down to an integer.
///          </summary>
///
/// In:		<param name="_val"></param>
/// Out:	<returns>
///				value floored.
///			</returns>
// #############################################################################################
var floor = Math.floor;
/*function floor(_val) {
	return ~ ~_val;
    //return Math.floor(_val);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns x rounded to the nearest integer.
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function DelphiRound(_a) 
{
    var i = _a&0xffffffff;
    var f = _a-i;
    if( (i&1)==1 ){
        if( f>=0.5 ){
            return i+1;
        }else{
            return i;
        }
    }else{
        if( f<=0.5 ){
            return i;
        }else{
            return i+1;
        }
    }
}

function yyRound(_a) {
	return ~ ~_a;
}
var round = DelphiRound;
var Round = DelphiRound;

//var round = Math.floor;
//var Round = Math.floor;

// #############################################################################################
/// Function:<summary>
///          	Returns the absolute value of x.
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var abs = Math.abs;
/*function    abs(_a)
{
    return Math.abs(_a);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns the cosine of x (x in radians).
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    cos(_a)
{
	var _x = Math.cos(_a);

	var t = ~ ~(_x * 0x1000000);
	_x = t / 0x1000000;
	return _x;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the sine of x (x in radians).
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    sin(_a)
{
	var _x = Math.sin(_a);

	var t = ~ ~(_x * 0x1000000);
	_x = t / 0x1000000;
	return _x;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the tangent of x (x in radians).
///          </summary>
///
/// In:		<param name="_a"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    tan(_a)
{
    var _x = Math.tan(_a);

    var t = ~ ~(_x * 0x1000000);
    _x = t / 0x1000000;
    return _x;
}


// #############################################################################################
/// Function:<summary>
///             Returns the horizontal x-component of the vector determined by the indicated 
///             length and direction.
///          </summary>
///
/// In:		 <param name="_len">length</param>
///			 <param name="_dir">angle in degrees</param>
/// Out:	 <returns>
///				the length on the X axis
///			 </returns>
// #############################################################################################
function   lengthdir_x( _len, _dir )
{
	var v = (_len*Math.cos(_dir*Pi/180.0));
	var flv = Math.floor(v);
	var frac = v - flv;
	if( Math.abs(frac) < 0.0001 ) return flv;
    return v;
}


// #############################################################################################
/// Function:<summary>
///             Returns the vertical y-component of the vector determined by the indicated 
///             length and direction.
///          </summary>
///
/// In:		 <param name="_len">length</param>
///			 <param name="_dir">angle in degrees</param>
/// Out:	 <returns>
///				the length on the Y axis
///			 </returns>
// #############################################################################################
function   lengthdir_y( _len, _dir )
{
	var v = -(_len*Math.sin(_dir*Pi/180.0));
	var flv = Math.floor(v);
	var frac = v - flv;
	if( Math.abs(frac) < 0.0001 ) return flv;
    return v;
}


// #############################################################################################
/// Function:<summary>
///             Returns the direction from point (x1,y1) toward point (x2,y2) in degrees.
///          </summary>
///
/// In:		 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    point_direction(_x1,_y1, _x2,_y2)
{
	var x = _x2-_x1;
	var y = _y2-_y1;

	if ( x === 0 )
	{
		if ( y > 0 ) return 270.0;
		else if ( y < 0 ) return 90.0;
		else return 0.0;
	}
	else
	{
		var dd = 180.0*Math.atan2(y,x)/Pi;
		if ( dd <= 0.0 ) { 
			return -dd; 
		} else { 
			return (360.0-dd); 
		}
	}
	return Result;
}
function ComputeDir(_x1,_y1, _x2,_y2){ return point_direction(_x1,_y1, _x2,_y2); }


// #############################################################################################
/// Function:<summary>
///             Returns the distance between point (x1,y1) and point (x2,y2).
///          </summary>
///
/// In:		 <param name="_x1">x1 coordinate</param>
///			 <param name="_y1">y1 coordinate</param>
///			 <param name="_x2">x2 coordinate</param>
///			 <param name="_y2">y2 coordinate</param>
/// Out:	 <returns>
///				the distance between x1,y1 and x2,y2
///			 </returns>
// #############################################################################################
function    point_distance(_x1,_y1, _x2,_y2)
{
  return abs( Math.sqrt( Sqr( _x2-_x1 ) + Sqr(_y2-_y1) ) );
}


// #############################################################################################
/// Function:<summary>
///          	Return the smaller number between _a and _b
///          </summary>
///
/// In:		<param name="_a">Number 1</param>
///			<param name="_b">Number 2</param>
/// Out:	<returns>
///				the smaller of _a and _b
///			</returns>
// #############################################################################################
function yymin(_a,_b)
{
    if( _a<_b) return _a; else return _b;
}


// #############################################################################################
/// Function:<summary>
///          	Return the larger number between _a and _b
///          </summary>
///
/// In:		<param name="_a">Number 1</param>
///			<param name="_b">Number 2</param>
/// Out:	<returns>
///				the lager of _a and _b
///			</returns>
// #############################################################################################
function yymax(_a,_b)
{
    if( _a>_b) return _a; else return _b;
}


// #############################################################################################
/// Function:<summary>
///             Returns the maximum of the values. The function can have up to 16 arguments. 
///             They must either be all real or all strings.
///          </summary>
/// Out:	 <returns>
///				the largest value
///			 </returns>
// #############################################################################################
var max = Math.max;
/*function    max()
{
    var args = max.arguments;
    var argc = max.arguments.length;
    
    var m = args[0];
    for(var i=1;i<argc;i++){
        if( m<args[i] ) m=args[i];
    }
    return m;
}*/
function max3(_a,_b,_c){ return max(_a,_b,_x); }

// #############################################################################################
/// Function:<summary>
///             Returns the minimum of the values. The function can have up to 16 arguments. 
///             They must either be all real or all strings.
///          </summary>
/// Out:	 <returns>
///				the smallest value
///			 </returns>
// #############################################################################################
var min = Math.min;
/*function    min()
{
    var args = min.arguments;
    var argc = min.arguments.length;
    
    var m = args[0];
    for(var i=1;i<argc;i++){
        if( m>args[i] ) m=args[i];
    }
    return m;
}*/
function min3(_a,_b,_c){ return min(_a,_b,_x); }


// #############################################################################################
/// Function:<summary>
///          	Returns a random number
///          </summary>
// #############################################################################################
function rand() 
{
	return Math.random() * RAND_MAX;
    //g_nRandSeed = (((g_nRandSeed * 214013 + 2531011) >> 16) & RAND_MAX) | 0;
    //return g_nRandSeed;
}

// #############################################################################################
/// Function:<summary>
///          	Returns a random real number between 0 and x. The number is always smaller than x.
///          </summary>
///
/// In:		<param name="_v"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    random(_v)
{
    var sign = 1;
    if (_v != 0) 
    {
		if (_v < 0) {
		    sign=-1;
		}
		return (rand() % _v) * sign;
	} 
	return 0;
}


// #############################################################################################
/// Function:<summary>
///          	Returns a random integer number between 0 and x (inclusive when x is an integer).
///          </summary>
///
/// In:		<param name="_v"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    irandom(_v)
{
    return ~~random(_v);		// ~~ casts to an INT
}


// #############################################################################################
/// Function:<summary>
///          	Returns a random real number between x1 (inclusive) and x2 (exclusive).
///          </summary>
///
/// In:		<param name="val0"></param>
///			<param name="val1"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function random_range(val0, val1)
{
    if (val0 == val1) {
        return val0;
    }

    var lower, higher;
    if (val0 > val1) {
        lower = val1;
        higher = val0;
    }
    else {
        lower = val0;
        higher = val1;
    }
    
    var result = lower + (rand() % ((higher - lower) | 0)) + (rand() / (RAND_MAX + 1));
    return result;
}



// #############################################################################################
/// Function:<summary>
///          	Sets the seed (an integer) that is used for the random number generation. 
///             Can be used to repeat the same random sequence. (Note though that also some 
///             actions and the system itself uses random numbers.)
///          </summary>
///
/// In:		<param name="_val"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function    random_set_seed( _val )
{
	//g_nRandSeed = Round(_val);
	MissingFunction("random_set_seed");
}


// #############################################################################################
/// Function:<summary>
///          	Sets the seed to a random number
///          </summary>
// #############################################################################################
function    randomize() 
{
    var d = new Date();
    g_nRandSeed = (g_nRandSeed != 0) ? (d.getMilliseconds() / g_nRandSeed) : d.getMilliseconds();
}


// #############################################################################################
/// Function:<summary>
///          	Returns a random real number between val0 (inclusive) and val1 (inclusive). 
///             Both val0 and val1 must be integer values (otherwise they are rounded down).
///          </summary>
///
/// In:		<param name="val0"></param>
///			<param name="val1"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function irandom_range(val0, val1) 
{
    var lower, higher;
    if (val0 > val1) {
        lower = val1;
        higher = val0;
    }
    else {
        lower = val0;
        higher = val1;
    }

    // '| 0' effectively casts to an integer
    var x1 = lower | 0;
    var x2 = higher | 0;
    var result = x1 + random(x2 - x1 + 1);

    return (result | 0);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the current seed.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function random_get_seed() 
{
    return g_nRandSeed;
}


// #############################################################################################
/// Function:<summary>
///             Returns one of the arguments choosen randomly.
///          </summary>
///
/// In:		 <param name="paramlist">     variable length arguments    </param>
/// Out:	 <returns>
///				One of the arguments chosen at random.
///			 </returns>
// #############################################################################################
function    choose()
{
    var args = choose.arguments;
    var argc = choose.arguments.length;
    var index = Math.floor(random(argc));
    return args[index];
}


// #############################################################################################
/// Function:<summary>
///          	Returns the sign of x 
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				Returns the sign of x (-1, 0 or 1).
///			</returns>
// #############################################################################################
function sign(_x) {
    if( _x==0 ) return 0;
    if( _x<0 ) return -1;
    return 1;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the ceiling of x, that is, x rounded up to an integer.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var ceil = Math.ceil;
/*function ceil(_x) {
	return Math.ceil(_x);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns the fractional part of x, that is, the part behind the decimal dot.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function frac(_x) {
    return _x-~~_x;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the square root of x. x must be non-negative.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var sqrt = Math.sqrt;
/*(_x) 
{
    return Math.sqrt(_x);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns x*x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function sqr(_x) 
{
    return _x*_x;
}

// #############################################################################################
/// Function:<summary>
///          	Returns x to the power n.
///          </summary>
///
/// In:		<param name="_x"></param>
///			<param name="_n"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var power = Math.pow;
/*function power(_x, _n)
{
    return Math.pow(_x, _n);
}*/


// #############################################################################################
/// Function:<summary>
///          	Returns e to the power x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var exp = Math.exp;

// #############################################################################################
/// Function:<summary>
///          	Returns the natural logarithm of x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var ln = Math.log;
/*function ln(_x) 
{    
    return Math.log(_x);
}*/

// #############################################################################################
/// Function: <summary>
///             Returns the log base 2 of x.
///           </summary>
///
/// In:		<param name="_x"></param>
///
// #############################################################################################
function log2(_x) 
{
    return Math.log(_x) / Math.LN2;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the log base 10 of x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function log10(_x) 
{
    return Math.log(_x) / Math.LN10;
}


// #############################################################################################
/// Function:<summary>
///          	Returns the log base n of x.
///          </summary>
///
/// In:		<param name="_n"></param>
///			<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function logn(_n,_x) 
{
    return Math.log(_x) / Math.log(_n);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the inverse sine of x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var arcsin = Math.asin;
/*function arcsin(_x) 
{
    return Math.asin(_x);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns the inverse cosine of x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var arccos = Math.acos;
/*function arccos(_x) 
{
    return Math.acos(_x);
}*/

// #############################################################################################
/// Function:<summary>
///          	Returns the inverse tangent of x.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function arctan(_x) 
{
    return Math.atan(_x);
}

// #############################################################################################
/// Function:<summary>
///          	Calculates arctan(Y/X), and returns an angle in the correct quadrant.
///          </summary>
///
/// In:		<param name="_y"></param>
///			<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
var arctan2 = Math.atan2;
/*function arctan2(_y,_x) 
{
    return Math.atan2(_x);
}*/

// #############################################################################################
/// Function:<summary>
///          	Converts degrees to radians.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function degtorad(_x) {
	return _x * 0.0174532925;
}

// #############################################################################################
/// Function:<summary>
///          	Converts radians to degrees.
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function radtodeg(_x) {
	return _x * 57.2957795;
}

// #############################################################################################
/// Function:<summary>
///          	Returns the average of the values. 
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function mean() 
{
	var args = mean.arguments;
	var argc = mean.arguments.length;
    
    var m = args[0];
    for(var i=1;i<argc;i++){
        m+=args[i];
    }
    return (m/argc);
}

// #############################################################################################
/// Function:<summary>
///          	Returns the median of the values, that is, the middle value. 
///             (When the number of arguments is even, the smaller of the two middle values is 
///             returned.) The function can have up to 16 arguments. They must all be real values.
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function median() {

	var arguments = median.arguments;

    if (arguments.length == 0) {
        return 0;
    }
    // According to the Delphi runner a "Rather stupid implementation"...
    var i, j, result;
    for (i = 0; i < arguments.length; i++)
    {
        var n1 = 0;
        var n2 = 0;
        
        for (j = 0; j < arguments.length; j++)
        {
            if (arguments[j] < arguments[i]) {
                n1 = n1 + 1;
            }
            if (arguments[j] <= arguments[i]) {
                n2 = n2 + 1;
            }
        }
        if ((n1 < (arguments.length / 2)) && (n2 >= (arguments.length / 2))) {
            return arguments[i];
        }
    }
    debug("Error: was not able to successfully find the median value");
    return 0;
}


// #############################################################################################
/// Function:<summary>
///          	normalizes the vectors (x1,y1) and (x2,y2) to unit vectors, and returns the 
///             dot product of these normalized vectors."
///          </summary>
///
/// In:		<param name="_x1"></param>
///			<param name="_y1"></param>
///			<param name="_x2"></param>
///			<param name="_y2"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function dot_product(_x1,_y1,_x2,_y2) 
{
  // Make vertor 1 a UNIT vector
  var mag1 = Sqrt( _x1*_x1   + _y1*_y1 );

  // Make vertor 2 a UNIT vector
  var mag2 = Sqrt( _x2*_x2   + _y2*_y2 );

  // return DOT product
  return  (_x1*_x2  + _y1*_y2) / (mag1*mag2);
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether x is a real value (as opposed to a string).
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function is_real(_x) 
{
    return (typeof(_x) == "number");
}

// #############################################################################################
/// Function:<summary>
///          	Returns whether x is a string (as opposed to a real value).
///          </summary>
///
/// In:		<param name="_x"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function is_string(_x) 
{
    return (typeof(_x) == "string");
}
