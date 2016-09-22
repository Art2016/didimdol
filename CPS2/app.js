/**
 * Created by Tacademy on 2016-08-19.
 */
function getConnection(callback) {
    // 사용 가능한 connection 객체를 조회
    var index = this.findIndex(function(element) {
        return element.usable;
    });
    // 없을 경우
    if(index === -1) {
        callback(new Error('사용할 수 있는 데이터베이스 연결 객체가 없습니다.'));
    }
    // 있을 경우
    else {
        this[index].usable = false;
        callback(null, this[index]);
    }
}
var dbPool = [];
dbPool.getConnection = getConnection;

for (var i = 0; i < 5; i++) {
    dbPool.push({ name: 'connection #' + i, usable: true });
}

for (var i = 0; i < 3; i++) {
    dbPool[i].usable = false;
}



dbPool.getConnection(function(err, connection) {
    if (err) {
        return console.log(err);
    }
    console.log(connection);
});