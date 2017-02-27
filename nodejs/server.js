var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890);
console.log('server start listening to port 8890');


io.on('connection', function (socket) {

  console.log("client connected");

  var redisClient = redis.createClient();
  redisClient.subscribe('message');
  redisClient.on("message", function(channel, message) {
    //console.log(channel+' '+message);
    var msg = JSON.parse(message);
    console.log(msg);
    console.log("mew message add in queue "+ channel + " channel");
    console.log("message :"+msg.message);
    console.log("from: "+msg.user);
    socket.emit(channel, message)
    // const emmitChannel = `${channel}:${message.event}`;
    // socket.emit(emmitChannel, message.data);
  });

  socket.on("draw", function(data){
    console.log('get draw data');
  //  var msg = JSON.parse(data);
    //console.log(msg);
    io.emit("draw", data);
  });

  socket.on('disconnect', function() {
    console.log('1 client disconnected');
    redisClient.quit();
  });

});
