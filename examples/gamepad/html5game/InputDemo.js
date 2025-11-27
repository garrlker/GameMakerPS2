var JSON_game = {
	Extensions: [],
	Sounds: [
	],
	Sprites: [
	    {
		pName: "sController",
		width: 640, height: 480,
		smooth: false,
		bboxLeft: 80, bboxRight: 559, bboxTop: 41, bboxBottom: 389,		TPEntryIndex: [ 0]
	    },
	    {
		pName: "sButton",
		width: 32, height: 31,
		smooth: false,
		xOrigin: 16,yOrigin: 15,
 bboxRight: 31, bboxBottom: 30,		TPEntryIndex: [ 1]
	    },
	    {
		pName: "sAnalogue",
		width: 62, height: 62,
		smooth: false,
		xOrigin: 31,yOrigin: 31,
 bboxRight: 61, bboxBottom: 61,		TPEntryIndex: [ 2]
	    },
	    {
		pName: "sShoulder",
		width: 49, height: 6,
		smooth: false,
		xOrigin: 23,yOrigin: 1,
 bboxRight: 48, bboxBottom: 5,		TPEntryIndex: [ 3]
	    },
	    {
		pName: "sSelect",
		width: 19, height: 11,
		smooth: false,
		xOrigin: 9,yOrigin: 5,
 bboxRight: 18, bboxBottom: 10,		TPEntryIndex: [ 4]
	    },
	    {
		pName: "sStart",
		width: 18, height: 9,
		smooth: false,
		xOrigin: 5,yOrigin: 4,
 bboxRight: 17, bboxBottom: 8,		TPEntryIndex: [ 5]
	    },
	    {
		pName: "sTrigger",
		width: 78, height: 37,
		smooth: false,
 bboxRight: 77, bboxBottom: 36,		TPEntryIndex: [ 6]
	    },
	    {
		pName: "sStickButton",
		width: 69, height: 68,
		smooth: false,
		xOrigin: 34,yOrigin: 34,
 bboxRight: 68, bboxBottom: 67,		TPEntryIndex: [ 7]
	    }	],
	Backgrounds: [
		null	],
	Paths: [
	],
	Fonts: [
	],
	Timelines: [
	],
	GMObjects: [
		{			pName: "oInput",  spriteIndex: -1,  visible: true,  parent: -100,  DrawEvent: gml_Object_oInput_Draw_0,
 CollisionEvents: [  ]
 },
		{			pName: "oController",  visible: true,  parent: -100,  CollisionEvents: [  ]
 },
		{			pName: "oButton",  spriteIndex: 1,  visible: true,  parent: -100,  CreateEvent: gml_Object_oButton_Create_0,
 StepNormalEvent: gml_Object_oButton_Step_0,
 CollisionEvents: [  ]
 },
		null,
		{			pName: "oAnalogue1",  spriteIndex: 2,  visible: true,  parent: -100,  CreateEvent: gml_Object_oAnalogue1_Create_0,
 DrawEvent: gml_Object_oAnalogue1_Draw_0,
 CollisionEvents: [  ]
 },
		{			pName: "oAnalogue2",  spriteIndex: 2,  visible: true,  parent: -100,  CreateEvent: gml_Object_oAnalogue2_Create_0,
 DrawEvent: gml_Object_oAnalogue2_Draw_0,
 CollisionEvents: [  ]
 },
		{			pName: "oShoulder",  spriteIndex: 3,  visible: true,  parent: -100,  CreateEvent: gml_Object_oShoulder_Create_0,
 StepNormalEvent: gml_Object_oShoulder_Step_0,
 CollisionEvents: [  ]
 },
		{			pName: "oSelect",  spriteIndex: 4,  visible: true,  parent: -100,  CreateEvent: gml_Object_oSelect_Create_0,
 StepNormalEvent: gml_Object_oSelect_Step_0,
 CollisionEvents: [  ]
 },
		{			pName: "oStart",  spriteIndex: 5,  visible: true,  parent: -100,  CreateEvent: gml_Object_oStart_Create_0,
 StepNormalEvent: gml_Object_oStart_Step_0,
 CollisionEvents: [  ]
 },
		{			pName: "oTriggerL",  spriteIndex: 6,  visible: true,  parent: -100,  CreateEvent: gml_Object_oTriggerL_Create_0,
 DrawEvent: gml_Object_oTriggerL_Draw_0,
 CollisionEvents: [  ]
 },
		{			pName: "oTriggerR",  spriteIndex: 6,  visible: true,  parent: -100,  CreateEvent: gml_Object_oTriggerR_Create_0,
 DrawEvent: gml_Object_oTriggerR_Draw_0,
 CollisionEvents: [  ]
 },
		{			pName: "oStickButton",  spriteIndex: 7,  visible: true,  parent: -100,  CreateEvent: gml_Object_oStickButton_Create_0,
 StepNormalEvent: gml_Object_oStickButton_Step_0,
 CollisionEvents: [  ]
 }	],
	GMRooms: [
		{	
			pName:"rm_test",
			width:640,
			height:488,
			speed:60,
			colour:12632256,
			backgrounds:[
				{ },
				{ },
				{ },
				{ },
				{ },
				{ },
				{ },
				{ }			],
			views:[
				{ },
				{ },
				{ },
				{ },
				{ },
				{ },
				{ },
				{ }			],
			pInstances:[
				{ x:0,  y:0,  index:1,  id:100000  },
				{ x:170,  y:5,  index:0,  id:100001  },
				{ x:462,  y:233,  index:2,  id:100002 , pCode: gml_RoomCC_rm_test_2_Create,  },
				{ x:498,  y:198,  index:2,  id:100003 , pCode: gml_RoomCC_rm_test_3_Create,  },
				{ x:427,  y:198,  index:2,  id:100004 , pCode: gml_RoomCC_rm_test_4_Create,  },
				{ x:462,  y:163,  index:2,  id:100005 , pCode: gml_RoomCC_rm_test_5_Create,  },
				{ x:249,  y:268,  index:4,  id:100006  },
				{ x:392,  y:268,  index:5,  id:100007  },
				{ x:177,  y:93,  index:6,  id:100008 , pCode: gml_RoomCC_rm_test_8_Create,  },
				{ x:461,  y:93,  index:6,  id:100009 , pCode: gml_RoomCC_rm_test_9_Create,  },
				{ x:276,  y:198,  index:7,  id:100010 , pCode: gml_RoomCC_rm_test_10_Create,  },
				{ x:360,  y:198,  index:8,  id:100011 , pCode: gml_RoomCC_rm_test_11_Create,  },
				{ x:139,  y:96,  index:9,  id:100012  },
				{ x:423,  y:96,  index:10,  id:100013  },
				{ x:248,  y:268,  index:11,  id:100014 , pCode: gml_RoomCC_rm_test_14_Create,  },
				{ x:391,  y:268,  index:11,  id:100015 , pCode: gml_RoomCC_rm_test_15_Create,  }			],
			tiles:new Array(
			)	
		}		],
	RoomOrder: [0	],
	TPageEntries: [
		{ x:2, y:2, w:480, h:349, XOffset:80, YOffset:41, CropWidth:480, CropHeight:349, ow:640, oh:480, tp:0},
		{ x:70, y:474, w:32, h:31, XOffset:0, YOffset:0, CropWidth:32, CropHeight:31, ow:32, oh:31, tp:0},
		{ x:2, y:430, w:62, h:62, XOffset:0, YOffset:0, CropWidth:62, CropHeight:62, ow:62, oh:62, tp:0},
		{ x:78, y:358, w:49, h:6, XOffset:0, YOffset:0, CropWidth:49, CropHeight:6, ow:49, oh:6, tp:0},
		{ x:486, y:2, w:19, h:11, XOffset:0, YOffset:0, CropWidth:19, CropHeight:11, ow:19, oh:11, tp:0},
		{ x:106, y:474, w:18, h:9, XOffset:0, YOffset:0, CropWidth:18, CropHeight:9, ow:18, oh:9, tp:0},
		{ x:70, y:430, w:78, h:37, XOffset:0, YOffset:0, CropWidth:78, CropHeight:37, ow:78, oh:37, tp:0},
		{ x:2, y:358, w:69, h:68, XOffset:0, YOffset:0, CropWidth:69, CropHeight:68, ow:69, oh:68, tp:0}	],
	Textures: ["Input Demo_texture_0.png"]
};


