import React from "react";
import styles from "../Game.module.css"

class Player extends React.Component {
  removePlayer = () => {
    const { player, removePlayer } = this.props;
    removePlayer(player)
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

export default Player;