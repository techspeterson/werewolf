import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    players: state.players,
    dayCount: state.dayCount
  };
}

class DayPhase extends React.Component {
  state = {
    selection: null
  }

  endPhase = () => {
    this.props.endPhase(this.state.selection);
  }

  updateChoice = (e) => {
    this.setState({ selection: e.target.value })
  }

  renderChoices = () => {
    let choices = [<option value="" key="default">Select...</option>];

    let players = this.props.players.filter(player => player.alive);
    players = players.map(player => {
      return <option value={player.name} key={player.name}>{player.name}</option>
    });

    return choices.concat(players);
  }

  render() {
    const { dayCount } = this.props;
    if (dayCount > 1) {
      return (
        <div>
          <p>
            [Timer to be added...?]
          </p>
          <select onChange={this.updateChoice}>
            {this.renderChoices()}
          </select>
          <button onClick={this.endPhase}>Submit Choice for Day {dayCount}</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <p>
            Use this day to explain the rules of the game and let everybody introduce their characters.
          </p>
          <button onClick={this.endPhase}>End Day {dayCount}</button>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(DayPhase);