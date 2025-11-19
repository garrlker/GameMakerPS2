var JSON_game = {
	Extensions: [],
	Sounds: [
	],
	Sprites: [
	    {
		pName: "walk_right",
		width: 32, height: 32,
		smooth: false,
		bboxLeft: 4, bboxRight: 29, bboxBottom: 31,		TPEntryIndex: [ 0, 1, 2, 3, 4, 5, 6, 7]
	    },
	    {
		pName: "walk_left",
		width: 32, height: 32,
		smooth: false,
		bboxLeft: 2, bboxRight: 27, bboxBottom: 31,		TPEntryIndex: [ 8, 9, 10, 11, 12, 13, 14, 15]
	    },
	    {
		pName: "fall_right",
		width: 32, height: 32,
		smooth: false,
		bboxLeft: 6, bboxRight: 30, bboxBottom: 28,		TPEntryIndex: [ 16]
	    },
	    {
		pName: "fall_left",
		width: 32, height: 32,
		smooth: false,
		bboxLeft: 1, bboxRight: 25, bboxBottom: 28,		TPEntryIndex: [ 17]
	    },
	    {
		pName: "jump_left",
		width: 32, height: 32,
		smooth: false,
 bboxRight: 28, bboxBottom: 30,		TPEntryIndex: [ 18]
	    },
	    {
		pName: "jump_right",
		width: 32, height: 32,
		smooth: false,
		bboxLeft: 3, bboxRight: 31, bboxBottom: 30,		TPEntryIndex: [ 19]
	    }	],
	Backgrounds: [
		{ pName: "background2", transparent: false, smooth: false, preload: false, TPEntryIndex: 20 }	],
	Paths: [
		{ pName: "path0", kind: 0, closed: true, precision: 4, points : [
{ x:48, y:48, speed:100 },
{ x:304, y:48, speed:100 },
{ x:176, y:48, speed:100 } ]},
		{ pName: "path1", kind: 0, closed: true, precision: 4, points : [
{ x:624, y:80, speed:100 },
{ x:720, y:80, speed:100 },
{ x:672, y:80, speed:100 } ]},
		{ pName: "path2", kind: 0, closed: true, precision: 4, points : [
{ x:528, y:208, speed:100 },
{ x:656, y:208, speed:100 },
{ x:592, y:208, speed:100 } ]}	],
	Fonts: [
		{ pName: "font0", size: 12, bold: true, italic: false, first: 67108896, last: 127, TPageEntry: 21, scaleX: 1, scaleY: 1, glyphs: new Array(
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 28, y: 61, w: 4, h: 19, shift: 4, offset: 0  },
			{ x: 160, y: 61, w: 2, h: 15, shift: 4, offset: 1  },
			{ x: 113, y: 61, w: 6, h: 7, shift: 8, offset: 1  },
			{ x: 214, y: 41, w: 7, h: 15, shift: 9, offset: 1  },
			{ x: 180, y: 41, w: 7, h: 16, shift: 9, offset: 1  },
			{ x: 17, y: 0, w: 15, h: 15, shift: 16, offset: 0  },
			{ x: 174, y: 0, w: 11, h: 15, shift: 12, offset: 1  },
			{ x: 169, y: 61, w: 2, h: 7, shift: 4, offset: 1  },
			{ x: 89, y: 61, w: 4, h: 18, shift: 5, offset: 1  },
			{ x: 83, y: 61, w: 4, h: 18, shift: 5, offset: 0  },
			{ x: 133, y: 61, w: 5, h: 7, shift: 6, offset: 0  },
			{ x: 241, y: 41, w: 8, h: 13, shift: 9, offset: 0  },
			{ x: 121, y: 61, w: 2, h: 18, shift: 4, offset: 1  },
			{ x: 107, y: 61, w: 4, h: 12, shift: 5, offset: 1  },
			{ x: 148, y: 61, w: 2, h: 15, shift: 4, offset: 1  },
			{ x: 101, y: 61, w: 4, h: 15, shift: 4, offset: 0  },
			{ x: 190, y: 21, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 48, y: 61, w: 5, h: 15, shift: 9, offset: 1  },
			{ x: 120, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 130, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 140, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 100, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 40, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 50, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 20, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 70, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 144, y: 61, w: 2, h: 15, shift: 6, offset: 2  },
			{ x: 129, y: 61, w: 2, h: 18, shift: 6, offset: 2  },
			{ x: 160, y: 41, w: 8, h: 14, shift: 9, offset: 0  },
			{ x: 18, y: 61, w: 8, h: 11, shift: 9, offset: 0  },
			{ x: 170, y: 41, w: 8, h: 14, shift: 9, offset: 0  },
			{ x: 30, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 0, y: 0, w: 15, h: 19, shift: 16, offset: 1  },
			{ x: 148, y: 0, w: 11, h: 15, shift: 11, offset: 0  },
			{ x: 235, y: 0, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 0, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 223, y: 0, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 147, y: 21, w: 9, h: 15, shift: 11, offset: 1  },
			{ x: 150, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 12, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 60, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 140, y: 61, w: 2, h: 15, shift: 4, offset: 1  },
			{ x: 110, y: 41, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 161, y: 0, w: 11, h: 15, shift: 12, offset: 1  },
			{ x: 210, y: 21, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 135, y: 0, w: 11, h: 15, shift: 13, offset: 1  },
			{ x: 48, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 24, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 136, y: 21, w: 9, h: 15, shift: 11, offset: 1  },
			{ x: 211, y: 0, w: 10, h: 16, shift: 12, offset: 1  },
			{ x: 122, y: 0, w: 11, h: 15, shift: 12, offset: 1  },
			{ x: 114, y: 21, w: 9, h: 15, shift: 11, offset: 1  },
			{ x: 36, y: 21, w: 10, h: 15, shift: 10, offset: 0  },
			{ x: 72, y: 21, w: 10, h: 15, shift: 12, offset: 1  },
			{ x: 64, y: 0, w: 13, h: 15, shift: 12, offset: -1  },
			{ x: 34, y: 0, w: 15, h: 15, shift: 15, offset: 0  },
			{ x: 187, y: 0, w: 11, h: 15, shift: 11, offset: 0  },
			{ x: 108, y: 0, w: 12, h: 15, shift: 11, offset: -1  },
			{ x: 169, y: 21, w: 9, h: 15, shift: 9, offset: 0  },
			{ x: 77, y: 61, w: 4, h: 18, shift: 5, offset: 1  },
			{ x: 95, y: 61, w: 4, h: 15, shift: 4, offset: 0  },
			{ x: 61, y: 61, w: 4, h: 18, shift: 5, offset: 0  },
			{ x: 67, y: 61, w: 8, h: 9, shift: 9, offset: 0  },
			{ x: 200, y: 0, w: 9, h: 18, shift: 9, offset: 0  },
			{ x: 164, y: 61, w: 3, h: 5, shift: 5, offset: 0  },
			{ x: 200, y: 21, w: 8, h: 15, shift: 9, offset: 1  },
			{ x: 220, y: 21, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 223, y: 41, w: 7, h: 15, shift: 9, offset: 1  },
			{ x: 0, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 232, y: 41, w: 7, h: 15, shift: 9, offset: 1  },
			{ x: 0, y: 61, w: 6, h: 15, shift: 5, offset: 0  },
			{ x: 94, y: 21, w: 8, h: 18, shift: 10, offset: 1  },
			{ x: 240, y: 21, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 152, y: 61, w: 2, h: 15, shift: 4, offset: 1  },
			{ x: 55, y: 61, w: 4, h: 18, shift: 5, offset: -1  },
			{ x: 230, y: 21, w: 8, h: 15, shift: 9, offset: 1  },
			{ x: 156, y: 61, w: 2, h: 15, shift: 4, offset: 1  },
			{ x: 94, y: 0, w: 12, h: 15, shift: 14, offset: 1  },
			{ x: 80, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 90, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 104, y: 21, w: 8, h: 18, shift: 10, offset: 1  },
			{ x: 84, y: 21, w: 8, h: 18, shift: 10, offset: 1  },
			{ x: 34, y: 61, w: 5, h: 15, shift: 6, offset: 1  },
			{ x: 180, y: 21, w: 8, h: 15, shift: 9, offset: 0  },
			{ x: 41, y: 61, w: 5, h: 15, shift: 5, offset: 0  },
			{ x: 10, y: 41, w: 8, h: 15, shift: 10, offset: 1  },
			{ x: 125, y: 21, w: 9, h: 15, shift: 9, offset: 0  },
			{ x: 79, y: 0, w: 13, h: 15, shift: 13, offset: 0  },
			{ x: 158, y: 21, w: 9, h: 15, shift: 9, offset: 0  },
			{ x: 51, y: 0, w: 11, h: 18, shift: 10, offset: -1  },
			{ x: 205, y: 41, w: 7, h: 15, shift: 9, offset: 1  },
			{ x: 197, y: 41, w: 6, h: 18, shift: 6, offset: 0  },
			{ x: 125, y: 61, w: 2, h: 18, shift: 4, offset: 1  },
			{ x: 189, y: 41, w: 6, h: 18, shift: 6, offset: 0  },
			{ x: 8, y: 61, w: 8, h: 11, shift: 9, offset: 1  },
			{ x: 60, y: 41, w: 8, h: 15, shift: 12, offset: 2  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
			{ x: 0, y: 0, w: 0, h: 0, shift: 0, offset: 0  },
		),
		}	],
	Timelines: [
	],
	GMObjects: [
		{			pName: "player",  visible: true,  depth: -10,  parent: -100,  CreateEvent: gml_Object_player_Create_0,
 StepNormalEvent: gml_Object_player_Step_0,
 KeyPressed_SPACE: gml_Object_player_KeyPress_32,
 CollisionEvents: [  ]
 },
		{			pName: "baddie",  visible: true,  parent: -100,  CreateEvent: gml_Object_baddie_Create_0,
 StepNormalEvent: gml_Object_baddie_Step_0,
 CollisionEvents: [  0, gml_Object_baddie_Collision_0 ]
 },
		{			pName: "minime",  visible: true,  parent: -100,  CreateEvent: gml_Object_minime_Create_0,
 StepNormalEvent: gml_Object_minime_Step_0,
 DrawEvent: gml_Object_minime_Draw_0,
 CollisionEvents: [  ]
 }	],
	GMRooms: [
		{	
			pName:"room0",
			height:288,
			speed:60,
			colour:13999472,
			enableViews:true,
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
				{ visible:true,  wview:400,  hview:288,  wport:400,  hport:288,  hborder:128,  vborder:128,  index:0  },
				{ xview:768,  wview:768,  hview:512,  xport:390,  wport:384,  hport:256,  index:-100  },
				{ index:-100  },
				{ index:-100  },
				{ index:-100  },
				{ index:-100  },
				{ index:-100  },
				{ index:-100  }			],
			pInstances:[
				{ x:32,  y:32,  index:1,  id:100000 , pCode: gml_RoomCC_room0_0_Create,  },
				{ x:608,  y:64,  index:1,  id:100001 , pCode: gml_RoomCC_room0_1_Create,  },
				{ x:512,  y:192,  index:1,  id:100002 , pCode: gml_RoomCC_room0_2_Create,  },
				{ x:64,  y:192,  index:0,  id:100003  }			],
			tiles: new Array(
				{ x:352,  y:224,  w:32,  h:32,  depth:10,  id:10000000  },
				{ x:384,  y:224,  w:32,  h:32,  depth:10,  id:10000001  },
				{ x:416,  y:224,  w:32,  h:32,  depth:10,  id:10000002  },
				{ x:992,  y:224,  w:32,  h:32,  depth:10,  id:10000003  },
				{ x:992,  y:192,  w:32,  h:32,  depth:10,  id:10000004  },
				{ x:992,  y:160,  w:32,  h:32,  depth:10,  id:10000005  },
				{ x:992,  y:128,  w:32,  h:32,  depth:10,  id:10000006  },
				{ x:992,  y:96,  w:32,  h:32,  depth:10,  id:10000007  },
				{ x:992,  y:64,  w:32,  h:32,  depth:10,  id:10000008  },
				{ x:800,  y:160,  w:32,  h:32,  depth:10,  id:10000009  },
				{ x:832,  y:160,  w:32,  h:32,  depth:10,  id:10000010  },
				{ x:864,  y:160,  w:32,  h:32,  depth:10,  id:10000011  },
				{ x:896,  y:160,  w:32,  h:32,  depth:10,  id:10000012  },
				{ x:928,  y:160,  w:32,  h:32,  depth:10,  id:10000013  },
				{ x:960,  y:160,  w:32,  h:32,  depth:10,  id:10000014  },
				{ x:832,  y:128,  xo:160,  w:32,  h:32,  depth:10,  id:10000015  },
				{ x:864,  y:128,  xo:160,  w:32,  h:32,  depth:10,  id:10000016  },
				{ x:896,  y:128,  xo:160,  w:32,  h:32,  depth:10,  id:10000017  },
				{ x:928,  y:128,  xo:160,  w:32,  h:32,  depth:10,  id:10000018  },
				{ x:960,  y:128,  xo:160,  w:32,  h:32,  depth:10,  id:10000019  },
				{ x:768,  y:224,  w:32,  h:32,  depth:10,  id:10000020  },
				{ x:800,  y:224,  w:32,  h:32,  depth:10,  id:10000021  },
				{ x:832,  y:224,  w:32,  h:32,  depth:10,  id:10000022  },
				{ x:864,  y:224,  w:32,  h:32,  depth:10,  id:10000023  },
				{ x:896,  y:224,  w:32,  h:32,  depth:10,  id:10000024  },
				{ x:928,  y:224,  w:32,  h:32,  depth:10,  id:10000025  },
				{ x:960,  y:224,  w:32,  h:32,  depth:10,  id:10000026  },
				{ x:736,  y:224,  w:32,  h:32,  depth:10,  id:10000027  },
				{ x:704,  y:224,  w:32,  h:32,  depth:10,  id:10000028  },
				{ x:672,  y:224,  w:32,  h:32,  depth:10,  id:10000029  },
				{ x:640,  y:224,  w:32,  h:32,  depth:10,  id:10000030  },
				{ x:608,  y:224,  w:32,  h:32,  depth:10,  id:10000031  },
				{ x:576,  y:224,  w:32,  h:32,  depth:10,  id:10000032  },
				{ x:544,  y:224,  w:32,  h:32,  depth:10,  id:10000033  },
				{ x:512,  y:224,  w:32,  h:32,  depth:10,  id:10000034  },
				{ x:480,  y:224,  w:32,  h:32,  depth:10,  id:10000035  },
				{ x:448,  y:224,  w:32,  h:32,  depth:10,  id:10000036  },
				{ x:288,  y:224,  w:32,  h:32,  depth:10,  id:10000037  },
				{ x:320,  y:224,  w:32,  h:32,  depth:10,  id:10000038  },
				{ x:384,  y:192,  w:32,  h:32,  depth:10,  id:10000039  },
				{ x:384,  y:160,  w:32,  h:32,  depth:10,  id:10000040  },
				{ x:384,  y:128,  w:32,  h:32,  depth:10,  id:10000041  },
				{ x:352,  y:160,  w:32,  h:32,  depth:10,  id:10000042  },
				{ x:320,  y:192,  w:32,  h:32,  depth:10,  id:10000043  },
				{ x:352,  y:192,  w:32,  h:32,  depth:10,  id:10000044  },
				{ x:416,  y:192,  w:32,  h:32,  depth:10,  id:10000045  },
				{ x:448,  y:192,  w:32,  h:32,  depth:10,  id:10000046  },
				{ x:416,  y:160,  w:32,  h:32,  depth:10,  id:10000047  },
				{ x:288,  y:192,  xo:192,  w:32,  h:32,  depth:10,  id:10000048  },
				{ x:320,  y:160,  xo:192,  w:32,  h:32,  depth:10,  id:10000049  },
				{ x:352,  y:128,  xo:192,  w:32,  h:32,  depth:10,  id:10000050  },
				{ x:256,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000051  },
				{ x:224,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000052  },
				{ x:192,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000053  },
				{ x:160,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000054  },
				{ x:128,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000055  },
				{ x:96,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000056  },
				{ x:64,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000057  },
				{ x:32,  y:64,  xo:128,  w:32,  h:32,  depth:10,  id:10000058  },
				{ x:224,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000059  },
				{ x:256,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000060  },
				{ x:160,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000061  },
				{ x:192,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000062  },
				{ x:32,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000063  },
				{ x:64,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000064  },
				{ x:96,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000065  },
				{ x:128,  y:224,  xo:160,  w:32,  h:32,  depth:10,  id:10000066  },
				{ y:192,  w:32,  h:32,  depth:10,  id:10000067  },
				{ y:160,  w:32,  h:32,  depth:10,  id:10000068  },
				{ y:128,  w:32,  h:32,  depth:10,  id:10000069  },
				{ y:96,  w:32,  h:32,  depth:10,  id:10000070  },
				{ y:64,  w:32,  h:32,  depth:10,  id:10000071  },
				{ w:32,  h:32,  depth:10,  id:10000072  },
				{ y:32,  w:32,  h:32,  depth:10,  id:10000073  },
				{ x:800,  y:128,  xo:192,  w:32,  h:32,  depth:10,  id:10000074  },
				{ x:768,  y:160,  xo:192,  w:32,  h:32,  depth:10,  id:10000075  },
				{ x:608,  y:96,  xo:192,  w:32,  h:32,  depth:10,  id:10000076  },
				{ x:640,  y:96,  xo:160,  w:32,  h:32,  depth:10,  id:10000077  },
				{ x:672,  y:96,  xo:160,  w:32,  h:32,  depth:10,  id:10000078  },
				{ x:704,  y:96,  xo:224,  w:32,  h:32,  depth:10,  id:10000079  },
				{ x:416,  y:128,  xo:224,  w:32,  h:32,  depth:10,  id:10000080  },
				{ x:448,  y:160,  xo:224,  w:32,  h:32,  depth:10,  id:10000081  },
				{ x:480,  y:192,  xo:224,  w:32,  h:32,  depth:10,  id:10000082  },
				{ x:992,  y:32,  xo:192,  w:32,  h:32,  depth:10,  id:10000083  },
				{ y:224,  w:32,  h:32,  depth:10,  id:10000084  },
				{ x:288,  y:64,  yo:32,  w:32,  h:32,  depth:10,  id:10000085  },
				{ x:704,  y:192,  yo:32,  w:32,  h:32,  depth:10,  id:10000086  },
				{ x:672,  y:192,  xo:32,  yo:32,  w:32,  h:32,  depth:10,  id:10000087  },
				{ x:384,  y:96,  xo:64,  yo:32,  w:32,  h:32,  depth:10,  id:10000088  },
				{ y:256,  w:32,  h:32,  depth:10,  id:10000089  },
				{ x:32,  y:256,  w:32,  h:32,  depth:10,  id:10000090  },
				{ x:64,  y:256,  w:32,  h:32,  depth:10,  id:10000091  },
				{ x:96,  y:256,  w:32,  h:32,  depth:10,  id:10000092  },
				{ x:128,  y:256,  w:32,  h:32,  depth:10,  id:10000093  },
				{ x:160,  y:256,  w:32,  h:32,  depth:10,  id:10000094  },
				{ x:192,  y:256,  w:32,  h:32,  depth:10,  id:10000095  },
				{ x:224,  y:256,  w:32,  h:32,  depth:10,  id:10000096  },
				{ x:256,  y:256,  w:32,  h:32,  depth:10,  id:10000097  },
				{ x:288,  y:256,  w:32,  h:32,  depth:10,  id:10000098  },
				{ x:320,  y:256,  w:32,  h:32,  depth:10,  id:10000099  },
				{ x:352,  y:256,  w:32,  h:32,  depth:10,  id:10000100  },
				{ x:384,  y:256,  w:32,  h:32,  depth:10,  id:10000101  },
				{ x:416,  y:256,  w:32,  h:32,  depth:10,  id:10000102  },
				{ x:448,  y:256,  w:32,  h:32,  depth:10,  id:10000103  },
				{ x:480,  y:256,  w:32,  h:32,  depth:10,  id:10000104  },
				{ x:512,  y:256,  w:32,  h:32,  depth:10,  id:10000105  },
				{ x:544,  y:256,  w:32,  h:32,  depth:10,  id:10000106  },
				{ x:576,  y:256,  w:32,  h:32,  depth:10,  id:10000107  },
				{ x:608,  y:256,  w:32,  h:32,  depth:10,  id:10000108  },
				{ x:640,  y:256,  w:32,  h:32,  depth:10,  id:10000109  },
				{ x:672,  y:256,  w:32,  h:32,  depth:10,  id:10000110  },
				{ x:704,  y:256,  w:32,  h:32,  depth:10,  id:10000111  },
				{ x:736,  y:256,  w:32,  h:32,  depth:10,  id:10000112  },
				{ x:768,  y:256,  w:32,  h:32,  depth:10,  id:10000113  },
				{ x:800,  y:256,  w:32,  h:32,  depth:10,  id:10000114  },
				{ x:832,  y:256,  w:32,  h:32,  depth:10,  id:10000115  },
				{ x:864,  y:256,  w:32,  h:32,  depth:10,  id:10000116  },
				{ x:896,  y:256,  w:32,  h:32,  depth:10,  id:10000117  },
				{ x:928,  y:256,  w:32,  h:32,  depth:10,  id:10000118  },
				{ x:960,  y:256,  w:32,  h:32,  depth:10,  id:10000119  },
				{ x:992,  y:256,  w:32,  h:32,  depth:10,  id:10000120  })	
		}		],
	RoomOrder: [0	],
	TPageEntries: [
		{ x:2, y:434, w:26, h:31, XOffset:4, YOffset:1, CropWidth:26, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:86, y:470, w:22, h:31, XOffset:7, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:30, y:470, w:22, h:32, XOffset:7, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:138, y:398, w:22, h:32, XOffset:7, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:194, y:398, w:22, h:31, XOffset:7, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:150, y:434, w:22, h:31, XOffset:7, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:94, y:434, w:22, h:32, XOffset:7, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:34, y:434, w:23, h:32, XOffset:6, YOffset:0, CropWidth:23, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:74, y:398, w:26, h:31, XOffset:2, YOffset:1, CropWidth:26, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:114, y:470, w:22, h:31, XOffset:3, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:58, y:470, w:22, h:32, XOffset:3, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:166, y:398, w:22, h:32, XOffset:3, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:222, y:398, w:22, h:31, XOffset:3, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:178, y:434, w:22, h:31, XOffset:3, YOffset:1, CropWidth:22, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:122, y:434, w:22, h:32, XOffset:3, YOffset:0, CropWidth:22, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:2, y:470, w:23, h:32, XOffset:3, YOffset:0, CropWidth:23, CropHeight:32, ow:32, oh:32, tp:0},
		{ x:106, y:398, w:25, h:29, XOffset:6, YOffset:0, CropWidth:25, CropHeight:29, ow:32, oh:32, tp:0},
		{ x:62, y:434, w:25, h:29, XOffset:1, YOffset:0, CropWidth:25, CropHeight:29, ow:32, oh:32, tp:0},
		{ x:2, y:398, w:29, h:31, XOffset:0, YOffset:0, CropWidth:29, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:38, y:398, w:29, h:31, XOffset:3, YOffset:0, CropWidth:29, CropHeight:31, ow:32, oh:32, tp:0},
		{ x:4, y:4, w:256, h:256, XOffset:0, YOffset:0, CropWidth:256, CropHeight:256, ow:256, oh:256, tp:0},
		{ x:2, y:266, w:256, h:128, XOffset:0, YOffset:0, CropWidth:256, CropHeight:128, ow:256, oh:128, tp:0}	],
	Textures: ["platformer_texture_0.png"]
};

