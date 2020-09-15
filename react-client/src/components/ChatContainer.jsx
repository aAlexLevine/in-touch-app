import React, { useState, useEffect } from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatComposeMessage from './ChatComposeMessage';
// import io from 'socket.io-client';

const ChatContainer = ({socket}) => {
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState(false);

  const updateMessages = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
  };
console.log('chat container render')
  useEffect(() => {
    if(!socket) return
    // const ioSocket = io();
    // ioSocket.on('connect', function () {
    //   console.log('client connected')
    // });

    socket.on('receiveMessage', (msg) => {
      updateMessages(msg);
    });
    // setSocket(ioSocket);
    // return () => {
    //   ioSocket.close();
    //   setSocket(false);
    // };
  }, [socket]);

  return (
    <div>
      <ChatMessagesList messages={messages} />
      <ChatComposeMessage sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
