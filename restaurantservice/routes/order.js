var express = require('express');
var router = express.Router();
var Order = require('../models/order');

// : -> 동적 라우팅 파라미터

// 주문 목록 조회
router.get('/', function(req, res, next) {
    var message = '';
    var data = {};
    var results = [];

    if(req.url.match(/\/\?pageNo=\d+&rowCount=\d+/i)) { // 주문 목록 조회 req.url = /?pageNo=1&rowCount=10
        message = 'search all';
        var pageNo = parseInt(req.query.pageNo);
        var rowCount = parseInt(req.query.rowCount);
        
        Order.listOrders(pageNo, rowCount, function(err, orders) {
            if(err) return next(err);
            data.results = orders;
            res.send({
                message: message,
                data: data
            });
        });
    } else {
        var startdate = req.query.startdate;
        var enddate = req.query.enddate;
        var menus = req.query.menus;
        
        // 일자별 주문 검색
        if (startdate) {
            message = 'search date';
            if (startdate === enddate || !enddate) {
                results.push({
                    
                });
            } else {
                results.push({});
            }
            data.startdate = startdate;
            data.enddate = enddate;
            data.results = results;
        }
        // 메뉴별 주문 검색
        if (menus) {
            message = 'search menus';
            data.menus = menus;
            results.push({});
            data.results = results;
        }
    }
    
    res.send({
        message: message,
        data: data
    });
});
// 주문 생성
router.post('/', function(req, res, next) {
    var newOrder = {};
    newOrder.branch_id = req.body.branch_id;
    newOrder.customer_id = req.body.customer_id;
    newOrder.details = [];

    for(var i = 0; i < req.body.branch_menu_id.length; i++) {
        newOrder.details.push({
            branch_menu_id: req.body.branch_menu_id[i],
            quantity: req.body.quantity[i],
            menu_price: 0
        })
    }

    // model 객체를 이용한 주문 생성
    Order.placeOrder(newOrder, function(err, result) {
        if(err) return next(err);
        res.send({
            message: '주문 생성',
            result: {
                order: {
                    id: result.insertId,
                    customer: result.customer_id,
                    branch: result.branch_id,
                    order_dtime: result.order_dtime
                },
                details: result.details
            }
        });
    });

});
// 주문 조회
router.get('/:oid', function(req, res, next) {
    res.send({
        message: '주문 조회',
        id: req.params.oid
    });
});
//주문 변경
router.put('/:oid', function(req, res, next) {
    var data = req.body;

    var dArray = [];
    for(var i = 0; i < data.branch_menu_id.length; i++) {
        dArray.push({
            branch_menu_id: data.branch_menu_id[i],
            quantity: data.quantity[i]
        })
    }

    res.send({
        message: '주문 변경',
        id: req.params.oid,
        details: dArray
    });
});

module.exports = router;
