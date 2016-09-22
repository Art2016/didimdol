/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

var arr = [1, 2, 3, 4, 5];

async.map(arr, function(item, callback) {
    if(typeof(item) !== 'number') {
        callback(new Error(item + ' is not a number!!'));
    } else {
        console.log(item);
        callback(null, { 'category': item % 2, 'value': item });
    }
}, function(err, results) {
    if(err) {
        console.log(err);
    } else {
        console.log(results);
    }
});