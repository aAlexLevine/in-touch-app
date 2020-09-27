import React, { useState, useEffect, useRef } from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatComposeMessage from './ChatComposeMessage';
import {useLocation, useParams} from 'react-router-dom';

const ChatContainer = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const newestMessageRef = useRef();
  const { roomName } = useParams();
  const { userName } = useLocation();

  const updateMessages = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    newestMessageRef.current.scrollIntoView(false);
  };

  const sendMessage = (message) => {
    const msg = {author: userName, text: message, room: roomName}
    socket.emit('sendMessage', msg);
  };
  console.log('chat container render');
  useEffect(() => {
    if (!socket) return;

    socket.on('receiveMessage', (msg) => {
      updateMessages(msg);
    });

    return () => {
      socket.off('receiveMessage')
    }
  }, [socket]);

  return (
    <div className="outline chatContainer">
      <ChatMessagesList
        messages={messages}
        newestMessageRef={newestMessageRef}
      />
      <ChatComposeMessage sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
