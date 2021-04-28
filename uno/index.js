var app = require('express')();
var http = require('https').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 50000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Socket conectado.');

  socket.on('greet', function(data) {
    console.log(data);
    socket.emit('respond', { hello: 'Hey, Mr.Client!' });
  });
  
  socket.on('manual', function(msg){
    io.emit('manual', msg);
  });

  socket.on('card', function(msg){
    io.emit('card', msg);
  });

  socket.on('disconnect', function(){
    console.log('Socket desconectado.');
  });
});

// io.on('connection', function(socket){
//   socket.on('card', function(msg){
//     io.emit('card', msg);
//   });
// });

http.listen(port, function(){
  console.log('listening on *:' + port);
});