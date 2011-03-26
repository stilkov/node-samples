var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    multi = require("multi-node");

var dir = process.argv[2] || './public';
var port = parseInt(process.argv[3]) || 8080;
sys.log('Serving files from ' + dir + ', port is ' + port);

var server = http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), dir, uri);
  path.exists(filename, function(exists) {
    if(exists) {
      fs.readFile(filename, function(err, data) {
	if (err) {
	  sys.log('Error serving file ' + filename + ' ' + err);
	  sys.log('request: ' + uri);
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
sys.log("Server " + process.pid + " running at http://localhost:" + port);
