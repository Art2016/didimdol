/**
 * Created by Tacademy on 2016-08-04.
 */
function sum(var_args){
    var result = 0;
    for(var i = arguments[0]; i < arguments[1].length; i++) {
        result += parseInt(arguments[1][i]);
    }
    return result;
}

process.on('exit', function(){ console.log('end...'); });

console.log(sum(2, process.argv));

