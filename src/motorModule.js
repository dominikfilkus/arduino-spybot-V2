module.exports = {
    initMotors: initMotors
};

var five = require('johnny-five'),
    configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2,
    global = require('./global.js');

var frontMotors = {},
    backMotors = {},
    speed = 255;

function initMotors() {
    frontMotors = {
        right: new five.Motor(configs.M4),
        left: new five.Motor(configs.M1)
    };

    backMotors = {
        right: new five.Motor(configs.M3),
        left: new five.Motor(configs.M2)
    };

    initSocketListeners();
}

function initSocketListeners() {
    global.io.sockets.on('connection', function (socket) {
        socket.on('wheels_forward', function () {
            frontMotors.right.forward(speed);
            frontMotors.left.forward(speed);
            backMotors.right.forward(speed);
            backMotors.left.forward(speed);
        });

        socket.on('wheels_backward', function () {
            frontMotors.right.reverse(speed);
            frontMotors.left.reverse(speed);
            backMotors.right.reverse(speed);
            backMotors.left.reverse(speed);
        });

        socket.on('wheels_right', function() {
            frontMotors.right.reverse(speed);
            frontMotors.left.forward(speed);
            backMotors.right.reverse(speed);
            backMotors.left.forward(speed);
        });

        socket.on('wheels_left', function() {
            frontMotors.right.forward(speed);
            frontMotors.left.reverse(speed);
            backMotors.right.forward(speed);
            backMotors.left.reverse(speed);
        });

        socket.on('wheels_stop', function() {
            frontMotors.right.stop();
            frontMotors.left.stop();
            backMotors.right.stop();
            backMotors.left.stop();
        });
    });
}