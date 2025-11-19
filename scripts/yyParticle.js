
// **********************************************************************************************************************
//
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
//
// File:			yyParticle.js
// Created:			12/07/2011
// Author:			Mike
// Project:
// Description:
//
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 12/07/2011
//
// **********************************************************************************************************************
var PT_SHAPE_PIXEL		=  0,
	PT_SHAPE_DISK		=  1,
	PT_SHAPE_SQUARE		=  2,
	PT_SHAPE_LINE		=  3,
	PT_SHAPE_STAR		=  4,
	PT_SHAPE_CIRCLE		=  5,
	PT_SHAPE_RING		=  6,
	PT_SHAPE_SPHERE		=  7,
	PT_SHAPE_FLARE		=  8,
	PT_SHAPE_SPARK		=  9,
	PT_SHAPE_EXPLOSION	= 10,
	PT_SHAPE_CLOUD		= 11,
	PT_SHAPE_SMOKE		= 12,
	PT_SHAPE_SNOW		= 13,
	PART_SPRITE_NUMB	= 14,

	COLMODE_ONE			= 0,                 // using just one color
	COLMODE_TWO			= 1,                 // interpolate between two colors
	COLMODE_THREE		= 2,                 // interpolate between three colors
	COLMODE_RGB			= 3,                 // use RGB values
	COLMODE_HSV			= 4,                 // use HSV values
	COLMODE_MIX			= 5,                 // mix two colors values

	// Emitter distributions
	PART_EDISTR_LINEAR         = 0,     // linear distribution type
	PART_EDISTR_GAUSSIAN       = 1,     // Gaussian distribution type
	PART_EDISTR_INVGAUSSIAN    = 2,     // Inverse Gaussian distribution type

	// Emitter shapes
	PART_ESHAPE_RECTANGLE      = 0,     // Rectangular shape
	PART_ESHAPE_ELLIPSE        = 1,     // Ellipse shape
	PART_ESHAPE_DIAMOND        = 2,     // Diamond shape
	PART_ESHAPE_LINE           = 3;     // Line shape


// #############################################################################################
/// Class:<summary>
///          	Create a particle type.
///
///				A particle type describes the shape, color, motion, etc. of a particular kind of particles. 
///				You need to define a particle type only once in the game. After this it can be used in any 
///				particle system in the game. Particle types have a large number of parameters that can be 
///				used to change all aspects of it. Setting these right you can create almost any effect you 
///				like. We will discuss the settings below. 
///          </summary>
// #############################################################################################
function yyParticleType()
{
	this.Reset = ParticleType_ClearClass;
	this.Clear = ParticleType_ClearClass;
	this.Reset();
}

// #############################################################################################
/// Function:<summary>
///          	Reset the actual particle type
///          </summary>
// #############################################################################################
function ParticleType_ClearClass()
{
	this.created = true;						// whether created
	this.sprite = -1;							// sprite used
	this.spriteanim = true;       				// whether to animate the sprite
	this.spritestretch = false;    				// whether to stretch the animation
	this.spriterandom = false;     				// whether to start at a random position
	this.shape = PT_SHAPE_PIXEL;				// particle shape
	this.sizemin = 1.0;							// minimal size
	this.sizemax = 1.0;							// maximal size
	this.sizeincr = 0.0;						// size increment and 
	this.sizerand = 0.0;						// added randomness
	this.xscale = 1.0;							// additional X scale values
	this.yscale = 1.0;							// additional Y scale values
	this.lifemin = 100;							// minimal and maximal life
	this.lifemax = 100;					
	this.steptype = 0;         					// type of particles to be created each step
	this.stepnumber = 0;       					// number of such particles
	this.deathtype = 0;        					// type of particles to be created when dying
	this.deathnumber = 0;      					// number of such particles
	
	this.spmin = 0.0;							// minimal creation speed 
	this.spmax = 0.0;							// maximal creation speed
	this.spincr =0.0;							// speed increment  
	this.sprand = 0.0;							// added randomness
	this.dirmin = 0.0;							// minimal direction 
	this.dirmax = 0.0;							// maximal direction
	this.dirincr = 0.0;							// direction increment 
	this.dirrand = 0.0;							// added randomness
	this.angmin = 0.0;							// minimum angle 
	this.angmax = 0.0;							// maximum angle
	this.angincr = 0.0;							// angle increment  
	this.angrand = 0.0;							// added randomness
	this.angdir=0.0;							// whether to add the direction to the angle
	this.grav = 0.0;                			// gravity per step
	this.gravdir = 270.0;             			// gravity direction
	this.colmode = COLMODE_ONE; 				// color mechanism used
	this.colpar = [];							// (6) color parameters, depending on mode
    this.colpar[0] = clWhite;
    this.colpar[1] = clWhite;
    this.colpar[2] = clWhite;
		
	this.alphastart = 1.0;						//
	this.alphamiddle = 1.0;						// alpha values
	this.alphaend = 1.0;						//

	this.additiveblend = false; ;				// whether to use additive blending
}


// #############################################################################################
/// Class:<summary>
///           An emitter
///        </summary>
// #############################################################################################
function yyEmitter()
{
	this.Clear = Emitter_Reset;
	this.Reset = Emitter_Reset;

	this.Reset();
}

// #############################################################################################
/// Function:<summary>
///          	Clear/intialise the emitter.
///          </summary>
// #############################################################################################
function Emitter_Reset()
{
	this.created = true;		// whether created

	this.number = 0;			// number of particles per step
	this.parttype = 0;			// type of particles	
	this.xmin = 0.0;			// the region in which to create particles
	this.xmax = 0.0; 
	this.ymin = 0.0; 
	this.ymax = 0.0; 

	this.shape = PART_ESHAPE_RECTANGLE;         // shape of the region
	this.posdistr = PART_EDISTR_LINEAR;			// position distribution type
}


