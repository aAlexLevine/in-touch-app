import React, { useState } from 'react';
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
        <label>Compose message...</label>
        <InputGroup size="sm" seamless>
          <FormInput onChange={handleChange} value={messageText} />
          <InputGroupAddon type="append">
            <Button type="submit">Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatComposeMessage;
