const colors = require('colors/safe');

var trying = function(msg) {
    console.log(colors.cyan.underline('[   TRY   ]'), colors.yellow(msg));
}

var success = function(msg) {
    console.log(colors.green.inverse('[ SUCCESS ]'), colors.rainbow(msg));
}

var info = function(msg) {
    console.log(colors.magenta.inverse('[   INFO  ]'), colors.brightMagenta(msg));
}

var err = function(msg) {
    console.log(colors.red.underline('[  ERROR  ]'), colors.brightRed(msg));
}

module.exports.try = trying;
module.exports.succ = success;
module.exports.info = info;
module.exports.err = err;