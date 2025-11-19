
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yySprite.js
// Created:         19/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 19/02/2011		
// 
// **********************************************************************************************************************


// #############################################################################################
/// Function:<summary>
///             simple rect
///          </summary>
// #############################################################################################
function    YYRECT()
{
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
}

// #############################################################################################
/// Function:<summary>
///             Copy the bounding box
///          </summary>
///
/// In:		 <param name="_bbox">Box to copy</param>
// #############################################################################################
YYRECT.prototype.Copy = function (_bbox) {
	this.left = _bbox.left;
	this.right = _bbox.right;
	this.top = _bbox.top;
	this.bottom = _bbox.bottom;
};

// #############################################################################################
/// Function:<summary>
///             Create a new SPRITE object
///          </summary>
// #############################################################################################
function    yySprite()
{
	//this.DrawSimple = Sprite_Draw_Simple;
	//this.DrawSimplePos = Sprite_Draw_Simple_Pos;
    //this.Draw = Sprite_Draw_Ex;
    //this.GetCollisionChecking = Sprite_GetCollisionChecking;
    //this.GetXOrigin = Sprite_GetXOrigin;
    //this.GetYOrigin = Sprite_GetYOrigin;
    //this.GetCount = Sprite_GetCount;
    //this.GetBoundingBox = Sprite_GetBoundingBox;
    //this.PreciseCollisionPoint = Sprite_PreciseCollisionPoint;
    //this.PreciseCollisionRectangle = Sprite_PreciseCollisionRectangle;
    //this.PreciseCollisionEllipse = Sprite_PreciseCollisionEllipse;
    //this.PreciseCollision = Sprite_PreciseCollision;

    this.pName = "sprite";
	this.width = 16;									// size of the subimages
	this.height = 16;
	this.bbox = new YYRECT;                             // The bounding box
	this.transparent = true;							// Whether transparent
	this.smooth = true;									// Whether to smooth the boundaries
	this.preload = true;								// Whether to preload the texture
	this.bboxmode = 0;									// Bounding box mode (0=automatic, 1=full, 2=manual)
	this.colcheck = false;								// whether to prepare for precise collision checking
	this.xOrigin = 0;								    //origin of the sprite
	this.yOrigin = 0;
	
	this.copy = false; 								// is this a COPY of a sprite (so a custom image)

	this.numb = 0;										// number of subimages
	this.cullRadius = 8;								// cull radius (calculated at load)
	this.maskcreated = false;							// Whether the collision mask was created
	this.sepmasks = false;								// Whether the sub images have individual masks (or all use the same one).
	this.colmask = [];						            // Mask used for precise collision checking
	this.bitmaps = [];						            // the original bitmaps (device independent) in internal format
	this.ppTPE = [];								    // pointer to TPageEntry
	this.Masks = [];                                    // Masks
	
}
yySprite.prototype.GetCollisionChecking = function () { return this.colcheck; };
yySprite.prototype.GetXOrigin = function () { return this.xOrigin; };
yySprite.prototype.GetYOrigin = function () { return this.yOrigin; };
yySprite.prototype.GetBoundingBox = function () { return this.bbox; };
yySprite.prototype.GetCount = function () { return this.numb; };


// #############################################################################################
/// Property: <summary>
///           	Calculate the cull radius
///           </summary>
// #############################################################################################
yySprite.prototype.CalcCullRadius = function () {
	// calculate the cull Radius
	var yorigSQ = (this.yOrigin * this.yOrigin);
	var xorigSQ = (this.xOrigin * this.xOrigin);
	var rorigSQ = (this.width - this.xOrigin) * (this.width - this.xOrigin);
	var borigSQ = (this.height - this.yOrigin) * (this.height - this.yOrigin);
	var TLRadius = ~ ~ceil(sqrt(xorigSQ + yorigSQ));
	var TRRadius = ~ ~ceil(sqrt(rorigSQ + yorigSQ));
	var BLRadius = ~ ~ceil(sqrt(xorigSQ + borigSQ));
	var BRRadius = ~ ~ceil(sqrt(rorigSQ + borigSQ));

	this.cullRadius = yymax(TLRadius, yymax(TRRadius, yymax(BLRadius, BRRadius)));
};