// #####################################################################################################
// var xx,yy,i,t,top,left,s; 
//  
// global.mapsize=floor(room_width/32)*floor(room_height/32); 
//  
// // Loop through the tile map, and find the tiles, then place them  
// // in the "simple" collision map. 
// for( yy=0;yy<room_height;yy+=32) 
// { 
//     s=""; 
//     for( xx=0;xx<room_width;xx+=32) 
//     { 
//         i = (xx/32)+((yy/32)*(room_width/32)); 
//         global.map[i]=-1; 
//         t = tile_layer_find(10,xx,yy); 
//         if( t>=0 ) 
//         { 
//             s = s+"1"; 
//             left = tile_get_left(t); 
//             global.map[i]=left/32;             
//         }else 
//             s = s+"_"; 
//     } 
//     show_debug_message(s); 
// } 
//  
//  
// 
function gml_Script_CreateCollisionMap( _inst, _other ){
var gmlxx,gmlyy,gmli,gmlt,gmltop,gmlleft,gmls;
global.gmlmapsize=(floor( (g_pBuiltIn.room_width/32) )*floor( (g_pBuiltIn.room_height/32) ));
for (gmlyy=0 ; (gmlyy<g_pBuiltIn.room_height) ; gmlyy+=32) {
gmls="";
for (gmlxx=0 ; (gmlxx<g_pBuiltIn.room_width) ; gmlxx+=32) {
gmli=((gmlxx/32)+((gmlyy/32)*(g_pBuiltIn.room_width/32)));
array_set_1D( global, "__gmlmap__" , gmli,  -1 );
gmlt=tile_layer_find( 10, gmlxx, gmlyy );
if ((gmlt>=0)) {{
gmls=(gmls+"1");
gmlleft=tile_get_left( gmlt );
array_set_1D( global, "__gmlmap__" , gmli,  (gmlleft/32) );
}
;}
 else {gmls=(gmls+"_");};
}
;
show_debug_message( gmls );
}
;
}

