var crypto = require("crypto"),
    path = require("path"),
    fs = require("fs");

var hashFile = function(filename, cb) {
  path.exists(filename, function(exists) {
    if(exists) {
      r = fs.createReadStream(filename);
      var hash = crypto.createHash('md5');
      r.on('data', function(data) {
	hash.update(data);
      });
      r.on('end', function() {
	cb(hash.digest('base64'));
      });
    } else {
      throw 'File ' + filename + ' does not exist or can not be read';
    }
  });
}

var filename = path.join(process.argv[2]);
hashFile(filename, function(hash) {
  console.log(filename + ': ' + hash);
});


	    
	    
		    
