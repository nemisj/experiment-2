DebugContext = function(context) {
    console.debug('Doing debug of' ,context);
    return {
        moveTo : function(x, y) {
            console.debug('DebugContext.moveTo: ' + x + ":" + y);
            context.moveTo(x,y);
        },

        lineTo : function(x, y) {
            console.debug('DebugContext.lineTo: ' + x + ":" + y);
            context.lineTo(x,y);
        },

        stroke : function() {
            console.debug('DebugContext.stroke');
            context.stroke();
        }
    } 
}
