/**
 * Created by Tacademy on 2016-08-05.
 */
// http 서비스를 위한 http 기본모듈 로딩
var http = require('http');
// 경로 조작을 위한 path 기본모듈 로딩
var path = require('path');
// 파일의 존재 여부를 검사하고, 스트림 조작을 위한 fs 기본모듈 로딩
var fs = require('fs');
// http 요청 메시지 분석을 위한 url 기본모듈 로딩
var url = require('url');
// 쿼리스트링 분석을 위한 querystring 기본모듈 로딩
var querystring = require('querystring');
// MIME 타입 정보 생성을 위한 mime 확장모듈 로딩 (확장모듈이므로 npm을 이용한 설치 필요)
var mime = require('mime');
// 계산 기능을 가진 사용자 정의 확장 모듈을 경로를 이용해 로딩
var calc = require('./calc');

// 명령 프롬프트에서 전달 받은 인자를 포트 번호로 사용
// 값이 전달되지 않거나 숫자가 아닌 값이 전달되면 기본 포트로 8888을 사용
var port = parseInt(process.argv[2]) || 8888;
// http 서비스 객체를 생성
// request 이벤트에 대한 리스너 함수를 인자로 전달
// request 이벤트가 발생하는 리스너 함수에 IncomingMessage 객체와 ServerResponse 객체가 전달됨
http.createServer(function(req ,res) {
    // 응답을 위한 기본 MIME 타입을 정의
    var mimeType = mime.lookup('.html');
    mimeType = mimeType + '; charset=utf-8';
    // 요청 객체의 url 정보를 분석해 Url 객체 생성
    var urlObj =  url.parse(req.url);
    // Url 객체에서 경로 정보 추출
    var pathname = urlObj.pathname;
    // 경로가 /images/로 시작 할 경우의 처리 로직 구현
    if(pathname.match(/\/images\/*/gi)) {
        // 실제 파일시스템에 파일이 존재하는지 검사
        var dirimage = 'img'
        var filename = path.basename(pathname) === dirimage ? '' : path.basename(pathname);
        var fullpath = path.join(__dirname, dirimage, filename);

        fs.stat(fullpath, function(err, stats) {
            // 파일이 존재하지 않으면 404 오류 처리
            if(err) {
                res.writeHead(404, { 'Content-Type': mimeType });
                res.end('<h1>Not Found</h1>');
                return;
            }
            // 파일이 존재할 경우 디렉토리 파일인지 검사
            if(stats.isDirectory()) {
                // 디렉토리 파일일 경우 403 오류 처리
                res.writeHead(403, { 'Content-Type': mimeType });
                res.end('<h1>Forbidden</h1>');
            } else if(stats.isFile()) { // 일반 파일일 경우 MIME 정보를 파일에 맞게 변경
                // 파일에 대한 읽기스트림을 생성하고 응답객체와 연결(pipe)
                mimeType = mime.lookup(fullpath) + '; charset=utf-8';
                res.writeHead(200, { 'Content-Type': mimeType });
                var is = fs.createReadStream(fullpath);
                is.pipe(res);
            } else {
                res.writeHead(500, { 'Content-Type': mimeType });
                res.end('<h1>Internal Server Error</h1>');
            }
        });
    } else if(pathname.match(/\/calc\?*/gi)) { // 경로가 /calc?로 시작 할 경우의 처리 로직 구현
        // Url 객체의 query 정보를 분석해 쿼리스트링 객체 생성
        var qsObj = querystring.parse(urlObj.query);
        var op = qsObj['op'];

        if(req.url.match(/\/calc\?op=sum+/gi)) {
            var argArray = qsObj['arg'];
            argArray = argArray.map(function(v, i){
                return parseInt(argArray[i]) || 0;
            });
            var result = calc[op](argArray);
        } else if (req.url.match(/\/calc\?op=(add|subtract|multiply|divide)&art1=\d+&arg2=\d+/gi)) {
            // 쿼리스트링 객체에서 클라이언트가 전달한 값을 추출
            var arg1 = parseInt(qsObj['arg1']) || 0;
            var arg2 = parseInt(qsObj['arg2']) || 0;
            var result = calc[op](arg1, arg2);
        }

        // 200 OK 응답 처리
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end('<h1>' + result + '</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': mimeType });
        res.end('<h1>Not Fount</h1>');
    }
}).listen(port, function(){
   console.log('server running... at ' + port);
});



