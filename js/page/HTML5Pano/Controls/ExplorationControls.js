var ExplorationControls = {
	interactionControls:null,
	oldMove:{x:null,y:null},
	moveDelta:{x:0,y:0},
	init:function(){
		var is_touch = 'ontouchstart' in document;
		this.interactionControls = {
				move:( 'mousemove'),
				down:('mousedown'),
				up:( 'mouseup'),
				click:'click'
		},

		this.buildHandlers();		
	},

	buildHandlers:function() {
		var self = this;
		self.panHandler = $.proxy(self, 'panHandler');
		self.keyDownHandler = $.proxy(self, 'keyDownHandler');
		self.onDocumentMouseMov = $.proxy(self, 'onDocumentMouseMov');
		self.panImage = $.proxy(self, 'panImage');
		$(document).on(self.interactionControls.down,self.panHandler);	
		$(document).on("mousewheel",self.panHandler);	
		$('body').on(self.interactionControls.move, self.onDocumentMouseMov);
        $(document).bind('touchmove', function(e){e.preventDefault()});	
		$('body').css({width:'100%', height:'100%', overflow:'hidden'});	

		$('body').on('keydown',self.keyDownHandler);		
	},

	panHandler:function(e) {
		var self = this;
		var moveForceX = .01;
		var moveForceY = .01;

		var movementX = e.originalEvent.movementX       ||
				        e.originalEvent.mozMovementX    ||
				        e.originalEvent.webkitMovementX ||
				        0,
			movementY = e.originalEvent.movementY       ||
				        e.originalEvent.mozMovementY    ||
				        e.originalEvent.webkitMovementY ||
				        0;

		switch(e.type){
			case self.interactionControls.down:
				$(document).on(self.interactionControls.move, self.panHandler);
				$(document).on(self.interactionControls.up, self.panHandler);
				$('body').css("cursor","none");
				self.oldMove.x = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.originalEvent.clientX
				self.oldMove.y = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.originalEvent.clientY
			
			break;
			case self.interactionControls.up:

				$(document).off(self.interactionControls.move, self.panHandler);
				$(document).off(self.interactionControls.up, self.panHandler);
				$('body').css("cursor","");
			break;
			case self.interactionControls.move:
				self.moveInfo = e;

				moveForceX *= movementX;
				moveForceY *= movementY;

				//pan the Y, but clamping the camera so it wouldn't move past a 1.5 positive and negative delta
				// if(self.moveDelta.y+moveForceY > 1.5 || self.moveDelta.y+moveForceY < -1.5){
				// 	//if it'll be greater than the 1.5 clamp points, moveforce is only the difference between curent delta & 1.5 points
				// 	moveForceY = Math.round((moveForceY > 0 ? self.moveDelta.y-1.5 : self.moveDelta.y+1.5)*100)/100;

				// }
				// self.moveDelta.y += moveForceY;

				//pan the X
				self.panImage([moveForceY,moveForceX]);

			break;
			case "mousewheel":

				var newFoc = HTML5Pano.fovLimits.current + (e.originalEvent.deltaY > 0 ? 5 : -5);
				// TweenMax.to(HTML5Pano, .5, {ease:})
				self.panImage([0,(e.originalEvent.deltaY < 0 ? .5 : -.5)], 1);

					// HTML5Pano.changeFov(newFoc);
			break;
		}
	},
	updateVisuals:function(){

	},

	panImage:function(__dir,__tweenTime){
		// __dir*=2;
		var self = this;
		if((__dir[0] || __dir[1]) && HTML5Pano.allReady) {
			HTML5Pano.layers.forEach(function(item){
				//tween values
				var tweenProp = {overwrite:true, immediateRender:true, ease:Quart.easeOut};
				tweenProp.x = (item.camera.rotation.x + __dir[0]);
				tweenProp.y = item.camera.rotation.y + __dir[1];
					//snap camera rotation so it parallaxes around between 0 and 6.2835
					if((tweenProp.y < 0 || tweenProp.y > Math.PI*2)){
						item.camera.rotation.y =  item.camera.rotation.y+(tweenProp.y < 0 ? Math.PI*2 : -Math.PI*2);
						tweenProp.y = item.camera.rotation.y + __dir[1];
					}
				// if(__tweenTime)tweenProp.onUpdate = self.updateVisuals;
				tweenProp.onUpdate = self.updateVisuals;
				if(__tweenTime)tweenProp.onComplete = self.updateVisuals;

				//tween if the world has build the item
				if(item.ready) {

					item.camera.rotation.x = tweenProp.x;
					item.camera.rotation.y = tweenProp.y;
				}
			});
		}
	}

}