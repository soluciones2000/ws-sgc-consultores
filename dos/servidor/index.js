var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var io = require('socket.io')(server, { origins: '*:*'});
// io.set('origins', 'https://ws.sgc-consultores.com.ve:8080');

var messages = [{
   id: 1,
   text: "Hola soy un mensaje",
   author: "Carlos Azaustre"
}];

// app.use(cors());
// app.use(function(request, response, next) {
//    response.header("Access-Control-Allow-Origin", "*");
//    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });
app.use(express.static('cliente'));

app.get('/hello', function(req, res) {
   res.header('Access-Control-Allow-Origin: *');
   res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
   res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
   console.log('Alguien se ha conectado con Sockets');
   socket.emit('messages', messages);

   socket.on('new-message', function(data) {
      messages.push(data);

      io.sockets.emit('messages', messages);
   });
});

server.listen(8080, function() {
   console.log("Servidor corriendo en ws.sgc-consultores.com.ve:8080");
});