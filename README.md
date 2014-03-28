SELO-PANO
=========

A customizable Panorama View, just feed in an image! Probably

##DEPENDANCIES:

THREE.JS is needed and included in the package.zip. 

##HOW TO USE:

1.    Include both the three.min.js package and HTML5Pano.js
2.	Initialize the pano with the ID of the container div via "HTML5Pano.init([container])"
    *   If no container is specifed, you can access the dom element via HTML5Pano.domElement
3.	To load in a new world, simply call a valid image into HTML5Pano.loadTexture([img])
    *	Image to load in should be a valid URL or image dataURI
4.	Call HTML5Pano.resize() when you need to resize, it will always be 100% of the container

EXPOSED VARIABLES/FUNCTIONS

###.camera
>Control the three.js camera object, reference [three.js](http://threejs.org/docs/#Reference/Cameras/Camera) camera for further details, may need to play around with the <b>position.y</b> if image is weirdly warped
    
###.changeFOV([number])
>Changes the Field of View, default set to 70

###.loadTexture([string/dataURI])
>path to pano image to load or dataURI to interpret

###.resize
>resizes the viewport within the container and sets the FOV properly
