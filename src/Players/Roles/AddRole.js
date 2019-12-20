import React from "react";

class AddRole extends React.Component {
  state = {
    player: this.props.players[0].name,
    role: this.props.roles[0].name
  }

  roleSelectOptions = () => {
    const { roles } = this.props;
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
    this.setState({ player: e.target.value });
  }

  updateRole = (e) => {
    this.setState({ role: e.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { player, role } = this.state;
    this.props.addRole(player, role);
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

export default AddRole;