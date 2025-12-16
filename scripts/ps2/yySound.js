
// **********************************************************************************************************************
// 
// Copyright (c)2011, YoYo Games Ltd. All Rights reserved.
// 
// File:            yySound.js
// Created:         24/02/2011
// Author:          Mike
// Project:         HTML5
// Description:     
// 
// Date				Version		BY		Comment
// ----------------------------------------------------------------------------------------------------------------------
// 24/02/2011		
// 
// **********************************************************************************************************************


var g_RawSounds = [];

// #############################################################################################
/// Function:<summary>
///             
///          </summary>
///
/// In:		 <param name="_pSnd"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function    Sound_SetOurFunction( _pSnd )
{
}

function canPlayAudioMP3(callback)
{

	// PS2 supports WAV & OGG for streaming background music and ADPCM for sound effects
	return false;
	try {
		var audio = new Audio();
		//Shortcut which doesn't work in Chrome (always returns ""); pass through
		// if "maybe" to do asynchronous check by loading MP3 data: URI
		if(audio.canPlayType('audio/mpeg') == "probably")
			callback(true);

		//If this event fires, then MP3s can be played
		audio.addEventListener('canplaythrough', function(e){
			callback(true);
		}, false);

		//If this is fired, then client can't play MP3s
		audio.addEventListener('error', function(e){
			callback(false, this.error)
		}, false);

		//Smallest base64-encoded MP3 I could come up with (<0.000001 seconds long)
		audio.src = "data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
		audio.load();
	}
	catch(e){
		callback(false, e);
	}
}

// #############################################################################################
/// Function:<summary>
///             Initialise a Sound from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function yySound() {
	this.pName = "";
	this.kind = 0;
	this.extension = "";
	this.origName = "";
	this.effects = 0;
	this.volume = 1;
	this.pan = 0;
	this.preload = true;
	this.sysVolume = 1.0;
	this.soundindex = 0;
	this.pSoundFiles = [];
}

// #############################################################################################
/// Function:<summary>
///             Initialise a Sound from storage
///          </summary>
///
/// In:		 <param name="_pStorage"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
yySound.prototype.LoadFromStorage = function (_pStorage) {

	this.pName = _pStorage.pName;                           // "pName": "xDrop",
	this.kind = _pStorage.kind;                             // "kind": 0,
	this.extension = _pStorage.extension;                   // "extension": ".wav",
	this.origName = _pStorage.origName;                    // "origName": "DropOne.wav",
	this.effects = _pStorage.effects;                       // "effects": 0,
	this.volume = _pStorage.volume;                         // "volume": 1,
	this.pan = _pStorage.pan;                               // "pan": 0,
	this.preload = _pStorage.preload;                       // "preload": true,
	this.sysVolume = 1.0;

	// Load sound
	this.AddSound(this.pName);

};


// #############################################################################################
/// Property: <summary>
///           	Add the raw sound "pool"
///           </summary>
// #############################################################################################
yySound.prototype.AddSound = function (_snd) {
	this.soundindex = 0;
	this.pSoundFiles = [];
	for (var i = 0; i < MAX_SOUNDS; i++)
	{
		if (g_RawSounds[this.pName] != null)
		{
			// cloneNode(true) does not appear to work on IE... sweeeeet.  :(
			//this.pSoundFiles[i] = g_RawSounds[this.pName].cloneNode(true);
			this.pSoundFiles[i] = g_RawSounds[this.pName];
			//Sound_SetOurFunction( this.pSoundFiles[i] );
		}
	}

};


// #############################################################################################
/// Function:<summary>
///             Add a RAW sound to the pool
///          </summary>
///
/// In:		 <param name="_filename">URL to load from</param>
///			 <param name="_id"></param>
///			 <param name="_ext"></param>
///			 <param name="_onload"></param>
///			 <param name="_onerror"></param>
/// Out:	 <returns>
///				
///			 </returns>
// #############################################################################################
function SoundManager_AddRawSound(_url, _id, _ext, _onload, _onerror, _sound) 
{
	if (AUDIO_ON == false)
	{
		//_onerror();
		return -1;
	}

    //var load_via_BACKGROUND = false;
    var index;

    index = _url.indexOf(_ext);
    if( index>=0 ){
        _url = _url.substr(0,index);
    }
    
	_ext = "ogg";

	// Prefer adp for sound effects, ogg for background music
	var snd = null;
	// Sound Effect
	if(_sound.kind == 0) {
		_url = _url+".adp";
		snd = new Sound.Sfx(_url);
		snd.volume = _sound.volume * 100;
	} else {
		// Background Music
		_url = _url+".ogg";
		snd = new Sound.Stream(_url);
	}

	// var snd = new Audio();
	snd.URL = _url;
	console.log("snd.URL: " + snd.URL);
	// snd.autobuffer=true;
	// snd.loop=false;
	// snd.preload = 'auto';
	// snd.DoingLoading = false;			// our "loading" flag.


	g_RawSounds[_id] = snd;

	// Marks the sound as loaded
	_onload();

    return _id;
}

