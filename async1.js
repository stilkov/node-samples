var bold = function(text) {
  return text.bold();
};

var capitalize = function(text) {
  return text.toUpperCase();
};

console.log("Synchronous:");
var result1 = capitalize("Hello, synchronous world.");
var result2 = bold(result1);
console.log("Sync result is " + result2);
 

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

console.log("Asynchronous:");
capitalizeAsync("Hello, asynchronous world.", function(result1) {
  boldAsync(result1, function(result2) {
    console.log("Async result is " + result2);
  });
});