// #####################################################################################################
// // 
// // argument0 = X coordinate to get tile (in pixels, not tiles) 
// // argument1 = Y coordinate to get tile (in pixels, not tiles) 
// // 
// if( argument0>=room_width ) return -1; 
// if( argument1>=room_height ) return -1; 
// if( argument0<0) return -1; 
// if( argument1<0) return -1; 
//  
// var xx,yy; 
//  
// xx = floor(argument0/32) + (floor(argument1/32) * floor(room_width/32)); 
// if( global.mapsize<xx ) return -1; 
// return global.map[ xx ]; 
//  
// 
function gml_Script_GetCollision( _inst, _other , argument0, argument1){
if ((argument0>=g_pBuiltIn.room_width)) {return -1;}
;
if ((argument1>=g_pBuiltIn.room_height)) {return -1;}
;
if ((argument0<0)) {return -1;}
;
if ((argument1<0)) {return -1;}
;
var gmlxx,gmlyy;
gmlxx=(floor( (argument0/32) )+(floor( (argument1/32) )*floor( (g_pBuiltIn.room_width/32) )));
if ((global.gmlmapsize<gmlxx)) {return -1;}
;
return array_get_1D( global, "__gmlmap__" , gmlxx ) ;
}

// #####################################################################################################
// var xx,yy,c1,c2; 
//  
//  
//  
// // Apply gravity (and jumping) 
// y = y+grav; 
// grav+=0.4; 
// if( grav>=10 ) grav=10; 
//  
// // If falling, check UNDER the player 
// if( grav<0 ) 
// { 
//     if( dir=1){ 
//         sprite_index = jump_right; 
//     }else{ 
//         sprite_index = jump_left; 
//     } 
//     c2 = -1; 
//     c1 = GetCollision(x,y); 
//     if( (x&$1f)>0 ) { 
//         c2=GetCollision(x+32,y); 
//     } 
//     if( c1>=0 || c2>=0 ) 
//     { 
//         grav=0; 
//         y = (y&$ffffffe0)+32; 
//     } 
// } 
// else{ 
//     // Otherwise, check above player 
//     if( jump ) 
//     { 
//         if( dir=1){ 
//             sprite_index = fall_right; 
//         }else{ 
//             sprite_index = fall_left; 
//         }     
//     }else{ 
//         grav=0; 
//         jump=true; 
//     } 
//     c2 = -1; 
//     c1 = GetCollision(x,y+32); 
//     if( (x&$1f)>0 ) { 
//         c2=GetCollision(x+32,y+32); 
//     } 
//     if( c1>=0 || c2>=0 ) 
//     { 
//         y = (y&$ffffffe0); 
//         jump=0; 
//          
//         if( dir=1){ 
//             sprite_index = walk_right; 
//         }else{ 
//             sprite_index = walk_left; 
//         }            
//     } 
// }     
//  
//  
//  
//  
// // If moving left, check LEFT collision 
// if( keyboard_check(vk_left) )  
// { 
//     dir=-1; 
//     if(!jump){ 
//         sprite_index = walk_left; 
//     } 
//     x=x-xspeed; 
//     c2=-1; 
//     c1 = GetCollision(x,y); 
//     if( (y&$1f)>0 ) c2=GetCollision(x,y+32); 
//     if(  c1>=0 ) || ( c2>=0 ) 
//     { 
//         x = (x&$ffffffe0)+32; 
//     }     
// }else if( keyboard_check(vk_right) ) 
// { 
//     // Otherwise, check collision to the right 
//     dir=1; 
//     if(!jump){ 
//         sprite_index = walk_right; 
//     } 
//     x=x+xspeed; 
//     c2 = -1; 
//     c1 = GetCollision(x+32,y); 
//     if( (y&$1f)>0 ) c2=GetCollision(x+32,y+32); 
//     if(  c1>=0 ) || ( c2>=0 ) 
//     { 
//         x = (x&$ffffffe0); 
//     }     
// } else { 
//     // If standing still, don't animate 
//     image_index =0; 
// } 
//  
//  
//  
//  
// 
function gml_Script_ProcessPlayer( _inst, _other ){
var gmlxx,gmlyy,gmlc1,gmlc2;
_inst.sety( (_inst.y+_inst.gmlgrav) );
_inst.gmlgrav+=0.4;
if ((_inst.gmlgrav>=10)) {_inst.gmlgrav=10;}
;
if ((_inst.gmlgrav<0)) {{
if ((_inst.gmldir==1)) {{
_inst.sprite_index=5;
}
;}
 else {{
_inst.sprite_index=4;
}
;};
gmlc2=-1;
gmlc1=gml_Script_GetCollision( _inst , _other , _inst.x, _inst.y );
if (((_inst.x&31)>0)) {{
gmlc2=gml_Script_GetCollision( _inst , _other , (_inst.x+32), _inst.y );
}
;}
;
if (((gmlc1>=0)||(gmlc2>=0))) {{
_inst.gmlgrav=0;
_inst.sety( ((_inst.y&-32)+32) );
}
;}
;
}
;}
 else {{
if (_inst.gmljump > 0.5) {{
if ((_inst.gmldir==1)) {{
_inst.sprite_index=2;
}
;}
 else {{
_inst.sprite_index=3;
}
;};
}
;}
 else {{
_inst.gmlgrav=0;
_inst.gmljump=1;
}
;};
gmlc2=-1;
gmlc1=gml_Script_GetCollision( _inst , _other , _inst.x, (_inst.y+32) );
if (((_inst.x&31)>0)) {{
gmlc2=gml_Script_GetCollision( _inst , _other , (_inst.x+32), (_inst.y+32) );
}
;}
;
if (((gmlc1>=0)||(gmlc2>=0))) {{
_inst.sety( (_inst.y&-32) );
_inst.gmljump=0;
if ((_inst.gmldir==1)) {{
_inst.sprite_index=0;
}
;}
 else {{
_inst.sprite_index=1;
}
;};
}
;}
;
}
;};
if (keyboard_check( 37 ) > 0.5) {{
_inst.gmldir=-1;
if (!(_inst.gmljump > 0.5)) {{
_inst.sprite_index=1;
}
;}
;
_inst.setx( (_inst.x-_inst.gmlxspeed) );
gmlc2=-1;
gmlc1=gml_Script_GetCollision( _inst , _other , _inst.x, _inst.y );
if (((_inst.y&31)>0)) {gmlc2=gml_Script_GetCollision( _inst , _other , _inst.x, (_inst.y+32) );}
;
if (((gmlc1>=0)||(gmlc2>=0))) {{
_inst.setx( ((_inst.x&-32)+32) );
}
;}
;
}
;}
 else {if (keyboard_check( 39 ) > 0.5) {{
_inst.gmldir=1;
if (!(_inst.gmljump > 0.5)) {{
_inst.sprite_index=0;
}
;}
;
_inst.setx( (_inst.x+_inst.gmlxspeed) );
gmlc2=-1;
gmlc1=gml_Script_GetCollision( _inst , _other , (_inst.x+32), _inst.y );
if (((_inst.y&31)>0)) {gmlc2=gml_Script_GetCollision( _inst , _other , (_inst.x+32), (_inst.y+32) );}
;
if (((gmlc1>=0)||(gmlc2>=0))) {{
_inst.setx( (_inst.x&-32) );
}
;}
;
}
;}
 else {{
_inst.image_index=0;
}
;};};
}

