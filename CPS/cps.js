/**
 * Created by Tacademy on 2016-08-04.
 */
function a(x, y, callback) {
    callback(x + y, x - y);
}

a(3, 2, function(arg1, arg2){
    setTimeout(function () {
        console.log(arg1);
        console.log(arg2);
    }, 1000);
});

process.nextTick(function () {
    console.log('start...');
});
