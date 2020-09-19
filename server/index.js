const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http, {
  pingTimeout: 60000,
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  console.log('------', req.body);
  res.send(req.body.msg);
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joined', (user) => {
    console.log('user joined');
    socket.broadcast.emit('receiveJoinedUser', user);
    io.emit('receiveMessage', `${user.id} has joined.`)
  });

  socket.on('createPeerConnection', (call) => {
    io.to(call.to).emit('receiveCall', call);
    console.log(
      'creating first half of peer connection--', 'to:', call.to,
      'from', call.from
    );
  });

  socket.on('test', (msg) => {
    console.log('test', msg);
    socket.emit('testserver', msg);
  });

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg);
    console.log(socket.adapter.rooms);
  });

  // socket.on('addStream', (stream) => {
  //   socket.broadcast.emit('receiveStream', stream)
  //   console.log('received stream trigger')
  // })

  //broadcast to all but disconnecter
  socket.on('disconnect', () => {
    io.emit('removeRemotePeer', socket.id);
    io.emit('receiveMessage', `${socket.id} has left.`);
    console.log('user disconnected', socket.id);
  });
});

let port = process.env.PORT || 3000;

http.listen(port, function () {
  console.log(`listening on port ${port}*!`);
});
