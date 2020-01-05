import React from "react";

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
    return <span onClick={this.removePlayer} role="img">❌</span>;
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