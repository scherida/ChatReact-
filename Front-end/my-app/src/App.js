import React, { Component } from 'react';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3100');


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputMessage: "",
      historyMessages: []
    }
  }

  componentDidMount() {
    socket.on("newMessage", (msg) => {
      this.setState({
        historyMessages: this.state.historyMessages.concat([msg])
      })
    })
  }

  render() {

    return (
      <div className="App">
        <input
          type="text"
          onChange={(event) => { this.setState({ inputMessage: event.target.value }) }} />
        <button
          onClick={() => {
            socket.emit('sendMessage', this.state.inputMessage);
          }}>
          Enviar
        </button>
        <div>
          {
            this.state.historyMessages.map((item) => {
              return (<p>{item}</p>)
            })
          }
        </div>
      </div>
    );
  }
}

export default App;