// #############################################################################################
/// Function:<summary>
///          	Un-ByteRun the mask
///          </summary>
///
/// In:		<param name="_pSprite">Sprite we're working on</param>
///			<param name="_mask">Mask index</param>
///				
// #############################################################################################
function DecompressMask(_pSprite, _mask) {

/*	_pSprite = new yySprite();
	_pSprite.Masks = []
	_pSprite.Masks[0] = [];
	_pSprite.Masks[0][0] = 0x01;	// 2 copy
	_pSprite.Masks[0][1] = 0x01;
	_pSprite.Masks[0][2] = 0x02;
	_pSprite.Masks[0][3] = 0x84;	// 5 run
	_pSprite.Masks[0][4] = 0xff;
	_pSprite.Masks[0][5] = 0x84;	// 5 run
	_pSprite.Masks[0][6] = 0x00;
	_pSprite.Masks[0][7] = 0x04;	// 5 copy
	_pSprite.Masks[0][8] = 0x01;
	_pSprite.Masks[0][9] = 0x02;
	_pSprite.Masks[0][10] = 0x03;
	_pSprite.Masks[0][11] = 0x04;
	_pSprite.Masks[0][12] = 0x05;
	_mask = 0;
*/
	
	if (_pSprite.Masks[_mask] != null)
	{
		var m = [];
		var src = 0;
		var dest = 0;
		var d;
		while( src < _pSprite.Masks[_mask].length )
		{
			var runcopy = _pSprite.Masks[_mask][src++];

			if (runcopy & 0x80)
			{
				// if top bit set, RUN
				runcopy = (runcopy & 0x7f) + 1; 			// +1 (we never have 0)
				d = _pSprite.Masks[_mask][src++];			// get "run" value
				for (var v = 0; v < runcopy; v++){			
					m[dest++] = d;							// fill with copied byte
				}
			} 
			else
			{
				// if top bit clear, COPY	
				runcopy++; 									// +1 (we never have 0)
				for (var v = 0; v < runcopy; v++){
					m[dest++] = _pSprite.Masks[_mask][src++];
				}
			}
		}
	}
	_pSprite.Masks[_mask] = m;
}

// #############################################################################################
/// Function:<summary>
///             Create a sprite from the "storage" format.
///          </summary>
///
/// In:		 <param name="_pStore">Storage entry</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    CreateSpriteFromStorage( _pStore )
{
    var pSprite = new yySprite();
    if( _pStore.pName!=undefined ) pSprite.pName = _pStore.pName;
	if( _pStore.width!=undefined ) pSprite.width = _pStore.width;							// size of the subimages
	if( _pStore.height!=undefined ) pSprite.height = _pStore.height;											
	if( _pStore.bboxLeft!=undefined ) pSprite.bbox.left = _pStore.bboxLeft;
	if( _pStore.bboxRight!=undefined ) pSprite.bbox.right = _pStore.bboxRight;
	if( _pStore.bboxTop!=undefined )  pSprite.bbox.top = _pStore.bboxTop;
	if( _pStore.bboxBottom!=undefined ) pSprite.bbox.bottom = _pStore.bboxBottom;
	if( _pStore.transparent!=undefined ) pSprite.transparent = _pStore.transparent;							    // Whether transparent
	if( _pStore.smooth!=undefined ) pSprite.smooth = _pStore.smooth;									// Whether to smooth the boundaries
	if( _pStore.preload!=undefined) pSprite.preload = _pStore.preload;								    // Whether to preload the texture
	if( _pStore.bboxMode!=undefined ) pSprite.bboxmode = _pStore.bboxMode;									// Bounding box mode (0=automatic, 1=full, 2=manual)
	if( _pStore.colCheck!=undefined ) pSprite.colcheck = _pStore.colCheck;								// whether to prepare for precise collision checking
	if( _pStore.xOrigin!=undefined ) pSprite.xOrigin = _pStore.xOrigin;								    //origin of the sprite
	if( _pStore.yOrigin!=undefined ) pSprite.yOrigin = _pStore.yOrigin;		
	pSprite.Masks = null;
	if(_pStore.Masks!=undefined) pSprite.Masks = _pStore.Masks;
	
	pSprite.ppTPE = [];
    for(var i=_pStore.TPEntryIndex.length-1;i>=0;i--){
    	pSprite.ppTPE[i] =   _pStore.TPEntryIndex[i];       // Just use the storage data directly - it's never changed!
    }
	pSprite.numb = pSprite.ppTPE.length;

	pSprite.CalcCullRadius();



	// Copy actual entry, and set Crop width+height as it must be at least 1
	for(var i=0;i<pSprite.ppTPE.length;i++)
	{
	    pSprite.ppTPE[i] = Graphics_GetTextureEntry( pSprite.ppTPE[i] );
        if( pSprite.ppTPE[i].CropWidth==0 ) pSprite.ppTPE[i].CropWidth=1;
        if( pSprite.ppTPE[i].CropHeight==0 ) pSprite.ppTPE[i].CropHeight=1;
	}

	


    // Expand masks
    if( pSprite.Masks )
    {
        for(var i=0;i<_pStore.Masks.length;i++)
        {
        	DecompressMask(pSprite,i);

            pSprite.maskcreated = true;
            var size = pSprite.width * pSprite.height;
            var mask = [];
            mask[size-1] = 0;
            
            
            // unpack the mask
		    var strideM = ((pSprite.width+7)>>3); //8;
		    var offs = 0;
		    for( var y=0; y<pSprite.height; ++y, offs+=strideM)
		    {
			    var m = 0x80;
			    var oM = offs;
			    for(var x=0; x<pSprite.width; ++x, m>>=1) 
			    {
				    if (m==0) 
				    {
					    m=0x80;
					    ++oM;
				    } 
				    mask[x + (y * pSprite.width)] = ((pSprite.Masks[i][oM] & m)!=0);
			    } 
		    } 
            
            
            pSprite.colmask[i] = mask;
        }
    }
    return pSprite;
}





// #############################################################################################
/// Function:<summary>
///             Get the actual sprite data.
///          </summary>
///
/// In:		 <param name="_spr_number">Sprite to get</param>
/// Out:	 <returns>
///				The sprite data or null
///			 </returns>
// #############################################################################################
yySprite.prototype.DrawSimple = function (_sub_image, _x, _y, _alpha) {
	if (this.numb <= 0) return;

	var cullRadius  = this.cullRadius;
	if(((g_roomExtents.top - _y) <= cullRadius ) &&
		  ((_y - g_roomExtents.bottom) <= cullRadius ) &&
		  ((g_roomExtents.left - _x) <= cullRadius ) &&
		  ((_x - g_roomExtents.right) <= cullRadius)) 
	{
		_sub_image = (~ ~_sub_image) % this.numb;
		if (_sub_image < 0) _sub_image = _sub_image + this.numb;

		Graphics_TextureDrawSimple(this.ppTPE[_sub_image], _x-this.xOrigin, _y-this.yOrigin, _alpha);
	}
};


// #############################################################################################
/// Function:<summary>
///				Draws subimage ind of the sprite partially transparent
///          </summary>
///
/// In:		 <param name="ind"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
///			 <param name="xscale"></param>
///			 <param name="yscale"></param>
///			 <param name="angle"></param>
///			 <param name="color"></param>
///			 <param name="alpha"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.Draw = function (_ind, _x, _y, _xscale, _yscale, _angle, _colour, _alpha) {

	if (this.numb <= 0) return; // No images?


	var xcullRadius = abs(this.cullRadius * _xscale);
	var ycullRadius = abs(this.cullRadius * _yscale);

	var cullRadius;
	if (xcullRadius > ycullRadius){
		cullRadius = xcullRadius
	}else{
		cullRadius = ycullRadius;
	}

	if (((g_roomExtents.top - _y) <= cullRadius) &&
		  ((_y - g_roomExtents.bottom) <= cullRadius) &&
		  ((g_roomExtents.left - _x) <= cullRadius) &&
		  ((_x - g_roomExtents.right) <= cullRadius))
	{
		// Index wraps..
		_ind = (~ ~_ind) % this.numb;
		if (_ind < 0) _ind += this.numb;

		_angle = fmod(_angle, 360.0);
		Graphics_TextureDraw(this.ppTPE[_ind], this.xOrigin, this.yOrigin, _x, _y, _xscale, _yscale, _angle * Math.PI / 180.0, _colour, _alpha);
	}
};




