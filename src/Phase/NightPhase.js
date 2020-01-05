import React from "react";
import styles from '../Game.module.css';

class NightPhase extends React.Component {
  state = {
    players: this.props.players.filter(player => player.alive),
    werewolfVictim: null,
    bodyguardPick: null,
    seerPick: null,
    spellcasterPick: null,
  }

  endPhase = () => {
    const { werewolfVictim, bodyguardPick } = this.state;
    const selections = { werewolfVictim, bodyguardPick };
    this.props.endPhase(selections);
  }

  renderActionChoices = (players) => {
    let choices = [<option value="">Select...</option>];
    players = players.map(player => {
      return <option value={player.name}>{player.name}</option>
    });
    return choices.concat(players);
  }

  updateWolfVictim = (e) => {
    this.setState({ werewolfVictim: e.target.value });
  }

  renderWolfSelection = () => {
    let { players } = this.state;
    const wolves = players.filter(player => player.role.team === "wolves");
    players = players.filter(player => player.role.name !== "Werewolf");
    return (
      <li key="wolves">
        Werewolves ({wolves.map(player => player.name).join(", ")}):
        <select onChange={this.updateWolfVictim}>
          {this.renderActionChoices(players)}
        </select>
      </li>
    )
  }

  updateChoice = (name, role) => {
    const { players } = this.state;
    switch (role) {
      case "Bodyguard":
        this.setState({ bodyguardPick: name });
        break;
      case "Seer":
        const choice = players.find(player => player.name === name)
        this.setState({ seerPick: choice.role.name });
        break;
      case "Spellcaster":
        this.setState({ spellcasterPick: name });
        break;
      default:
        break;
    }
  }

  renderSeerChoice = (player) => {
    if (player.role.name === "Seer" && this.state.seerPick) {
      return <span> ({this.state.seerPick})</span>
    }
  }

  renderOtherPlayers = () => {
    const { players } = this.state;
    const nightPlayers = players.filter(player => (player.role.night && player.role.name !== "Werewolf"));
    return nightPlayers.map(activePlayer => {
      const selectOptions = players.filter(player => player.name !== activePlayer.name);
      return (
        <li key={activePlayer.role.name}>
          {activePlayer.role.name} ({activePlayer.name}):
          <select onChange={(e) => this.updateChoice(e.target.value, activePlayer.role.name)}>
            {this.renderActionChoices(selectOptions)}
          </select>
          {this.renderSeerChoice(activePlayer)}
        </li>
      );
    });
  }

  render() {
    const { phase } = this.props;
    return (
      <div>
        {this.renderWolfSelection()}
        {this.renderOtherPlayers()}
        <button onClick={this.endPhase}>Submit Choices for Night {phase}</button>
      </div>
    )
  }
}

export default NightPhase;