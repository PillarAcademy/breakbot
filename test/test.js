var chai = require('chai');
var expect = require('chai').expect;

var outgoingMessage = null;
var userId = 'someuser';

function postMessage(message) {
  outgoingMessage = message
}

var breakbot;

beforeEach(function(done) {
  outgoingMessage = null;
  breakbot = require('./../breakbot.js')({postMessage: postMessage, breakbotId: userId});
  done();
})

describe('BreakBot responses', function() {
  it('should say one break is requested', function(done) {
    breakbot.message({text: userId + " Request"});
    expect(outgoingMessage).to.equal('1 break has been requested.')
    done();
  });

  it('should say two breaks are requested', function(done) {
    breakbot.message({text: userId + " Request"});
    breakbot.message({text: userId + " Request"});
    expect(outgoingMessage).to.equal('2 breaks have been requested.')
    done();
  });

  it('should confirm the break count has been reset', function(done) {
    breakbot.message({text: userId + " Reset"});
    expect(outgoingMessage).to.equal('Break count has been reset.')
    done();
  });

  it('should update break count after reset', function(done) {
    breakbot.message({text: userId + " Request"});
    breakbot.message({text: userId + " Request"});
    breakbot.message({text: userId + " Reset"});
    breakbot.message({text: userId + " Request"});
    expect(outgoingMessage).to.equal('1 break has been requested.');
    done();
  });
});