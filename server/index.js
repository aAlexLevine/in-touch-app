const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  pingTimeout: 60000,
});
// const server = app.listen(9000, () => {
//   console.log('peerjs listening on 9000');
// })

// const { ExpressPeerServer } = require('peer');
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
// });

const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
// app.use(cors());


// app.use('/peerjs', peerServer);
app.post('/contact', (req, res) => {
  console.log('------', req.body);
  res.send(req.body.msg);
});


io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joined', (user) => {
    console.log('user joined')
    socket.broadcast.emit('receiveJoinedUser', user)
  })

  socket.on('createPeerConnection', (call) => {
    io.to(call.to).emit('receiveCall', call);
    console.log('creating first half of peer connection--', 'to:', call.to, 'from', call.from);
  });
  


  ///////////////////////

  socket.on('test', (msg) => {
    console.log('test', msg)
    socket.emit('testserver', msg)
  })

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg)
    console.log(socket.adapter.rooms)
  })

  // socket.on('relayPeerSignal', (data) => {
  //   socket.broadcast.emit('receivePeer', data)
  //   console.log('relayed signal', data)
  // })

  // socket.on('sendBackPeer', (remotePeer) => {
  //   socket.broadcast.emit('getRemotePeer', remotePeer);
  //   console.log('relayed signal', remotePeer);
  // });



  // socket.on('addStream', (stream) => {
  //   socket.broadcast.emit('receiveStream', stream)
  //   console.log('received stream trigger')
  // })

  socket.on('disconnect', () => {
    io.emit('removeRemotePeer', socket.id)
    console.log('user disconnected', socket.id);
  });

  // socket.on('disconnectClient', (id) => {
  //   console.log('---disconnected', id)
  // })
});

let port = process.env.PORT || 3000;

http.listen(port, function () {
  console.log(`listening on port ${port}*!`);
});
