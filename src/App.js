import React from 'react';
import Players from "./Players";
import './App.css';

class App extends React.Component {
  state = {
    players: [],
    playersFinalised: false,
    rolesFinalised: false
  }

  addPlayer = (name) => {
    let players = this.state.players;
    const newPlayer = {
      name: name,
      role: null
    }
    players.push(newPlayer);
    this.setState({ players });
  }

  removePlayer = (player) => {
    let players = this.state.players
    players = players.filter(foundPlayer => foundPlayer.name !== player.name);
    this.setState({ players });
  }

  renderPhase = () => {
    if (!this.state.playersFinalised) {
      return <PlayerSetup addPlayer={this.addPlayer} removePlayer={this.removePlayer} />;
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderPhase()}
      </div>
    );
  }
}

export default App;
