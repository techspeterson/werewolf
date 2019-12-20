import React from 'react';
import Players from "./Players";
import Roles from "./Players/Roles";
import DayPhase from "./Phase/DayPhase";
import NightPhase from "./Phase/NightPhase";
import './App.css';

class App extends React.Component {
  state = {
    players: [],
    playersFinalised: false,
    rolesFinalised: false,
    phase: 0,
    day: true
  }

  finalisePlayers = (players) => {
    this.setState({ playersFinalised: true, players: players });
  }

  finaliseRoles = (players) => {
    this.setState({ rolesFinalised: true, players: players, phase: 1 });
  }

  renderDayOrNight = () => {
    return this.state.day ? "Day" : "Night";
  }

  endPhase = () => {
    let { day, phase } = this.state;
    day = !day;
    this.setState({ day });
    if (day) {
      phase++;
      this.setState({ phase });
    }
  }

  renderPhase = () => {
    const { phase, players, playersFinalised, rolesFinalised, day } = this.state;
    if (phase === 0) {
      if (!playersFinalised) {
        return <Players players={players} playersFinalised={playersFinalised} finalisePlayers={this.finalisePlayers} />
      }
      else if (!rolesFinalised) {
        return <Roles players={players} rolesFinalise={rolesFinalised} finaliseRoles={this.finaliseRoles} />
      }
    }
    else if (day) {
      return <DayPhase phase={phase} players={players} playersFinalised={playersFinalised} endPhase={this.endPhase} />
    }
    else {
      return <NightPhase phase={phase} players={players} playersFinalised={playersFinalised} endPhase={this.endPhase} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderPhase()}
      </div>
    );
  }
}

export default App;
