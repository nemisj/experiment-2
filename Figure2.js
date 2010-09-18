

displayFigure = function( context ){

    var point = engine.translatePoint({
        x : this.x,
        y : this.y,
        z : this.z
    });

    var visible = this._visible = point.visible;

    if (visible) {

        var x      = this._x = point.x,
            y      = this._y = point.y,
            scale  = this._xscale = this._yscale = point.scale,
            img    = this.img, 
            width  = this.width / 100 * scale,  //120 / 100 * scale;
            height = this.height / 100 * scale, //142.75 / 100 * scale;
            nr     = this.id,
            z      = point.z;

        this._z = ~~(-z);

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
