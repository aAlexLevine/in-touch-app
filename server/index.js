const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http, {
  pingTimeout: 60000,
});
const path = require('path');

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  console.log('------', req.body);
  res.send(req.body.msg);
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joinRoom', (user) => {
    const room = `_room_${user.room}`;
    socket.join(room);
    socket.broadcast.emit('allRooms', io.sockets.adapter.rooms);
    console.log(`'joinRoom' - user: ${user.id} joined room: ${room}`);
    //emit to all except the newly joined to initiate peer connection
    socket.to(room).emit('receiveJoinedUser', user);
    //emit to all user has joined their room
    io.in(room).emit('receiveMessage', `${user.id} has joined.`);
  });

  socket.on('getAllRooms', () => {
    console.log('getAllRooms');
    socket.emit('allRooms', io.sockets.adapter.rooms);
  });

  socket.on('createPeerConnection', (call) => {
    io.to(call.to).emit('receiveCall', call);
    console.log(`creating half of peer connection-- to: ${call.to} 'from: ${call.from}`)
  });

  socket.on('sendMessage', (msg) => {
    // ** TODO: direct messages to the specified room
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    // ** TODO: direct messages to the specified room
    io.emit('removeRemotePeer', socket.id);
    io.emit('receiveMessage', `${socket.id} has left.`);
    console.log('user disconnected', socket.id);
  });
});

// app.all('/*', function(req, res) {
//   res.redirect('/');
// });

let port = process.env.PORT || 3000;

http.listen(port, function () {
  console.log(`listening on port ${port}*!`);
});
