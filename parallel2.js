var step = require('step');
var capitalize = function(text, callback) {
  setTimeout(function (text) {
    try {
      callback(null, text.toUpperCase());
    } catch (exception) {
      callback(exception);
    }
  }, 100, text);
};

var words = ['one', 'two', 'three', 'four', 'five'];

step(
  function () {
    var i, length;
    for (i = 0, length = words.length; i < length; i++) {
      capitalize(words[i], this.parallel());
    }
  },

  function (err) {
    if (err) throw err;
    var upcasedWords = Array.prototype.slice.call(arguments);
    upcasedWords.shift();
    console.log('Done, upcased words: <'
		+ upcasedWords.join(' ') + '>');  
  }
);