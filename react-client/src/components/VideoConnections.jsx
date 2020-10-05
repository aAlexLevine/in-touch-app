import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'shards-react';
import Peer from 'simple-peer';
import useUserMedia from './useUserMedia';
import Video from './Video';

const VideoConnections = ({ socket }) => {
  const mediaStream = useUserMedia({ video: true, audio: true });
  const peers = useRef([]);
  const [streams, setStreams] = useState([]);
  const { roomName } = useParams();
  const { userName } = useLocation();

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

  const removePeer = (remotePeerID) => {
    setStreams((prevState) =>
      prevState.filter((stream) => {
        if (stream.remoteID === remotePeerID) {
          console.log('remote tracks cleanup');
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

  useEffect(() => {
    if (!socket || !mediaStream) return;

    const mySocketID = socket.id;
    const user = { id: mySocketID, room: roomName, userName };

    socket.emit('joinRoom', user);

    socket.on('receiveJoinedUser', ({ id }) => {
      console.log('receiveJoinedUser', id);
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

    socket.on('removeRemotePeer', removePeer);

    return () => {
      console.log('VideoConnections Cleanup');
      socket.emit('leaveRoom', roomName);
      socket.off('receiveJoinedUser');
      socket.off('receiveCall');
      socket.off('removeRemotePeer');
    };
  }, [socket, mediaStream]);

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
    </Container>
  );
};

export default VideoConnections;
