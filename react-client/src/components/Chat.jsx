import React from 'react';
import axios from 'axios';

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      chat: ''
    }
    // this.handleChat = this.handleChat.bind(this)
  }

  handleChat = (e) => {
    this.setState({chat: e.target.value})
  }

  sendMessage = () => {
    // this.setState({messages: [...this.state.messages, this.state.chat]})
    axios.post('/contact', {msg: this.state.chat})
    .then(res => {
      console.log('send message client', res.data)
      this.setState({ messages: [...this.state.messages, res.data] });
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        CHAT
        <input type='text' value={this.state.chat} onChange={this.handleChat}></input>
        <button onClick={this.sendMessage}>SEND</button>
        MESSAGES::
        {this.state.messages.map((msg, i) => (
          <div key={i}> {msg} </div>
        ))}
      </div>
    )
  }
}

export default Chat;