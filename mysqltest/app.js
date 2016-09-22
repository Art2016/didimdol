/**
 * Created by Tacademy on 2016-08-12.
 */
var mysql = require('mysql');
var async =require('async');

var dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};
var sql = 'select bm.id bmid, b.id bid, b.name bname, m.id mid, m.name mname ' +
            'from branch b join branch_menu bm on (b.id = bm.branch_id) ' +
            'join menu m on (bm.menu_id = m.id) ' +
            'where b.id = ?';
var dbConn = mysql.createConnection(dbConfig);
dbConn.query(sql, [1], function(err, results) {
    if(err) {
        console.log(err);
        return;
    }
    async.each(results, function(row, callback) {
        console.log(row.bmid + ' | ' + row.bid + ' | ' + row.bname + ' | ' + row.mid + ' | ' + row.mname);
        callback();
    }, function(err) {
        if(err) console.log(err);
        dbConn.end();
    });
});