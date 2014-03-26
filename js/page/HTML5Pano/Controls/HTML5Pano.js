var HTML5Pano = {
	fovLimits:{min:70, max:90, current:70},
	allReady:false,
	container:null,
	camera:null,
	domElement:null,
	layerImage:null,
	layers:[
		{
			config:{
				id:'backgroundLayer',
				cameraType:'PerspectiveCamera',
				cameraSettings:{aspect:window.innerWidth/window.innerHeight, near:0.1, far:1000},
				rendererType:Modernizr.webgl?'WebGLRenderer':'CanvasRenderer',
				rendererSettings:{alpha:false},
				// layerImage:['asset/image/pano_bg.jpg'
				// 			// ,'asset/image/pano_bg_mid.png'
				// 			],
				defaultRotation:{x:0.02,y:3.45},
				geometrySettings:{widthSegments:50,heightSegments:50,radius:1500}
			},
			camera:null,
			lookVector:null,
			renderer:null,
			mainMesh:null,
			mainGeometry:null,
			scene:null,
			ready:false
		}

	],
	init:function(__container){
		var self = this;
		if(__container) self.container = __container;
		self.buildHandlers();
		self.setupLayers();
		//clamp utility
		Number.prototype.clamp = function(min, max) {
		  return Math.min(Math.max(this, min), max);
		};


	},

	buildHandlers:function(){
		var self = this;
		self.render = $.proxy(this, 'render');
		self.setupLayers = $.proxy(this, 'setupLayers');
		self.loadTexture = $.proxy(this, 'loadTexture');
		self.changeFov = $.proxy(this, 'changeFov');
		self.updateNoise = $.proxy(this, 'updateNoise');
	},

	setupLayers:function(){
		var self = this;
		self.layers.forEach(function(item){
			item.scene = new THREE.Scene();
			item.camera = new THREE[item.config.cameraType]();
			item.camera.rotation.order = 'YXZ';
			item.camera.updateProjectionMatrix();
			item.renderer = new THREE[item.config.rendererType](item.config.rendererSettings);
			$(item.renderer.domElement).css({'width':'100%', 'height':'100%', 'max-width':$("#"+self.container).css('max-width'), 'max-height':$("#"+self.container).css('max-height')})
			if(!item.config.rendererSettings.alpha) item.renderer.setClearColor( 0xffffff, 0 );
			item.lookVector = new THREE.Vector3(0,0,0);

			//setup default mesh


			var material = new THREE.MeshBasicMaterial({
													        color: 'red' 
													      })
			material.side = THREE.DoubleSide;
			// material.map.magFilter = THREE.NearestFilter;
			var geom = new THREE.SphereGeometry( item.config.geometrySettings.radius, item.config.geometrySettings.widthSegments, item.config.geometrySettings.heightSegments);
			var mesh = new THREE.Mesh( geom, material );
			item.mainGeometry = geom; 
			item.mainMesh = mesh;
			mesh.scale.x = -1;
			mesh.side = 2;
			item.camera.rotation.x = item.config.defaultRotation.x;
			item.camera.rotation.y = item.config.defaultRotation.y;
			self.camera = item.camera;
				
			item.scene.add( mesh );


			if(self.container)document.getElementById(self.container).appendChild( item.renderer.domElement );
			self.domElement = item.renderer.domElement;

			$(item.renderer.domElement).attr('id', item.config.id);
			//load in the texture and setup the world
				// console.log("A",textureIndex)
				if(self.layerImage) self.loadTexture(layerImage);
		});

		self.render();
	},

	loadTexture:function(__imgURL){
		var self = this;
		var item = self.layers[0];

		self.allReady = false;
		var loader = new THREE.TextureLoader();
		loader.load( __imgURL, function ( texture2 ) {

			var material2 = new THREE.MeshBasicMaterial( { map: texture2, overdraw: false, transparent:true} );
			material2.side = THREE.DoubleSide;
			material2.map.magFilter = THREE.NearestFilter;

			item.mainMesh.material = material2
			console.log('completed loding image:', __imgURL);


			item.ready = true;

			var allReady = true;
			//check if all layers are ready, if not return and wait untill triggered by next layer setup
			self.layers.forEach(function(item){
				if(!item.ready) {
					console.log("NOTE RADY!")
					allReady = false;
					return false;
				}
			});
			if(!allReady) return;
			self.allReady = true;
			self.resize();
		} );
	},

	changeFov:function(__tarFov){
		var self = this;
		console.log(__tarFov);
		self.fovLimits.current =__tarFov;
		//FOV tweening
		self.layers.forEach(function(item){
			item.camera.fov = self.fovLimits.current;
			item.camera.updateProjectionMatrix()
		});
	},


	
	render:function(){
		var self = this;

		self.layers.forEach(function(item){
			if(item.ready) {
				// item.renderer.clear;
				item.renderer.render(item.scene,item.camera);
			}
		});
// 
		window.requestAnimationFrame( self.render );
 
	},

	resize:function(){
		var self = this;
		self.layers.forEach(function(item){
			// item.camera.fov = item.config.cameraSettings.fov;
			item.renderer.setSize(  $("#"+self.container).width(), $("#"+self.container).height() );
			item.camera.aspect = ( $("#"+self.container).width()/$("#"+self.container).height())*1;
			item.camera.updateProjectionMatrix()
		});
	}
}