// #############################################################################################
/// Function:<summary>
///          	Create a single particle
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyParticle()
{
	this.alive;					// whether still alive
	this.parttype;				// the particle type
	this.age;					// current age
	this.lifetime;				// number of steps to live
	this.x;						// position
	this.y;						
	this.speed;					// speed
	this.dir;					// direction
	this.ang;					// angle
	this.color;					// the current color
	this.alpha;					// current alpha
	this.size;					// the size of the particle
	this.spritestart;			// the starting sprite image
	this.ran; 					// random number for different purposes
};



// #############################################################################################
/// Function:<summary>
///          	Create a whole particle system
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function yyParticleSystem()
{
	this.Clear = ParticleSystem_ClearClass;
	this.Reset = ParticleSystem_ClearClass;
	this.Reset();
}

// #############################################################################################
/// Function:<summary>
///          	Clear/Reset paricle system
///          </summary>
// #############################################################################################
function ParticleSystem_ClearClass()
{
	this.created = false;					// whether created
	
	this.particles = [];							// the particles
	this.emitters = []; 						// the emitters
	
	this.oldtonew = false;					// whether drawing from old to new
	this.depth = 0.0;                		// the depth of the particle system
	this.xdraw = 0.0;						// drawing position
	this.ydraw = 0.0;               
	this.automaticupdate = true;       	 	// whether to update automatically
	this.automaticdraw = true;         	 	// whether to draw automatically
};


// #############################################################################################
/// Function:<summary>
///             Get a random from 0 to 1
///          </summary>
///
/// Out:	 <returns>
///				the random number.
///			 </returns>
// #############################################################################################
function YYRandom(_v) 
{
	var r = rand();
	r = r * (1.0 / (RAND_MAX - 1));
	return r * _v;
}


// #############################################################################################
/// Function:<summary>
///				Generate a random value between the bounds with the indicated distribution
///          </summary>
///
/// In:		 <param name="minval">Min bounds</param>
///			 <param name="maxval">Max bounds</param>
///			 <param name="distr">how the values are distributed between bounds</param>
/// Out:	 <returns>
///				a new random number
///			 </returns>
// #############################################################################################
function	MyRandom(_minval, _maxval, _distr)
{
	var range = _maxval-_minval;
	if ( range <= 0 ) return _minval;

	var xx = 0.0;
	var Result = 0.0;

	switch ( _distr )
	{
		case PART_EDISTR_LINEAR:			Result = _minval + YYRandom(1) * range;
											break;
	
		//Gaussian distribution, SD = 1, cutoff @ +/- 3
		case PART_EDISTR_GAUSSIAN:  
		{
			do { 
				xx = ( YYRandom(1) -0.5 )* 6.0; 
			} 
			while ( ! (exp(-(xx*xx)*0.5) > YYRandom(1) ) );		
			Result = _minval + ((xx+3.0) *  (1.0/6.0) ) * range;
		}
		break;


		//Inverse Gaussian distribution, SD = 1, cutoff @ +/- 3
		case PART_EDISTR_INVGAUSSIAN:  
		{
			do { 
				xx = ( YYRandom(1)-0.5 ) * 6.0;
			} while ( ! (exp(-(xx*xx)*0.5) > YYRandom(1)) );

			if ( xx < 0.0 ) xx += 6.0;
			Result = _minval + (xx* (1.0/6.0)) * range;
		}
		break;

		default:
			Result = _minval + YYRandom(1) * range;
	}

  return Result;
}


// #############################################################################################
/// Function:<summary>
///				Computes the direction and speed from a vector
///          </summary>
///
/// In:		 <param name="h"></param>
///			 <param name="v"></param>
///			 <param name="dir"></param>
///			 <param name="sp"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Vector_To_Direction( _h, _v )
{
	var dir;

	// direction
	if ( _h == 0 )
	{
		if ( _v > 0 ) 
		{
			dir = 270; 
		}
		else if ( _v < 0 ) 
		{ 
			dir = 90; 
		}
		else 
		{ 
			dir = 0; 
		}
	}
	else
	{
		var dd = 180.0*(Math.atan2(_v,_h))/Math.PI;
		if ( dd <= 0 ) { dir = -dd; } else { dir = 360.0-dd; }
	}
	return dir - 360.0*Math.floor(dir/360.0);
}

// #############################################################################################
/// Function:<summary>
///				Computes the "H" component from the speed and direction
///          </summary>
///
/// In:		 <param name="dir"></param>
///			 <param name="sp"></param>
///			 <param name="h"></param>
///			 <param name="v"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Direction_To_Vector_h(_dir, _sp )
{
	return _sp * Math.cos(_dir * Math.PI/180.0);
}
// #############################################################################################
/// Function:<summary>
///				Computes the "V" component from the speed and direction
///          </summary>
///
/// In:		<param name="_dir"></param>
///			<param name="_sp"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function Direction_To_Vector_v(_dir, _sp )
{
	return -_sp * Math.sin(_dir * Math.PI/180.0);
}


