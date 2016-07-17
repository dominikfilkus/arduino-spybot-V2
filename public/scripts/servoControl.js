let socket = io.connect('http://localhost');

/**
 * @name moveServo
 * @public
 * @description Move the servo to the correct direction according to the keyCode
 * @param keyCode The code of the key which is pressed
 */
let moveServo = (keyCode) => {
    switch (keyCode) {
        case 65:
            socket.emit('servo_left');
            break;
        case 68:
            socket.emit('servo_right');
            break;
    }
};

/**
 * @name stopServo
 * @public
 * @description Stop the servo according the moving directions
 * @param keyCode The code of the key which is pressed
 */
let stopServo = (keyCode) => {
    switch (keyCode) {
        case 65:
            socket.emit('servo_stop');
            break;
        case 68:
            socket.emit('servo_stop');
            break;
    }
};

export {
    moveServo,
    stopServo
}