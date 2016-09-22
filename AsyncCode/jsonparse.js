/**
 * Created by Tacademy on 2016-08-10.
 */
var fs = require('fs');
var path = require('path');

var srcPath = (process.argv[2] !== undefined) ? path.join(__dirname, process.argv[2]) : 'contact.json';

function readFile() {
    return new Promise(function(resolve, reject) {
        var reader = fs.createReadStream(srcPath);
        var data = '';
        reader.on('data', function(chunk) {
            data += chunk;
        });
        reader.on('end', function() {
            resolve(JSON.parse(data));
        });
        reader.on('error', function() {
            reject('readable stream error...');
        });
    });
}

function showName(value) {
    console.log(value.name);
    return value;
}

function showAge(value) {
    console.log(value.age);
    return value;
}

readFile().then(showName).then(showAge).then(function() {
    console.log('success');
}).catch(function(reason) {
    console.log(reason);
});