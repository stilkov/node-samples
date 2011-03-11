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
var upcasedWords = [];

// bad, don't do this
words.forEach(function (word) {
  capitalize(word, function(err, word) {
    upcasedWords.push(word);
  });
});
console.log('Done, upcased words: <' + upcasedWords.join(' ') + '>');

var count = words.length;
words.forEach(function (word) {
  capitalize(word, function(err, word) {
    upcasedWords.push(word);
    if (--count === 0) {
      console.log('Done, upcased words: <' + upcasedWords.join(' ') + '>');  
    }
  });
});
