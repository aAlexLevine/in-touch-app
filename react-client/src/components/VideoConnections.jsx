import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'shards-react';
import useUserMedia from './useUserMedia';
import Video from './Video';
import Peer from 'simple-peer';

const VideoConnections = ({ socket }) => {
  const mediaStream = useUserMedia({ video: true, audio: true });
  const [mySocketID, setMySocketID] = useState(null);
  const peers = useRef([]);
  const [streams, setStreams] = useState([]);

  const createPeerConnection = (isInitiator, to, from, connection = null) => {
    const peer = new Peer({
      initiator: isInitiator,
      trickle: false,
      stream: mediaStream,
    });

    if (!isInitiator) {
      peer.signal(connection);
    }

    peer.on('signal', (connection) => {
      socket.emit('createPeerConnection', {
        isInitiator,
        to,
        from,
        connection,
      });
    });

    peer.on('stream', (stream) => {
      console.log('ON STREAM ');
      const remoteStream = {
        remoteID: to,
        remoteStream: stream,
      };
      setStreams((prevState) => [...prevState, remoteStream]);
    });

    peer.on('error', (err) => {
      console.log(err);
    });

    peer.on('close', () => {
      console.log('peer connection closed');
    });

    return { id: to, peer };
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setMySocketID(socket.id);
    });

    const removePeer = (remotePeerID) => {
      setStreams((prevState) =>
        prevState.filter((stream) => {
          if (stream.remoteID === remotePeerID) {
            stream.remoteStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          return stream.remoteID !== remotePeerID;
        })
      );
      const remotePeer = peers.current.find((peer) => peer.id === remotePeerID);
      remotePeer.peer.destroy();
    };

    socket.on('removeRemotePeer', removePeer);
  }, [socket]);

  useEffect(() => {
    if (!mySocketID || !mediaStream) return;

    const user = { id: mySocketID };

    socket.emit('joined', user);

    socket.on('receiveJoinedUser', ({ id }) => {
      const newPeer = createPeerConnection(true, id, mySocketID, null);
      peers.current.push(newPeer);
    });

    socket.on('receiveCall', ({ isInitiator, to, from, connection }) => {
      if (isInitiator) {
        const remotePeer = createPeerConnection(false, from, to, connection);
        peers.current.push(remotePeer);
      } else {
        const initiatorPeer = peers.current.find((peer) => peer.id === from);
        initiatorPeer.peer.signal(connection);
      }
    });
  }, [mySocketID, mediaStream]);

  return (
    <Container>
      <Row className="videoRow">
        <Col xs="auto">
          <div className="videoCol">
            <Video stream={mediaStream} />
          </div>
        </Col>
        {streams.map((stream, index) => (
          <Col xs="auto" key={index}>
            <div className="videoCol">
              <Video stream={stream.remoteStream} />
            </div>
          </Col>
        ))}
      </Row>
      {/* <div>
        <Video stream={mediaStream} />
        {streams.map((stream, index) => (
          <Video stream={stream.remoteStream} key={index} />
        ))}
      </div> */}
    </Container>
  );
};

export default VideoConnections;
