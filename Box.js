// Box from tutorial : http://www.kirupa.com/developer/actionscript/3dwireframe.htm

function D3DPoint( x, y, z){

    var point = {
        x : x,
        y : y,
        z : z
    };

    return point;
}

Box = function() {

    this._points = [];

    var pointsArray = [
        D3DPoint(-200, 0, -20),
        D3DPoint(-160, 0, -20),
        D3DPoint(-160, 0, 20),
        D3DPoint(-200, 0, 20),
        D3DPoint(-200, 71, -20),
        D3DPoint(-160, 71, -20),
        D3DPoint(-160, 71, 20),
        D3DPoint(-200, 71, 20)
    ];

    this.paint = function( context ) {

        var points = pointsArray;
        for (var i=0; i < points.length; i++){
            var point = points[i];

            var result = engine.translatePoint( point );

            point._x  = result.x;
            point._y  = result.y;
            
            if (!result.visible) {
                return;
            }

        }

        context.save();

        context.strokeStyle = "#FF0000";// (2,0xFF0000, 100);

        context.beginPath();

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
