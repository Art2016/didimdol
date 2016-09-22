/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

var x = 0;

async.series([
    function(cb) {
        var result = ++x;
        console.log('첫 번째 : ' + result);
        cb(null, result);
    },
    function(cb) {
        var result = ++x;
        console.log('두 번째 : ' + result);
        cb(new Error('그냥 에러'));
    },
    function(cb) {
        var result = ++x;
        console.log('세 번째 : ' + result);
        cb(null, result);
    }
], function(err, results) {
    if(err) {
        console.log(err);
    } else {
        console.log(results);
    }
});