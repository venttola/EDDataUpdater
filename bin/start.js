var app   = require("../out/server");
var http  = require("http");
var path  = require("path");
var express = require("express");

var port = normalizePort(process.env.PORT || 8080);
app.set("port", port);

app.use(express.static(path.join(__dirname, "../client")));
app.use(express.static(path.join(__dirname, "../doc")));

// TODO: Define database connection here

var server = http.createServer(app);

server.listen(port);
console.log("Listening port " + port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}