// Box from tutorial : http://www.kirupa.com/developer/actionscript/3dwireframe.htm

var focalLength = 300;

function calculate2D(x, y, z, map) {

    var scaleRatio  = focalLength / ( focalLength +  (z - 200) );

    map._x = x * scaleRatio;
    map._y = y * scaleRatio;
}

function D3DPoint( x, y, z){

    var point = {
        x : x,
        y : y,
        z : z
    };

    return point;
}

Box = function() {

    var pointsArray = this._points = [
        D3DPoint(-20, -40, -20),
        D3DPoint(20, -40, -20),
        D3DPoint(20, -40, 20),
        D3DPoint(-20, -40, 20),
        D3DPoint(-20, 80, -20),
        D3DPoint(20, 80, -20),
        D3DPoint(20, 80, 20),
        D3DPoint(-20, 80, 20)
    ];

    this.paint = function( context ) {
//        console.debug('Box.paint');

        var points = pointsArray;

        context.save();

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

        var tlf = points[0];
        var text = "(" + tlf.x + "," + tlf.y + "," + tlf.z + ")";
        context.fillText( text, tlf._x , tlf._y );

        context.stroke();

        context.restore();
    }
}