// #############################################################################################
/// Function:<summary>
///				Computes the color for the particle
///          </summary>
///
/// In:		 <param name="part"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function Compute_Color(_pParticle)
{
	pPartType = g_ParticleTypes[_pParticle.parttype];
	{
		if (_pParticle.age <= 0 || _pParticle.lifetime <= 0)
		{
			// Create a new color
			switch( pPartType.colmode )
			{
				case COLMODE_ONE: _pParticle.color = pPartType.colpar[0];
									break;
				case COLMODE_TWO: _pParticle.color = pPartType.colpar[0];
									break;
				case COLMODE_THREE: _pParticle.color = pPartType.colpar[0];
									break;
				case COLMODE_RGB:		{
											var r = ~~(MyRandom( pPartType.colpar[0], pPartType.colpar[1], PART_EDISTR_LINEAR));
											var g = ~~(MyRandom( pPartType.colpar[2], pPartType.colpar[3], PART_EDISTR_LINEAR));
											var b = ~~(MyRandom( pPartType.colpar[4], pPartType.colpar[5], PART_EDISTR_LINEAR));
											_pParticle.color =   (r<<16) + (col.g<<8) + col.b;

										}
										break;					
				case COLMODE_HSV:		{
											 var h = ~~(MyRandom( pPartType.colpar[0], pPartType.colpar[1], PART_EDISTR_LINEAR));
											 var s = ~~(MyRandom( pPartType.colpar[2], pPartType.colpar[3], PART_EDISTR_LINEAR));
											 var v = ~~(MyRandom( pPartType.colpar[4], pPartType.colpar[5], PART_EDISTR_LINEAR));
											 //THSV thsv = Color_HSV(h,s,v);
											 _pParticle.color = 0xffffff; //Color_HSVToColor( thsv );
										}
										break;
									case COLMODE_MIX: _pParticle.color = ConvertGMColour( Color_Merge(pPartType.colpar[0], pPartType.colpar[1], YYRandom(1)) );
				                        break;
			}
		}
		else
		{
			// Adapt the color
			switch ( pPartType.colmode )
			{
				case COLMODE_TWO:		{
											var val = _pParticle.age/_pParticle.lifetime;
											if ( val > 1 ) val = 1;
											_pParticle.color =  Color_Merge((pPartType.colpar[0]), (pPartType.colpar[1]), val);
										}
										break;
				case COLMODE_THREE:		{
											var val = 2.0*_pParticle.age/_pParticle.lifetime;
											if (val > 2) val = 2;
											if (val < 1)
											{
												_pParticle.color = Color_Merge(pPartType.colpar[0], pPartType.colpar[1], val);
											}
											else
											{
												_pParticle.color = Color_Merge(pPartType.colpar[1], pPartType.colpar[2], val - 1);
											}
										}
										break;
			}
		}
	}
}


// #############################################################################################
/// Function:<summary>
///				Creates numb particles of the indicated type at the indicated position
///          </summary>
///
/// In:		 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="parttype"></param>
///			 <param name="Result"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function CreateParticle(_x, _y, _parttype )
{
	var Result = new yyParticle;
	
	pParType = g_ParticleTypes[_parttype];
	if( pParType==null || pParType==undefined ) return null;

	Result.alive = true;
	Result.parttype = _parttype;
	Result.x = _x;
	Result.y = _y;
	Result.speed =		MyRandom( pParType.spmin,  pParType.spmax,  0);
	Result.dir =		MyRandom( pParType.dirmin, pParType.dirmax, 0);
	Result.ang =		MyRandom( pParType.angmin, pParType.angmax, 0);
	Result.lifetime =   MyRandom( pParType.lifemin, pParType.lifemax, 0);
	Result.age = 0;
	Result.color = 0xffffff;
		
	Compute_Color(Result);
		
	Result.alpha = pParType.alphastart;
	Result.size = MyRandom( pParType.sizemin, pParType.sizemax, 0);
		
	
	if ( !pParType.spriterandom )
	{
		Result.spritestart = YYRandom(10000);
	}
	else
	{
		Result.spritestart = 0;
	}
	Result.ran = YYRandom(100000);
	return Result;
}


// #############################################################################################
/// Function:<summary>
///				Creates a new particle type and returns its index
///          </summary>
/// Out:	<returns>
///				The partical type index
///			</returns>
// #############################################################################################
function ParticleType_Create()
{
  // find an available index
  var ind = g_ParticleTypes.length;
  g_ParticleTypes[ind] = new yyParticleType();			// also clears to defaults.

  return ind;
}


// #############################################################################################
/// Function:<summary>
///				Destroys the given particle type
///          </summary>
///
/// In:		<param name="ind">Index to destroy</param>
// #############################################################################################
function ParticleType_Destroy(_ind)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return false;
	g_ParticleTypes[_ind] = null;
	return true;
}


// #############################################################################################
/// Function:<summary>
///          	Reset/Clear the partical type
///          </summary>
///
/// In:		<param name="_ind">type to clear</param>
/// Out:	<returns>
///				true for okay, false for error
///			</returns>
// #############################################################################################
function ParticleType_Clear(_ind)
{
	var pPar = g_ParticleTypes[_ind];
	if (pPar == null || pPar == undefined) return false;
	g_ParticleTypes[_ind].Clear();
	return true;
}
// #############################################################################################
/// Function:<summary>
///				Destroys all particle types
///          </summary>
// #############################################################################################
function ParticleType_DestroyAll()
{
	g_ParticleTypes = [];
}


// #############################################################################################
/// Function:<summary>
///				Returns whether the particle type exists
///          </summary>
///
/// In:		<param name="ind">particle index to test</param>
/// Out:	<returns>
///				true for yes, false for no.
///			</returns>
// #############################################################################################
function	ParticleType_Exists(_ind)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return false;

	return true;
}

// #############################################################################################
/// Function:<summary>
///				Sets the shape for the indicated particle type
///          </summary>
///
/// In:		<param name="ind">_particle index to change</param>
///			<param name="shape">Shape to set</param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	ParticleType_Shape(_ind, _shape)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.shape = _shape;
	pPar.sprite = -1;             // No sprite when we have a shape
}


// #############################################################################################
/// Function:<summary>
///          	Sets the sprite for the indicated particle type
///          </summary>
///
/// In:		<param name="_ind">Particle type ti change</param>
///			<param name="_sprite"></param>
///			<param name="_anim"></param>
///			<param name="_stretch"></param>
///			<param name="_rand"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleType_Sprite(_ind, _sprite, _anim, _stretch, _rand)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.sprite = _sprite;
	pPar.spriteanim = _anim;
	pPar.spritestretch = _stretch;
	pPar.spriterandom = _rand;
}

// #############################################################################################
/// Function:<summary>
///				Sets the size for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="sizemin"></param>
///			 <param name="sizemax"></param>
///			 <param name="sizeincr"></param>
///			 <param name="sizerand"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Size(_ind, _sizemin, _sizemax, _sizeincr, _sizerand)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
		
	pPar.sizemin = _sizemin;
	pPar.sizemax = _sizemax;
	pPar.sizeincr = _sizeincr;
	pPar.sizerand = _sizerand;
}


// #############################################################################################
/// Function:<summary>
///				Sets the scaling for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="xscale"></param>
///			 <param name="yscale"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Scale(_ind, _xscale, _yscale)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
	
	pPar.xscale = _xscale;
	pPar.yscale = _yscale;
}


