
// theScene._x = 150;
// theScene._y = 150;

objectsInScene = [];

cameraView = {};
cameraView.rotation = 0;
focalLength = 300;

displayFigure = function(context){

    var angle = this.angle + cameraView.rotation;

    var x = Math.cos( angle ) * this.radius;
    var z = Math.sin( angle ) * this.radius;
    var y = this.y;

    if (this.id == 1) {
        console.debug(this.id + '.display:Angle',angle, 'Radius', this.radius,'Z',z);
    }

    if (z > 0) {
        if (!this._visible) this._visible = true;
        var scaleRatio = focalLength/(focalLength + z);
        this._x = x * scaleRatio;
        this._y = y * scaleRatio;
        this._xscale = this._yscale = 100 * scaleRatio;

        var x     = this._x, 
            y     = this._y, 
            scale = this._xscale,
            img   = this.img;
        var width  = 120 / 100 * scale;
        var height = 142.75 / 100 * scale;

        // this.swapDepths(Math.round(-z));
        this._z  = ~~( -z );
        
        var nr = this.id;
        return function() {
            var rx = x - (width / 2),
                ry = y - (height / 2)
            context.drawImage( img, rx, ry, width, height ); 
            context.save();
            context.fillStyle = "#FF001E";
            context.fillText( nr, x, y );
            context.restore();
        }
    } else {
        this._visible = false;
        return function() {
        }
    }
};

var angleStep = 2 * Math.PI/10;
for (var i = 0; i < 10; i++){

    if (i==0){ continue; }

    var attachedObj = {}; //theScene.attachMovie("friend", "friend"+i, i);
    attachedObj.angle = angleStep * i;
    attachedObj.radius = 100 + i*100;
    attachedObj.x = Math.cos(attachedObj.angle) * attachedObj.radius;
    attachedObj.z = Math.sin(attachedObj.angle) * attachedObj.radius;
    attachedObj.y = 0;
    attachedObj.display = displayFigure;
    objectsInScene.push( attachedObj );
    var img = attachedObj.img = new Image();
    img.src = "figure.jpg";
    attachedObj.id = i;

}

Figure = function() {

    this._points = [];

    this.paint = function( context ){

        var camera = engine.getCamera();
        cameraView.rotation = camera.x / 10;
        // if (Key.isDown(Key.LEFT)) cameraView.rotation -= .1;
        // if (Key.isDown(Key.RIGHT)) cameraView.rotation += .1;

        var renders = [];

        for (var i=0; i < objectsInScene.length; i++){
            var obj = objectsInScene[i];
            var renderer = obj.display( context );
            renderer.z = obj._z;
            if (renderer.z) {
                renders.push( renderer );
            }
        }

        renders.sort(function(a,b) {
            if (a.z > b.z) {
                return 1;
            } else if (a.z < b.z) {
                return -1;
            }

            return 0;
        });

        for(var i=0,l=renders.length;i<l;i++) {
            renders[i]();
        }
    }
}
