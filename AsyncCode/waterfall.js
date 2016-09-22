/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

async.waterfall([
    function(cb) {
        var a = 10;
        cb(null, a);
    },
    function(arg1, cb) {
        var b = 20;
        cb(null, arg1, b);
    },
    function(arg1, arg2, cb) {
        var c = 30;
        cb(null, arg1 + arg2 + c);
    }
], function(err, result) {
        console.log(result);
});