// #############################################################################################
/// Function:<summary>
///				Sets the life time for the indicated particle type
///          </summary>
///
/// In:		<param name="ind"></param>
///			<param name="lifemin"></param>
///			<param name="lifemax"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	ParticleType_Life(_ind, _lifemin, _lifemax)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
	
	pPar.lifemin = _lifemin;
	pPar.lifemax = _lifemax;
}

// #############################################################################################
/// Function:<summary>
///				Sets the step creation particles for the indicated particle type
///          </summary>
///
/// In:		<param name="ind"></param>
///			<param name="stepnumber"></param>
///			<param name="steptype"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	ParticleType_Step(_ind, _stepnumber, _steptype)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
	
	pPar.stepnumber = _stepnumber;
	pPar.steptype = _steptype;
}


// #############################################################################################
/// Function:<summary>
///				Sets the death creation particles for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="deathnumber"></param>
///			 <param name="deathtype"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Death(_ind, _deathnumber, _deathtype)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
	
	pPar.deathnumber = _deathnumber;
	pPar.deathtype = _deathtype;
}

// #############################################################################################
/// Function:<summary>
///				Sets the speed for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="spmin"></param>
///			 <param name="spmax"></param>
///			 <param name="spincr"></param>
///			 <param name="sprand"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Speed(_ind, _spmin, _spmax, _spincr, _sprand)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;
	
	pPar.spmin = _spmin;
	pPar.spmax = _spmax;
	pPar.spincr = _spincr;
	pPar.sprand = _sprand; 
}


// #############################################################################################
/// Function:<summary>
///				Sets the direction for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="dirmin"></param>
///			 <param name="dirmax"></param>
///			 <param name="dirincr"></param>
///			 <param name="dirrand"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Direction(_ind, _dirmin, _dirmax, _dirincr, _dirrand)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.dirmin = _dirmin;
	pPar.dirmax = _dirmax;
	pPar.dirincr = _dirincr;
	pPar.dirrand = _dirrand;
}


// #############################################################################################
/// Function:<summary>
///				Sets the angle for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="angmin"></param>
///			 <param name="angmax"></param>
///			 <param name="angincr"></param>
///			 <param name="angrand"></param>
///			 <param name="angdir"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleType_Orientation(_ind, _angmin, _angmax, _angincr, _angrand,_angdir)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.angmin = _angmin;
	pPar.angmax = _angmax;
	pPar.angincr = _angincr;
	pPar.angrand = _angrand;
	pPar.angdir = _angdir;
}

// #############################################################################################
/// Function:<summary>
///				Sets the gravity for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="grav"></param>
///			 <param name="gravdir"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  ParticleType_Gravity(_ind, _grav, _gravdir)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.grav = _grav;
	pPar.gravdir = _gravdir;
}


// #############################################################################################
/// Function:<summary>
///				Sets an RGB color for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="rmin"></param>
///			 <param name="rmax"></param>
///			 <param name="gmin"></param>
///			 <param name="gmax"></param>
///			 <param name="bmin"></param>
///			 <param name="bmax"></param>
///				
// #############################################################################################
function ParticleType_Colour_RGB(_ind, _rmin, _rmax, _gmin, _gmax, _bmin, _bmax)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_RGB;
	pPar.colpar[0] = _rmin;
	pPar.colpar[1] = _rmax;
	pPar.colpar[2] = _gmin;
	pPar.colpar[3] = _gmax;
	pPar.colpar[4] = _bmin;
	pPar.colpar[5] = _bmax;
}


// #############################################################################################
/// Function:<summary>
///				Sets the color for the indicated particle to a random mix of the 2 colours
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="col1"></param>
///			 <param name="col2"></param>
///				
// #############################################################################################
function  ParticleType_Colour_Mix( _ind, _col1, _col2 )
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_MIX;
	pPar.colpar[0] = ConvertGMColour(_col1);
	pPar.colpar[1] = ConvertGMColour(_col2);
}


// #############################################################################################
/// Function:<summary>
///				Sets an HSV color for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="hmin"></param>
///			 <param name="hmax"></param>
///			 <param name="smin"></param>
///			 <param name="smax"></param>
///			 <param name="vmin"></param>
///			 <param name="vmax"></param>
///				
// #############################################################################################
function	ParticleType_Colour_HSV(_ind, _hmin, _hmax, _smin, _smax, _vmin, _vmax)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_HSV;
	pPar.colpar[0] = _hmin;
	pPar.colpar[1] = _hmax;
	pPar.colpar[2] = _smin;
	pPar.colpar[3] = _smax;
	pPar.colpar[4] = _vmin;
	pPar.colpar[5] = _vmax;
}


// #############################################################################################
/// Function:<summary>
///				Sets the color for the indicated particle type using 1 color
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="colstart"></param>
///				
// #############################################################################################
function ParticleType_Color1(_ind, _colstart)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_ONE;
	pPar.colpar[0] = ConvertGMColour(_colstart);
}



// #############################################################################################
/// Function:<summary>
///				Sets the color for the indicated particle type using 1 color
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="colstart"></param>
///			 <param name="_colend"></param>
///				
// #############################################################################################
function	ParticleType_Color2( _ind, _colstart, _colend)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_TWO;
	pPar.colpar[0] = ConvertGMColour(_colstart);
	pPar.colpar[1] = ConvertGMColour(_colend);
}


// #############################################################################################
/// Function:<summary>
///				Sets the color for the indicated particle type using 1 color
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="colstart"></param>
///			 <param name="_colmiddle"></param>
///			 <param name="_colend"></param>
///				
// #############################################################################################
function	ParticleType_Color3( _ind, _colstart, _colmiddle, _colend)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.colmode = COLMODE_ONE;
	pPar.colpar[0] = ConvertGMColour(_colstart);
	pPar.colpar[1] = ConvertGMColour(_colmiddle);
	pPar.colpar[2] = ConvertGMColour(_colend);
}


