
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:	    	Vector3.js
// Created:	        02/06/2011
// Author:    		Mike
// Project:		    HTML5
// Description:   	Simple Vector3 class
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 02/06/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************

function yyVector3(_newx, _newy, _newz )
{
    this.X = _newx;
    this.Y = _newy;
    this.Z = _newz;
}

// Test Equal
yyVector3.prototype.Equal = function(v2) {
    return this.X == v2.X && this.Y == v2.Y && this.Z == v2.Z;
};

// addition of two Vector3
yyVector3.prototype.Add =function(v2) {
    return new Vector3( this.X+v2.X, this.Y+v2.Y, this.Z+v2.Z );
};
// negation
yyVector3.prototype.Neg = function() {
    return new Vector3( -this.X, -this.Y, -this.Z );
};
// subtraction
yyVector3.prototype.Sub = function(v2) {
    return new Vector3( this.X-v2.X, this.Y-v2.Y, this.Z-v2.Z);
};
// inner ("dot") product
yyVector3.prototype.Dot = function(v2) {
    return this.X * v2.X + this.Y * v2.Y + this.Z * v2.Z;
};

// scalar product
yyVector3.prototype.Scale = function (f) 
{
    return new Vector3( f*v1.X, f*v1.Y, f*v1.Z );
};

// #############################################################################################
/// Function:<summary>
///				Normalise (magnitude set to 1) all the components of this
///			</summary>
// #############################################################################################
yyVector3.prototype.Normalise = function()
{
	var len = 1.0 / Math.sqrt( (X * X) + (Y * Y) + (Z * Z) );

	X = X * len;
	Y = Y * len;
	Z = Z * len;
};



// #############################################################################################
/// Function:<summary>
///				vector cross product, this version returns answer in a parameter
///			</summary>
///
/// In:		<param name="_out">vector cross product result</param>
///			<param name="_v">vector</param>
///
// #############################################################################################
yyVector3.prototype.CrossProduct = function(_pVec )
{
    with(this)
    {
        var x,y,z;
        x = (Y * _pVec.Z) - (Z * _pVec.Y);
        y = (Z * _pVec.X) - (X * _pVec.Z);
        z = (X * _pVec.Y) - (Y * _pVec.X);
        return new Vector3(x,y,z);
    }
};




