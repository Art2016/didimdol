var express = require('express');
var router = express.Router();

/* GET debugging listing. */
router.get('/', function(req, res, next) {
  var pageNo = parseInt(req.query.pageNo || '1');
  var rowCount = parseInt(req.query.rowCount || '5');
  var searchKeyword = (req.query.searchKeyword || '').trim();

  if(!searchKeyword) {
    return next(new Error('keyword require for search!!!'));
  }
  res.send('respond with a result for search keyword');
});

module.exports = router;
