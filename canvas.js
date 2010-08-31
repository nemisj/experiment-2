function get2DPoints(x, y, z) {
    var focalLength = 200;
    var scaleRatio = focalLength / ( focalLength + z );


    return {
        x: centerX + x * scaleRatio,
        y: centerY + y * scaleRatio,
        ratio : scaleRatio
    }
}

var direction = "left";
backAndForthAndSideToSide = function(){

    var speed = 5;

    var x = box.get('x');
    var y = box.get('y');
    var z = box.get('z');

    if (direction == "left") {
        var value = x - speed;
        var value = box.set('x', value );
        if (value <= -100) {
             direction = "backward";
        }
    }else if (direction == "backward"){
        var value = z + speed;
        box.set('z', value );
        if (value >= 150){
             direction = "right";
        }
    }else if (direction == "right"){
        var value = x + speed;
        box.set('x', value );
        if (value >= 60){
             direction = "forward";
        }
    }else if (direction == "forward"){
        var value = z - speed;
        box.set('z', value );
        if (value <= 0){
            direction = "left";
        }
    }

    box.paint( ctx );
}

var paint = function() {
    window.objects = [];


    objects.push({
        draw : function() {
            drawGrid("blue");
        }
    });

    window.figure1 = {
        color : "rgb(200,200,0)",
        x     : 0,
        y     : 0,
        z     : 0,
        draw : function() { 
            var radius      = 30;

            var points = get2DPoints(this.x, this.y, this.z);

            var scaleRatio = points.ratio;
            this._xscale = this._yscale = 100 * scaleRatio;

            ctx.beginPath(); 

            ctx.fillStyle   = this.color; //;
            ctx.strokeStyle = this.color; //;

            radius = ( radius / 100 ) * this._xscale; 

            ctx.moveTo(points.x + radius, points.y);
            ctx.arc(points.x, points.y, radius, 0, Math.PI*2, true);

            ctx.fill();

            this.move();
        },

        dir : 1,
           speed : 20,
        move : function() {
           this.z += this.speed*this.dir;
           if (this.z > 500){
               this.z = 500;
               this.dir = -1;
           }else if (this.z < 0){
               this.z = 0;
               this.dir = 1;
           }
        }
    };

    objects.push( figure1 );

    objects.push({
        color : "rgb(200,0,0)",
        x     : 100,
        y     : 0,
        z     : 0,
        dir : 1,
        move : figure1.move,
        speed:  10,
        draw : function() {
     ctx.fillStyle   = "black";//this.color; //;
            var width  = 50;
            var height = 100;
            var points = get2DPoints(this.x, this.y, this.z);
            var ratio = points.ratio;

            var width = (width / 100) * (ratio * 100);
            var height = (height / 100) * (ratio * 100);
            ctx.fillStyle   = "black";//this.color; //;
            ctx.fillRect( points.x, points.y, width, height );
            this.move();
        }
    });
}

function drawGrid( color ) {

    ctx.save();
    var step = 10;
    var y = 0;
    ctx.lineWidth = 1;

    ctx.strokeStyle = color;

    ctx.globalAlpha = 0.4; 
    ctx.beginPath();  

    for (var i=0; i<700; i=i+step) {

        ctx.moveTo( i , 0);  
        ctx.lineTo( i, 700);
        
        if (y < 700) {
            ctx.moveTo( 0 , y);  
            ctx.lineTo( 700, y);
            y = y + 10;
        }
    }

    ctx.stroke();
    ctx.restore();
}

function draw() {


    // drawGrid("blue");

    // var sin = Math.sin( Math.PI/6 );  
    // var cos = Math.cos( Math.PI/6 );

    // zoom
    // transform ( scaleX, 0, 0, scaleY, translateX, translateY );
    // ctx.transform( 2, 0, 0, 2, 0, 0 ); 

    // translate
    // transform ( 1, 0 , 0 , 1 , translateX, translateY );

}

window.onload = function() {
    // paint();

    engine = new Engine(document.getElementById("canvas"));
    // engine.add( new Box() );
    engine.add( new Box() );
    // engine.add( new Floor() );
    engine.start();
}
