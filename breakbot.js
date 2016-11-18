module.exports = function(args) {
  var count = 0;

  function reportCount() {
    var chatText;
    
    if (count == 0) {
      chatText = 'Nobody has requested a break.';
    }
    else if (count == 1) {
      chatText = '1 break has been requested.';
    }
    else {
      chatText = '' + count + ' breaks have been requested.'
    }
    args.postMessage(chatText);
  }

  return {
    message: function(message) {
      if (message.text == args.breakbotId + ' Request') {
        ++count;
        reportCount();

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

     if (message.text == args.breakbotId + ' Count') {
       reportCount();
     }
   }
  }
};