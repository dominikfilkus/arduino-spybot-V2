module.exports = {
    initBoard: initBoard
};

var five = require('johnny-five'),
    Q = require('q');

function initBoard() {
    var deferred = Q.defer(),
        board = new five.Board({
            port: "COM19"
        });

    board.on('ready', function() {
        deferred.resolve();
    });

    return deferred.promise;
}
