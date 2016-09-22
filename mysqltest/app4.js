/**
 * Created by Tacademy on 2016-08-12.
 */
var mysql = require('mysql');
var async = require('async');

var quantity = 5;
var menu_order_id = 36180;
var branch_menu_id = 26;

var dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};
var sql_update_menu_order_details =
    'update menu_order_details ' +
    'set quantity = ? ' +
    'where menu_order_id = ? and branch_menu_id = ?';

var dbConn = mysql.createConnection(dbConfig);
dbConn.query(sql_update_menu_order_details, [quantity, menu_order_id, branch_menu_id], function(err, result) {
    if(err) console.log(err);
    else console.log(result);
    dbConn.end();
});



// 