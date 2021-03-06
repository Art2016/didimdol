var mysql = require('mysql');
var async = require('async');
var dbConfig = require('../config/dbConfig');

function findByEmail(email, callback) {
  var sql = 'SELECT id, name, email, password, facebookid FROM customer WHERE email = ?';
  var dbConn = mysql.createConnection(dbConfig);

  dbConn.query(sql, [email], function(err, results) {
    if (err) {
      dbConn.end();
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    dbConn.end();
    var user = {};
    user.id = results[0].id;
    user.name = results[0].name;
    user.email = results[0].email;
    user.password = results[0].password;
    user.facebookid = results[0].facebookid;
    callback(null, user);
  })
}

function verifyPassword(password, hashPassword, callback) {
  var sql = 'SELECT SHA2(?, 512) password';
  var dbConn = mysql.createConnection(dbConfig);

  dbConn.query(sql, [password], function(err, results) {
    if (err) {
      dbConn.end();
      return callback(err);
    }

    if (results[0].password !== hashPassword) {
      dbConn.end();
      return callback(null, false)
    }
    dbConn.end();
    callback(null, true);
  });
}

function findCustomer(customerId, callback) {
  var sql = 'SELECT id, name, email FROM customer WHERE id = ?';
  var dbConn = mysql.createConnection(dbConfig);

  dbConn.query(sql, [customerId], function(err, results) {
    if (err) {
      dbConn.end();
      return callback(err);
    }
    dbConn.end();
    var user = {};
    user.id = results[0].id;
    user.name = results[0].name;
    user.email = results[0].email;
    user.password = results[0].password;
    user.facebookid = results[0].facebookid;
    callback(null, user);
  });
}

function registerCustomer(newCustomer, callback) {

}

function updateCustomer(customer, callback) {

}

function listCustomers(pageNo, rowCount, callback) {

}

module.exports.findCustomer = findCustomer;
module.exports.registerCustomer = registerCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.listCustomers = listCustomers;
module.exports.findByEmail = findByEmail;
module.exports.verifyPassword = verifyPassword;
