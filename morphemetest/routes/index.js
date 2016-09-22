var express = require('express');
var router = express.Router();
var async = require('async');
var feed = require('feed-read');
var TwitterKoreanText = require('twtkrjs');

var processor = new TwitterKoreanText({
  stemmer: false,      // (optional default: true)
  normalizer: false,   // (optional default: true)
  spamfilter: true     // (optional default: false)
});

var urls = [
  // 'http://www.zdnet.co.kr/Include2/ZDNetKorea_News.xml',
  // 'http://www.fnnews.com/rss/new/fn_realnews_it.xml',
  // 'http://media.daum.net/syndication/digital.rss',
  // 'http://rss.joins.com/joins_it_list.xml',
  // 'http://feeds.feedburner.com/bloter',
  // 'http://rss.etnews.com/Section031.xml',
  // 'http://rss.etnews.com/Section102.xml',
  // 'http://rss.etnews.com/Section901.xml',
  // 'http://www.itworld.co.kr/rss/feed',
  // 'http://feeds.feedburner.com/mobiinside/kr',
  // 'http://www.itcle.com/feed',
  // 'http://www.econovill.com/rss/S1N18.xml',
  // //'http://feeds.feedburner.com/techneedle',
  // 'http://techholic.co.kr/feed',
  // 'http://thegear.co.kr/rss',
  // 'http://it.chosun.com/data/rss/section_373.xml',
  // 'http://verticalplatform.kr/feed',
  // 'http://rss.nocutnews.co.kr/NocutIT.xml',
  // 'http://www.khan.co.kr/rss/rssdata/it_news.xml',
  // 'http://www.chosun.com/site/data/rss/it.xml',
  // 'http://biz.heraldcorp.com/common_prog/rssdisp.php?ct=010502000000.xml'
];

router.get('/', function (req, res, next) {
  async.waterfall([
    createDocument,
    extractWord,
    countWord,
    countWordToDoc
  ], function (err, results) {
    // results.sort(function (a, b) {
    //   return a.cnt < b.cnt ? 1 : (a.cnt > b.cnt ? -1 : 0);
    // });
    res.send(results);
  });

  // 문서 집합 만들기
  function createDocument(next) {
    feed(urls[0], function (err, articles) { // 해당 url을 feed하여 데이터를 가져옴
      console.log(articles);
      var doc = []; // 문서 집합 배열

      for (var i = 0; i < articles.length; i++) {
        doc.push(articles[i].title + '^' + articles[i].content); // 제목과 내용을 합쳐 push
      }
      next(null, doc);
    });
  }

  // 형태소 분석을 통한 명사 추출
  function extractWord(doc, next) {
    var wordArr = [];

    async.forEachOf(doc, function (item, index, callback) {
      processor.tokenize(item, function (err, words) {
        if (err) return callback(err);
        wordArr[index] = [];

        async.each(words, function (item, done) {
          if (item.pos === 'Noun') {
            wordArr[index].push(item.text);
          }
          done(null);
        }, function (err) {
          if (err) return callback(err);
          callback(null);
        });
      });
    }, function (err) {
      if (err) return next(err);
      next(null, wordArr);
    });
  }

  // 카운팅 하기 { text: '단어', tf: 3 }
  function countWord(wordArr, next) {
    var results = [];

    async.forEachOf(wordArr, function (words, index, callback) {
      results[index] = [];

      for (var i = 0; i < words.length; i++) {
        var text = words[i];
        var key = results[index].findIndex(function (v) {
          return v.text === text
        });

        if (key === -1) {
          results[index].push({text: text, tf: 1});
        } else {
          results[index][key].tf++;
        }
      }

      callback(null);
    }, function (err) {
      if (err) return next(err);

      var candidate_words = [];

      for (var i = 0; i < results.length; i++) {
        candidate_words[i] = [];
        for (var j = 0; j < results[i].length; j++) {
          if (results[i][j].tf !== 1) {
            candidate_words[i].push(results[i][j]);
          }
        }
      }

      next(null, candidate_words);
    });
  }

  // 단어가 포함된 문서 수 추가 { text: '단어', tf: 3, df:2 }
  function countWordToDoc(cw, next) {
    async.each(cw, function (doc, cb1) {

      async.each(doc, function (item, cb2) {
        item.df = 0;

        for (var i = 0; i < cw.length; i++) {
          var b = cw[i].findIndex(function (v) {
            return v.text === item.text;
          });

          if (b !== -1) item.df++;
        }

        cb2(null);
      }, function (err) {
        if (err) return cb1(err);
        cb1(null);
      });
    }, function (err) {
      if (err) return next(err);
      next(null, cw);
    });
  }
});
module.exports = router;
