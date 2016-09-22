var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get(function(req, res, next) {
    var jsonObj = {};
    jsonObj.method = req.method;
    jsonObj.url = req.originalUrl;
    jsonObj.mp = req.baseUrl;
    jsonObj.path = req.path;
    jsonObj.qs = req.query;
    jsonObj.body = req.body;
    res.send(jsonObj);
  })
  .post(function(req, res, next) {
    var jsonObj = {};
    jsonObj.method = req.method;
    jsonObj.url = req.originalUrl;
    jsonObj.mp = req.baseUrl;
    jsonObj.path = req.path;
    jsonObj.body = req.body;
    res.send(jsonObj);
  });

module.exports = router;
