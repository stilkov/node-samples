var util = require("util"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

var dir = process.argv[2] || './public';
var port = parseInt(process.argv[3]) || 8080;
util.log('[' + process.pid + '] Serving files from ' + dir + ', port is ' + port);

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
	    util.log('File not found: ' + filename);
    	    response.writeHead(404);
    	    response.end();
	}
    });
}).listen(port);

util.log("Server running at http://localhost:" + port);
