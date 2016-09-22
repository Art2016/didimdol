var express = require('express');
var router = express.Router();

var logger = require('../common/logger');
var scheduler = require('../common/scheduler');

router.post('/', function(req, res, next) {
  logger.log('debug', '%s %s://%s%s', req.method, req.protocol, req.headers['host'], req.originalUrl)
  logger.log('debug', 'req.body: %j', req.body, {})

  logger.log('debug', 'Reservation has been accepted...');

  var jobName = 'reservation_confirmation';
  scheduler.define(jobName, function(job, done) {
    (function() {
      var data = job.attrs.data;
      logger.log('debug', 'send mail...\n\tto: %s\n\tfrom: %s\n\ttitle: %s\n\tcontent: %s',
        data.to, data.from, data.title, data.content);
      done();
    }());
  });

  scheduler.schedule('in 1 minutes', jobName, {
    to: req.body.email,
    from: 'manager@example.com',
    title: 'Reservation confirmation',
    content: 'Your reservation has been confirmed.',
  });
  scheduler.start();

  res.send('Your reservation has been accepted.');
});

module.exports = router;
