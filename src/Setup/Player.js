import React from "react";
import { connect } from "react-redux";
import { updatePlayerAction } from "../actions"
import styles from "../Game.module.css"

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

class Player extends React.Component {
  removePlayer = () => {
    let { player, players } = this.props;

    players = players.filter(foundPlayer => foundPlayer.name !== player.name);

    this.props.dispatch(updatePlayerAction(players));
  }

  renderRole() {
    const { player } = this.props;
    if (player.role) {
      return <span> ({player.role.name})</span>
    }
  }

  renderDeleteButton() {
    return <span onClick={this.removePlayer} className={styles.removePlayer}>✖</span>;
  }

  render() {
    const { player } = this.props;
    return (
      <li>
        {player.name}
        {this.renderRole()}
        {this.renderDeleteButton()}
      </li>
    )
  }
}

export default connect(mapStateToProps)(Player);