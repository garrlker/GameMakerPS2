
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            global.js
// Created:         20/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     variables in "GameGlobals" (rather than yyGlobals), are GML globals, not engine globals.
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 20/02/2011		V1.0        MJD     1st version
// 
// **********************************************************************************************************************


function    yyGameGlobals()
{
    this.m_Arrays = [];

    this.m_Arrays["__view_xview__"] = new yyArray("__view_xview__", 1);
    this.m_Arrays["__view_yview__"] = new yyArray("__view_yview__", 1);
    this.m_Arrays["__view_wview__"] = new yyArray("__view_wview__", 1);
    this.m_Arrays["__view_hview__"] = new yyArray("__view_hview__", 1);
    this.m_Arrays["__view_xport__"] = new yyArray("__view_xport__", 1);
    this.m_Arrays["__view_yport__"] = new yyArray("__view_yport__", 1);
    this.m_Arrays["__view_wport__"] = new yyArray("__view_wport__", 1);
    this.m_Arrays["__view_hport__"] = new yyArray("__view_hport__", 1);
    this.m_Arrays["__view_angle__"] = new yyArray("__view_angle__", 1);
    this.m_Arrays["__view_hborder__"] = new yyArray("__view_hborder__", 1);
    this.m_Arrays["__view_vborder__"] = new yyArray("__view_vborder__", 1);
    this.m_Arrays["__view_hspeed__"] = new yyArray("__view_hspeed__", 1);
    this.m_Arrays["__view_vspeed__"] = new yyArray("__view_vspeed__", 1);
    this.m_Arrays["__view_object__"] = new yyArray("__view_object__", 1);

    this.m_Arrays["__background_visible__"      ] = new yyArray("__background_visible__"   , 1);
    this.m_Arrays["__background_foreground__"   ] = new yyArray("__background_foreground__", 1);
    this.m_Arrays["__background_index__"        ] = new yyArray("__background_index__"     , 1);
    this.m_Arrays["__background_x__"            ] = new yyArray("__background_x__"         , 1);
    this.m_Arrays["__background_y__"            ] = new yyArray("__background_y__"         , 1);
    this.m_Arrays["__background_width__"        ] = new yyArray("__background_width__"     , 1);
    this.m_Arrays["__background_height__"       ] = new yyArray("__background_height__"    , 1);
    this.m_Arrays["__background_htiled__"       ] = new yyArray("__background_htiled__"    , 1);
    this.m_Arrays["__background_vtiled__"       ] = new yyArray("__background_vtiled__"    , 1);
    this.m_Arrays["__background_xscale__"       ] = new yyArray("__background_xscale__"    , 1); 
    this.m_Arrays["__background_yscale__"       ] = new yyArray("__background_yscale__"    , 1); 
    this.m_Arrays["__background_hspeed__"       ] = new yyArray("__background_hspeed__"    , 1); 
    this.m_Arrays["__background_vspeed__"       ] = new yyArray("__background_vspeed__"    , 1); 
    this.m_Arrays["__background_blend__"        ] = new yyArray("__background_blend__"     , 1); 
    this.m_Arrays["__background_alpha__"        ] = new yyArray("__background_alpha__"     , 1);


    this.cursor_sprite = -1;
}

