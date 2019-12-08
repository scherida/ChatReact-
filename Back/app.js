var app = require('express')();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/', function (req, res) {
  res.send('<h1>Olámundo</h1>');
});

io.on('connection', function (socket) {
  console.log('umusuárioconectado');

  socket.on('sendMessage', function (msg) {
    console.log('mensagem:' + msg);
    io.emit('newMessage', msg);
  });

});

http.listen(3100, function () {
  console.log('ouvindo*:3100');
});