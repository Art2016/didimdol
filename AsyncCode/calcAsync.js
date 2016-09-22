/**
 * Created by Tacademy on 2016-08-10.
 */
var async = require('async');

function first(cb) {
    async.waterfall([
        function (next) {
            var a = 3 * 6;
            next(null, a);
        },
        function (a, next) {
            var b = a + 2;
            next(null, b);
        },
    ], function (err, result) {
        cb(null, result);
    });
}

function second(cb){
    async.waterfall([
        function(next) {
            var a = 8  * 2;
            next(null, a);
        },
        function(a, next) {
            var b = a / 3;
            next(null, b);
        },
    ], function(err, result) {
        cb(null, result);
    });
}

async.parallel([first, second], function(err, results) {
    console.log(results[0] - results[1]);
});