// #############################################################################################
/// Function:<summary>
///             Get the actual sprite data.
///          </summary>
///
/// In:		 <param name="_spr_number">Sprite to get</param>
/// Out:	 <returns>
///				The sprite data or null
///			 </returns>
// #############################################################################################
yySprite.prototype.Sprite_DrawSimplePos = function (_sub_image, _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _alpha) {
	if (this.numb <= 0) return;

	_sub_image = (~ ~_sub_image) % this.numb;
	if (_sub_image < 0) _sub_image = _sub_image + this.numb;


	Graphics_TextureDrawPos(this.ppTPE[_sub_image], _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _alpha);
};




// #############################################################################################
/// Function:<summary>
///				Returns whether img1 of the sprite at position (x1,y1), scaled with scalex,scaley 
///				and rotated over angle intersects the point
///          </summary>
///
/// In:		 <param name="img1"></param>
///			 <param name="bb1"></param>
///			 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="scalex"></param>
///			 <param name="scaley"></param>
///			 <param name="angle"></param>
///			 <param name="x"></param>
///			 <param name="y"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.PreciseCollisionPoint = function (_img1, _bb1, _x1, _y1, _scalex, _scaley, _angle, _x, _y) {
	var xx, yy;

	if (!this.maskcreated) return true;             // When no mask it is always true
	if (this.numb <= 0) return false;
	_img1 = _img1 % this.colmask.length;

	if (_img1 < 0) _img1 = _img1 + this.colmask.length;
	if (Math.abs(_angle) < 0.0001)
	{
		xx = Math.floor((_x - _x1) / _scalex + this.xOrigin);
		yy = Math.floor((_y - _y1) / _scaley + this.yOrigin);
	}
	else
	{
		var ss = Math.sin(-_angle * Math.PI / 180.0);
		var cc = Math.cos(-_angle * Math.PI / 180.0);
		xx = Math.floor((cc * (_x - _x1) + ss * (_y - _y1)) / _scalex + this.xOrigin);
		yy = Math.floor((cc * (_y - _y1) - ss * (_x - _x1)) / _scaley + this.yOrigin);
	}

	if ((xx < 0) || (xx >= this.width)) return false;
	if ((yy < 0) || (yy >= this.height)) return false;
	return this.colmask[_img1][xx + (yy * this.width)];
};


