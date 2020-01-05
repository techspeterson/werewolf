import React from "react";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

class SetupPlayers extends React.Component {
  state = {
    players: this.props.players
  }

  addPlayer = (name) => {
    let players = this.state.players;
    const newPlayer = {
      name: name,
      role: null,
      alive: true
    }
    players.push(newPlayer);
    this.setState({ players });
  }

  removePlayer = (player) => {
    let players = this.state.players
    players = players.filter(foundPlayer => foundPlayer.name !== player.name);
    this.setState({ players });
  }

  finalisePlayers = () => {
    this.props.finalisePlayers(this.state.players);
  }

  renderPlayers = () => {
    return this.state.players.map(player => {
      return <Player key={player.name} player={player} removePlayer={this.removePlayer} />
    });
  }

  render() {
    return (
      <div>
        <h2>Add Players</h2>
        <AddPlayerForm addPlayer={this.addPlayer} />
        <ul>
          {this.renderPlayers()}
        </ul>
        <button onClick={this.finalisePlayers}>Finalise Players</button>
      </div>
    )
  }
}

export default SetupPlayers;