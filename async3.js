var boldAsync = function(text, callback) {
  setTimeout(function (text) {
    try {
      callback(null, text.bold());
    } catch (exception) {
      callback(exception);
    }
  }, 100, text);
};

var capitalizeAsync = function(text, callback) {
  setTimeout(function (text) {
    try {
      callback(null, text.toUpperCase());
    } catch (exception) {
      callback(exception);
    }
  }, 100, text);
};

capitalizeAsync(null, function(err, result1) {
  if (!err) {
    boldAsync(result1, function(err, result2) {
      if (!err) {
	console.log("Async result is " + result2);
      } else {
	console.log("Handling async error: " + err);
      }
    });
  } else {
    console.log("Handling async error: " + err);
  }
});

var handleError = function(err, fn) {
  if (err) {
    console.log("Handling async error: " + err);
  } else {
    fn();
  }
}

capitalizeAsync(null, function(err, result1) {
  handleError(err, function () {
    boldAsync(result1, function(err, result2) {
      handleError(err, function () {
	console.log("Async result is " + result2);
      });
    });
  });
});

var step = require("step");
step(
  function () { 
    capitalizeAsync("testtext", this);
  },
  function (err, result) {
    if (err) throw err;
    boldAsync(result, this);
  },
  function(err, result) {
    if (err) {
      console.log("Handling async error: " + err);
    } else {
      console.log("Async result is " + result);
    }
  }
);

step(
  function () { 
    capitalizeAsync(null, this);
  },
  function (err, result) {
    if (err) throw err;
    boldAsync(result, this);
  },
  function(err, result) {
    if (err) {
      console.log("Handling async error: " + err);
    } else {
      console.log("Async result is " + result);
    }
  }
);