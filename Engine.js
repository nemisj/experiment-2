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

    this.add = function(thing) {
        things.push( thing );
        var y = thing.get('y');
        thing.set('y', 120 );
    }

    this.start = function() {

        this.id = setInterval(function(){
            ctx.clearRect( -200 ,-200, 700, 700 );
            
            for (var i=0,l=things.length;i<l;i++) {
                //xxx: take into account z index of objects
                var thing = things[i];

                var x = thing.get('x');
                var z = thing.get('z');

                thing.set( 'z', z - camera.z );
                thing.set( 'x', x - camera.x );

                camera.z = 0;
                camera.x = 0;

                thing.paint( ctx );
            }
        }, 50 );
    }

    this.stop = function() {
        clearInterval( this.id ); 
    }

    ctx.translate( 200, 200 );

    canvas.onkeypress = function(e) {
        console.debug('onKeypress:',e);

        var code = e.keyCode;

        switch (code) {
            case UP_ARROW: 
                camera.z += 5;
            break;

            case DOWN_ARROW : 
                camera.z -= 5;
            break;

            case LEFT_ARROW :
                camera.x -=5;
            break;

            case RIGHT_ARROW :
                camera.x += 5;
            break;
        }

        e.preventDefault();

    }

    this.getCamera = function() {
        return camera;
    }
}
