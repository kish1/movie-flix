/**
 * Created by kishore on 4/25/16.
 */
var express = require("express");

var app = express();

app.use(express.static(__dirname + "/client"));

var ipaddress = "127.0.0.1";
var port = 4000;

app.listen(port, ipaddress);