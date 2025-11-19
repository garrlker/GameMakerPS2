

// #############################################################################################
/// Function:<summary>
///             Our object class
///          </summary>
///
/// In:		 <param name="objectnumber">Object number</param>
///			 <param name="name">Name of the object</param>
// #############################################################################################
function    yyObject( _objectnumber, _name )
{
    this.Flags = 0;
    this.ID = _objectnumber;							// object ID
    this.Name = _name;								// object name
    this.SpriteMask = -1;                           // index of the mask sprite
    this.SpriteIndex = 0;                           // index of the sprite used
    this.Depth = 0;                                 // depth of the object
    this.Solid = false;
    this.Visible = false;
    this.Persistent = false;
    this.ParentID = 0;                              // index of the parent
    this.pParent = null;

    this.ManagerIndex = -1;                          // the index int the manager
    
    this.Instances = new yyList();                   // list of all the objects instances
    this.Instances_Recursive = new yyList();         // recursive (parent) instance lists
    this.Instances.packing = true;
    this.Instances_Recursive.packing = true;

	this.ObjAlarm = [];
	for(var a=0;a<MAXTIMER;a++){
	    this.ObjAlarm[a]=null;
	}

	this.ObjKeyDown = [];
	this.ObjKeyPressed = [];
	this.ObjKeyReleased = [];
    this.Collisions = [];
    this.Event = [];
    this.REvent = [];
   }

yyObject.prototype.GetPool = function () { return this.Instances.pool; };
yyObject.prototype.GetRPool = function () { return this.Instances_Recursive.pool; };


