import React from 'react';
import './App.css';
// import DropdownMenu from './DropdownMenu';
// import Chat from './Chat';
// import { useEffect } from 'react';
// import Test from './Test';
import Box from './Box';
import ChatContainer from './ChatContainer';
import VideoContainer from './VideoContainer';
import useSocket from './useSocket';
import TestVid from './TestVid';
import AnotherTestVid from './AnotherTestVid';
import VideoStreamContainer from './VideoStreamContainer';
import testVid from './TestVid';
import VideoConnections from './VideoConnections';

const App = () => {
  console.log('app render');
  const socket = useSocket();
  return (
    <div>
      {/* <Box /> */}
      {/* <TestVid /> */}
      {/* <AnotherTestVid /> */}
      <ChatContainer socket={socket} />
      {/* <VideoContainer socket={socket} /> */}
      {/* <VideoStreamContainer socket={socket}/>  */}
      <VideoConnections socket={socket}/>
      {/* drop down menu here heeeep */}
      {/* <DropdownMenu options={[1, 2, 3]} /> */}
      {/* <Test /> */}
      {/* <input onChange={() => console.log('-----')}></input> */}
      {/* <Chat/> */}
      {/* <TestVid /> */}
    </div>
  );
};

export default App;

// proxy: {
//       '/': 'http://localhost:3000',
//     },
