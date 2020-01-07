import React from "react";
import { connect } from "react-redux";
import Player from "./Player";

function mapStateToProps(state) {
  return {
    players: state.players,
    dayCount: state.dayCount
  };
}

class Players extends React.Component {
  getPlayers = (isLiving) => {
    const { players } = this.props;

    return players.filter(player => player.alive === isLiving)
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
        <h3>Alive ({this.getPlayers(true).length} / {this.props.players.length}):</h3>
        {this.getPlayers(true)}
        <h3>Dead:</h3>
        {this.renderDeadPlayers()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Players);