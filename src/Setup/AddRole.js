import React from "react";
import { connect } from "react-redux";
import { updatePlayerAction } from "../actions";
import roles from "../rolesList";

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

class AddRole extends React.Component {
  // filterPlayers = () => {
  //   const { players } = this.props;
  //   return players.filter(player => {
  //     return !player.role;
  //   });
  // }

  state = {
    playerName: this.props.players[0].name,
    roleName: roles[0].name
  }

  roleSelectOptions = () => {
    return roles.map(role => {
      return <option key={role.name} value={role.name}>{role.name}</option>
    });
  }

  playerSelectOptions = () => {
    const { players } = this.props;

    return players.map(player => {
      return <option key={player.name} value={player.name}>{player.name}</option>
    });
  }

  updatePlayer = (e) => {
    this.setState({ playerName: e.target.value });
  }

  updateRole = (e) => {
    this.setState({ roleName: e.target.value });
  }

  addRole = (playerName, roleName) => {
    let { players } = this.props;
    players = Array.from(players);

    let playerToBeUpdated = players.find(foundPlayer => foundPlayer.name === playerName);
    const role = roles.find(foundRole => foundRole.name === roleName);
    playerToBeUpdated.role = role;

    // players.splice(players.indexOf(playerToBeUpdated), 1, playerToBeUpdated);

    this.props.dispatch(updatePlayerAction(players));
  }

  submitForm = (e) => {
    e.preventDefault();
    const { playerName, roleName } = this.state;
    this.addRole(playerName, roleName);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <select onChange={this.updateRole}>
          {this.roleSelectOptions()}
        </select>
        <select onChange={this.updatePlayer}>
          {this.playerSelectOptions()}
        </select>
        <input type="submit" value="Add Role" />
      </form>
    );
  }
}

export default connect(mapStateToProps)(AddRole);