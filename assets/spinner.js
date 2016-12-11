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
        innerX: 45,
        innerY: 45,
        outerX: 45,
        outerY: 45,
        startingAngle: Math.PI
        });
    pendulum.push({
        speed: 2 - Math.random() * 4,
        innerX: 45,
        innerY: 45,
        outerX: 45,
        outerY: 45,
        startingAngle: 0
        });
    var innerPendulum = pendulum[0];
    var outerPendulum = pendulum[1];
    innerPendulum.outerX = innerPendulum.innerX + (22 * Math.sin(innerPendulum.startingAngle));
    innerPendulum.outerY = innerPendulum.innerY + (22 * Math.cos(innerPendulum.startingAngle));
    outerPendulum.innerX = innerPendulum.outerX;
    outerPendulum.innerY = innerPendulum.outerY;
    outerPendulum.outerX = outerPendulum.innerX + (22 * Math.sin(outerPendulum.startingAngle));
    outerPendulum.outerY = outerPendulum.innerY + (22 * Math.cos(outerPendulum.startingAngle));
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
    
}
 
function updatePendulum(pendulum){
    var innerPendulum = pendulum[0];
    var outerPendulum = pendulum[1];
    innerPendulum.startingAngle += innerPendulum.speed / 7.0;
    outerPendulum.startingAngle += outerPendulum.speed / 7.0;
    innerPendulum.outerX = innerPendulum.innerX + (22 * Math.sin(innerPendulum.startingAngle));
    innerPendulum.outerY = innerPendulum.innerY + (22 * Math.cos(innerPendulum.startingAngle));
    outerPendulum.innerX = innerPendulum.outerX;
    outerPendulum.innerY = innerPendulum.outerY;
    outerPendulum.outerX = outerPendulum.innerX + (22 * Math.sin(outerPendulum.startingAngle));
    outerPendulum.outerY = outerPendulum.innerY + (22 * Math.cos(outerPendulum.startingAngle));

}
 
function animate(canvas, pendulum){
    var context = canvas.getContext("2d");
 
    // update
    // draw
    drawPendulum(canvas, pendulum);
 
    // request new frame
    requestAnimFrame(function(){animate(canvas, pendulum);});
}
 
window.onload = function(){
    var canvas = document.getElementById("spinner");
    var pendulum = initPendulum();
    animate(canvas, pendulum);
};  