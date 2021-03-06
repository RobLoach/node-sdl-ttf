var sdl = require('node-sdl2')
var ttf = require('..')

// Initialize SDL
if (sdl.SDL_Init(sdl.SDL_INIT_EVERYTHING) != 0) {
	console.log("SDL_Init Error: " + sdl.SDL_GetError())
	process.exit(1)
}

// Create the window.
var win = sdl.SDL_CreateWindow("Hello World!", 100, 100, 640, 480, sdl.SDL_WINDOW_SHOWN)
if (!win){
	console.log("SDL_CreateWindow Error: " + sdl.SDL_GetError())
	process.exit(1)
}

var screen = sdl.SDL_GetWindowSurface(win)
if (screen.isNull()) {
	console.log("SDL_GetWindowSurface Error: " + sdl.SDL_GetError())
	process.exit(1)
}

// Initialize TTF.
if (ttf.TTF_Init() === -1) {
	console.log("TTF_Init Error: " + ttf.TTF_GetError())
	process.exit(1)
}

// Load the font.
var font = ttf.TTF_OpenFont('test/tuffy.ttf', 12)
if (font.isNull()) {
	console.log("TTF_OpenFont Error: " + ttf.TTF_GetError());
	process.exit(1)
}

// Render the surface.
var col = new sdl.SDL_Color({
	r: 0,
	g: 0,
	b: 0
})
var surface = ttf.TTF_RenderText_Solid(font, "Hello World", col)
if (surface.isNull()) {
	console.log("TTF_RenderText_Solid Error: " + ttf.TTF_GetError());
	process.exit(1)
}

// Render it on the screen
// TODO: Segmentation fault (core dumped) when blitting the surface to the screen?
var a = sdl.SDL_BlitSurface(surface, null, screen, null)
if (a !== 0) {
	console.log("SDL_BlitSurface Error: " + sdl.SDL_GetError());
	process.exit(1)
}

if (sdl.SDL_UpdateWindowSurface(win) !== 0) {
	console.log("SDL_UpdateWindowSurface Error: " + sdl.SDL_GetError());
	process.exit(1)
}

// Take a quick break after all that hard work
sdl.SDL_Delay(4000)

// Clean up our objects and quit
sdl.SDL_FreeSurface(surface)
ttf.TTF_CloseFont(font)
sdl.SDL_DestroyWindow(win)
ttf.TTF_Quit()
sdl.SDL_Quit()
