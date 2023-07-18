var http = require('http');

http.createServer(function(req, res){
  res.end("Olá");
}).listen(3001);

console.log("O servidor está rodando")
