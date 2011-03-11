var net = require('net');

var server = net.createServer(function (socket) {
  socket.write("Echo server\r\n");
  socket.setEncoding('ascii');
  socket.on('data', function(data) {
    socket.write(data.toUpperCase());
  });
});

server.listen(8124, "127.0.0.1");