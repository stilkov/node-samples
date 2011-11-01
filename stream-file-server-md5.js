var util = require("util"),
http = require("http"),
url = require("url"),
path = require("path"),
crypto = require("crypto"),
fs = require("fs");

var dir = process.argv[2] || './public';
var port = parseInt(process.argv[3]) || 8080;
util.log('Serving files from ' + dir + ', port is ' + port);

http.createServer(function(request, response) {
  var te = request.headers.te;
  console.log('te: ' + te);
  var sendTrailer = te && te.match('trailers');
  console.log('Send Trailer: ' + sendTrailer);
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), dir, uri);
  path.exists(filename, function(exists) {
    if(exists) {
      var hash = crypto.createHash('md5');
      f = fs.createReadStream(filename);
      f.on('open', function() {
	var headers = { 'Content-Type': 'text/plain' };
	if (sendTrailer) headers.trailer = 'Content-MD5'
	response.writeHead(200, headers);
      });
      
      f.on('data', function(chunk) {
	hash.update(chunk);
    	response.write(chunk);
      });

      f.on('error', function(err) { 
    	response.writeHead(500, {"Content-Type": "text/plain"});
    	response.write(err + "\n");
    	response.end();
      }); 
      
      f.on('end', function() { 
	response.addTrailers({'Content-MD5': hash.digest('base64')});
    	response.end();
      }); 			    
    } else {
      response.writeHead(404);
      response.end();
    }
  });
}).listen(port);

util.log("Server running at http://localhost:8080/");
