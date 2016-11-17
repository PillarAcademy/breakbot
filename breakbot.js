module.exports = function(postMessage, breakbotId) {
  var count = 0;

  return {
    message: function(message) {
      if (message.text == breakbotId + ' Request') {
        ++count;
        var chatText = '' + count + (count == 1 ? ' break has ' : ' breaks have ') + 'been requested.';
        postMessage(chatText);
     }
   }
  }
};