// #############################################################################################
/// Function:<summary>
///				Sets the alpha transparency for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="alphastart"></param>
///				
// #############################################################################################
function	ParticleType_Alpha1(_ind, _alphastart)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.alphastart = _alphastart;
	pPar.alphamiddle = _alphastart;
	pPar.alphaend = _alphastart;
}


// #############################################################################################
/// Function:<summary>
///				Sets the alpha transparency for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="alphastart"></param>
///			 <param name="alphaend"></param>
///				
// #############################################################################################
function	ParticleType_Alpha2(_ind, _alphastart, _alphaend)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.alphastart = _alphastart;
	pPar.alphamiddle = (_alphastart+_alphaend)/2.0;
	pPar.alphaend = _alphaend;
}


// #############################################################################################
/// Function:<summary>
///				Sets the alpha transparency for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="alphastart"></param>
///			 <param name="alphamiddle"></param>
///			 <param name="alphaend"></param>
///				
// #############################################################################################
function	ParticleType_Alpha3(_ind, _alphastart, _alphamiddle, _alphaend)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.alphastart = _alphastart;
	pPar.alphamiddle = _alphamiddle;
	pPar.alphaend = _alphaend;
}

// #############################################################################################
/// Function:<summary>
///				Sets whether to use additive blending for the indicated particle type
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="additive"></param>
///				
// #############################################################################################
function	ParticleType_Blend(_ind, _additive)
{
	var pPar = g_ParticleTypes[_ind];
	if( pPar == null || pPar==undefined ) return;

	pPar.additiveblend = _additive;
}



// #############################################################################################
/// Function:<summary>
///				Creates an emitter, returning its index
///          </summary>
///
/// In:		 <param name="_ps"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Emitter_Create(_ps)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return -1;

	var ind = pPartSys.emitters.length;
	pPartSys.emitters[ind] = new yyEmitter();
	return ind;
}


// #############################################################################################
/// Function:<summary>
///				Destroys emitter ind in particle system ps
///          </summary>
///
/// In:		<param name="_ps"></param>
///			<param name="ind"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_Emitter_Destroy(_ps, _ind)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return false;

	pPartSys.emitters[_ind] = null;
	return true;
}


// #############################################################################################
/// Function:<summary>
///				Destroys all emmiters in particle system ps
///          </summary>
///
/// In:		<param name="_ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_Emitter_DestroyAll(_ps)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;

	pPartSys.emitters = [];
	return true;
}


// #############################################################################################
/// Function:<summary>
///				Returns whether the emitter exists
///          </summary>
///
/// In:		<param name="_ps"></param>
///			<param name="_ind"></param>
/// Out:	<returns>
///				true for yes, false for no...
///			</returns>
// #############################################################################################
function	ParticleSystem_Emitter_Exists(_ps, _ind)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return false;
	
	return true;	
}


// #############################################################################################
/// Function:<summary>
///				Clears emitter ind in particle system ps
///          </summary>
///
/// In:		<param name="ps"></param>
///			<param name="ind"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	ParticleSystem_Emitter_Clear(_ps, _ind)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return false;
	 
	pEmitter.Reset();
}



// #############################################################################################
/// Function:<summary>
///				Sets the region for the emitter
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="ind"></param>
///			 <param name="xmin"></param>
///			 <param name="xmax"></param>
///			 <param name="ymin"></param>
///			 <param name="ymax"></param>
///			 <param name="shape"></param>
///			 <param name="posdistr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Emitter_Region(_ps, _ind, _xmin, _xmax, _ymin, _ymax, _shape, _posdistr)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return;


    pEmitter.xmin = _xmin;
    pEmitter.xmax = _xmax;
    pEmitter.ymin = _ymin;
    pEmitter.ymax = _ymax;
    pEmitter.shape = _shape;
    pEmitter.posdistr = _posdistr;
}


// #############################################################################################
/// Function:<summary>
///				Bursts number particles of the indicated type from the emitter
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="ind"></param>
///			 <param name="ptype"></param>
///			 <param name="numb"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Emitter_Burst(_ps, _ind, _ptype, _numb)
{
	if ( _numb < 0 )
	{
	    // Cast to an integer
	    var rand = YYRandom(-_numb) | 0;
		if (rand == 0)
		{
			_numb = 1;
		}else{
			return;
		}
	}

	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return;


	for (var i = 0; i <= _numb - 1; i++)
	{
		var	xx,yy;
		var brk = false;

		while( brk==false )
		{
			xx = MyRandom(0.0, 1.0, pEmitter.posdistr);
			yy = MyRandom(0.0, 1.0, pEmitter.posdistr);
			if ( ( pEmitter.posdistr == PART_EDISTR_INVGAUSSIAN) && (pEmitter.shape != PART_ESHAPE_LINE) )
			{
				if ( YYRandom() < 0.5 ){
					xx = MyRandom(0.0, 1.0, 0);
				}else{
					yy = MyRandom(0.0, 1.0, 0);
				}
			}


			switch ( pEmitter.shape )
			{
				case PART_ESHAPE_RECTANGLE:		brk = true; break;														
				
				case PART_ESHAPE_ELLIPSE:		if ( (Sqr(xx-0.5)+Sqr(yy-0.5)) <= Sqr(0.5) ) brk = true; break;		
				case PART_ESHAPE_DIAMOND:		if ( (Math.abs(xx-0.5)+Math.abs(yy-0.5)) <= 0.5 ) brk = true; break;		
				case PART_ESHAPE_LINE:			brk = true; break;
				default: 
					brk = true; break;
			}
		}

		if ( pEmitter.shape==PART_ESHAPE_LINE )
		{
			ParticleSystem_Particles_Create(_ps,pEmitter.xmin + (pEmitter.xmax-pEmitter.xmin)*xx,pEmitter.ymin + (pEmitter.ymax-pEmitter.ymin)*xx,_ptype,1);
		}
		else
		{
			ParticleSystem_Particles_Create(_ps,pEmitter.xmin + (pEmitter.xmax-pEmitter.xmin)*xx,pEmitter.ymin + (pEmitter.ymax-pEmitter.ymin)*yy,_ptype,1);
		}
	}
}



