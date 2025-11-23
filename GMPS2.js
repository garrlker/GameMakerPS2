import createCanvas from "canvas/index.js";
const canvas = createCanvas();
console.log("Starting ps2.js")


const font = new Font("default");

Screen.setVSync(true);
Screen.waitVblankStart(true);
Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);


// Setup global stubs
std.evalScript(`
  var window = globalThis;
  globalThis.document = {}
  globalThis.navigator = {}

  // Piggyback on engine debug logs
  alert = debug = console.log
`) // For some reason, window is undefined in the script, so we need to set it to globalThis

window.addEventListener = (eventName) => { console.log(`addEventListener: ${eventName}`); }
window.open = () => {} // No opening browsers
window.focus = () => {} // No focusing windows
window.requestAnimFrame = (callback) => {}
window.devicePixelRatio = 1;
window.requestAnimationFrame = (callback) => {
  os.setTimeout(callback, 1000 / 60);
  return 0;
}


globalThis.convertGMColorToRGBA = function(color, alpha = 1.0) {
  return Color.new(
		color & 0xFF,
		(color >> 8) & 0xFF,
		(color >> 16) & 0xFF,
		255 * alpha
	)
}

// stub document methods, let the engine grab our canvas impl 
document.getElementById = (elementId) => {
  console.log(`getElementById: ${elementId}`);

  if(elementId === "canvas") {
    return canvas;
  }
}

document.createElement = (elementType) => {
  console.log(`createElement: ${elementType}`);

  return {

  }
}


let ee_info = System.getCPUInfo();
let free_mem = `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`;

// Loads a script, outputs debug info to screen and console
globalThis.loadScript = (script) => {
  // Print to console for PCSX2 debugging
  free_mem = `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`;
  debug(`loadingScript: ${script} | Current Free RAM: ${free_mem}`);
  
  // Render to screen for PS2 debugging
  Screen.clear(); // Clear screen for the next frame.
  font.print(10, 10, `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`);
  font.print(10, 30, `MODULE: ${script}`);
  Screen.flip(); // Updates the screen.
  std.loadScript(script)
}

/**
 *   runner.js uses document.write to load script tags in the browser
 *   Knowing that, we intercept the write calls, strip the script path out of the tag
 *   and load it into Athena with std.loadScript
 *
 **/
globalThis.document.write = (scriptTag) => {
  const scriptPath = scriptTag.replace('<script type="text/javascript" src="', "").replace('"></script>', "");
  loadScript(scriptPath)
}

// globalThis.g_GameMakerHTML5Dir overrides the g_RootDir variable in the engine
std.evalScript(`globalThis.g_GameMakerHTML5Dir = "platformer/html5game/"`)

// Runner.js is the entry point for the original engine
loadScript("scripts/runner.js")

// Loads the ps2 engine patches
loadScript("scripts/ps2/index.js");

debug("ENGINE Loading complete")

// Loads game script
loadScript("platformer/html5game/platformer.js");

// NOTE: By default the html5 game.js files are bugged for athena
// We need to update a couple arrays ([]s) to be `new Array()`, like fonts and tiles
// and also watch out for `=instance_create()` calls 
// Lots of trial and error to ensure games run
// Eventually we should load the string into this function and have it patch them automatically

// Should call GameMaker_Init
window.onload?.();