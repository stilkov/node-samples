var bold = function(text) {
  return text.bold();
};

var capitalize = function(text) {
  return text.toUpperCase();
};

var boldAsync = function(text, callback) {
  setTimeout(function (text) {
    callback(text.bold());
  }, 100, text);
};

var capitalizeAsync = function(text, callback) {
  setTimeout(function (text) {
    callback(text.toUpperCase());
  }, 100, text);
};

// bad, don't do this
try {
  console.log("Synchronous:");
  var result1 = capitalize(null);
  var result2 = bold(result1);
  console.log("Sync result is " + result2);
} catch (exception) {
  console.log("Sync exception caught: " + exception);
}


try {
  console.log("Asynchronous:");
  capitalizeAsync(null, function(result1) {
    boldAsync(result1, function(result2) {
      console.log("Async result is " + result2);
    });
  });
} catch (exception) {
  console.log("Async exception caught: " + exception);
}
