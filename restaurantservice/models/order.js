/**
 * Created by Tacademy on 2016-08-16.
 */
var mysql = require('mysql');
var async = require('async');

var dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

function placeOrder(orderObj, callback) {
    var sql_insert_menu_order = 'insert into menu_order (branch_id, customer_id) values (?, ?)';
    var sql_insert_menu_order_details = 'insert into menu_order_details(menu_order_id, branch_menu_id, quantity, menu_price) ' +
        'values(?, ?, ?, ?)';
    var sql_select_menu_price = 'SELECT m.price ' +
        'FROM branch_menu bm JOIN menu m ON(bm.menu_id = m.id) ' +
        'WHERE bm.id =?';

    var sql_select_order_dtime = 'SELECT convert_tz(order_dtime, "+00:00", "+09:00") time ' +
        'FROM menu_order ' +
        'WHERE id = ?';

    var dbConn = mysql.createConnection(dbConfig);

    dbConn.beginTransaction(function(err) {
        if(err) return callback(err);

        async.series([insertMenuOrder, insertMenuOrderDetailsEach], function(err) {
            if(err) return dbConn.rollback(function() {
                callback(err);
                dbConn.end();
            });
            dbConn.commit(function() {
                callback(null, orderObj);
                dbConn.end();
            });
        });
    });

    function insertMenuOrder(callback) {
        dbConn.query(sql_insert_menu_order, [orderObj.branch_id, orderObj.customer_id], function(err, result) {
            if(err) return callback(err);
            console.log('result.insertId : ' + result.insertId);
            orderObj.insertId = result.insertId;
            selectOrderDtime(orderObj.insertId, function(err, order_dtime) {
                if (err) {
                    return callback(err);
                }
                orderObj.order_dtime = order_dtime;
                callback(null);
            });
        });
    }
    function insertMenuOrderDetailsEach(callback) {
        async.each(orderObj.details, function(item, done) {
            insertMenuOrderDetails(orderObj.insertId, item, done);
        }, function(err) {
            if(err) return callback(err);
            callback(null);
        });
    }
    function insertMenuOrderDetails(insertId, item, callback) {
        selectMenuPrice(item.branch_menu_id, function (err, price) {
            if (err) {
                return callback(err);
            }
            item.menu_price = price;
            dbConn.query(sql_insert_menu_order_details, [insertId, item.branch_menu_id, item.quantity, item.menu_price], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    }

    function selectMenuPrice(branch_menu_id, callback) {
        dbConn.query(sql_select_menu_price, [branch_menu_id], function(err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results[0].menu_price);
        })
    }

    function selectOrderDtime(id, callback) {
        dbConn.query(sql_select_order_dtime, [id], function(err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results[0].time);
        });
    }
}

function listOrders(pageNo, rowCount, callback) {
    var sql =
        'SELECT mo.id order_id, date_format(convert_tz(mo.order_dtime, \'+00:00\', \'+09:00\'), \'%Y-%m-%d %H:%i:%s\') ktc, b.name branch_name, c.name cus_name, sum(md.quantity * md.menu_price) total_price ' +
        'from branch b join menu_order mo on (b.id = mo.branch_id) ' +
                      'join menu_order_details md on (md.menu_order_id = mo.id) ' +
                      'join customer c on (c.id = mo.customer_id) ' +
        'group by mo.id ' +
        'order by mo.id desc ' +
        'limit ?, ?';

    var dbConn = mysql.createConnection(dbConfig);

    dbConn.query(sql, [rowCount * (pageNo - 1), rowCount], function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
        dbConn.end();
    });
}

module.exports.placeOrder = placeOrder;
module.exports.listOrders = listOrders;