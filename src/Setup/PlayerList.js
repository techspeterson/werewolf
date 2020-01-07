import React from "react";
import { connect } from "react-redux";
import { finalisePlayersAction } from "../actions"
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";
import styles from "../Game.module.css";

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

const mapDispatchToProps = {
  finalisePlayersAction
}

class SetupPlayers extends React.Component {
  finalisePlayers = () => {
    this.props.finalisePlayersAction();
  }

  renderPlayers = () => {
    return this.props.players.map(player => {
      return <Player key={player.name} player={player} />
    });
  }

  render() {
    return (
      <div className={styles.subcontainer}>
        <h2 className={styles.header}>Add Players</h2>
        <AddPlayerForm />
        <ul>
          {this.renderPlayers()}
        </ul>
        <button onClick={this.finalisePlayers}>Finalise Players</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupPlayers);