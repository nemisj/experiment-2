

displayFigure = function( context ){
    var x = this.x - cameraView.x;
    var z = this.z - cameraView.z;
    var y = this.y;

    var angle  = Math.atan2( z, x );
    var radius = Math.sqrt( x * x + z * z );

    x = Math.cos(angle + cameraView.rotation) * radius;
    z = Math.sin(angle + cameraView.rotation) * radius;

    if (z > 0){
        if (!this._visible) this._visible = true;
        var scaleRatio = focalLength/(focalLength + z);
        this._x = x * scaleRatio;
        this._y = y * scaleRatio;
        this._xscale = this._yscale = 100 * scaleRatio;

        var x     = this._x, 
            y     = this._y, 
            scale = this._xscale,
            img   = this.img;

        var width  = this.width / 100 * scale;  //120 / 100 * scale;
        var height = this.height / 100 * scale; //142.75 / 100 * scale;

        this._z = ~~(-z);

        var nr = this.id;
        return function() {
            context.save();
            var rx = x - (width / 2),
                ry = y - (height / 2)
            context.drawImage( img, rx, ry, width, height ); 

            context.fillStyle = "#FF001E";
            context.fillText( nr, x, y );

            context.restore();
        }

    }else{
        this._visible = false;
        return function() {
        }
    }
};

var objectsInScene = [];

for (i=0; i<8; i++){
    var attachedObj = {};// theScene.attachMovie("figure", "figure"+i, i);
    if (i < 4){
        attachedObj.x = -200
        attachedObj.z = 50 + i*150
        attachedObj.y = 0;
    }else{
        attachedObj.x = 200
        attachedObj.z = 50 + (i-4)*150
        attachedObj.y = 0;
    }
    attachedObj.display = displayFigure;
    objectsInScene.push(attachedObj);

    var img = attachedObj.img = new Image();
    img.src = "figure.jpg";
    attachedObj.id = i;
    attachedObj.width = 120;
    attachedObj.height = 142.75;
}

Figure = function() {
    this._points = [];
    this.paint = function( context ){


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
