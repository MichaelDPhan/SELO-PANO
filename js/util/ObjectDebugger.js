var ObjectDebugger = {
	
	init:function(){

		this.buildHandlers();		
	},

	buildHandlers:function() {
		var self = this;
		self.keyDownHandler = $.proxy(self, 'keyDownHandler');
		$('body').on('keydown',self.keyDownHandler);	
	},

	objectID:{current:0, dict:{"49":0, "50":1, "51":2, "52":3, "53":4,"54":5,"55":6, "56":7}},
	moveMagnitude:10,
	keyDownHandler:function(e){
		var self = this;
		console.log('sufffu')
		switch(e.keyCode){
			case 13:

				WorldController.layers.forEach(function(item){
					if(item.ready) console.log(item,item.mainMesh.rotation);
				});
			break;
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
				self.objectID.current = self.objectID.dict[e.keyCode]
			break;
			//left
			case 37:
				InteractionObjects.objects[self.objectID.current].mainMesh.position.x -= self.moveMagnitude;
			break;
			//right
			case 39:
				InteractionObjects.objects[self.objectID.current].mainMesh.position.x += self.moveMagnitude;
			break;
			//up
			case 38:
				InteractionObjects.objects[self.objectID.current].mainMesh.position.y -= self.moveMagnitude;
			break;
			//down
			case 40:
				InteractionObjects.objects[self.objectID.current].mainMesh.position.y += self.moveMagnitude;
			break;

			//a
			case 65:

				InteractionObjects.objects[self.objectID.current].mainMesh.position.z -= self.moveMagnitude;
			break;
			//s
			case 83:

				InteractionObjects.objects[self.objectID.current].mainMesh.position.z += self.moveMagnitude;
			break;

			case 32:
				console.log('"x":',InteractionObjects.objects[self.objectID.current].mainMesh.position.x+', "y":',InteractionObjects.objects[self.objectID.current].mainMesh.position.y+', "z":',InteractionObjects.objects[self.objectID.current].mainMesh.position.z);
			break;
		}
	}
}