// #############################################################################################
/// Function:<summary>
///				Returns whether img1 of the sprite at position (x1,y1), scaled with scale intersects the rectangle
///          </summary>
///
/// In:		 <param name="img1"></param>
///			 <param name="bb1"></param>
///			 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="scalex"></param>
///			 <param name="scaley"></param>
///			 <param name="angle"></param>
///			 <param name="rr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.PreciseCollisionRectangle = function (_img1, _bb1, _x1, _y1, _scalex, _scaley, _angle, _rr) {
	if (!this.maskcreated) return true; 		// When no mask it is always true


	// Correct the subimage
	if (this.numb <= 0) return false;
	_img1 = _img1 % this.colmask.length;
	if (_img1 < 0) { _img1 = _img1 + this.colmask.length; }


	// Compute overlapping bounding box
	var l = yymax(_bb1.left, _rr.left);
	var r = yymin(_bb1.right, _rr.right);
	var t = yymax(_bb1.top, _rr.top);
	var b = yymin(_bb1.bottom, _rr.bottom);


	if ((_scalex == 1) && (_scaley == 1) && (Math.abs(this.angle) < 0.0001))
	{
		// Case without scaling
		for (var i = l; i <= r; i++)
		{
			for (var j = t; j <= b; j++)
			{
				var xx = i - _x1 + this.xOrigin;
				var yy = j - _y1 + this.yOrigin;
				if ((xx < 0) || (xx >= this.w)) continue;
				if ((yy < 0) || (yy >= this.h)) continue;
				if (this.colmask[_img1][xx + (yy * this.w)] == true) return true;
			}
		}
	}
	else
	{
		// Case with scaling and or rotating
		var ss = Math.sin(-_angle * Pi / 180.0);
		var cc = Math.cos(-_angle * Pi / 180.0);
		var onescalex = 1.0 / _scalex;
		var onescaley = 1.0 / _scaley;
		for (var i = l; i <= r; i++)
		{
			for (var j = t; j <= b; j++)
			{
				var xx = Math.floor((cc * (i - _x1) + ss * (j - _y1)) * onescalex + this.xOrigin);
				var yy = Math.floor((cc * (j - _y1) - ss * (i - _x1)) * onescaley + this.yOrigin);
				if ((xx < 0) || (xx >= this.width)) continue;
				if ((yy < 0) || (yy >= this.height)) continue;
				if (this.colmask[_img1][xx + (yy * this.width)]) return true;
			}
		}
	}

	return false;
};


// #############################################################################################
/// Function:<summary>
/// Returns whether img1 of the sprite at position (x1,y1), scaled with scale
/// intersects the ellipse
///          </summary>
///
/// In:		 <param name="img1"></param>
///			 <param name="bb1"></param>
///			 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="scalex"></param>
///			 <param name="scaley"></param>
///			 <param name="angle"></param>
///			 <param name="rr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.PreciseCollisionEllipse = function (_img1, _bb1, _x1, _y1, _scalex, _scaley, _angle, _rr) {
	var i, j;
	if (!this.maskcreated) return true; 		// When no mask it is always true
	if (g_CollisionEllipseCounter > 3)
	{
		g_CollisionEllipseCounter = (1 + g_CollisionEllipseCounter) - 1;
	}

	// Correct the subimage
	if (this.numb <= 0) return false;
	_img1 = _img1 % this.colmask.length;
	if (_img1 < 0) _img1 = _img1 + this.colmask.length;


	// Compute overlapping bounding box
	var l = yymax(_bb1.left, _rr.left);
	var r = yymin(_bb1.right, _rr.right);
	var t = yymax(_bb1.top, _rr.top);
	var b = yymin(_bb1.bottom, _rr.bottom);

	var mx = ((_rr.right + _rr.left) / 2);
	var my = ((_rr.bottom + _rr.top) / 2);
	var ww = 1.0 / ((_rr.right - _rr.left) / 2);
	var hh = 1.0 / ((_rr.bottom - _rr.top) / 2);
	var pMask = this.colmask[_img1];


	if ((_scalex == 1) && (_scaley == 1) && (Math.abs(_angle) < 0.0001))
	{
		// Case without scaling
		for (i = l; i <= r; i++)
		{
			var sqrxx = Sqr((i - mx) * ww);
			var xx = i - _x1 + this.xOrigin;
			if ((xx < 0) || (xx >= this.width)) continue;

			for (j = t; j <= b; j++)
			{
				if (sqrxx + Sqr((j - my) * hh) > 1) continue;   // outside ellipse

				var yy = j - _y1 + this.yOrigin;
				if ((yy < 0) || (yy >= this.height)) continue;

				if (pMask[xx + (yy * this.width)]) return true;
			}
		}
	}
	else
	{
		// Case with scaling
		var ss = Math.sin(-_angle * Math.PI / 180.0);
		var cc = Math.sin(-_angle * Math.PI / 180.0);
		var onescalex = 1.0 / _scalex;
		var onescaley = 1.0 / _scaley;

		for (i = l; i <= r; i++)
		{
			// common loop terms.
			var ix1 = (i - _x1);
			var cc_i_x1 = cc * ix1;
			var ss_i_x1 = ss * ix1;
			var sq1 = Sqr((i - mx) * ww);

			for (j = t; j <= b; j++)
			{
				var jmy = (j - my) * hh;
				if ((sq1 + (jmy * jmy)) > 1) continue;   // outside ellipse

				var j_y1 = j - _y1;
				var xx = ~ ~((cc_i_x1 + ss * j_y1 * onescalex) + this.xOrigin);
				if ((xx < 0) || (xx >= this.width)) continue;

				var yy = ~ ~((cc * j_y1 - ss_i_x1 * onescaley) + this.yOrigin);
				if ((yy < 0) || (yy >= this.height)) continue;

				if (pMask[xx + (yy * this.width)]) return true;
			}
		}
	}

	return false;
};


