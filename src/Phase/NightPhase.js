import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    players: state.players.filter(player => player.alive),
    dayCount: state.dayCount
  };
}

class NightPhase extends React.Component {
  state = {
    werewolfVictim: null,
    bodyguardPick: null,
    seerPick: null,
    spellcasterPick: null,
  }

  endPhase = () => {
    const { werewolfVictim, bodyguardPick, spellcasterPick } = this.state;
    this.props.endPhase({ werewolfVictim, bodyguardPick, spellcasterPick });
  }

  renderActionChoices(players) {
    let choices = [<option value="" key="default">Select...</option>];

    players = players.map(player => {
      return <option value={player.name} key={player.name}>{player.name}</option>
    });

    return choices.concat(players);
  }

  updateWolfVictim = (e) => {
    this.setState({ werewolfVictim: e.target.value });
  }

  renderWolfSelection = () => {
    const { players } = this.props;

    const wolves = players.filter(player => player.role.team === "wolves");
    const villagers = players.filter(player => player.role.name !== "Werewolf");

    return (
      <li key="wolves">
        Werewolves ({wolves.map(player => player.name).join(", ")}):
        <select onChange={this.updateWolfVictim}>
          {this.renderActionChoices(villagers)}
        </select>
      </li>
    )
  }

  updateChoice = (name, role) => {
    const { players } = this.props;

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
    const { players } = this.props;
    const nightPlayers = players.filter(player => (player.role.night && player.role.name !== "Werewolf"));

    return nightPlayers.map(activePlayer => {
      // const selectOptions = players.filter(player => player.name !== activePlayer.name);
      return (
        <li key={activePlayer.role.name}>
          {activePlayer.role.name} ({activePlayer.name}):
          <select onChange={(e) => this.updateChoice(e.target.value, activePlayer.role.name)}>
            {this.renderActionChoices(players)}
          </select>
          {this.renderSeerChoice(activePlayer)}
        </li>
      );
    });
  }

  render() {
    const { dayCount } = this.props;
    return (
      <div>
        {this.renderWolfSelection()}
        {this.renderOtherPlayers()}
        <button onClick={this.endPhase}>Submit Choices for Night {dayCount}</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(NightPhase);