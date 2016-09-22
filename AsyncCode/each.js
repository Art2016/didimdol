/**
 * Created by Tacademy on 2016-08-08.
 */
var async = require('async');

var arr = [1, 2, 3, 4, 5];

async.each(arr, function(item, callback) {
   if(typeof(item) !== 'number') {
       callback(new Error(item + ' is not a number!!'));
   } else {
       async.each(arr, function(item2, callback2) {
           console.log(item);
           console.log('2번째 async : ' + item2);
           callback2(null, 'a');
       }, function (err, a) {
           if(err) callback(err);
           console.log(a);
           callback(null);
       });
   }
}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('completed!!');
    }
});

async.eachSeries(arr, function(item, callback) {
    if(typeof(item) !== 'number') {
        callback(new Error(item + ' is not a number!!'));
    } else {
        //console.log(item);
        callback();
    }
}, function(err) {
    if(err) {
        console.log(err);
    } else {
        //console.log('completed!!')
    }
});