// #####################################################################################################
// { 
// draw_text(0, 0, "Joystick 1 Button 0: " + string(joystick_check_button(0,0))) 
// draw_text(0, 16, "Joystick 1 Button 1: " + string(joystick_check_button(0,1))) 
// draw_text(0, 32, "Joystick 1 Button 2: " + string(joystick_check_button(0,2))) 
// draw_text(0, 48, "Joystick 1 Button 3: " + string(joystick_check_button(0,3))) 
// draw_text(0, 64, "Joystick 1 Button 4: " + string(joystick_check_button(0,4))) 
// draw_text(0, 80, "Joystick 1 Button 5: " + string(joystick_check_button(0,5))) 
// draw_text(0, 96, "Joystick 1 Button 6: " + string(joystick_check_button(0,6))) 
// draw_text(0, 112, "Joystick 1 Button 7: " + string(joystick_check_button(0,7))) 
// draw_text(0, 128, "Joystick 1 Button 8: " + string(joystick_check_button(0,8))) 
// draw_text(0, 144, "Joystick 1 Button 9: " + string(joystick_check_button(0,9))) 
// draw_text(0, 160, "Joystick 1 Button 10: " + string(joystick_check_button(0,10))) 
// draw_text(0, 176, "Joystick 1 Button 11: " + string(joystick_check_button(0,11))) 
// draw_text(0, 192, "Joystick 1 Button 12: " + string(joystick_check_button(0,12))) 
// draw_text(0, 208, "Joystick 1 Button 13: " + string(joystick_check_button(0,13))) 
// draw_text(0, 224, "Joystick 1 Button 14: " + string(joystick_check_button(0,14))) 
// draw_text(0, 240, "Joystick 1 Button 15: " + string(joystick_check_button(0,15))) 
// draw_text(0, 256, "Joystick 1 Button 16: " + string(joystick_check_button(0,16))) 
//  
// draw_text(320, 0, "X Axis: " + string(joystick_xpos(0))) 
// draw_text(320, 16, "Y Axis: " + string(joystick_ypos(0))) 
// draw_text(320, 32, "Z Axis: " + string(joystick_zpos(0))) 
// draw_text(320, 48, "R Axis: " + string(joystick_rpos(0))) 
// draw_text(320, 64, "U Axis: " + string(joystick_upos(0))) 
// draw_text(320, 80, "V Axis: " + string(joystick_vpos(0))) 
//  
//  
//  
// } 
// 
function gml_Object_oInput_Draw_0( _inst, _other )
{
{
draw_text( 0, 0, ("Joystick 1 Button 0: "+string( joystick_check_button( 0, 0 ) )) );
draw_text( 0, 16, ("Joystick 1 Button 1: "+string( joystick_check_button( 0, 1 ) )) );
draw_text( 0, 32, ("Joystick 1 Button 2: "+string( joystick_check_button( 0, 2 ) )) );
draw_text( 0, 48, ("Joystick 1 Button 3: "+string( joystick_check_button( 0, 3 ) )) );
draw_text( 0, 64, ("Joystick 1 Button 4: "+string( joystick_check_button( 0, 4 ) )) );
draw_text( 0, 80, ("Joystick 1 Button 5: "+string( joystick_check_button( 0, 5 ) )) );
draw_text( 0, 96, ("Joystick 1 Button 6: "+string( joystick_check_button( 0, 6 ) )) );
draw_text( 0, 112, ("Joystick 1 Button 7: "+string( joystick_check_button( 0, 7 ) )) );
draw_text( 0, 128, ("Joystick 1 Button 8: "+string( joystick_check_button( 0, 8 ) )) );
draw_text( 0, 144, ("Joystick 1 Button 9: "+string( joystick_check_button( 0, 9 ) )) );
draw_text( 0, 160, ("Joystick 1 Button 10: "+string( joystick_check_button( 0, 10 ) )) );
draw_text( 0, 176, ("Joystick 1 Button 11: "+string( joystick_check_button( 0, 11 ) )) );
draw_text( 0, 192, ("Joystick 1 Button 12: "+string( joystick_check_button( 0, 12 ) )) );
draw_text( 0, 208, ("Joystick 1 Button 13: "+string( joystick_check_button( 0, 13 ) )) );
draw_text( 0, 224, ("Joystick 1 Button 14: "+string( joystick_check_button( 0, 14 ) )) );
draw_text( 0, 240, ("Joystick 1 Button 15: "+string( joystick_check_button( 0, 15 ) )) );
draw_text( 0, 256, ("Joystick 1 Button 16: "+string( joystick_check_button( 0, 16 ) )) );
draw_text( 320, 0, ("X Axis: "+string( joystick_xpos( 0 ) )) );
draw_text( 320, 16, ("Y Axis: "+string( joystick_ypos( 0 ) )) );
draw_text( 320, 32, ("Z Axis: "+string( joystick_zpos( 0 ) )) );
draw_text( 320, 48, ("R Axis: "+string( joystick_rpos( 0 ) )) );
draw_text( 320, 64, ("U Axis: "+string( joystick_upos( 0 ) )) );
draw_text( 320, 80, ("V Axis: "+string( joystick_vpos( 0 ) )) );
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
//  
//  
// } 
// 
function gml_Object_oButton_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
}
;
}

