var util = require("util"),
    http = require("http"),
    url = require("url"),
    util = require("util"),
    path = require("path"),
    fs = require("fs");
     
var port = parseInt(process.argv[2]) || 8081;

var options = function(request) {
  var uri = url.parse(request.url);
  var opt = {
    host: uri.hostname,
    port: uri.port || 80,
    path: uri.pathname,
    method: request.method,
    headers: request.headers
  };
  opt.headers['connection'] = 'keep-alive';
  return opt;
}

http.createServer(function(request, response) {
  util.log("--> " + request.url);
  var remoteRequest = http.request(options(request), function (remoteResponse) {
    response.writeHead(remoteResponse.statusCode, remoteResponse.headers);
    remoteResponse.on('end', function () {
      util.log("<-- " + response.statusCode + " " +  request.url);
    });
    util.pump(remoteResponse, response);
  });
  util.pump(request, remoteRequest);
}).listen(port);

util.log('Listening on port ' + port);