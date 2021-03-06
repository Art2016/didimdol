var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');
var formidable = require('formidable');

router.get('/:uid', function(req, res, next) {
  var uid = '';
  if (req.params.uid === 'me') uid = 'test';
  else uid = req.params.uid;

  User.findUser(uid, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
});

router.put('/me', function(req, res, next) {
  var uid = 'test';

  if (action === 'fs' || action === 's' || action === 'f') {
    var nt = {};
    nt.uid = uid;
    nt.action = action;
    nt.state = req.body.nt_state;

    User.updateNotification(nt, function(err, result) {
      if (err) return next(err);
      res.send(result);
    });
  } else if (action === 'no') {
    var form = new formidable.IncomingForm();
    //form.uploadDir = path.join(__dirname, '../uploads/images/' + uid);
    form.keepExtensions = true;
    form.multiples = false;
    form.parse(req, function (err, fields, files) {
      if (err) return next(err);
      var user = {};
      user.id = uid;
      user.name = fields.name;
      user.pf = files.pf;
      user.aboutme = fields.aboutme;

      User.updateUser(user, function (err, result) {
        if (err) return next(err);
        res.send(result);
      });
    });
  } else {
    next();
  }
});

router.get('/:uid/categories', function(req, res, next) {
  var uid = '';
  if (req.params.uid === 'me') uid = 'test';
  else uid = req.params.uid;

  var data = {};
  data.uid = uid;
  data.usage = req.query.usage;
  data.page = req.query.page;
  data.count = req.query.count;
  User.listCategory(data, function(err, results) {
    if (err) return next(err);
    res.send(results);
  });
});

router.post('/me/categories', function(req, res, next) {
  var uid = 'test';

  var form = new formidable.IncomingForm();
  //form.uploadDir = path.join(__dirname, '../uploads/images/' + uid);
  form.keepExtensions = true;
  form.multiples = false;
  form.parse(req, function(err, fields, files) {
    if(err) return next(err);
    var category = {};
    category.uid = uid;
    category.name = fields.name;
    category.img = files.img;
    category.aboutme = fields.locked;

    User.createCategory(category, function(err, result) {
      if (err) return next(err);
      res.send(result);
    });
  });
});

router.put('/me/categories/:cid', function(req, res, next) {
  var cid = req.params.cid;

  var form = new formidable.IncomingForm();
  //form.uploadDir = path.join(__dirname, '../uploads/images/' + uid);
  form.keepExtensions = true;
  form.multiples = false;
  form.parse(req, function(err, fields, files) {
    if(err) return next(err);
    var category = {};
    category.cid = cid;
    category.name = fields.name;
    category.pf = files.img;
    category.aboutme = fields.locked;

    User.updateCategory(category, function(err, result) {
      if (err) return next(err);
      res.send(result);
    });
  });
});

router.delete('/me/categories/:cid', function(req, res, next) {
  var cid = req.params.cid;

  User.removeCategory(cid, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
});

module.exports = router;