// #####################################################################################################
// { 
// if(joystick_check_button(0, button)){ 
//   image_blend=c_white; 
// }else{ 
//   image_blend=c_black; 
// } 
//  
// } 
// 
function gml_Object_oButton_Step_0( _inst, _other )
{
{
if (joystick_check_button( 0, _inst.gmlbutton ) > 0.5) {{
_inst.set_imageblend( 16777215 );
}
;}
 else {{
_inst.set_imageblend( 0 );
}
;};
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
// dist = 32 
//  
// } 
// 
function gml_Object_oAnalogue1_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
_inst.gmldist=32;
}
;
}

// #####################################################################################################
// { 
// draw_sprite_ext(sprite_index, -1, x + (dist * joystick_xpos(0)), y + (dist * joystick_ypos(0)), 1, 1, 0, image_blend, 1); 
//  
//  
// } 
// 
function gml_Object_oAnalogue1_Draw_0( _inst, _other )
{
{
draw_sprite_ext( _inst.sprite_index, -1, (_inst.x+(_inst.gmldist*joystick_xpos( 0 ))), (_inst.y+(_inst.gmldist*joystick_ypos( 0 ))), 1, 1, 0, _inst.get_imageblend(), 1 );
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
// dist = 32 
//  
// } 
// 
function gml_Object_oAnalogue2_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
_inst.gmldist=32;
}
;
}

