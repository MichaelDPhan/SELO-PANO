/*
Author: J Manricks
Date: 14/02/2012


NOTES:
== 14/02/2012 ==
Places - http://code.google.com/apis/maps/documentation/places/
Directions - http://code.google.com/apis/maps/documentation/directions/

== [Next update date here] ==
[update notes here]

*/
var selo_maps = {
	directionsService:null,
	placesService:null,
	geoCoderService:null,
	streetViewService:null,
	imageProxy:'system/image_proxy.php?urls=',

	panProps:{maxRows:2, maxCols:6, zoom:3, offset:256, fov:50},
	// panProps:{maxRows:1, maxCols:3, zoom:2, offset:384, fov:20},
	init:function(){
		var self = this;
		//alert("INIT")
		
		self.buildObjects();
		self.buildHandlers();
		
		console.log("[G] GoogleMapsProxy");
	},

	buildObjects:function(){
		var self = this;
		
		self.geoCoderService = new google.maps.Geocoder();
		self.directionsService = new google.maps.DirectionsService();
		self.streetViewService = new google.maps.StreetViewService();

		console.log("DUN DUN DUN")

	},
	
	buildHandlers:function(){
		var self = this;
		self.findLocation = $.proxy(self, "findLocation");
		self.findLocationHandler = $.proxy(self, "findLocationHandler");
		self.requestPanoramaID = $.proxy(self, "requestPanoramaID");
		self.requestPanoramaIDHandler = $.proxy(self, "requestPanoramaIDHandler");
	},
	///////////////////////////////////////////////////////////////////////////////////////
	////FIND LOCATION ///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	findLocation:function(__searchAddress, __onComplete) {
		var self = this;
		console.log("[G] findLocation ", __searchAddress);
		var geocoder = new google.maps.Geocoder();
		
		geocoder.geocode({ 'address': __searchAddress }, function(e, status){
			self.findLocationHandler(e, status, __onComplete);
		});
	},
	
	
	
	findLocationHandler:function(__results, __status, __onComplete) {
		console.log("[G] findLocation return");
		
		if (__status != google.maps.GeocoderStatus.OK){
			//alert("Unable to geocode the address");
			console.log("Unable to geocode the address");
			__onComplete(null);
			// thisMovie("Container").findLocationHandler({result:false});
			
		} else {
			// console.log("results:",__results);
			
			//loop through the address components and add them all to the return object
			var returnData = {};
			returnData.result = true;
			returnData.adresses = [];
			for (y = 0; y < __results.length; y++) {
				var addressData = {};
				for (x = 0; x < __results[y].address_components.length; x++) {
				
					addressData[__results[y].address_components[x].types[0]] = __results[y].address_components[x].long_name; 
				}
				
				addressData.lat = __results[y].geometry.location.lat();
				addressData.lon = __results[y].geometry.location.lng();
				addressData.address = __results[y].formatted_address;
				returnData.adresses[y] = addressData;
			}
			
			// console.log("returnData:",returnData);
			__onComplete(returnData.adresses[0]);
		}
	},
	
	///////////////////////////////////////////////////////////////////////////////////////
	////GET PANORAMA ///////////////////////////////////////////////////////////
	//https://developers.google.com/maps/documentation/javascript/streetview#StreetViewPanoramas
	//http://jamiethompson.co.uk/web/2010/05/15/google-streetview-static-api/
	///////////////////////////////////////////////////////////////////////////////////////
	requestPanoramaID:function(__lat, __lon, __onComplete) {
		console.log("requestPanorama ",__lat, __lon);
		var self = this;
		
		// The latlng of the requested panorama
		var panoLatLng = new google.maps.LatLng(__lat, __lon);
		
		// Define how far to search for an initial pano from a location, in meters.
		var panoSearchRadius = 50;//Will find at least one 
	  
		self.streetViewService.getPanoramaByLocation(panoLatLng, panoSearchRadius, function(e, status){
			self.requestPanoramaIDHandler(e, status, __onComplete);

		});
	},
	requestPanoramaIDHandler:function(__result, __status, __onComplete) {
		var self = this;
	    if (__status == google.maps.StreetViewStatus.OK) {
	    	console.log(__result, " if the result");
	    	__onComplete(__result.location.pano);
		} else if(__status == google.maps.StreetViewStatus.ZERO_RESULTS){
			console.log( "PANO ID NOT FOUND USING DEFAULT" );
			self.requestPanoramaID( "43.6718182","-79.4135938");
		} else {
			alert("Fatal Error. Cannot Contact Google StreetView");		
		}
	
	},

	getPanolist:function(__panoID){
		var self = this;

		var imageArray = [];
		for (var i = 0; i <= self.panProps.maxRows; i++) {
			for (var t = 0; t <= self.panProps.maxCols; t++) {
				
				imageArray.push({url:self.imageProxy+escape("http://cbk0.google.com/cbk?output=tile&panoid="+__panoID+"&zoom="+self.panProps.zoom+"&x="+t+"&y="+i), x:t, y:i});
			}
		}

		console.log('arraaaay',imageArray)
		return imageArray;
	}

}
	
	
	
	
	
	
		