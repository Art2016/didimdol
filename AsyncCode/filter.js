/**
 * Created by Tacademy on 2016-08-09.
 */
var async = require('async');

var arr = [1, 2, 3, 4, 5];
var arr1=[];
async.map(arr, function(item, callback){
    if(typeof(item) !== 'number')
        callback(new Error(item + ' is not number'));
    else{
        console.log(item);
        callback(null, {"category":item%2, "value":item}); // transformed item 의 유무(each와의 차이)
    }
}, function(err, result){
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
        var j = 0
        for(var i=0;i<result.length;i++){
            if(result[i]["category"]==1)
                arr1[j++]=result[i]["value"];
        }
        console.log(arr1);
    }
});

async.reduce(arr1, 0, function(memo, item, callback) {
    process.nextTick(function() {
        callback(null, memo + item)
    });
}, function(err, result) {
    console.log(result);
});