import React from "react";

class NightPhase extends React.Component {
  state = {
    werewolfVictim: null,
    bodyguardPick: null,
    seerPick: null,
  }

  endPhase = () => {
    const { werewolfVictim, bodyguardPick } = this.state;
    const selections = { werewolfVictim, bodyguardPick };
    this.props.endPhase(selections);
  }

  renderActionChoices = (players) => {
    return players.map(player => {
      return <option value={player.name}>{player.name}</option>
    })
  }

  updateWolfVictim = (e) => {
    this.setState({ werewolfVictim: e.target.value });
  }

  renderWolfSelection = () => {
    let { players } = this.props;
    const wolves = players.filter(player => player.role.team === "wolves");
    players = players.filter(player => player.role.name !== "Werewolf");
    return (
      <li>
        Werewolves ({wolves.map(player => player.name).join(", ")}):
        <select onChange={this.updateWolfVictim}>
          {this.renderActionChoices(players)}
        </select>
      </li>
    )
  }

  updateChoice = (e, role) => {
    console.log("updateChoice called by " + role);

    const { players } = this.props;
    switch (role) {
      case "Bodyguard":
        this.setState({ bodyguardPick: e.target.value });
        break;
      case "Seer":
        const choice = players.find(player => player.name === e.target.value)
        this.setState({ seerPick: choice.role.name });
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
    let { players } = this.props;
    const nightPlayers = players.filter(player => (player.role.night && player.role.name !== "Werewolf"));
    return nightPlayers.map(activePlayer => {
      players = players.filter(player => player.name !== activePlayer.name);
      return (
        <li>
          {activePlayer.role.name} ({activePlayer.name}):
          <select onChange={(e) => this.updateChoice(e, activePlayer.role.name)}>
            {this.renderActionChoices(players.filter(player => player.name !== activePlayer.name))}
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
        <h2>Night {phase}</h2>
        {this.renderWolfSelection()}
        {this.renderOtherPlayers()}
        <button onClick={this.endPhase}>Submit Choices for Night {phase}</button>
      </div>
    )
  }
}

export default NightPhase;