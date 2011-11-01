var util = require("util"),
  http = require("http"),
  url = require("url"),
  path = require("path"),
  crypto = require("crypto"),
  fs = require("fs");

var dir = process.argv[2] || './public';
util.log('Serving files from ' + dir);

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), dir, uri);
  util.log('Serving file ' + filename);
  path.exists(filename, function(exists) {
    if(exists) {
      fs.readFile(filename, function(err, data) {
	var hash = crypto.createHash('md5');
	hash.update(data);
	response.writeHead(200, { 'Content-Type': 'text/plain',
				  'Content-MD5': hash.digest('base64') });
    	response.end(data);
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  });
}).listen(8080);

util.log("Server running at http://localhost:8080/");

