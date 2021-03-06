var util = require("util"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    multi = require("multi-node");

var dir = process.argv[2] || './public';
var port = parseInt(process.argv[3]) || 8080;
util.log('Serving files from ' + dir + ', port is ' + port);

var server = http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), dir, uri);
  path.exists(filename, function(exists) {
    if(exists) {
      fs.readFile(filename, function(err, data) {
	if (err) {
	  util.log('Error serving file ' + filename + ' ' + err);
	  util.log('request: ' + uri);
	}
	response.writeHead(200, {
	  'X-Node-Id': process.pid
	});
    	response.end(data);
      }); 			    
    } else {
      response.writeHead(404);
      response.end();
    }
  });
});


var nodes = multi.listen({ port: port, nodes: 10 }, server); 
util.log("Server " + process.pid + " running at http://localhost:" + port);
