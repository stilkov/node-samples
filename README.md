## A set of very simple Node.js examples

These are examples of Node.js usage as used in the QCon presentation on Node.js on March 11, 2011, currently being updated to Node 0.5.10 (in preparation for W-JAX, November 2011).

* echo.js: This is the simplest possible Node.js net server as shown on the Node home page, simply echoing everything sent to it back.
* echo-upcase.js: A variation where everything is converted to uppercase letters before being sent back. Note that the socket is set to ASCII encoding; this makes Node pass a string to the handler function instead of a byte buffer.
* file-server.js: A very simple static file server that will serve files from a 'public' directory by default. Don't dare to put this code even near production as it's vulnerable to all sorts of ../../.. attacks.
* file-server-md5.js: A variant of the file server that will calculate an MD5 hash and put it into the appropriate HTTP header.
* stream-file-server.js: A variant of the file server that will read the file using streaming and passes each chunk to the HTTP response, showing off HTTP chunking support in Node.
* hash-file-stream.js: This shows that the hash functions from the crypto module support chunked processing, too.
* stream-file-server-md5.js: (not shown on slides:) This variant of the file server computes a hash while serving the file in chunks and passes the MD5 as an HTTP trailer.
* async1.js: Shows some asynchronous vs. synchronous function combination, not handling any errors.
* async2.js: Illustrates the problem with error handling, including a very misguided attempt at a try/catch around callback registration.
* async3.js: Shows how to properly handle multiple successive calls, including error handling. You'll need the (external) Step module for some of the examples.
* parallel1.js: Includes both a working and a broken version of handling multiple "parallel" calls, i.e. calls that need to be processed as a whole before the next step can continue.
* parallel2.js: Same as parallel1, this time showing the Step module's approach.
* proxy.js: A very simple HTTP proxy.
* proxy-pump.js: An even simpler HTTP proxy, showing the use of the util.pump function.
* multi-file-server.js: Uses multi-node to start child processes, all listening on the same port.
