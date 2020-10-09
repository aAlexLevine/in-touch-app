import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Container, Row, Col } from 'shards-react';
import ChatContainer from './ChatContainer';
import useSocket from './useSocket';
import VideoConnections from './VideoConnections';
import NavigationBar from './NavigationBar';
import ParticipantsList from './ParticipantsList';
import Home from './Home';

const App = () => {
  console.log('app render');
  const [socket, isConnected] = useSocket();

  return (
    <div className="app-container">
      <Router>
        <NavigationBar />
        <Switch>
          <>
            <Container fluid>
              <Route
                exact
                path="/"
                render={() => (
                  <Row className="first-row homeRow">
                    <Col xs="auto">
                      <Home socket={socket} isConnected={isConnected} />
                    </Col>
                  </Row>
                )}
              />
              <Route
                path="/room/:roomName"
                render={() => (
                  <Row className="first-row">
                    <Col lg="8">
                      <div className="outline video-container">
                        <VideoConnections socket={socket} />
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="rightPanel">
                        <ChatContainer socket={socket} />
                        <ParticipantsList socket={socket} />
                      </div>
                    </Col>
                  </Row>
                )}
              />
            </Container>
          </>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
