UP_ARROW    = 38;
DOWN_ARROW  = 40;
LEFT_ARROW  = 37;
RIGHT_ARROW = 39

Engine = function( canvas ) {

    var things = [];
    
    var camera = {
        x: 0,
        y: 0,
        z: 0
    };

    var ctx = canvas.getContext("2d");

	var width   = canvas.offsetWidth;
	var height  = canvas.offsetHeight;

	var centerX = width  / 2;
	var centerY = height / 2;

	console.debug(centerX, centerY);

    ctx.translate( centerX, centerY );

    this.add = function(thing) {
        things.push( thing );
        var y = thing.get('y');
//        thing.set('y', 0 );
    }

    this.start = function() {

        this.id = setInterval(function(){
            ctx.clearRect( centerX * -1 ,centerY * -1, 700, 700 );
            
            for (var i=0,l=things.length;i<l;i++) {
                //xxx: take into account z index of objects
                var thing = things[i];

                var x = thing.get('x');
                var z = thing.get('z');

                thing.set( 'z', z - camera.z );
                thing.set( 'x', x - camera.x );

                thing.paint( ctx );
            }

			ctx.fillRect( 0, 0, 2 ,2 );
        }, 50 );
    }

    this.stop = function() {
        clearInterval( this.id ); 
    }


	canvas.onkeyup   = function(e) {
        console.debug('onkeydown:',e);

        var code = e.keyCode;

        switch (code) {
            case UP_ARROW: 
                camera.z = 0;
            break;

            case DOWN_ARROW : 
                camera.z = 0;
            break;

            case LEFT_ARROW :
                camera.x = 0;
            break;

            case RIGHT_ARROW :
                camera.x = 0;
            break;
		}
        e.preventDefault();
	}

    canvas.onkeydown = function(e) {
        console.debug('onkeydown:',e);

        var code = e.keyCode;

        switch (code) {
            case UP_ARROW: 
                camera.z++;
            break;

            case DOWN_ARROW : 
                camera.z--;
            break;

            case LEFT_ARROW :
                camera.x--;
            break;

            case RIGHT_ARROW :
                camera.x++;
            break;
        }

        e.preventDefault();
    }

    this.getCamera = function() {
        return camera;
    }
}
