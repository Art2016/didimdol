/**
 * Created by Tacademy on 2016-08-04.
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Car() {}

util.inherits(Car, EventEmitter);

Car.prototype.accelerate = function () {
    this.emit('gogo', '1', '2');
};



var myCar = new Car();
myCar.on('gogo', function(arg1, arg2) {
   console.log(arg1, arg2); 
});

myCar.accelerate();