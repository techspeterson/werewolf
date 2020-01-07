import React from "react";
import { connect } from "react-redux";
import { updatePlayerAction } from "../actions"

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

class AddPlayer extends React.Component {
  state = {
    name: null
  }

  updateName = (e) => {
    this.setState({ name: e.target.value });
  }

  addPlayer = (playerName) => {
    let players = Array.from(this.props.players);
    const newPlayer = {
      name: playerName,
      role: null,
      alive: true
    }
    players.push(newPlayer);
    this.props.dispatch(updatePlayerAction(players));
  }

  submitForm = (e) => {
    e.preventDefault();
    this.addPlayer(this.state.name);
    let input = document.getElementById("newPlayer");
    input.value = "";
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input id="newPlayer" placeholder="Player name" onChange={this.updateName} />
        <input type="submit" value="Add Player" />
      </form>
    );
  }
}

export default connect(mapStateToProps)(AddPlayer);