// #####################################################################################################
// CreateCollisionMap(); 
//  
// sprite_index = walk_right; 
// image_speed = 0.5; 
//  
// // basic movement setup 
// xspeed = 2; 
// grav=2; 
// jump=false; 
// dir=0; 
//  
//  
// 
function gml_Script_InitialisePlayer( _inst, _other ){
gml_Script_CreateCollisionMap( _inst , _other  );
_inst.sprite_index=0;
_inst.image_speed=0.5;
_inst.gmlxspeed=2;
_inst.gmlgrav=2;
_inst.gmljump=0;
_inst.gmldir=0;
}

// #####################################################################################################
// // argument0 = ID of parent 
//  
// // Loop through and attach a new minime to the end of our list 
// var i; 
//  
// // Find the end of the mini-me "chain" 
// i = argument0; 
// while(i.child>0){ 
//     i = i.child; 
// } 
//  
// i.child  = instance_create(i.x,i.y,minime); 
// i.child.destid = i.id; 
// i.child.image_blend = i.image_blend; 
// return i.child; 
//  
//  
//  
// 
function gml_Script_AddMultiple( _inst, _other , argument0){
var gmli;
gmli=argument0;
while ((g_pInstanceManager.Get(gmli).gmlchild>0)) {
gmli=g_pInstanceManager.Get(gmli).gmlchild;
}
;
g_pInstanceManager.Get(gmli).gmlchild=instance_create( g_pInstanceManager.Get(gmli).x, g_pInstanceManager.Get(gmli).y, 2 );
g_pInstanceManager.Get(g_pInstanceManager.Get(gmli).gmlchild).gmldestid=g_pInstanceManager.Get(gmli).id;
g_pInstanceManager.Get(g_pInstanceManager.Get(gmli).gmlchild).set_imageblend( g_pInstanceManager.Get(gmli).get_imageblend() );
return g_pInstanceManager.Get(gmli).gmlchild;
}

