var chai = require('chai');
var expect = require('chai').expect;

var outgoingMessage = null;

function postMessage(message) {
  outgoingMessage = message
}

var breakbot;

beforeEach(function(done) {
  outgoingMessage = null;
  breakbot = require('./../breakbot.js')(postMessage);
  done();
})

describe('BreakBot responses', function() {
  it('should say one break is requested', function(done) {
    breakbot.message({text: "Gimme a break"});
    expect(outgoingMessage).to.equal('1 break has been requested.')
    done();
  });

  it('should say two breaks are requested', function(done) {
    breakbot.message({text: "Gimme a break"});
    breakbot.message({text: "Gimme a break"});
    expect(outgoingMessage).to.equal('2 breaks have been requested.')
    done();
  });
});