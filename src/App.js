import React, { Component } from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:31001/ws');

class App extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <p>
          This is now a messaging service.
        </p>
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
