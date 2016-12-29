window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback);
    };
})();
 
function initPendulum() {
    var pendulum = [];

    pendulum.push({
        speed: 2 - Math.random() * 4,
        innerX: 75,
        innerY: 75,
        outerX: 75,
        outerY: 75,
        startingAngle: Math.PI
        });
    pendulum.push({
        speed: 2 - Math.random() * 4,
        innerX: 75,
        innerY: 75,
        outerX: 75,
        outerY: 75,
        startingAngle: 0
        });
    var innerPendulum = pendulum[0];
    var outerPendulum = pendulum[1];
    innerPendulum.outerX = innerPendulum.innerX + (37 * Math.sin(innerPendulum.startingAngle));
    innerPendulum.outerY = innerPendulum.innerY + (37 * Math.cos(innerPendulum.startingAngle));
    outerPendulum.innerX = innerPendulum.outerX;
    outerPendulum.innerY = innerPendulum.outerY;
    outerPendulum.outerX = outerPendulum.innerX + (37 * Math.sin(outerPendulum.startingAngle));
    outerPendulum.outerY = outerPendulum.innerY + (37 * Math.cos(outerPendulum.startingAngle));
    return pendulum;
}
    

function drawPendulum(canvas, pendulum){
    var context = canvas.getContext("2d");

    context.beginPath();
    context.globalAlpha = 0.25;
    outerPendulum = pendulum[1];
    context.moveTo(outerPendulum.outerX, outerPendulum.outerY);
    updatePendulum(pendulum);
    outerPendulum = pendulum[1];
    context.lineTo(outerPendulum.outerX, outerPendulum.outerY);
    context.strokeStyle = '#005CE7';
    context.lineWidth = 1;
    context.stroke();
    context.closePath();
    /*
    Copyright 2016 by David Hendrix http://blog.get-set-society-net 
    */
}
 
function updatePendulum(pendulum){
    var innerPendulum = pendulum[0];
    var outerPendulum = pendulum[1];
    innerPendulum.startingAngle += innerPendulum.speed / 7.0;
    outerPendulum.startingAngle += outerPendulum.speed / 7.0;
    innerPendulum.outerX = innerPendulum.innerX + (37 * Math.sin(innerPendulum.startingAngle));
    innerPendulum.outerY = innerPendulum.innerY + (37 * Math.cos(innerPendulum.startingAngle));
    outerPendulum.innerX = innerPendulum.outerX;
    outerPendulum.innerY = innerPendulum.outerY;
    outerPendulum.outerX = outerPendulum.innerX + (37 * Math.sin(outerPendulum.startingAngle));
    outerPendulum.outerY = outerPendulum.innerY + (37 * Math.cos(outerPendulum.startingAngle));

}

function resetPendulum() {
    var canvas = document.getElementById("spinner");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function startPendulum(run) {
    var canvas = document.getElementById("spinner");
    var context = canvas.getContext("2d");
    var pendulum = initPendulum();
    animate(canvas, pendulum, run);
}
 
function animate(canvas, pendulum, run) {
    if (run.value) {
        var context = canvas.getContext("2d");
 
        // update
        // draw
        drawPendulum(canvas, pendulum);
 
        // request new frame
        requestAnimFrame(function(){animate(canvas, pendulum, run);});
    } else {
        stopped.value = true;
    }
}

var keepRunning = {
    value: true
};

var stopped = {
    value: false
};

window.onload = function(){
    document.getElementById('spinner').addEventListener('click', function() {
        keepRunning.value = false;

        while (!stopped.value) {
            // do nothing
        }

        resetPendulum();

        keepRunning.value = true;

        if(keepRunning.value) {
          startPendulum(keepRunning)
        }
      });

    startPendulum();
};  