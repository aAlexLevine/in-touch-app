import React, { useState, useEffect, useRef } from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatComposeMessage from './ChatComposeMessage';

const ChatContainer = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const newestMessageRef = useRef();

  const updateMessages = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    newestMessageRef.current.scrollIntoView(false);
  };

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
  };
  console.log('chat container render');
  useEffect(() => {
    if (!socket) return;

    socket.on('receiveMessage', (msg) => {
      updateMessages(msg);
    });
  }, [socket]);

  return (
    <div className="outline">
      <ChatMessagesList
        messages={messages}
        newestMessageRef={newestMessageRef}
      />
      <ChatComposeMessage sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