// #####################################################################################################
// { 
// draw_sprite_ext(sprite_index, -1, x + (dist * joystick_upos(0)), y + (dist * joystick_rpos(0)), 1, 1, 0, image_blend, 1); 
//  
//  
// } 
// 
function gml_Object_oAnalogue2_Draw_0( _inst, _other )
{
{
draw_sprite_ext( _inst.sprite_index, -1, (_inst.x+(_inst.gmldist*joystick_upos( 0 ))), (_inst.y+(_inst.gmldist*joystick_rpos( 0 ))), 1, 1, 0, _inst.get_imageblend(), 1 );
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
//  
//  
// } 
// 
function gml_Object_oShoulder_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
}
;
}

// #####################################################################################################
// { 
// if(joystick_check_button(0, button)){ 
//   image_blend=c_white; 
// }else{ 
//   image_blend=c_black; 
// } 
//  
// } 
// 
function gml_Object_oShoulder_Step_0( _inst, _other )
{
{
if (joystick_check_button( 0, _inst.gmlbutton ) > 0.5) {{
_inst.set_imageblend( 16777215 );
}
;}
 else {{
_inst.set_imageblend( 0 );
}
;};
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
//  
//  
// } 
// 
function gml_Object_oSelect_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
}
;
}

// #####################################################################################################
// { 
// if(joystick_check_button(0, button)){ 
//   image_blend=c_white; 
// }else{ 
//   image_blend=c_black; 
// } 
//  
// } 
// 
function gml_Object_oSelect_Step_0( _inst, _other )
{
{
if (joystick_check_button( 0, _inst.gmlbutton ) > 0.5) {{
_inst.set_imageblend( 16777215 );
}
;}
 else {{
_inst.set_imageblend( 0 );
}
;};
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
//  
//  
// } 
// 
function gml_Object_oStart_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
}
;
}

// #####################################################################################################
// { 
// if(joystick_check_button(0, button)){ 
//   image_blend=c_white; 
// }else{ 
//   image_blend=c_black; 
// } 
//  
// } 
// 
function gml_Object_oStart_Step_0( _inst, _other )
{
{
if (joystick_check_button( 0, _inst.gmlbutton ) > 0.5) {{
_inst.set_imageblend( 16777215 );
}
;}
 else {{
_inst.set_imageblend( 0 );
}
;};
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
// dist = 32 
//  
// } 
// 
function gml_Object_oTriggerL_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
_inst.gmldist=32;
}
;
}

