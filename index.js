require('dotenv').config();
var slack = require('slack')
var rtm = slack.rtm.client();
var token = process.env.SLACK_TOKEN;
var channel = process.env.CHANNEL;

function postMessage(message) {
  slack.chat.postMessage({token: token, channel: channel, text: message}, function(err, resp) {});
}

var breakbot = require('./breakbot.js')(postMessage);

rtm.message(breakbot.message);
rtm.listen({token})

