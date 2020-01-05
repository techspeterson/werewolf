import React from "react";
import styles from '../Game.module.css';

class DayPhase extends React.Component {
  state = {
    selection: this.props.players[0].name
  }

  endPhase = () => {
    this.props.endPhase(this.state.selection);
  }

  updateChoice = (e) => {
    this.setState({ selection: e.target.value })
  }

  renderChoices = () => {
    const players = this.props.players.filter(player => player.alive);
    return players.map(player => {
      return <option value={player.name}>{player.name}</option>
    })
  }

  render() {
    const { phase } = this.props;
    return (
      <div>
        <p>
          [Timer to be added...?]
        </p>
        <select onChange={this.updateChoice}>
          {this.renderChoices()}
        </select>
        <button onClick={this.endPhase}>Submit Choice for Day {phase}</button>
      </div>
    )
  }
}

export default DayPhase;