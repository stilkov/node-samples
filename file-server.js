var sys = require("sys"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

var dir = process.argv[2] || './public';
var port = parseFloat(process.argv[3]) || 8080;
sys.log('Serving files from ' + dir + ', port is ' + port);

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), dir, uri);
    path.exists(filename, function(exists) {
    	if(exists) {
    	    fs.readFile(filename, function(err, data) {
		response.writeHead(200);
    		response.end(data);
	    });
    	} else {
	    sys.log('File not found: ' + filename);
    	    response.writeHead(404);
    	    response.end();
	}
    });
}).listen(port);

sys.log("Server running at http://localhost:" + port);
