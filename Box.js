// Box from tutorial : http://www.kirupa.com/developer/actionscript/3dwireframe.htm

var focalLength = 200;

function D3DPoint(x,y,z){
    console.debug('D3DPoint');

    var point = {
        x : x,
        y : y,
        z : z,
        calculate2D : function() {
//            console.debug('calculate2D');

            var scaleRatio  = focalLength / ( focalLength + this.z );
            this._x = this.x * scaleRatio,
            this._y = this.y * scaleRatio
        }
    };

    point.calculate2D();
    return point;
}

Box = function() {
    var pointsArray = [
        D3DPoint(-20, -40, -20),
        D3DPoint(20, -40, -20),
        D3DPoint(20, -40, 20),
        D3DPoint(-20, -40, 20),
        D3DPoint(-20, 80, -20),
        D3DPoint(20, 80, -20),
        D3DPoint(20, 80, 20),
        D3DPoint(-20, 80, 20)
    ];

    this.set = function(name, value){
        var points = pointsArray;

        var old = this.get( name );

        var offset = value - old;

        for (var i=0; i < points.length; i++){

            var point = points[i];     
            point[name] += offset;
            point.calculate2D();
        }

        return value;
    }

    this.get = function(name) {
        var points = pointsArray;
        return points[points.length-1][name];
    }

    this.paint = function( context ) {
//        console.debug('Box.paint');

        var points = pointsArray;

        // context.save();

        context.strokeStyle = "#FF0000";// (2,0xFF0000, 100);

        context.beginPath();

        // context = DebugContext( context );

        // top
        context.moveTo(points[0]._x, points[0]._y);

        context.lineTo(points[1]._x, points[1]._y);
        context.lineTo(points[2]._x, points[2]._y);
        context.lineTo(points[3]._x, points[3]._y);
        context.lineTo(points[0]._x, points[0]._y);

        // bottom
        context.moveTo(points[4]._x, points[4]._y);

        context.lineTo(points[5]._x, points[5]._y);
        context.lineTo(points[6]._x, points[6]._y);
        context.lineTo(points[7]._x, points[7]._y);
        context.lineTo(points[4]._x, points[4]._y);

        // connecting bottom and top
        context.moveTo(points[0]._x, points[0]._y);
        context.lineTo(points[4]._x, points[4]._y);

        context.moveTo(points[1]._x, points[1]._y);
        context.lineTo(points[5]._x, points[5]._y);

        context.moveTo(points[2]._x, points[2]._y);
        context.lineTo(points[6]._x, points[6]._y);

        context.moveTo(points[3]._x, points[3]._y);
        context.lineTo(points[7]._x, points[7]._y);

        context.stroke();

        // context.restore();
    }
}
