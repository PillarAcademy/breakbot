module.exports = function(args) {
  var count = 0;

  return {
    message: function(message) {
      if (message.text == args.breakbotId + ' Request') {
        ++count;
        var chatText = '' + count + (count == 1 ? ' break has ' : ' breaks have ') + 'been requested.';
        args.postMessage(chatText);
     }
   }
  }
};