import React from "react";
import { connect } from "react-redux";
import { updatePlayerAction, finaliseRolesAction, incrementDayAction } from "../actions";
import roles from "../rolesList";
import AddRole from "./AddRole";
import styles from '../Game.module.css';

function mapStateToProps(state) {
  return {
    players: state.players
  };
}

const mapDispatchToProps = {
  updatePlayerAction,
  finaliseRolesAction,
  incrementDayAction
}

class Roles extends React.Component {
  renderRoles = () => {
    const { players } = this.props;
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
    let { players } = this.props;
    players = Array.from(players);

    let playerToBeUpdated = players.find(foundPlayer => foundPlayer.name === playerName);
    const role = roles.find(foundRole => foundRole.name === roleName);
    playerToBeUpdated.role = role;

    this.props.updatePlayerAction(players);
  }

  finaliseRoles = () => {
    const { players } = this.props;

    for (let player of players) {
      if (!player.role) {
        this.addRole(player.name, "Villager");
      }
    }

    this.props.finaliseRolesAction();
    this.props.incrementDayAction();
  }

  render() {
    return (
      <div className={styles.subcontainer}>
        <h2 className={styles.header}>Add Roles</h2>
        <AddRole roles={this.roles} addRole={this.addRole} />
        <ul>
          {this.renderRoles()}
        </ul>
        <button onClick={this.finaliseRoles}>Finalise Roles</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);