// #####################################################################################################
// { 
// var pos; 
// if(joystick_zpos(0) < 0){ 
//   pos = 0 
// }else{ 
//   pos = joystick_zpos(0) / 1; 
// } 
//  
// draw_sprite_part_ext(sprite_index, -1, 0, 0, sprite_width, sprite_height * pos, x, y, 1, 1, c_white, 1) 
//  
// } 
// 
function gml_Object_oTriggerL_Draw_0( _inst, _other )
{
{
var gmlpos;
if ((joystick_zpos( 0 )<0)) {{
gmlpos=0;
}
;}
 else {{
gmlpos=(joystick_zpos( 0 )/1);
}
;};
draw_sprite_part_ext( _inst.sprite_index, -1, 0, 0, _inst.get_sprite_width(), (_inst.get_sprite_height()*gmlpos), _inst.x, _inst.y, 1, 1, 16777215, 1 );
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
// dist = 32 
//  
// } 
// 
function gml_Object_oTriggerR_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
_inst.gmldist=32;
}
;
}

// #####################################################################################################
// { 
// var pos; 
// if(joystick_zpos(0) > 0){ 
//   pos = 0 
// }else{ 
//   pos = (abs(joystick_zpos(0)) / 1) 
// } 
//  
// draw_sprite_part_ext(sprite_index, -1, 0, 0, sprite_width, sprite_height * pos, x, y, 1, 1, c_white, 1) 
//  
//  
// } 
// 
function gml_Object_oTriggerR_Draw_0( _inst, _other )
{
{
var gmlpos;
if ((joystick_zpos( 0 )>0)) {{
gmlpos=0;
}
;}
 else {{
gmlpos=(abs( joystick_zpos( 0 ) )/1);
}
;};
draw_sprite_part_ext( _inst.sprite_index, -1, 0, 0, _inst.get_sprite_width(), (_inst.get_sprite_height()*gmlpos), _inst.x, _inst.y, 1, 1, 16777215, 1 );
}
;
}

// #####################################################################################################
// { 
// image_blend = c_black 
//  
//  
// } 
// 
function gml_Object_oStickButton_Create_0( _inst, _other )
{
{
_inst.set_imageblend( 0 );
}
;
}

// #####################################################################################################
// { 
// if(joystick_check_button(0, button)){ 
//   image_blend=c_white; 
// }else{ 
//   image_blend=c_black; 
// } 
//  
// } 
// 
function gml_Object_oStickButton_Step_0( _inst, _other )
{
{
if (joystick_check_button( 0, _inst.gmlbutton ) > 0.5) {{
_inst.set_imageblend( 16777215 );
}
;}
 else {{
_inst.set_imageblend( 0 );
}
;};
}
;
}

// #####################################################################################################
// button=1;
function gml_RoomCC_rm_test_2_Create( _inst )
{
_inst.gmlbutton=1;
}

// #####################################################################################################
// button=2;
function gml_RoomCC_rm_test_3_Create( _inst )
{
_inst.gmlbutton=2;
}

// #####################################################################################################
// button=3;
function gml_RoomCC_rm_test_4_Create( _inst )
{
_inst.gmlbutton=3;
}

// #####################################################################################################
// button=4;
function gml_RoomCC_rm_test_5_Create( _inst )
{
_inst.gmlbutton=4;
}

// #####################################################################################################
// button = 5;
function gml_RoomCC_rm_test_8_Create( _inst )
{
_inst.gmlbutton=5;
}

// #####################################################################################################
// button = 6;
function gml_RoomCC_rm_test_9_Create( _inst )
{
_inst.gmlbutton=6;
}

// #####################################################################################################
// button = 7;
function gml_RoomCC_rm_test_10_Create( _inst )
{
_inst.gmlbutton=7;
}

// #####################################################################################################
// button = 8;
function gml_RoomCC_rm_test_11_Create( _inst )
{
_inst.gmlbutton=8;
}

// #####################################################################################################
// button = 9;
function gml_RoomCC_rm_test_14_Create( _inst )
{
_inst.gmlbutton=9;
}

// #####################################################################################################
// button = 10;
function gml_RoomCC_rm_test_15_Create( _inst )
{
_inst.gmlbutton=10;
}
