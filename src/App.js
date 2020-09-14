import React, { Component } from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:8080/ws');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};
    this.messageHistory = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      //console.log(message.data);

      const messageJSON = JSON.parse(message.data)
      const bodyJSON = JSON.parse(messageJSON.body)
      const textMsgJSON = JSON.parse(bodyJSON.body)

      //console.log(textMsgJSON)

      this.messageHistory.value += textMsgJSON.textMsg + "\n"
      console.log(this.messageHistory.value)

      this.forceUpdate()
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    console.log(this.state.value)
    client.send(JSON.stringify({
      "type": "textMsg",
      "body": JSON.stringify({
        "textMsg": this.state.value
      })
    }))
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <p>
          This is now a messaging service.
        </p>

        <input type="text" value={this.state.value} onChange={this.handleChange} name="name" />
        <button onClick={this.handleClick}>Send Message</button>
        <textarea readonly value={this.messageHistory.value} onChange={this.handleChange}></textarea>
      </header>
    </div>
    );
  }
}

/*const App = () => {
  const socket = new WebSocket('ws://localhost:8080');



  return (
    
  );
}*/

export default App;
