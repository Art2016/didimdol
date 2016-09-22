var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Create a message
  var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
      key1: 'message1',
      key2: 'message2'
    },
    notification: {
      title: "FCM 테스트",
      body: "내용"
    }
  });

  /*
  // Change the message data
  // ... as key-value
  message.addData('key1','message1');
  message.addData('key2','message2');

  // ... or as a data object (overwrites previous data object)
  message.addData({
    key1: 'message1',
    key2: 'message2'
  });
  */

  // Set up the sender with you API key
  var sender = new gcm.Sender('api-key');

  // Add the registration tokens of the devices you want to send to
  var registrationTokens = [];
  registrationTokens.push('token1');
  registrationTokens.push('token2');

  // Send the message retrying
  sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    if(err) res.send(err);
    else res.send(response);
  });
});

module.exports = router;
