import React from "react";
import Player from "./Player";

class Players extends React.Component {
  state = {
    players: this.props.players
  }

  getPlayers = (living) => {
    const { players } = this.state;
    return players.filter(player => player.alive === living)
      .map(player => <Player key={player.name} player={player} />);
  }

  renderDeadPlayers = () => {
    let deadPlayers = this.getPlayers(false);
    if (deadPlayers.length > 0) {
      return this.getPlayers(false);
    }
    else {
      return <span>No dead players</span>
    }
  }

  render() {
    return (
      <div>
        <h3>Alive:</h3>
        {this.getPlayers(true)}
        <h3>Dead:</h3>
        {this.renderDeadPlayers()}
      </div>
    )
  }
}

export default Players;