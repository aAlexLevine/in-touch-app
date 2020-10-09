import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  InputGroup,
  InputGroupAddon,
  FormInput,
  Button,
} from 'shards-react';

const ChatComposeMessage = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(messageText);
    setMessageText('');
  };

  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="messageSubmit">Compose message...</label>
        <InputGroup size="sm" seamless>
          <FormInput id="messageSubmit" onChange={handleChange} value={messageText} />
          <InputGroupAddon type="append">
            <Button type="submit">Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </div>
  );
};

ChatComposeMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatComposeMessage;
