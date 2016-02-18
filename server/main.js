'use strict';
var chalk = require('chalk');
var http = require('http');
// var https = require('https');
// var fs = require('fs');

// var options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('key-cert.pem')
// }
var server = http.createServer();
var app = require('./app');
server.on('request',app);
// var server = http.createServer(options, app);

// server.on('request', app);

var startServer = function() {
    var PORT = process.env.port || 3000;

    server.listen(PORT, function() {
        console.log(chalk.blue('server started on port ', chalk.magenta(PORT)));
    })
};

startServer();