import React from 'react';
import './App.css';
import { Container, Row, Col } from 'shards-react';
import ChatContainer from './ChatContainer';
import useSocket from './useSocket';
import VideoConnections from './VideoConnections';
import NavigationBar from './NavigationBar';
import ParticipantsList from './ParticipantsList';

const App = () => {
  console.log('app render');
  const socket = useSocket();
  return (
    <div className="app-container">
      <div>
        <NavigationBar />

        <Container fluid>
          <Row className="first-row">
            <Col lg="8">
              <div className="outline video-container">
                <VideoConnections socket={socket} />
              </div>
            </Col>
            <Col lg="4">
              <div className="rightPanel">
                <ChatContainer socket={socket} />
                <ParticipantsList />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;

// proxy: {
//       '/': 'http://localhost:3000',
//     },
