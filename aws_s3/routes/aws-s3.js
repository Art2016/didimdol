var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var path = require('path');
var fs = require('fs');

router.post('/', function(req, res, next) {
  var s3 = new AWS.S3({
    'accessKeyId': 'AKIAJWL2D6NAHYB6PE6Q',
    'secretAccessKey': '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',
    'region': 'ap-northeast-2',
    'params': {
      'Bucket': 'art2058',
      'Key': 'uploads/subak2.jpg',
      'ACL': 'public-read',
      'ContentType': 'image/jpeg' // mine
    }
  });

  var filePath = path.join(__dirname, '../uploads/subak2.jpg');
  var stream = fs.createReadStream(filePath);
  s3.upload({ 'Body': stream })
    .on('httpUploadProgress', function(evt) {
      console.log(evt);
    })
    .send(function(err, data) {
      fs.unlink(filePath, function() {
        console.log("파일 삭제 완료: " + filePath);
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log(data);
        res.json(data.location);
      });
    });
});

module.exports = router;
