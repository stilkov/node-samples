var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
	
var dir = process.argv[2] || './public';
var port = parseInt(process.argv[3]) || 8080;
sys.log('Serving files from ' + dir + ', port is ' + port);

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), dir, uri);
    path.exists(filename, function(exists) {
    	if(exists) {
   	    f = fs.createReadStream(filename);
    	    f.on('open', function() {
		response.writeHead(200);
	    });
	    
	    f.on('data', function(chunk) {
    		response.write(chunk);
	    });

	    f.on('error', function(err) { 
    		response.writeHead(500, {"Content-Type": "text/plain"});
    		response.write(err + "\n");
    		response.end();
	    }); 
	    
	    f.on('end', function() { 
    		response.end();
	    }); 			    
	} else {
	    response.writeHead(404);
-    	    response.end();
    	}
    });
}).listen(port);

sys.log("Server running at http://localhost:8080/");