// #####################################################################################################
// // argument0 = ID of parent 
// // argument1 = ID of multiple 
// // Loop through and attach a new minime to the end of our list 
// var i; 
//  
// // Find the end of the mini-me "chain" 
// i = argument0; 
// while(i.child>0){ 
//     i = i.child; 
// } 
//  
// i.child  = argument1; 
// i.child.destid = i.id; 
// return i.child; 
//  
//  
//  
// 
function gml_Script_AttachMultiple( _inst, _other , argument0, argument1){
var gmli;
gmli=argument0;
while ((g_pInstanceManager.Get(gmli).gmlchild>0)) {
gmli=g_pInstanceManager.Get(gmli).gmlchild;
}
;
g_pInstanceManager.Get(gmli).gmlchild=argument1;
g_pInstanceManager.Get(g_pInstanceManager.Get(gmli).gmlchild).gmldestid=g_pInstanceManager.Get(gmli).id;
return g_pInstanceManager.Get(gmli).gmlchild;
}

// #####################################################################################################
// { 
// /// Initialise the player and map 
// InitialisePlayer(); 
//  
// child = -1; 
// AddMultiple(id); 
//  
//  
//  
//  
// } 
// 
function gml_Object_player_Create_0( _inst, _other )
{
{
gml_Script_InitialisePlayer( _inst , _other  );
_inst.gmlchild=-1;
gml_Script_AddMultiple( _inst , _other , _inst.id );
}
;
}

