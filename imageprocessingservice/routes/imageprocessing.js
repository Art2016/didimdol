var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var gm = require('gm');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('image procs...');
});

router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  var formFields = {};
  // tag[0] = '의자', tag[1] = '러그'
  // tag[] = '의자', tag[] = '러그'
  // tag = '의자', tag = '러그'
  form.on('field', function(name, value) {
    function makeFormFields(prop, val) {
      if (!formFields[prop]) {
        formFields[prop] = val;
      } else {
        if (formFields[prop] instanceof Array) { // 배열일 경우
          formFields[prop].push(val);
        } else { // 배열이 아닐 경우
          var tmp = formFields[prop];
          formFields[prop] = [];
          formFields[prop].push(tmp);
          formFields[prop].push(val);
        }
      }
    }
    var re1 = /\[\]/;
    var re2 = /\[\d+\]/;
    if (name.match(re1)) {
      name = name.replace(re1, '');
    } else if (name.match(/\[\d+\]/)) {
      name = name.replace(re2, '');
    }
    makeFormFields(name, value);
  });
  form.uploadDir = path.join(__dirname, '../uploads/images');
  form.keepExtensions = true;
  form.multiples = false;
  form.parse(req, function (err, fields, files) {
    if(err) return next(err);
    var width = formFields['width'];
    var height = formFields['height'];
    var msg = formFields['msg'];
    var srcImagePath = files['picts'].path;
    var destThumnailPath = path.join(path.dirname(srcImagePath), path.basename(srcImagePath, path.extname(srcImagePath))) +
      '-thumb' + path.extname(srcImagePath);

    gm(srcImagePath).resize(width, height).noProfile().write(destThumnailPath, function (err) {
      if (err) {
        return next(err);
      }
      res.send({
        message: 'thumbnail image created!!!',
        original_url: 'http://localhost:3000/images/' + path.basename(srcImagePath),
        thumb_url: 'http://localhost:3000/images/' + path.basename(destThumnailPath),
        msg: msg
      });
    });
  });
});

module.exports = router;
