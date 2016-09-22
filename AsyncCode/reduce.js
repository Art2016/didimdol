/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

async.reduce([1,2,3], 0, function(memo, item, callback) {
    // pointless async:
    console.log(memo + item);
    callback(null, memo + item)
}, function(err, result) {
    // result is now equal to the last value of memo, which is 6
    console.log(result);
});

var arr = [1, 2, 3, 4, 5];

async.filter(arr, function(item, callback) {

});