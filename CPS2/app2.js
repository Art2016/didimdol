/**
 * Created by Tacademy on 2016-08-19.
 */
// dbPool에 가지고 있는 connection 객체 가져오는 함수
function getConnection(callback) {
    // 커넥션을 검색
    var index = this.findIndex(function(element) {
        return element.usable;
    });
    // 없을 경우
    if(index === -1) {
        callback(new Error('사용할 수 있는 객체가 없습니다.'));
    }
    // 있을 경우
    else {
        this[index].usable = false;
        callback(null, this[index]);
    }
}

// dbPool 생성
var dbPool = [];
dbPool.getConnection = getConnection;

for (var i = 0; i < 5; i++) {
    dbPool.push({
        name: 'connection #' + i,
        usable: true
    });
}

for (var j = 0; j < 3; j++) {
    dbPool[j].usable = false;
}

// connection 객체 호출
dbPool.getConnection(function(err, conn) {
    if(err) return console.log(err);
    console.log(conn);
});