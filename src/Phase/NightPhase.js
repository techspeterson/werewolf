import React from "react";
import Players from "../Players"
import Player from "../Players/Player"

class NightPhase extends React.Component {
  endPhase = () => {
    this.props.endPhase();
  }

  renderActionChoices = (players) => {
    return players.map(player => {
      return <option value={player.name}>{player.name}</option>
    })
  }

  renderWolfSelection = () => {
    let { players } = this.props;
    players = players.filter(player => player.role.name !== "Werewolf");
    return (
      <li>
        Werewolves:
        <select>
          {this.renderActionChoices(players)}
        </select>
      </li>
    )
  }

  renderOtherPlayers = () => {
    let { players } = this.props;
    const nightPlayers = players.filter(player => (player.role.night && player.role.name !== "Werewolf"));
    return nightPlayers.map(activePlayer => {
      players = players.filter(player => player.name !== activePlayer.name);
      return (
        <li>
          {activePlayer.name} ({activePlayer.role.name}):
          <select>
            {this.renderActionChoices(players)}
          </select>
        </li>
      );
    });
  }

  render() {
    const { phase, players, playersFinalised } = this.props;
    return (
      <div>
        <h2>Night {phase}</h2>
        {this.renderWolfSelection()}
        {this.renderOtherPlayers()}
        <button onClick={this.endPhase}>End Night {phase}</button>
      </div>
    )
  }
}

export default NightPhase;