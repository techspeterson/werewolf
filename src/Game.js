import React from "react";
import SetupPlayers from "./Setup/PlayerList";
import PlayerList from "./Players/PlayerList";
import Roles from "./Setup/Roles";
import DayPhase from "./Phase/DayPhase";
import NightPhase from "./Phase/NightPhase";
import styles from './Game.module.css';


class Game extends React.Component {
  state = {
    players: [],
    playersFinalised: false,
    rolesFinalised: false,
    phase: 0,
    day: true,
    results: {
      deadPlayers: [],
      silenced: null
    }
  }

  finalisePlayers = (players) => {
    this.setState({ playersFinalised: true, players: players });
  }

  finaliseRoles = (players) => {
    this.setState({ rolesFinalised: true, players: players, phase: 1 });
  }

  endDayPhase = () => {
    this.setState({ day: false });
  }

  endNightPhase = (selections) => {
    let { players } = this.state;
    const { werewolfVictim, bodyguardPick } = selections;
    let deadPlayers = [];
    let silenced = null;

    if (werewolfVictim && werewolfVictim !== bodyguardPick) {
      const deadPlayer = players.find(player => player.name === werewolfVictim);
      deadPlayer.alive = false;
      deadPlayers.push(deadPlayer.name);

      players.splice(players.indexOf(deadPlayer), 1, deadPlayer);
    }

    const results = {
      deadPlayers: deadPlayers,
      silenced: silenced
    };
    this.setState({ players, results });

    let { phase } = this.state;
    this.setState({ day: true });
    phase++;
    this.setState({ phase });
  }

  renderDayOrNight = () => {
    const { day, players, phase, results } = this.state;
    if (day) {
      return <DayPhase phase={phase} players={players} endPhase={this.endDayPhase} results={results} />
    }
    else {
      return <NightPhase phase={phase} players={players} endPhase={this.endNightPhase} />
    }
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
    const { phase, players } = this.state;
    if (phase === 0) {
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
            <h2>Players:</h2>
            <PlayerList players={players} />
          </div>
          <div className={styles.subcontainer}>
            {this.renderDayOrNight()}
          </div>
        </div>
      )
    }
  }
}

export default Game;