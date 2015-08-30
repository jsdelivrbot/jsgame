/**
 * Created by ligson on 2015/8/30.
 */
$(function () {

    var canvas = document.getElementById("demo");
    var cans = canvas.getContext("2d");
    draw(cans);
});


function draw(cans) {

    var r = 100;

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


}