// #############################################################################################
/// Function:<summary>
///				Stream numb particles of the indicate type from the emitter
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="ind"></param>
///			 <param name="ptype"></param>
///			 <param name="_numb"></param>
///				
// #############################################################################################
function	ParticleSystem_Emitter_Stream( _ps, _ind, _ptype, _numb)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	
	var pEmitter = pPartSys.emitters[_ind];
	if( pEmitter==null || pEmitter==undefined ) return;

	pEmitter.number = _numb;
	pEmitter.parttype = _ptype;
}


// #############################################################################################
/// Function:<summary>
///				Creates numb particles of the indicated type at the indicated position
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="parttype"></param>
///			 <param name="numb"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Particles_Create( _ps, _x, _y, _parttype, _numb) {
	_numb = ~~_numb;
	_parttype = ~ ~_parttype;

	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	
	var pParType = g_ParticleTypes[_parttype];
	if( pParType == null || pParType==undefined ) return false;



	for(var i=0; i<_numb; i++)
	{
		var index = pPartSys.particles.length;
		pPartSys.particles[index] =  CreateParticle( _x , _y , _parttype );
	}
}

// #############################################################################################
/// Function:<summary>
///				Creates numb particles of the indicated type at the indicated position
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="parttype"></param>
///			 <param name="numb"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Particles_Create_Color( _ps, _x, _y, _parttype, _col, _numb)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	
	var pParType = g_ParticleTypes[_parttype];
	if( pParType == null || pParType==undefined ) return false;



	for(var i=1; i<=_numb ; i++)
	{
		var index = pPartSys.particles.length;
		pPartSys.particles[index] =  CreateParticle( _x , _y , _parttype );
		pPartSys.particles[index].color = ConvertGMColour(_col);
	}
}


// #############################################################################################
/// Function:<summary>
//				Removes all particles
///          </summary>
///
/// In:		 <param name="ps"></param>
///				
// #############################################################################################
function	ParticleSystem_Particles_Clear(_ps)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;

	pPartSys.particles = [];
	return true;
}



// #############################################################################################
/// Function:<summary>
//				Removes all particles
///          </summary>
///
/// In:		 <param name="ps"></param>
///				
// #############################################################################################
function	ParticleSystem_Particles_Delete(_pParticles, _index)
{
	pParticles.splice(_index,1);	
}


// #############################################################################################
/// Function:<summary>
////			Returns the number of particles
///          </summary>
///
/// In:		<param name="ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function	ParticleSystem_Particles_Count( _ps )
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return 0 ;

	return pPartSys.particles.count;
}


// #############################################################################################
/// Function:<summary>
///				Creates a new particle system and returns its index
///          </summary>
///
/// Out:	<returns>
///				ID of the new particle system
///			</returns>
// #############################################################################################
function	ParticleSystem_Create()
{
  var index = g_ParticleSystems.length;
  g_ParticleSystems[index] = new yyParticleSystem();
  g_ParticleSystems[index].Clear();

  return index;
}


// #############################################################################################
/// Function:<summary>
///          	Returns whether the particle system exists
///          </summary>
///
/// In:		<param name="_ps"></param>
/// Out:	<returns>
///				true for yes, false for no.
///			</returns>
// #############################################################################################
function	ParticleSystem_Exists( _ps )
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return false;
	return true;
}



// #############################################################################################
/// Function:<summary>
///				Destroys the indicated particle system
///          </summary>
///
/// In:		<param name="ps"></param>
/// Out:	<returns>
///				true for destroyed, false for error.
///			</returns>
// #############################################################################################
function  ParticleSystem_Destroy( _ps )
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	g_ParticleSystems[_ps] = null;
	return true;
}


// #############################################################################################
/// Function:<summary>
///				Destroys all particle systems
///          </summary>
// #############################################################################################
function ParticleSystem_DestroyAll()
{
	g_ParticleSystems = [];
}


// #############################################################################################
/// Function:<summary>
///          	Clear a particle system out.
///          </summary>
///
/// In:		<param name="_ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_Clear( _ps )
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
	pPartSys.Clear();
}

// #############################################################################################
/// Function:<summary>
///          	Clear all particle systems out.
///          </summary>
///
/// In:		<param name="_ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_ClearParticles()
{
    for (var ps in g_ParticleSystems) 
    {
        var pPartSys = g_ParticleSystems[ps];
	    if (pPartSys) {	    
            pPartSys.particles = [];
        }
    }
}


// #############################################################################################
/// Function:<summary>
///				Sets the drawing order for the particle system
///          </summary>
///
/// In:		<param name="ps"></param>
///			<param name="oldtonew"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_DrawOrder(_ps, _oldtonew) 
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	pPartSys.oldtonew = _oldtonew;
}

// #############################################################################################
/// Function:<summary>
///				Sets the depth for the particle system
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="depth"></param>
///				
// #############################################################################################
function ParticleSystem_Depth(_ps, _depth)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	pPartSys.depth = _depth;
}


// #############################################################################################
/// Function:<summary>
///				Sets the drawing position for the particle system
///          </summary>
///
/// In:		 <param name="ps"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	ParticleSystem_Position(_ps, _x, _y)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	pPartSys.xdraw = _x;
	pPartSys.ydraw = _y;
}


// #############################################################################################
/// Function:<summary>
///				Sets whether to use automatic updating for the particle system
///          </summary>
///
/// In:		<param name="_ps"></param>
///			<param name="_automatic"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_AutomaticUpdate( _ps, _automatic)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	pPartSys.automaticupdate = _automatic;
}

// #############################################################################################
/// Function:<summary>
///          	Sets whether to use automatic drawing for the particle system
///          </summary>
///
/// In:		<param name="_ps"></param>
///			<param name="_automatic"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_AutomaticDraw(_ps, _automatic)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;

	pPartSys.automaticdraw = _automatic;
}




