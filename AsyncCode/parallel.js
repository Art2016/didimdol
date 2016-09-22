/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

var x = 0;
async.parallel([
    function(cb) {
        var result = ++x;
        cb(null, result);
    },
    function(cb) {
        var result = ++x;
        setTimeout(function () {
            cb(null, '두번째 : ' + result);
        }, 1000);
    },
    function(cb) {
        var result = ++x;
        cb(null, result);
    }
], function(err, results) {
    if(err) {
        console.log(err);
    } else {
        console.log(results);
    }
});