// #############################################################################################
/// Function:<summary>
///				Returns whether img1 of the sprite at position (x1,y1), scaled with scale1
///				intersects the second sprite inside the bounding boxes
///          </summary>
///
/// In:		 <param name="_img1"></param>
///			 <param name="_bb1"></param>
///			 <param name="_x1"></param>
///			 <param name="_y1"></param>
///			 <param name="_scale1x"></param>
///			 <param name="_scale1y"></param>
///			 <param name="_angle1"></param>
///			 <param name="_spr"></param>
///			 <param name="_img2"></param>
///			 <param name="_bb2"></param>
///			 <param name="_x2"></param>
///			 <param name="_y2"></param>
///			 <param name="_scale2x"></param>
///			 <param name="_scale2y"></param>
///			 <param name="_angle2"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.PreciseCollision = function (_img1, _bb1, _x1, _y1, _scale1x, _scale1y, _angle1, _pSpr, _img2, _bb2, _x2, _y2, _scale2x, _scale2y, _angle2) {
	// Some easy cases
	if (_pSpr == null) return false;

	// Correct the subimage
	if (this.numb <= 0) return false;
	if (_pSpr.numb <= 0) return false;

	if (this.colmask.length > 0) _img1 = _img1 % this.colmask.length; //DCL added if()
	if (_img1 < 0) { _img1 = _img1 + this.colmask.length; ; }
	if (_pSpr.colmask.length > 0) _img2 = _img2 % _pSpr.colmask.length; //DCL added if()
	if (_img2 < 0) { _img2 = _img2 + _pSpr.colmask.length; }


	_scale1x = 1.0 / _scale1x;
	_scale1y = 1.0 / _scale1y;
	_scale2x = 1.0 / _scale2x;
	_scale2y = 1.0 / _scale2y;

	// Compute overlapping bounding box
	var l = yymax(_bb1.left, _bb2.left);
	var r = yymin(_bb1.right, _bb2.right);
	var t = yymax(_bb1.top, _bb2.top);
	var b = yymin(_bb1.bottom, _bb2.bottom);

	// No rotation or scaling.
	if ((_scale1x == 1) && (_scale2x == 1) && (_scale1y == 1) && (_scale2y == 1) && (_angle1 == 0) && (_angle2 == 0))
	{
		for (var i = l; i <= r; i++)
		{
			for (var j = t; j <= b; j++)
			{
				var xx = i - _x1 + this.xOrigin;
				var yy = j - _y1 + this.yOrigin;
				if ((xx < 0) || (xx >= this.width)) continue;
				if ((yy < 0) || (yy >= this.height)) continue;
				if (this.maskcreated)
				{
					if (!this.colmask[_img1][xx + (yy * this.width)]) continue;
				}
				xx = i - _x2 + _pSpr.xOrigin;
				yy = j - _y2 + _pSpr.yOrigin;
				if ((xx < 0) || (xx >= _pSpr.width)) continue;
				if ((yy < 0) || (yy >= _pSpr.height)) continue;
				if (_pSpr.maskcreated)
				{
					if (!_pSpr.colmask[_img2][xx + (yy * _pSpr.width)]) continue;
				}
				return true;
			}
		}
	}
	// Scaling but no rotation
	else if ((_angle1 == 0) && (_angle2 == 0))
	{
		for (var i = l; i <= r; i++)
		{
			for (var j = t; j <= b; j++)
			{
				var xx = Math.floor(((i - _x1) * _scale1x + this.xOrigin));
				var yy = Math.floor(((j - _y1) * _scale1y + this.yOrigin));
				if ((xx < 0) || (xx >= this.width)) continue;
				if ((yy < 0) || (yy >= this.height)) continue;
				if (this.maskcreated)
				{
					if (!this.colmask[_img1][xx + (yy * this.width)]) continue;
				}
				xx = Math.floor(((i - _x2) * _scale2x + _pSpr.xOrigin));
				yy = Math.floor(((j - _y2) * _scale2y + _pSpr.yOrigin));
				if ((xx < 0) || (xx >= _pSpr.width)) continue;
				if ((yy < 0) || (yy >= _pSpr.height)) continue;
				if (_pSpr.maskcreated)
				{
					if (!_pSpr.colmask[_img2][xx + (yy * _pSpr.width)]) continue;
				}
				return true;
			}
		}
	}
	else
	{
		// "Do Everything" case - rotation AND scaling!
		//	    	_angle1 = _angle1 % 360;
		//	    	_angle2 = _angle2 % 360;
		var ss1 = Math.sin(-_angle1 * Pi / 180);
		var cc1 = Math.cos(-_angle1 * Pi / 180);
		var ss2 = Math.sin(-_angle2 * Pi / 180);
		var cc2 = Math.cos(-_angle2 * Pi / 180);

		for (var i = l; i <= r; i++)
		{
			for (var j = t; j <= b; j++)
			{
				var xx = Math.floor(((cc1 * (i - _x1) + ss1 * (j - _y1)) * _scale1x + this.xOrigin));
				var yy = Math.floor(((cc1 * (j - _y1) - ss1 * (i - _x1)) * _scale1y + this.yOrigin));
				if ((xx < 0) || (xx >= this.width)) continue;
				if ((yy < 0) || (yy >= this.height)) continue;

				if (this.maskcreated)
				{
					if (!this.colmask[_img1][xx + (yy * this.width)]) continue;
				}

				xx = Math.floor(((cc2 * (i - _x2) + ss2 * (j - _y2)) * _scale2x + _pSpr.xOrigin));
				yy = Math.floor(((cc2 * (j - _y2) - ss2 * (i - _x2)) * _scale2y + _pSpr.yOrigin));
				if ((xx < 0) || (xx >= _pSpr.width)) continue;
				if ((yy < 0) || (yy >= _pSpr.height)) continue;

				if (_pSpr.maskcreated)
				{
					if (!_pSpr.colmask[_img2][xx + (yy * _pSpr.width)]) continue;
				}
				return true;
			}
		}
	}

	return false;
};



