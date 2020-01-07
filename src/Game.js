import React from "react";
import { connect } from "react-redux";
import { updatePlayerAction, incrementDayAction, togglePhaseAction, setAlertAction } from "./actions";
import SetupPlayers from "./Setup/PlayerList";
import PlayerList from "./Players/PlayerList";
import Roles from "./Setup/Roles";
import Phase from "./Phase";
import styles from './Game.module.css';

function mapStateToProps(state) {
  const { players, playersFinalised, rolesFinalised, dayCount, isDay, alert } = state;
  return { players, playersFinalised, rolesFinalised, dayCount, isDay, alert };
}

class Game extends React.Component {
  checkPlayerCounts = () => {
    const players = this.props.players.filter(player => player.alive);
    const wolves = players.filter(player => player.role.team === "wolves");
    const { gameOverMessage } = this.props;

    if (!wolves.length) {
      gameOverMessage("There are no wolves left. Villagers win!");
    }
    else if (wolves.length >= Math.ceil(players.length / 2)) {
      gameOverMessage("The wolves have taken over the village. Wolves win!");
    }
  }

  killPlayer = (playerName, deadPlayers) => {
    let { players } = this.props;
    players = Array.from(players);

    const deadPlayer = players.find(player => player.name === playerName);
    deadPlayer.alive = false;
    deadPlayers.push(deadPlayer.name);

    this.props.dispatch(updatePlayerAction(players));

    return deadPlayers;
  }

  endDayPhase = (selection) => {
    if (this.props.dayCount > 1) {
      let deadPlayers = [];
      deadPlayers = this.killPlayer(selection, deadPlayers);

      const alert = {
        deadPlayers: deadPlayers
      };
      this.props.dispatch(setAlertAction(alert));

      this.checkPlayerCounts();
    }
    this.props.dispatch(togglePhaseAction());
  }

  endNightPhase = ({ werewolfVictim, bodyguardPick, spellcasterPick }) => {
    let deadPlayers = [];
    let silenced = spellcasterPick;

    if (werewolfVictim && werewolfVictim !== bodyguardPick) {
      deadPlayers = this.killPlayer(werewolfVictim, deadPlayers);
    }

    const alert = { deadPlayers, silenced };
    this.props.dispatch(setAlertAction(alert));

    this.props.dispatch(togglePhaseAction());
    this.props.dispatch(incrementDayAction());

    this.checkPlayerCounts();
  }

  renderSetup() {
    const { playersFinalised, rolesFinalised } = this.props;
    if (!playersFinalised) {
      return <SetupPlayers />
    }
    else if (!rolesFinalised) {
      return <Roles />
    }
  }

  render() {
    const { dayCount } = this.props;

    if (!dayCount) {
      return (
        <div className={styles.container}>
          {this.renderSetup()}
        </div>
      )
    }
    else {
      return (
        <div className={styles.container}>
          <div className={styles.subcontainer}>
            <h2 className={styles.header}>Players:</h2>
            <PlayerList />
          </div>
          <div className={styles.subcontainer}>
            <Phase endDayPhase={this.endDayPhase} endNightPhase={this.endNightPhase} />
          </div>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(Game);