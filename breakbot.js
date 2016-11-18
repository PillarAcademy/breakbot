module.exports = function(args) {
  var count = 0;

  return {
    message: function(message) {
      if (message.text == args.breakbotId + ' Request') {
        ++count;
        var chatText = '' + count + (count == 1 ? ' break has ' : ' breaks have ') + 'been requested.';
        args.postMessage(chatText);

        args.getNumUsers(function(numUsers) {
          if (count >= numUsers/2) {
            args.postMessage('Half of the attendees have requested a break!')
          }
        });
     }

     if (message.text == args.breakbotId + ' Reset') {
        count=0;
        args.postMessage('Break count has been reset.');
     }
   }
  }
};