// #############################################################################################
/// Function:<summary>
///          	
///          </summary>
///
/// In:		<param name="ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function HandleLife( _ps )
{
	var i = 0;
	var numb = 0;
	var ind = 0;

	var pPartSys = g_ParticleSystems[_ps];
	var pParticles = pPartSys.particles;	
	i = 0;
	while( i<pParticles.length )
	{
			
		var pParticle = pParticles[i];
		var pParType = g_ParticleTypes[ pParticle.parttype ];

		// Update the age and create death particles
		pParticle.age++;
			
		if ( pParticle.age >= pParticle.lifetime )			// change this to a check with 0... and count age down.
		{
			numb = pParType.deathnumber;
			if ( numb<0 ){
				if ( YYRandom(-numb) == 0 ) numb = 1;
			}
			if  ( numb > 0 ){
				ParticleSystem_Particles_Create( _ps, pParticle.x, pParticle.y, pParType.deathtype, numb);
			}
			pParticles.splice(i,1);	// remove particle
		}else{	
			// Create step particles
			numb = pParType.stepnumber;
			if ( numb<0 ){
				if ( YYRandom(-numb) == 0 ) numb = 1;
			}
			if ( numb > 0 ){
				ParticleSystem_Particles_Create(_ps, pParticle.x, pParticle.y, pParType.steptype,numb);
			}
		
			i++;		// next particle. Dont do if we deleted one, because SPLICE moves them all down...
		}
	}
}



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_ps"></param>
///				
// #############################################################################################
function HandleMotion( _ps )
{
	var i = 0;
	var j = 0;
	var hspeed = 0.0;
	var vspeed = 0.0;
	var h2 = 0.0;
	var v2 = 0.0;
	var ah = 0.0;
	var av = 0.0;
	var adist = 0.0;
	var hspeedtemp = 0.0;
	var vspeedtemp = 0.0;
	var rd = 0.0;
	var rs = 0.0;

	var pPartSys = g_ParticleSystems[_ps];
	var pParticles = pPartSys.particles;	
	for( i=0; i<pParticles.length; i++)
	{
		var pParticle = pParticles[i];
		var pParType = g_ParticleTypes[ pParticle.parttype ];
	
		// adapt speed and direction and angle
		pParticle.speed = pParticle.speed + pParType.spincr;
		if ( pParticle.speed < 0 ) pParticle.speed = 0;
		pParticle.dir = pParticle.dir + pParType.dirincr;
		pParticle.ang = pParticle.ang + pParType.angincr;
		hspeedtemp = 0;
		vspeedtemp = 0;


		if ( (pParType.grav != 0) || (pPartSys.acount > 0) )
		{
			hspeed = Direction_To_Vector_h( pParticle.dir,pParticle.speed );
			vspeed = Direction_To_Vector_v( pParticle.dir,pParticle.speed );

			// apply gravity
			if (pParType.grav != 0)
			{
				h2 = Direction_To_Vector_h( pParType.gravdir,pParType.grav );
				v2 = Direction_To_Vector_v( pParType.gravdir,pParType.grav );
				hspeed = hspeed + h2;
				vspeed = vspeed + v2;
			}

			// adapt the speed and direction
			pParticle.dir = Vector_To_Direction(hspeed,vspeed ); 
			pParticle.speed = Math.sqrt(hspeed*hspeed + vspeed*vspeed);
		}


		// deal with random additions
		rd = ((pParticle.age+3*pParticle.ran) % 24)/6.0;
		if ( rd > 2.0 ) rd = 4.0-rd;
		rd = rd-1.0;

		rs = ((pParticle.age+4*pParticle.ran) % 20)/5.0;
		if ( rs > 2.0 ) { rs = 4.0-rs; }
		rs = rs-1.0;

		hspeed = Direction_To_Vector_h(pParticle.dir+rd * pParType.dirrand,pParticle.speed+rs * pParType.sprand);
		vspeed = Direction_To_Vector_v(pParticle.dir+rd * pParType.dirrand,pParticle.speed+rs * pParType.sprand);
		pParticle.x = pParticle.x + hspeed + hspeedtemp;
		pParticle.y = pParticle.y + vspeed + vspeedtemp;
	}
}


// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="ps"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function  HandleShape(_ps)
{
	var pPartSys = g_ParticleSystems[_ps];
	var pParticles = pPartSys.particles;	
	
	for(var i=0 ; i<pParticles.length; i++ )
	{
		var pParticle = pParticles[i];
		var pParType = g_ParticleTypes[ pParticle.parttype ];
		
		
		// adapt the size
		pParticle.size = pParticle.size + pParType.sizeincr;
		if ( pParticle.size < 0 ) { pParticle.size = 0; }
		
		
		// adapt the color
		Compute_Color( pParticle );
		
		
		// handle alpha blending
		var passed;
		if ( pParticle.lifetime > 0 ) { 
			passed = 2.0 * pParticle.age/pParticle.lifetime; 
		} else { 
			passed = 1; 
		}
		
		if ( passed < 1 ){
			pParticle.alpha = pParType.alphastart*(1-passed) + pParType.alphamiddle*passed;
		}else{
			pParticle.alpha = pParType.alphamiddle*(2-passed) + pParType.alphaend*(passed-1);
		}
	}
}



// #############################################################################################
/// Function:<summary>
///				Does a time step, updating all the particles and emitters
///          </summary>
///
/// In:		<param name="_ps"></param>
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function ParticleSystem_Update(_ps)
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return 0 ;

	HandleLife(_ps);
	HandleMotion(_ps);
	HandleShape(_ps);

  // Create new particles
	var pEmitters = pPartSys.emitters;
	for (var i=0 ; i<pEmitters.length ; i++ )
	{
		if( pEmitters[i].number != 0)
		{
			ParticleSystem_Emitter_Burst(_ps, i, pEmitters[i].parttype, pEmitters[i].number);
		}
	}
}


// #############################################################################################
/// Function:<summary>
///				Does a time step for all particle systems, updating all the particles and emitters
///          </summary>
///
/// Out:	<returns>
///				
///			</returns>
// #############################################################################################
function  ParticleSystem_UpdateAll()
{
	for (var i=0; i<g_ParticleSystems.length; i++ )
	{
		var pPartSys = g_ParticleSystems[i];
		if (pPartSys != null)
		{
			if (pPartSys.automaticupdate)
			{
				ParticleSystem_Update(i);
			}
		}
	}
}



