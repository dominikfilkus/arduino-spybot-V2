module.exports = {
    initServo: initServo
};

var five = require('johnny-five'),
    global = require('./global.js');

var frontServo;

function initServo() {
    frontServo = new five.Servo({
        type: 'continuous',
        pin: 10
    });

    initSocketListeners();
}

function initSocketListeners() {
    global.io.sockets.on('connection', function (socket) {
        socket.on('servo_right', function() {
            frontServo.ccw();
        });

        socket.on('servo_left', function() {
            frontServo.cw();
        });

        socket.on('servo_stop', function() {
            frontServo.stop();
        });
    });
}