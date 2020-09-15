import React, { useEffect, useRef, useState } from 'react';
import useUserMedia from './useUserMedia';
import Video from './Video';
import Peer from 'simple-peer';

//i think you have to make a direct p2p connection with all users, cant let signal happen on connect

const VideoStreamContainer = ({ socket }) => {
  const mediaStream = useUserMedia({ video: true, audio: true });
  const [peerStreams, setPeerStreams] = useState([]);
  // const { current: peer } = useRef(new Peer({ initiator: true }))
  
  useEffect(() => {
   
   return () => {
     
   }
  }, []);

  useEffect(() => {
    console.log('useEffect check for media');
    // console.log('**', JSON.stringify(peer), peer)
    if (!mediaStream) return;
    console.log('useEffect with media')
    const peer = new Peer({ initiator: true });
    let mySignal

    peer.on('signal', (data) => {
      socket.emit('relayPeerSignal', {data, peer});
      console.log('client on signal', data)
      mySignal = data
    });

    peer.on('stream', (stream) => {
      console.log('ON STREAM ')
      setPeerStreams((prevState) => [...prevState, stream]);
    });

    peer.on('connect', () => {
      console.log('connect fired')
      peer.send('this is a message fired from connect')
    })

    peer.on('data', (data) => {
      console.log('this is some data data received on client', data)
    })

    peer.on('error', (err) => {
      console.log(err);
    });
    peer.on('close', () => {
      console.log('peer connection closed');
      
    });

    socket.on('receivePeer', (data) => {
      peer.signal(data.data);
      console.log(data)
      socket.emit('sendBackPeer', peer)
      
      // peer.addStream(mediaStream)//sendd later?
    });

    socket.on('getRemotePeer', (remotePeer) => {
        remotePeer.signal(mySignal);
    })

    socket.on('receiveStream', (stream) => {
      // peer.addStream(stream)
      console.log('***---***')
      peer.send('********------*****----****---****')
    })
  }, [mediaStream]);

  const add = () => {
    socket.emit('addStream', mediaStream)
  }
  return (
    <div style={{ border: '2px solid blue' }}>
      <Video stream={mediaStream} />
      {peerStreams.map((stream, index) => (
        <Video stream={stream} key={index} />
      ))}
      Videos go here.
      <button onClick={add}>add stream</button>
      {/* <div style={{ border: '2px solid yellow' }}>
          <video
            muted
            ref={myVideo}
            onCanPlay={(e) => {
              e.target.play();
            }}
            autoPlay
            playsInline
            style={{ objectFit: 'contain', height: '100px', width: '100px' }}
          ></video>
          <div>this should be you</div>
          <div>your socket id is {socket.id}</div>
          
        </div> */}
      {/* <div style={{ border: '2px solid purple' }}>
          <video
            muted
            ref={remoteVideo}
            onCanPlay={(e) => {
              e.target.play();
            }}
            autoPlay
            playsInline
            style={{ objectFit: 'contain', height: '100px', width: '100px' }}
          ></video>
          <div>this should be the person who joined</div>
          
        </div> */}
    </div>
  );
};

//  socket.on('receivePeer', (id) => {
//    console.log('received this peer ID:', id, 'should not be you');
//    setPeerID(id);
//  });
//you join a room already in progress
// when socket connects, send signal data to server

//server sends it down to everyone but you, if ur the only person, nothing happens
//when server relay received, set listener for remote peer data

export default VideoStreamContainer;
