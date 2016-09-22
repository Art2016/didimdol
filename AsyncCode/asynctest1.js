/**
 * Created by Tacademy on 2016-08-09.
 */
var async = require('async');
var uuid = require('uuid');
var path = require('path');
var fs = require('fs');
/*
var randInt = [];
for(var i = 0; i < 5; i++) {
    randInt[i] = Math.ceil(Math.random() * 10);
}

async.map(randInt, function(item, callback) {
    if(typeof(item) !== 'number') {
        callback(new Error(item + ' is not a number!!'));
    } else {
        var transformed = {};
        transformed[uuid.v4()] = item;
        callback(null, transformed);
    }
}, function(err, results) {
    if(err) {
        console.log(err);
    } else {
        console.log(results);
    }
});
*/
var randInt = [];
async.waterfall([
    function (callback) {
        for(var i = 0; i < 5; i++) randInt[i] = Math.ceil(Math.random() * 10);
        callback(null, randInt);
    },
    function (arg1, callback) {
        async.map(arg1, function (item, cb) {
            var transformde = {};
            transformde[uuid.v4()] = item;
            cb(null, transformde);
        }, function (err, results) {
            callback(null, results);
        })
    }
], function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});

// 배열을 저장한 sample.json 파일을 읽어
var filePath = path.join(__dirname, 'sample.json');
var result = '';
var reader = fs.createReadStream(filePath);

reader.on('data', function(chunk) {
    result += chunk;
});

reader.on('end', function () {
    var arr = JSON.parse(result);
    async.filter(arr, function (item, callback) {
        callback(null, item % 2 === 1);
    }, function (err, results) {
        if(err) {
            console.log(err);
        } else {
            async.reduce(results, 0, function (memo, items, callback) {
                callback(null, memo + items);
            }, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        }
    });
});