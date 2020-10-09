const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http, {
  pingTimeout: 60000,
});

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  const updateUsersInRoom = (room) => {
    io.in(room).clients((error, clients) => {
      if (error) console.log(error);
      const users = clients.map((client) => {
        const { userName } = io.sockets.sockets[client];
        return { userName, id: client };
      });
      io.in(room).emit('roomParticipants', users);
    });
  };

  socket.on('joinRoom', (user) => {
    const room = `_room_${user.room}`;
    socket.join(room);
    socket.userName = user.userName;
    io.emit('allRooms', io.sockets.adapter.rooms);
    updateUsersInRoom(room);
    console.log(`'joinRoom' - user: ${user.id} joined room: ${room}`);
    //  emit to all except the newly joined to initiate peer connection
    socket.to(room).emit('receiveJoinedUser', user);
    //  emit to all, user has joined their room
    io.in(room).emit('receiveMessage', {
      author: 'ServerBot',
      text: `${user.userName} has joined.`,
    });
  });

  socket.on('getAllRooms', () => {
    socket.emit('allRooms', io.sockets.adapter.rooms);
  });

  socket.on('createPeerConnection', (call) => {
    io.to(call.to).emit('receiveCall', call);
    console.log(
      `creating half of peer connection-- to: ${call.to} 'from: ${call.from}`
    );
  });

  socket.on('sendMessage', (msg) => {
    const room = `_room_${msg.room}`;
    io.in(room).emit('receiveMessage', msg);
  });

  const leaveRoom = (room) => {
    socket.leave(room);
    socket.to(room).emit('removeRemotePeer', socket.id);
    socket
      .to(room)
      .emit('receiveMessage', {
        author: '--ServerBot--',
        text: `${socket.userName} has left.`,
      });
    updateUsersInRoom(room);
    io.emit('allRooms', io.sockets.adapter.rooms);
    console.log(`user: ${socket.userName} @ ${socket.id} has left: ${room}`);
  };

  socket.on('leaveRoom', (roomName) => {
    const room = `_room_${roomName}`;
    leaveRoom(room);
  });

  socket.on('disconnecting', () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room.slice(0, 6) === '_room_') {
        leaveRoom(room);
      }
    });
    // User should only be in two rooms at a time,
    // their personal room from socketio and one joined room.
    // We can limit one call to leaveRoom if need be.
    // For now incase a user is able to join more than one room this
    // should clean it up.
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    socket.removeAllListeners();
  });
});

// app.all('/*', function(req, res) {
//   res.redirect('/');
// });

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`listening on port ${port}*!`);
});
