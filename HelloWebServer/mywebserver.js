/**
 * Created by Tacademy on 2016-08-04.
 */
var http = require('http');

var port = parseInt(process.argv[2] || 8888);
http.createServer(function(req, res){
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('hello Node.js Web Server!!!');
}).listen(port, function(){
    console.log('server listening.... at ' + port);
});