// #############################################################################################
/// Function:<summary>
///				Draws a particle
///          </summary>
///
/// In:		 <param name="part"></param>
///			 <param name="xoff"></param>
///			 <param name="yoff"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function	DrawParticle(_pParticle, _xoff, _yoff)
{
	var spr= null;
	var pTexture=null;

	if ( _pParticle.lifetime <= 0 ) return;
	var pParType = g_ParticleTypes[ _pParticle.parttype ];


	spr = g_pSpriteManager.Get( pParType.sprite );
	if( spr == null )
	{
		var shape = pParType.shape;
		if ( (shape >= 0) && (shape < PART_SPRITE_NUMB) )
		{
			pTexture = g_ParticleTextures[ shape ];		// get pTPE
		}
		else{
			return; // illegal shape.
		}
	}


	var n ;

	// If a default particle, then no animation for it, just draw it.
	if( pTexture!=null ){
		

	}else{
		if ( spr.num <= 0 ) return;

		if ( !pParType.spriteanim )
		{
			n = _pParticle.spritestart;
		}
		else if ( pParType.spritestretch )
		{
			n = _pParticle.spritestart + (spr.numb * _pParticle.age/_pParticle.lifetime);
		}
		else
		{
			n = _pParticle.spritestart + _pParticle.age;
		}
	}

	// adapt to random angle
	var r = ((_pParticle.age+2*_pParticle.ran) % 16)/4.0;
	if ( r > 2.0 ) r = 4.0-r;
	r = r-1.0;

	var aa = _pParticle.ang;
	if ( pParType.angdir ) aa = aa + _pParticle.dir;
	aa = aa + r*pParType.angrand;


	// adapt to random size
	r = ((_pParticle.age+_pParticle.ran) % 16)/4.0;
	if ( r > 2.0 ) r = 4.0-r;
	r = r-1.0;

	var s = _pParticle.size + r*pParType.sizerand;



	// If a built in particle, make it right here...
	if( pTexture!=null )
	{
		var xscale,yscale,ang;
		var xsc = pParType.xscale*s;
		var ysc = pParType.yscale*s;
		var rot = aa;

		var _X = ~~(_pParticle.x+_xoff);
		var _Y = ~~(_pParticle.y+_yoff);

		if( xsc==1 && ysc==1 && rot == 0 && _pParticle.color==0xffffff ){
			Graphics_TextureDrawSimple( pTexture,_pParticle.alpha);
		} else
		{
			//debug("X=" + _X + ",Y=" + _Y + ",  xsc=" + xsc + ",ysc=" + ysc + ",  rot=" + rot + ",  col=" + _pParticle.color + ",  a=" + _pParticle.alpha);
			Graphics_TextureDraw(pTexture, 0,0, _X,_Y, xsc,ysc,rot, _pParticle.color, _pParticle.alpha );
		}
	}else{
		// If a user supplied particle, call via sprite handler to draw it.
		spr.Draw( n,	_pParticle.x+_xoff,_pParticle.y+_yoff, 
						g_ParticleTypes[_pParticle.parttype].xscale*s, g_ParticleTypes[_pParticle.parttype].yscale*s,
						aa,
						_pParticle.color,
						_pParticle.alpha
				);		
	}
}




// #############################################################################################
/// Function:<summary>
///				Draws the particles on the canvas at the indicated offset
///          </summary>
///
/// In:		 <param name="ps"></param>
///
// #############################################################################################
function ParticleSystem_Draw( _ps )
{
	var pPartSys = g_ParticleSystems[_ps];
	if( pPartSys ==null || pPartSys==undefined ) return;
		

	var pParticles = pPartSys.particles;
	if ( pPartSys.oldtonew )
	{
		for (var i = 0; i < pPartSys.particles.length; i++)
		{
			DrawParticle( pParticles[i], pPartSys.xdraw, pPartSys.ydraw );
		}
	}
	else
	{
		for(var i=pPartSys.particles.length-1 ; i >= 0 ; i-- )
		{
			DrawParticle( pParticles[i], pPartSys.xdraw, pPartSys.ydraw );
		}
	}
}




// #############################################################################################
/// Function:<summary>
///				Draws all particle system with depth equal to d
///          </summary>
///
/// In:		 <param name="d">Depth to draw</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function ParticleSystem_DrawDepth(_d)
{
	for(var i=0 ; i<g_ParticleSystems.length; i++)
	{
		var pPartSys = g_ParticleSystems[i];

		if (pPartSys != null)
		{
			if (pPartSys.automaticdraw)
			{
				if (Math.abs(pPartSys.depth - _d) < 0.01) ParticleSystem_Draw(i);
			}
		}
	}
}




// #############################################################################################
/// Function:<summary>
///				Returns the largest depth of a particle system
///          </summary>
///
/// Out:	 <returns>
///				the largest depth
///			 </returns>
// #############################################################################################
function  ParticleSystem_LargestDepth()
{
	var	Result = -1000000000;

	for(var i=0 ; i<g_ParticleSystems.length; i++ )
	{
		var pPartSys = g_ParticleSystems[i];
		if (pPartSys != null && pPartSys.particles.length>0)
		{
			if (pPartSys.automaticdraw) 
			{
				if (pPartSys.depth > Result) Result = pPartSys.depth;
			}
		}
	}
	return Result;
}



// #############################################################################################
/// Function:<summary>
///				Returns the largest depth smaller than d of a particle system
///          </summary>
///
/// In:		 <param name="d">Depth the start from</param>
/// Out:	 <returns>
///				Next depth
///			 </returns>
// #############################################################################################
function ParticleSystem_NextDepth(_d)
{
	var Result = -1000000000;

	for(var i=0 ; i<g_ParticleSystems.length; i++ )
	{
		var pPartSys = g_ParticleSystems[i];
		if (pPartSys != null && pPartSys.particles.length>0)
		{
			if (pPartSys.automaticdraw)
			{
				if ((pPartSys.depth > Result) && (pPartSys.depth < _d)) Result = pPartSys.depth;
			}
		}
	}

	return Result;
}
