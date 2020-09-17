import React from 'react';
import './App.css';
import { Container, Row, Col } from 'shards-react';
import ChatContainer from './ChatContainer';
import useSocket from './useSocket';
import VideoConnections from './VideoConnections';
import NavigationBar from './NavigationBar';

const App = () => {
  console.log('app render');
  const socket = useSocket();
  return (
    <div className="app-container">
      <div>
        <NavigationBar />
        <Container>
          <Row>
            <Col>
              {/* <VideoConnections socket={socket} /> */}
              <div className="outline">Videos go here.</div>
            </Col>
            <Col>
              <ChatContainer socket={socket} />
            </Col>
          </Row>
          <Row>
            <Col>
            <div className="outline">test</div>
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
