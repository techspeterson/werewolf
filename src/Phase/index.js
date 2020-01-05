import React from "react";
import styles from '../Game.module.css';
import DayPhase from "./DayPhase";
import NightPhase from "./NightPhase";

class Phase extends React.Component {
  renderDayOrNight = () => {
    const { day, players, phase } = this.props;
    if (day) {
      return <DayPhase phase={phase} players={players} endPhase={this.props.endDayPhase} />
    }
    else {
      return <NightPhase phase={phase} players={players} endPhase={this.props.endNightPhase} />
    }
  }

  renderAlert = () => {
    if (this.props.phase > 1) {
      let alertList = [];
      const { alert } = this.props;

      if (alert.deadPlayers.length > 0) {
        alertList.push(<li>{alert.deadPlayers.join(", ")} died.</li>);
      }
      else {
        alertList.push(<li>No one has died.</li>);
      }

      if (alert.silenced) {
        alertList.push(<li>{alert.silenced} has been silenced.</li>);
      }

      return (
        <ul className={styles.alert}>
          {alertList}
        </ul>
      );
    }
  }

  render() {
    const { day, phase } = this.props;
    return (
      <div>
        <h2 className={styles.header}>{day ? "Day" : "Night"} {phase}</h2>
        {this.renderAlert()}
        {this.renderDayOrNight()}
      </div>
    )
  }
}

export default Phase;