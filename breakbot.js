module.exports = function(postMessage) {
  var count = 0;

  return {
    message: function(message) {
      if (message.text == 'Gimme a break') {
        ++count;
        var chatText = '' + count + (count == 1 ? ' break has ' : ' breaks have ') + 'been requested.';
        postMessage(chatText);
     }
   }
  }
};