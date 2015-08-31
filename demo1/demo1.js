/**
 * Created by ligson on 2015/8/30.
 */

var cans = null;
$(function () {

    var canvas = document.getElementById("demo");
    cans = canvas.getContext("2d");

    setInterval("draw()", 100);
    //draw();
});


var angle = 0;
function draw() {

    if (cans == null) {
        return;
    }
    console.log(angle);
    var r = 100;
    cans.fillStyle = "#000000";
    cans.fillRect(0, 0, 400, 400);

    cans.beginPath();
    cans.lineWidth = 3;
    cans.strokeStyle = 'blue';
    cans.moveTo(0, 200);
    cans.lineTo(400, 200);
    cans.stroke();
    cans.closePath();

    cans.beginPath();
    cans.lineWidth = 3;
    cans.strokeStyle = 'blue';
    cans.moveTo(200, 0);
    cans.lineTo(200, 400);
    cans.stroke();
    cans.closePath();

    cans.save();


    cans.fillStyle = "#FF0000";
    cans.beginPath();
    cans.arc(200, 200, r, 0, Math.PI * 2, false);
    cans.closePath();
    cans.fill();


    cans.beginPath();
    cans.lineWidth = 3;
    cans.strokeStyle = 'blue';
    cans.moveTo(200, 100);
    cans.lineTo(200, 300);
    cans.stroke();
    cans.closePath();

    cans.translate(200, 200);
    cans.rotate(angle * Math.PI / 180);
    cans.translate(-200, -200);

    cans.restore();

    angle++;
    if (angle == 360) {
        angle = 0;
    }

}