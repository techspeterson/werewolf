import React from "react";
import AddRole from "./AddRole";

class Roles extends React.Component {
  state = {
    players: this.props.players
  }

  roles = [
    {
      name: "Villager",
      team: "village",
      night: false
    },
    {
      name: "Bodyguard",
      team: "village",
      night: true
    },
    {
      name: "Werewolf",
      team: "wolves",
      night: true
    },
    {
      name: "Seer",
      team: "village",
      night: true
    },
    {
      name: "Spellcaster",
      team: "village",
      night: true
    },
    {
      name: "Sorceress",
      team: "wolves",
      night: true
    },
    {
      name: "Witch",
      team: "village",
      night: true
    }
  ];

  renderRoles = () => {
    const { players } = this.state;
    let playersWithRoles = players.filter(player => player.role);
    return playersWithRoles.map(player => {
      return (
        <li key={player.name}>
          {player.role.name}: {player.name}
        </li>
      )
    });
  }

  addRole = (playerName, roleName) => {
    const { players } = this.state;
    let playerToBeUpdated = players.find(foundPlayer => foundPlayer.name === playerName);
    const role = this.roles.find(foundRole => foundRole.name === roleName);
    playerToBeUpdated.role = role;
    players.splice(players.indexOf(playerToBeUpdated), 1, playerToBeUpdated);
    this.setState({ players });
  }

  finaliseRoles = () => {
    let { players } = this.state;
    let player;
    for (player of players) {
      if (!player.role) {
        this.addRole(player.name, "Villager");
      }
    }
    console.log(players);

    this.props.finaliseRoles(players);
  }

  renderFinaliseRolesButton = () => {
    if (!this.props.rolesFinalised) {
      return (
        <button onClick={this.finaliseRoles}>Finalise Roles</button>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Add Roles</h2>
        <AddRole players={this.state.players} roles={this.roles} addRole={this.addRole} />
        <ul>
          {this.renderRoles()}
        </ul>
        {this.renderFinaliseRolesButton()}
      </div>
    )
  }
}

export default Roles;