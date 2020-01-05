import React from "react";

class DayPhase extends React.Component {
  endPhase = () => {
    this.props.endPhase();
  }

  renderResults = () => {
    let resultsList = [];
    const { results } = this.props;
    if (results.deadPlayers.length > 0) {
      resultsList.push(<li>Dead: {results.deadPlayers.join(", ")}</li>);
    }
    else {
      resultsList.push(<li>No one has died.</li>);
    }
    if (results.silenced) {
      resultsList.push(<li>Silenced: {results.silenced}</li>);
    }
    return (
      <ul>
        {resultsList}
      </ul>
    );
  }

  render() {
    const { phase } = this.props;
    return (
      <div>
        <h2>Day {phase}</h2>
        {this.renderResults()}
        <p>
          (timer stuff here)
        </p>
        <button onClick={this.endPhase}>End Day {phase}</button>
      </div>
    )
  }
}

export default DayPhase;