/**
 * Created by Tacademy on 2016-08-05.
 */
function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function sum(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++){
        result += arr[i];
    }
    return result;
}

module.exports.add = add;
module.exports.subtract = subtract;
module.exports.multiply = multiply;
module.exports.divide = divide;
module.exports.sum = sum;