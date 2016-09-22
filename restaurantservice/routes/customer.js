var express = require('express');
var router = express.Router();

// TODO: 회원 목록
router.get('/', function(req, res, next) {
  // 페이지 카운트 쿼리스트링
  // customer 모델 연결
  
  res.send({ message: 'customer' });
});
// TODO: 회원 조회

// TODO: 회원 생성

// TODO: 회원 변경


module.exports = router;
