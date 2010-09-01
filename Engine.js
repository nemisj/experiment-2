UP_ARROW    = 38;
DOWN_ARROW  = 40;
LEFT_ARROW  = 37;
RIGHT_ARROW = 39;
SPACE       = 32;

Engine = function( canvas ) {

    var things  = [];
    var actions = [];
    
    var camera = {
        x: 0,
        y: 0,
        z: 0
    };

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
            do_camera( thing, camera );

            thing.paint( ctx );
        }

        var flag = false;
         this.id = setInterval(function(){

            if (action & 1) {
                camera.z++;
                console.debug('Doing up',camera.z);
            }

            if (action & 2) {
                camera.z--;
                console.debug('Doing down',camera.z);
            }

            if (action & 4) {
                camera.x--;
                console.debug('Doing left',camera.x);
            }

            if (action & 8) {
                camera.x++;
                console.debug('Doing right',camera.x);
            }

            if (action) {

                ctx.clearRect( centerX * -1 ,centerY * -1, 700, 700 );

                for (var i=0,l=things.length;i<l;i++) {

                    var thing = things[i];
                    do_camera( thing, camera );

                    if (jump) {
                        var y = thing.get('y');

                        var value = camera.y--;

                        if (value > 0) {
                            thing.set( 'y',   y + 7 );
                        } else if (value > -10) {
                            thing.set( 'y',   y - 7);
                        } else {
                            camera.y = 0;
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
                // camera.z = 0;
                action ^= 1;
            break;

            case DOWN_ARROW : 
                // camera.z = 0;
                action ^= 2;
            break;

            case LEFT_ARROW :
                // camera.x = 0;
                action ^= 4;
            break;

            case RIGHT_ARROW :
                // camera.x = 0;
                action ^= 8;
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
                action |= 1;
            break;

            case DOWN_ARROW : 
                action |= 2;
            break;

            case LEFT_ARROW :
                action |= 4;
            break;

            case RIGHT_ARROW :
                action |= 8;
            break;

			case SPACE :
				if (onground) {
					jump     = true;
					onground = false;
					camera.y = 10;
				}
			break;
        }

        e.preventDefault();
    }

    this.getCamera = function() {
        return camera;
    }
}
