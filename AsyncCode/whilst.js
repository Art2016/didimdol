/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

var count = 0;
async.whilst(
    function() {
        return count < 5;
    },
    function(callback) {
        count++;
        setTimeout(function() {
            console.log(count);
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
        // 5 seconds have passed, n = 5
        console.log(n);
    }
);