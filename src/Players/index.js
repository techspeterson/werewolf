import React from "react";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

class Players extends React.Component {
  renderPlayers = () => {
    { players } = this.props;
    return players.map(player => {
      return <Player key={player.name} player={player} removePlayer={this.props.removePlayer} />
    });
  }

  render() {
    return (
      <div>
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        {this.renderPlayers()}
      </div>
    )
  }
}

export default Players;