var async = require('async');
var path = require('path');
var fs = require('fs');

var jsonPath = path.join(__dirname, '4300.txt');

var result = '';
var reader = fs.createReadStream(jsonPath);

reader.on('data', function(chunk) {
    result += chunk.toString();
});

reader.on('end', function(){
    var re = /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007FI—‘’]+/g;
    var arrayOfResult = result.trim().replace(re, '^^').split('^^').sort();

    var count = 0;
    var resultObj = {}; // { 'word': 1 }

    async.whilst(
        function() {
            return count < arrayOfResult.length;
        }, // test function, 조건비교
        function(callback) {
            process.nextTick(function () {
                var srcElement = arrayOfResult[count];

                if(resultObj[srcElement] === undefined) {
                    resultObj[srcElement] = 1;
                } else {
                    resultObj[srcElement]++;
                }
                count++;
                callback(null, resultObj);

            });
        },
        function(err, result) {
            console.log(result);
            var writer = fs.createWriteStream('wordcount_result.txt');
            var strResult = JSON.stringify(result);
            writer.write(strResult, function(err) {
                console.log('saved!!');
            });
        }
    );
});