let forwardState, backwardState, rightState, leftState,
    socket = io.connect('http://localhost');

let states = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

/**
 * @name moveWheels
 * @public
 * @description Move the motors to the correct direction according to the keyCode
 * @param keyCode The code of the key which is pressed
 */
let moveWheels = (keyCode) => {
    switch (keyCode) {
        case 38:
            if (!states.forward) {
                socket.emit('wheels_forward');
            }
            states.forward = true;
            break;
        case 40:
            if (!states.backward) {
                socket.emit('wheels_backward');
            }
            states.backward = true;
            break;
        case 37:
            if (!states.left) {
                socket.emit('wheels_left');
            }
            states.left = true;
            break;
        case 39:
            if (!states.right) {
                socket.emit('wheels_right');
            }
            states.right = true;
            break;
    }
};

/**
 * @name stopWheels
 * @public
 * @description Stop the motors according the moving directions
 * @param keyCode The code of the key which is pressed
 */
let stopWheels = (keyCode) => {
    switch (keyCode) {
        case 38:
            states.forward = false;
            smoothTurn();
            break;
        case 40:
            states.backward = false;
            smoothTurn();
            break;
        case 37:
            states.left = false;
            smoothLineMovement();
            break;
        case 39:
            states.right = false;
            smoothLineMovement();
            break;
    }
};

/**
 * @name smoothTurn
 * @private
 * @description If we move straight then turn parallel the motors won't stop
 * waiting for another keypress
 */
let smoothTurn = () => {
    if (states.left) {
        socket.emit('wheels_left');
    } else if (states.right) {
        socket.emit('wheels_right');
    } else {
        socket.emit('wheels_stop');
    }
};

/**
 * @name smoothLineMovement
 * @private
 * @description If we turn then move straight parallel the motors won't stop
 * waiting for another keypress
 */
let smoothLineMovement = () => {
    if (states.forward) {
        socket.emit('wheels_forward');
    } else if (states.backward) {
        socket.emit('wheels_backward');
    } else if (states.left) {
        socket.emit('wheels_left')
    } else if (states.right) {
        socket.emit('wheels_right')
    } else {
        socket.emit('wheels_stop');
    }
};

export {
    moveWheels,
    stopWheels
}