// #####################################################################################################
// { 
// /// Process the player (move+collision) 
// ProcessPlayer(); 
//  
// } 
// 
function gml_Object_player_Step_0( _inst, _other )
{
{
gml_Script_ProcessPlayer( _inst , _other  );
}
;
}

// #####################################################################################################
// { 
// /// Do payer "jump" 
// if( jump ) exit; 
// grav=-8; 
// jump=true; 
//  
//  
//  
// } 
// 
function gml_Object_player_KeyPress_32( _inst, _other )
{
{
if (_inst.gmljump > 0.5) {return;}
;
_inst.gmlgrav=-8;
_inst.gmljump=1;
}
;
}

// #####################################################################################################
// { 
// /// Initialise the baddie. 
// xp = -1; 
// image_speed = 0.5; 
// hit = false; 
// grav = 0; 
// dirspeed = 0; 
//  
// child = -1; 
// AddMultiple(id); 
//  
// // There is also some creation code inside the ROOM which sets up the path and colour. 
// // To see this, right click the instance in the map and select "creation code" 
//  
//  
// } 
// 
function gml_Object_baddie_Create_0( _inst, _other )
{
{
_inst.gmlxp=-1;
_inst.image_speed=0.5;
_inst.gmlhit=0;
_inst.gmlgrav=0;
_inst.gmldirspeed=0;
_inst.gmlchild=-1;
gml_Script_AddMultiple( _inst , _other , _inst.id );
}
;
}