// #############################################################################################
/// Function:<summary>
///				Returns whether img1 of the sprite at position (x1,y1), scaled with scale intersects the line segment
///          </summary>
///
/// In:		 <param name="img1"></param>
///			 <param name="bb1"></param>
///			 <param name="x1"></param>
///			 <param name="y1"></param>
///			 <param name="scalex"></param>
///			 <param name="scaley"></param>
///			 <param name="angle"></param>
///			 <param name="xl"></param>
///			 <param name="yl"></param>
///			 <param name="xr"></param>
///			 <param name="yr"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySprite.prototype.PreciseCollisionLine = function (_img1, _bb1, _x1, _y1, _scalex, _scaley, _angle, _xl, _yl, _xr, _yr) {

	if (!this.maskcreated)
	{
		return true; 		// When no mask it is always true
	}

	// Correct the subimage
	if (this.numb <= 0)
	{
		return false;
	}
	_img1 = _img1 % this.colmask.length;
	if (_img1 < 0)
	{
		_img1 = _img1 + this.colmask.length;
	}


	// Vertical or horizontal or pixel
	if ((_xl == _xr) || (_yl == _yr))
	{
		var rc = new YYRECT();
		rc.left = _xl;
		rc.top = yymin(_yl, _yr);
		rc.right = _xr;
		rc.bottom = yymax(_yl, _yr);

		return this.PreciseCollisionRectangle(_img1, _bb1, _x1, _y1, _scalex, _scaley, _angle, rc);
	}

	var ss = Math.sin(-_angle * Math.PI / 180.0);
	var cc = Math.cos(-_angle * Math.PI / 180.0);


	// Check shallow
	if (Math.abs(_xr - _xl) >= Math.abs(_yr - _yl))
	{
		// make sure line runs from left to right
		if (_xr < _xl)
		{
			var val = _xr;
			_xr = _xl;
			_xl = _val;

			val = _yr;
			_yr = yl;
			_yl = val;
		}

		var dd = (_yr - _yl) / (_xr - _xl);
		// now check the relevant pixels

		for (var i = yymax(_bb1.left, _xl); i <= yymin(_bb1.right, _xr); i++)
		{
			var xx = Math.floor((cc * (i - _x1) + ss * (_yl + (i - _xl) * dd - _y1)) / _scalex + this.xOrigin);
			var yy = Math.floor((cc * (_yl + (i - _xl) * dd - _y1) - ss * (i - _x1)) / _scaley + this.yOrigin);
			if ((xx < 0) || (xx >= this.width)) continue;
			if ((yy < 0) || (yy >= this.height)) continue;
			if (this.colmask[_img1][xx + (yy * this.width)]) return true;
		}
	}
	else
	{
		// make sure line runs from top to bottom
		if (_yr < _yl)
		{
			var val = _yr;
			_yr = _yl;
			_yl = val;

			val = _xr;
			_xr = _xl;
			_xl = val;
		}
		var dd = (_xr - _xl) / (_yr - _yl);

		// now check the relevant pixels
		for (var i = yymax(_bb1.top, _yl); i <= yymin(_bb1.bottom, _yr); i++)
		{
			var xx = Math.floor((cc * (_xl + (i - _yl) * dd - _x1) + ss * (i - _y1)) / _scalex + this.xOrigin);
			var yy = Math.floor((cc * (i - _y1) - ss * (_xl + (i - _yl) * dd - _x1)) / _scaley + this.yOrigin);
			if ((xx < 0) || (xx >= this.width)) continue;
			if ((yy < 0) || (yy >= this.height)) continue;
			if (this.colmask[_img1][xx + (yy * this.width)]) return true;
		}
	}

	return false;
};

















// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    yySpriteManager()
{
    this.Sprites = [];
}



// #############################################################################################
/// Function:<summary>
///             Add a texture to the "pool"
///          </summary>
///
/// In:		 <param name="_name">Name+path of texture to load</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySpriteManager.prototype.AddSprite = function (_pSprite) {
	var n = this.Sprites.length;
	this.Sprites[n] = _pSprite;
	return n;
};


// #############################################################################################
/// Function:<summary>
///             Get the number of sub-images in the selected sprite.
///          </summary>
///
/// In:		 <param name="_spr_number">Sprite to get the sub-image count of</param>
/// Out:	 <returns>
///				The number of sub-images, or 1 if not found
///			 </returns>
// #############################################################################################
yySpriteManager.prototype.GetImageCount = function (_spr_number) {
	with (this)
	{
		if (_spr_number < 0 || _spr_number > Sprites.length) return null;
		return Sprites[_spr_number].ppTPE.length;
	}
};


// #############################################################################################
/// Function:<summary>
///             Get the actual sprite data.
///          </summary>
///
/// In:		 <param name="_spr_number">Sprite to get</param>
/// Out:	 <returns>
///				The sprite data or null
///			 </returns>
// #############################################################################################
yySpriteManager.prototype.Get = function (_spr_number) {
	if (_spr_number < 0 || _spr_number > this.Sprites.length) return null;
	return this.Sprites[_spr_number];
};



// #############################################################################################
/// Function:<summary>
///          	Delete a sprite from the list
///          </summary>
///
/// In:		<param name="_id">sprite to delete</param>
///				
// #############################################################################################
yySpriteManager.prototype.Delete = function(_id) {
	if (this.Sprites[_id] != undefined) this.Sprites[_id] = undefined;
};


