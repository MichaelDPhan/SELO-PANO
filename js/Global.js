///////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERT ALL GLOBAL VARIABLES HERE
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var Global = {
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CUSTOM VARS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	// STATIC VARS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	page: null,
	pageName: null,
	pageData: null,
	winWidth: 0,
	winHeight: 0,
	viewportHeight:700,
	viewportWidth:960,
	viewportOffsetX:null,
	viewportOffsetY:null,
	objArr:[],
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	// OBJECTS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
};

// initialize global variables
// var Global = new Global();


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUT ALL NECESSARY GLOBAL FUNCTIONS BELOW
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// IE8 console.log() fix
if (typeof console == "undefined") {
	this.console = {log: function() {}};
}