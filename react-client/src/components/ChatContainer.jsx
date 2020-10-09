import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import ChatMessagesList from './ChatMessagesList';
import ChatComposeMessage from './ChatComposeMessage';

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
    const msg = { author: userName, text: message, room: roomName };
    socket.emit('sendMessage', msg);
  };

  useEffect(() => {
    // if (!socket) return;
    socket.on('receiveMessage', (msg) => {
      updateMessages(msg);
    });

    return () => {
      socket.off('receiveMessage');
    };
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

ChatContainer.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChatContainer;
