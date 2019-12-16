var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var randomNumber = require('./randomNumber');

var dev = process.env.NODE_ENV !== 'production';
console.log(dev);
var port = dev ? 3000 : process.env.port;

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + './index.html');
});

io.on('connection', function (socket) {
  console.log('connect');

  var unsubscribe = randomNumber.subscribe(function (number) {
    console.log(number);

    var data = {
      value: number,
      timestamp: Number(new Date()),
    };

    socket.emit('data', data);
  });

  socket.on('disconnect', function () {
    console.log('disconnect')
    unsubscribe();
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
