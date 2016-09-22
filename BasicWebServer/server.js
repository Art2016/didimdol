/**
 * Created by Tacademy on 2016-08-05.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var mime = require('mime');
var calc = require('./calc');

var port = parseInt(process.argv[2]) || 8888; // 포트 번호
http.createServer(function(req, res) {
    var mimeType = mime.lookup('.html'); // mine 타입 디폴트로 text/html 설정
    var urlObj = url.parse(req.url); // url 파싱
    var pathname = urlObj.pathname; // /xxx/1.jpg
    if (pathname.match(/\/images\/*/gi)) { // 경로 판별
        var imagedirname = 'img'; // 실제 이미지 폴더
        var fileName = path.basename(pathname) === imagedirname ? '' : path.basename(pathname); // 1.jpg
        var imagepath = path.join(__dirname, imagedirname, fileName); // D:\Dev\WebstormProjects\Nodejs\BasicWebServer\img\1.jpg

        fs.stat(imagepath, function(err, stats) {
            if(err) {
                res.writeHead(404, { 'Content-Type' : mimeType });
                res.end('<h1>Not Found!!</h1>');
                return;
            }
            if(stats.isDirectory()){
                // 403
                res.writeHead(403, { 'Content-Type' : mimeType });
                res.end('<h1>Forbidden!!</h1>');
            } else if(stats.isFile()){
                // 200
                mimeType = mime.lookup(imagepath);
                res.writeHead(200, { 'Content-Type': mimeType });
                var is = fs.createReadStream(imagepath);
                is.pipe(res);
            } else {
                // 500
                res.writeHead(500, { 'Content-Type' : mimeType });
                res.end('<h1>Internal Server Error!!</h1>');
            }
        });
    }
    else if (pathname.match(/\/calc\?*/gi)) {

        var qsObj = querystring.parse(urlObj.query);
        var arg1 = parseInt(qsObj['arg1']) || 0;
        var arg2 = parseInt(qsObj['arg2']) || 0;
        var op = qsObj['op'];
        try {
            var result = calc[op](arg1, arg2);
        } catch (e) {
            console.log(e);
        }
        res.writeHead(200, { 'content-Type': mimeType });
        res.end('<h1>' + result + '</h1>');
    }
}).listen(port, function(){
    console.log('server running.... at ' + port);
});
