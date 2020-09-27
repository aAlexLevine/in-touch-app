import React from 'react';

const ChatMessagesList = ({ messages, newestMessageRef }) => {
  return (
    <div className="messagesList outline" ref={newestMessageRef}>
      {messages.map((msg, idx) => (
        <div key={idx} ref={newestMessageRef}>
          {msg.author}: {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessagesList;
