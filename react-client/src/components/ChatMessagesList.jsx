import React from 'react';

const ChatMessagesList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
};

export default ChatMessagesList;
