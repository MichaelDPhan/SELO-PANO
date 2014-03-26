var GMapsPanorama = {
	offscreenCanvas:null,
	imagesToLoad:0,
	imageList:[],
	init:function(){
		var self = this;
		self.buildObjects();
		self.buildHandlers();
	},

	buildObjects:function(){
		var self = this;
		self.offscreenCanvas = document.createElement('canvas');
	},

	buildHandlers:function(){
		var self = this;
		self.loadPanoByAddress = $.proxy(self, 'loadPanoByAddress');
		self.loadPanoByLatLon = $.proxy(self, 'loadPanoByLatLon');
		self.loadByPanoID = $.proxy(self, 'loadByPanoID');
		self.requestImage = $.proxy(self, 'requestImage');
	},

	loadPanoByAddress:function(__address, __onComplete){
		var self = this;
		selo_maps.findLocation(__address, function(e){
			console.log("loaded by address",e)
			self.loadPanoByLatLon(e.lat, e.lon, __onComplete);
		})
	},

	loadPanoByLatLon:function(__lat, __lon, __onComplete){
		var self = this;

		selo_maps.requestPanoramaID(__lat, __lon, function(e){
			console.log("loaded by lat lon",e)
			self.loadByPanoID(e, __onComplete);
		})

	},

	loadByPanoID:function(__panoID, __onComplete){
		var self = this;
		self.imageList = selo_maps.getPanolist(__panoID);
		var ctx = self.offscreenCanvas.getContext('2d');

		//set height and clear canvas
		self.offscreenCanvas.width = 512*(selo_maps.panProps.maxCols+1)-selo_maps.panProps.offset;
		self.offscreenCanvas.height = 512*(selo_maps.panProps.maxRows+1);
		ctx.clearRect(0,0, self.offscreenCanvas.width, self.offscreenCanvas.height);

		self.imagesToLoad = self.imageList.length;
		for(var t = 0; t < self.imageList.length; t++){
			self.requestImage(self.imageList[t], t, __onComplete);
		}

	},

	requestImage:function(__imgOBJ, __delay, __onComplete){
		var self = this;
		var img = new Image();
		__imgOBJ.img = img;

		__imgOBJ.img.onload = function(){
			console.log('image loaded!',__imgOBJ.img.width*__imgOBJ.x, __imgOBJ.img.height*__imgOBJ.y)
			var ctx = self.offscreenCanvas.getContext('2d');
			ctx.drawImage(__imgOBJ.img, __imgOBJ.img.width*__imgOBJ.x, __imgOBJ.img.height*__imgOBJ.y, __imgOBJ.img.width, __imgOBJ.img.height);
			self.imagesToLoad--

			if(self.imagesToLoad == 0) {
				//ALL IMAGES READY!!!!!
				console.log("IMAGES READY");

				HTML5Pano.loadTexture(GMapsPanorama.offscreenCanvas.toDataURL());
				HTML5Pano.changeFov(selo_maps.panProps.fov)

				if(__onComplete) __onComplete();
			}
		}

		setTimeout(function(){
			__imgOBJ.img.src = __imgOBJ.url;
			
		},__delay)
		// img.load();
		// var canv = document.createElement('canvas')

		// var ctx = canv.getContext('2d')
		// ctx.drawImage(img, 0, 0, img.width, img.height)

	}

}