// #############################################################################################
/// Function:<summary>
///             Create an object from its "loaded" data
///          </summary>
///
/// In:		 <param name="_ID"></param>
///			 <param name="_pObjectStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    CreateObjectFromStorage( _ID, _pObjectStorage )
{
    var pObj = new yyObject( _ID, _pObjectStorage.pName );
    with(pObj)
    {
        if( _pObjectStorage.spriteIndex!=undefined ) SpriteIndex = _pObjectStorage.spriteIndex;
	    if( _pObjectStorage.visible!=undefined ) Visible = _pObjectStorage.visible;
        if( _pObjectStorage.solid!=undefined ) Solid = _pObjectStorage.solid;
        if( _pObjectStorage.depth!=undefined ) Depth = _pObjectStorage.depth;
        if( _pObjectStorage.persistent!=undefined ) Persistent = _pObjectStorage.persistent;
        if( _pObjectStorage.parent!=undefined ) ParentID = _pObjectStorage.parent;
        if( _pObjectStorage.spritemask!=undefined ) SpriteMask = _pObjectStorage.spritemask;
        
        
        
        if( _pObjectStorage.CreateEvent) { pObj.CreateEvent =  _pObjectStorage.CreateEvent; pObj.Event[EVENT_CREATE] = true;  }
        if( _pObjectStorage.DestroyEvent){ pObj.DestroyEvent = _pObjectStorage.DestroyEvent; pObj.Event[EVENT_DESTROY] = true; }
        
        if( _pObjectStorage.StepBeginEvent) {pObj.StepBeginEvent = _pObjectStorage.StepBeginEvent;        pObj.Event[EVENT_STEP_BEGIN] = true; }
        if( _pObjectStorage.StepNormalEvent) {pObj.StepNormalEvent = _pObjectStorage.StepNormalEvent;     pObj.Event[EVENT_STEP_NORMAL] = true; }
        if( _pObjectStorage.StepEndEvent) {pObj.StepEndEvent = _pObjectStorage.StepEndEvent;              pObj.Event[EVENT_STEP_END] = true; }
        
        if( _pObjectStorage.DrawEvent) {pObj.DrawEvent = _pObjectStorage.DrawEvent; pObj.Event[EVENT_DRAW] = true; }

        if( _pObjectStorage.NoButtonPressed) {pObj.NoButtonPressed = _pObjectStorage.NoButtonPressed;       pObj.Event[EVENT_MOUSE_NOBUTTON] = true; }
        if( _pObjectStorage.LeftButtonDown) {pObj.LeftButtonDown = _pObjectStorage.LeftButtonDown;          pObj.Event[EVENT_MOUSE_LBUTTON_DOWN] = true; }
        if( _pObjectStorage.RightButtonDown)  {pObj.RightButtonDown = _pObjectStorage.RightButtonDown;      pObj.Event[EVENT_MOUSE_RBUTTON_DOWN] = true; }
        if( _pObjectStorage.MiddleButtonDown)  {pObj.MiddleButtonDown = _pObjectStorage.MiddleButtonDown;   pObj.Event[EVENT_MOUSE_MBUTTON_DOWN] = true; }
        if( _pObjectStorage.LeftButtonPressed) {pObj.LeftButtonPressed = _pObjectStorage.LeftButtonPressed;         pObj.Event[EVENT_MOUSE_LBUTTON_PRESSED] = true; }
        if( _pObjectStorage.RightButtonPressed)  {pObj.RightButtonPressed = _pObjectStorage.RightButtonPressed;     pObj.Event[EVENT_MOUSE_RBUTTON_PRESSED] = true; }
        if( _pObjectStorage.MiddleButtonPressed)  {pObj.MiddleButtonPressed = _pObjectStorage.MiddleButtonPressed;  pObj.Event[EVENT_MOUSE_MBUTTON_PRESSED] = true; }
        if( _pObjectStorage.LeftButtonReleased)  {pObj.LeftButtonReleased = _pObjectStorage.LeftButtonReleased;       pObj.Event[EVENT_MOUSE_LBUTTON_RELEASED] = true; }
        if( _pObjectStorage.RightButtonReleased)  {pObj.RightButtonReleased = _pObjectStorage.RightButtonReleased;    pObj.Event[EVENT_MOUSE_RBUTTON_RELEASED] = true; }
        if( _pObjectStorage.MiddleButtonReleased)  {pObj.MiddleButtonReleased = _pObjectStorage.MiddleButtonReleased; pObj.Event[EVENT_MOUSE_MBUTTON_RELEASED] = true; }

        if( _pObjectStorage.GlobalLeftButtonDown) {pObj.GlobalLeftButtonDown = _pObjectStorage.GlobalLeftButtonDown;          pObj.Event[EVENT_MOUSE_GLOBAL_LBUTTON_DOWN] = true; }
        if( _pObjectStorage.GlobalRightButtonDown)  {pObj.GlobalRightButtonDown = _pObjectStorage.GlobalRightButtonDown;      pObj.Event[EVENT_MOUSE_GLOBAL_RBUTTON_DOWN] = true; }
        if( _pObjectStorage.GlobalMiddleButtonDown)  {pObj.GlobalMiddleButtonDown = _pObjectStorage.GlobalMiddleButtonDown;   pObj.Event[EVENT_MOUSE_GLOBAL_MBUTTON_DOWN] = true; }
        if( _pObjectStorage.GlobalLeftButtonPressed) {pObj.GlobalLeftButtonPressed = _pObjectStorage.GlobalLeftButtonPressed; pObj.Event[EVENT_MOUSE_GLOBAL_LBUTTON_PRESSED] = true; }
        if( _pObjectStorage.GlobalRightButtonPressed)  {pObj.GlobalRightButtonPressed = _pObjectStorage.GlobalRightButtonPressed;     pObj.Event[EVENT_MOUSE_GLOBAL_RBUTTON_PRESSED] = true; }
        if( _pObjectStorage.GlobalMiddleButtonPressed)  {pObj.GlobalMiddleButtonPressed = _pObjectStorage.GlobalMiddleButtonPressed;  pObj.Event[EVENT_MOUSE_GLOBAL_MBUTTON_PRESSED] = true; }
        if( _pObjectStorage.GlobalLeftButtonReleased)  {pObj.GlobalLeftButtonReleased = _pObjectStorage.GlobalLeftButtonReleased;         pObj.Event[EVENT_MOUSE_GLOBAL_LBUTTON_RELEASED] = true; }
        if( _pObjectStorage.GlobalRightButtonReleased)  {pObj.GlobalRightButtonReleased = _pObjectStorage.GlobalRightButtonReleased;    pObj.Event[EVENT_MOUSE_GLOBAL_RBUTTON_RELEASED] = true; }
        if( _pObjectStorage.GlobalMiddleButtonReleased)  {pObj.GlobalMiddleButtonReleased = _pObjectStorage.GlobalMiddleButtonReleased; pObj.Event[EVENT_MOUSE_GLOBAL_MBUTTON_RELEASED] = true; }

        if( _pObjectStorage.MouseEnter) {pObj.MouseEnter = _pObjectStorage.MouseEnter;       pObj.Event[EVENT_MOUSE_ENTER] = true; }
        if( _pObjectStorage.MouseLeave) {pObj.MouseLeave = _pObjectStorage.MouseLeave;       pObj.Event[EVENT_MOUSE_LEAVE] = true; }

        if( _pObjectStorage.OutsideEvent)       {pObj.OutsideEvent =  _pObjectStorage.OutsideEvent;            pObj.Event[EVENT_OTHER_OUTSIDE] = true; }
        if( _pObjectStorage.BoundaryEvent)      {pObj.BoundaryEvent = _pObjectStorage.BoundaryEvent;           pObj.Event[EVENT_OTHER_BOUNDARY] = true; }
        if( _pObjectStorage.StartGameEvent)     {pObj.StartGameEvent = _pObjectStorage.StartGameEvent;         pObj.Event[EVENT_OTHER_STARTGAME] = true; }
        if( _pObjectStorage.EndGameEvent)       {pObj.EndGameEvent = _pObjectStorage.EndGameEvent;             pObj.Event[EVENT_OTHER_ENDGAME] = true; } 
        if( _pObjectStorage.StartRoomEvent)     {pObj.StartRoomEvent = _pObjectStorage.StartRoomEvent;         pObj.Event[EVENT_OTHER_STARTROOM] = true; }
        if( _pObjectStorage.EndRoomEvent)       {pObj.EndRoomEvent = _pObjectStorage.EndRoomEvent;             pObj.Event[EVENT_OTHER_ENDROOM] = true; }
        if( _pObjectStorage.NoLivesEvent)       {pObj.NoLivesEvent = _pObjectStorage.NoLivesEvent;             pObj.Event[EVENT_OTHER_NOLIVES] = true; }
        if( _pObjectStorage.AnimationEndEvent)  {pObj.AnimationEndEvent = _pObjectStorage.AnimationEndEvent;   pObj.Event[EVENT_OTHER_ANIMATIONEND] = true; }
        if( _pObjectStorage.EndOfPathEvent)     {pObj.EndOfPathEvent = _pObjectStorage.EndOfPathEvent;         pObj.Event[EVENT_OTHER_ENDOFPATH] = true; }
        if( _pObjectStorage.NoHealthEvent)      {pObj.NoHealthEvent = _pObjectStorage.NoHealthEvent;           pObj.Event[EVENT_OTHER_NOHEALTH] = true; }
        if( _pObjectStorage.CloseButtonEvent)   {pObj.CloseButtonEvent = _pObjectStorage.CloseButtonEvent;     pObj.Event[EVENT_OTHER_CLOSEBUTTON] = true; }
        if( _pObjectStorage.OutsideView0Event)  {pObj.OutsideView0Event = _pObjectStorage.OutsideView0Event;   pObj.Event[EVENT_OTHER_OUTSIDE_VIEW0] = true; }
        if( _pObjectStorage.BoundaryView0Event) {pObj.BoundaryView0Event = _pObjectStorage.BoundaryView0Event; pObj.Event[EVENT_OTHER_BOUNDARY_VIEW0] = true; }


        if( _pObjectStorage.UserEvent0) {pObj.UserEvent0 = _pObjectStorage.UserEvent0; pObj.Event[EVENT_OTHER_USER0] = true; }
        if( _pObjectStorage.UserEvent1) {pObj.UserEvent1 = _pObjectStorage.UserEvent1; pObj.Event[EVENT_OTHER_USER1] = true; }
        if( _pObjectStorage.UserEvent2) {pObj.UserEvent2 = _pObjectStorage.UserEvent2; pObj.Event[EVENT_OTHER_USER2] = true; }
        if( _pObjectStorage.UserEvent3) {pObj.UserEvent3 = _pObjectStorage.UserEvent3; pObj.Event[EVENT_OTHER_USER3] = true; }
        if( _pObjectStorage.UserEvent4) {pObj.UserEvent4 = _pObjectStorage.UserEvent4; pObj.Event[EVENT_OTHER_USER4] = true; }
        if( _pObjectStorage.UserEvent5) {pObj.UserEvent5 = _pObjectStorage.UserEvent5; pObj.Event[EVENT_OTHER_USER5] = true; }
        if( _pObjectStorage.UserEvent6) {pObj.UserEvent6 = _pObjectStorage.UserEvent6; pObj.Event[EVENT_OTHER_USER6] = true; }
        if( _pObjectStorage.UserEvent7) {pObj.UserEvent7 = _pObjectStorage.UserEvent7; pObj.Event[EVENT_OTHER_USER7] = true; }
        if( _pObjectStorage.UserEvent8) {pObj.UserEvent8 = _pObjectStorage.UserEvent8; pObj.Event[EVENT_OTHER_USER8] = true; }
        if( _pObjectStorage.UserEvent9) {pObj.UserEvent9 = _pObjectStorage.UserEvent9; pObj.Event[EVENT_OTHER_USER9] = true; }
        if( _pObjectStorage.UserEvent10) {pObj.UserEvent10 = _pObjectStorage.UserEvent10; pObj.Event[EVENT_OTHER_USER10] = true; }
        if( _pObjectStorage.UserEvent11) {pObj.UserEvent11 = _pObjectStorage.UserEvent11; pObj.Event[EVENT_OTHER_USER11] = true; }
        if( _pObjectStorage.UserEvent12) {pObj.UserEvent12 = _pObjectStorage.UserEvent12; pObj.Event[EVENT_OTHER_USER12] = true; }
        if( _pObjectStorage.UserEvent13) {pObj.UserEvent13 = _pObjectStorage.UserEvent13; pObj.Event[EVENT_OTHER_USER13] = true; }
        if( _pObjectStorage.UserEvent14) {pObj.UserEvent14 = _pObjectStorage.UserEvent14; pObj.Event[EVENT_OTHER_USER14] = true; }
        if( _pObjectStorage.UserEvent15) {pObj.UserEvent15 = _pObjectStorage.UserEvent15; pObj.Event[EVENT_OTHER_USER15] = true; }

        if (_pObjectStorage.WebImageLoadedEvent) { pObj.WebImageLoadedEvent = _pObjectStorage.WebImageLoadedEvent; pObj.Event[EVENT_OTHER_WEB_IMAGE_LOAD] = true; }
        if (_pObjectStorage.WebSoundLoadedEvent) { pObj.WebSoundLoadedEvent = _pObjectStorage.WebSoundLoadedEvent; pObj.Event[EVENT_OTHER_WEB_SOUND_LOAD] = true; }
 
        if( _pObjectStorage.ObjAlarm0) {pObj.ObjAlarm[0] = _pObjectStorage.ObjAlarm0;  pObj.Event[EVENT_ALARM_0] = true; }
        if( _pObjectStorage.ObjAlarm1) {pObj.ObjAlarm[1] = _pObjectStorage.ObjAlarm1;  pObj.Event[EVENT_ALARM_1] = true; }
        if( _pObjectStorage.ObjAlarm2) {pObj.ObjAlarm[2] = _pObjectStorage.ObjAlarm2;  pObj.Event[EVENT_ALARM_2] = true; }
        if( _pObjectStorage.ObjAlarm3) {pObj.ObjAlarm[3] = _pObjectStorage.ObjAlarm3;  pObj.Event[EVENT_ALARM_3] = true; }
        if( _pObjectStorage.ObjAlarm4) {pObj.ObjAlarm[4] = _pObjectStorage.ObjAlarm4;  pObj.Event[EVENT_ALARM_4] = true; }
        if( _pObjectStorage.ObjAlarm5) {pObj.ObjAlarm[5] = _pObjectStorage.ObjAlarm5;  pObj.Event[EVENT_ALARM_5] = true; }
        if( _pObjectStorage.ObjAlarm6) {pObj.ObjAlarm[6] = _pObjectStorage.ObjAlarm6;  pObj.Event[EVENT_ALARM_6] = true; }
        if( _pObjectStorage.ObjAlarm7) {pObj.ObjAlarm[7] = _pObjectStorage.ObjAlarm7;  pObj.Event[EVENT_ALARM_7] = true; }
        if( _pObjectStorage.ObjAlarm8) {pObj.ObjAlarm[8] = _pObjectStorage.ObjAlarm8;  pObj.Event[EVENT_ALARM_8] = true; }
        if( _pObjectStorage.ObjAlarm9) {pObj.ObjAlarm[9] = _pObjectStorage.ObjAlarm9;  pObj.Event[EVENT_ALARM_9] = true; }
        if( _pObjectStorage.ObjAlarm10) {pObj.ObjAlarm[10] = _pObjectStorage.ObjAlarm10; pObj.Event[EVENT_ALARM_10] = true; }
        if( _pObjectStorage.ObjAlarm11) {pObj.ObjAlarm[11] = _pObjectStorage.ObjAlarm11; pObj.Event[EVENT_ALARM_11] = true; }
        
        
        // Keyboard Pressed events (horrible but here we go....)
        //if( _pObjectStorage.KeyPressed_)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_] = _pObjectStorage.KeyPressed_; pObj.Event[GML_EVENT_KEYPRESS_] = true; }
        if( _pObjectStorage.KeyPressed_NOKEY)  { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NOKEY] = _pObjectStorage.KeyPressed_NOKEY; pObj.Event[GML_EVENT_KEYPRESS_NOKEY] = true; }
        if( _pObjectStorage.KeyPressed_ANYKEY)      { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_ANYKEY] = _pObjectStorage.KeyPressed_ANYKEY; pObj.Event[GML_EVENT_KEYPRESS_ANYKEY] = true; }
        if( _pObjectStorage.KeyPressed_BACKSPACE){ pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_BACKSPACE] = _pObjectStorage.KeyPressed_BACKSPACE; pObj.Event[GML_EVENT_KEYPRESS_BACKSPACE] = true; }
        if( _pObjectStorage.KeyPressed_TAB)      { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_TAB] = _pObjectStorage.KeyPressed_TAB; pObj.Event[GML_EVENT_KEYPRESS_TAB] = true; }
        if( _pObjectStorage.KeyPressed_ENTER)    { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_ENTER] = _pObjectStorage.KeyPressed_ENTER; pObj.Event[GML_EVENT_KEYPRESS_ENTER] = true; }
        if( _pObjectStorage.KeyPressed_SHIFT )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_SHIFT ] = _pObjectStorage.KeyPressed_SHIFT ; pObj.Event[GML_EVENT_KEYPRESS_SHIFT ] = true; }
        if( _pObjectStorage.KeyPressed_CTRL  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_CTRL  ] = _pObjectStorage.KeyPressed_CTRL  ; pObj.Event[GML_EVENT_KEYPRESS_CTRL  ] = true; }
        if( _pObjectStorage.KeyPressed_ALT   )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_ALT   ] = _pObjectStorage.KeyPressed_ALT   ; pObj.Event[GML_EVENT_KEYPRESS_ALT   ] = true; }
        if( _pObjectStorage.KeyPressed_PAUSE )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_PAUSE ] = _pObjectStorage.KeyPressed_PAUSE ; pObj.Event[GML_EVENT_KEYPRESS_PAUSE ] = true; }
        if( _pObjectStorage.KeyPressed_ESCAPE)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_ESCAPE] = _pObjectStorage.KeyPressed_ESCAPE; pObj.Event[GML_EVENT_KEYPRESS_ESCAPE] = true; }
        if( _pObjectStorage.KeyPressed_SPACE )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_SPACE ] = _pObjectStorage.KeyPressed_SPACE ; pObj.Event[GML_EVENT_KEYPRESS_SPACE ] = true; }

        if( _pObjectStorage.KeyPressed_PAGEUP  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_PAGEUP  ] = _pObjectStorage.KeyPressed_PAGEUP  ; pObj.Event[GML_EVENT_KEYPRESS_PAGEUP  ] = true; }
        if( _pObjectStorage.KeyPressed_PAGEDOWN)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_PAGEDOWN] = _pObjectStorage.KeyPressed_PAGEDOWN; pObj.Event[GML_EVENT_KEYPRESS_PAGEDOWN] = true; }
        if( _pObjectStorage.KeyPressed_END     )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_END     ] = _pObjectStorage.KeyPressed_END     ; pObj.Event[GML_EVENT_KEYPRESS_END     ] = true; }
        if( _pObjectStorage.KeyPressed_HOME    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_HOME    ] = _pObjectStorage.KeyPressed_HOME    ; pObj.Event[GML_EVENT_KEYPRESS_HOME    ] = true; }
        if( _pObjectStorage.KeyPressed_LEFT    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_LEFT    ] = _pObjectStorage.KeyPressed_LEFT    ; pObj.Event[GML_EVENT_KEYPRESS_LEFT    ] = true; }
        if( _pObjectStorage.KeyPressed_UP      )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_UP      ] = _pObjectStorage.KeyPressed_UP      ; pObj.Event[GML_EVENT_KEYPRESS_UP      ] = true; }
        if( _pObjectStorage.KeyPressed_RIGHT   )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_RIGHT   ] = _pObjectStorage.KeyPressed_RIGHT   ; pObj.Event[GML_EVENT_KEYPRESS_RIGHT   ] = true; }
        if( _pObjectStorage.KeyPressed_DOWN    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_DOWN    ] = _pObjectStorage.KeyPressed_DOWN    ; pObj.Event[GML_EVENT_KEYPRESS_DOWN    ] = true; }
        if( _pObjectStorage.KeyPressed_INSERT  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_INSERT  ] = _pObjectStorage.KeyPressed_INSERT  ; pObj.Event[GML_EVENT_KEYPRESS_INSERT  ] = true; }
        if( _pObjectStorage.KeyPressed_DELETE  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_DELETE  ] = _pObjectStorage.KeyPressed_DELETE  ; pObj.Event[GML_EVENT_KEYPRESS_DELETE  ] = true; }

        if( _pObjectStorage.KeyPressed_0) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_0] = (_pObjectStorage.KeyPressed_0); pObj.Event[GML_EVENT_KEYPRESS_0] = true; }
        if( _pObjectStorage.KeyPressed_1) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_1] = (_pObjectStorage.KeyPressed_1); pObj.Event[GML_EVENT_KEYPRESS_1] = true; }
        if( _pObjectStorage.KeyPressed_2) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_2] = (_pObjectStorage.KeyPressed_2); pObj.Event[GML_EVENT_KEYPRESS_2] = true; }
        if( _pObjectStorage.KeyPressed_3) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_3] = (_pObjectStorage.KeyPressed_3); pObj.Event[GML_EVENT_KEYPRESS_3] = true; }
        if( _pObjectStorage.KeyPressed_4) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_4] = (_pObjectStorage.KeyPressed_4); pObj.Event[GML_EVENT_KEYPRESS_4] = true; }
        if( _pObjectStorage.KeyPressed_5) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_5] = (_pObjectStorage.KeyPressed_5); pObj.Event[GML_EVENT_KEYPRESS_5] = true; }
        if( _pObjectStorage.KeyPressed_6) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_6] = (_pObjectStorage.KeyPressed_6); pObj.Event[GML_EVENT_KEYPRESS_6] = true; }
        if( _pObjectStorage.KeyPressed_7) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_7] = (_pObjectStorage.KeyPressed_7); pObj.Event[GML_EVENT_KEYPRESS_7] = true; }
        if( _pObjectStorage.KeyPressed_8) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_8] = (_pObjectStorage.KeyPressed_8); pObj.Event[GML_EVENT_KEYPRESS_8] = true; }
        if( _pObjectStorage.KeyPressed_9) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_9] = (_pObjectStorage.KeyPressed_9); pObj.Event[GML_EVENT_KEYPRESS_9] = true; }

        if( _pObjectStorage.KeyPressed_A) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_A] = (_pObjectStorage.KeyPressed_A); pObj.Event[GML_EVENT_KEYPRESS_A] = true; }
        if( _pObjectStorage.KeyPressed_B) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_B] = (_pObjectStorage.KeyPressed_B); pObj.Event[GML_EVENT_KEYPRESS_B] = true; }
        if( _pObjectStorage.KeyPressed_C) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_C] = (_pObjectStorage.KeyPressed_C); pObj.Event[GML_EVENT_KEYPRESS_C] = true; }
        if( _pObjectStorage.KeyPressed_D) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_D] = (_pObjectStorage.KeyPressed_D); pObj.Event[GML_EVENT_KEYPRESS_D] = true; }
        if( _pObjectStorage.KeyPressed_E) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_E] = (_pObjectStorage.KeyPressed_E); pObj.Event[GML_EVENT_KEYPRESS_E] = true; }
        if( _pObjectStorage.KeyPressed_F) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F] = (_pObjectStorage.KeyPressed_F); pObj.Event[GML_EVENT_KEYPRESS_F] = true; }
        if( _pObjectStorage.KeyPressed_G) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_G] = (_pObjectStorage.KeyPressed_G); pObj.Event[GML_EVENT_KEYPRESS_G] = true; }
        if( _pObjectStorage.KeyPressed_H) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_H] = (_pObjectStorage.KeyPressed_H); pObj.Event[GML_EVENT_KEYPRESS_H] = true; }
        if( _pObjectStorage.KeyPressed_I) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_I] = (_pObjectStorage.KeyPressed_I); pObj.Event[GML_EVENT_KEYPRESS_I] = true; }
        if( _pObjectStorage.KeyPressed_J) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_J] = (_pObjectStorage.KeyPressed_J); pObj.Event[GML_EVENT_KEYPRESS_J] = true; }
        if( _pObjectStorage.KeyPressed_K) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_K] = (_pObjectStorage.KeyPressed_K); pObj.Event[GML_EVENT_KEYPRESS_K] = true; }
        if( _pObjectStorage.KeyPressed_L) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_L] = (_pObjectStorage.KeyPressed_L); pObj.Event[GML_EVENT_KEYPRESS_L] = true; }
        if( _pObjectStorage.KeyPressed_M) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_M] = (_pObjectStorage.KeyPressed_M); pObj.Event[GML_EVENT_KEYPRESS_M] = true; }
        if( _pObjectStorage.KeyPressed_N) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_N] = (_pObjectStorage.KeyPressed_N); pObj.Event[GML_EVENT_KEYPRESS_N] = true; }
        if( _pObjectStorage.KeyPressed_O) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_O] = (_pObjectStorage.KeyPressed_O); pObj.Event[GML_EVENT_KEYPRESS_O] = true; }
        if( _pObjectStorage.KeyPressed_P) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_P] = (_pObjectStorage.KeyPressed_P); pObj.Event[GML_EVENT_KEYPRESS_P] = true; }
        if( _pObjectStorage.KeyPressed_Q) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_Q] = (_pObjectStorage.KeyPressed_Q); pObj.Event[GML_EVENT_KEYPRESS_Q] = true; }
        if( _pObjectStorage.KeyPressed_R) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_R] = (_pObjectStorage.KeyPressed_R); pObj.Event[GML_EVENT_KEYPRESS_R] = true; }
        if( _pObjectStorage.KeyPressed_S) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_S] = (_pObjectStorage.KeyPressed_S); pObj.Event[GML_EVENT_KEYPRESS_S] = true; }
        if( _pObjectStorage.KeyPressed_T) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_T] = (_pObjectStorage.KeyPressed_T); pObj.Event[GML_EVENT_KEYPRESS_T] = true; }
        if( _pObjectStorage.KeyPressed_U) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_U] = (_pObjectStorage.KeyPressed_U); pObj.Event[GML_EVENT_KEYPRESS_U] = true; }
        if( _pObjectStorage.KeyPressed_V) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_V] = (_pObjectStorage.KeyPressed_V); pObj.Event[GML_EVENT_KEYPRESS_V] = true; }
        if( _pObjectStorage.KeyPressed_W) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_W] = (_pObjectStorage.KeyPressed_W); pObj.Event[GML_EVENT_KEYPRESS_W] = true; }
        if( _pObjectStorage.KeyPressed_X) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_X] = (_pObjectStorage.KeyPressed_X); pObj.Event[GML_EVENT_KEYPRESS_X] = true; }
        if( _pObjectStorage.KeyPressed_Y) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_Y] = (_pObjectStorage.KeyPressed_Y); pObj.Event[GML_EVENT_KEYPRESS_Y] = true; }
        if( _pObjectStorage.KeyPressed_Z) { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_Z] = (_pObjectStorage.KeyPressed_Z); pObj.Event[GML_EVENT_KEYPRESS_Z] = true; }

        if( _pObjectStorage.KeyPressed_F1 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F1 ] = (_pObjectStorage.KeyPressed_F1 ); pObj.Event[GML_EVENT_KEYPRESS_F1 ] = true; }
        if( _pObjectStorage.KeyPressed_F2 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F2 ] = (_pObjectStorage.KeyPressed_F2 ); pObj.Event[GML_EVENT_KEYPRESS_F2 ] = true; }
        if( _pObjectStorage.KeyPressed_F3 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F3 ] = (_pObjectStorage.KeyPressed_F3 ); pObj.Event[GML_EVENT_KEYPRESS_F3 ] = true; }
        if( _pObjectStorage.KeyPressed_F4 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F4 ] = (_pObjectStorage.KeyPressed_F4 ); pObj.Event[GML_EVENT_KEYPRESS_F4 ] = true; }
        if( _pObjectStorage.KeyPressed_F5 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F5 ] = (_pObjectStorage.KeyPressed_F5 ); pObj.Event[GML_EVENT_KEYPRESS_F5 ] = true; }
        if( _pObjectStorage.KeyPressed_F6 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F6 ] = (_pObjectStorage.KeyPressed_F6 ); pObj.Event[GML_EVENT_KEYPRESS_F6 ] = true; }
        if( _pObjectStorage.KeyPressed_F7 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F7 ] = (_pObjectStorage.KeyPressed_F7 ); pObj.Event[GML_EVENT_KEYPRESS_F7 ] = true; }
        if( _pObjectStorage.KeyPressed_F8 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F8 ] = (_pObjectStorage.KeyPressed_F8 ); pObj.Event[GML_EVENT_KEYPRESS_F8 ] = true; }
        if( _pObjectStorage.KeyPressed_F9 )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F9 ] = (_pObjectStorage.KeyPressed_F9 ); pObj.Event[GML_EVENT_KEYPRESS_F9 ] = true; }
        if( _pObjectStorage.KeyPressed_F10)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F10] = (_pObjectStorage.KeyPressed_F10); pObj.Event[GML_EVENT_KEYPRESS_F10] = true; }
        if( _pObjectStorage.KeyPressed_F11)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F11] = (_pObjectStorage.KeyPressed_F11); pObj.Event[GML_EVENT_KEYPRESS_F11] = true; }
        if( _pObjectStorage.KeyPressed_F12)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_F12] = (_pObjectStorage.KeyPressed_F12); pObj.Event[GML_EVENT_KEYPRESS_F12] = true; }

        if( _pObjectStorage.KeyPressed_NUM_LOCK )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_LOCK ] = (_pObjectStorage.KeyPressed_NUM_LOCK ); pObj.Event[GML_EVENT_KEYPRESS_NUM_LOCK ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_0    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_0    ] = (_pObjectStorage.KeyPressed_NUM_0    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_0    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_1    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_1    ] = (_pObjectStorage.KeyPressed_NUM_1    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_1    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_2    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_2    ] = (_pObjectStorage.KeyPressed_NUM_2    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_2    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_3    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_3    ] = (_pObjectStorage.KeyPressed_NUM_3    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_3    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_4    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_4    ] = (_pObjectStorage.KeyPressed_NUM_4    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_4    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_5    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_5    ] = (_pObjectStorage.KeyPressed_NUM_5    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_5    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_6    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_6    ] = (_pObjectStorage.KeyPressed_NUM_6    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_6    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_7    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_7    ] = (_pObjectStorage.KeyPressed_NUM_7    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_7    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_8    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_8    ] = (_pObjectStorage.KeyPressed_NUM_8    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_8    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_9    )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_9    ] = (_pObjectStorage.KeyPressed_NUM_9    ); pObj.Event[GML_EVENT_KEYPRESS_NUM_9    ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_STAR )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_STAR ] = (_pObjectStorage.KeyPressed_NUM_STAR ); pObj.Event[GML_EVENT_KEYPRESS_NUM_STAR ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_PLUS )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_PLUS ] = (_pObjectStorage.KeyPressed_NUM_PLUS ); pObj.Event[GML_EVENT_KEYPRESS_NUM_PLUS ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_MINUS)   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_MINUS] = (_pObjectStorage.KeyPressed_NUM_MINUS); pObj.Event[GML_EVENT_KEYPRESS_NUM_MINUS] = true; }
        if( _pObjectStorage.KeyPressed_NUM_DOT  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_DOT  ] = (_pObjectStorage.KeyPressed_NUM_DOT  ); pObj.Event[GML_EVENT_KEYPRESS_NUM_DOT  ] = true; }
        if( _pObjectStorage.KeyPressed_NUM_DIV  )   { pObj.ObjKeyPressed[GML_EVENT_KEYPRESS_NUM_DIV  ] = (_pObjectStorage.KeyPressed_NUM_DIV  ); pObj.Event[GML_EVENT_KEYPRESS_NUM_DIV  ] = true; }


        // Keyboard (key down) events
        if( _pObjectStorage.Key_NOKEY) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NOKEY] = (_pObjectStorage.Key_NOKEY); pObj.Event[GML_EVENT_KEYBOARD_NOKEY] = true; }
        if( _pObjectStorage.Key_ANYKEY) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_ANYKEY] = (_pObjectStorage.Key_ANYKEY); pObj.Event[GML_EVENT_KEYBOARD_ANYKEY] = true; }
        if( _pObjectStorage.Key_BACKSPACE) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_BACKSPACE] = (_pObjectStorage.Key_BACKSPACE); pObj.Event[GML_EVENT_KEYBOARD_BACKSPACE] = true; }
        if( _pObjectStorage.Key_TAB)     { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_TAB] = (_pObjectStorage.Key_TAB); pObj.Event[GML_EVENT_KEYBOARD_TAB] = true; }
        if( _pObjectStorage.Key_ENTER)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_ENTER] = (_pObjectStorage.Key_ENTER); pObj.Event[GML_EVENT_KEYBOARD_ENTER] = true; }
        if( _pObjectStorage.Key_SHIFT )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_SHIFT ] = (_pObjectStorage.Key_SHIFT ); pObj.Event[GML_EVENT_KEYBOARD_SHIFT ] = true; }
        if( _pObjectStorage.Key_CTRL  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_CTRL  ] = (_pObjectStorage.Key_CTRL  ); pObj.Event[GML_EVENT_KEYBOARD_CTRL  ] = true; }
        if( _pObjectStorage.Key_ALT   )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_ALT   ] = (_pObjectStorage.Key_ALT   ); pObj.Event[GML_EVENT_KEYBOARD_ALT   ] = true; }
        if( _pObjectStorage.Key_PAUSE )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_PAUSE ] = (_pObjectStorage.Key_PAUSE ); pObj.Event[GML_EVENT_KEYBOARD_PAUSE ] = true; }
        if( _pObjectStorage.Key_ESCAPE)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_ESCAPE] = (_pObjectStorage.Key_ESCAPE); pObj.Event[GML_EVENT_KEYBOARD_ESCAPE] = true; }
        if( _pObjectStorage.Key_SPACE )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_SPACE ] = (_pObjectStorage.Key_SPACE ); pObj.Event[GML_EVENT_KEYBOARD_SPACE ] = true; }

        if( _pObjectStorage.Key_PAGEUP  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_PAGEUP  ] = (_pObjectStorage.Key_PAGEUP  ); pObj.Event[GML_EVENT_KEYBOARD_PAGEUP  ] = true; }
        if( _pObjectStorage.Key_PAGEDOWN)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_PAGEDOWN] = (_pObjectStorage.Key_PAGEDOWN); pObj.Event[GML_EVENT_KEYBOARD_PAGEDOWN] = true; }
        if( _pObjectStorage.Key_END     )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_END     ] = (_pObjectStorage.Key_END     ); pObj.Event[GML_EVENT_KEYBOARD_END     ] = true; }
        if( _pObjectStorage.Key_HOME    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_HOME    ] = (_pObjectStorage.Key_HOME    ); pObj.Event[GML_EVENT_KEYBOARD_HOME    ] = true; }
        if( _pObjectStorage.Key_LEFT    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_LEFT    ] = (_pObjectStorage.Key_LEFT    ); pObj.Event[GML_EVENT_KEYBOARD_LEFT    ] = true; }
        if( _pObjectStorage.Key_UP      )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_UP      ] = (_pObjectStorage.Key_UP      ); pObj.Event[GML_EVENT_KEYBOARD_UP      ] = true; }
        if( _pObjectStorage.Key_RIGHT   )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_RIGHT   ] = (_pObjectStorage.Key_RIGHT   ); pObj.Event[GML_EVENT_KEYBOARD_RIGHT   ] = true; }
        if( _pObjectStorage.Key_DOWN    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_DOWN    ] = (_pObjectStorage.Key_DOWN    ); pObj.Event[GML_EVENT_KEYBOARD_DOWN    ] = true; }
        if( _pObjectStorage.Key_INSERT  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_INSERT  ] = (_pObjectStorage.Key_INSERT  ); pObj.Event[GML_EVENT_KEYBOARD_INSERT  ] = true; }
        if( _pObjectStorage.Key_DELETE  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_DELETE  ] = (_pObjectStorage.Key_DELETE  ); pObj.Event[GML_EVENT_KEYBOARD_DELETE  ] = true; }

        if( _pObjectStorage.Key_0) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_0] = (_pObjectStorage.Key_0); pObj.Event[GML_EVENT_KEYBOARD_0] = true; }
        if( _pObjectStorage.Key_1) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_1] = (_pObjectStorage.Key_1); pObj.Event[GML_EVENT_KEYBOARD_1] = true; }
        if( _pObjectStorage.Key_2) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_2] = (_pObjectStorage.Key_2); pObj.Event[GML_EVENT_KEYBOARD_2] = true; }
        if( _pObjectStorage.Key_3) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_3] = (_pObjectStorage.Key_3); pObj.Event[GML_EVENT_KEYBOARD_3] = true; }
        if( _pObjectStorage.Key_4) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_4] = (_pObjectStorage.Key_4); pObj.Event[GML_EVENT_KEYBOARD_4] = true; }
        if( _pObjectStorage.Key_5) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_5] = (_pObjectStorage.Key_5); pObj.Event[GML_EVENT_KEYBOARD_5] = true; }
        if( _pObjectStorage.Key_6) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_6] = (_pObjectStorage.Key_6); pObj.Event[GML_EVENT_KEYBOARD_6] = true; }
        if( _pObjectStorage.Key_7) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_7] = (_pObjectStorage.Key_7); pObj.Event[GML_EVENT_KEYBOARD_7] = true; }
        if( _pObjectStorage.Key_8) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_8] = (_pObjectStorage.Key_8); pObj.Event[GML_EVENT_KEYBOARD_8] = true; }
        if( _pObjectStorage.Key_9) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_9] = (_pObjectStorage.Key_9); pObj.Event[GML_EVENT_KEYBOARD_9] = true; }

        if( _pObjectStorage.Key_A) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_A] = (_pObjectStorage.Key_A); pObj.Event[GML_EVENT_KEYBOARD_A] = true; }
        if( _pObjectStorage.Key_B) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_B] = (_pObjectStorage.Key_B); pObj.Event[GML_EVENT_KEYBOARD_B] = true; }
        if( _pObjectStorage.Key_C) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_C] = (_pObjectStorage.Key_C); pObj.Event[GML_EVENT_KEYBOARD_C] = true; }
        if( _pObjectStorage.Key_D) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_D] = (_pObjectStorage.Key_D); pObj.Event[GML_EVENT_KEYBOARD_D] = true; }
        if( _pObjectStorage.Key_E) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_E] = (_pObjectStorage.Key_E); pObj.Event[GML_EVENT_KEYBOARD_E] = true; }
        if( _pObjectStorage.Key_F) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F] = (_pObjectStorage.Key_F); pObj.Event[GML_EVENT_KEYBOARD_F] = true; }
        if( _pObjectStorage.Key_G) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_G] = (_pObjectStorage.Key_G); pObj.Event[GML_EVENT_KEYBOARD_G] = true; }
        if( _pObjectStorage.Key_H) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_H] = (_pObjectStorage.Key_H); pObj.Event[GML_EVENT_KEYBOARD_H] = true; }
        if( _pObjectStorage.Key_I) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_I] = (_pObjectStorage.Key_I); pObj.Event[GML_EVENT_KEYBOARD_I] = true; }
        if( _pObjectStorage.Key_J) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_J] = (_pObjectStorage.Key_J); pObj.Event[GML_EVENT_KEYBOARD_J] = true; }
        if( _pObjectStorage.Key_K) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_K] = (_pObjectStorage.Key_K); pObj.Event[GML_EVENT_KEYBOARD_K] = true; }
        if( _pObjectStorage.Key_L) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_L] = (_pObjectStorage.Key_L); pObj.Event[GML_EVENT_KEYBOARD_L] = true; }
        if( _pObjectStorage.Key_M) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_M] = (_pObjectStorage.Key_M); pObj.Event[GML_EVENT_KEYBOARD_M] = true; }
        if( _pObjectStorage.Key_N) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_N] = (_pObjectStorage.Key_N); pObj.Event[GML_EVENT_KEYBOARD_N] = true; }
        if( _pObjectStorage.Key_O) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_O] = (_pObjectStorage.Key_O); pObj.Event[GML_EVENT_KEYBOARD_O] = true; }
        if( _pObjectStorage.Key_P) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_P] = (_pObjectStorage.Key_P); pObj.Event[GML_EVENT_KEYBOARD_P] = true; }
        if( _pObjectStorage.Key_Q) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_Q] = (_pObjectStorage.Key_Q); pObj.Event[GML_EVENT_KEYBOARD_Q] = true; }
        if( _pObjectStorage.Key_R) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_R] = (_pObjectStorage.Key_R); pObj.Event[GML_EVENT_KEYBOARD_R] = true; }
        if( _pObjectStorage.Key_S) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_S] = (_pObjectStorage.Key_S); pObj.Event[GML_EVENT_KEYBOARD_S] = true; }
        if( _pObjectStorage.Key_T) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_T] = (_pObjectStorage.Key_T); pObj.Event[GML_EVENT_KEYBOARD_T] = true; }
        if( _pObjectStorage.Key_U) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_U] = (_pObjectStorage.Key_U); pObj.Event[GML_EVENT_KEYBOARD_U] = true; }
        if( _pObjectStorage.Key_V) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_V] = (_pObjectStorage.Key_V); pObj.Event[GML_EVENT_KEYBOARD_V] = true; }
        if( _pObjectStorage.Key_W) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_W] = (_pObjectStorage.Key_W); pObj.Event[GML_EVENT_KEYBOARD_W] = true; }
        if( _pObjectStorage.Key_X) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_X] = (_pObjectStorage.Key_X); pObj.Event[GML_EVENT_KEYBOARD_X] = true; }
        if( _pObjectStorage.Key_Y) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_Y] = (_pObjectStorage.Key_Y); pObj.Event[GML_EVENT_KEYBOARD_Y] = true; }
        if( _pObjectStorage.Key_Z) { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_Z] = (_pObjectStorage.Key_Z); pObj.Event[GML_EVENT_KEYBOARD_Z] = true; }

        if( _pObjectStorage.Key_F1 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F1 ] = (_pObjectStorage.Key_F1 ); pObj.Event[GML_EVENT_KEYBOARD_F1 ] = true; }
        if( _pObjectStorage.Key_F2 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F2 ] = (_pObjectStorage.Key_F2 ); pObj.Event[GML_EVENT_KEYBOARD_F2 ] = true; }
        if( _pObjectStorage.Key_F3 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F3 ] = (_pObjectStorage.Key_F3 ); pObj.Event[GML_EVENT_KEYBOARD_F3 ] = true; }
        if( _pObjectStorage.Key_F4 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F4 ] = (_pObjectStorage.Key_F4 ); pObj.Event[GML_EVENT_KEYBOARD_F4 ] = true; }
        if( _pObjectStorage.Key_F5 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F5 ] = (_pObjectStorage.Key_F5 ); pObj.Event[GML_EVENT_KEYBOARD_F5 ] = true; }
        if( _pObjectStorage.Key_F6 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F6 ] = (_pObjectStorage.Key_F6 ); pObj.Event[GML_EVENT_KEYBOARD_F6 ] = true; }
        if( _pObjectStorage.Key_F7 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F7 ] = (_pObjectStorage.Key_F7 ); pObj.Event[GML_EVENT_KEYBOARD_F7 ] = true; }
        if( _pObjectStorage.Key_F8 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F8 ] = (_pObjectStorage.Key_F8 ); pObj.Event[GML_EVENT_KEYBOARD_F8 ] = true; }
        if( _pObjectStorage.Key_F9 )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F9 ] = (_pObjectStorage.Key_F9 ); pObj.Event[GML_EVENT_KEYBOARD_F9 ] = true; }
        if( _pObjectStorage.Key_F10)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F10] = (_pObjectStorage.Key_F10); pObj.Event[GML_EVENT_KEYBOARD_F10] = true; }
        if( _pObjectStorage.Key_F11)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F11] = (_pObjectStorage.Key_F11); pObj.Event[GML_EVENT_KEYBOARD_F11] = true; }
        if( _pObjectStorage.Key_F12)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_F12] = (_pObjectStorage.Key_F12); pObj.Event[GML_EVENT_KEYBOARD_F12] = true; }

        if( _pObjectStorage.Key_NUM_LOCK )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_LOCK ] = (_pObjectStorage.Key_NUM_LOCK ); pObj.Event[GML_EVENT_KEYBOARD_NUM_LOCK ] = true; }
        if( _pObjectStorage.Key_NUM_0    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_0    ] = (_pObjectStorage.Key_NUM_0    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_0    ] = true; }
        if( _pObjectStorage.Key_NUM_1    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_1    ] = (_pObjectStorage.Key_NUM_1    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_1    ] = true; }
        if( _pObjectStorage.Key_NUM_2    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_2    ] = (_pObjectStorage.Key_NUM_2    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_2    ] = true; }
        if( _pObjectStorage.Key_NUM_3    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_3    ] = (_pObjectStorage.Key_NUM_3    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_3    ] = true; }
        if( _pObjectStorage.Key_NUM_4    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_4    ] = (_pObjectStorage.Key_NUM_4    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_4    ] = true; }
        if( _pObjectStorage.Key_NUM_5    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_5    ] = (_pObjectStorage.Key_NUM_5    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_5    ] = true; }
        if( _pObjectStorage.Key_NUM_6    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_6    ] = (_pObjectStorage.Key_NUM_6    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_6    ] = true; }
        if( _pObjectStorage.Key_NUM_7    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_7    ] = (_pObjectStorage.Key_NUM_7    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_7    ] = true; }
        if( _pObjectStorage.Key_NUM_8    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_8    ] = (_pObjectStorage.Key_NUM_8    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_8    ] = true; }
        if( _pObjectStorage.Key_NUM_9    )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_9    ] = (_pObjectStorage.Key_NUM_9    ); pObj.Event[GML_EVENT_KEYBOARD_NUM_9    ] = true; }
        if( _pObjectStorage.Key_NUM_STAR )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_STAR ] = (_pObjectStorage.Key_NUM_STAR ); pObj.Event[GML_EVENT_KEYBOARD_NUM_STAR ] = true; }
        if( _pObjectStorage.Key_NUM_PLUS )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_PLUS ] = (_pObjectStorage.Key_NUM_PLUS ); pObj.Event[GML_EVENT_KEYBOARD_NUM_PLUS ] = true; }
        if( _pObjectStorage.Key_NUM_MINUS)   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_MINUS] = (_pObjectStorage.Key_NUM_MINUS); pObj.Event[GML_EVENT_KEYBOARD_NUM_MINUS] = true; }
        if( _pObjectStorage.Key_NUM_DOT  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_DOT  ] = (_pObjectStorage.Key_NUM_DOT  ); pObj.Event[GML_EVENT_KEYBOARD_NUM_DOT  ] = true; }
        if( _pObjectStorage.Key_NUM_DIV  )   { pObj.ObjKeyDown[GML_EVENT_KEYBOARD_NUM_DIV  ] = (_pObjectStorage.Key_NUM_DIV  ); pObj.Event[GML_EVENT_KEYBOARD_NUM_DIV  ] = true; }



        // Key Released events
        if( _pObjectStorage.KeyReleased_NOKEY) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NOKEY] = (_pObjectStorage.KeyReleased_NOKEY); pObj.Event[GML_EVENT_KEYRELEASE_NOKEY] = true; }
        if( _pObjectStorage.KeyReleased_ANYKEY) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_ANYKEY] = (_pObjectStorage.KeyReleased_ANYKEY); pObj.Event[GML_EVENT_KEYRELEASE_ANYKEY] = true; }
        if( _pObjectStorage.KeyReleased_BACKSPACE) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_BACKSPACE] = (_pObjectStorage.KeyReleased_BACKSPACE); pObj.Event[GML_EVENT_KEYRELEASE_BACKSPACE] = true; }
        
        if( _pObjectStorage.KeyReleased_TAB)     { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_TAB] = (_pObjectStorage.KeyReleased_TAB); pObj.Event[GML_EVENT_KEYRELEASE_TAB] = true; }
        if( _pObjectStorage.KeyReleased_ENTER)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_ENTER] = (_pObjectStorage.KeyReleased_ENTER); pObj.Event[GML_EVENT_KEYRELEASE_ENTER] = true; }
        if( _pObjectStorage.KeyReleased_SHIFT )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_SHIFT ] = (_pObjectStorage.KeyReleased_SHIFT ); pObj.Event[GML_EVENT_KEYRELEASE_SHIFT ] = true; }
        if( _pObjectStorage.KeyReleased_CTRL  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_CTRL  ] = (_pObjectStorage.KeyReleased_CTRL  ); pObj.Event[GML_EVENT_KEYRELEASE_CTRL  ] = true; }
        if( _pObjectStorage.KeyReleased_ALT   )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_ALT   ] = (_pObjectStorage.KeyReleased_ALT   ); pObj.Event[GML_EVENT_KEYRELEASE_ALT   ] = true; }
        if( _pObjectStorage.KeyReleased_PAUSE )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_PAUSE ] = (_pObjectStorage.KeyReleased_PAUSE ); pObj.Event[GML_EVENT_KEYRELEASE_PAUSE ] = true; }
        if( _pObjectStorage.KeyReleased_ESCAPE)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_ESCAPE] = (_pObjectStorage.KeyReleased_ESCAPE); pObj.Event[GML_EVENT_KEYRELEASE_ESCAPE] = true; }
        if( _pObjectStorage.KeyReleased_SPACE )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_SPACE ] = (_pObjectStorage.KeyReleased_SPACE ); pObj.Event[GML_EVENT_KEYRELEASE_SPACE ] = true; }

        if( _pObjectStorage.KeyReleased_PAGEUP  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_PAGEUP  ] = (_pObjectStorage.KeyReleased_PAGEUP  ); pObj.Event[GML_EVENT_KEYRELEASE_PAGEUP  ] = true; }
        if( _pObjectStorage.KeyReleased_PAGEDOWN)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_PAGEDOWN] = (_pObjectStorage.KeyReleased_PAGEDOWN); pObj.Event[GML_EVENT_KEYRELEASE_PAGEDOWN] = true; }
        if( _pObjectStorage.KeyReleased_END     )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_END     ] = (_pObjectStorage.KeyReleased_END     ); pObj.Event[GML_EVENT_KEYRELEASE_END     ] = true; }
        if( _pObjectStorage.KeyReleased_HOME    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_HOME    ] = (_pObjectStorage.KeyReleased_HOME    ); pObj.Event[GML_EVENT_KEYRELEASE_HOME    ] = true; }
        if( _pObjectStorage.KeyReleased_LEFT    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_LEFT    ] = (_pObjectStorage.KeyReleased_LEFT    ); pObj.Event[GML_EVENT_KEYRELEASE_LEFT    ] = true; }
        if( _pObjectStorage.KeyReleased_UP      )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_UP      ] = (_pObjectStorage.KeyReleased_UP      ); pObj.Event[GML_EVENT_KEYRELEASE_UP      ] = true; }
        if( _pObjectStorage.KeyReleased_RIGHT   )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_RIGHT   ] = (_pObjectStorage.KeyReleased_RIGHT   ); pObj.Event[GML_EVENT_KEYRELEASE_RIGHT   ] = true; }
        if( _pObjectStorage.KeyReleased_DOWN    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_DOWN    ] = (_pObjectStorage.KeyReleased_DOWN    ); pObj.Event[GML_EVENT_KEYRELEASE_DOWN    ] = true; }
        if( _pObjectStorage.KeyReleased_INSERT  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_INSERT  ] = (_pObjectStorage.KeyReleased_INSERT  ); pObj.Event[GML_EVENT_KEYRELEASE_INSERT  ] = true; }
        if( _pObjectStorage.KeyReleased_DELETE  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_DELETE  ] = (_pObjectStorage.KeyReleased_DELETE  ); pObj.Event[GML_EVENT_KEYRELEASE_DELETE  ] = true; }

        if( _pObjectStorage.KeyReleased_0) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_0] = (_pObjectStorage.KeyReleased_0); pObj.Event[GML_EVENT_KEYRELEASE_0] = true; }
        if( _pObjectStorage.KeyReleased_1) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_1] = (_pObjectStorage.KeyReleased_1); pObj.Event[GML_EVENT_KEYRELEASE_1] = true; }
        if( _pObjectStorage.KeyReleased_2) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_2] = (_pObjectStorage.KeyReleased_2); pObj.Event[GML_EVENT_KEYRELEASE_2] = true; }
        if( _pObjectStorage.KeyReleased_3) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_3] = (_pObjectStorage.KeyReleased_3); pObj.Event[GML_EVENT_KEYRELEASE_3] = true; }
        if( _pObjectStorage.KeyReleased_4) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_4] = (_pObjectStorage.KeyReleased_4); pObj.Event[GML_EVENT_KEYRELEASE_4] = true; }
        if( _pObjectStorage.KeyReleased_5) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_5] = (_pObjectStorage.KeyReleased_5); pObj.Event[GML_EVENT_KEYRELEASE_5] = true; }
        if( _pObjectStorage.KeyReleased_6) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_6] = (_pObjectStorage.KeyReleased_6); pObj.Event[GML_EVENT_KEYRELEASE_6] = true; }
        if( _pObjectStorage.KeyReleased_7) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_7] = (_pObjectStorage.KeyReleased_7); pObj.Event[GML_EVENT_KEYRELEASE_7] = true; }
        if( _pObjectStorage.KeyReleased_8) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_8] = (_pObjectStorage.KeyReleased_8); pObj.Event[GML_EVENT_KEYRELEASE_8] = true; }
        if( _pObjectStorage.KeyReleased_9) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_9] = (_pObjectStorage.KeyReleased_9); pObj.Event[GML_EVENT_KEYRELEASE_9] = true; }

        if( _pObjectStorage.KeyReleased_A) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_A] = (_pObjectStorage.KeyReleased_A); pObj.Event[GML_EVENT_KEYRELEASE_A] = true; }
        if( _pObjectStorage.KeyReleased_B) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_B] = (_pObjectStorage.KeyReleased_B); pObj.Event[GML_EVENT_KEYRELEASE_B] = true; }
        if( _pObjectStorage.KeyReleased_C) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_C] = (_pObjectStorage.KeyReleased_C); pObj.Event[GML_EVENT_KEYRELEASE_C] = true; }
        if( _pObjectStorage.KeyReleased_D) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_D] = (_pObjectStorage.KeyReleased_D); pObj.Event[GML_EVENT_KEYRELEASE_D] = true; }
        if( _pObjectStorage.KeyReleased_E) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_E] = (_pObjectStorage.KeyReleased_E); pObj.Event[GML_EVENT_KEYRELEASE_E] = true; }
        if( _pObjectStorage.KeyReleased_F) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F] = (_pObjectStorage.KeyReleased_F); pObj.Event[GML_EVENT_KEYRELEASE_F] = true; }
        if( _pObjectStorage.KeyReleased_G) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_G] = (_pObjectStorage.KeyReleased_G); pObj.Event[GML_EVENT_KEYRELEASE_G] = true; }
        if( _pObjectStorage.KeyReleased_H) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_H] = (_pObjectStorage.KeyReleased_H); pObj.Event[GML_EVENT_KEYRELEASE_H] = true; }
        if( _pObjectStorage.KeyReleased_I) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_I] = (_pObjectStorage.KeyReleased_I); pObj.Event[GML_EVENT_KEYRELEASE_I] = true; }
        if( _pObjectStorage.KeyReleased_J) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_J] = (_pObjectStorage.KeyReleased_J); pObj.Event[GML_EVENT_KEYRELEASE_J] = true; }
        if( _pObjectStorage.KeyReleased_K) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_K] = (_pObjectStorage.KeyReleased_K); pObj.Event[GML_EVENT_KEYRELEASE_K] = true; }
        if( _pObjectStorage.KeyReleased_L) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_L] = (_pObjectStorage.KeyReleased_L); pObj.Event[GML_EVENT_KEYRELEASE_L] = true; }
        if( _pObjectStorage.KeyReleased_M) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_M] = (_pObjectStorage.KeyReleased_M); pObj.Event[GML_EVENT_KEYRELEASE_M] = true; }
        if( _pObjectStorage.KeyReleased_N) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_N] = (_pObjectStorage.KeyReleased_N); pObj.Event[GML_EVENT_KEYRELEASE_N] = true; }
        if( _pObjectStorage.KeyReleased_O) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_O] = (_pObjectStorage.KeyReleased_O); pObj.Event[GML_EVENT_KEYRELEASE_O] = true; }
        if( _pObjectStorage.KeyReleased_P) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_P] = (_pObjectStorage.KeyReleased_P); pObj.Event[GML_EVENT_KEYRELEASE_P] = true; }
        if( _pObjectStorage.KeyReleased_Q) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_Q] = (_pObjectStorage.KeyReleased_Q); pObj.Event[GML_EVENT_KEYRELEASE_Q] = true; }
        if( _pObjectStorage.KeyReleased_R) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_R] = (_pObjectStorage.KeyReleased_R); pObj.Event[GML_EVENT_KEYRELEASE_R] = true; }
        if( _pObjectStorage.KeyReleased_S) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_S] = (_pObjectStorage.KeyReleased_S); pObj.Event[GML_EVENT_KEYRELEASE_S] = true; }
        if( _pObjectStorage.KeyReleased_T) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_T] = (_pObjectStorage.KeyReleased_T); pObj.Event[GML_EVENT_KEYRELEASE_T] = true; }
        if( _pObjectStorage.KeyReleased_U) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_U] = (_pObjectStorage.KeyReleased_U); pObj.Event[GML_EVENT_KEYRELEASE_U] = true; }
        if( _pObjectStorage.KeyReleased_V) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_V] = (_pObjectStorage.KeyReleased_V); pObj.Event[GML_EVENT_KEYRELEASE_V] = true; }
        if( _pObjectStorage.KeyReleased_W) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_W] = (_pObjectStorage.KeyReleased_W); pObj.Event[GML_EVENT_KEYRELEASE_W] = true; }
        if( _pObjectStorage.KeyReleased_X) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_X] = (_pObjectStorage.KeyReleased_X); pObj.Event[GML_EVENT_KEYRELEASE_X] = true; }
        if( _pObjectStorage.KeyReleased_Y) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_Y] = (_pObjectStorage.KeyReleased_Y); pObj.Event[GML_EVENT_KEYRELEASE_Y] = true; }
        if( _pObjectStorage.KeyReleased_Z) { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_Z] = (_pObjectStorage.KeyReleased_Z); pObj.Event[GML_EVENT_KEYRELEASE_Z] = true; }

        if( _pObjectStorage.KeyReleased_F1 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F1 ] = (_pObjectStorage.KeyReleased_F1 ); pObj.Event[GML_EVENT_KEYRELEASE_F1 ] = true; }
        if( _pObjectStorage.KeyReleased_F2 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F2 ] = (_pObjectStorage.KeyReleased_F2 ); pObj.Event[GML_EVENT_KEYRELEASE_F2 ] = true; }
        if( _pObjectStorage.KeyReleased_F3 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F3 ] = (_pObjectStorage.KeyReleased_F3 ); pObj.Event[GML_EVENT_KEYRELEASE_F3 ] = true; }
        if( _pObjectStorage.KeyReleased_F4 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F4 ] = (_pObjectStorage.KeyReleased_F4 ); pObj.Event[GML_EVENT_KEYRELEASE_F4 ] = true; }
        if( _pObjectStorage.KeyReleased_F5 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F5 ] = (_pObjectStorage.KeyReleased_F5 ); pObj.Event[GML_EVENT_KEYRELEASE_F5 ] = true; }
        if( _pObjectStorage.KeyReleased_F6 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F6 ] = (_pObjectStorage.KeyReleased_F6 ); pObj.Event[GML_EVENT_KEYRELEASE_F6 ] = true; }
        if( _pObjectStorage.KeyReleased_F7 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F7 ] = (_pObjectStorage.KeyReleased_F7 ); pObj.Event[GML_EVENT_KEYRELEASE_F7 ] = true; }
        if( _pObjectStorage.KeyReleased_F8 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F8 ] = (_pObjectStorage.KeyReleased_F8 ); pObj.Event[GML_EVENT_KEYRELEASE_F8 ] = true; }
        if( _pObjectStorage.KeyReleased_F9 )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F9 ] = (_pObjectStorage.KeyReleased_F9 ); pObj.Event[GML_EVENT_KEYRELEASE_F9 ] = true; }
        if( _pObjectStorage.KeyReleased_F10)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F10] = (_pObjectStorage.KeyReleased_F10); pObj.Event[GML_EVENT_KEYRELEASE_F10] = true; }
        if( _pObjectStorage.KeyReleased_F11)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F11] = (_pObjectStorage.KeyReleased_F11); pObj.Event[GML_EVENT_KEYRELEASE_F11] = true; }
        if( _pObjectStorage.KeyReleased_F12)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_F12] = (_pObjectStorage.KeyReleased_F12); pObj.Event[GML_EVENT_KEYRELEASE_F12] = true; }

        if( _pObjectStorage.KeyReleased_NUM_LOCK )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_LOCK ] = (_pObjectStorage.KeyReleased_NUM_LOCK ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_LOCK ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_0    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_0    ] = (_pObjectStorage.KeyReleased_NUM_0    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_0    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_1    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_1    ] = (_pObjectStorage.KeyReleased_NUM_1    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_1    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_2    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_2    ] = (_pObjectStorage.KeyReleased_NUM_2    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_2    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_3    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_3    ] = (_pObjectStorage.KeyReleased_NUM_3    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_3    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_4    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_4    ] = (_pObjectStorage.KeyReleased_NUM_4    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_4    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_5    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_5    ] = (_pObjectStorage.KeyReleased_NUM_5    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_5    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_6    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_6    ] = (_pObjectStorage.KeyReleased_NUM_6    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_6    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_7    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_7    ] = (_pObjectStorage.KeyReleased_NUM_7    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_7    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_8    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_8    ] = (_pObjectStorage.KeyReleased_NUM_8    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_8    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_9    )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_9    ] = (_pObjectStorage.KeyReleased_NUM_9    ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_9    ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_STAR )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_STAR ] = (_pObjectStorage.KeyReleased_NUM_STAR ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_STAR ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_PLUS )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_PLUS ] = (_pObjectStorage.KeyReleased_NUM_PLUS ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_PLUS ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_MINUS)   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_MINUS] = (_pObjectStorage.KeyReleased_NUM_MINUS); pObj.Event[GML_EVENT_KEYRELEASE_NUM_MINUS] = true; }
        if( _pObjectStorage.KeyReleased_NUM_DOT  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_DOT  ] = (_pObjectStorage.KeyReleased_NUM_DOT  ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_DOT  ] = true; }
        if( _pObjectStorage.KeyReleased_NUM_DIV  )   { pObj.ObjKeyReleased[GML_EVENT_KEYRELEASE_NUM_DIV  ] = (_pObjectStorage.KeyReleased_NUM_DIV  ); pObj.Event[GML_EVENT_KEYRELEASE_NUM_DIV  ] = true; }

        
        // Collisions...
        var i = 0;
        if( _pObjectStorage.CollisionEvents != undefined )
        {
        	while (i < _pObjectStorage.CollisionEvents.length)
        	{
        		var key = parseInt(_pObjectStorage.CollisionEvents[i]);      // get the object ID
        		var func = _pObjectStorage.CollisionEvents[i + 1];         // get the function callback

        		pObj.Collisions[key] = func;
        		i += 2;
        	}
        }
        
    }
    return pObj;

}


