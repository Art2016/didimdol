var mysql = require('mysql');
var async = require('async');

var page = parseInt(process.argv[2]) || 1;
var count = parseInt(process.argv[3]) || 10;
//연결 정보 npm mysql API문서 보면 된다.
//이거를 환경변수에 넣고 써야 보안이 좋다. run - edit
var dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

//var sql = 'SELECT id, name, price FROM menu';

//반드시 끝에는 공백을 처리해줘야한다. 그래야 select from 사이를 구분 할 수 있다.
// 바뀌는 부분은 ?이거다 이게 플레이스 홀더
//dbConn.query()에서 [] 플레이스홀더다.
/*var sql =
 'select bm.id bmid, b.id bid, b.name bname, m.id mid, m.name mname ' +
 'from branch b join branch_menu bm on (b.id = bm.branch_id) ' +
 'join menu m on (bm.menu_id = m.id) ' +
 'where b.id = ? ';
 */
var sql =
    'SELECT mo.id order_id, convert_tz(mo.order_dtime, ?, ?) ktc, b.name branch_name, c.name cus_name, sum(md.quantity * md.price) total_price ' +
    'from branch b join menu_order mo on (b.id = mo.branch_id) ' +
                   'join menu_order_details md on (md.menu_order_id = mo.id) ' +
                   'join customer c on (c.id = mo.customer_id) ' +
    'group by mo.id ' +
    'order by mo.id desc ' +
    'limit ?, ?';
var dbConn = mysql.createConnection(dbConfig);
dbConn.query(sql, ["+00:00", "+09:00", count * (page - 1), count], function (err, results) {
    if (err) {
        console.log(err);
        return;
    }
    async.each(results, function (row, callback) {
        console.log(row);
        callback();
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    dbConn.end();
});