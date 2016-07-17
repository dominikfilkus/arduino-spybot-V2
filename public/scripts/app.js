import {moveWheels, stopWheels} from './wheelsControl';
import {moveServo, stopServo} from './servoControl.js';

document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

function checkKeyDown(e) {
    moveWheels(e.keyCode);
    moveServo(e.keyCode);
}

function checkKeyUp(e) {
    stopWheels(e.keyCode);
    stopServo(e.keyCode);
}
