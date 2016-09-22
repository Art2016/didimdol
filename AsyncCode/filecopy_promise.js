/**
 * Created by Tacademy on 2016-08-10.
 */
var fs = require('fs');
var path = require('path');

var srcPath = (process.argv[2] !== undefined) ? path.join(__dirname, process.argv[2]) : __filename;
var destPath = process.argv[3] || (srcPath + '.copy');

function readFile() {
    return new Promise(function(resolve, reject) {
        var reader = fs.createReadStream(srcPath);
        var data = '';
        reader.on('data', function(chunk) {
            data += chunk;
        });
        reader.on('end', function() {
            resolve(data);
        });
        reader.on('error', function() {
            reject('readable stream error...');
        });
    });
}

function writeFile(value) {
    return new Promise(function(resolve, reject) {
        var writer = fs.createWriteStream(destPath);
        writer.on('finish', function() {
            resolve('copy completed!!');
        });
        writer.on('error', function() {
            reject('writer stream error...');
        });
        writer.write(value);
        writer.end(); // finsh event
    });
}

readFile().then(writeFile).then(function(value) {
    console.log(value);
}).catch(function(reason) {
    console.log(reason);
});