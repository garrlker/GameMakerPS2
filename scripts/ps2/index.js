// const font = new Font("default");

// let ee_info = System.getCPUInfo();
// let free_mem = `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`;

// const loadScript = (script) => {
//   // Print to console for PCSX2 debugging
//   free_mem = `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`;
//   debug(`loadingScript: ${script} | Current Free RAM: ${free_mem}`);
  
//   // Render to screen for PS2 debugging
//   Screen.clear(); // Clear screen for the next frame.
//   font.print(10, 10, `RAM: ${Math.floor(System.getMemoryStats().used / 1048576)}MB / ${Math.floor(ee_info.RAMSize / 1048576)}MB`);
//   font.print(10, 30, `MODULE: ${script}`);
//   Screen.flip(); // Updates the screen.
//   std.loadScript("scripts/ps2/" + script)
// }

// Add all the ps2 engine patches here
loadScript("scripts/ps2/Globals.js");
loadScript("scripts/ps2/yyAllocate.js");
loadScript("scripts/ps2/LoadGame.js");
loadScript("scripts/ps2/yyIOManager.js");
loadScript("scripts/ps2/yyRoom.js");
loadScript("scripts/ps2/yyTile.js");
loadScript("scripts/ps2/yyGraphics.js");
loadScript("scripts/ps2/yySound.js");
loadScript("scripts/ps2/functions/Function_Debug.js");
loadScript("scripts/ps2/functions/Function_Gamepad.js");
loadScript("scripts/ps2/_GameMaker.js");
