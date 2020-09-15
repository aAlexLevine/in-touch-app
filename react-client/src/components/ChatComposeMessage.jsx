import React, { useState } from 'react';

const ChatComposeMessage = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const hanldeSubmit = (event) => {
    event.preventDefault();
    sendMessage(messageText);
    setMessageText('');
  };

  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <input type="text" value={messageText} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComposeMessage;
