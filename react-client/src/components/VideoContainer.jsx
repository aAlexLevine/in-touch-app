  import React, { useState, useEffect, useRef } from 'react';
  import useUserMedia from './useUserMedia';
  import Peer from 'peerjs';

  const VideoContainer = ({ socket }) => {
    const [peerID, setPeerID] = useState();
    const mediaStream = useUserMedia({ video: true, audio: true });
    const { current: peer } = useRef(
      new Peer({
  config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' },
  ]} /* Sample servers, please use appropriate ones */
})

    );
    const [remoteStreamState, setRemoteStreamState] = useState()
        // new Peer(undefined, { host: 'localhost', port: 9000, path: '/peerjs' });
    const videoEl = useRef();
    const videoEl2 = useRef();
    console.log('videoEl----------------', videoEl)
    console.log('new Peer:::',peer)

    useEffect(() => {
      videoEl.current.srcObject = mediaStream
          peer.on('call', (call) => {
            console.log('call heard------');
            console.log('call obj before answer', call)
            call.answer(mediaStream); // Answer the call with an A/V stream.
            console.log('call obj after answer', call);
            call.on('stream', (remoteStream) => {
              console.log('from answer, on stream:', remoteStream);
              videoEl2.current.srcObject = remoteStream;
            });
          });
    }, [mediaStream])
    //when you join, you send you id up to the server
    //the server relays your id to everyone
    //everyone calls you
    //you answer

    useEffect(() => {
      //setUpListeners
      console.log('set up initial listeners')
      peer.on('open', (id) => {
        console.log('peer opened:', id);
        socket.emit('relayPeerID', id);
      });

      peer.on('error', (err) => console.log(err));

      socket.on('receivePeer', (id) => {
        console.log('received this peer ID:', id, 'should not be you')
        setPeerID(id);
      });
    }, []);

    // useEffect(() => {
    //   console.log('set up listener for receiving call ')
    //   //set up listener for peer call, needs the media stream from state,
    //   if (!mediaStream) {
    //     console.log('DID NOTset up listener for receiving call');
    //     return
    //   };  
    //   peer.on('call', (call) => {
    //     console.log('call heard------');
    //     call.answer(mediaStream); // Answer the call with an A/V stream.
    //     call.on('stream', (remoteStream) => {
    //       console.log('from answer, on stream:', remoteStream);
    //       videoEl2.current.srcObject = remoteStream;
    //     });
    //   });
    //   console.log('---check peer object to see if call listener attached', peer)
    // }, [mediaStream])

    useEffect(() => {
      //when another peer connects, make the call to them
      console.log('peerID/mediaStream triggered, useEffect', {peerID, mediaStream})
      if (!peerID || !mediaStream) {
        console.log('peerID/mediaStream useEffect didnt run');
        return
      }
      console.log('peerID/mediaStream useEffect DID RUN');
      // peer.on('call', (call) => {
      //   console.log('call heard------')
      //   call.answer(mediaStream); // Answer the call with an A/V stream.
      //   call.on('stream', (remoteStream) => {
      //     console.log('from answer, on stream:', remoteStream);
      //     videoEl2.current.srcObject = remoteStream;
      //     // Show stream in some <video> element.
      //     //take the stream from the person calling you and render it to a video element
      //   });
      // });

      const call = peer.call(peerID, mediaStream);
      call.on('error', (err) =>console.log(err))
      console.log('1st call', call, {peerID, mediaStream});
      call.on('stream', (remoteStream) => {
        console.log('from call, on stream:', remoteStream);
        // Show stream in some <video> element.
       videoEl2.current.srcObject = remoteStream;
        // setRemoteStreamState(remoteStream)
      });
    }, [peerID, mediaStream]);

    useEffect(() => {
      console.log('remoteStreamState updated ')
    }, [remoteStreamState])

    // useEffect(() => {
    //   console.log('video in useeffect--', videoEl);
    //   if (!mediaStream) return;
    //   // videoEl2.current.srcObject = mediaStream;
    //   //set up peer
    //   //get media
    //   // setMediaStream(getVideo())
    //   // console.log('useeffect in video');
    //   socket.on('receivePeer', (peerID) => {
    //     //on server send to everyone except sender
    //     //make peer connect/call with id
    //     console.log('received peer:', peerID);

    //     /* use the stream */
    //     const call = peer.call(peerID, mediaStream);
    //     console.log('1st call', call);
    //     call.on('stream', (remoteStream) => {
    //       console.log('from call, on stream:', remoteStream);
    //       // Show stream in some <video> element.
    //       videoEl2.current.srcObject = remoteStream;
    //     });
    //   });

    //   peer.on('open', (id) => {
    //     console.log('peer opened:', id);
    //     socket.emit('relayPeerID', id);
    //   });

    //   peer.on('error', (err) => console.log(err));

    //   peer.on('call', (call) => {
    //     call.answer(mediaStream); // Answer the call with an A/V stream.
    //     call.on('stream', (remoteStream) => {
    //       console.log('from answer, on stream:', remoteStream);
    //       videoEl.current.srcObject = remoteStream;
    //       // Show stream in some <video> element.
    //       //take the stream from the person calling you and render it to a video element
    //     });
    //   });
    // }, [mediaStream]);

    // useEffect(()=>{videoEl2.current.srcObject = mediaStream;}, [mediaStream])

    return (
      <div style={{ border: '2px solid blue' }}>
        Videos go here.
        <div style={{ border: '2px solid yellow' }}>
          <video
            muted
            ref={videoEl}
            onCanPlay={(e) => {
              e.target.play();
            }}
            autoPlay
            playsInline
            style={{ objectFit: 'contain', height: '100px', width: '100px' }}
          ></video>
          <div>this should be you</div>
          <div>your socket id is {socket.id}</div>
          <pre>calling peer....{JSON.stringify(peerID, null, 2)}</pre>
        </div>
        <div style={{ border: '2px solid purple' }}>
          <video
            muted
            ref={videoEl2}
            onCanPlay={(e) => {
              e.target.play();
            }}
            autoPlay
            playsInline
            style={{ objectFit: 'contain', height: '100px', width: '100px' }}
          ></video>
          <div>this should be the person who joined</div>
          <pre> this peer you called{JSON.stringify(peerID, null, 2)}</pre>
        </div>
      </div>
    );
  };

  export default VideoContainer;
