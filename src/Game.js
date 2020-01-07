import React from "react";
import SetupPlayers from "./Setup/PlayerList";
import PlayerList from "./Players/PlayerList";
import Roles from "./Setup/Roles";
import Phase from "./Phase";
import styles from './Game.module.css';

class Game extends React.Component {
  state = {
    players: [],
    playersFinalised: false,
    rolesFinalised: false,
    dayCount: 0,
    isDay: true,
    alert: {
      deadPlayers: [],
      silenced: null
    }
  }

  finalisePlayers = (players) => {
    this.setState({ playersFinalised: true, players: players });
  }

  finaliseRoles = (players) => {
    this.setState({ rolesFinalised: true, players: players, dayCount: 1 });
  }

  checkPlayerCounts = () => {
    const players = this.state.players.filter(player => player.alive);
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
    const { players } = this.state;

    const deadPlayer = players.find(player => player.name === playerName);
    deadPlayer.alive = false;
    deadPlayers.push(deadPlayer.name);
    players.splice(players.indexOf(deadPlayer), 1, deadPlayer);

    this.setState({ players });

    return deadPlayers;
  }

  endDayPhase = (selection) => {
    if (this.state.dayCount > 1) {
      let deadPlayers = [];
      deadPlayers = this.killPlayer(selection, deadPlayers);

      const alert = {
        deadPlayers: deadPlayers
      };
      this.setState({ alert });

      this.checkPlayerCounts();
    }

    this.setState({ isDay: false });
  }

  endNightPhase = ({ werewolfVictim, bodyguardPick, spellcasterPick }) => {
    let deadPlayers = [];
    let silenced = spellcasterPick;

    if (werewolfVictim && werewolfVictim !== bodyguardPick) {
      deadPlayers = this.killPlayer(werewolfVictim, deadPlayers);
    }

    const alert = { deadPlayers, silenced };
    this.setState({ alert });

    let { dayCount } = this.state;
    this.setState({ isDay: true });
    dayCount++;
    this.setState({ dayCount });
    this.checkPlayerCounts();
  }

  renderSetup() {
    const { players, playersFinalised, rolesFinalised } = this.state;
    if (!playersFinalised) {
      return <SetupPlayers players={players} playersFinalised={playersFinalised} finalisePlayers={this.finalisePlayers} />
    }
    else if (!rolesFinalised) {
      return <Roles players={players} rolesFinalise={rolesFinalised} finaliseRoles={this.finaliseRoles} />
    }
  }

  render() {
    const { dayCount, players, isDay, alert } = this.state;
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
            <PlayerList players={players} />
          </div>
          <div className={styles.subcontainer}>
            <Phase isDay={isDay} players={players} dayCount={dayCount} alert={alert} endDayPhase={this.endDayPhase} endNightPhase={this.endNightPhase} />
          </div>
        </div>
      )
    }
  }
}

export default Game;