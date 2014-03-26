var PageCore = CoreClass.extend({
	loadURL:null,
	resolution:null,
	
	// init function fires automatically
	init:function(){
		this.load();
	},
	
	// load data
	load:function(){
		var _this = this;

		// $.when(
		// 	// $.getJSON(Global.userDataURL),
		// 	$.ajax({
	 //      type: "GET",
	 //      url: Global.userDataURL+"?lang="+LANG,
	 //      dataType:"json"
	 //    }),
		// 	$.getJSON(Global.staticDataURL)
		// ).done(function(_userData, _pageData){
		//   Global.userData = _userData[0];
		//   Global.pageData = _pageData[0];
		//   // console.log(Global.userData);
		//   // console.log(Global.pageData);
		//   Global.week = Global.userData["week_number"];
		//   Global.weekClass = 'week-'+Global.week;
		  _this.begin();
		// });
	},

	begin:function(){
		var _this = this;
		
		// build
		this.buildObjects();
		this.buildHandlers();
	},
	
	// override classes
	buildObjects:function(){},
	buildHandlers:function(){}
});


/** AUTO START WHEN READY **/
$(document).ready(function(){
	Global.page.init();
});