// #####################################################################################################
// { 
// /// Check the direction of the baddie.  
// if( xp>x ) { 
//     if(  sprite_index != walk_left ) sprite_index = walk_left; 
// }else{ 
//     if(  sprite_index != walk_right ) sprite_index = walk_right; 
// } 
// xp=x; 
//  
//  
// // If we've been hit, this means we're no longer  
// // following a path, so bounce him off sctreen! 
// if( hit ){ 
//     x = x+dirspeed; 
//     y = y + grav; 
//     grav+=0.4; 
//     if( grav>=10 ) grav=10; 
//  
//     // Once we've fallen below the room, kill him! 
//     if( y>room_height ) instance_destroy(); 
// } 
//  
//  
//  
// } 
// 
function gml_Object_baddie_Step_0( _inst, _other )
{
{
if ((_inst.gmlxp>_inst.x)) {{
if ((_inst.sprite_index!=1)) {_inst.sprite_index=1;}
;
}
;}
 else {{
if ((_inst.sprite_index!=0)) {_inst.sprite_index=0;}
;
}
;};
_inst.gmlxp=_inst.x;
if (_inst.gmlhit > 0.5) {{
_inst.setx( (_inst.x+_inst.gmldirspeed) );
_inst.sety( (_inst.y+_inst.gmlgrav) );
_inst.gmlgrav+=0.4;
if ((_inst.gmlgrav>=10)) {_inst.gmlgrav=10;}
;
if ((_inst.y>g_pBuiltIn.room_height)) {instance_destroy( _inst  );}
;
}
;}
;
}
;
}

