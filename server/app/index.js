'use strict';
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;

var index = path.join(__dirname,'./views/index.html');
var publicDir = path.join(__dirname,'../../public');
var nodeDir = path.join(__dirname,'../../node_modules');
var pitchDir = path.join(__dirname,'./views/pitchdetect.html');

app.get('/', function(req,res) {
    res.sendFile(index);
});

app.get('/pitchdetect',function(req,res) {
    res.sendFile(pitchDir);
})

app.use(express.static(publicDir));
app.use(express.static(nodeDir));