// #############################################################################################
/// Function:<summary>
///             Create an object from its "loaded" data
///          </summary>
///
/// In:		 <param name="_ID"></param>
///			 <param name="_pObjectStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyObject.prototype.HasEvent = function (_event, _subevent) {
	if (this.Event[_event]) return true;
	return false;
};

// #############################################################################################
/// Function:<summary>
///             Execute a single event for this object
///          </summary>
///
/// In:		 <param name="_pInst">this object</param>
///			 <param name="_pother">other object</param>
// #############################################################################################
yyObject.prototype.PerformEvent = function (_event, index, _pInst, _pOther) 
{
	var LastEvent = g_LastEvent;
	var LastSubEvent = g_LastSubEvent;
	g_LastEvent = _event;
	g_LastSubEvent = index;

	var done = true;
	switch (_event)
	{
		case EVENT_CREATE: if (this.CreateEvent) this.CreateEvent(_pInst, _pOther); else done = false; break;
		case EVENT_DESTROY: if (this.DestroyEvent) this.DestroyEvent(_pInst, _pOther); else done = false; break;
		case EVENT_ALARM: done = false; break;  // Shouldn't get called directly
		case EVENT_STEP: done = false; break;
		case EVENT_COLLISION: if (this.Collisions[index]) this.Collisions[index](_pInst, _pOther); break;
		case EVENT_KEYBOARD: if (this.ObjKeyDown[_event | index]) this.ObjKeyDown[_event | index](_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE: done = false; break;  // Shouldn't get called directly
		case EVENT_OTHER: done = false; break;  // Shouldn't get called directly
		case EVENT_DRAW: if (this.DrawEvent) this.DrawEvent(_pInst, _pOther); else done = false; break;
		case EVENT_KEYPRESS: if (this.ObjKeyPressed[_event | index]) this.ObjKeyPressed[_event | index](_pInst, _pOther); else done = false; break;
		case EVENT_KEYRELEASE: if (this.ObjKeyReleased[_event | index]) this.ObjKeyReleased[_event | index](_pInst, _pOther); else done = false; break;

		case EVENT_STEP_BEGIN: if (this.StepBeginEvent) this.StepBeginEvent(_pInst, _pOther); else done = false; break;
		case EVENT_STEP_NORMAL: if (this.StepNormalEvent) this.StepNormalEvent(_pInst, _pOther); else done = false; break;
		case EVENT_STEP_END: if (this.StepEndEvent) this.StepEndEvent(_pInst, _pOther); else done = false; break;

		case EVENT_OTHER_OUTSIDE: if (this.OutsideEvent) this.OutsideEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_BOUNDARY: if (this.BoundaryEvent) this.BoundaryEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_STARTGAME: if (this.StartGameEvent) this.StartGameEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_ENDGAME: if (this.EndGameEvent) this.EndGameEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_STARTROOM: if (this.StartRoomEvent) this.StartRoomEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_ENDROOM: if (this.EndRoomEvent) this.EndRoomEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_NOLIVES: if (this.NoLivesEvent) this.NoLivesEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_ANIMATIONEND: if (this.AnimationEndEvent) this.AnimationEndEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_ENDOFPATH: if (this.EndOfPathEvent) this.EndOfPathEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_NOHEALTH: if (this.NoHealthEvent) this.NoHealthEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_CLOSEBUTTON: if (this.CloseButtonEvent) this.CloseButtonEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_OUTSIDE_VIEW0: if (this.OutsideView0Event) this.OutsideView0Event(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_BOUNDARY_VIEW0: if (this.BoundaryView0Event) this.BoundaryView0Event(_pInst, _pOther); else done = false; break;

		case EVENT_OTHER_WEB_IMAGE_LOAD: if (this.WebImageLoadedEvent) this.WebImageLoadedEvent(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_WEB_SOUND_LOAD: if (this.WebSoundLoadedEvent) this.WebSoundLoadedEvent(_pInst, _pOther); else done = false; break;

		case EVENT_OTHER_USER0: if (this.UserEvent0) this.UserEvent0(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER1: if (this.UserEvent1) this.UserEvent1(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER2: if (this.UserEvent2) this.UserEvent2(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER3: if (this.UserEvent3) this.UserEvent3(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER4: if (this.UserEvent4) this.UserEvent4(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER5: if (this.UserEvent5) this.UserEvent5(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER6: if (this.UserEvent6) this.UserEvent6(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER7: if (this.UserEvent7) this.UserEvent7(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER8: if (this.UserEvent8) this.UserEvent8(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER9: if (this.UserEvent9) this.UserEvent9(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER10: if (this.UserEvent10) this.UserEvent10(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER11: if (this.UserEvent11) this.UserEvent11(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER12: if (this.UserEvent12) this.UserEvent12(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER13: if (this.UserEvent13) this.UserEvent13(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER14: if (this.UserEvent14) this.UserEvent14(_pInst, _pOther); else done = false; break;
		case EVENT_OTHER_USER15: if (this.UserEvent15) this.UserEvent15(_pInst, _pOther); else done = false; break;


        case EVENT_MOUSE_NOBUTTON: if (this.NoButtonPressed) this.NoButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_LBUTTON_DOWN: if (this.LeftButtonDown) this.LeftButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_RBUTTON_DOWN: if (this.RightButtonDown) this.RightButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_MBUTTON_DOWN: if (this.MiddleButtonDown) this.MiddleButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_LBUTTON_PRESSED: if (this.LeftButtonPressed) this.LeftButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_RBUTTON_PRESSED: if (this.RightButtonPressed) this.RightButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_MBUTTON_PRESSED: if (this.MiddleButtonPressed) this.MiddleButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_LBUTTON_RELEASED: if (this.LeftButtonReleased) this.LeftButtonReleased(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_RBUTTON_RELEASED: if (this.RightButtonReleased) this.RightButtonReleased(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_MBUTTON_RELEASED: if (this.MiddleButtonReleased) this.MiddleButtonReleased(_pInst, _pOther); else done = false; break;

		case EVENT_MOUSE_GLOBAL_LBUTTON_DOWN: if (this.GlobalLeftButtonDown) this.GlobalLeftButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_RBUTTON_DOWN: if (this.GlobalRightButtonDown) this.GlobalRightButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_MBUTTON_DOWN: if (this.GlobalMiddleButtonDown) this.GlobalMiddleButtonDown(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_LBUTTON_PRESSED: if (this.GlobalLeftButtonPressed) this.GlobalLeftButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_RBUTTON_PRESSED: if (this.GlobalRightButtonPressed) this.GlobalRightButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_MBUTTON_PRESSED: if (this.GlobalMiddleButtonPressed) this.GlobalMiddleButtonPressed(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_LBUTTON_RELEASED: if (this.GlobalLeftButtonReleased) this.GlobalLeftButtonReleased(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_RBUTTON_RELEASED: if (this.GlobalRightButtonReleased) this.GlobalRightButtonReleased(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_GLOBAL_MBUTTON_RELEASED: if (this.GlobalMiddleButtonReleased) this.GlobalMiddleButtonReleased(_pInst, _pOther); else done = false; break;

		case EVENT_MOUSE_ENTER: if (this.MouseEnter) this.MouseEnter(_pInst, _pOther); else done = false; break;
		case EVENT_MOUSE_LEAVE: if (this.MouseLeave) this.MouseLeave(_pInst, _pOther); else done = false; break;

		case EVENT_ALARM_0: if (this.ObjAlarm[0] != null) this.ObjAlarm[0](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_1: if (this.ObjAlarm[1] != null) this.ObjAlarm[1](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_2: if (this.ObjAlarm[2] != null) this.ObjAlarm[2](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_3: if (this.ObjAlarm[3] != null) this.ObjAlarm[3](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_4: if (this.ObjAlarm[4] != null) this.ObjAlarm[4](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_5: if (this.ObjAlarm[5] != null) this.ObjAlarm[5](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_6: if (this.ObjAlarm[6] != null) this.ObjAlarm[6](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_7: if (this.ObjAlarm[7] != null) this.ObjAlarm[7](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_8: if (this.ObjAlarm[8] != null) this.ObjAlarm[8](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_9: if (this.ObjAlarm[9] != null) this.ObjAlarm[9](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_10: if (this.ObjAlarm[10] != null) this.ObjAlarm[10](_pInst, _pOther); else done = false; break;
		case EVENT_ALARM_11: if (this.ObjAlarm[11] != null) this.ObjAlarm[11](_pInst, _pOther); else done = false; break;

		default:
			done = false;
	}
	
	g_LastEvent = LastEvent;
	g_LastSubEvent = LastSubEvent;
	return done;
};


// #############################################################################################
/// Function:<summary>
///             Add an instance into the various lists.
///          </summary>
///
/// In:		 <param name="_pInstance"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyObject.prototype.AddInstance = function (_pInstance) {
	this.Instances.Add(_pInstance);
	var pObj = this;
	while (pObj != null)
	{
		pObj.Instances_Recursive.Add(_pInstance);
		pObj = pObj.pParent;
	}
};


// #############################################################################################
/// Function:<summary>
///             Remove an instance from the object and object_recursive list
///          </summary>
///
/// In:		 <param name="_pInstance">Instance to remove</param>
// #############################################################################################
yyObject.prototype.RemoveInstance = function (_pInstance) {
	this.Instances.DeleteItem(_pInstance);

	// Remove instance from "recursive" lists... 	
	var pObjType = this;
	while (pObjType != null)
	{
		pObjType.Instances_Recursive.DeleteItem(_pInstance);
		pObjType = pObjType.pParent;
	}
};



// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_event"></param>
/// In:		 <param name="_index"></param>
// #############################################################################################
yyObject.prototype.PerformInstanceEvent = function (_event, _index) {
	// If we don't do this event, then return...
	if (!this.Event[_event | _index]) return;

	// If this object DOES perform this event, then loop through all its instances and perform the event on each.
	var pool = this.Instances.pool;
	for (var i = 0; i < pool.length; i++)
	{
		var pInst = pool[i];
		this.PerformEvent(_event, _index, pInst, pInst);
	}
};

















// #############################################################################################
/// Function:<summary>
///             Creates an object manager
///          </summary>
// #############################################################################################
function yyObjectManager() {
	this.objnamelist = [];
	this.objidlist = [];
	this.length = 0;
}    


// #############################################################################################
/// Function:<summary>
///          	Get the array of objects
///          </summary>
///
/// Out:	<returns>
///				The object array
///			</returns>
// #############################################################################################
yyObjectManager.prototype.GetPool = function () {
	return this.objidlist;
};

// #############################################################################################
/// Function:<summary>
///             Add an object to the managers lists
///          </summary>
///
/// In:		 <param name="pObj">Object to add</param>
// #############################################################################################
yyObjectManager.prototype.Add = function (_pObj) {
	this.length++;
	this.objnamelist[_pObj.Name] = _pObj;
	this.objidlist[_pObj.ID] = _pObj;
};



// #############################################################################################
/// Function:<summary>
///             Get the object using it's ID as a lookup
///          </summary>
///
/// In:		 <param name="pObj">Object to add</param>
// #############################################################################################
yyObjectManager.prototype.Get = function (_ID) {
	if (_ID < 0) return null;
	return this.objidlist[_ID];
};



// #############################################################################################
/// Function:<summary>
///				Returns whether the object index exists
///          </summary>
///
/// In:		 <param name="_index">Object ID to check for</param>
/// Out:	 <returns>
///				TRUE for yes, FALSE for no
///			 </returns>
// #############################################################################################
yyObjectManager.prototype.Exists = function (_id) {
	if (this.objidlist[_pObj.ID] != null) return true; else return false;
};


// #############################################################################################
/// Function:<summary>
///             Returns the name of the object
///          </summary>
///
/// In:		 <param name="_ID">The object ID/index</param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yyObjectManager.prototype.Get_Object_Name = function (_ID) {
	var pObj = this.objidlist[_index];
	if (pObj == null)
	{
		return "<undefined>";
	} else
	{
		return pObj.Name;
	}
};


// #############################################################################################
/// Function:<summary>
///				Returns the index of object name. -1 if is does not exist
///				Usually only called during level/room initialisation
///          </summary>
///
/// In:		 <param name="name"></param>
/// Out:	 <returns>
///				Object index or -1 for not found
///			 </returns>
// #############################################################################################
yyObjectManager.prototype.Object_Find = function (_name) {
	var pObj = this.objnamelist[_name];
	if (pObj != null) return pObj.ID;
	return -1;
};



// #############################################################################################
/// Function: <summary>
///           	Throw a global event.
///           </summary>
// #############################################################################################
yyObjectManager.prototype.ThrowEvent = function(_event, _index) {
	for (var o in g_pObjectManager.objidlist)
	{
		// get the object
		var pObj = g_pObjectManager.objidlist[o];

		// IF this object wants the event... then perform the event on ALL it's instances.
		if (pObj.Event[_event | _index])
		{
			pObj.PerformInstanceEvent(_event | _index);
		}
	}
};


// #############################################################################################
/// Function: <summary>
///           	
///           </summary>
// #############################################################################################
yyObjectManager.prototype.PatchParents = function () {

	// First, patch up 
	var pool = this.objidlist;
	for (var index in pool)
	{
		var pObj = pool[index];
		pObj.pParent = g_pObjectManager.Get(pObj.ParentID);


		// Copy all the event flags into the Recursive Event array
		for (var e in pObj.Event)
		{
			var evt = pObj.Event[e];
			if (evt)
			{
				pObj.REvent[e] = true; 	// if the parent has the event, then so do we!
			}
		}

	}


	// next, make a "recursive" event flag array.
	for (var index in pool)
	{
		var pMasterObject = pool[index];
		var pObj = pMasterObject.pParent;

		while (pObj != null)
		{
			for (var e in pObj.Event)
			{
				var evt = pObj.Event[e];
				if (evt)
				{
					pMasterObject.REvent[e] = true; 	// if the parent has the event, then so do we!
				}
			}
			pObj = pObj.pParent;
		}
	}
};










// #############################################################################################
/// Function:<summary>
///				Returns the object as an ARRAY using it's ID as a lookup.
///             (Used in GML to do a with() on an ID).
///          </summary>
///
/// In:		 <param name="_ID">ID of object</param>
/// Out:	 <returns>
///				An object in an array.
///			 </returns>
// #############################################################################################
function  GetWithArray( _ID )
{
    if( _ID == OBJECT_ALL ){
        return g_RunRoom.GetPool();
    }
    var pObj = g_pObjectManager.Get(_ID);
    if( pObj!=null ) return pObj.Instances_Recursive.pool;

    var pInst = g_pInstanceManager.Get(_ID);
    if( pInst!=null ) {
        var t = [];
        t[0] =pInst;
        return t;
    }
    
    return null;
}



