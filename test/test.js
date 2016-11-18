var chai = require('chai');
var expect = require('chai').expect;

var outgoingMessage = null;
var userId = 'someuser';
var numUsers;

function postMessage(message) {
  outgoingMessage = message
}

function getNumUsers(callback) {
  callback(numUsers);
}

var breakbot;

function sendBreakRequest(bot) {
  bot.message({text: userId + " Request"});
}

function sendReset(bot) {
  bot.message({text: userId + " Reset"});
}

function sendCountRequest(bot) {
  bot.message({text: userId + " Count"});
}

beforeEach(function(done) {
  outgoingMessage = null;
  numUsers = 5;
  breakbot = require('./../breakbot.js')({postMessage: postMessage, breakbotId: userId, getNumUsers: getNumUsers});
  done();
})

describe('BreakBot responses', function() {
  it('should say one break is requested', function(done) {
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('1 break has been requested.');
    done();
  });

  it('should say two breaks are requested', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('2 breaks have been requested.');
    done();
  });

  it('should not alarm for 2 out of 5 users', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.not.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should alarm for 3 out of 5 users', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should alarm for 4 out of 5 users', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should not alarm for 2 out of 6 users', function(done) {
    numUsers = 6;
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.not.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should alarm for 3 out of 6 users', function(done) {
    numUsers = 6;
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should alarm for 4 out of 6 users', function(done) {
    numUsers = 6;
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('Half of the attendees have requested a break!');
    done();
  });

  it('should confirm the break count has been reset', function(done) {
    sendReset(breakbot);
    expect(outgoingMessage).to.equal('Break count has been reset.')
    done();
  });

  it('should update break count after reset', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    sendReset(breakbot);
    sendBreakRequest(breakbot);
    expect(outgoingMessage).to.equal('1 break has been requested.');
    done();
  });

  it('should report no breaks requested when asked', function(done) {
    sendCountRequest(breakbot);
    expect(outgoingMessage).to.equal('Nobody has requested a break.');
    done();
  });

  it ('should report two breaks requested when asked if two breaks have been requested', function(done) {
    sendBreakRequest(breakbot);
    sendBreakRequest(breakbot);
    outgoingMessage = null;
    sendCountRequest(breakbot);
    expect(outgoingMessage).to.equal('2 breaks have been requested.');
    done();
  });
});