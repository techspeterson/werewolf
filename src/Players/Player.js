import React from "react";

class Player extends React.Component {
  removePlayer = () => {
    const { player } = this.props;
    this.props.removePlayer(player)
  }

  renderDeleteButton() {
    return <span onClick={this.removePlayer}>❌</span>;
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        {player.name}
        {this.renderDeleteButton()}
      </div>
    )
  }
}

export default Player;