/**
 * Created by Tacademy on 2016-08-12.
 */
var mysql = require('mysql');
var async = require('async');

var branch_id = 2;
var customer_id = 1;
var menu_order_details = [{
    branch_menu_id: 26,
    quantity: 2,
    menu_price: 11000
}, {
    branch_menu_id: 27,
    quantity: 3,
    menu_price: 12000
}];

var dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};
var sql_insert_menu_order = 'insert into menu_order (branch_id, customer_id) values (?, ?)';
var sql_insert_menu_order_details = 'insert into menu_order_details(menu_order_id, branch_menu_id, quantity, menu_price) ' +
                                     'values(?, ?, ?, ?)';

var dbConn = mysql.createConnection(dbConfig);
dbConn.beginTransaction(function(err) {
    if(err) return console.error(err);

    async.waterfall([insertMenuOrder, insertMenuOrderDetailsEach], function(err, result) {
        if(err) return dbConn.rollback(function() {
            console.error('rollback...');
            dbConn.end();
        });
        dbConn.commit(function() {
            console.log('commit...');
            dbConn.end();
        });
    });
});

function insertMenuOrder(callback) {
    dbConn.query(sql_insert_menu_order, [branch_id, customer_id], function(err, result) {
        if(err) return callback(err);
        console.log('result.insertId : ' + result.insertId);
        callback(null, result.insertId);
    });
}

function insertMenuOrderDetailsEach(insertId, callback) {
    async.each(menu_order_details, function(item, done) {
        insertMenuOrderDetails(insertId, item.branch_menu_id, item.quantity, item.menu_price, done);
    }, function(err) {
        if(err) return callback(err);
        callback(null);
    });
}

function insertMenuOrderDetails(insertId, branch_menu_id, quantity, menu_price, callback) {
    dbConn.query(sql_insert_menu_order_details, [insertId, branch_menu_id, quantity, menu_price], function(err, result) {
        if(err) return callback(err);
        callback(null);
        //callback(new Error('에러 -> 롤백'));
    });
}