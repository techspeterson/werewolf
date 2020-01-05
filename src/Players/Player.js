import React from "react";
import styles from '../Game.module.css';

class Player extends React.Component {
  renderRole() {
    const { player } = this.props;
    if (player.role) {
      return <span> ({player.role.name})</span>
    }
  }

  render() {
    const { player } = this.props;
    return (
      <li className={styles[player.role.team === "wolves" ? "wolf" : "villager"]}>
        {player.name}
        {this.renderRole()}
      </li>
    )
  }
}

export default Player;