// #####################################################################################################
// { 
// /// Kill baddie when player hits it! 
//  
// // Make sure we're not colliding over and over again! 
// if( hit ) exit; 
//  
// // Attach our multiple to the player. 
// AttachMultiple(player.id, child); 
// child = -1; 
//  
// // Kill the path we're following. 
// path_end(); 
//  
// // Flag as hit, and set the gravity mover to UP. 
// hit = true; 
// grav = -8; 
//  
// // Bounce in the correct direction. 
// if(other.x>x ){ 
//     dirspeed = -4; 
// }else{ 
//     dirspeed = 4; 
// } 
//  
//  
//  
//  
//  
// } 
// 
function gml_Object_baddie_Collision_0( _inst, _other )
{
{
if (_inst.gmlhit > 0.5) {return;}
;
gml_Script_AttachMultiple( _inst , _other , g_pInstanceManager.Get(0).id, _inst.gmlchild );
_inst.gmlchild=-1;
path_end( _inst  );
_inst.gmlhit=1;
_inst.gmlgrav=-8;
if ((_other.x>_inst.x)) {{
_inst.gmldirspeed=-4;
}
;}
 else {{
_inst.gmldirspeed=4;
}
;};
}
;
}

// #####################################################################################################
// { 
// /// Initialise the "mini me" 
// xp=x; 
// sprite_index = walk_right; 
// image_speed = 0.5; 
// image_xscale= 0.75; 
// image_yscale= 0.75; 
// child = -1; 
//  
// msize = 20; 
// mx = ds_queue_create(); 
// my = ds_queue_create(); 
// ms = ds_queue_create(); 
// ma = ds_queue_create(); 
//  
// for(i=0;i<msize;i+=1){ 
//     ds_queue_enqueue(mx,x); 
//     ds_queue_enqueue(my,y); 
//     ds_queue_enqueue(ms,sprite_index); 
//     ds_queue_enqueue(ma,image_index); 
// } 
//  
// destid = id; 
//  
//  
//  
// } 
// 
function gml_Object_minime_Create_0( _inst, _other )
{
{
_inst.gmlxp=_inst.x;
_inst.sprite_index=0;
_inst.image_speed=0.5;
_inst.setxscale( 0.75 );
_inst.setyscale( 0.75 );
_inst.gmlchild=-1;
_inst.gmlmsize=20;
_inst.gmlmx=ds_queue_create(  );
_inst.gmlmy=ds_queue_create(  );
_inst.gmlms=ds_queue_create(  );
_inst.gmlma=ds_queue_create(  );
for (_inst.gmli=0 ; (_inst.gmli<_inst.gmlmsize) ; _inst.gmli+=1) {
ds_queue_enqueue( _inst.gmlmx, _inst.x );
ds_queue_enqueue( _inst.gmlmy, _inst.y );
ds_queue_enqueue( _inst.gmlms, _inst.sprite_index );
ds_queue_enqueue( _inst.gmlma, _inst.image_index );
}
;
_inst.gmldestid=_inst.id;
}
;
}

// #####################################################################################################
// { 
// /// Update the position and animation of the mini-me 
//  
//  
// // get last location, and the animation frames... 
// x = ds_queue_dequeue(mx); 
// y = ds_queue_dequeue(my); 
// sprite_index = ds_queue_dequeue(ms); 
// image_index = ds_queue_dequeue(ma); 
//  
// // Queue the NEXT location 
// ds_queue_enqueue(mx,destid.x); 
// ds_queue_enqueue(my,destid.y); 
// ds_queue_enqueue(ms,destid.sprite_index); 
// ds_queue_enqueue(ma,destid.image_index); 
//  
//  
//  
//  
//  
//  
//  
//  
// } 
// 
function gml_Object_minime_Step_0( _inst, _other )
{
{
_inst.setx( ds_queue_dequeue( _inst.gmlmx ) );
_inst.sety( ds_queue_dequeue( _inst.gmlmy ) );
_inst.sprite_index=ds_queue_dequeue( _inst.gmlms );
_inst.image_index=ds_queue_dequeue( _inst.gmlma );
ds_queue_enqueue( _inst.gmlmx, g_pInstanceManager.Get(_inst.gmldestid).x );
ds_queue_enqueue( _inst.gmlmy, g_pInstanceManager.Get(_inst.gmldestid).y );
ds_queue_enqueue( _inst.gmlms, g_pInstanceManager.Get(_inst.gmldestid).sprite_index );
ds_queue_enqueue( _inst.gmlma, g_pInstanceManager.Get(_inst.gmldestid).image_index );
}
;
}

// #####################################################################################################
// { 
// /// Draw the mini-me. 
//  
// // Offset here so that we can easily attach to other mini-me's 
// draw_sprite_ext(sprite_index, image_index, x+4, y+8, image_xscale,image_yscale, 0, image_blend, 1.0); 
//  
//  
//  
// } 
// 
function gml_Object_minime_Draw_0( _inst, _other )
{
{
draw_sprite_ext( _inst.sprite_index, _inst.image_index, (_inst.x+4), (_inst.y+8), _inst.image_xscale, _inst.image_yscale, 0, _inst.get_imageblend(), 1 );
}
;
}

// #####################################################################################################
// path_start(path0,1,1,false);
// image_blend = $3131ee;
function gml_RoomCC_room0_0_Create( _inst )
{
path_start( _inst , 0, 1, 1, 0 );
_inst.set_imageblend( 3224046 );
}

// #####################################################################################################
// path_start(path1,1,1,false);
// image_blend = $7deb7d;
function gml_RoomCC_room0_1_Create( _inst )
{
path_start( _inst , 1, 1, 1, 0 );
_inst.set_imageblend( 8252285 );
}

// #####################################################################################################
// path_start(path2,1,1,false);
// image_blend = $1af4f7;
function gml_RoomCC_room0_2_Create( _inst )
{
path_start( _inst , 2, 1, 1, 0 );
_inst.set_imageblend( 1766647 );
}

debug("JSON_game data loaded")
