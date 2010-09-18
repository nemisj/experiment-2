var cameraView = {
    x        : 0,
    y        : 0,
    z        : 0,
    rotation : 0
};

var focalLength = 300;
var step = 0;

FORWARD  = 1;
BACKWARD = 2;
LEFT     = 4;
RIGHT    = 8;

UP_ARROW    = 38;
DOWN_ARROW  = 40;
LEFT_ARROW  = 37;
RIGHT_ARROW = 39;
SPACE       = 32;

Engine = function( canvas ) {

    var things  = [];
    var actions = [];
    
	var onground = true;
	var jump     = false;

    var ctx = canvas.getContext("2d");

	var width   = canvas.offsetWidth;
	var height  = canvas.offsetHeight;

	var centerX = width  / 2;
	var centerY = height / 2;

	console.debug(centerX, centerY);

    ctx.translate( centerX, centerY );

    this.add = function(thing) {
        things.push( thing );
    }

    var action = 0;

    var startZ = -200;

    var setCoords = function( obj ){

        var x = obj.x;
        var y = obj.y;
        var z = obj.z;

        var points = obj._points;
        if (!points.length) {
            return;
        }

        var offsetx = x - points[0].x;
        var offsety = y - points[0].y;
        var offsetz = z - points[0].z;

        z = -200 + z

        for (var i=0; i < points.length; i++ ){

            var point = points[i];

            point.x = point.x + offsetx;
            point.y = point.y + offsety;
            point.z = point.z + offsetz;
        }
    }

    var do_camera = function( obj, camera ) {

        var points = obj._points;
        for (var i=0;i<points.length;i++ ){
            var point = points[i];

            var x = point.x - camera.x;
            var y = point.y - camera.y;
            var z = point.z - camera.z;

            calculate2D( x, y, z, point );
        }
    }

    this.start = function() {

        for (var i=0,l=things.length;i<l;i++) {
            
            var thing = things[i];
            var x =  ~~(Math.random() * 80  );
                x = (Math.random() > 0.5) ? x * -1 : x;

            thing.x = x;
            thing.y = -40;
            thing.z = ~~(Math.random() * 100 );

            setCoords( thing );
            do_camera( thing, cameraView );

            thing.paint( ctx );
        }

        var flag = false;
         this.id = setInterval(function(){

            var movement = 0;

            if (action & FORWARD) {
                movement += 10;
//                console.debug('Doing forward');
            }

            if (action & BACKWARD) {
                movement -= 10;
//                console.debug('Doing down');
            }

            if (action & LEFT) {
                cameraView.rotation -= .05;
//                console.debug('Doing rotate left');
            }

            if (action & RIGHT) {
                cameraView.rotation += .05;
//                console.debug('Doing rotate right');
            }

            if (action) {

                cameraView.x += Math.sin( cameraView.rotation ) * movement;
                cameraView.z += Math.cos( cameraView.rotation ) * movement;

                ctx.clearRect( -centerX  , -centerY , 700, 700 );

                ctx.strokeStyle = "#000";
                ctx.beginPath();
                ctx.moveTo(-centerX,0);
                ctx.lineTo(centerX,0);
                ctx.stroke();

                for (var i=0,l=things.length;i<l;i++) {

                    var thing = things[i];
                    do_camera( thing, cameraView );

                    if (jump) {
                        var y = thing.get('y');

                        var value = cameraView.y--;

                        if (value > 0) {
                            thing.set( 'y',   y + 7 );
                        } else if (value > -10) {
                            thing.set( 'y',   y - 7);
                        } else {
                            cameraView.y = 0;
                            jump     = false;
                            onground = true;
                        }
                    }

                    thing.paint( ctx );
                }
                ctx.fillRect( 0, 0, 2, 2 );
            }

        }, 33 );
    }

    this.stop = function() {
        clearInterval( this.id ); 
    }

	canvas.onkeyup   = function(e) {
        // console.debug('onkeydown:',e);

        var code = e.keyCode;

        switch (code) {
            case UP_ARROW: 
                action ^= FORWARD;
            break;

            case DOWN_ARROW : 
                action ^= BACKWARD;
            break;

            case LEFT_ARROW :
                action ^= LEFT;
            break;

            case RIGHT_ARROW :
                action ^= RIGHT;
            break;

			case SPACE :
			break;
		}

        e.preventDefault();
	}

    canvas.onkeyperss = function(e) {
        e.preventDefault();    
    }

    canvas.onkeydown = function(e) {
        //console.debug('onkeydown:',e);

        var code = e.keyCode;

        switch (code) {
            case UP_ARROW: 
                action |= FORWARD;
            break;

            case DOWN_ARROW : 
                action |= BACKWARD;
            break;

            case LEFT_ARROW :
                action |= LEFT;
            break;

            case RIGHT_ARROW :
                action |= RIGHT;
            break;

			case SPACE :
				if (onground) {
					jump     = true;
					onground = false;
					cameraView.y = 10;
				}
			break;
        }

        e.preventDefault();
    }

    this.getCamera = function() {
        return cameraView;
    }

    this.translatePoint = function(point) {
        var x = point.x - cameraView.x;
        var z = point.z - cameraView.z;
        var y = point.y;

        var angle  = Math.atan2( z, x );
        var radius = Math.sqrt( x * x + z * z );

        x = Math.cos(angle + cameraView.rotation) * radius;
        z = Math.sin(angle + cameraView.rotation) * radius;

        var scaleRatio = focalLength/(focalLength + z);
        x = x * scaleRatio;
        y = y * scaleRatio;

        return {
            x       : x,
            y       : y,
            z       : z,
            visible : z > 0,
            scale   : 100 * scaleRatio
        }
    }
}
