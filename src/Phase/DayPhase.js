import React from "react";
import Players from "../Players"

class DayPhase extends React.Component {
  endPhase = () => {
    this.props.endPhase();
  }

  render() {
    const { phase, players, playersFinalised } = this.props;
    return (
      <div>
        <h2>Day {phase}</h2>
        <Players players={players} playersFinalised={playersFinalised} />
        <button onClick={this.endPhase}>End Day {phase}</button>
      </div>
    )
  }
}

export default DayPhase;