// #############################################################################################
/// Function:<summary>
///             Create a new Sound manager
///          </summary>
// #############################################################################################
function    yySoundManager( )
{
    this.Sounds = [];
    this.length = 0;

	// Can only have one stream playing at a time
	this.currentStream = null;
}


// #############################################################################################
/// Function:<summary>
///             Delete a sound from the list
///          </summary>
///
/// In:		 <param name="_index">Sound to delete</param>
// #############################################################################################
yySoundManager.prototype.Delete = function (_index) {
	if(this.Sounds[_index])
	{
		this.Stop(_index);
		this.Sounds[_index] = undefined;
	}
};

// #############################################################################################
/// Function:<summary>
///             Play a sound
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.Play = function (_index) {
	//var thissound=document.getElementById(Sounds[_index].origName);
	console.log("Play: ", JSON.stringify(this.Sounds[_index]));
	var pSoundFile = this.Sounds[_index].pSoundFiles[this.Sounds[_index].soundindex];
	this.Sounds[_index].soundindex++;

	// Not throwing this away, commenting out for testing. We should keep it
	if (this.Sounds[_index].soundindex >= MAX_SOUNDS) this.Sounds[_index].soundindex = 0;
	if (pSoundFile != null)
	{
		// If the sound is a stream, we need to stop the current stream and play the new one
		if(this.Sounds[_index].kind === 1) {
			if(this.currentStream !== null) {
				this.currentStream.pause();
			}
			this.currentStream = pSoundFile;
			this.currentStream.volume = 100;
			this.currentStream.play();
			return;
		}


		try
		{
			try
			{
				if (pSoundFile.currentTime != 0){
					// pSoundFile.currentTime = 0; // Only stream positions can be set
				}
			} catch (ex)
			{
				debug("Error setting current sound time: " + this.Sounds[_index].pName);
			}
			pSoundFile.volume = this.Sounds[_index].sysVolume * g_GlobalVolume * 100; // PS2 volume is 0-100
			pSoundFile.play();
		} catch (ex)
		{
			debug("Error playing sound: " + this.Sounds[_index].pName);
		}
	}
};



// #############################################################################################
/// Function:<summary>
///             Stop a sound of a specific type
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.Stop = function (_type) {
	with (this)
	{
		var pSounds = Sounds[_type].pSoundFiles;

		for (var i in pSounds)
		{
			pSoundFile = pSounds[i];
			if (pSoundFile != null)
			{
				try
				{
					pSoundFile.pause();
				} catch (ex)
				{
					debug("Error stopping sound: " + this.Sounds[_type].pName);
				}
			}
		}
	}
};

// #############################################################################################
/// Function:<summary>
///             Stop a sound of a specific type
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.StopAll = function () {

	// loop through all sounds.
	for (var snds in this.Sounds)
	{
	    if (this.Sounds[snds])
	    {
		    var pSounds = this.Sounds[snds].pSoundFiles;

		    for (var i in pSounds)
		    {
		    	pSoundFile = pSounds[i];
		    	if (pSoundFile != null)
		    	{
		    		try
		    		{
		    			pSoundFile.pause();
		    		} 
		    		catch (ex)
		    		{
		    			debug("Error stopping sound: " + pSoundFile.pName);
		    		}
		    	}
		    }
		}
	}	
};

// #############################################################################################
/// Function:<summary>
///             Stop a sound of a specific type
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.SetGlobalVolume = function (_volume) {

	g_GlobalVolume = _volume;

	// loop through all sounds and adjust their volume accordingly
	for (var snds in this.Sounds)
	{
		if (this.Sounds[snds])
		{
			var pSounds = this.Sounds[snds].pSoundFiles;

			for (var i in pSounds)
			{
				pSoundFile = pSounds[i];
				if (pSoundFile != null)
				{
					try
					{
						pSoundFile.volume = pSounds.sysVolume * g_GlobalVolume;
					}
					catch (ex)
					{
						debug("Error setting volume: " + this.Sounds[snds].pName);
					}
				}
			}
		}
	}
};




