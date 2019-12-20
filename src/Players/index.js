import React from "react";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

class Players extends React.Component {
  state = {
    players: this.props.players
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

  finalisePlayers = () => {
    this.props.finalisePlayers(this.state.players);
  }

  renderPlayers = () => {
    return this.state.players.map(player => {
      return <Player key={player.name} player={player} removePlayer={this.removePlayer} playersFinalised={this.props.playersFinalised} />
    });
  }

  renderNewPlayerForm = () => {
    if (!this.props.playersFinalised) {
      return <AddPlayerForm addPlayer={this.addPlayer} />
    }
  }

  renderFinalisePlayersButton = () => {
    return (
      <button onClick={this.finalisePlayers}>Finalise Players</button>
    )
  }

  render() {
    if (this.props.playersFinalised) {
      return (
        <div>
          {this.renderPlayers()}
        </div>
      )
    }
    else {
      return (
        <div>
          <h2>Add Players</h2>
          {this.renderNewPlayerForm()}
          <ul>
            {this.renderPlayers()}
          </ul>
          {this.renderFinalisePlayersButton()}
        </div>
      )
    }

  }
}

export default Players;