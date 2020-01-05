import React from "react";

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
      <li>
        {player.name}
        {this.renderRole()}
      </li>
    )
  }
}

export default Player;