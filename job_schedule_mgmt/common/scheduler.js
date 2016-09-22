var Agenda = require('agenda');
var logger = require('./logger');

var host = 'localhost:27017';
var db = 'scheduler-test';
var collection = 'agendaJobs';

var config = {
  db: {
    address: host + '/' + db,
    collection: collection
  }
};

var agenda = new Agenda(config);

agenda.on('ready', function() {
  logger.log('debug', 'Agenda mongo connection(%s) is successfully opened...', db);
});

agenda.on('error', function(err) {
  logger.log('debug', 'Agenda mongo connection(%s) process has thrown an error: %s', db, err.message);
});

agenda.on('start', function(job) {
  logger.log('debug', 'Job %s starting...', job.attrs.name);
});

agenda.on('complete', function(job) {
  logger.log('debug', 'Job %s finished...', job.attrs.name);
});

module.exports = agenda;