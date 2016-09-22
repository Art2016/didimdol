/**
 * Created by Tacademy on 2016-08-10.
 */
var fs = require('fs');
var path = require('path');
var async = require('async');

var srcPath = (process.argv[2] !== undefined) ? path.join(__dirname, process.argv[2]) : __filename;
var destPath = process.argv[3] || (srcPath + '.copy');

// 파일 읽기
function readFile(cb) {
    var reader = fs.createReadStream(srcPath);
    var data = '';
    reader.on('data', function(chunk) {
        data += chunk;
    });
    reader.on('end', function() {
        console.log('completed!!!');
        cb(null, data);
    });
    reader.on('error', function() {
        cb('occurred!!');
    });
}

// 파일 쓰기
function writeFile(data, cb) {
    var writer = fs.createWriteStream(destPath);
    writer.write(data);
    cb(null);
}

async.waterfall([readFile, writeFile], function(err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('copy completed!!');
});