// #############################################################################################
/// Function:<summary>
///             Stop a sound of a specific type
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.Loop = function (_type) {
	with (this)
	{
		var pSounds = Sounds[_type].pSoundFiles;

		for (var i in pSounds)
		{
			pSoundFile = pSounds[i];
			if (pSoundFile != null)
			{
				try
				{
					// TODO: Can we access Kind from the sound file? Would be nicer than checking for a loop property
					if (pSoundFile.loop !== undefined) {
						pSoundFile.loop = true;
					}
				} catch (ex)
				{
					debug("Error looping sound: " + this.Sounds[_type].pName);
				}
			}
		}
		Play(_type);
	}
};


// #############################################################################################
/// Function:<summary>
///             Set the volume for the sound type
///          </summary>
///
/// In:		 <param name="_type">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.Volume = function (_type, _vol) {
	with (this)
	{
		var pSounds = Sounds[_type].pSoundFiles;

		for (var i in pSounds)
		{
			pSoundFile = pSounds[i];
			if (pSoundFile != null)
			{
				try
				{
					Sounds[_type].sysVolume = _vol;
					pSoundFile.volume = _vol * g_GlobalVolume;
				} catch (ex)
				{
					debug("Error volume: " + this.Sounds[_type].pName);
				}
			}
		}
	}
};

// #############################################################################################
/// Function:<summary>
///             Set the volume for the sound index over a given time (in milliseconds)
///          </summary>
///
/// In:		 <param name="_type">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.VolumeOverTime = function(_index, _vol, _time) {
    
    var pSound = this.Sounds[_index];
    var pSounds = pSound.pSoundFiles;
	for (var i in pSounds)
	{
		var pSoundFile = pSounds[i];
		if (pSoundFile != null)
		{
			try
			{
			    // Uses setTimeout to call back to us every {interval}ms whereupon we can update the sound volume until we've reached the final volume			    
			    var interval = 50;
			    var startVolume = pSound.sysVolume;
			    var targetVolume = _vol;
			    var volumeStep = Math.abs(startVolume - targetVolume) / (_time / interval);
						    
			    function doFade() {
			        setTimeout(function() {
			        
			            var newVolume;
                        if ((startVolume < targetVolume) && (pSoundFile.volume < targetVolume)) {
                            newVolume = pSound.sysVolume + volumeStep;
                        } 
                        else if ((startVolume > targetVolume) && (pSoundFile.volume > targetVolume)) {
                            newVolume = pSound.sysVolume - volumeStep;
                        } 
                        else {
                            return;
                        }
                        
                        if (newVolume < 0) { newVolume = 0; }
                        if (newVolume > 1) { newVolume = 1; }
                        
                        pSound.sysVolume = newVolume;
                        pSoundFile.volume = newVolume * g_GlobalVolume;                        
                        doFade();
                        
                    }, interval);
                }
                doFade();
			}
			catch (ex)
			{
				debug("Error volume: " + pSound.pName);
			}
		}
	}
};

// #############################################################################################
/// Function:<summary>
///             Stop a sound of a specific type
///          </summary>
///
/// In:		 <param name="_index">Sound to play</param>
// #############################################################################################
yySoundManager.prototype.SoundIsPlaying = function (_type) {
	with (this)
	{
		var pSounds = Sounds[_type].pSoundFiles;

		var playing = false;
		for (var i in pSounds)
		{
			pSoundFile = pSounds[i];
			if (pSoundFile != null)
			{
				try
				{
					if (!(pSoundFile.ened == true || pSoundFile.paused == true))
					{
						playing = true;
						break;
					}
				} catch (ex)
				{
					debug("Error checking play state: " + this.Sounds[_type].pName);
				}
			}
		}
		return playing;
	}
};


// #############################################################################################
/// Function:<summary>
///             Get a Sound from the manager
///          </summary>
///
/// In:		 <param name="_indexe">Sound to retrieve</param>
// #############################################################################################
yySoundManager.prototype.Get = function (_index) {
	return this.Sounds[_index];
};



// #############################################################################################
/// Function:<summary>
///             Add a new Sound image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Sound image Storage</param>
// #############################################################################################
yySoundManager.prototype.Clear = function () {
	this.Sounds = [];
	length = 0;
};


// #############################################################################################
/// Function:<summary>
///             Add a new Sound image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Sound image Storage</param>
// #############################################################################################
yySoundManager.prototype.Add = function (_pStorage) {
	with (this)
	{
		var pBack = null;
		if (_pStorage != null)
		{
			pBack = new yySound();
			pBack.LoadFromStorage(_pStorage);
		}
		Sounds[Sounds.length] = pBack;
	}
};



// #############################################################################################
/// Function:<summary>
///             Add a new Sound image into the pool
///          </summary>
///
/// In:		 <param name="_pStorage">Sound image Storage</param>
// #############################################################################################
yySoundManager.prototype.Create = function () {
	var pSnd = new yySound();
	this.Sounds[this.Sounds.length] = pSnd;
	return this.Sounds.length - 1;
};





