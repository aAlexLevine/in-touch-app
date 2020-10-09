import React from 'react';
import PropTypes from 'prop-types';

const ChatMessagesList = ({ messages, newestMessageRef }) => {
  return (
    <div className="messagesList outline" ref={newestMessageRef}>
      {messages.map((msg, idx) => (
        <div key={idx} ref={newestMessageRef}>
          {msg.author}
          :
          {msg.text}
        </div>
      ))}
    </div>
  );
};

ChatMessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      text: PropTypes.string,
      room: PropTypes.string,
    })
  ).isRequired,
  newestMessageRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default ChatMessagesList;
