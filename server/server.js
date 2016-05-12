/**
 * Created by kishore on 4/25/16.
 */
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/movieflix';
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + "/client"));

var ipaddress = "127.0.0.1";
var port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

require("./app.js")(app, mongoose);

app.listen(port, ipaddress);