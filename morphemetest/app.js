var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');

var routes = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var TwitterKoreanText = require('twtkrjs');
var processor = new TwitterKoreanText({
    stemmer: false,      // (optional default: true)
    normalizer: false,   // (optional default: true)
    spamfilter: true     // (optional default: false)
});
app.get('/test', function(req, res) {
    processor.tokenize('[지디넷코리아] <p>페이스북의 영상 중계 서비스인 페이스북 라이브가 두 계정에서 동시에 하나의 방송을 내보내는 기능을 추가할 전망이다.</p><p><br></p><p>20일(현지시간) 더넥스트웹은 소식통을 인용, 페이스북 라이브가 이같은 주요 기능을 추가할 것이라고 보도했다.</p><p><br></p><p>내달 미국서 관련 기능을 선보일 것이라고 전한 만큼 이원 방송 서비스 준비를 거의 마친 것으로 보인다. 또 외신은 미국서 우선 추가 서비스를 선보인 뒤 한두달 이후 글로벌 서비스로 확대할 것으로 내다봤다.</p><img src="http://image.zdnet.co.kr/2016/02/27/hjan_uYNj5siNzXuzPDL.jpg" style="display: block; margin: auto; width: 550px; height: 351px;" rel="display: block; margin: auto; width: 550px; height: 351px;" alt="" longdesc="image" href=""><br><br><br>▶ IT 세상을 바꾸는 힘 <b>&lt;지디넷코리아&gt;,</b><br/>▶', function (err, keywords) {
        var keyArr = [];
        async.each(keywords, function(item, done) {
          if(item.pos === 'Noun') {
              keyArr.push(item.text);
          }
          done(null);
        }, function(err) {
          res.send(keyArr);
        });
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
